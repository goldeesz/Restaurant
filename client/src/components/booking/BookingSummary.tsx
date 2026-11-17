
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Calendar, Users, Clock, MapPin } from "lucide-react";

interface BookingSummaryProps {
    restaurant: any;
    date: string;
    slot: string;
    guests: string;
}

export default function BookingSummary({
    restaurant,
    date,
    slot,
    guests,
}: BookingSummaryProps) {
    if (!restaurant) return null;

    const formattedDate = date
        ? new Date(`${date}T12:00:00`).toLocaleDateString("ru-RU", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
          })
        : "Дата не выбрана";

    return (
        <div className="space-y-6 rounded-xl border border-[#D8CBBB] bg-[#FFFCF8] p-6 shadow-[0_12px_35px_rgba(41,33,38,0.06)]">
            <div className="border-b border-[#D8CBBB] pb-4">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C6A15B]">
                    Ваш выбор
                </span>
                <h3 className="mt-2 font-display text-2xl font-semibold text-[#702638]">
                    Детали бронирования
                </h3>
            </div>

            <div className="flex gap-4">
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-[#E9DFD2]">
                    <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="h-full w-full object-cover"
                    />
                </div>

                <div className="min-w-0 space-y-2">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#C6A15B]">
                        {restaurant.cuisine}
                    </span>
                    <h4 className="font-display text-lg font-semibold leading-tight text-[#702638]">
                        {restaurant.name}
                    </h4>
                    <p className="flex items-start gap-1.5 text-xs leading-relaxed text-[#756A66]">
                        <MapPin size={14} className="mt-0.5 shrink-0" />
                        {restaurant.location}
                    </p>
                </div>
            </div>

            <div className="space-y-4 border-y border-[#D8CBBB] py-5 text-sm">
                <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-[#756A66]">
                        <Calendar size={16} className="text-[#C6A15B]" />
                        Дата
                    </span>
                    <span className="text-right font-medium capitalize text-[#292126]">
                        {formattedDate}
                    </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-[#756A66]">
                        <Clock size={16} className="text-[#C6A15B]" />
                        Время
                    </span>
                    <span className="font-medium text-[#292126]">{slot}</span>
                </div>

                <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-[#756A66]">
                        <Users size={16} className="text-[#C6A15B]" />
                        Количество гостей
                    </span>
                    <span className="font-medium text-[#292126]">
                        {guests}
                    </span>
                </div>
            </div>

            <div className="rounded-lg bg-[#F5F0E8] p-4">
                <h5 className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#702638]">
                    Условия бронирования
                </h5>
                <p className="text-xs leading-relaxed text-[#756A66]">
                    Столик сохраняется за вами в течение 15 минут после
                    назначенного времени. Изменить или отменить бронирование
                    бесплатно можно не позднее чем за 24 часа до визита.
                </p>
            </div>
        </div>
    );
}
