
import { useNavigate, Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cuisines } from "../../assets/assets";

export default function CuisineBrowse() {
    const navigate = useNavigate();

    const handleCuisineClick = (cuisineName: string) => {
        navigate(`/search?cuisine=${cuisineName}`);
    };

    const cuisineLabels: Record<string, string> = {
        Italian: "ИТАЛЬЯНСКАЯ",
        Japanese: "ЯПОНСКАЯ",
        French: "ФРАНЦУЗСКАЯ",
        Rooftop: "С ВИДОМ",
        Steakhouse: "СТЕЙКХАУСЫ",
        Vegetarian: "ВЕГЕТАРИАНСКАЯ",
    };

    return (
        <section className="py-20 md:py-24 max-w-7xl mx-auto px-6 md:px-10">

            {/* Заголовок секции */}
            <div className="flex justify-between items-end mb-10 md:mb-12">
                <div>
                    <span className="text-[10px] text-secondary tracking-[0.25em] block mb-3 uppercase font-semibold">
                        НАША ПОДБОРКА
                    </span>

                    <h2 className="font-display text-3xl md:text-4xl font-semibold text-primary">
                        Выберите кухню
                    </h2>

                    <p className="text-sm text-[#756A66] mt-3 max-w-md">
                        Откройте для себя рестораны с разными вкусами и атмосферой.
                    </p>
                </div>

                <Link
                    to="/search"
                    className="hidden sm:flex text-xs text-primary hover:text-secondary transition-colors items-center gap-2 group pb-1"
                >
                    ВСЕ РЕСТОРАНЫ
                    <ArrowRight
                        size={15}
                        className="group-hover:translate-x-1 transition-transform"
                    />
                </Link>
            </div>

            {/* Карточки категорий */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
                {cuisines.map((c) => {
                    const Icon = c.icon;
                    const label = cuisineLabels[c.name] || c.label;

                    return (
                        <button
                            key={c.name}
                            type="button"
                            onClick={() => handleCuisineClick(c.name)}
                            aria-label={`Найти рестораны: ${label}`}
                            className="
                                group relative cursor-pointer
                                min-h-[150px] md:min-h-[170px]
                                rounded-sm
                                bg-[#FFFCF8]
                                border border-[#D8CBBB]
                                hover:border-[#C6A15B]
                                hover:-translate-y-1
                                hover:shadow-[0_10px_30px_rgba(73,27,42,0.08)]
                                transition-all duration-300
                                flex flex-col items-center justify-center
                                px-3 py-7
                            "
                        >
                            <div className="
                                w-14 h-14 rounded-full
                                flex items-center justify-center
                                bg-[#F5F0E8]
                                group-hover:bg-[#702638]
                                transition-colors duration-300
                                mb-5
                            ">
                                <Icon
                                    size={27}
                                    strokeWidth={1.3}
                                    className="
                                        text-[#702638]
                                        group-hover:text-[#FFFCF8]
                                        transition-colors duration-300
                                    "
                                />
                            </div>

                            <span className="
                                text-[9px] md:text-[10px]
                                tracking-[0.12em]
                                font-semibold
                                text-[#491B2A]
                                text-center
                                group-hover:text-[#A47D3C]
                                transition-colors duration-300
                            ">
                                {label}
                            </span>

                            <span className="
                                absolute bottom-0 left-1/2 -translate-x-1/2
                                w-0 h-[2px]
                                bg-[#C6A15B]
                                group-hover:w-1/2
                                transition-all duration-300
                            " />
                        </button>
                    );
                })}
            </div>

            {/* Ссылка для мобильных устройств */}
            <div className="flex sm:hidden justify-center mt-8">
                <Link
                    to="/search"
                    className="text-xs text-primary hover:text-secondary transition-colors flex items-center gap-2"
                >
                    ВСЕ РЕСТОРАНЫ
                    <ArrowRight size={15} />
                </Link>
            </div>

        </section>
    );
}
