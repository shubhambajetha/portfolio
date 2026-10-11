"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Products", href: "/products" },
        { name: "About", href: "/about" },
        { name: "Services", href: "/services" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">

                {/* Logo */}
                <Link
                    href="/"
                    className="shrink-0 text-xl font-bold tracking-tight text-gray-900"
                >
                    MyBrand
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden flex-1 items-center justify-center gap-8 md:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

               

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="ml-auto inline-flex items-center justify-center rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 md:hidden"
                    aria-label="Toggle menu"
                    aria-expanded={isOpen}
                >
                    {isOpen ? (
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`overflow-hidden border-t border-gray-100 bg-white transition-all duration-300 md:hidden ${isOpen
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0"
                    }`}
            >
                <div className="space-y-1 px-4 pb-4 pt-3">

                    {/* Mobile Search */}
                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
                        />
                    </div>

                    {/* Mobile Links */}
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="block rounded-lg px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                        >
                            {item.name}
                        </Link>
                    ))}

                    {/* Mobile Actions */}
                    <div className="grid grid-cols-2 gap-3 pt-3">
                        <Link
                            href="/login"
                            onClick={() => setIsOpen(false)}
                            className="rounded-lg border border-gray-200 px-4 py-3 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                            Login
                        </Link>

                        <Link
                            href="/signup"
                            onClick={() => setIsOpen(false)}
                            className="rounded-lg bg-black px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-gray-800"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}