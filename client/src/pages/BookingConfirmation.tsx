import { useState, useEffect } from "react";
import type { FormEvent } from "react";

import {
    useParams,
    useSearchParams,
    useNavigate,
    Link,
} from "react-router-dom";

import { useAppContext } from "../context/AppContext.tsx";

import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import { ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

import Loader from "../components/Loader.tsx";
import BookingSuccess from "../components/booking/BookingSuccess.tsx";
import BookingSummary from "../components/booking/BookingSummary.tsx";
import BookingForm from "../components/booking/BookingForm.tsx";

import api from "../lib/api.ts";

export default function BookingConfirmation() {
    const { slug } = useParams<{ slug: string }>();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const { user } = useAppContext();

    const [restaurant, setRestaurant] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [confirming, setConfirming] = useState(false);
    const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

    // Данные формы
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [phone, setPhone] = useState(user?.phone || "");
    const [occasion, setOccasion] = useState("");
    const [specialRequests, setSpecialRequests] = useState("");

    // Данные бронирования из URL
    const slot = searchParams.get("slot") || "";
    const date = searchParams.get("date") || "";
    const guests = searchParams.get("guests") || "2";

    // Заполняем контактные данные пользователя
    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setEmail(user.email || "");
            setPhone(user.phone || "");
        }
    }, [user]);

    // Загружаем информацию о ресторане
    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                setLoading(true);

                const res = await api.get(`/restaurants/${slug}`);

                setRestaurant(res.data);
            } catch (error: any) {
                toast.error(
                    error?.response?.data?.message ||
                    error?.message ||
                    "Не удалось загрузить информацию о ресторане."
                );

                navigate("/");
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchRestaurant();
        } else {
            setLoading(false);
        }
    }, [slug, navigate]);

    // Подтверждение бронирования
    const handleConfirmSubmit = async (
        e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (!slot || !date) {
            toast.error(
                "Не указаны дата или время бронирования. Вернитесь на страницу ресторана."
            );
            return;
        }

        if (!name.trim() || !email.trim() || !phone.trim()) {
            toast.error("Пожалуйста, заполните все обязательные поля.");
            return;
        }

        if (!restaurant?._id) {
            toast.error("Не удалось определить ресторан для бронирования.");
            return;
        }

        try {
            setConfirming(true);

            const res = await api.post("/bookings", {
                restaurantId: restaurant._id,
                date,
                time: slot,
                guests,
                occasion,
                specialRequests,
            });

            setConfirmedBooking(res.data);

            toast.success("Бронирование успешно подтверждено!");
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Не удалось подтвердить бронирование."
            );
        } finally {
            setConfirming(false);
        }
    };

    // Загрузка
    if (loading) {
        return <Loader text="Загружаем информацию о ресторане..." />;
    }

    // Ресторан не найден
    if (!restaurant) {
        return (
            <div className="flex min-h-screen flex-col bg-[#F5F0E8]">
                <Navbar />

                <main className="flex grow flex-col items-center justify-center px-6 py-20 text-center">
                    <h1 className="font-display text-3xl font-semibold text-[#702638]">
                        Ресторан не найден
                    </h1>

                    <p className="mt-3 max-w-md text-sm leading-relaxed text-[#756A66]">
                        К сожалению, мы не смогли найти ресторан,
                        для которого вы хотите оформить бронирование.
                    </p>

                    <Link
                        to="/"
                        className="mt-7 rounded-md bg-[#702638] px-7 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#491B2A]"
                    >
                        Вернуться на главную
                    </Link>
                </main>

                <Footer />
            </div>
        );
    }

    // Экран успешного бронирования
    if (confirmedBooking) {
        return (
            <div className="flex min-h-screen flex-col bg-[#F5F0E8] pt-20">
                <Navbar />

                <main className="flex grow items-center justify-center px-6 py-12">
                    <BookingSuccess
                        confirmedBooking={confirmedBooking}
                        restaurant={restaurant}
                        date={date}
                        slot={slot}
                        guests={guests}
                    />
                </main>

                <Footer />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col bg-[#F5F0E8] pt-20">
            <Navbar />

            <main className="mx-auto w-full max-w-7xl grow px-6 py-12 md:px-10">
                {/* Навигация */}
                <div className="mb-10 flex flex-wrap items-center gap-2 border-b border-[#D8CBBB] pb-4 text-xs text-[#756A66]">
                    <Link
                        to={`/restaurant/${restaurant.slug}`}
                        className="transition-colors hover:text-[#702638]"
                    >
                        {restaurant.name}
                    </Link>

                    <ChevronRight size={14} />

                    <span className="font-medium text-[#702638]">
                        Бронирование и подтверждение
                    </span>
                </div>

                {/* Основное содержимое */}
                <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
                    {/* Информация о бронировании */}
                    <div className="lg:col-span-5">
                        <BookingSummary
                            restaurant={restaurant}
                            date={date}
                            slot={slot}
                            guests={guests}
                        />
                    </div>

                    {/* Форма гостя */}
                    <div className="lg:col-span-7">
                        <BookingForm
                            name={name}
                            setName={setName}
                            email={email}
                            setEmail={setEmail}
                            phone={phone}
                            setPhone={setPhone}
                            occasion={occasion}
                            setOccasion={setOccasion}
                            specialRequests={specialRequests}
                            setSpecialRequests={setSpecialRequests}
                            confirming={confirming}
                            onSubmit={handleConfirmSubmit}
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
