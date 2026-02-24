"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function FloatingActions() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
            {/* Zalo */}
            <a
                href="https://zalo.me/0902403666"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-[#0068FF] shadow-lg hover:bg-blue-600 transition-transform hover:scale-110"
                title="Chat Zalo"
            >
                <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
                    <path d="M12.49 10.2722v-.4496h1.3467v6.3218h-.7704a.576.576 0 01-.5763-.5729l-.0006.0005a3.273 3.273 0 01-1.9372.6321c-1.8138 0-3.2844-1.4697-3.2844-3.2823 0-1.8125 1.4706-3.2822 3.2844-3.2822a3.273 3.273 0 011.9372.6321l.0006.0005zM6.9188 7.7896v.205c0 .3823-.051.6944-.2995 1.0605l-.03.0343c-.0542.0615-.1815.206-.2421.2843L2.024 14.8h4.8948v.7682a.5764.5764 0 01-.5767.5761H0v-.3622c0-.4436.1102-.6414.2495-.8476L4.8582 9.23H.1922V7.7896h6.7266zm8.5513 8.3548a.4805.4805 0 01-.4803-.4798v-7.875h1.4416v8.3548H15.47zM20.6934 9.6C22.52 9.6 24 11.0807 24 12.9044c0 1.8252-1.4801 3.306-3.3066 3.306-1.8264 0-3.3066-1.4808-3.3066-3.306 0-1.8237 1.4802-3.3044 3.3066-3.3044zm-10.1412 5.253c1.0675 0 1.9324-.8645 1.9324-1.9312 0-1.065-.865-1.9295-1.9324-1.9295s-1.9324.8644-1.9324 1.9295c0 1.0667.865 1.9312 1.9324 1.9312zm10.1412-.0033c1.0737 0 1.945-.8707 1.945-1.9453 0-1.073-.8713-1.9436-1.945-1.9436-1.0753 0-1.945.8706-1.945 1.9436 0 1.0746.8697 1.9453 1.945 1.9453z" />
                </svg>
            </a>

            {/* Messenger */}
            <a
                href="https://m.me/ERXVietnam"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-[#00B2FF] to-[#006AFF] shadow-lg hover:opacity-90 transition-transform hover:scale-110"
                title="Chat Messenger"
            >
                <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                    <path d="M.001 11.639C.001 4.949 5.241 0 12.001 0S24 4.95 24 11.639c0 6.689-5.24 11.638-12 11.638-1.21 0-2.38-.16-3.47-.46a.96.96 0 00-.64.05l-2.39 1.05a.96.96 0 01-1.35-.85l-.07-2.14a.97.97 0 00-.32-.68A11.39 11.389 0 01.002 11.64zm8.32-2.19l-3.52 5.6c-.35.53.32 1.139.82.75l3.79-2.87c.26-.2.6-.2.87 0l2.8 2.1c.84.63 2.04.4 2.6-.48l3.52-5.6c.35-.53-.32-1.13-.82-.75l-3.79 2.87c-.25.2-.6.2-.86 0l-2.8-2.1a1.8 1.8 0 00-2.61.48z" />
                </svg>
            </a>

            {/* Scroll to Top */}
            <button
                onClick={scrollToTop}
                className={`w-12 h-12 flex items-center justify-center rounded-full bg-brand-light text-brand-text border border-white/10 shadow-lg hover:bg-white/10 hover:text-white transition-all hover:scale-110 duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
                title="Về đầu trang"
            >
                <ArrowUp className="w-5 h-5" />
            </button>
        </div >
    );
}
