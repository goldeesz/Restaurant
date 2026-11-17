
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { Calendar, Users, Clock, MapPin, Check } from "lucide-react";

interface BookingSuccessProps {
    confirmedBooking: any;
    restaurant: any;
    date: string;
    slot: string;
    guests: string;
}

export default function BookingSuccess({
    confirmedBooking,
    restaurant,
    date,
    slot,
    guests,
}: BookingSuccessProps) {
    if (!confirmedBooking || !restaurant) return null;

    const formattedDate = date
        ? new Date(`${date}T12:00:00`).toLocaleDateString("ru-RU", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
          })
        : "Дата не указана";

    return (
        <div className="mx-auto w-full max-w-xl space-y-7 rounded-xl border border-[#D8CBBB] bg-[#FFFCF8] p-7 text-center shadow-[0_20px_50px_rgba(41,33,38,0.09)] sm:p-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#C6A15B]/40 bg-[#EAD8B5]/40 text-[#702638]">
                <Check size={36} strokeWidth={2} />
            </div>

            <div className="space-y-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C6A15B]">
                    Culinary Paradise
                </span>
                <h2 className="font-display text-3xl font-semibold text-[#702638] sm:text-4xl">
                    Бронирование подтверждено!
                </h2>
                <p className="mx-auto max-w-sm text-sm leading-relaxed text-[#756A66]">
                    Отличный выбор! Мы подготовили для вас столик в ресторане{" "}
                    <span className="font-semibold text-[#702638]">
                        {restaurant.name}
                    </span>
                    . Будем рады видеть вас!
                </p>
            </div>

            <div className="space-y-5 rounded-lg border border-[#D8CBBB] bg-[#F5F0E8] p-5 text-left sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#D8CBBB] pb-4">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#756A66]">
                        Номер бронирования
                    </span>
                    <span className="text-sm font-semibold text-[#702638]">
                        {confirmedBooking.bookingId}
                    </span>
                </div>

                <div className="space-y-4 text-sm text-[#292126]">
                    <div className="flex items-center gap-3">
                        <Calendar size={17} className="shrink-0 text-[#C6A15B]" />
                        <span className="capitalize">{formattedDate}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Clock size={17} className="shrink-0 text-[#C6A15B]" />
                        <span>{slot}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Users size={17} className="shrink-0 text-[#C6A15B]" />
                        <span>
                            {guests}{" "}
                            {Number(guests) === 1
                                ? "гость"
                                : Number(guests) >= 2 && Number(guests) <= 4
                                  ? "гостя"
                                  : "гостей"}
                        </span>
                    </div>

                    <div className="flex items-start gap-3">
                        <MapPin size={17} className="mt-0.5 shrink-0 text-[#C6A15B]" />
                        <span>{restaurant.address || restaurant.location}</span>
                    </div>
                </div>
            </div>

            <div className="space-y-3 pt-1">
                <Link
                    to="/dashboard"
                    className="block w-full rounded-md bg-[#702638] px-5 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#491B2A]"
                >
                    Мои бронирования
                </Link>

                <Link
                    to="/"
                    className="block w-full rounded-md border border-[#D8CBBB] px-5 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#702638] transition-colors hover:border-[#702638] hover:bg-[#F5F0E8]"
                >
                    Вернуться на главную
                </Link>
            </div>

            <p className="text-[11px] leading-relaxed text-[#A49A91]">
                Спасибо, что выбрали Culinary Paradise. Желаем вам приятного
                вечера и незабываемых гастрономических впечатлений!
            </p>
        </div>
    );
}
