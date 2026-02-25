import { useState } from 'react';
import { Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const navLinks = [
    { to: '/#features', label: 'Features' },
    { to: '/privacy', label: 'Privacy' },
    { to: '/blog', label: 'Blog' },
];

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const closeMobileMenu = () => setMobileMenuOpen(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-black">
            <div className="container-custom flex items-center justify-between h-20">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Link to="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
                        <img src={logo} alt="Inboxed Logo" className="h-[52px] w-auto" />
                    </Link>
                </div>

                {/* Desktop nav links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className="text-sm font-mono uppercase tracking-widest hover:underline hover:decoration-1 underline-offset-4"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Desktop download button */}
                <div className="hidden md:block">
                    <button className="bg-black text-white px-6 py-2 text-xs font-mono uppercase tracking-widest font-medium hover:bg-white hover:text-black hover:border hover:border-black transition-colors duration-100 flex items-center gap-2">
                        <span>Download</span>
                        <Download size={14} />
                    </button>
                </div>

                {/* Mobile hamburger button */}
                <button
                    className="md:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10"
                    onClick={() => setMobileMenuOpen((prev) => !prev)}
                    aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={mobileMenuOpen}
                >
                    <div
                        className={`w-6 h-[2px] bg-black transition-all duration-300 ${
                            mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
                        }`}
                    />
                    <div
                        className={`w-6 h-[2px] bg-black transition-all duration-300 ${
                            mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                        }`}
                    />
                    <div
                        className={`w-6 h-[2px] bg-black transition-all duration-300 ${
                            mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
                        }`}
                    />
                </button>
            </div>

            {/* Mobile menu overlay */}
            <div
                className={`md:hidden fixed inset-0 top-20 bg-white border-t border-black transition-all duration-300 ${
                    mobileMenuOpen
                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 -translate-y-4 pointer-events-none'
                }`}
            >
                <div className="container-custom flex flex-col items-center justify-center gap-10 pt-20">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className="text-lg font-mono uppercase tracking-widest hover:underline hover:decoration-1 underline-offset-4"
                            onClick={closeMobileMenu}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        to="/#download"
                        className="text-lg font-mono uppercase tracking-widest hover:underline hover:decoration-1 underline-offset-4 flex items-center gap-2"
                        onClick={closeMobileMenu}
                    >
                        <span>Download</span>
                        <Download size={16} />
                    </Link>
                </div>
            </div>
        </nav>
    );
}
