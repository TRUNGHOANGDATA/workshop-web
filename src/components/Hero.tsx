"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";
import { PRICE, ALLOW_REGISTRATION } from "./RegistrationForm";

export default function Hero() {
    const scrollToRegister = () => {
        document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-32 pb-12 lg:pt-32">
            {/* Animated Background blobs */}
            <div className="absolute inset-0 bg-brand-navy z-0"></div>
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-accent/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 z-0 animate-blob"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 z-0 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-purple-500/15 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 z-0 animate-blob animation-delay-4000"></div>

            {/* Floating decorative elements */}
            <motion.div animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="absolute top-32 left-12 w-8 h-8 rounded border border-brand-accent/30 hidden md:block z-0"></motion.div>
            <motion.div animate={{ y: [0, 25, 0], rotate: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }} className="absolute bottom-32 right-12 w-12 h-12 rounded-full border border-blue-500/30 hidden md:block z-0"></motion.div>


            <div className="container mx-auto px-6 lg:px-12 relative z-10 w-full max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col gap-6"
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-sans tracking-tight leading-tight text-white">
                            AI Enterprise <br />
                            <span className="text-gradient">Workshop 2026</span>
                        </h1>

                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/20 border border-brand-accent/30 text-brand-accent w-fit text-sm font-medium">
                            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
                            ĐỘC QUYỀN TỪ ERX CÙNG CHUYÊN GIA
                        </div>

                        <p className="text-lg md:text-xl text-brand-slate max-w-xl leading-relaxed text-justify hyphens-auto mt-4">
                            Khám phá cách tối ưu hóa quy trình làm việc và tự động hóa tác vụ với hệ sinh thái mở rộng của <strong>Antigravity IDE</strong>, kết hợp cùng sức mạnh phân tích dữ liệu chuyên sâu từ <strong>Advanced Claude Enterprise</strong>.
                            <br /><br />
                            Nâng tầm kỹ năng AI của bạn thông qua các case study thực tế, ứng dụng trực tiếp vào quá trình phát triển phần mềm và quản trị doanh nghiệp.
                        </p>

                        {/* Info Cards */}
                        <div className="flex flex-col gap-4 mt-2">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-start gap-4 text-brand-text/90 bg-brand-light/50 p-4 rounded-xl border border-white/5">
                                    <div className="p-2 rounded-lg bg-brand-accent/10 text-brand-accent shrink-0">
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-brand-slate uppercase tracking-widest font-bold mb-1">Ngày</span>
                                        <span className="font-semibold text-white">Thứ Bảy, 28/02/2026</span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 text-brand-text/90 bg-brand-light/50 p-4 rounded-xl border border-white/5">
                                    <div className="p-2 rounded-lg bg-brand-accent/10 text-brand-accent shrink-0">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-brand-slate uppercase tracking-widest font-bold mb-1">Thời Gian</span>
                                        <span className="font-semibold text-white">14:00 - 17:00</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start sm:items-center gap-4 text-brand-text/90 bg-brand-light/50 p-4 rounded-xl border border-white/5">
                                <div className="p-2 rounded-lg bg-brand-accent/10 text-brand-accent shrink-0">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-brand-slate uppercase tracking-widest font-bold mb-1">Địa Điểm</span>
                                    <span className="font-medium text-white text-sm sm:text-base">
                                        <span className="font-semibold text-brand-accent">Offline:</span> ERX VN HQ (46/4 Nguyễn Cửu Vân, HCM)
                                        <span className="hidden sm:inline mx-2 text-brand-slate">|</span>
                                        <br className="sm:hidden" />
                                        <span className="font-semibold text-brand-accent">Online:</span> Google Meet
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col sm:flex-row gap-5 items-center">
                            {ALLOW_REGISTRATION ? (
                                <button
                                    onClick={scrollToRegister}
                                    className="w-full sm:w-auto px-8 py-4 bg-brand-accent hover:bg-amber-400 text-brand-navy font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:-translate-y-1 transform duration-300"
                                >
                                    Đăng Ký Tham Gia {PRICE === 0 ? "(Miễn phí)" : `(${PRICE.toLocaleString('vi-VN')} đ)`}
                                </button>
                            ) : (
                                <a
                                    href="mailto:info@erx.vn"
                                    className="w-full sm:w-auto text-center px-8 py-4 bg-brand-accent hover:bg-amber-400 text-brand-navy font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] hover:-translate-y-1 transform duration-300"
                                >
                                    Liên Hệ: info@erx.vn
                                </a>
                            )}
                            <a href="#agenda" className="text-brand-text hover:text-white font-medium px-4 py-2 transition-colors inline-flex items-center gap-2 whitespace-nowrap">
                                Xem Nội Dung Chi Tiết <span className="text-brand-accent">→</span>
                            </a>
                        </div>
                    </motion.div>

                    {/* Right Side Graphic */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="hidden lg:flex justify-end relative"
                    >
                        <div className="relative w-full aspect-square max-w-[500px]">
                            <div className="absolute inset-0 bg-gradient-to-tr from-brand-accent/20 to-blue-500/20 rounded-2xl rotate-3 blur-md filter"></div>
                            <div className="glass-panel absolute inset-4 rounded-2xl flex flex-col p-6 overflow-hidden">
                                <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                    </div>
                                    <div className="ml-4 text-xs font-mono text-brand-slate bg-brand-navy/50 px-3 py-1 rounded">antigravity-dashboard.tsx</div>
                                </div>

                                <div className="flex-1 flex flex-col gap-4">
                                    <div className="flex gap-4 items-center animate-pulse duration-1000">
                                        <div className="w-10 h-10 rounded bg-white/10 shrink-0"></div>
                                        <div className="h-4 bg-white/10 rounded w-full"></div>
                                    </div>
                                    <div className="flex gap-4 items-center animate-pulse delay-150 duration-1000">
                                        <div className="w-10 h-10 rounded bg-white/10 shrink-0"></div>
                                        <div className="h-4 bg-white/10 rounded w-3/4"></div>
                                    </div>
                                    <div className="mt-auto pt-6 border-t border-white/10 font-mono text-xs text-brand-accent">
                                        $ npm run build <br />
                                        <span className="text-brand-text/50">✓ Compiled successfully in 12.4s</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
