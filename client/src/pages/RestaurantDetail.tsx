
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext.tsx";

import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import AuthModal from "../components/AuthModal.tsx";
import Loader from "../components/Loader.tsx";

import RestaurantHero from "../components/restaurant/RestaurantHero.tsx";
import RestaurantInfo from "../components/restaurant/RestaurantInfo.tsx";
import RestaurantReviews from "../components/restaurant/RestaurantReviews.tsx";
import BookingWidget from "../components/restaurant/BookingWidget.tsx";

import { dummyAvailability, dummyRestaurant } from "../assets/assets.ts";
import toast from "react-hot-toast";

export default function RestaurantDetail() {
    const { slug } = useParams<{ slug: string }>();

    const { isAuthenticated, setAuthModalOpen } = useAppContext();

    const navigate = useNavigate();

    const [restaurant, setRestaurant] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const [selectedDate, setSelectedDate] = useState("");
    const [selectedGuests, setSelectedGuests] = useState("2");
    const [selectedSlot, setSelectedSlot] = useState("");

    const [slotsAvailability, setSlotsAvailability] = useState<any[]>([]);
    const [loadingSlots, setLoadingSlots] = useState(false);

    useEffect(() => {
        const fetchRestaurant = async () => {
            setLoading(true);

            setRestaurant(dummyRestaurant.find((r) => r.slug === slug));

            setLoading(false);
        };

        if (slug) {
            fetchRestaurant();
        }
    }, [slug]);

    useEffect(() => {
        const fetchAvailability = async () => {
            setLoadingSlots(true);

            setSlotsAvailability(dummyAvailability);

            setLoadingSlots(false);
        };

        fetchAvailability();
    }, [restaurant?._id, selectedDate]);

    if (loading) {
        return <Loader text="Загружаем информацию о ресторане..." />;
    }

    if (!restaurant) {
        return (
            <div className="min-h-screen bg-[#F5F0E8] flex flex-col">
                <Navbar />

                <main className="grow flex flex-col items-center justify-center px-6 text-center">
                    <h1 className="font-display text-3xl text-[#702638] mb-3">
                        Ресторан не найден
                    </h1>

                    <p className="text-sm text-[#756A66] mb-6">
                        Возможно, ресторан был удалён или ссылка неверна.
                    </p>

                    <button
                        onClick={() => navigate("/search")}
                        className="bg-[#702638] hover:bg-[#491B2A] text-white px-6 py-3 text-xs uppercase tracking-widest rounded-md transition-colors"
                    >
                        К списку ресторанов
                    </button>
                </main>

                <Footer />
            </div>
        );
    }

    const handleReserveClick = () => {
        if (!selectedDate) {
            toast.error("Пожалуйста, выберите дату посещения.");
            return;
        }

        if (!selectedSlot) {
            toast.error("Пожалуйста, выберите время посещения.");
            return;
        }

        if (!isAuthenticated) {
            setAuthModalOpen(true);
            return;
        }

        navigate(
            `/booking/${restaurant.slug}?slot=${selectedSlot}&date=${selectedDate}&guests=${selectedGuests}`
        );
    };

    return (
        <div className="min-h-screen bg-[#F5F0E8] flex flex-col pt-20">
            <Navbar />
            <AuthModal />

            <RestaurantHero restaurant={restaurant} />

            <main className="grow max-w-7xl w-full mx-auto px-6 md:px-10 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                    {/* Информация и отзывы */}
                    <div className="lg:col-span-8 space-y-12">
                        <RestaurantInfo restaurant={restaurant} />
                        <RestaurantReviews />
                    </div>

                    {/* Форма бронирования */}
                    <div className="lg:col-span-4 lg:sticky lg:top-36">
                        <BookingWidget
                            restaurant={restaurant}
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                            selectedGuests={selectedGuests}
                            setSelectedGuests={setSelectedGuests}
                            selectedSlot={selectedSlot}
                            setSelectedSlot={setSelectedSlot}
                            slotsAvailability={slotsAvailability}
                            loadingSlots={loadingSlots}
                            isAuthenticated={isAuthenticated}
                            handleReserveClick={handleReserveClick}
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
