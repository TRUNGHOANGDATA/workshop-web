import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-brand-navy py-12 border-t border-white/5">
            <div className="container mx-auto px-6 lg:px-12 max-w-7xl flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 relative bg-white rounded flex items-center justify-center p-1">
                        <Image src="/ERX_LOGO.png" alt="ERX Logo" width={24} height={24} className="object-contain" />
                    </div>
                    <span className="text-white font-bold tracking-wide">ERX VIETNAM</span>
                </div>

                <p className="text-brand-slate text-sm text-center md:text-left">
                    © {new Date().getFullYear()} ERX VIETNAM. All rights reserved. <br />
                    46/4 Nguyễn Cửu Vân, Phường Gia Định, TP.HCM
                </p>

                <div className="flex items-center gap-6">
                    <a href="https://khoahoc.erx.vn/" target="_blank" rel="noopener noreferrer" className="text-brand-slate hover:text-white transition-colors text-sm font-medium hover:text-brand-accent">
                        Khoá học E learning
                    </a>
                </div>
            </div>
        </footer>
    );
}
