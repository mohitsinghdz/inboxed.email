// ─────────────────────────────────────────────────
// Central data store for all programmatic SEO pages
// ─────────────────────────────────────────────────

// ── Types ────────────────────────────────────────

export interface ComparisonRow {
  feature: string;
  competitor: string;
  competitorIcon: 'x' | 'check' | 'neutral';
  inboxed: string;
  inboxedIcon: 'check' | 'shield' | 'zap' | 'cpu' | 'search' | 'neutral';
}

export interface ComparisonData {
  slug: string;
  name: string;
  seo: {
    title: string;
    description: string;
    canonical: string;
  };
  h1: string;
  intro: string;
  rows: ComparisonRow[];
  whySwitch: {
    heading: string;
    paragraphs: string[];
  };
  cta: string;
  schema: Record<string, unknown>;
}

export interface UseCaseData {
  slug: string;
  profession: string;
  seo: {
    title: string;
    description: string;
    canonical: string;
  };
  h1: string;
  intro: string;
  painPoints: { title: string; description: string }[];
  solutions: { title: string; description: string }[];
  features: string[];
  cta: string;
  schema: Record<string, unknown>;
}

export interface AlternativeEntry {
  name: string;
  slug?: string; // link to /compare/:slug if exists
  rank: number;
  description: string;
  pros: string[];
  cons: string[];
  isInboxed?: boolean;
}

export interface AlternativesData {
  slug: string;
  competitor: string;
  seo: {
    title: string;
    description: string;
    canonical: string;
  };
  h1: string;
  intro: string;
  entries: AlternativeEntry[];
  cta: string;
  schema: Record<string, unknown>;
}

// ── Helper ───────────────────────────────────────

function comparisonSchema(name: string, slug: string): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Inboxed vs ${name} — Comparison`,
    description: `A head-to-head comparison of Inboxed and ${name}.`,
    url: `https://inboxed.email/compare/${slug}`,
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "Inboxed",
      applicationCategory: "BusinessApplication",
      operatingSystem: "macOS",
    },
  };
}

function useCaseSchema(profession: string, slug: string): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Best Email Client for ${profession}`,
    url: `https://inboxed.email/best-email-for/${slug}`,
    about: {
      "@type": "Thing",
      name: profession,
    },
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "Inboxed",
      applicationCategory: "BusinessApplication",
      operatingSystem: "macOS",
    },
  };
}

function alternativesSchema(competitor: string, slug: string, entries: AlternativeEntry[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Best ${competitor} Alternatives in 2026`,
    url: `https://inboxed.email/alternatives/${slug}`,
    numberOfItems: entries.length,
    itemListElement: entries.map((e) => ({
      "@type": "ListItem",
      position: e.rank,
      name: e.name,
      description: e.description,
    })),
  };
}

// ── Comparison Data ──────────────────────────────

