"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface SessionCardProps {
    id: string;
    partNo: string;
    title: string;
    speakerName: string;
    speakerRole: string;
    speakerAvatarPlaceholder: string; // initial
    description: string;
    agendaItems: string[];
    isReversed?: boolean;
}

export default function SessionCard({
    id,
    partNo,
    title,
    speakerName,
    speakerRole,
    speakerAvatarPlaceholder,
    description,
    agendaItems,
    isReversed = false
}: SessionCardProps) {
    return (
        <section id={id} className="py-24 relative odd:bg-brand-navy even:bg-brand-light">
            <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
                <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-16 items-center`}>

                    {/* Content side */}
                    <motion.div
                        initial={{ opacity: 0, x: isReversed ? 30 : -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="flex-1 flex flex-col"
                    >
                        <div className="inline-flex items-center gap-2 text-brand-accent font-mono text-sm tracking-wider mb-4">
                            <span className="w-8 h-[1px] bg-brand-accent"></span>
                            {partNo}
                        </div>

                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            {title}
                        </h2>

                        <p className="text-brand-slate text-lg mb-8 leading-relaxed">
                            {description}
                        </p>

                        <div className="space-y-4 mb-10">
                            {agendaItems.map((item, idx) => (
                                <div key={idx} className="flex gap-4 items-start">
                                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center">
                                        <Check className="w-3.5 h-3.5 text-brand-accent" />
                                    </div>
                                    <span className="text-brand-text font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Speaker Card Side */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-full max-w-sm"
                    >
                        <div className="glass-panel p-8 rounded-2xl relative overflow-hidden group">
                            {/* Decorative accent */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/10 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2"></div>

                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-brand-accent/50 mb-6 bg-brand-lighter flex items-center justify-center group-hover:scale-105 transition-transform duration-500 shadow-xl">
                                    {/* Tương lai người dùng sẽ thay bằng thẻ Image của Next.js, ở đây dùng placeholder */}
                                    <span className="text-5xl font-bold text-brand-slate/50 font-serif">
                                        {speakerAvatarPlaceholder}
                                    </span>
                                </div>

                                <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
                                    Diễn giả / Speaker
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-2">{speakerName}</h3>
                                <p className="text-brand-slate font-medium">{speakerRole}</p>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
