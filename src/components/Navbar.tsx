"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Tổng quan", href: "#overview" },
        { name: "Antigravity IDE", href: "#part1" },
        { name: "Claude Enterprise", href: "#part2" },
        { name: "Đối tượng", href: "#audience" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-brand-navy/90 backdrop-blur-md border-b border-white/10 py-3 shadow-lg" : "bg-transparent py-5"
                }`}
        >
            <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <a href="https://khoahoc.erx.vn/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                            <div className="w-10 h-10 relative bg-white rounded flex items-center justify-center overflow-hidden p-1 shadow">
                                <Image src="/ERX_LOGO.png" alt="ERX Logo" width={32} height={32} className="object-contain" priority />
                            </div>
                            <span className="text-white font-bold text-lg tracking-wide">ERX VIETNAM</span>
                        </a>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <ul className="flex items-center gap-6">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-brand-text hover:text-brand-accent text-sm font-medium transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <a
                            href="#register"
                            className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg text-sm font-bold transition-all hover:scale-105"
                        >
                            Đăng Ký Workshop
                        </a>
                    </div>

                    {/* Mobile menu trigger */}
                    <button
                        className="md:hidden text-white p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-brand-light border-b border-white/10 overflow-hidden"
                    >
                        <div className="py-4 px-6 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-brand-text hover:text-white font-medium py-2 border-b border-white/5"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <a
                                href="#register"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full text-center px-5 py-3 mt-2 bg-brand-accent text-brand-navy rounded-lg font-bold"
                            >
                                Đăng Ký Tham Gia
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