export const comparisons: ComparisonData[] = [
  // ─ Existing 4 (migrated from hardcoded pages) ─
  {
    slug: "superhuman",
    name: "Superhuman",
    seo: {
      title: "Free Superhuman Alternative with Local AI | Inboxed",
      description: "Looking for a free Superhuman alternative? Inboxed offers the same speed and intelligence but runs entirely on your Mac for total privacy.",
      canonical: "https://inboxed.email/compare/superhuman",
    },
    h1: "The Free Superhuman Alternative.",
    intro: "Inboxed gives you the speed of Superhuman without the $360/year price tag or the cloud-based AI scanning.",
    rows: [
      { feature: "AI Processing", competitor: "Cloud API (OpenAI)", competitorIcon: "x", inboxed: "Local LLM (Apple MLX)", inboxedIcon: "check" },
      { feature: "Privacy", competitor: "Data leaves device", competitorIcon: "x", inboxed: "100% Private", inboxedIcon: "shield" },
      { feature: "Cost", competitor: "$30/month ($360/year)", competitorIcon: "neutral", inboxed: "Free (Pro: $1 lifetime)", inboxedIcon: "zap" },
      { feature: "Platform", competitor: "Web / Cloud Wrapper", competitorIcon: "neutral", inboxed: "Native macOS App", inboxedIcon: "check" },
      { feature: "Data Access", competitor: "3rd Party Access", competitorIcon: "x", inboxed: "Zero Data Sharing", inboxedIcon: "check" },
      { feature: "App Size", competitor: "~200MB (Electron)", competitorIcon: "neutral", inboxed: "~10MB (Rust + Tauri)", inboxedIcon: "check" },
    ],
    whySwitch: {
      heading: "Why switch?",
      paragraphs: [
        "The era of sending your personal emails to a third-party server for \"AI features\" is over. Apple Silicon is powerful enough to run intelligent models right on your laptop.",
        "Save $360 a year. Get better privacy. Own your software.",
      ],
    },
    cta: "Get Inboxed — Free",
    schema: comparisonSchema("Superhuman", "superhuman"),
  },
  {
    slug: "zero",
    name: "0.email",
    seo: {
      title: "0.email Alternative (Native Mac App) | Inboxed",
      description: "The best native alternative to 0.email. Zero setup, native Apple Silicon performance, and full local AI privacy.",
      canonical: "https://inboxed.email/compare/zero",
    },
    h1: "Inboxed vs. 0.email",
    intro: "0.email is a great open-source project. But it runs in your browser or as a web wrapper. Inboxed is a high-performance PRO app built natively for Apple Silicon.",
    rows: [
      { feature: "Platform", competitor: "Web / Browser-based", competitorIcon: "x", inboxed: "Native macOS (Rust + Tauri)", inboxedIcon: "check" },
      { feature: "Architecture", competitor: "JavaScript / Web Stack", competitorIcon: "x", inboxed: "Apple MLX + Metal GPU", inboxedIcon: "check" },
      { feature: "Ease of Use", competitor: "Self-host / Open Source", competitorIcon: "x", inboxed: "One-Click Install", inboxedIcon: "check" },
      { feature: "Cost", competitor: "Free (Open Source)", competitorIcon: "neutral", inboxed: "Free (Pro: $1 lifetime)", inboxedIcon: "zap" },
      { feature: "AI Models", competitor: "WebLLM (browser WASM)", competitorIcon: "neutral", inboxed: "7B+ params via llama.cpp (Metal)", inboxedIcon: "check" },
    ],
    whySwitch: {
      heading: "Native Power. Zero Friction.",
      paragraphs: [
        "Web apps can feel sluggish. Inboxed is optimized for your Mac's hardware. Get the polish of a native app with the intelligence of a local LLM.",
      ],
    },
    cta: "Get Inboxed — Free",
    schema: comparisonSchema("0.email", "zero"),
  },
  {
    slug: "thunderbird",
    name: "Thunderbird",
    seo: {
      title: "Thunderbird Alternative with Private AI | Inboxed",
      description: "Looking for a modern Thunderbird alternative? Inboxed offers the same offline privacy but with powerful local AI features built natively for Mac.",
      canonical: "https://inboxed.email/compare/thunderbird",
    },
    h1: "Inboxed vs. Thunderbird",
    intro: "Thunderbird is the classic choice for privacy. But it feels stuck in the past. Inboxed is the modern evolution: offline privacy meets local intelligence.",
    rows: [
      { feature: "Built-in AI", competitor: "None / Plugins only", competitorIcon: "x", inboxed: "Native Local LLM", inboxedIcon: "check" },
      { feature: "Privacy Model", competitor: "Local Storage", competitorIcon: "neutral", inboxed: "Local + On-Device AI", inboxedIcon: "shield" },
      { feature: "Performance", competitor: "Legacy / Resource Heavy", competitorIcon: "neutral", inboxed: "Metal GPU Accelerated", inboxedIcon: "cpu" },
      { feature: "Interface", competitor: "Cluttered / Complex", competitorIcon: "neutral", inboxed: "Minimalist / Focused", inboxedIcon: "check" },
      { feature: "Smart Search", competitor: "Keyword-based", competitorIcon: "neutral", inboxed: "Semantic / AI-Powered", inboxedIcon: "check" },
      { feature: "Architecture", competitor: "XUL / Web-based Tech", competitorIcon: "neutral", inboxed: "Rust + Tauri (Native)", inboxedIcon: "check" },
    ],
    whySwitch: {
      heading: "The best of both worlds.",
      paragraphs: [
        "You chose Thunderbird because you don't want your emails in a cloud silo. Inboxed respects that same philosophy but adds the features you need in 2026.",
        "Get AI summaries, smart replies, and semantic search without ever connecting to a third-party AI server.",
      ],
    },
    cta: "Download Inboxed",
    schema: comparisonSchema("Thunderbird", "thunderbird"),
  },
  {
    slug: "apple-mail",
    name: "Apple Mail",
    seo: {
      title: "Apple Mail Alternative with On-Device AI | Inboxed",
      description: "Love Apple Mail's privacy but want more intelligence? Inboxed is the native Mac email app with local LLMs for summarization and smart replies.",
      canonical: "https://inboxed.email/compare/apple-mail",
    },
    h1: "Inboxed vs. Apple Mail",
    intro: "Apple Mail is the standard for privacy on Mac. Inboxed takes that foundation and adds the power of a local Private LLM.",
    rows: [
      { feature: "Email Summaries", competitor: "Manual / Limited", competitorIcon: "neutral", inboxed: "Instant Local AI", inboxedIcon: "check" },
      { feature: "Smart Reply", competitor: "Suggested phrases", competitorIcon: "neutral", inboxed: "Full Draft Generation", inboxedIcon: "check" },
      { feature: "Privacy", competitor: "Native Privacy", competitorIcon: "neutral", inboxed: "Zero-Data-Exit AI", inboxedIcon: "shield" },
      { feature: "Search", competitor: "Keyword Index", competitorIcon: "neutral", inboxed: "Semantic (AI) Search", inboxedIcon: "search" },
      { feature: "Speed", competitor: "Fast (Native)", competitorIcon: "neutral", inboxed: "Ultra-Fast (Rust/Metal)", inboxedIcon: "zap" },
    ],
    whySwitch: {
      heading: "Built for the future of Apple Silicon.",
      paragraphs: [
        "Inboxed isn't just an email client; it's a productivity layer that lives on your machine. By using Apple's MLX and Metal, we provide intelligence that feels like part of the OS, but with more power than the defaults.",
        "Keep the privacy you love from Apple Mail. Get the power you've been seeing in cloud-based tools.",
      ],
    },
    cta: "Switch to Inboxed",
    schema: comparisonSchema("Apple Mail", "apple-mail"),
  },
  // ─ New comparisons ─
  {
    slug: "gmail",
    name: "Gmail",
    seo: {
      title: "Gmail Alternative with Private AI (No Data Mining) | Inboxed",
      description: "Tired of Gmail scanning your emails for ads? Inboxed is a private Gmail alternative with local AI that never touches a cloud server.",
      canonical: "https://inboxed.email/compare/gmail",
    },
    h1: "The Private Gmail Alternative.",
    intro: "Gmail is the world's most popular email client. But your data fuels Google's ad machine. Inboxed gives you smart email without the surveillance.",
    rows: [
      { feature: "AI Processing", competitor: "Google Cloud (Gemini)", competitorIcon: "x", inboxed: "Local LLM (Apple MLX)", inboxedIcon: "check" },
      { feature: "Privacy", competitor: "Scanned for ads", competitorIcon: "x", inboxed: "100% Private", inboxedIcon: "shield" },
      { feature: "Cost", competitor: "Free (you are the product)", competitorIcon: "neutral", inboxed: "Free (Pro: $1 lifetime)", inboxedIcon: "zap" },
      { feature: "Data Ownership", competitor: "Google retains data", competitorIcon: "x", inboxed: "Your Mac only", inboxedIcon: "check" },
      { feature: "Offline Access", competitor: "Limited offline mode", competitorIcon: "x", inboxed: "Full offline with AI", inboxedIcon: "check" },
      { feature: "App Type", competitor: "Web app / PWA", competitorIcon: "neutral", inboxed: "Native macOS (Rust)", inboxedIcon: "check" },
    ],
    whySwitch: {
      heading: "Your inbox, not Google's.",
      paragraphs: [
        "Google reads your emails to serve you ads. Every receipt, every flight confirmation, every personal conversation — analyzed and monetized.",
        "Inboxed brings the same smart features — summaries, smart replies, search — without sending a single byte to any server. Your Mac handles everything locally.",
      ],
    },
    cta: "Try Inboxed — Free",
    schema: comparisonSchema("Gmail", "gmail"),
  },
  {
    slug: "outlook",
    name: "Outlook",
    seo: {
      title: "Outlook Alternative for Mac with Local AI | Inboxed",
      description: "Switch from Outlook to Inboxed — a native macOS email client with private, on-device AI. No Microsoft account or subscription needed.",
      canonical: "https://inboxed.email/compare/outlook",
    },
    h1: "Inboxed vs. Outlook",
    intro: "Outlook is the enterprise default. But on Mac, it's a resource-heavy port packed with features you don't need. Inboxed is purpose-built for macOS.",
    rows: [
      { feature: "AI Processing", competitor: "Microsoft Copilot (Cloud)", competitorIcon: "x", inboxed: "Local LLM (Apple MLX)", inboxedIcon: "check" },
      { feature: "Privacy", competitor: "Microsoft cloud sync", competitorIcon: "x", inboxed: "100% On-Device", inboxedIcon: "shield" },
      { feature: "Cost", competitor: "$99/year (M365)", competitorIcon: "neutral", inboxed: "Free (Pro: $1 lifetime)", inboxedIcon: "zap" },
      { feature: "Performance", competitor: "Heavy / Bloated", competitorIcon: "x", inboxed: "Ultra-light (Rust + Tauri)", inboxedIcon: "cpu" },
      { feature: "Platform", competitor: "Cross-platform port", competitorIcon: "neutral", inboxed: "Native macOS", inboxedIcon: "check" },
      { feature: "Subscription", competitor: "Required", competitorIcon: "x", inboxed: "None needed", inboxedIcon: "check" },
    ],
    whySwitch: {
      heading: "Escape the subscription trap.",
      paragraphs: [
        "Outlook wants a $99/year Microsoft 365 subscription for full features. And your emails pass through Microsoft's servers for AI processing.",
        "Inboxed costs nothing to use, runs natively on macOS, and keeps every email AI interaction on your device.",
      ],
    },
    cta: "Get Inboxed — Free",
    schema: comparisonSchema("Outlook", "outlook"),
  },
  {
    slug: "spark",
    name: "Spark",
    seo: {
      title: "Spark Email Alternative with Private AI | Inboxed",
      description: "Looking for a Spark alternative that doesn't store your emails on third-party servers? Inboxed runs AI locally on your Mac for total privacy.",
      canonical: "https://inboxed.email/compare/spark",
    },
    h1: "Inboxed vs. Spark",
    intro: "Spark is a polished email client. But it stores your emails on Readdle's servers to power its features. Inboxed gives you the polish without the privacy trade-off.",
    rows: [
      { feature: "AI Processing", competitor: "Cloud-based (OpenAI)", competitorIcon: "x", inboxed: "Local LLM (Apple MLX)", inboxedIcon: "check" },
      { feature: "Privacy", competitor: "Emails stored on Readdle servers", competitorIcon: "x", inboxed: "100% On-Device", inboxedIcon: "shield" },
      { feature: "Cost", competitor: "$59/year (Premium)", competitorIcon: "neutral", inboxed: "Free (Pro: $1 lifetime)", inboxedIcon: "zap" },
      { feature: "AI Smart Reply", competitor: "Cloud AI (GPT-4)", competitorIcon: "x", inboxed: "Local LLM on Metal GPU", inboxedIcon: "check" },
      { feature: "Data Ownership", competitor: "Readdle retains copies", competitorIcon: "x", inboxed: "Your Mac only", inboxedIcon: "check" },
    ],
    whySwitch: {
      heading: "Same polish. Zero cloud dependency.",
      paragraphs: [
        "Spark's AI features are impressive — but they require your emails to be stored on Readdle's servers and processed through OpenAI's API.",
        "Inboxed delivers the same smart features using models that run entirely on your Mac. No server storage, no API calls, no data sharing.",
      ],
    },
    cta: "Try Inboxed — Free",
    schema: comparisonSchema("Spark", "spark"),
  },
  {
    slug: "hey",
    name: "HEY",
    seo: {
      title: "HEY Email Alternative (No Subscription) | Inboxed",
      description: "Love HEY's philosophy but not the $99/year price? Inboxed offers inbox zero philosophy with local AI — free, private, and native on Mac.",
      canonical: "https://inboxed.email/compare/hey",
    },
    h1: "Inboxed vs. HEY",
    intro: "HEY reimagined email. But at $99/year with no IMAP support, you're locked into Basecamp's ecosystem. Inboxed gives you the philosophy without the lock-in.",
    rows: [
      { feature: "AI Features", competitor: "Basic (cloud-based)", competitorIcon: "neutral", inboxed: "Local LLM (Apple MLX)", inboxedIcon: "check" },
      { feature: "Privacy", competitor: "Basecamp cloud servers", competitorIcon: "x", inboxed: "100% On-Device", inboxedIcon: "shield" },
      { feature: "Cost", competitor: "$99/year", competitorIcon: "neutral", inboxed: "Free (Pro: $1 lifetime)", inboxedIcon: "zap" },
      { feature: "Email Provider", competitor: "HEY-only (@hey.com)", competitorIcon: "x", inboxed: "Any IMAP account", inboxedIcon: "check" },
      { feature: "Platform", competitor: "Web-first", competitorIcon: "neutral", inboxed: "Native macOS (Rust)", inboxedIcon: "check" },
      { feature: "Data Portability", competitor: "No IMAP export", competitorIcon: "x", inboxed: "Standard IMAP", inboxedIcon: "check" },
    ],
    whySwitch: {
      heading: "Keep your email address. Keep your freedom.",
      paragraphs: [
        "HEY forces you to use their proprietary email address and servers. If you cancel, you lose your address.",
        "Inboxed works with any IMAP email account. Your Gmail, Fastmail, or company email — with local AI intelligence layered on top.",
      ],
    },
    cta: "Try Inboxed — Free",
    schema: comparisonSchema("HEY", "hey"),
  },
  {
    slug: "mailspring",
    name: "Mailspring",
    seo: {
      title: "Mailspring Alternative with AI Superpowers | Inboxed",
      description: "Looking for a modern Mailspring alternative? Inboxed offers native macOS performance with on-device AI — no Electron, no cloud dependency.",
      canonical: "https://inboxed.email/compare/mailspring",
    },
    h1: "Inboxed vs. Mailspring",
    intro: "Mailspring is a solid Electron-based email client. But Electron apps can't match native performance, and Mailspring lacks built-in AI entirely.",
    rows: [
      { feature: "AI Features", competitor: "None", competitorIcon: "x", inboxed: "Local LLM (Apple MLX)", inboxedIcon: "check" },
      { feature: "Architecture", competitor: "Electron (Chromium)", competitorIcon: "x", inboxed: "Rust + Tauri (Native)", inboxedIcon: "check" },
      { feature: "Performance", competitor: "~300MB RAM", competitorIcon: "x", inboxed: "~50MB RAM", inboxedIcon: "cpu" },
      { feature: "Cost", competitor: "$8/mo (Pro)", competitorIcon: "neutral", inboxed: "Free (Pro: $1 lifetime)", inboxedIcon: "zap" },
      { feature: "Privacy", competitor: "Mailspring ID required", competitorIcon: "x", inboxed: "No account needed", inboxedIcon: "shield" },
    ],
    whySwitch: {
      heading: "Native performance. Built-in intelligence.",
      paragraphs: [
        "Mailspring brought modern design to desktop email, but it's still an Electron app with no AI features. Inboxed is what Mailspring would be if it were rebuilt from scratch for Apple Silicon.",
      ],
    },
    cta: "Try Inboxed — Free",
    schema: comparisonSchema("Mailspring", "mailspring"),
  },
  {
    slug: "proton-mail",
    name: "Proton Mail",
    seo: {
      title: "Proton Mail Alternative with Local AI | Inboxed",
      description: "Want Proton Mail's privacy philosophy with on-device AI? Inboxed keeps your emails private and adds intelligent features — no server-side processing.",
      canonical: "https://inboxed.email/compare/proton-mail",
    },
    h1: "Inboxed vs. Proton Mail",
    intro: "Proton Mail is the gold standard for encrypted email. But encryption alone isn't intelligence. Inboxed adds local AI to the privacy-first equation.",
    rows: [
      { feature: "AI Features", competitor: "None (privacy trade-off)", competitorIcon: "x", inboxed: "Local LLM (Apple MLX)", inboxedIcon: "check" },
      { feature: "Encryption", competitor: "End-to-end (server)", competitorIcon: "check", inboxed: "On-device only", inboxedIcon: "shield" },
      { feature: "Cost", competitor: "Free / $48/year (Plus)", competitorIcon: "neutral", inboxed: "Free (Pro: $1 lifetime)", inboxedIcon: "zap" },
      { feature: "Email Provider", competitor: "Proton-only address", competitorIcon: "x", inboxed: "Any IMAP account", inboxedIcon: "check" },
      { feature: "App Type", competitor: "Web + Bridge app", competitorIcon: "neutral", inboxed: "Native macOS (Rust)", inboxedIcon: "check" },
      { feature: "Smart Features", competitor: "Basic filters", competitorIcon: "neutral", inboxed: "AI summaries + smart reply", inboxedIcon: "check" },
    ],
    whySwitch: {
      heading: "Privacy + Intelligence.",
      paragraphs: [
        "Proton Mail made email private. But it explicitly avoids AI features because they can't do them without reading your emails on their servers.",
        "Inboxed solves this paradox: AI that runs entirely on your Mac. Your emails never leave your device, but you still get summaries, smart replies, and semantic search.",
      ],
    },
    cta: "Try Inboxed — Free",
    schema: comparisonSchema("Proton Mail", "proton-mail"),
  },
  {
    slug: "mimestream",
    name: "Mimestream",
    seo: {
      title: "Mimestream Alternative with AI & Multi-Account IMAP | Inboxed",
      description: "Mimestream only supports Gmail. Inboxed works with any IMAP account and adds local AI intelligence — summaries, smart replies, and semantic search.",
      canonical: "https://inboxed.email/compare/mimestream",
    },
    h1: "Inboxed vs. Mimestream",
    intro: "Mimestream is a beautifully crafted native Mac email client. But it only works with Gmail. Inboxed supports any IMAP account and adds local AI that Mimestream doesn't have.",
    rows: [
      { feature: "Email Providers", competitor: "Gmail only", competitorIcon: "x", inboxed: "Any IMAP account", inboxedIcon: "check" },
      { feature: "AI Features", competitor: "None (Apple Intelligence only)", competitorIcon: "x", inboxed: "Local LLM (Apple MLX)", inboxedIcon: "check" },
      { feature: "Privacy", competitor: "Gmail data policies apply", competitorIcon: "neutral", inboxed: "100% On-Device AI", inboxedIcon: "shield" },
      { feature: "Cost", competitor: "$50/year", competitorIcon: "neutral", inboxed: "Free (Pro: $1 lifetime)", inboxedIcon: "zap" },
      { feature: "Architecture", competitor: "Native Swift", competitorIcon: "check", inboxed: "Native Rust + Tauri", inboxedIcon: "check" },
      { feature: "Smart Search", competitor: "Gmail search", competitorIcon: "neutral", inboxed: "Semantic AI search", inboxedIcon: "search" },
    ],
    whySwitch: {
      heading: "Beyond Gmail. Beyond basic.",
      paragraphs: [
        "Mimestream is excellent — if you only use Gmail. But the moment you need a work Exchange account, a Fastmail address, or a ProtonMail bridge, you're stuck.",
        "Inboxed supports any IMAP provider and adds AI intelligence that Mimestream simply doesn't offer. Summaries, smart replies, and semantic search — all running locally on your Mac.",
      ],
    },
    cta: "Try Inboxed — Free",
    schema: comparisonSchema("Mimestream", "mimestream"),
  },
  {
    slug: "notion-mail",
    name: "Notion Mail",
    seo: {
      title: "Notion Mail Alternative with Private Local AI | Inboxed",
      description: "Notion Mail sends your emails to Notion's cloud for AI features. Inboxed runs AI 100% on your Mac — same intelligence, complete privacy.",
      canonical: "https://inboxed.email/compare/notion-mail",
    },
    h1: "Inboxed vs. Notion Mail",
    intro: "Notion Mail brings Notion's organizational philosophy to email. But like all Notion products, it's cloud-first. Inboxed gives you smart email without the cloud dependency.",
    rows: [
      { feature: "AI Processing", competitor: "Notion Cloud (OpenAI)", competitorIcon: "x", inboxed: "Local LLM (Apple MLX)", inboxedIcon: "check" },
      { feature: "Privacy", competitor: "Emails processed in cloud", competitorIcon: "x", inboxed: "100% On-Device", inboxedIcon: "shield" },
      { feature: "Cost", competitor: "Free tier + paid plans", competitorIcon: "neutral", inboxed: "Free (Pro: $1 lifetime)", inboxedIcon: "zap" },
      { feature: "Offline AI", competitor: "Requires internet", competitorIcon: "x", inboxed: "Full offline AI", inboxedIcon: "check" },
      { feature: "Platform", competitor: "Web-first", competitorIcon: "neutral", inboxed: "Native macOS (Rust)", inboxedIcon: "check" },
      { feature: "Email Providers", competitor: "Gmail focus", competitorIcon: "neutral", inboxed: "Any IMAP account", inboxedIcon: "check" },
    ],
    whySwitch: {
      heading: "Intelligence without the cloud.",
      paragraphs: [
        "Notion Mail is a natural extension of Notion's ecosystem — but that means your emails flow through Notion's servers and their AI partners. For confidential communications, that's a non-starter.",
        "Inboxed provides the same smart email experience — summaries, categorization, smart replies — powered by a local LLM that never sends data anywhere.",
      ],
    },
    cta: "Try Inboxed — Free",
    schema: comparisonSchema("Notion Mail", "notion-mail"),
  },
  {
    slug: "canary-mail",
    name: "Canary Mail",
    seo: {
      title: "Canary Mail Alternative with True Local AI | Inboxed",
      description: "Canary Mail claims AI features, but they're cloud-powered. Inboxed runs AI 100% on your Mac — genuine local intelligence for email.",
      canonical: "https://inboxed.email/compare/canary-mail",
    },
    h1: "Inboxed vs. Canary Mail",
    intro: "Canary Mail markets itself as a private AI email client. But its AI features rely on cloud APIs. Inboxed is the real deal — 100% local AI.",
    rows: [
      { feature: "AI Processing", competitor: "Cloud API (marketed as private)", competitorIcon: "x", inboxed: "Genuinely local (Apple MLX)", inboxedIcon: "check" },
      { feature: "Privacy", competitor: "Cloud AI processing", competitorIcon: "x", inboxed: "100% On-Device", inboxedIcon: "shield" },
      { feature: "Cost", competitor: "$20/year", competitorIcon: "neutral", inboxed: "Free (Pro: $1 lifetime)", inboxedIcon: "zap" },
      { feature: "Architecture", competitor: "Swift (Native)", competitorIcon: "check", inboxed: "Rust + Tauri (Native)", inboxedIcon: "check" },
      { feature: "AI Model Size", competitor: "API-dependent", competitorIcon: "x", inboxed: "7B+ params on Metal", inboxedIcon: "cpu" },
    ],
    whySwitch: {
      heading: "Real privacy, not marketing.",
      paragraphs: [
        "Canary Mail calls its AI \"private\" — but it sends your emails to OpenAI's API for processing. That's not private; that's outsourcing.",
        "Inboxed runs a 7B+ parameter LLM directly on your Mac's GPU using Apple Metal. Your emails never leave your device. That's real privacy.",
      ],
    },
    cta: "Try Inboxed — Free",
    schema: comparisonSchema("Canary Mail", "canary-mail"),
  },
  {
    slug: "edison-mail",
    name: "Edison Mail",
    seo: {
      title: "Edison Mail Alternative (No Data Harvesting) | Inboxed",
      description: "Edison Mail was caught selling user email data. Inboxed is the private alternative — local AI that never phones home.",
      canonical: "https://inboxed.email/compare/edison-mail",
    },
    h1: "Inboxed vs. Edison Mail",
    intro: "Edison Mail is a popular free email client. But \"free\" comes at a cost — Edison has been caught monetizing user email data. Inboxed is genuinely free and genuinely private.",
    rows: [
      { feature: "AI Processing", competitor: "Cloud-based", competitorIcon: "x", inboxed: "Local LLM (Apple MLX)", inboxedIcon: "check" },
      { feature: "Privacy", competitor: "Data monetization reported", competitorIcon: "x", inboxed: "100% On-Device", inboxedIcon: "shield" },
      { feature: "Cost", competitor: "Free (data-funded)", competitorIcon: "neutral", inboxed: "Free (no data harvesting)", inboxedIcon: "zap" },
      { feature: "Business Model", competitor: "Sells aggregated data", competitorIcon: "x", inboxed: "One-time Pro upgrade", inboxedIcon: "check" },
      { feature: "Platform", competitor: "Cross-platform", competitorIcon: "neutral", inboxed: "Native macOS (Rust)", inboxedIcon: "check" },
    ],
    whySwitch: {
      heading: "Free shouldn't mean you're the product.",
      paragraphs: [
        "Edison Mail's business model relies on analyzing user emails to generate \"commerce data\" sold to companies. Multiple investigations have confirmed this practice.",
        "Inboxed is free because our business model is simple: a $1 lifetime Pro upgrade. No data harvesting, no analytics, no third-party sharing. Ever.",
      ],
    },
    cta: "Try Inboxed — Free",
    schema: comparisonSchema("Edison Mail", "edison-mail"),
  },
];

