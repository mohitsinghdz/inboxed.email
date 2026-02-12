import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

export default function Footer() {
    return (
        <footer className="bg-black text-white border-t-8 border-black">
            {/* CTA Section */}
            <div className="container-custom pt-24 pb-20 text-center border-b border-white/10">
                <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6 tracking-tight">
                    Ready to reclaim your inbox?
                </h2>
                <p className="font-body text-lg text-white/60 max-w-lg mx-auto mb-10">
                    Private, local, and intelligent email built for macOS.
                </p>
                <a
                    href="#"
                    className="inline-block bg-white text-black font-mono text-sm uppercase tracking-widest px-10 py-4 transition-colors duration-150 ease-linear hover:bg-black hover:text-white border border-white"
                >
                    Download for macOS
                </a>
            </div>

            {/* Links Grid */}
            <div className="container-custom pt-16 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-20">
                    {/* Brand Column - 2 cols */}
                    <div className="col-span-1 md:col-span-2">
                        <img src={logo} alt="Inboxed Logo" className="h-10 w-auto mb-6 invert" />
                        <p className="font-body text-lg text-white/70 max-w-md transition-colors duration-150 hover:text-white">
                            Reclaiming the inbox for the modern era. Private, local, and intelligent email for macOS.
                        </p>
                    </div>

                    {/* Product Column */}
                    <div>
                        <h4 className="font-mono text-xs uppercase tracking-widest mb-6 text-white/50">Product</h4>
                        <ul className="space-y-4 font-body">
                            <li>
                                <a href="#" className="footer-link">
                                    Download
                                </a>
                            </li>
                            <li>
                                <a href="#" className="footer-link">
                                    Changelog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="footer-link">
                                    Roadmap
                                </a>
                            </li>
                            <li>
                                <Link to="/blog" className="footer-link">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link to="/best-private-ai-email" className="footer-link">
                                    Best Private AI Email
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Column */}
                    <div>
                        <h4 className="font-mono text-xs uppercase tracking-widest mb-6 text-white/50">Legal</h4>
                        <ul className="space-y-4 font-body">
                            <li>
                                <Link to="/privacy" className="footer-link">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="footer-link">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Compare Column */}
                    <div>
                        <h4 className="font-mono text-xs uppercase tracking-widest mb-6 text-white/50">Compare</h4>
                        <ul className="space-y-4 font-body">
                            <li>
                                <Link to="/compare/superhuman" className="footer-link">
                                    vs Superhuman
                                </Link>
                            </li>
                            <li>
                                <Link to="/compare/apple-mail" className="footer-link">
                                    vs Apple Mail
                                </Link>
                            </li>
                            <li>
                                <Link to="/compare/thunderbird" className="footer-link">
                                    vs Thunderbird
                                </Link>
                            </li>
                            <li>
                                <Link to="/compare/zero" className="footer-link">
                                    vs 0.email
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="font-mono text-xs text-white/50">
                        &copy; 2026 Inboxed Inc. All rights reserved.
                    </p>
                    <p className="font-mono text-xs text-white/50">
                        Designed in California. Built with Apple MLX.
                    </p>
                    <button
                        onClick={scrollToTop}
                        className="font-mono text-xs text-white/50 uppercase tracking-widest transition-colors duration-150 hover:text-white cursor-pointer"
                        aria-label="Scroll back to top of page"
                    >
                        Back to top
                    </button>
                </div>
            </div>

            {/* Scoped link styles */}
            <style>{`
                .footer-link {
                    position: relative;
                    display: inline-block;
                    color: rgba(255, 255, 255, 0.7);
                    text-decoration: none;
                    transition: color 0.15s ease;
                }
                .footer-link::after {
                    content: '';
                    position: absolute;
                    left: 0;
                    bottom: -2px;
                    width: 0;
                    height: 1px;
                    background: #fff;
                    transition: width 0.25s ease;
                }
                .footer-link:hover {
                    color: #fff;
                }
                .footer-link:hover::after {
                    width: 100%;
                }
            `}</style>
        </footer>
    );
}
