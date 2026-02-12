import Hero from '../components/Hero';
import Features from '../components/Features';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Home() {
    return (
        <>
            <SEO
                title="Local Private LLM Email Client | Inboxed"
                description="Inboxed is a local private LLM email client that works offline, respects privacy, and replaces cloud AI email tools."
                schemas={[
                    {
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "Inboxed",
                        "description": "A local private LLM email client for macOS that runs AI entirely on-device using Apple MLX and llama.cpp. Supports 7B+ parameter models for email summarization, smart categorization, and inbox triage — all offline.",
                        "applicationCategory": "BusinessApplication",
                        "operatingSystem": "macOS",
                        "softwareVersion": "1.0",
                        "fileSize": "10MB",
                        "downloadUrl": "https://inboxed.email",
                        "featureList": "Local LLM email summarization, Smart inbox categorization, Zero-data-exit privacy, Apple Metal GPU acceleration, IMAP direct fetch, Offline AI processing, macOS Keychain credential storage",
                        "offers": [
                            {
                                "@type": "Offer",
                                "name": "Standard",
                                "price": "0",
                                "priceCurrency": "USD",
                                "description": "Free forever with all AI models, unlimited accounts, and community support"
                            },
                            {
                                "@type": "Offer",
                                "name": "Pro Lifetime",
                                "price": "1.00",
                                "priceCurrency": "USD",
                                "description": "One-time payment for priority support, early access features"
                            }
                        ]
                    },
                    {
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "Inboxed",
                        "url": "https://inboxed.email",
                        "description": "Maker of Inboxed, the local private LLM email client for macOS.",
                        "brand": {
                            "@type": "Brand",
                            "name": "Inboxed"
                        }
                    }
                ]}
            />
            <Hero />
            <Features />
            {/* Pricing Section */}
            <section className="py-32 border-t-8 border-black bg-muted/30">
                <div className="container-custom">
                    <h2 className="font-serif text-5xl md:text-7xl mb-4 text-center">Fair Pricing.</h2>
                    <p className="font-mono text-xs uppercase tracking-widest text-mutedForeground text-center mb-16">
                        No subscriptions. No hidden costs.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
                        {/* Free Tier */}
                        <div className="p-8 border-2 border-black bg-white flex flex-col">
                            <h3 className="font-serif text-3xl mb-2">Standard</h3>
                            <div className="text-4xl font-mono font-bold mb-4">Free</div>
                            <div className="w-full h-px bg-black/20 mb-6" />
                            <ul className="space-y-4 font-body text-lg mb-8 flex-grow">
                                <li className="flex gap-3 items-baseline"><span className="text-black font-bold">&mdash;</span> All AI Models</li>
                                <li className="flex gap-3 items-baseline"><span className="text-black font-bold">&mdash;</span> Unlimited Accounts</li>
                                <li className="flex gap-3 items-baseline"><span className="text-black font-bold">&mdash;</span> Community Support</li>
                            </ul>
                            <button className="btn-outline w-full">Download</button>
                        </div>

                        {/* Pro Tier */}
                        <div className="p-8 border-4 border-black bg-black text-white flex flex-col relative transform md:-translate-y-4 transition-shadow duration-200 hover:shadow-[8px_8px_0px_0px_#000]">
<h3 className="font-serif text-3xl mb-2">Pro Lifetime</h3>
                            <div className="text-4xl font-mono font-bold mb-4">$1 <span className="text-sm font-normal opacity-70">/ life</span></div>
                            <div className="w-full h-px bg-white/20 mb-6" />
                            <ul className="space-y-4 font-body text-lg mb-8 flex-grow opacity-90">
                                <li className="flex gap-3 items-baseline"><span>&mdash;</span> Everything in Standard</li>
                                <li className="flex gap-3 items-baseline"><span>&mdash;</span> Priority Support</li>
                                <li className="flex gap-3 items-baseline"><span>&mdash;</span> Early Access Features</li>
                                <li className="flex gap-3 items-baseline"><span>&mdash;</span> Support Development</li>
                            </ul>
                            <button className="bg-white text-black px-8 py-4 text-sm font-medium tracking-widest uppercase hover:bg-gray-200 transition-colors w-full">
                                Get Pro
                            </button>
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="font-mono text-xs uppercase tracking-widest text-mutedForeground mb-8">
                            See how we compare
                        </p>
                        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-12 font-body text-lg underline-offset-4">
                            <Link to="/compare/superhuman" className="hover:underline">vs Superhuman</Link>
                            <Link to="/compare/zero" className="hover:underline">vs 0.email</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statement Section */}
            <section className="py-40 border-t-8 border-black">
                <div className="container-custom text-center">
                    <div className="font-serif text-[8rem] md:text-[12rem] leading-none select-none text-black/10 -mb-16 md:-mb-24">
                        &ldquo;
                    </div>
                    <h2 className="font-heading text-5xl md:text-8xl mb-12 italic">
                        "The email client for the AI era."
                    </h2>
                    <p className="font-body text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-16">
                        Stop sending your personal data to the cloud to get smart features.
                        Inboxed brings the power of Large Language Models directly to your device.
                    </p>
                    <div className="w-24 h-[4px] bg-black mx-auto mb-16" />
                    <button className="btn-primary">
                        Download for Mac
                    </button>
                </div>
            </section>
        </>
    );
}