// ── Use-Case Data ────────────────────────────────

export const useCases: UseCaseData[] = [
  {
    slug: "developers",
    profession: "Developers",
    seo: {
      title: "Best Email Client for Developers (2026) | Inboxed",
      description: "A fast, keyboard-driven email client built for developers. Local AI, Rust-powered, no Electron bloat. Inboxed is the developer's email.",
      canonical: "https://inboxed.email/best-email-for/developers",
    },
    h1: "The Best Email Client for Developers",
    intro: "You spend your day in terminals and IDEs. Your email client should feel just as fast and intentional. Inboxed is built with Rust, runs local AI, and respects your workflow.",
    painPoints: [
      { title: "Electron bloat", description: "Most modern email apps are Electron wrappers consuming 500MB+ of RAM alongside your IDE." },
      { title: "Keyboard-hostile UIs", description: "Clicking through menus to archive an email is a workflow killer." },
      { title: "Cloud AI on your code discussions", description: "Your technical discussions pass through third-party AI servers for \"smart\" features." },
    ],
    solutions: [
      { title: "10MB native app", description: "Built with Rust and Tauri — not another Chromium wrapper. Uses ~50MB RAM." },
      { title: "Keyboard-first design", description: "Navigate, triage, and reply without touching your mouse. Vim-inspired shortcuts." },
      { title: "Local AI that understands context", description: "Summarize long threads, draft replies, and search semantically — all on your Mac's GPU." },
    ],
    features: ["Keyboard shortcuts", "Local AI summaries", "Semantic search", "Minimal RAM usage", "Native Apple Silicon", "IMAP compatibility"],
    cta: "Download Inboxed — Free",
    schema: useCaseSchema("Developers", "developers"),
  },
  {
    slug: "lawyers",
    profession: "Lawyers",
    seo: {
      title: "Best Email Client for Lawyers & Legal Teams (2026) | Inboxed",
      description: "Client confidentiality meets AI productivity. Inboxed processes emails locally on your Mac — no cloud servers see your privileged communications.",
      canonical: "https://inboxed.email/best-email-for/lawyers",
    },
    h1: "The Best Email Client for Lawyers",
    intro: "Attorney-client privilege doesn't end at your inbox. Inboxed runs AI entirely on your Mac, so privileged communications never touch a cloud server.",
    painPoints: [
      { title: "Privileged data in the cloud", description: "Cloud email AI means your privileged communications are processed on third-party servers." },
      { title: "Long email threads", description: "Legal correspondence involves lengthy chains that take minutes to re-read for context." },
      { title: "Search across cases", description: "Finding that one clause reference across hundreds of emails is a daily struggle." },
    ],
    solutions: [
      { title: "Privilege-safe AI", description: "AI processing happens entirely on your Mac. No data leaves your device — ever." },
      { title: "Instant thread summaries", description: "Get the key points from a 50-email chain in seconds with on-device AI summarization." },
      { title: "Semantic legal search", description: "Search by meaning, not just keywords. Find \"indemnification clause discussions\" even if those exact words weren't used." },
    ],
    features: ["On-device AI", "Thread summaries", "Semantic search", "Zero cloud exposure", "IMAP for any provider", "Professional UI"],
    cta: "Try Inboxed — Free",
    schema: useCaseSchema("Lawyers", "lawyers"),
  },
  {
    slug: "journalists",
    profession: "Journalists",
    seo: {
      title: "Best Email Client for Journalists (2026) | Inboxed",
      description: "Protect your sources. Inboxed runs AI locally — your email communications never pass through cloud servers. Source protection starts at your inbox.",
      canonical: "https://inboxed.email/best-email-for/journalists",
    },
    h1: "The Best Email Client for Journalists",
    intro: "Your sources trust you with sensitive information. That trust extends to your email client. Inboxed ensures your communications stay on your device.",
    painPoints: [
      { title: "Source protection", description: "Cloud-based email AI means a third party can see who's writing to you and what they're saying." },
      { title: "Research overload", description: "Dozens of sources, tips, and threads to track for a single story." },
      { title: "Speed under deadline", description: "You need to triage your inbox fast when breaking news hits." },
    ],
    solutions: [
      { title: "Source-safe by design", description: "No cloud processing means no third-party access to your source communications. Period." },
      { title: "AI-powered research", description: "Summarize source threads, extract key facts, and search across all your emails semantically." },
      { title: "Lightning-fast triage", description: "Keyboard-driven workflow lets you process your inbox in minutes, not hours." },
    ],
    features: ["Source protection", "Local AI", "Fast triage", "Semantic search", "Thread summaries", "Offline access"],
    cta: "Download Inboxed — Free",
    schema: useCaseSchema("Journalists", "journalists"),
  },
  {
    slug: "executives",
    profession: "Executives",
    seo: {
      title: "Best Email Client for Executives & CEOs (2026) | Inboxed",
      description: "Executive communications are high-stakes. Inboxed gives you AI-powered email management that runs privately on your Mac — no cloud exposure.",
      canonical: "https://inboxed.email/best-email-for/executives",
    },
    h1: "The Best Email Client for Executives",
    intro: "Every email you send carries weight. Board communications, M&A discussions, investor updates — they deserve an email client that treats them with the gravity they require.",
    painPoints: [
      { title: "Sensitive communications", description: "Board discussions and strategic plans flowing through cloud AI services is a compliance nightmare." },
      { title: "Information overload", description: "200+ emails per day make it impossible to focus on what matters." },
      { title: "Travel and connectivity", description: "You need full email intelligence on flights and in areas with poor connectivity." },
    ],
    solutions: [
      { title: "Boardroom-grade privacy", description: "AI that runs on your Mac. No cloud servers processing your strategic communications." },
      { title: "AI-powered prioritization", description: "Instantly summarize threads, draft responses, and focus on high-priority messages." },
      { title: "Full offline intelligence", description: "AI summaries and smart replies work without internet — perfect for flights and travel." },
    ],
    features: ["Executive privacy", "AI summaries", "Smart prioritization", "Offline AI", "Fast search", "Clean interface"],
    cta: "Try Inboxed — Free",
    schema: useCaseSchema("Executives", "executives"),
  },
  {
    slug: "freelancers",
    profession: "Freelancers",
    seo: {
      title: "Best Email Client for Freelancers (2026) | Inboxed",
      description: "Manage client communications efficiently with Inboxed — the free, AI-powered email client that helps freelancers respond faster and stay organized.",
      canonical: "https://inboxed.email/best-email-for/freelancers",
    },
    h1: "The Best Email Client for Freelancers",
    intro: "Client emails are your business lifeline. Inboxed helps you respond faster, stay organized, and maintain professionalism — all for free.",
    painPoints: [
      { title: "Multiple client accounts", description: "Juggling emails across different client accounts and projects is chaotic." },
      { title: "Response time pressure", description: "Slow responses lose clients. But crafting thoughtful replies takes time." },
      { title: "Tool costs add up", description: "Email clients that charge monthly subscriptions eat into your margins." },
    ],
    solutions: [
      { title: "Unified inbox", description: "Connect all your IMAP accounts. See everything in one place without switching contexts." },
      { title: "AI draft generation", description: "Get intelligent reply drafts in seconds. Review, edit, and send — maintaining your voice while saving time." },
      { title: "Genuinely free", description: "Inboxed is free. The Pro upgrade is a one-time $1 payment. No monthly drain on your income." },
    ],
    features: ["Multi-account IMAP", "AI reply drafts", "Free forever", "Fast performance", "Semantic search", "Local privacy"],
    cta: "Get Inboxed — Free",
    schema: useCaseSchema("Freelancers", "freelancers"),
  },
  {
    slug: "startup-founders",
    profession: "Startup Founders",
    seo: {
      title: "Best Email Client for Startup Founders (2026) | Inboxed",
      description: "Investor updates, candidate emails, customer feedback — all processed privately on your Mac with AI. Inboxed is built for founder-speed.",
      canonical: "https://inboxed.email/best-email-for/startup-founders",
    },
    h1: "The Best Email Client for Startup Founders",
    intro: "You're moving fast. Investor outreach, hiring pipelines, customer feedback — your inbox is your command center. Inboxed makes it intelligent without compromising speed or privacy.",
    painPoints: [
      { title: "Investor communications", description: "Fundraising emails contain sensitive financial data you can't risk on cloud AI servers." },
      { title: "Context switching", description: "Jumping between hiring, sales, product, and investor threads is mentally exhausting." },
      { title: "Speed is everything", description: "Slow email tools kill momentum when you're racing to ship." },
    ],
    solutions: [
      { title: "Confidential AI", description: "Financial projections and term sheets stay on your Mac. AI never sends data to the cloud." },
      { title: "Instant thread context", description: "AI summaries let you jump into any thread — hiring, sales, product — with full context in seconds." },
      { title: "Founder-fast", description: "10MB app, instant startup, keyboard-driven. Inboxed keeps pace with founder speed." },
    ],
    features: ["Private AI", "Thread summaries", "Keyboard shortcuts", "IMAP support", "Instant launch", "Offline capable"],
    cta: "Try Inboxed — Free",
    schema: useCaseSchema("Startup Founders", "startup-founders"),
  },
  {
    slug: "privacy-focused",
    profession: "Privacy-Focused Users",
    seo: {
      title: "Best Email Client for Privacy (2026) | Inboxed",
      description: "The most private email client with AI. Inboxed runs all intelligence locally on your Mac — zero cloud processing, zero data sharing, zero tracking.",
      canonical: "https://inboxed.email/best-email-for/privacy-focused",
    },
    h1: "The Most Private Email Client with AI",
    intro: "You shouldn't have to choose between privacy and intelligence. Inboxed runs AI entirely on your Mac, so you get smart email without sacrificing a single byte of privacy.",
    painPoints: [
      { title: "AI vs Privacy trade-off", description: "Every \"smart\" email app requires cloud processing — meaning your emails are read by servers." },
      { title: "Data harvesting", description: "Free email clients monetize your data. Paid ones still use cloud AI processing." },
      { title: "No transparency", description: "Most apps don't disclose what happens to your email data during AI processing." },
    ],
    solutions: [
      { title: "Verifiably local", description: "Inboxed uses Apple MLX to run AI models directly on your Mac's GPU. No network calls for AI features." },
      { title: "No telemetry", description: "No analytics, no usage tracking, no crash reporting that sends your data anywhere." },
      { title: "Open architecture", description: "Built with Rust and Tauri — inspect the network traffic yourself. Nothing phones home." },
    ],
    features: ["100% local AI", "Zero telemetry", "No account required", "IMAP only", "On-device processing", "Metal GPU acceleration"],
    cta: "Download Inboxed — Free",
    schema: useCaseSchema("Privacy-Focused Users", "privacy-focused"),
  },
  {
    slug: "remote-workers",
    profession: "Remote Workers",
    seo: {
      title: "Best Email Client for Remote Workers (2026) | Inboxed",
      description: "Work from anywhere with full AI email intelligence — even offline. Inboxed runs locally on your Mac, no internet needed for smart features.",
      canonical: "https://inboxed.email/best-email-for/remote-workers",
    },
    h1: "The Best Email Client for Remote Workers",
    intro: "Coffee shops, co-working spaces, airport lounges — remote work means unreliable internet. Inboxed's local AI works everywhere, with or without a connection.",
    painPoints: [
      { title: "Unreliable internet", description: "Cloud-based email AI stops working the moment your WiFi drops." },
      { title: "Public WiFi risks", description: "Cloud AI means your emails transit through public networks to reach processing servers." },
      { title: "Async communication", description: "Remote teams rely heavily on email. Slow response times create bottlenecks." },
    ],
    solutions: [
      { title: "Offline AI intelligence", description: "Summaries, smart replies, and search work without internet. Your Mac handles everything locally." },
      { title: "Zero network exposure", description: "AI never sends data over the network. Safe on any WiFi, including public hotspots." },
      { title: "Faster async replies", description: "AI drafts help you respond thoughtfully in less time, keeping remote workflows moving." },
    ],
    features: ["Offline AI", "No network exposure", "Fast replies", "Semantic search", "Multi-account", "Lightweight app"],
    cta: "Try Inboxed — Free",
    schema: useCaseSchema("Remote Workers", "remote-workers"),
  },
  {
    slug: "students",
    profession: "Students",
    seo: {
      title: "Best Free Email Client for Students (2026) | Inboxed",
      description: "A free, fast email client for students. Inboxed runs on macOS with local AI — perfect for managing university, internship, and personal email.",
      canonical: "https://inboxed.email/best-email-for/students",
    },
    h1: "The Best Email Client for Students",
    intro: "Between professors, internship applications, and club emails, your inbox is busier than you'd think. Inboxed helps you stay on top of it — completely free.",
    painPoints: [
      { title: "Budget constraints", description: "Paid email clients like Superhuman ($30/mo) or Spark ($59/yr) aren't in a student budget." },
      { title: "Multiple accounts", description: "University email, personal Gmail, internship accounts — managing them all is fragmented." },
      { title: "Important emails buried", description: "That professor's deadline reminder is buried under 50 newsletters." },
    ],
    solutions: [
      { title: "100% free", description: "Inboxed is free to use. No trial period, no feature restrictions, no hidden costs." },
      { title: "All accounts, one inbox", description: "Connect every IMAP account. University, personal, work — all in one clean interface." },
      { title: "AI-powered prioritization", description: "Smart summaries help you spot important emails instantly. Never miss a deadline again." },
    ],
    features: ["Completely free", "Multi-account", "AI summaries", "Fast and lightweight", "macOS native", "Semantic search"],
    cta: "Download Inboxed — Free",
    schema: useCaseSchema("Students", "students"),
  },
  {
    slug: "consultants",
    profession: "Consultants",
    seo: {
      title: "Best Email Client for Consultants (2026) | Inboxed",
      description: "Manage multiple client engagements privately. Inboxed's local AI keeps client communications confidential while helping you respond faster.",
      canonical: "https://inboxed.email/best-email-for/consultants",
    },
    h1: "The Best Email Client for Consultants",
    intro: "Every client engagement means a new stream of confidential communications. Inboxed helps you manage them all with AI that never leaves your Mac.",
    painPoints: [
      { title: "Client confidentiality", description: "Consulting engagements involve NDAs and sensitive information that can't be cloud-processed." },
      { title: "Multi-client juggling", description: "Switching context between 5+ active engagements means losing time to re-reading threads." },
      { title: "Professional responses", description: "Client-facing emails need to be polished and thoughtful, but writing them is time-consuming." },
    ],
    solutions: [
      { title: "NDA-compliant AI", description: "AI runs on your Mac. Client communications are never sent to any cloud service for processing." },
      { title: "Instant context switching", description: "AI thread summaries let you jump into any client engagement with full context in seconds." },
      { title: "AI reply drafts", description: "Get professional, context-aware reply drafts. Review and personalize in seconds instead of minutes." },
    ],
    features: ["Client confidentiality", "Thread summaries", "AI drafts", "Multi-account", "Fast search", "Offline capable"],
    cta: "Try Inboxed — Free",
    schema: useCaseSchema("Consultants", "consultants"),
  },
  {
    slug: "healthcare",
    profession: "Healthcare Professionals",
    seo: {
      title: "Best Email Client for Healthcare & HIPAA (2026) | Inboxed",
      description: "HIPAA-friendly email with AI that never leaves your device. Inboxed processes patient communications locally on your Mac — zero cloud exposure.",
      canonical: "https://inboxed.email/best-email-for/healthcare",
    },
    h1: "The Best Email Client for Healthcare Professionals",
    intro: "Patient data is sacred. HIPAA demands it. But most email AI features send your messages to third-party cloud servers. Inboxed keeps everything on your Mac.",
    painPoints: [
      { title: "HIPAA compliance risk", description: "Cloud AI processing of patient communications may violate HIPAA's minimum necessary standard and BAA requirements." },
      { title: "PHI in every thread", description: "Appointment confirmations, lab results, referral discussions — protected health information flows through email constantly." },
      { title: "Outdated tools", description: "Healthcare IT often locks you into clunky, enterprise email clients that lack modern productivity features." },
    ],
    solutions: [
      { title: "Zero cloud AI exposure", description: "Inboxed runs AI entirely on your Mac's GPU. Patient data never touches a third-party server for AI processing." },
      { title: "On-device intelligence", description: "Summarize long patient correspondence threads, draft professional responses, and search semantically — all locally." },
      { title: "Modern and lightweight", description: "A 10MB native app that launches instantly. No enterprise bloat, no IT department approval needed for the free tier." },
    ],
    features: ["HIPAA-friendly AI", "Zero cloud exposure", "Thread summaries", "Offline capable", "Semantic search", "Native macOS"],
    cta: "Try Inboxed — Free",
    schema: useCaseSchema("Healthcare Professionals", "healthcare"),
  },
  {
    slug: "financial-advisors",
    profession: "Financial Advisors",
    seo: {
      title: "Best Email Client for Financial Advisors (2026) | Inboxed",
      description: "Client portfolios and financial discussions deserve private AI. Inboxed processes all email intelligence locally — no cloud servers see your client data.",
      canonical: "https://inboxed.email/best-email-for/financial-advisors",
    },
    h1: "The Best Email Client for Financial Advisors",
    intro: "Your clients trust you with their financial futures. That trust extends to how you handle their communications. Inboxed keeps AI-powered email private.",
    painPoints: [
      { title: "Fiduciary duty extends to data", description: "Client financial details sent to cloud AI servers creates compliance and liability exposure." },
      { title: "SEC and FINRA scrutiny", description: "Regulatory bodies increasingly scrutinize how advisors handle digital client communications." },
      { title: "Volume of client emails", description: "Market updates, portfolio reviews, onboarding paperwork — managing dozens of client threads is time-consuming." },
    ],
    solutions: [
      { title: "Compliant AI assistance", description: "AI that runs on your Mac. Client financial data stays on your device — never processed by OpenAI, Google, or any third party." },
      { title: "Rapid client context", description: "AI thread summaries let you instantly recall the context of any client relationship before a call or meeting." },
      { title: "Professional draft responses", description: "AI-generated reply drafts help you respond to clients faster while maintaining your professional tone." },
    ],
    features: ["Client data privacy", "Thread summaries", "AI reply drafts", "Multi-account", "Fast semantic search", "Offline AI"],
    cta: "Try Inboxed — Free",
    schema: useCaseSchema("Financial Advisors", "financial-advisors"),
  },
  {
    slug: "researchers",
    profession: "Researchers & Academics",
    seo: {
      title: "Best Email Client for Researchers & Academics (2026) | Inboxed",
      description: "Manage peer reviews, grant communications, and collaboration emails with AI that respects academic confidentiality. 100% on-device processing.",
      canonical: "https://inboxed.email/best-email-for/researchers",
    },
    h1: "The Best Email Client for Researchers & Academics",
    intro: "Peer review communications, grant discussions, and research collaborations deserve privacy. Inboxed adds AI intelligence without compromising academic confidentiality.",
    painPoints: [
      { title: "Confidential peer review", description: "Reviewer comments and editorial decisions are strictly confidential — cloud AI processing violates this trust." },
      { title: "Grant and IP sensitivity", description: "Pre-publication research ideas and grant proposals contain intellectual property that must stay private." },
      { title: "Email overload", description: "Conference invitations, journal correspondence, student emails, department admin — academic inboxes are relentless." },
    ],
    solutions: [
      { title: "Reviewer-safe AI", description: "Summarize long editorial threads without sending reviewer identities or comments to any cloud server." },
      { title: "IP protection", description: "Draft and refine research correspondence with AI that runs locally. Your ideas never leave your Mac." },
      { title: "Smart inbox triage", description: "AI helps prioritize deadlines, separate student queries from journal correspondence, and surface urgent messages." },
    ],
    features: ["Academic privacy", "Local AI summaries", "Semantic search", "Multi-account IMAP", "Free to use", "Offline capable"],
    cta: "Download Inboxed — Free",
    schema: useCaseSchema("Researchers & Academics", "researchers"),
  },
];

