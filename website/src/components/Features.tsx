import { useEffect, useRef, useState } from 'react';
import { Cpu, Zap, EyeOff, Lock } from 'lucide-react';

const features = [
    {
        icon: <Cpu strokeWidth={1} size={32} />,
        title: "Local Private LLM",
        description: "Powered by Apple MLX. Your AI assistant runs entirely on your silicon. No API costs, no latency, no data leaks."
    },
    {
        icon: <EyeOff strokeWidth={1} size={32} />,
        title: "No Tracking",
        description: "We don't track opens, clicks, or your data. Your email is your business. We rely on your device's power, not our servers."
    },
    {
        icon: <Zap strokeWidth={1} size={32} />,
        title: "Zero Inbox",
        description: "AI automatically categorizes newsletters, receipts, and updates. Focus only on what matters. Clear your inbox in seconds."
    },
    {
        icon: <Lock strokeWidth={1} size={32} />,
        title: "Direct Fetch",
        description: "Emails are fetched directly from Google/IMAP to your device. No middleman servers reading your correspondence."
    }
];

const techItems = [
    {
        number: "I",
        label: "Rust + Tauri v2",
        description: (
            <>
                Built on a secure, memory-safe backend. The app binary is tiny (~10MB) and uses a fraction of the RAM of Electron apps.
            </>
        )
    },
    {
        number: "II",
        label: "Apple Metal",
        description: (
            <>
                We use <span className="font-bold">llama.cpp</span> optimized for Metal to run 7B+ parameter models directly on your GPU.
            </>
        )
    },
    {
        number: "III",
        label: "Zero Data Exit",
        description: (
            <>
                Your credentials stay in the macOS Keychain. Your data stays in a local SQLite db. No servers. No analytics.
            </>
        )
    }
];

function useInView(threshold = 0.15) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(element);
                }
            },
            { threshold }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [threshold]);

    return { ref, isVisible };
}

export default function Features() {
    const heading = useInView(0.2);
    const grid = useInView(0.1);
    const engineered = useInView(0.15);

    return (
        <section id="features" className="py-32 bg-background border-t-8 border-black">
            <div className="container-custom">
                {/* Section heading */}
                <div
                    ref={heading.ref}
                    className="mb-20"
                    style={{
                        opacity: heading.isVisible ? 1 : 0,
                        transform: heading.isVisible ? 'translateY(0)' : 'translateY(24px)',
                        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                    }}
                >
                    <h2 className="font-serif text-6xl md:text-7xl mb-6">Features.</h2>
                    <p className="font-mono text-sm uppercase tracking-widest text-mutedForeground">
                        Designed for the privacy-conscious professional.
                    </p>
                </div>

                {/* Feature grid */}
                <div
                    ref={grid.ref}
                    className="grid grid-cols-1 md:grid-cols-2 border border-black"
                >
                    {features.map((feature, index) => {
                        const num = String(index + 1).padStart(2, '0');
                        const isLeftCol = index % 2 === 0;

                        return (
                            <div
                                key={index}
                                className={`
                                    group relative p-12 border-black
                                    ${isLeftCol ? 'md:border-r' : ''}
                                    ${index > 0 ? 'border-t' : ''}
                                    ${index < 2 ? 'md:border-t-0' : ''}
                                    hover:bg-black hover:text-white transition-colors duration-200
                                `}
                                style={{
                                    opacity: grid.isVisible ? 1 : 0,
                                    transform: grid.isVisible ? 'translateY(0)' : 'translateY(24px)',
                                    transition: `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`,
                                }}
                            >
                                {/* Card number */}
                                <span className="absolute top-6 right-8 font-mono text-sm text-black/20 group-hover:text-white/30 transition-colors duration-200">
                                    {num}
                                </span>

                                {/* Icon */}
                                <div className="mb-8 p-4 border border-black inline-block group-hover:border-white group-hover:bg-white group-hover:text-black transition-colors duration-200">
                                    {feature.icon}
                                </div>

                                {/* Title + accent line */}
                                <h3 className="font-serif text-3xl mb-3 italic">{feature.title}</h3>
                                <div className="w-10 h-[2px] bg-black/30 mb-5 group-hover:bg-white/50 transition-colors duration-200" />

                                {/* Description */}
                                <p className="font-body text-lg leading-relaxed opacity-80 group-hover:opacity-100">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Engineered for Silicon */}
                <div
                    ref={engineered.ref}
                    className="mt-32 border-t-8 border-black pt-16"
                >
                    <h3
                        className="font-serif text-3xl md:text-5xl mb-16 text-center"
                        style={{
                            opacity: engineered.isVisible ? 1 : 0,
                            transform: engineered.isVisible ? 'translateY(0)' : 'translateY(24px)',
                            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                        }}
                    >
                        Engineered for Silicon.
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                        {techItems.map((item, index) => (
                            <div
                                key={index}
                                className={`
                                    text-center px-8 py-10
                                    ${index < techItems.length - 1 ? 'md:border-r border-b md:border-b-0 border-black/15' : ''}
                                `}
                                style={{
                                    opacity: engineered.isVisible ? 1 : 0,
                                    transform: engineered.isVisible ? 'translateY(0)' : 'translateY(24px)',
                                    transition: `opacity 0.6s ease-out ${0.15 + index * 0.12}s, transform 0.6s ease-out ${0.15 + index * 0.12}s`,
                                }}
                            >
                                {/* Decorative roman numeral */}
                                <div className="font-serif text-5xl md:text-6xl text-black/8 mb-4 select-none">
                                    {item.number}
                                </div>

                                <div className="font-mono font-bold text-xl mb-4">{item.label}</div>

                                <p className="font-body text-black/70 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
