import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

interface Post {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    category: string;
    featured?: boolean;
}

const posts: Post[] = [
    {
        slug: '/blog/gmail-privacy-truth',
        title: 'Does Gmail Read Your Emails? The 2026 Truth',
        date: 'February 12, 2026',
        category: 'Privacy',
        featured: true,
        excerpt: "Gmail's Gemini AI now scans your emails and attachments. Here's exactly what Google does with your email data and how to protect your privacy."
    },
    {
        slug: '/blog/email-privacy-audit',
        title: 'Email Privacy Audit 2026: Which Clients Send Your Data to Cloud?',
        date: 'February 10, 2026',
        category: 'Privacy',
        featured: true,
        excerpt: 'We audited 10 popular email clients for data practices. See which ones send your emails to cloud servers for AI processing and which keep data on-device.'
    },
    {
        slug: '/blog/on-device-ai-email',
        title: 'What Is On-Device AI and Why Your Email Needs It',
        date: 'February 8, 2026',
        category: 'Technology',
        featured: true,
        excerpt: "On-device AI runs language models directly on your Mac's GPU. Learn why local LLMs are faster, more private, and the future of email intelligence."
    },
    {
        slug: '/blog/offline-email-clients',
        title: 'Email Clients That Work Offline: 2026 Guide',
        date: 'February 6, 2026',
        category: 'Guides',
        excerpt: 'Need email that works without internet? Compare offline-capable email clients for Mac — from basic caching to full AI intelligence without WiFi.'
    },
    {
        slug: '/blog/developer-mac-email-workflow',
        title: "The Developer's Guide to the Ultimate Mac Email Workflow",
        date: 'February 4, 2026',
        category: 'Productivity',
        excerpt: 'Stop fighting your inbox. Learn how to build a high-performance, keyboard-driven email workflow using Rust-powered tools and local AI.'
    },
    {
        slug: '/blog/zero-data-exit-framework',
        title: 'Zero Data Exit: The 2026 Framework for Privacy-First AI',
        date: 'February 2, 2026',
        category: 'Technology',
        excerpt: 'What is Zero Data Exit? Discover the new standard for AI privacy where data never leaves your device and intelligence is verifiably local.'
    },
    {
        slug: '/blog/block-email-trackers-mac',
        title: 'How to Block Email Trackers and Spy Pixels on macOS (2026 Guide)',
        date: 'January 31, 2026',
        category: 'Privacy',
        excerpt: 'Invisible spy pixels are tracking your every move. Learn how to identify and block email trackers on your Mac to reclaim your inbox privacy.'
    },
    {
        slug: '/blog/apple-mail-slow-vs-rust-native',
        title: 'Apple Mail is Slow: Why Native Rust Apps are the Future',
        date: 'January 29, 2026',
        category: 'Technology',
        excerpt: 'Frustrated with Apple Mail performance? Discover why legacy architectures are slowing you down and how Rust is building the next generation of Mac apps.'
    },
    {
        slug: '/blog/local-llm-email-drafting-tutorial',
        title: 'How to Write Emails with Local LLMs: A Tutorial',
        date: 'January 27, 2026',
        category: 'Tutorials',
        excerpt: 'AI drafting doesn\'t have to mean compromising your privacy. Learn how to use on-device AI to draft professional emails without sending your data to the cloud.'
    },
    {
        slug: '/blog/superhuman-alternatives',
        title: 'Is Superhuman Worth $30/Month? Free Alternatives Compared',
        date: 'January 24, 2026',
        category: 'Comparisons',
        excerpt: 'Superhuman costs $360/year for AI email. We break down what you actually get and compare it to free alternatives that deliver similar features.'
    },
    {
        slug: '/blog/best-ai-email-clients',
        title: 'Best AI Email Clients in 2026: Privacy vs Cloud Compared',
        date: 'January 21, 2026',
        category: 'Comparisons',
        featured: true,
        excerpt: 'Not all AI email clients are created equal. We compare cloud-based and local AI approaches across Superhuman, Spark, Canary Mail, and Inboxed.'
    },
    {
        slug: '/blog/best-mac-email-clients',
        title: 'Best Email Clients for Mac in 2026',
        date: 'January 18, 2026',
        category: 'Comparisons',
        excerpt: 'A comprehensive guide to the best Mac email clients. From Apple Mail to AI-powered alternatives, find the right fit for your workflow.'
    },
    {
        slug: '/blog/email-privacy-guide',
        title: 'Email Privacy in 2026: What Your Email Client Knows About You',
        date: 'January 15, 2026',
        category: 'Privacy',
        excerpt: 'Your email client sees everything — receipts, passwords, medical records. Here\'s how different clients handle your data and what you can do about it.'
    },
    {
        slug: '/blog/inbox-zero-ai',
        title: 'Inbox Zero with AI: The 2026 Guide',
        date: 'January 12, 2026',
        category: 'Productivity',
        excerpt: 'Inbox zero was always the goal but never sustainable. Local AI changes the equation. Here\'s how to actually achieve and maintain it.'
    },
    {
        slug: '/blog/local-ai-email',
        title: 'Why Local Private LLMs are the Future of Email',
        date: 'January 9, 2026',
        category: 'Technology',
        excerpt: 'Stop sending your personal data to the cloud. Learn why on-device intelligence is faster, safer, and better for professional communication.'
    }
];