// ── Alternatives Data ────────────────────────────

export const alternatives: AlternativesData[] = [
  {
    slug: "superhuman-alternatives",
    competitor: "Superhuman",
    seo: {
      title: "Best Superhuman Alternatives in 2026 (Free & Paid) | Inboxed",
      description: "Looking for Superhuman alternatives? Compare the best email clients that offer similar speed and features — including free options with local AI.",
      canonical: "https://inboxed.email/alternatives/superhuman-alternatives",
    },
    h1: "Best Superhuman Alternatives in 2026",
    intro: "Superhuman charges $30/month for a fast email experience. Here are the best alternatives that deliver similar speed and intelligence — many for free.",
    entries: [
      { name: "Inboxed", rank: 1, isInboxed: true, slug: "superhuman", description: "Native macOS email with local AI. Same speed as Superhuman but free, private, and runs entirely on your Mac.", pros: ["Free (Pro: $1 lifetime)", "100% local AI", "Native macOS performance", "10MB app size"], cons: ["macOS only", "Newer app"] },
      { name: "Spark", rank: 2, slug: "spark", description: "A polished cross-platform email client with AI features powered by cloud APIs.", pros: ["Cross-platform", "Team collaboration", "Polished UI"], cons: ["$59/year for AI", "Cloud-based AI", "Emails stored on Readdle servers"] },
      { name: "HEY", rank: 3, slug: "hey", description: "Basecamp's opinionated email service that reimagines inbox management.", pros: ["Unique workflow", "Good design philosophy"], cons: ["$99/year", "No IMAP", "Locked to @hey.com address"] },
      { name: "Canary Mail", rank: 4, slug: "canary-mail", description: "A privacy-focused email client with AI features marketed as on-device.", pros: ["Clean interface", "Multiple platforms"], cons: ["AI is cloud-based despite marketing", "$20/year"] },
    ],
    cta: "Try #1 Pick — Inboxed (Free)",
    schema: {} as Record<string, unknown>, // filled below
  },
  {
    slug: "gmail-alternatives",
    competitor: "Gmail",
    seo: {
      title: "Best Gmail Alternatives in 2026 (Private & Ad-Free) | Inboxed",
      description: "Stop Gmail from scanning your emails. These Gmail alternatives offer better privacy, local AI features, and no ad-driven data mining.",
      canonical: "https://inboxed.email/alternatives/gmail-alternatives",
    },
    h1: "Best Gmail Alternatives in 2026",
    intro: "Gmail scans your emails to serve targeted ads. If you're ready for privacy without losing smart features, these alternatives deliver.",
    entries: [
      { name: "Inboxed", rank: 1, isInboxed: true, slug: "gmail", description: "Use your existing Gmail account with Inboxed. Get local AI features without Google's data scanning.", pros: ["Works with Gmail via IMAP", "100% local AI", "Free", "No data scanning"], cons: ["macOS only", "New entrant"] },
      { name: "Proton Mail", rank: 2, slug: "proton-mail", description: "End-to-end encrypted email from Switzerland. The gold standard for email privacy.", pros: ["E2E encryption", "Swiss privacy laws", "Calendar/Drive bundle"], cons: ["No AI features", "Proton-only address", "$48/year for full features"] },
      { name: "Fastmail", rank: 3, description: "An independent, ad-free email service with great search and calendar integration.", pros: ["Fast and reliable", "Good search", "Custom domains"], cons: ["$50/year", "No AI features", "No local processing"] },
      { name: "Tutanota (Tuta)", rank: 4, description: "Open-source encrypted email from Germany with a strong privacy focus.", pros: ["Open source", "Encrypted", "Affordable"], cons: ["No AI", "Limited integrations", "Proprietary address required"] },
    ],
    cta: "Try #1 Pick — Inboxed (Free)",
    schema: {} as Record<string, unknown>,
  },
  {
    slug: "outlook-alternatives",
    competitor: "Outlook",
    seo: {
      title: "Best Outlook Alternatives for Mac in 2026 | Inboxed",
      description: "Tired of Outlook's bloat on Mac? These alternatives offer native performance, modern design, and AI features without a Microsoft 365 subscription.",
      canonical: "https://inboxed.email/alternatives/outlook-alternatives",
    },
    h1: "Best Outlook Alternatives for Mac in 2026",
    intro: "Outlook on Mac is a bloated port of its Windows counterpart. If you want a native email experience with modern AI, these alternatives are worth considering.",
    entries: [
      { name: "Inboxed", rank: 1, isInboxed: true, slug: "outlook", description: "A lightweight, native macOS email client with local AI. No Microsoft subscription required.", pros: ["Free", "10MB vs Outlook's 1GB+", "Local AI", "Native macOS"], cons: ["macOS only", "Newer app"] },
      { name: "Apple Mail", rank: 2, slug: "apple-mail", description: "The built-in macOS email client. Zero cost, reliable, and deeply integrated with the OS.", pros: ["Pre-installed", "Native performance", "iCloud integration"], cons: ["No AI features", "Basic search", "Limited customization"] },
      { name: "Spark", rank: 3, slug: "spark", description: "A modern email client with team features and AI assistance.", pros: ["Modern UI", "Smart inbox", "Cross-platform"], cons: ["$59/year for AI", "Cloud processing", "Readdle stores emails"] },
      { name: "Thunderbird", rank: 4, slug: "thunderbird", description: "The open-source veteran. Highly customizable but showing its age.", pros: ["Free", "Open source", "Cross-platform"], cons: ["No AI", "Dated interface", "Resource heavy"] },
    ],
    cta: "Try #1 Pick — Inboxed (Free)",
    schema: {} as Record<string, unknown>,
  },
  {
    slug: "apple-mail-alternatives",
    competitor: "Apple Mail",
    seo: {
      title: "Best Apple Mail Alternatives with AI (2026) | Inboxed",
      description: "Love Apple Mail's privacy but want AI features? These alternatives add intelligence to your Mac email without compromising on privacy.",
      canonical: "https://inboxed.email/alternatives/apple-mail-alternatives",
    },
    h1: "Best Apple Mail Alternatives in 2026",
    intro: "Apple Mail is reliable and private — but it hasn't evolved to include AI features. These alternatives add intelligence while maintaining what you love about Apple Mail.",
    entries: [
      { name: "Inboxed", rank: 1, isInboxed: true, slug: "apple-mail", description: "The natural upgrade from Apple Mail. Same privacy, same native performance, plus local AI intelligence.", pros: ["100% local AI", "Native macOS", "Free", "Same privacy as Apple Mail"], cons: ["Newer app", "No iOS yet"] },
      { name: "Spark", rank: 2, slug: "spark", description: "Feature-rich email with smart inbox and AI writing assistance.", pros: ["Smart inbox", "AI writing", "Team features"], cons: ["Cloud-based AI", "Emails on Readdle servers", "$59/year"] },
      { name: "Canary Mail", rank: 3, slug: "canary-mail", description: "Claims privacy-focused AI email with a clean interface.", pros: ["Clean design", "Encryption support"], cons: ["AI is cloud-based", "$20/year", "Privacy claims questionable"] },
      { name: "Airmail", rank: 4, description: "A customizable Mac email client with good workflow automation.", pros: ["Highly customizable", "Action-based workflows", "Native macOS"], cons: ["No AI", "Subscription model", "Can feel complex"] },
    ],
    cta: "Try #1 Pick — Inboxed (Free)",
    schema: {} as Record<string, unknown>,
  },
  {
    slug: "hey-alternatives",
    competitor: "HEY",
    seo: {
      title: "Best HEY Email Alternatives in 2026 (No Lock-in) | Inboxed",
      description: "Love HEY's email philosophy but not the $99/year lock-in? These alternatives offer similar workflows with more freedom and better AI.",
      canonical: "https://inboxed.email/alternatives/hey-alternatives",
    },
    h1: "Best HEY Email Alternatives in 2026",
    intro: "HEY reimagined email workflows but locked you into a $99/year proprietary ecosystem. These alternatives offer fresh thinking without the lock-in.",
    entries: [
      { name: "Inboxed", rank: 1, isInboxed: true, slug: "hey", description: "Intentional email management with local AI. Use any IMAP account — no lock-in, no subscription.", pros: ["Free", "Any email account", "Local AI", "No vendor lock-in"], cons: ["macOS only", "Different workflow philosophy"] },
      { name: "Fastmail", rank: 2, description: "An independent email service with excellent filtering and organization features.", pros: ["Custom domains", "Great filters", "Ad-free"], cons: ["$50/year", "No AI features", "Web-focused"] },
      { name: "Spark", rank: 3, slug: "spark", description: "Smart inbox management with AI-powered features and team collaboration.", pros: ["Smart inbox", "AI features", "Team features"], cons: ["Cloud AI", "Readdle stores emails", "$59/year"] },
      { name: "Superhuman", rank: 4, slug: "superhuman", description: "The premium speed-focused email experience with cloud AI.", pros: ["Extremely fast", "Keyboard shortcuts", "AI triage"], cons: ["$30/month", "Cloud processing", "Limited platforms"] },
    ],
    cta: "Try #1 Pick — Inboxed (Free)",
    schema: {} as Record<string, unknown>,
  },
  {
    slug: "spark-alternatives",
    competitor: "Spark",
    seo: {
      title: "Best Spark Email Alternatives in 2026 (Private AI) | Inboxed",
      description: "Concerned about Spark storing your emails? These alternatives offer the same smart features with better privacy — including free options.",
      canonical: "https://inboxed.email/alternatives/spark-alternatives",
    },
    h1: "Best Spark Email Alternatives in 2026",
    intro: "Spark is a beautiful email client — but it stores your emails on Readdle's servers. If privacy matters to you, these alternatives deliver smart email without the cloud dependency.",
    entries: [
      { name: "Inboxed", rank: 1, isInboxed: true, slug: "spark", description: "Smart email with AI features that run 100% on your Mac. No cloud servers, no data sharing.", pros: ["Free", "100% local AI", "No server storage", "Native macOS"], cons: ["macOS only", "Newer app"] },
      { name: "Apple Mail", rank: 2, slug: "apple-mail", description: "The reliable, private default on every Mac. No AI, but rock-solid.", pros: ["Pre-installed", "Private", "Native performance"], cons: ["No AI", "Basic features", "Limited search"] },
      { name: "Canary Mail", rank: 3, slug: "canary-mail", description: "AI-powered email with encryption support across platforms.", pros: ["Encryption", "AI features", "Multi-platform"], cons: ["Cloud AI despite claims", "$20/year", "Privacy questions"] },
      { name: "Mailspring", rank: 4, slug: "mailspring", description: "Open-source email client with a modern interface and good IMAP support.", pros: ["Open core", "Modern design", "Good IMAP"], cons: ["Electron (slow)", "No AI", "Account required"] },
    ],
    cta: "Try #1 Pick — Inboxed (Free)",
    schema: {} as Record<string, unknown>,
  },
  {
    slug: "thunderbird-alternatives",
    competitor: "Thunderbird",
    seo: {
      title: "Best Thunderbird Alternatives in 2026 (With AI) | Inboxed",
      description: "Love Thunderbird's privacy but want modern AI features? These alternatives offer local intelligence without sacrificing the open-source ethos.",
      canonical: "https://inboxed.email/alternatives/thunderbird-alternatives",
    },
    h1: "Best Thunderbird Alternatives in 2026",
    intro: "Thunderbird has been the privacy-conscious email user's choice for decades. But it's showing its age. These modern alternatives add AI intelligence while respecting your privacy.",
    entries: [
      { name: "Inboxed", rank: 1, isInboxed: true, slug: "thunderbird", description: "The modern evolution of Thunderbird's philosophy: local-first email with on-device AI intelligence built natively for Mac.", pros: ["Free", "100% local AI", "Native macOS", "Lightweight (10MB)"], cons: ["macOS only", "Newer app"] },
      { name: "Apple Mail", rank: 2, slug: "apple-mail", description: "The pre-installed macOS email client. Simple, private, and deeply integrated with Apple's ecosystem.", pros: ["Pre-installed", "Native", "Private"], cons: ["No AI", "Basic search", "Limited customization"] },
      { name: "Canary Mail", rank: 3, slug: "canary-mail", description: "A cross-platform email client with encryption support and AI features.", pros: ["PGP encryption", "AI features", "Cross-platform"], cons: ["Cloud AI processing", "$20/year", "Privacy claims questionable"] },
      { name: "Spark", rank: 4, slug: "spark", description: "A polished email client with smart inbox and team collaboration features.", pros: ["Smart inbox", "Modern UI", "Team features"], cons: ["Cloud AI", "Emails on Readdle servers", "$59/year for AI"] },
    ],
    cta: "Try #1 Pick — Inboxed (Free)",
    schema: {} as Record<string, unknown>,
  },
  {
    slug: "proton-mail-alternatives",
    competitor: "Proton Mail",
    seo: {
      title: "Best Proton Mail Alternatives in 2026 (Privacy + AI) | Inboxed",
      description: "Want Proton Mail's privacy with modern AI features? These alternatives offer intelligent email without compromising on data protection.",
      canonical: "https://inboxed.email/alternatives/proton-mail-alternatives",
    },
    h1: "Best Proton Mail Alternatives in 2026",
    intro: "Proton Mail set the gold standard for email privacy. But it deliberately avoids AI features because they can't do them without reading your emails on their servers. These alternatives solve that paradox.",
    entries: [
      { name: "Inboxed", rank: 1, isInboxed: true, slug: "proton-mail", description: "Privacy-first email with local AI. Get summaries, smart replies, and semantic search without any data leaving your Mac.", pros: ["Free", "100% local AI", "Zero cloud processing", "Any IMAP account"], cons: ["macOS only", "Newer app"] },
      { name: "Tutanota (Tuta)", rank: 2, description: "Open-source encrypted email from Germany with end-to-end encryption and a strong privacy focus.", pros: ["Open source", "E2E encryption", "Affordable"], cons: ["No AI features", "Proprietary address", "Limited integrations"] },
      { name: "Fastmail", rank: 3, description: "An independent, ad-free email service with excellent search, calendars, and custom domain support.", pros: ["Fast and reliable", "Custom domains", "Great search"], cons: ["$50/year", "No AI", "No encryption by default"] },
      { name: "Canary Mail", rank: 4, slug: "canary-mail", description: "A privacy-marketed email client with AI features and PGP encryption support.", pros: ["PGP support", "AI features", "Multi-platform"], cons: ["AI is cloud-based", "$20/year", "Not truly private AI"] },
    ],
    cta: "Try #1 Pick — Inboxed (Free)",
    schema: {} as Record<string, unknown>,
  },
  {
    slug: "canary-mail-alternatives",
    competitor: "Canary Mail",
    seo: {
      title: "Best Canary Mail Alternatives in 2026 (True Local AI) | Inboxed",
      description: "Canary Mail's AI features are cloud-powered despite privacy marketing. These alternatives offer genuine on-device AI for email.",
      canonical: "https://inboxed.email/alternatives/canary-mail-alternatives",
    },
    h1: "Best Canary Mail Alternatives in 2026",
    intro: "Canary Mail markets itself as a private AI email client. But its AI features send data to cloud APIs for processing. If you want genuine local AI, these alternatives deliver.",
    entries: [
      { name: "Inboxed", rank: 1, isInboxed: true, slug: "canary-mail", description: "The email client Canary Mail claims to be: 100% local AI, zero cloud processing, native macOS performance.", pros: ["Free", "Genuinely local AI", "Zero cloud processing", "10MB app"], cons: ["macOS only", "Newer app"] },
      { name: "Apple Mail", rank: 2, slug: "apple-mail", description: "Apple's built-in email client. No AI, but genuinely private and natively fast.", pros: ["Pre-installed", "Truly private", "Native"], cons: ["No AI features", "Basic search", "Limited customization"] },
      { name: "Spark", rank: 3, slug: "spark", description: "A feature-rich email client with smart inbox and AI-powered writing assistance.", pros: ["Smart inbox", "Modern UI", "Cross-platform"], cons: ["Cloud AI", "Emails on Readdle servers", "$59/year"] },
      { name: "Mimestream", rank: 4, slug: "mimestream", description: "A beautifully crafted native Mac email client built specifically for Gmail.", pros: ["Native Swift", "Fast", "Clean design"], cons: ["Gmail only", "No AI", "$50/year"] },
    ],
    cta: "Try #1 Pick — Inboxed (Free)",
    schema: {} as Record<string, unknown>,
  },
  {
    slug: "edison-mail-alternatives",
    competitor: "Edison Mail",
    seo: {
      title: "Best Edison Mail Alternatives in 2026 (No Data Selling) | Inboxed",
      description: "Edison Mail was caught selling user email data. These private alternatives give you smart email features without the data harvesting.",
      canonical: "https://inboxed.email/alternatives/edison-mail-alternatives",
    },
    h1: "Best Edison Mail Alternatives in 2026",
    intro: "Edison Mail offers a free, AI-powered email experience. The catch? They monetize your email data. If you want smart email without being the product, switch to one of these alternatives.",
    entries: [
      { name: "Inboxed", rank: 1, isInboxed: true, slug: "edison-mail", description: "Free AI email that's genuinely private. Local AI processing, zero data collection, zero monetization.", pros: ["Free (no data harvesting)", "100% local AI", "Zero telemetry", "Native macOS"], cons: ["macOS only", "Newer app"] },
      { name: "Apple Mail", rank: 2, slug: "apple-mail", description: "Apple's built-in email client. No AI scanning, no data monetization.", pros: ["Pre-installed", "Private", "Free"], cons: ["No AI features", "Basic search", "No smart features"] },
      { name: "Canary Mail", rank: 3, slug: "canary-mail", description: "A privacy-focused email client with AI features and encryption support.", pros: ["Clean interface", "Encryption", "Multi-platform"], cons: ["Cloud AI processing", "$20/year", "Privacy claims debatable"] },
      { name: "Thunderbird", rank: 4, slug: "thunderbird", description: "The open-source veteran. No data collection, no monetization, full transparency.", pros: ["Free", "Open source", "No data collection"], cons: ["No AI", "Dated interface", "Resource heavy"] },
    ],
    cta: "Try #1 Pick — Inboxed (Free)",
    schema: {} as Record<string, unknown>,
  },
  {
    slug: "mimestream-alternatives",
    competitor: "Mimestream",
    seo: {
      title: "Best Mimestream Alternatives in 2026 (Multi-Provider + AI) | Inboxed",
      description: "Mimestream only supports Gmail. These alternatives work with any email provider and add AI intelligence that Mimestream lacks.",
      canonical: "https://inboxed.email/alternatives/mimestream-alternatives",
    },
    h1: "Best Mimestream Alternatives in 2026",
    intro: "Mimestream is a gorgeous Mac email client — but it's Gmail-only with no AI features. If you need multi-provider support or AI intelligence, these alternatives deliver.",
    entries: [
      { name: "Inboxed", rank: 1, isInboxed: true, slug: "mimestream", description: "Any IMAP account plus local AI intelligence. Native macOS performance with summaries, smart replies, and semantic search.", pros: ["Free", "Any IMAP provider", "Local AI", "Native macOS"], cons: ["macOS only", "Newer app"] },
      { name: "Spark", rank: 2, slug: "spark", description: "A cross-platform email client with smart inbox, AI features, and team collaboration.", pros: ["Multi-provider", "AI features", "Team features"], cons: ["Cloud AI", "Emails on Readdle servers", "$59/year"] },
      { name: "Canary Mail", rank: 3, slug: "canary-mail", description: "A multi-platform email client with AI features and encryption support.", pros: ["Multi-provider", "AI features", "Encryption"], cons: ["Cloud AI processing", "$20/year", "Privacy claims questionable"] },
      { name: "Apple Mail", rank: 4, slug: "apple-mail", description: "Apple's built-in email client supports any IMAP/Exchange account natively.", pros: ["Pre-installed", "Multi-provider", "Free"], cons: ["No AI", "Basic search", "Aging feature set"] },
    ],
    cta: "Try #1 Pick — Inboxed (Free)",
    schema: {} as Record<string, unknown>,
  },
  {
    slug: "notion-mail-alternatives",
    competitor: "Notion Mail",
    seo: {
      title: "Best Notion Mail Alternatives in 2026 (Private AI) | Inboxed",
      description: "Notion Mail is cloud-first. These alternatives offer smart email organization with better privacy and on-device AI processing.",
      canonical: "https://inboxed.email/alternatives/notion-mail-alternatives",
    },
    h1: "Best Notion Mail Alternatives in 2026",
    intro: "Notion Mail brings Notion's organizational DNA to email, but it's cloud-first with AI processing on Notion's servers. These alternatives keep your intelligence local.",
    entries: [
      { name: "Inboxed", rank: 1, isInboxed: true, slug: "notion-mail", description: "Smart email organization powered by on-device AI. No cloud processing, no data sharing, native macOS performance.", pros: ["Free", "100% local AI", "Zero cloud dependency", "Any IMAP account"], cons: ["macOS only", "Newer app"] },
      { name: "Superhuman", rank: 2, slug: "superhuman", description: "The premium speed-focused email client with AI triage and keyboard-driven workflow.", pros: ["Extremely fast", "AI triage", "Keyboard shortcuts"], cons: ["$30/month", "Cloud AI", "Limited to Gmail/Outlook"] },
      { name: "Spark", rank: 3, slug: "spark", description: "A polished email client with smart inbox, AI features, and team collaboration.", pros: ["Smart inbox", "AI features", "Cross-platform"], cons: ["Cloud AI", "Readdle stores emails", "$59/year"] },
      { name: "HEY", rank: 4, slug: "hey", description: "Basecamp's opinionated email service that reimagines how you interact with your inbox.", pros: ["Unique workflow", "Strong design philosophy"], cons: ["$99/year", "No IMAP", "@hey.com address only"] },
    ],
    cta: "Try #1 Pick — Inboxed (Free)",
    schema: {} as Record<string, unknown>,
  },
];

