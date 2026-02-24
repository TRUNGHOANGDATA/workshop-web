"use client";

import { motion } from "framer-motion";
import { Users, Code, Briefcase, Layout } from "lucide-react";

export default function Audience() {
    const audiences = [
        {
            icon: <Users className="w-6 h-6 text-brand-accent" />,
            title: "Lãnh Đạo & Quản Lý",
            desc: "Business Leaders cần hiểu rõ sự chuyển dịch từ Chatbot sang 'Work Operating System' bằng AI."
        },
        {
            icon: <Code className="w-6 h-6 text-brand-accent" />,
            title: "Lập trình viên & IT",
            desc: "Developers khao khát ứng dụng Antigravity IDE để tự động hóa code đến 80%."
        },
        {
            icon: <Briefcase className="w-6 h-6 text-brand-accent" />,
            title: "Người làm MKT / Content",
            desc: "Muốn tạo ra Skills tái sử dụng liên tục (KWSR Framework) để xử lý lượng lớn dữ liệu nội dung."
        },
        {
            icon: <Layout className="w-6 h-6 text-brand-accent" />,
            title: "Knowledge Workers",
            desc: "Bất kỳ ai cần xử lý file, tạo quy trình làm việc tự động qua hệ sinh thái MCP an toàn."
        }
    ];

    return (
        <section id="audience" className="py-24 bg-brand-navy relative overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
                <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
                    <div className="flex-1">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-brand-accent mb-3">Đối Tượng Tham Gia</h2>
                        <h3 className="text-3xl md:text-5xl font-bold text-white">Ai Nên Tham Dự Workshop Này?</h3>
                    </div>
                    <div className="flex-1 text-brand-slate text-lg">
                        Nội dung được MIT Sloan đánh giá là "The new standard for knowledge work". Bất kể bạn là lãnh đạo hay người vận hành, ứng dụng AI đa tác vụ đang định hình lại cuộc chơi.
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {audiences.map((aud, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-panel p-6 rounded-2xl border-t border-brand-accent/20 hover:bg-white/[0.02] transition-colors"
                        >
                            <div className="w-12 h-12 rounded-lg bg-brand-accent/10 flex items-center justify-center mb-5">
                                {aud.icon}
                            </div>
                            <h4 className="text-lg font-bold text-white mb-2">{aud.title}</h4>
                            <p className="text-brand-slate text-sm leading-relaxed">{aud.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
