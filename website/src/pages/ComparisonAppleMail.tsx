import { Check, Shield, Search, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function ComparisonAppleMail() {
    return (
        <div className="container-custom py-32">
            <SEO
                title="Apple Mail Alternative with On-Device AI | Inboxed"
                description="Love Apple Mail's privacy but want more intelligence? Inboxed is the native Mac email app with local LLMs for summarization and smart replies."
                canonical="https://inboxed.email/compare/apple-mail"
                schema={{
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    "name": "Inboxed vs Apple Mail — The AI-Powered Upgrade for Mac",
                    "description": "Compare Inboxed and Apple Mail. While Apple Mail is private, Inboxed adds a local intelligence layer for smarter email management without the cloud.",
                    "url": "https://inboxed.email/compare/apple-mail",
                    "mainEntity": {
                        "@type": "SoftwareApplication",
                        "name": "Inboxed",
                        "applicationCategory": "BusinessApplication",
                        "operatingSystem": "macOS"
                    }
                }}
            />
            <div className="max-w-4xl mx-auto">
                <h1 className="font-serif text-5xl md:text-7xl mb-8">Inboxed vs. Apple Mail</h1>
                <p className="font-body text-xl md:text-2xl mb-16 max-w-2xl leading-relaxed">
                    Apple Mail is the standard for privacy on Mac. 
                    Inboxed takes that foundation and adds the power of a local Private LLM.
                </p>

                {/* Comparison Table */}
                <div className="mb-20 overflow-x-auto">
                    <table className="w-full border-collapse text-left font-sans text-lg">
                        <thead>
                            <tr className="border-b-4 border-black">
                                <th className="py-4 pr-8 font-mono text-sm uppercase tracking-widest text-mutedForeground">Feature</th>
                                <th className="py-4 px-8 font-serif text-2xl opacity-70">Apple Mail</th>
                                <th className="py-4 px-8 font-serif text-2xl font-bold">Inboxed</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-black/10">
                                <td className="py-5 pr-8 font-mono text-sm uppercase tracking-widest text-mutedForeground">Email Summaries</td>
                                <td className="py-5 px-8 opacity-70">Manual / Limited</td>
                                <td className="py-5 px-8 font-medium"><Check size={18} className="inline mr-2" />Instant Local AI</td>
                            </tr>
                            <tr className="border-b border-black/10">
                                <td className="py-5 pr-8 font-mono text-sm uppercase tracking-widest text-mutedForeground">Smart Reply</td>
                                <td className="py-5 px-8 opacity-70">Suggested phrases</td>
                                <td className="py-5 px-8 font-medium"><Check size={18} className="inline mr-2" />Full Draft Generation</td>
                            </tr>
                            <tr className="border-b border-black/10">
                                <td className="py-5 pr-8 font-mono text-sm uppercase tracking-widest text-mutedForeground">Privacy</td>
                                <td className="py-5 px-8 opacity-70"><Shield size={18} className="inline mr-2" />Native Privacy</td>
                                <td className="py-5 px-8 font-medium"><Shield size={18} className="inline mr-2" />Zero-Data-Exit AI</td>
                            </tr>
                            <tr className="border-b border-black/10">
                                <td className="py-5 pr-8 font-mono text-sm uppercase tracking-widest text-mutedForeground">Search</td>
                                <td className="py-5 px-8 opacity-70"><Search size={18} className="inline mr-2" />Keyword Index</td>
                                <td className="py-5 px-8 font-medium"><Search size={18} className="inline mr-2" />Semantic (AI) Search</td>
                            </tr>
                            <tr className="border-b border-black/10">
                                <td className="py-5 pr-8 font-mono text-sm uppercase tracking-widest text-mutedForeground">Speed</td>
                                <td className="py-5 px-8 opacity-70">Fast (Native)</td>
                                <td className="py-5 px-8 font-medium"><Zap size={18} className="inline mr-2" />Ultra-Fast (Rust/Metal)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="border-t border-black pt-16">
                    <h2 className="font-serif text-4xl mb-6">Built for the future of Apple Silicon.</h2>
                    <p className="font-body text-lg leading-relaxed mb-4">
                        Inboxed isn't just an email client; it's a productivity layer that lives on your machine.
                        By using Apple's MLX and Metal, we provide intelligence that feels like part of the OS, but with more power than the defaults.
                    </p>
                    <p className="font-body text-lg leading-relaxed mb-8">
                        Keep the privacy you love from Apple Mail. Get the power you've been seeing in cloud-based tools.
                    </p>

                    <Link to="/" className="btn-primary inline-block">
                        Switch to Inboxed
                    </Link>
                </div>
            </div>
        </div>
    );
}