// Fill in alternatives schemas after array is defined
alternatives.forEach((alt) => {
  alt.schema = alternativesSchema(alt.competitor, alt.slug, alt.entries);
});

// ── Route Helpers ────────────────────────────────

export function getAllRoutes(): string[] {
  const routes: string[] = [
    "/",
    "/privacy",
    "/terms",
    "/best-private-ai-email",
    "/blog",
    "/blog/local-ai-email",
    "/blog/best-ai-email-clients",
    "/blog/email-privacy-guide",
    "/blog/inbox-zero-ai",
    "/blog/best-mac-email-clients",
    "/blog/superhuman-alternatives",
    "/blog/developer-mac-email-workflow",
    "/blog/zero-data-exit-framework",
    "/blog/block-email-trackers-mac",
    "/blog/apple-mail-slow-vs-rust-native",
    "/blog/local-llm-email-drafting-tutorial",
    "/blog/gmail-privacy-truth",
    "/blog/on-device-ai-email",
    "/blog/email-privacy-audit",
    "/blog/offline-email-clients",
  ];

  comparisons.forEach((c) => routes.push(`/compare/${c.slug}`));
  useCases.forEach((u) => routes.push(`/best-email-for/${u.slug}`));
  alternatives.forEach((a) => routes.push(`/alternatives/${a.slug}`));

  return routes;
}

