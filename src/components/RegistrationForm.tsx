"use client";

import { useState, useEffect } from "react";
import { Send, CheckCircle2, AlertCircle, Users, X, Tag, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ==================== CẤU HÌNH THANH TOÁN ====================
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzCRdsFFZxfMw4ttsFIPL-DYTGWDcnqBcjJvfutQ7_5zhXeUB9jt5BvwsV8qFhVgbyiFw/exec";

export const ALLOW_REGISTRATION: boolean = false; // false = Chỉ hiển thị nút liên hệ info@erx.vn, true = Hiển thị form đăng ký
export const PRICE: number = 0;          // 0 = Miễn phí, > 0 = có phí (VNĐ)
const MAX_ATTENDEES = 20;          // Giới hạn số lượng đăng ký

// Cấu hình ngân hàng cho QR Thanh toán (chỉ dùng khi PRICE > 0)
const BANK_ID = "970407";           // Mã ngân hàng (VCB = 970436, MB = 970422, TCB = 970407...)
const BANK_ACCOUNT = "896868888888";  // Số tài khoản nhận tiền
const BANK_NAME = "Techcombank";    // Tên ngân hàng (để hiển thị)
const ACCOUNT_HOLDER = "HOANG TRUNG"; // Tên chủ tài khoản

// Mã giảm giá: { "MÃ": phần_trăm_giảm }  (ví dụ: "EARLY50" giảm 50%)
const DISCOUNT_CODES: Record<string, number> = {
    "EARLY50": 50,       // Giảm 50%
    "FRIEND20": 20,      // Giảm 20%
    "VIP100": 100,       // Miễn phí hoàn toàn
};
// ==============================================================

function generateRegCode(): string {
    const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
    let code = "ERX-";
    for (let i = 0; i < 5; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

export default function RegistrationForm() {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "full">("idle");
    const [errorMsg, setErrorMsg] = useState("");
    const [currentCount, setCurrentCount] = useState<number | null>(null);

    // Discount code
    const [discountCode, setDiscountCode] = useState("");
    const [discountApplied, setDiscountApplied] = useState<number>(0); // phần trăm giảm
    const [discountError, setDiscountError] = useState("");

    // Success state
    const [regCode, setRegCode] = useState("");
    const [showQrPopup, setShowQrPopup] = useState(false);
    const [copied, setCopied] = useState(false);

    const finalPrice = PRICE > 0 ? Math.round(PRICE * (1 - discountApplied / 100)) : 0;

    // Fetch current count on load
    useEffect(() => {
        if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes("YOUR_G")) return;

        fetch(`${GOOGLE_SCRIPT_URL}?action=getCount`)
            .then(res => res.json())
            .then(data => {
                if (data && typeof data.count === 'number') {
                    setCurrentCount(data.count);
                    if (data.count >= MAX_ATTENDEES) {
                        setStatus("full");
                    }
                }
            })
            .catch(() => { });
    }, []);

    const isFull = status === "full" || (currentCount !== null && currentCount >= MAX_ATTENDEES);

    const handleApplyDiscount = () => {
        const code = discountCode.trim().toUpperCase();
        if (!code) return;
        if (DISCOUNT_CODES[code] !== undefined) {
            setDiscountApplied(DISCOUNT_CODES[code]);
            setDiscountError("");
        } else {
            setDiscountApplied(0);
            setDiscountError("Mã giảm giá không hợp lệ");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.phone) return;
        if (isFull) return;

        setStatus("loading");
        const code = generateRegCode();
        setRegCode(code);

        const payload = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            regCode: code,
            price: finalPrice,
            originalPrice: PRICE,
            discountCode: discountApplied > 0 ? discountCode.trim().toUpperCase() : "",
            discountPercent: discountApplied,
        };

        if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes("YOUR_G")) {
            setTimeout(() => setStatus("success"), 600);
            return;
        }

        // Fire-and-forget: gửi request rồi hiển thị success ngay lập tức
        // Không cần đợi response vì mode no-cors không đọc được response body
        fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify(payload),
        }).catch(() => { });

        // Hiển thị ngay sau 400ms (chỉ để tạo cảm giác xử lý nhẹ)
        setTimeout(() => {
            setStatus("success");
            setCurrentCount(prev => prev !== null ? prev + 1 : 1);
        }, 400);
    };

    const qrUrl = finalPrice > 0
        ? `https://img.vietqr.io/image/${BANK_ID}-${BANK_ACCOUNT}-compact2.png?amount=${finalPrice}&addInfo=${encodeURIComponent(regCode + " " + formData.name)}`
        : "";

    const handleCopyRegCode = () => {
        navigator.clipboard.writeText(regCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            <section id="register" className="py-24 relative overflow-hidden bg-brand-light">
                <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-brand-accent/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

                <div className="container mx-auto px-6 lg:px-12 max-w-4xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl"
                    >
                        <div className="text-center mb-10">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Đăng Ký Tham Gia</h2>
                            <p className="text-brand-slate text-lg">
                                Giữ chỗ ngay hôm nay. Phí tham dự: <span className="text-brand-accent font-bold">{PRICE === 0 ? "Miễn Phí" : `${PRICE.toLocaleString('vi-VN')} VNĐ`}</span>.
                            </p>
                            {currentCount !== null && ALLOW_REGISTRATION && (
                                <div className="mt-3 flex items-center justify-center gap-2 text-sm text-brand-slate/80 bg-brand-navy/30 w-fit mx-auto px-4 py-1.5 rounded-full border border-white/5">
                                    <Users className="w-4 h-4" />
                                    <span>Đã đăng ký: <strong>{currentCount}</strong> / {MAX_ATTENDEES} người</span>
                                </div>
                            )}
                        </div>

                        {!ALLOW_REGISTRATION ? (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="flex flex-col items-center justify-center py-12 text-center"
                            >
                                <div className="w-20 h-20 rounded-full bg-brand-accent/20 flex items-center justify-center mb-6">
                                    <Send className="w-10 h-10 text-brand-accent" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Liên Hệ Đăng Ký</h3>
                                <p className="text-brand-slate max-w-md mb-8">
                                    Sự kiện này hiện chưa mở form đăng ký trực tuyến. Vui lòng liên hệ trực tiếp với chúng tôi qua email để được hỗ trợ tham gia và nhận thông tin chi tiết.
                                </p>
                                <a
                                    href="mailto:info@erx.vn"
                                    className="px-8 py-4 bg-brand-accent hover:bg-amber-400 text-brand-navy font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] text-lg inline-flex items-center gap-2"
                                >
                                    <Send className="w-5 h-5" />
                                    Liên Hệ: info@erx.vn
                                </a>
                            </motion.div>
                        ) : isFull ? (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="flex flex-col items-center justify-center py-12 text-center"
                            >
                                <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mb-6">
                                    <AlertCircle className="w-10 h-10 text-red-500" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Đã Đạt Giới Hạn Đăng Ký</h3>
                                <p className="text-brand-slate max-w-md">
                                    Rất tiếc, sự kiện lần này đã nhận đủ {MAX_ATTENDEES} người đăng ký. Hẹn gặp lại bạn ở các sự kiện tiếp theo của ERX Vietnam.
                                </p>
                            </motion.div>
                        ) : status === "success" ? (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="flex flex-col items-center justify-center py-8 text-center"
                            >
                                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                                    <CheckCircle2 className="w-10 h-10 text-green-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Đăng Ký Thành Công!</h3>

                                {/* Mã đăng ký */}
                                <div className="flex items-center gap-2 bg-brand-navy/60 border border-white/10 rounded-xl px-5 py-3 mb-4">
                                    <span className="text-brand-slate text-sm">Mã đăng ký:</span>
                                    <span className="text-brand-accent font-bold text-lg font-mono tracking-wider">{regCode}</span>
                                    <button onClick={handleCopyRegCode} className="ml-2 text-brand-slate hover:text-white transition-colors" title="Copy">
                                        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>

                                <p className="text-brand-slate max-w-md mb-6">
                                    {finalPrice > 0
                                        ? "Vui lòng thanh toán để giữ chỗ. Bấm nút bên dưới để hiện mã QR chuyển khoản."
                                        : "Sự kiện này hoàn toàn miễn phí. Chúng tôi sẽ liên hệ bạn qua email."
                                    }
                                </p>

                                {finalPrice > 0 && (
                                    <button
                                        onClick={() => setShowQrPopup(true)}
                                        className="px-8 py-4 bg-brand-accent hover:bg-amber-400 text-brand-navy font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] mb-4 text-lg"
                                    >
                                        🏦 Thanh Toán Qua QR
                                    </button>
                                )}

                                <button
                                    onClick={() => {
                                        setStatus("idle");
                                        setFormData({ name: "", email: "", phone: "" });
                                        setDiscountCode("");
                                        setDiscountApplied(0);
                                        setRegCode("");
                                    }}
                                    className="mt-2 text-brand-accent hover:text-white transition-colors"
                                >
                                    Đăng ký thêm người khác →
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-xl mx-auto">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="name" className="text-sm font-medium text-brand-text">Họ và Tên *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="px-4 py-3 rounded-xl bg-brand-navy/50 border border-white/10 text-white placeholder-brand-slate/50 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-transparent transition-all"
                                        placeholder="Nhập họ và tên của bạn"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="email" className="text-sm font-medium text-brand-text">Email *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        className="px-4 py-3 rounded-xl bg-brand-navy/50 border border-white/10 text-white placeholder-brand-slate/50 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-transparent transition-all"
                                        placeholder="name@company.com"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="phone" className="text-sm font-medium text-brand-text">Số Điện Thoại *</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        required
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        className="px-4 py-3 rounded-xl bg-brand-navy/50 border border-white/10 text-white placeholder-brand-slate/50 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-transparent transition-all"
                                        placeholder="09xx xxx xxx"
                                    />
                                </div>

                                {/* Mã giảm giá - chỉ hiện khi có phí */}
                                {PRICE > 0 && (
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="discount" className="text-sm font-medium text-brand-text flex items-center gap-1.5">
                                            <Tag className="w-3.5 h-3.5" /> Mã giảm giá (nếu có)
                                        </label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                id="discount"
                                                value={discountCode}
                                                onChange={e => {
                                                    setDiscountCode(e.target.value);
                                                    setDiscountError("");
                                                    if (!e.target.value) setDiscountApplied(0);
                                                }}
                                                className="flex-1 px-4 py-3 rounded-xl bg-brand-navy/50 border border-white/10 text-white placeholder-brand-slate/50 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-transparent transition-all uppercase font-mono"
                                                placeholder="Nhập mã giảm giá"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleApplyDiscount}
                                                className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-medium transition-all text-sm whitespace-nowrap"
                                            >
                                                Áp dụng
                                            </button>
                                        </div>
                                        {discountError && (
                                            <p className="text-red-400 text-xs">{discountError}</p>
                                        )}
                                        {discountApplied > 0 && (
                                            <div className="flex items-center gap-2 text-green-400 text-sm bg-green-400/10 p-2.5 rounded-lg">
                                                <CheckCircle2 className="w-4 h-4" />
                                                <span>Giảm {discountApplied}% — Giá còn: <strong>{finalPrice === 0 ? "Miễn phí" : `${finalPrice.toLocaleString('vi-VN')} VNĐ`}</strong></span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {status === "error" && (
                                    <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-3 rounded-lg text-sm">
                                        <AlertCircle className="w-4 h-4" />
                                        {errorMsg}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="mt-4 w-full flex items-center justify-center gap-2 px-8 py-4 bg-brand-accent hover:bg-amber-400 disabled:opacity-70 disabled:hover:bg-brand-accent text-brand-navy font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] !cursor-pointer"
                                >
                                    {status === "loading" ? (
                                        <div className="w-6 h-6 border-2 border-brand-navy border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <span>Đăng Ký Tham Gia {PRICE === 0 ? "(Miễn phí)" : `(${PRICE.toLocaleString('vi-VN')} VNĐ)`}</span>
                                            <Send className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                                <p className="text-center text-xs text-brand-slate mt-2">
                                    Bằng việc đăng ký, bạn đồng ý nhận thông tin cập nhật về sự kiện.
                                </p>
                            </form>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* ============ QR POPUP MODAL ============ */}
            <AnimatePresence>
                {showQrPopup && finalPrice > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                        onClick={() => setShowQrPopup(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 30 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="bg-gradient-to-b from-[#0f172a] to-[#0a0f1c] rounded-3xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.6)] w-full max-w-md overflow-hidden relative"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setShowQrPopup(false)}
                                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            {/* Header */}
                            <div className="text-center pt-8 pb-4 px-6">
                                <p className="text-brand-accent text-sm font-bold uppercase tracking-widest mb-2">Thanh Toán Giữ Chỗ</p>
                                <h3 className="text-white text-2xl font-bold">Quét mã QR để chuyển khoản</h3>
                            </div>

                            {/* QR Code - TO */}
                            <div className="flex justify-center px-6 pb-4">
                                <div className="w-72 h-72 bg-white rounded-2xl p-3 shadow-[0_10px_40px_rgba(245,158,11,0.15)]">
                                    <img
                                        src={qrUrl}
                                        alt="QR Thanh Toán"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </div>

                            {/* Payment info */}
                            <div className="px-6 pb-6 space-y-3">
                                <div className="bg-white/5 rounded-xl p-4 space-y-2 border border-white/5">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-brand-slate">Ngân hàng</span>
                                        <span className="text-white font-medium">{BANK_NAME}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-brand-slate">Số tài khoản</span>
                                        <span className="text-white font-mono">{BANK_ACCOUNT}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-brand-slate">Chủ tài khoản</span>
                                        <span className="text-white font-medium">{ACCOUNT_HOLDER}</span>
                                    </div>
                                    <div className="border-t border-white/10 pt-2 mt-2 flex justify-between">
                                        <span className="text-brand-slate text-sm">Số tiền</span>
                                        <span className="text-brand-accent font-bold text-xl">{finalPrice.toLocaleString('vi-VN')} VNĐ</span>
                                    </div>
                                </div>

                                <div className="bg-brand-accent/10 border border-brand-accent/20 rounded-xl p-3 text-center">
                                    <p className="text-brand-slate text-xs mb-1">Nội dung chuyển khoản</p>
                                    <p className="text-white font-mono font-bold text-base tracking-wide">{regCode} {formData.name}</p>
                                </div>

                                {discountApplied > 0 && (
                                    <p className="text-green-400 text-xs text-center">
                                        ✨ Đã áp dụng mã <strong>{discountCode.toUpperCase()}</strong> — giảm {discountApplied}%
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
