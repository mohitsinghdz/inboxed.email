import { Check, X, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function ComparisonSuperhuman() {
    return (
        <div className="container-custom py-32">
            <SEO
                title="Superhuman Alternative (Free & Local) | Inboxed"
                description="Switch from Superhuman to Inboxed. Free forever and keep your data private with local AI processing."
                canonical="https://inboxed.email/compare/superhuman"
                schema={{
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    "name": "Inboxed vs Superhuman — Free Local AI Email Alternative",
                    "description": "Feature-by-feature comparison of Inboxed and Superhuman. Inboxed offers local AI processing, full privacy, and free pricing vs Superhuman's $30/month cloud-based approach.",
                    "url": "https://inboxed.email/compare/superhuman",
                    "mainEntity": {
                        "@type": "SoftwareApplication",
                        "name": "Inboxed",
                        "applicationCategory": "BusinessApplication",
                        "operatingSystem": "macOS"
                    }
                }}
            />
            <div className="max-w-4xl mx-auto">
                <h1 className="font-serif text-5xl md:text-7xl mb-8">Inboxed vs. Superhuman</h1>
                <p className="font-body text-xl md:text-2xl mb-16 max-w-2xl leading-relaxed">
                    Superhuman is fast. But it sends your data to the cloud and costs $360/year.
                    Inboxed runs locally on your Mac and is completely free.
                </p>

                {/* Comparison Table */}
                <div className="mb-20 overflow-x-auto">
                    <table className="w-full border-collapse text-left font-sans text-lg">
                        <thead>
                            <tr className="border-b-4 border-black">
                                <th className="py-4 pr-8 font-mono text-sm uppercase tracking-widest text-mutedForeground">Feature</th>
                                <th className="py-4 px-8 font-serif text-2xl opacity-70">Superhuman</th>
                                <th className="py-4 px-8 font-serif text-2xl font-bold">Inboxed</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-black/10">
                                <td className="py-5 pr-8 font-mono text-sm uppercase tracking-widest text-mutedForeground">AI Processing</td>
                                <td className="py-5 px-8 opacity-70"><X size={18} className="inline mr-2 text-black/50" />Cloud API (OpenAI)</td>
                                <td className="py-5 px-8 font-medium"><Check size={18} className="inline mr-2" />Local LLM (Apple MLX)</td>
                            </tr>
                            <tr className="border-b border-black/10">
                                <td className="py-5 pr-8 font-mono text-sm uppercase tracking-widest text-mutedForeground">Privacy</td>
                                <td className="py-5 px-8 opacity-70"><X size={18} className="inline mr-2 text-black/50" />Data leaves device</td>
                                <td className="py-5 px-8 font-medium"><Shield size={18} className="inline mr-2" />100% Private</td>
                            </tr>
                            <tr className="border-b border-black/10">
                                <td className="py-5 pr-8 font-mono text-sm uppercase tracking-widest text-mutedForeground">Cost</td>
                                <td className="py-5 px-8 opacity-70 font-bold">$30/month ($360/year)</td>
                                <td className="py-5 px-8 font-medium"><Zap size={18} className="inline mr-2" />Free (Pro: $1 lifetime)</td>
                            </tr>
                            <tr className="border-b border-black/10">
                                <td className="py-5 pr-8 font-mono text-sm uppercase tracking-widest text-mutedForeground">Platform</td>
                                <td className="py-5 px-8 opacity-70">Web / Cloud Wrapper</td>
                                <td className="py-5 px-8 font-medium">Native macOS App</td>
                            </tr>
                            <tr className="border-b border-black/10">
                                <td className="py-5 pr-8 font-mono text-sm uppercase tracking-widest text-mutedForeground">Data Access</td>
                                <td className="py-5 px-8 opacity-70"><X size={18} className="inline mr-2 text-black/50" />3rd Party Access</td>
                                <td className="py-5 px-8 font-medium"><Check size={18} className="inline mr-2" />Zero Data Sharing</td>
                            </tr>
                            <tr>
                                <td className="py-5 pr-8 font-mono text-sm uppercase tracking-widest text-mutedForeground">App Size</td>
                                <td className="py-5 px-8 opacity-70">~200MB (Electron)</td>
                                <td className="py-5 px-8 font-medium">~10MB (Rust + Tauri)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="border-t border-black pt-16">
                    <h2 className="font-serif text-4xl mb-6">Why switch?</h2>
                    <p className="font-body text-lg leading-relaxed mb-4">
                        The era of sending your personal emails to a third-party server for "AI features" is over.
                        Apple Silicon is powerful enough to run intelligent models right on your laptop.
                    </p>
                    <p className="font-body text-lg leading-relaxed mb-8">
                        Save $360 a year. Get better privacy. Own your software.
                    </p>

                    <Link to="/" className="btn-primary inline-block">
                        Get Inboxed — Free
                    </Link>
                </div>
            </div>
        </div>
    );
}