export function getAllSitemapEntries(): { loc: string; lastmod: string }[] {
  const base = "https://inboxed.email";
  const today = new Date().toISOString().split("T")[0];
  const entries = [
    { loc: `${base}/`, lastmod: today },
    { loc: `${base}/best-private-ai-email`, lastmod: "2026-02-13" },
    { loc: `${base}/blog`, lastmod: "2026-02-13" },
    { loc: `${base}/blog/local-ai-email`, lastmod: "2026-01-09" },
    { loc: `${base}/blog/inbox-zero-ai`, lastmod: "2026-01-12" },
    { loc: `${base}/blog/email-privacy-guide`, lastmod: "2026-01-15" },
    { loc: `${base}/blog/best-ai-email-clients`, lastmod: "2026-01-18" },
    { loc: `${base}/blog/best-mac-email-clients`, lastmod: "2026-01-20" },
    { loc: `${base}/blog/superhuman-alternatives`, lastmod: "2026-01-22" },
    { loc: `${base}/blog/developer-mac-email-workflow`, lastmod: "2026-01-24" },
    { loc: `${base}/blog/zero-data-exit-framework`, lastmod: "2026-01-26" },
    { loc: `${base}/blog/block-email-trackers-mac`, lastmod: "2026-01-28" },
    { loc: `${base}/blog/apple-mail-slow-vs-rust-native`, lastmod: "2026-01-30" },
    { loc: `${base}/blog/local-llm-email-drafting-tutorial`, lastmod: "2026-02-01" },
    { loc: `${base}/blog/gmail-privacy-truth`, lastmod: "2026-02-04" },
    { loc: `${base}/blog/on-device-ai-email`, lastmod: "2026-02-06" },
    { loc: `${base}/blog/email-privacy-audit`, lastmod: "2026-02-10" },
    { loc: `${base}/blog/offline-email-clients`, lastmod: "2026-02-06" },
    { loc: `${base}/privacy`, lastmod: "2026-02-10" },
    { loc: `${base}/terms`, lastmod: "2026-02-10" },
  ];

  comparisons.forEach((c) =>
    entries.push({ loc: `${base}/compare/${c.slug}`, lastmod: "2026-02-13" })
  );
  useCases.forEach((u) =>
    entries.push({ loc: `${base}/best-email-for/${u.slug}`, lastmod: "2026-02-13" })
  );
  alternatives.forEach((a) =>
    entries.push({ loc: `${base}/alternatives/${a.slug}`, lastmod: "2026-02-13" })
  );

  return entries;
}
