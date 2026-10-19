"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { BookText, Star, Users } from "lucide-react";
import { SiGithub } from "react-icons/si";

const username = "shubhambajetha";

const GitHubCalendar = dynamic(
    () => import("react-github-calendar").then((module) => module.GitHubCalendar),
    {
        ssr: false,
        loading: () => (
            <div
                aria-label="Loading GitHub contribution calendar"
                className="h-36 animate-pulse rounded-lg bg-white/[0.04]"
            />
        ),
    },
);

type GitHubStats = {
    followers: number;
    repositories: number;
    stars: number;
};

const statStyles = {
    followers: {
        label: "Followers",
        Icon: Users,
        color: "text-[#60a5fa]",
        glow: "from-[#2563eb]/[0.12]",
    },
    repositories: {
        label: "Repositories",
        Icon: BookText,
        color: "text-[#22d3ee]",
        glow: "from-[#22d3ee]/[0.10]",
    },
    stars: {
        label: "GitHub Stars",
        Icon: Star,
        color: "text-[#93c5fd]",
        glow: "from-[#60a5fa]/[0.10]",
    },
} as const;

export default function SixthSection() {
    const [stats, setStats] = useState<GitHubStats | null>(null);
    const [calendarWidth, setCalendarWidth] = useState(0);
    const [shouldLoad, setShouldLoad] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const calendarContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                setShouldLoad(true);
                observer.disconnect();
            },
            { rootMargin: "300px" },
        );
        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const container = calendarContainerRef.current;
        if (!container) return;

        const observer = new ResizeObserver(([entry]) => {
            setCalendarWidth(entry.contentRect.width);
        });
        observer.observe(container);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!shouldLoad) return;
        const controller = new AbortController();
        const loadStats = async () => {
            try {
                const headers = { Accept: "application/vnd.github+json" };
                const [userResponse, repositoriesResponse] = await Promise.all([
                    fetch(`https://api.github.com/users/${username}`, { headers, signal: controller.signal }),
                    fetch(`https://api.github.com/users/${username}/repos?per_page=100&type=owner`, { headers, signal: controller.signal }),
                ]);

                if (!userResponse.ok || !repositoriesResponse.ok) return;

                const [user, repositories] = await Promise.all([
                    userResponse.json(),
                    repositoriesResponse.json(),
                ]);
                setStats({
                    followers: user.followers,
                    repositories: user.public_repos,
                    stars: repositories.reduce(
                        (total: number, repository: { stargazers_count: number }) => total + repository.stargazers_count,
                        0,
                    ),
                });
            } catch {
                // Keep the stat cards in their loading state if GitHub is unavailable.
            }
        };

        void loadStats();
        return () => controller.abort();
    }, [shouldLoad]);

    return (
        <section
            ref={sectionRef}
            id="contributions"
            aria-labelledby="contributions-title"
            className="group/section relative isolate mx-auto w-[calc(100%-2.25rem)] max-w-7xl py-16 text-white sm:w-[calc(100%-4rem)] sm:py-24"
        >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 scale-75 rounded-[40%] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.2),rgba(34,211,238,0.1)_38%,transparent_72%)] opacity-0 blur-3xl transition-all duration-700 group-hover/section:scale-100 group-hover/section:opacity-100" />
            <header className="mb-10 sm:mb-16">
                <h2
                    id="contributions-title"
                    className="bg-gradient-to-r from-[#60a5fa] to-[#22d3ee] bg-clip-text font-[var(--font-rajdhani)] text-3xl font-semibold leading-none tracking-tight text-transparent sm:text-5xl"
                >
                    Code &amp; Contributions
                </h2>
                <div aria-hidden="true" className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-[#2563eb] to-[#22d3ee]" />
            </header>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_350px]">
                <div className="min-w-0 overflow-hidden rounded-[22px] border border-white/10 bg-gradient-to-br from-white/[0.035] to-transparent p-4 sm:min-h-[510px] sm:p-8">
                    <a
                        href={`https://github.com/${username}`}
                        target="_blank"
                        rel="noreferrer"
                        className="mb-6 inline-flex max-w-full items-center gap-3 rounded-xl outline-none transition-colors hover:text-[#22d3ee] focus-visible:ring-2 focus-visible:ring-[#22d3ee] focus-visible:ring-offset-4 focus-visible:ring-offset-black sm:mb-8 sm:gap-4"
                    >
                        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#2563eb]/15 text-[#22d3ee] sm:size-12 sm:rounded-2xl">
                            <SiGithub aria-hidden="true" size={22} />
                        </span>
                        <span>
                            <span className="block font-semibold">@{username}</span>
                            <span className="block text-sm text-gray-400">Contribution activity on GitHub</span>
                        </span>
                    </a>

                    <div ref={calendarContainerRef} className="w-full max-w-full overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:thin]">
                        <div className="w-max min-w-full">
                            {shouldLoad ? (
                                <GitHubCalendar
                                    username={username}
                                    colorScheme="dark"
                                    blockSize={calendarWidth ? Math.max(3, Math.min(12, Math.floor((calendarWidth - 72) / 53))) : 3}
                                    blockMargin={1}
                                    fontSize={calendarWidth < 500 ? 10 : 13}
                                    blockRadius={3}
                                    theme={{
                                        dark: ["#101820", "#142d4a", "#1d4e89", "#2563eb", "#22d3ee"],
                                    }}
                                />
                            ) : (
                                <div aria-label="GitHub contributions load when this section is near" className="h-36 animate-pulse rounded-lg bg-white/[0.04]" />
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                    {(Object.keys(statStyles) as (keyof typeof statStyles)[]).map((key) => {
                        const { label, Icon, color, glow } = statStyles[key];
                        const value = stats?.[key];

                        return (
                            <article
                                key={key}
                                aria-label={`${label}: ${value ?? "loading"}`}
                                className={`min-h-36 rounded-[22px] border border-white/10 bg-gradient-to-br ${glow} to-transparent p-6 transition-colors duration-300 hover:border-[#22d3ee]/35 sm:min-h-40`}
                            >
                                <Icon aria-hidden="true" className={`mb-3 size-6 ${color}`} fill={key === "stars" ? "currentColor" : "none"} />
                                <p className={`text-4xl font-bold leading-none ${color}`}>
                                    {value ?? <span aria-hidden="true" className="inline-block h-9 w-14 animate-pulse rounded bg-white/10 align-middle" />}
                                </p>
                                <p className="mt-2 text-sm font-medium text-gray-400">{label}</p>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
