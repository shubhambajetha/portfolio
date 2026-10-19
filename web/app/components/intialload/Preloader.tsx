"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

const greetings = [
    "Olá",
    "Hola",
    "Bonjour",
    "Ciao",
    "Hello",
    "こんにちは",
    "مرحبا",
    "नमस्ते",
];

export default function Preloader() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const text = textRef.current;
        if (!container || !text) return;

        const context = gsap.context(() => {
            const timeline = gsap.timeline();

            greetings.forEach((greeting, index) => {
                const isLast = index === greetings.length - 1;
                timeline.set(text, {
                    textContent: `• ${greeting}`,
                    opacity: 0,
                    y: 8,
                    scale: 1,
                    filter: "blur(4px)",
                });
                timeline.to(text, {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: 0.06,
                    ease: "power2.out",
                });
                timeline.to({}, { duration: isLast ? 0.08 : 0.025 });

                if (!isLast) {
                    timeline.to(text, {
                        opacity: 0,
                        y: -8,
                        filter: "blur(4px)",
                        duration: 0.045,
                        ease: "power2.in",
                    });
                }
            });

            timeline.to(text, {
                scale: 12,
                filter: "blur(24px)",
                opacity: 0,
                duration: 0.4,
                ease: "power3.in",
            });
            timeline.to(
                container,
                { opacity: 0, duration: 0.18, ease: "power2.out" },
                "<0.17",
            );
            timeline.set(container, { display: "none" });
        });

        return () => context.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#151515] text-white"
        >
            <div ref={textRef} className="text-5xl font-light tracking-tight">
                • {greetings[0]}
            </div>
        </div>
    );
}
