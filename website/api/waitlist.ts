import type { VercelRequest, VercelResponse } from '@vercel/node';

function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Strip leading characters that trigger formula injection in spreadsheets (CSV injection)
function sanitizeForSheet(value: string): string {
    return value.replace(/^[=+\-@\t\r]/, '');
}

// Basic in-memory rate limiter — resets per cold start, acceptable for a simple waitlist form
const requestLog = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const recent = (requestLog.get(ip) ?? []).filter(t => now - t < RATE_LIMIT_WINDOW_MS);
    if (recent.length >= RATE_LIMIT_MAX) {
        requestLog.set(ip, recent);
        return true;
    }
    requestLog.set(ip, [...recent, now]);
    return false;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const webhookUrl = process.env.WAITLIST_WEBHOOK_URL;
    if (!webhookUrl) {
        console.error('WAITLIST_WEBHOOK_URL is not configured');
        return res.status(503).json({ error: 'Service unavailable' });
    }

    // Rate limit by IP
    const ip =
        (req.headers['x-forwarded-for'] as string | undefined)?.split(',')[0]?.trim() ??
        req.socket?.remoteAddress ??
        'unknown';
    if (isRateLimited(ip)) {
        return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }

    const { email, source } = (req.body ?? {}) as Record<string, unknown>;

    if (!email || typeof email !== 'string') {
        return res.status(400).json({ error: 'Email is required' });
    }

    const trimmedEmail = email.trim();
    if (!isValidEmail(trimmedEmail)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    const sanitizedEmail = sanitizeForSheet(trimmedEmail);
    const sanitizedSource =
        typeof source === 'string' ? sanitizeForSheet(source) : 'website-download-popup';

    try {
        const body = new URLSearchParams({
            email: sanitizedEmail,
            source: sanitizedSource,
            createdAt: new Date().toISOString(),
        });

        await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: body.toString(),
        });

        return res.status(200).json({ ok: true });
    } catch (err) {
        console.error('Waitlist submission error:', err);
        return res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }
}
