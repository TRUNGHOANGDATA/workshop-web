"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Zap, Brain, Rocket } from "lucide-react";

export default function About() {
    const benefits = [
        {
            icon: <Zap className="w-6 h-6 text-brand-accent" />,
            title: "10x Tốc Độ Cấu Trúc Dự Án",
            desc: "Trực quan hóa và tự động sinh code 60-80% từ NSDL Framework, loại bỏ công việc lặp lại."
        },
        {
            icon: <Brain className="w-6 h-6 text-brand-accent" />,
            title: "Chuyên Gia Đa Ngành AI",
            desc: "Cách áp dụng phương pháp KWSR để chuyển đổi kiến thức chuyên môn thành AI Skills (Kỹ năng AI)."
        },
        {
            icon: <Rocket className="w-6 h-6 text-brand-accent" />,
            title: "Hệ Sinh Thái Toàn Diện",
            desc: "Gắn kết Code, Cowork, Chrome, Excel qua hệ thống file-level automation & institutional memory."
        }
    ];

    return (
        <section id="overview" className="py-24 bg-brand-light relative">
            <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-brand-accent mb-3">Tổng Quan</h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Trải Nghiệm Tiêu Chuẩn Phân Tích Mới Cùng AI</h3>
                    <p className="text-brand-slate text-lg">
                        AI đã vượt qua giới hạn của Chatbots. Hãy tham gia cùng chúng tôi để thiết lập "hệ điều hành làm việc" mới dựa trên Antigravity IDE và Claude Enterprise, mang lại sức mạnh tự động hóa sâu rộng file-level.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {benefits.map((b, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="glass-panel p-8 rounded-2xl flex flex-col hover:-translate-y-3 transition-all duration-500 hover:border-brand-accent/40 hover:shadow-[0_10px_40px_rgba(245,158,11,0.15)] group"
                        >
                            <div className="w-14 h-14 rounded-xl bg-brand-navy border border-white/5 flex items-center justify-center mb-6 shadow-[0_4px_10px_rgba(0,0,0,0.5)] group-hover:bg-brand-accent/10 group-hover:border-brand-accent/30 transition-all duration-500">
                                {b.icon}
                            </div>
                            <h4 className="text-xl font-bold text-white mb-3">{b.title}</h4>
                            <p className="text-brand-slate leading-relaxed">{b.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
