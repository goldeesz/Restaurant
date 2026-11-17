
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import RestaurantCard from "../components/RestaurantCard.tsx";
import AuthModal from "../components/AuthModal.tsx";

import {
    SlidersHorizontal,
    Search as SearchIcon,
    X,
    Check,
    MapPin,
    SearchXIcon,
} from "lucide-react";

import api from "../lib/api.ts";
import toast from "react-hot-toast";

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [restaurants, setRestaurants] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // Получаем параметры поиска из адресной строки
    const searchVal = searchParams.get("search") || "";
    const locationVal = searchParams.get("location") || "";
    const cuisinesSelected = searchParams.getAll("cuisine");
    const pricesSelected = searchParams.getAll("priceRange");
    const sortVal = searchParams.get("sort") || "";

    // Временные значения полей поиска
    const [tempSearch, setTempSearch] = useState(searchVal);
    const [tempLocation, setTempLocation] = useState(locationVal);

    // Названия кухонь для отображения на русском языке.
    // В URL при этом продолжаем использовать английские значения.
    const cuisineLabels: Record<string, string> = {
        Italian: "Итальянская",
        French: "Французская",
        Japanese: "Японская",
        Steakhouse: "Стейк-хаус",
        Vegetarian: "Вегетарианская",
    };

    // Синхронизация полей с адресной строкой
    useEffect(() => {
        setTempSearch(searchVal);
        setTempLocation(locationVal);
    }, [searchVal, locationVal]);

    // Загрузка ресторанов
    useEffect(() => {
        const fetchRestaurants = async () => {
           try {
            setLoading(true)
            const res = await api.get(`/restaurants${searchParams.toString}`)
            setRestaurants(res.data)
           } catch (error: any) {
            toast.error(error?.response?.data?.message || error?.message)
           }finally{
            setLoading(false)
           }
        };

        fetchRestaurants();
    }, [searchParams]);

    // Применение текстового поиска
    const handleTextSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const nextParams = new URLSearchParams(searchParams);

        if (tempSearch) {
            nextParams.set("search", tempSearch);
        } else {
            nextParams.delete("search");
        }

        if (tempLocation) {
            nextParams.set("location", tempLocation);
        } else {
            nextParams.delete("location");
        }

        setSearchParams(nextParams);
    };

    // Выбор кухни
    const handleCuisineToggle = (cuisine: string) => {
        const nextParams = new URLSearchParams(searchParams);
        const current = nextParams.getAll("cuisine");

        if (current.includes(cuisine)) {
            const updated = current.filter((c) => c !== cuisine);

            nextParams.delete("cuisine");
            updated.forEach((item) => nextParams.append("cuisine", item));
        } else {
            nextParams.append("cuisine", cuisine);
        }

        setSearchParams(nextParams);
    };

    // Выбор ценовой категории
    const handlePriceToggle = (price: string) => {
        const nextParams = new URLSearchParams(searchParams);
        const current = nextParams.getAll("priceRange");

        if (current.includes(price)) {
            const updated = current.filter((item) => item !== price);

            nextParams.delete("priceRange");
            updated.forEach((item) => nextParams.append("priceRange", item));
        } else {
            nextParams.append("priceRange", price);
        }

        setSearchParams(nextParams);
    };

    // Сортировка
    const handleSortChange = (sort: string) => {
        const nextParams = new URLSearchParams(searchParams);

        if (sort) {
            nextParams.set("sort", sort);
        } else {
            nextParams.delete("sort");
        }

        setSearchParams(nextParams);
    };

    // Сброс всех параметров
    const clearAllFilters = () => {
        setSearchParams(new URLSearchParams());
        setTempSearch("");
        setTempLocation("");
    };

    const priceOptions = ["$", "$$", "$$$", "$$$$"];

    const cuisineOptions = [
        "Italian",
        "French",
        "Japanese",
        "Steakhouse",
        "Vegetarian",
    ];

    // Общий блок выбора кухни
    const renderCuisineFilters = () => (
        <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[#702638] tracking-[0.15em] uppercase">
                Кухня
            </h4>

            <div className="space-y-2">
                {cuisineOptions.map((cuisine) => {
                    const active = cuisinesSelected.includes(cuisine);

                    return (
                        <button
                            key={cuisine}
                            onClick={() => handleCuisineToggle(cuisine)}
                            className="w-full flex items-center justify-between text-left text-sm text-[#756A66] hover:text-[#702638] transition-colors cursor-pointer py-1.5"
                        >
                            <span>
                                {cuisineLabels[cuisine] || cuisine}
                            </span>

                            <div
                                className={`w-4 h-4 border rounded-sm flex items-center justify-center transition-colors ${
                                    active
                                        ? "bg-[#702638] border-[#702638] text-white"
                                        : "border-[#D8CBBB]"
                                }`}
                            >
                                {active && <Check size={11} />}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );

    // Общий блок выбора ценовой категории
    const renderPriceFilters = () => (
        <div className="space-y-3">
            <h4 className="text-xs font-semibold text-[#702638] tracking-[0.15em] uppercase">
                Стоимость
            </h4>

            <div className="grid grid-cols-4 gap-1.5">
                {priceOptions.map((price) => {
                    const active = pricesSelected.includes(price);

                    return (
                        <button
                            key={price}
                            onClick={() => handlePriceToggle(price)}
                            className={`py-2.5 text-center text-xs transition-colors cursor-pointer border rounded-sm ${
                                active
                                    ? "bg-[#702638] border-[#702638] text-white"
                                    : "border-[#D8CBBB] text-[#702638] hover:border-[#C6A15B] hover:bg-[#E9DFD2]"
                            }`}
                        >
                            {price}
                        </button>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F5F0E8] flex flex-col pt-20">
            <Navbar />
            <AuthModal />

            {/* Панель поиска */}
            <div className="bg-[#FFFCF8] border-b border-[#D8CBBB] py-5 z-10 sticky top-16 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row gap-4 items-center justify-between">

                    <form
                        onSubmit={handleTextSubmit}
                        className="flex flex-wrap items-center gap-3 w-full md:w-auto"
                    >
                        {/* Поиск ресторана или кухни */}
                        <div className="relative grow sm:grow-0 min-w-[200px]">
                            <SearchIcon
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#702638]"
                            />

                            <input
                                type="text"
                                placeholder="Ресторан или кухня..."
                                value={tempSearch}
                                onChange={(e) => setTempSearch(e.target.value)}
                                className="w-full pl-10 pr-3 py-3 text-sm border border-[#D8CBBB] rounded-md focus:border-[#702638] focus:outline-none bg-[#F5F0E8] text-[#292126] placeholder:text-[#9A8E88] transition-colors"
                            />
                        </div>

                        {/* Местоположение */}
                        <div className="relative grow sm:grow-0 min-w-[200px]">
                            <MapPin
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#702638]"
                            />

                            <input
                                type="text"
                                placeholder="Город или район..."
                                value={tempLocation}
                                onChange={(e) => setTempLocation(e.target.value)}
                                className="w-full pl-10 pr-3 py-3 text-sm border border-[#D8CBBB] rounded-md focus:border-[#702638] focus:outline-none bg-[#F5F0E8] text-[#292126] placeholder:text-[#9A8E88] transition-colors"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-[#702638] hover:bg-[#491B2A] text-white text-xs font-medium tracking-[0.12em] uppercase px-6 py-3 rounded-md cursor-pointer transition-colors"
                        >
                            Найти
                        </button>
                    </form>

                    {/* Кнопка мобильных фильтров */}
                    <div className="flex gap-3 w-full md:w-auto justify-end">
                        <button
                            onClick={() => setShowMobileFilters(true)}
                            className="md:hidden flex items-center gap-2 border border-[#D8CBBB] hover:border-[#702638] text-sm text-[#702638] font-medium px-4 py-3 bg-[#FFFCF8] rounded-md cursor-pointer transition-colors"
                        >
                            <SlidersHorizontal size={15} />
                            <span>Фильтры</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Основная часть страницы */}
            <main className="grow max-w-7xl w-full mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row gap-10">

                {/* Боковая панель фильтров */}
                <aside className="hidden md:block w-64 shrink-0">
                    <div className="sticky top-44 space-y-8 bg-[#FFFCF8] border border-[#D8CBBB] rounded-lg p-6">

                        <div className="flex justify-between items-center pb-4 border-b border-[#D8CBBB]">
                            <h3 className="font-display text-xl font-semibold text-[#702638]">
                                Фильтры
                            </h3>

                            <button
                                onClick={clearAllFilters}
                                className="text-[10px] font-semibold text-[#C6A15B] hover:text-[#702638] tracking-wider uppercase cursor-pointer transition-colors"
                            >
                                Сбросить
                            </button>
                        </div>

                        {/* Кухня */}
                        {renderCuisineFilters()}

                        {/* Стоимость */}
                        <div className="pt-6 border-t border-[#D8CBBB]">
                            {renderPriceFilters()}
                        </div>
                    </div>
                </aside>

                {/* Результаты поиска */}
                <div className="flex-1 flex flex-col min-w-0">

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8 pb-5 border-b border-[#D8CBBB]">

                        <div>
                            <span className="text-[10px] text-[#C6A15B] tracking-[0.2em] uppercase block mb-2">
                                Culinary Paradise
                            </span>

                            <h2 className="font-display text-2xl font-semibold text-[#702638]">
                                Рестораны
                            </h2>

                            <p className="text-sm text-[#756A66] mt-1">
                                Найдите место для особенного вечера
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-xs text-[#756A66] whitespace-nowrap">
                                Сортировка:
                            </span>

                            <select
                                value={sortVal}
                                onChange={(e) => handleSortChange(e.target.value)}
                                className="text-xs bg-[#FFFCF8] border border-[#D8CBBB] text-[#702638] px-3 py-2 focus:outline-none focus:border-[#702638] cursor-pointer rounded-sm"
                            >
                                <option value="">По умолчанию</option>
                                <option value="price_low">
                                    Сначала дешевле
                                </option>
                                <option value="price_high">
                                    Сначала дороже
                                </option>
                            </select>
                        </div>
                    </div>

                    {/* Загрузка */}
                    {loading ? (
                        <div className="grow flex justify-center items-center py-24">
                            <div className="w-10 h-10 border-2 border-[#D8CBBB] border-t-[#702638] rounded-full animate-spin" />
                        </div>
                    ) : restaurants.length === 0 ? (

                        /* Если ничего не найдено */
                        <div className="grow flex flex-col items-center justify-center py-24 text-center bg-[#FFFCF8] border border-[#D8CBBB] rounded-lg">
                            <SearchXIcon
                                size={42}
                                strokeWidth={1.2}
                                className="text-[#C6A15B] mb-5"
                            />

                            <h3 className="font-display text-2xl font-semibold text-[#702638] mb-3">
                                Ничего не найдено
                            </h3>

                            <p className="text-sm text-[#756A66] max-w-sm mb-7 leading-relaxed">
                                К сожалению, мы не нашли рестораны,
                                соответствующие вашему запросу.
                                Попробуйте изменить параметры поиска.
                            </p>

                            <button
                                onClick={clearAllFilters}
                                className="bg-[#702638] hover:bg-[#491B2A] text-white text-xs tracking-widest uppercase px-7 py-3 rounded-md transition-colors cursor-pointer"
                            >
                                Сбросить фильтры
                            </button>
                        </div>

                    ) : (

                        /* Список ресторанов */
                        <div className="flex flex-col lg:flex-row gap-6 grow">
                            <div className="grid gap-6 grow grid-cols-1 lg:grid-cols-2">
                                {restaurants.map((restaurant) => (
                                    <RestaurantCard
                                        key={restaurant._id}
                                        restaurant={restaurant}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Мобильное меню фильтров */}
            {showMobileFilters && (
                <div className="fixed inset-0 z-50 flex justify-end bg-[#292126]/50 backdrop-blur-sm md:hidden animate-in fade-in duration-200">

                    <div className="w-80 max-w-[90vw] bg-[#FFFCF8] h-full p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">

                        <div>
                            <div className="flex justify-between items-center pb-5 border-b border-[#D8CBBB]">
                                <h3 className="font-display text-xl font-semibold text-[#702638]">
                                    Фильтры
                                </h3>

                                <button
                                    onClick={() => setShowMobileFilters(false)}
                                    className="p-2 text-[#756A66] hover:text-[#702638] transition-colors cursor-pointer"
                                    aria-label="Закрыть фильтры"
                                >
                                    <X size={21} />
                                </button>
                            </div>

                            {/* Кухни */}
                            <div className="py-6">
                                {renderCuisineFilters()}
                            </div>

                            {/* Цены */}
                            <div className="py-5 border-t border-[#D8CBBB]">
                                {renderPriceFilters()}
                            </div>
                        </div>

                        {/* Кнопки мобильного меню */}
                        <div className="border-t border-[#D8CBBB] pt-5 flex gap-3">
                            <button
                                onClick={clearAllFilters}
                                className="flex-1 border border-[#D8CBBB] text-[#702638] py-3 text-xs font-medium tracking-wider uppercase hover:bg-[#F5F0E8] cursor-pointer transition-colors rounded-md"
                            >
                                Сбросить
                            </button>

                            <button
                                onClick={() => setShowMobileFilters(false)}
                                className="flex-1 bg-[#702638] text-white py-3 text-xs font-medium tracking-wider uppercase hover:bg-[#491B2A] cursor-pointer transition-colors rounded-md"
                            >
                                Применить
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
