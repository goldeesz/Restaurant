import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { assets } from "../../assets/assets";

export default function Hero() {
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [guests, setGuests] = useState("2");

    const handleSearchSubmit = (e: FormEvent) => {
        e.preventDefault();

        const params = new URLSearchParams();

        if (searchQuery) params.append("search", searchQuery);
        if (location) params.append("location", location);
        if (date) params.append("date", date);
        if (guests) params.append("guests", guests);

        navigate(`/search?${params.toString()}`);
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

            {/* Фоновое изображение */}
            <div className="absolute inset-0 z-0">
                <img
                    alt="Изысканный интерьер ресторана"
                    className="w-full h-full object-cover brightness-75"
                    src={assets.hero_bg_img}
                />

                <div className="absolute inset-0 bg-[#21151B]/55"></div>
            </div>

            {/* Основное содержимое */}
            <div className="relative z-10 w-full max-w-7xl px-6 md:px-10 text-center">

                <span className="text-xs md:text-sm text-[#E8D5AD] tracking-[0.3em] uppercase block mb-5">
                    Искусство вкуса. Искусство впечатлений.
                </span>

                <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-[#F5F0E8] mb-6 max-w-4xl mx-auto leading-[1.15] font-medium tracking-tight">
                    Добро пожаловать в
                    <span className="block text-[#D8B66F] mt-3">
                        Culinary Paradise
                    </span>
                </h1>

                <p className="text-sm md:text-base text-[#F5F0E8]/85 max-w-2xl mx-auto mb-12 leading-relaxed">
                    Откройте для себя мир изысканной кухни,
                    атмосферных ресторанов и незабываемых впечатлений.
                </p>

                {/* Форма поиска */}
                <form
                    onSubmit={handleSearchSubmit}
                    className="bg-[#FFFCF8] p-3 md:p-2.5 ambient-shadow max-w-5xl mx-auto flex flex-col md:flex-row gap-2 border border-[#C6A15B]/50"
                >

                    {/* Название ресторана или кухня */}
                    <div className="flex-1 flex items-center border-b md:border-b-0 md:border-r border-[#D8CBBB] px-4 py-3">
                        <Search className="text-[#702638] mr-3 shrink-0" size={18} />

                        <input
                            className="w-full bg-transparent border-none focus:outline-none text-sm text-[#292126] placeholder:text-[#8A7E73]"
                            placeholder="Ресторан или кухня..."
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Местоположение */}
                    <div className="flex-1 flex items-center border-b md:border-b-0 md:border-r border-[#D8CBBB] px-4 py-3">
                        <MapPin className="text-[#702638] mr-3 shrink-0" size={18} />

                        <input
                            className="w-full bg-transparent border-none focus:outline-none text-sm text-[#292126] placeholder:text-[#8A7E73]"
                            placeholder="Город или район..."
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>

                    {/* Дата */}
                    <div className="flex-1 flex items-center border-b md:border-b-0 md:border-r border-[#D8CBBB] px-4 py-3">
                        <Calendar className="text-[#702638] mr-3 shrink-0" size={18} />

                        <input
                            className="w-full bg-transparent border-none focus:outline-none text-sm text-[#292126] cursor-pointer"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                    {/* Количество гостей */}
                    <div className="flex-1 flex items-center px-4 py-3">
                        <Users className="text-[#702638] mr-3 shrink-0" size={18} />

                        <select
                            className="w-full bg-transparent border-none focus:outline-none text-sm text-[#292126] cursor-pointer"
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                        >
                            <option value="1">1 гость</option>
                            <option value="2">2 гостя</option>
                            <option value="4">4 гостя</option>
                            <option value="6">6 гостей</option>
                            <option value="8">8 гостей</option>
                        </select>
                    </div>

                    {/* Кнопка поиска */}
                    <button
                        type="submit"
                        className="bg-[#702638] text-white text-xs tracking-widest uppercase px-8 py-4 md:py-3 hover:bg-[#491B2A] transition-soft cursor-pointer border border-[#C6A15B]/60"
                    >
                        Найти ресторан
                    </button>

                </form>
            </div>
        </section>
    );
}
