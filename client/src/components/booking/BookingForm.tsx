
import React from "react";

interface BookingFormProps {
    name: string;
    setName: (val: string) => void;
    email: string;
    setEmail: (val: string) => void;
    phone: string;
    setPhone: (val: string) => void;
    occasion: string;
    setOccasion: (val: string) => void;
    specialRequests: string;
    setSpecialRequests: (val: string) => void;
    confirming: boolean;
    onSubmit: (e: React.FormEvent) => void;
}

export default function BookingForm({
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    occasion,
    setOccasion,
    specialRequests,
    setSpecialRequests,
    confirming,
    onSubmit,
}: BookingFormProps) {
    const inputClass =
        "w-full rounded-md border border-[#D8CBBB] bg-[#FFFCF8] px-4 py-3 text-sm text-[#292126] outline-none transition-colors placeholder:text-[#A49A91] focus:border-[#702638] focus:ring-2 focus:ring-[#702638]/10";

    const labelClass =
        "mb-2 block text-[11px] font-semibold tracking-[0.12em] text-[#756A66]";

    return (
        <div className="rounded-xl border border-[#D8CBBB] bg-[#FFFCF8] p-6 shadow-[0_12px_35px_rgba(41,33,38,0.06)] sm:p-8">
            <div className="mb-7 border-b border-[#D8CBBB] pb-5">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C6A15B]">
                    Почти готово
                </span>
                <h3 className="mt-2 font-display text-2xl font-semibold text-[#702638]">
                    Данные для бронирования
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#756A66]">
                    Заполните контактную информацию, чтобы мы могли подтвердить
                    ваше бронирование.
                </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                        <label className={labelClass}>ИМЯ И ФАМИЛИЯ</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Как к вам обращаться?"
                            className={inputClass}
                            required
                        />
                    </div>

                    <div>
                        <label className={labelClass}>ЭЛЕКТРОННАЯ ПОЧТА</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@mail.com"
                            className={inputClass}
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                        <label className={labelClass}>НОМЕР ТЕЛЕФОНА</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+7 (___) ___-__-__"
                            className={inputClass}
                            required
                        />
                    </div>

                    <div>
                        <label className={labelClass}>ПОВОД ДЛЯ ВСТРЕЧИ</label>
                        <select
                            value={occasion}
                            onChange={(e) => setOccasion(e.target.value)}
                            className={inputClass}
                        >
                            <option value="">Не выбран</option>
                            <option value="Birthday">День рождения</option>
                            <option value="Anniversary">Годовщина</option>
                            <option value="Date Night">Романтический вечер</option>
                            <option value="Business Dining">Деловая встреча</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className={labelClass}>
                        ПОЖЕЛАНИЯ К БРОНИРОВАНИЮ
                        <span className="ml-2 font-normal tracking-normal text-[#A49A91]">
                            (необязательно)
                        </span>
                    </label>
                    <textarea
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        rows={4}
                        placeholder="Например: аллергии, особенности питания или пожелания по расположению столика..."
                        className={`${inputClass} resize-y`}
                    />
                </div>

                <div className="flex items-start gap-3 rounded-lg bg-[#F5F0E8] p-4">
                    <input
                        type="checkbox"
                        id="newsletterOpt"
                        className="mt-1 h-4 w-4 cursor-pointer accent-[#702638]"
                        defaultChecked
                    />
                    <label
                        htmlFor="newsletterOpt"
                        className="cursor-pointer text-xs leading-relaxed text-[#756A66]"
                    >
                        Я хочу получать новости о сезонных меню, специальных
                        предложениях и гастрономических мероприятиях Culinary
                        Paradise.
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={confirming}
                    className="w-full rounded-md bg-[#702638] px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#491B2A] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {confirming ? "Подтверждаем бронирование..." : "Подтвердить бронирование"}
                </button>

                <p className="text-center text-[11px] leading-relaxed text-[#A49A91]">
                    Нажимая на кнопку, вы подтверждаете корректность указанных
                    контактных данных.
                </p>
            </form>
        </div>
    );
}
