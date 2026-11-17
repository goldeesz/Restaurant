
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { ArrowRight, Mail } from "lucide-react";

export default function NewsletterCTA() {
    const [email, setEmail] = useState("");

    const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        toast.success("Спасибо за интерес к Culinary Paradise!");
        setEmail("");
    };

    return (
        <section className="bg-[#491B2A] text-white py-20 xl:py-28 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 rounded-full border border-[#C6A15B]/10 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full border border-[#C6A15B]/10 translate-x-1/3 translate-y-1/3" />

            <div className="relative max-w-2xl mx-auto px-6">
                <span className="text-[10px] text-[#D8B66F] tracking-[0.25em] uppercase block mb-4">
                    CULINARY PARADISE
                </span>

                <h2 className="font-display text-3xl md:text-4xl text-[#FFFCF8] mb-5">
                    Откройте для себя мир идеальной кухни
                </h2>

                <p className="text-sm text-[#F5F0E8]/75 mb-9 leading-relaxed max-w-lg mx-auto">
                    Подписывайтесь на наши новости, чтобы первыми узнавать
                    об открытии новых ресторанов
                </p>

                <form
                    onSubmit={handleSubscribe}
                    className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                    <div className="flex-1 flex items-center gap-3 bg-white/10 border border-white/20 px-4">
                        <Mail size={17} className="text-[#D8B66F] shrink-0" />

                        <input
                            className="w-full bg-transparent text-white text-sm py-4 outline-none placeholder:text-white/50"
                            placeholder="Ваш электронный адрес"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-[#D8B66F] text-[#291F22] hover:bg-[#E8D5AD] transition-soft text-xs tracking-widest uppercase py-4 px-7 cursor-pointer flex items-center justify-center gap-2"
                    >
                        Подписаться
                        <ArrowRight size={15} />
                    </button>
                </form>

                <p className="text-[10px] text-white/40 mt-5">
                    Интересные и актуальные новости здесь
                </p>
            </div>
        </section>
    );
}
