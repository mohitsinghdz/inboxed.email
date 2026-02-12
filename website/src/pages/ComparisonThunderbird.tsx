import { Check, X, Shield, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function ComparisonThunderbird() {
    return (
        <div className="container-custom py-32">
            <SEO
                title="Thunderbird Alternative with Private AI | Inboxed"
                description="Looking for a modern Thunderbird alternative? Inboxed offers the same offline privacy but with powerful local AI features built natively for Mac."
                canonical="https://inboxed.email/compare/thunderbird"
                schema={{
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    "name": "Inboxed vs Thunderbird — Modern Private AI Email Alternative",
                    "description": "Compare Inboxed and Thunderbird. Inboxed brings local AI summarization and smart replies to the classic offline email experience without compromising privacy.",
                    "url": "https://inboxed.email/compare/thunderbird",
                    "mainEntity": {
                        "@type": "SoftwareApplication",
                        "name": "Inboxed",
                        "applicationCategory": "BusinessApplication",
                        "operatingSystem": "macOS"
                    }
                }}
            />
            <div className="max-w-4xl mx-auto">
                <h1 className="font-serif text-5xl md:text-7xl mb-8">Inboxed vs. Thunderbird</h1>
                <p className="font-body text-xl md:text-2xl mb-16 max-w-2xl leading-relaxed">
                    Thunderbird is the classic choice for privacy. But it feels stuck in the past.
                    Inboxed is the modern evolution: offline privacy meets local intelligence.
                </p>

                {/* Comparison Table */}
                <div className="mb-20 overflow-x-auto">
                    <table className="w-full border-collapse text-left font-sans text-lg">
                        <thead>
                            <tr className="border-b-4 border-black">
                                <th className="py-4 pr-8 font-mono text-sm uppercase tracking-widest text-mutedForeground">Feature</th>
                                <th className="py-4 px-8 font-serif text-2xl opacity-70">Thunderbird</th>
                                <th className="py-4 px-8 font-serif text-2xl font-bold">Inboxed</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-black/10">
                                <td className="py-5 pr-8 font-mono text-sm uppercase tracking-widest text-mutedForeground">Built-in AI</td>
                                <td className="py-5 px-8 opacity-70"><X size={18} className="inline mr-2 text-black/50" />None / Plugins only</td>
                                <td className="py-5 px-8 font-medium"><Check size={18} className="inline mr-2" />Native Local LLM</td>
                            </tr>
                            <tr className="border-b border-black/10">
                                <td className="py-5 pr-8 font-mono text-sm uppercase tracking-widest text-mutedForeground">Privacy Model</td>
                                <td className="py-5 px-8 opacity-70"><Shield size={18} className="inline mr-2 text-black/50" />Local Storage</td>
                                <td className="py-5 px-8 font-medium"><Shield size={18} className="inline mr-2" />Local + On-Device AI</td>
                            </tr>
                            <tr className="border-b border-black/10">
                                <td className="py-5 pr-8 font-mono text-sm uppercase tracking-widest text-mutedForeground">Performance</td>
                                <td className="py-5 px-8 opacity-70">Legacy / Resource Heavy</td>
                                <td className="py-5 px-8 font-medium"><Cpu size={18} className="inline mr-2" />Metal GPU Accelerated</td>
                            </tr>
                            <tr className="border-b border-black/10">
                                <td className="py-5 pr-8 font-mono text-sm uppercase tracking-widest text-mutedForeground">Interface</td>
                                <td className="py-5 px-8 opacity-70">Cluttered / Complex</td>
                                <td className="py-5 px-8 font-medium">Minimalist / Focused</td>
                            </tr>
                            <tr className="border-b border-black/10">
                                <td className="py-5 pr-8 font-mono text-sm uppercase tracking-widest text-mutedForeground">Smart Search</td>
                                <td className="py-5 px-8 opacity-70">Keyword-based</td>
                                <td className="py-5 px-8 font-medium"><Check size={18} className="inline mr-2" />Semantic / AI-Powered</td>
                            </tr>
                            <tr>
                                <td className="py-5 pr-8 font-mono text-sm uppercase tracking-widest text-mutedForeground">Architecture</td>
                                <td className="py-5 px-8 opacity-70">XUL / Web-based Tech</td>
                                <td className="py-5 px-8 font-medium">Rust + Tauri (Native)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="border-t border-black pt-16">
                    <h2 className="font-serif text-4xl mb-6">The best of both worlds.</h2>
                    <p className="font-body text-lg leading-relaxed mb-4">
                        You chose Thunderbird because you don't want your emails in a cloud silo. 
                        Inboxed respects that same philosophy but adds the features you need in 2026.
                    </p>
                    <p className="font-body text-lg leading-relaxed mb-8">
                        Get AI summaries, smart replies, and semantic search without ever connecting to a third-party AI server.
                    </p>

                    <Link to="/" className="btn-primary inline-block">
                        Download Inboxed
                    </Link>
                </div>
            </div>
        </div>
    );
}
