"use client"

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

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            greetings.forEach((greeting, index) => {
                const isLast = index === greetings.length - 1;

                // Enter
                tl.set(text, {
                    textContent: `• ${greeting}`,
                    opacity: 0,
                    y: 10,
                    scale: 1,
                    filter: "blur(4px)",
                });

                tl.to(text, {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: 0.12,
                    ease: "power3.out",
                });

                // Hold
                tl.to({}, { duration: isLast ? 0.35 : 0.09 });

                // Leave (skipped on the last word, it zooms out below)
                if (!isLast) {
                    tl.to(text, {
                        opacity: 0,
                        y: -10,
                        filter: "blur(4px)",
                        duration: 0.08,
                        ease: "power2.in",
                    });
                }
            });

            // Last word: blur + zoom into the screen
            tl.to(text, {
                scale: 12,
                filter: "blur(24px)",
                opacity: 0,
                duration: 0.8,
                ease: "power3.in",
            });

            // Background fades out while the zoom is still finishing
            tl.to(
                container,
                {
                    opacity: 0,
                    duration: 0.4,
                    ease: "power2.out",
                },
                "<0.4"
            );

            tl.set(container, { display: "none" });
        });

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#151515] text-white"
        >   
            <div
                ref={textRef}
                className="text-5xl font-light tracking-tight"
            >
                • {greetings[0]}
            </div>
        </div>
    );
}