const featuredPosts = posts.filter(p => p.featured);
const allPosts = posts;

export default function BlogIndex() {
    return (
        <div className="container-custom py-32 max-w-5xl">
            <SEO
                title="Inboxed Blog - Email Privacy, Local AI & Productivity"
                description="Insights on local AI, email privacy, on-device intelligence, and the future of private email clients."
                canonical="https://inboxed.email/blog"
            />
            <h1 className="font-serif text-6xl mb-6">Blog.</h1>
            <p className="font-body text-xl text-black/60 mb-16 max-w-2xl">
                Perspectives on email privacy, local AI, and building software that respects your data.
            </p>

            {/* Featured Posts */}
            <section className="mb-20">
                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-black/40 mb-8">Featured</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    {featuredPosts.map(post => (
                        <Link key={post.slug} to={post.slug} className="group block border border-black/10 rounded-lg p-8 hover:border-black/30 hover:shadow-sm transition-all">
                            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-black/40">{post.category}</span>
                            <h3 className="font-serif text-2xl font-bold mt-2 mb-3 group-hover:underline decoration-2 underline-offset-4 leading-tight">{post.title}</h3>
                            <p className="font-body text-base text-black/60 leading-relaxed line-clamp-3">{post.excerpt}</p>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="font-mono text-xs text-black/30">{post.date}</span>
                                <span className="font-mono text-xs uppercase tracking-widest text-black group-hover:translate-x-1 transition-transform">Read &rarr;</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* All Posts */}
            <section>
                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-black/40 mb-8">All Posts</h2>
                <div className="divide-y divide-black/[0.06]">
                    {allPosts.map(post => (
                        <Link key={post.slug} to={post.slug} className="group block py-8 first:pt-0">
                            <div className="flex flex-col md:flex-row md:items-baseline gap-3 md:gap-6 mb-2">
                                <h3 className="font-serif text-2xl font-bold group-hover:underline decoration-2 underline-offset-4">{post.title}</h3>
                                <div className="flex items-center gap-4 shrink-0">
                                    <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-black/40 border border-black/10 rounded px-2 py-0.5">{post.category}</span>
                                    <span className="font-mono text-sm text-black/30 whitespace-nowrap">{post.date}</span>
                                </div>
                            </div>
                            <p className="font-body text-lg text-black/60 leading-relaxed max-w-3xl">{post.excerpt}</p>
                            <div className="mt-3 font-mono text-xs uppercase tracking-widest text-black group-hover:translate-x-2 transition-transform inline-block">
                                Read Article &rarr;
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
