import { Check, X, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function ComparisonZero() {
    return (
        <div className="container-custom py-32">
            <SEO
                title="0.email Alternative (Native Mac App) | Inboxed"
                description="The best native alternative to 0.email. Zero setup, native Apple Silicon performance, and full local AI privacy."
                canonical="https://inboxed.email/compare/zero"
                schema={{
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    "name": "Inboxed vs 0.email — Native macOS AI Email Alternative",
                    "description": "Feature-by-feature comparison of Inboxed and 0.email. Inboxed offers native macOS performance with Apple Metal GPU acceleration vs 0.email's browser-based approach.",
                    "url": "https://inboxed.email/compare/zero",
                    "mainEntity": {
                        "@type": "SoftwareApplication",
                        "name": "Inboxed",
                        "applicationCategory": "BusinessApplication",
                        "operatingSystem": "macOS"
                    }
                }}
            />
            <div className="max-w-4xl mx-auto">
                <h1 className="font-serif text-5xl md:text-7xl mb-8">Inboxed vs. 0.email</h1>
                <p className="font-body text-xl md:text-2xl mb-16 max-w-2xl leading-relaxed">
                    0.email is a great open-source project. But it runs in your browser or as a web wrapper.
                    Inboxed is a high-performance PRO app built natively for Apple Silicon.
                </p>

                {/* Comparison Table */}
                <div className="mb-20 overflow-x-auto">
                    <table className="w-full border-collapse text-left font-sans text-lg">
                        <thead>
                            <tr className="border-b-4 border-black">
                                <th className="py-4 pr-8 font-mono text-sm uppercase tracking-widest text-mutedForeground">Feature</th>
                                <th className="py-4 px-8 font-serif text-2xl opacity-70">0.email</th>
                                <th className="py-4 px-8 font-serif text-2xl font-bold">Inboxed</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-black/10">
                                <td className="py-5 pr-8 font-mono text-sm uppercase tracking-widest text-mutedForeground">Platform</td>
                                <td className="py-5 px-8 opacity-70"><X size={18} className="inline mr-2 text-black/50" />Web / Browser-based</td>
                                <td className="py-5 px-8 font-medium"><Check size={18} className="inline mr-2" />Native macOS (Rust + Tauri)</td>
                            </tr>
                            <tr className="border-b border-black/10">
                                <td className="py-5 pr-8 font-mono text-sm uppercase tracking-widest text-mutedForeground">Architecture</td>
                                <td className="py-5 px-8 opacity-70"><X size={18} className="inline mr-2 text-black/50" />JavaScript / Web Stack</td>
                                <td className="py-5 px-8 font-medium"><Check size={18} className="inline mr-2" />Apple MLX + Metal GPU</td>
                            </tr>
                            <tr className="border-b border-black/10">
                                <td className="py-5 pr-8 font-mono text-sm uppercase tracking-widest text-mutedForeground">Ease of Use</td>
                                <td className="py-5 px-8 opacity-70"><X size={18} className="inline mr-2 text-black/50" />Self-host / Open Source</td>
                                <td className="py-5 px-8 font-medium"><Check size={18} className="inline mr-2" />One-Click Install</td>
                            </tr>
                            <tr className="border-b border-black/10">
                                <td className="py-5 pr-8 font-mono text-sm uppercase tracking-widest text-mutedForeground">Cost</td>
                                <td className="py-5 px-8 opacity-70">Free (Open Source)</td>
                                <td className="py-5 px-8 font-medium"><Zap size={18} className="inline mr-2" />Free (Pro: $1 lifetime)</td>
                            </tr>
                            <tr>
                                <td className="py-5 pr-8 font-mono text-sm uppercase tracking-widest text-mutedForeground">AI Models</td>
                                <td className="py-5 px-8 opacity-70">WebLLM (browser WASM)</td>
                                <td className="py-5 px-8 font-medium">7B+ params via llama.cpp (Metal)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="border-t border-black pt-16">
                    <h2 className="font-serif text-4xl mb-6">Native Power. Zero Friction.</h2>
                    <p className="font-body text-lg leading-relaxed mb-8">
                        Web apps can feel sluggish. Inboxed is optimized for your Mac's hardware.
                        Get the polish of a native app with the intelligence of a local LLM.
                    </p>

                    <Link to="/" className="btn-primary inline-block">
                        Get Inboxed — Free
                    </Link>
                </div>
            </div>
        </div>
    );
}
