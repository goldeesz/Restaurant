
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MapPin, Clock, Utensils, ChefHat } from "lucide-react";

interface RestaurantInfoProps {
    restaurant: any;
}

const cuisineLabels: Record<string, string> = {
    Italian: "Итальянская",
    French: "Французская",
    Japanese: "Японская",
    Steakhouse: "Стейк-хаус",
    Vegetarian: "Вегетарианская",
};

export default function RestaurantInfo({ restaurant }: RestaurantInfoProps) {
    if (!restaurant) return null;

    return (
        <div className="space-y-10 text-left">

            {/* Краткая информация */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-[#D8CBBB]">
                <div className="text-center border-r border-[#D8CBBB] px-2">
                    <ChefHat className="text-[#C6A15B] mx-auto mb-2" size={22} />

                    <span className="block text-[9px] tracking-wider text-[#756A66] uppercase">
                        Шеф-повар
                    </span>

                    <span className="text-xs text-[#702638] mt-1 block">
                        {restaurant.chef}
                    </span>
                </div>

                <div className="text-center border-r border-[#D8CBBB] px-2">
                    <Utensils className="text-[#C6A15B] mx-auto mb-2" size={22} />

                    <span className="block text-[9px] tracking-wider text-[#756A66] uppercase">
                        Кухня
                    </span>

                    <span className="text-xs text-[#702638] mt-1 block">
                        {cuisineLabels[restaurant.cuisine] || restaurant.cuisine}
                    </span>
                </div>

                <div className="text-center px-2">
                    <Clock className="text-[#C6A15B] mx-auto mb-2" size={22} />

                    <span className="block text-[9px] tracking-wider text-[#756A66] uppercase">
                        Время работы
                    </span>

                    <span className="text-xs text-[#702638] mt-1 block">
                        17:00 – 23:00
                    </span>
                </div>
            </div>

            {/* Описание ресторана */}
            <section className="space-y-4">
                <h3 className="font-display text-xl font-semibold text-[#702638]">
                    О ресторане
                </h3>

                <p className="text-sm text-[#756A66] leading-relaxed">
                    {restaurant.description}
                </p>

                <div className="flex items-start gap-2 text-sm text-[#756A66] pt-2">
                    <MapPin
                        size={17}
                        className="text-[#C6A15B] shrink-0 mt-0.5"
                    />

                    <span>{restaurant.address}</span>
                </div>
            </section>
        </div>
    );
}
