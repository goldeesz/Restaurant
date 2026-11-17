
import { Link, useNavigate } from "react-router-dom";
import { Star, MapPinIcon } from "lucide-react";
import { dummyRating } from "../assets/assets.ts";

interface RestaurantCardProps {
    restaurant: {
        _id: string;
        name: string;
        slug: string;
        cuisine: string;
        priceRange: string;
        rating: number;
        reviewCount: number;
        location: string;
        image: string;
        availableSlots: string[];
        featured?: boolean;
        exclusive?: boolean;
    };
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
    const navigate = useNavigate();

    const handleSlotClick = (e: React.MouseEvent, slot: string) => {
        e.preventDefault();
        e.stopPropagation();

        const today = new Date().toISOString().split("T")[0];

        navigate(`/booking/${restaurant.slug}?slot=${slot}&date=${today}`);
    };

    return (
        <div className="group relative bg-[#FFFCF8] border border-[#D8CBBB]/70 card-hover-effect overflow-hidden rounded-md flex flex-col h-full shadow-sm">

            {/* Фотография и отметки */}
            <Link
                to={`/restaurant/${restaurant.slug}`}
                className="relative h-60 overflow-hidden block"
            >
                <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent"></div>

                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                    {restaurant.exclusive && (
                        <span className="text-[9px] font-medium tracking-widest text-[#292126] bg-[#D8B66F] py-1 px-2.5 uppercase">
                            ОСОБЫЙ ВЫБОР
                        </span>
                    )}

                    {restaurant.featured && (
                        <span className="text-[9px] font-medium tracking-widest text-white bg-[#702638] py-1 px-2.5 uppercase">
                            РЕКОМЕНДУЕМ
                        </span>
                    )}
                </div>
            </Link>

            {/* Основная информация */}
            <div className="p-5 flex-1 flex flex-col justify-between">
                <div>

                    <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] font-medium text-[#A78343] tracking-widest uppercase">
                            {restaurant.cuisine}
                        </span>

                        <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-medium text-[#756A66]">
                                {restaurant.priceRange}
                            </span>

                            <span className="text-[#D8CBBB] text-xs">•</span>

                            <div className="flex items-center gap-1 text-[#C6A15B]">
                                <Star size={12} fill="currentColor" />
                                <span className="text-xs font-medium text-[#702638]">
                                    {dummyRating.toFixed(1)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Название ресторана */}
                    <Link
                        to={`/restaurant/${restaurant.slug}`}
                        className="block mb-2"
                    >
                        <h3 className="font-display text-lg font-semibold text-[#702638] group-hover:text-[#A78343] transition-colors line-clamp-1">
                            {restaurant.name}
                        </h3>
                    </Link>

                    {/* Местоположение */}
                    <p className="text-xs text-[#756A66] mb-4 flex items-center gap-1">
                        <MapPinIcon size={14} className="text-[#A78343]" />
                        {restaurant.location}
                    </p>
                </div>

                {/* Быстрое бронирование */}
                <div>
                    <div className="border-t border-[#D8CBBB]/70 my-3"></div>

                    <span className="block text-[9px] font-medium text-[#756A66] tracking-wider uppercase mb-3">
                        БЫСТРОЕ БРОНИРОВАНИЕ
                    </span>

                    <div className="flex flex-wrap gap-1.5">
                        {restaurant.availableSlots
                            .filter((slot) => {
                                const [slotHour, slotMinute] = slot.split(":").map(Number);
                                const now = new Date();
                                const currentHour = now.getHours();
                                const currentMinute = now.getMinutes();

                                return (
                                    slotHour > currentHour ||
                                    (slotHour === currentHour && slotMinute > currentMinute)
                                );
                            })
                            .slice(0, 3)
                            .map((slot) => (
                                <button
                                    key={slot}
                                    onClick={(e) => handleSlotClick(e, slot)}
                                    className="text-[10px] font-medium border border-[#D8CBBB] hover:border-[#702638] px-3 py-1.5 transition-colors cursor-pointer text-[#702638] hover:bg-[#702638] hover:text-white bg-[#F5F0E8]"
                                >
                                    {slot}
                                </button>
                            ))}

                        <Link
                            to={`/restaurant/${restaurant.slug}`}
                            className="text-[10px] font-medium border border-[#C6A15B]/60 px-3 py-1.5 transition-colors cursor-pointer text-[#A78343] hover:bg-[#C6A15B] hover:text-[#292126]"
                        >
                            ВСЕ СЛОТЫ
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}
