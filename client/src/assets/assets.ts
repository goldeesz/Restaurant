
import hero_bg_img from "./hero_bg_img.png";
import default_restaurant_img from "./default_restaurant_Img.jpeg";
import membership_section_img from "./membership_section_img.png";
import {
    BeefIcon,
    Building2Icon,
    CroissantIcon,
    FishIcon,
    GlobeIcon,
    LeafIcon,
    MailIcon,
    Share2Icon,
    UtensilsCrossedIcon,
} from "lucide-react";

export const assets = {
    hero_bg_img,
    default_restaurant_img,
    membership_section_img,
};

export const dummyReviews = [
    {
        _id: "dummy-rev-1",
        userName: "Сергей Петров",
        rating: 5,
        comment: "Потрясающие впечатления! Атмосфера была безупречной, а каждое блюдо приготовлено с особым мастерством. Обязательно рекомендуем к посещению!",
        visitedDate: "2026-06-10T12:00:00.000Z",
        createdAt: "2026-06-10T12:00:00.000Z",
    },
    {
        _id: "dummy-rev-2",
        userName: "Анастасия Михайлова",
        rating: 4,
        comment:
            "Фирменные блюда были великолепны, а персонал оказался невероятно внимательным. Обязательно вернёмся сюда на ужин!",
        visitedDate: "2026-06-08T18:30:00.000Z",
        createdAt: "2026-06-08T18:30:00.000Z",
    },
    {
        _id: "dummy-rev-3",
        userName: "София Исакова",
        rating: 5,
        comment: "Каждая подача блюд стала приятным сюрпризом. Изысканные сочетания вкусов и безупречная подача. Настоящее гастрономическое удовольствие!",
        visitedDate: "2026-06-05T20:15:00.000Z",
        createdAt: "2026-06-05T20:15:00.000Z",
    },
];

export const dummyRating = 4.8;
export const dummyReviewCount = 124;

export const footerSections = [
    {
        title: "О КОМПАНИИ",
        links: [
            { label: "О нас", path: "#" },
            { label: "Партнёрам", path: "#" },
            { label: "Карьера", path: "#" },
        ],
    },
    {
        title: "ИНФОРМАЦИЯ",
        links: [
            { label: "Условия использования", path: "#" },
            { label: "Политика конфиденциальности", path: "#" },
            { label: "Использование файлов cookie", path: "#" },
        ],
    },
];

export const socialLinks = [
    { icon: GlobeIcon, href: "#" },
    { icon: Share2Icon, href: "#" },
    { icon: MailIcon, href: "#" },
];

export const bottomLinks = [
    { label: "Условия использования", path: "#" },
    { label: "Конфиденциальность", path: "#" },
];

export const cuisines = [
    { name: "Italian", icon: UtensilsCrossedIcon, label: "ИТАЛЬЯНСКАЯ" },
    { name: "Japanese", icon: FishIcon, label: "ЯПОНСКАЯ" },
    { name: "French", icon: CroissantIcon, label: "ФРАНЦУЗСКАЯ" },
    { name: "Rooftop", icon: Building2Icon, label: "С ВИДОМ" },
    { name: "Steakhouse", icon: BeefIcon, label: "СТЕЙКХАУСЫ" },
    { name: "Vegetarian", icon: LeafIcon, label: "ВЕГЕТАРИАНСКАЯ" },
];

export const dummyUser = {
    _id: "6a32a3c50e88c825d8873f75",
    name: "Екатерина Романова",
    email: "eka@example.com",
    phone: "+01234567788",
    role: "owner",
    token: "xyz",
    createdAt: "2026-06-17T13:40:21.669Z",
    updatedAt: "2026-06-17T13:40:21.669Z",
};

export const dummyRestaurant = [];

export const dummyAvailability = [
    { time: "18:00", availableSeats: 45, isAvailable: true },
    { time: "19:00", availableSeats: 45, isAvailable: true },
    { time: "20:00", availableSeats: 45, isAvailable: true },
    { time: "21:00", availableSeats: 45, isAvailable: true },
    { time: "22:00", availableSeats: 45, isAvailable: true },
];

export const dummyBookingData = {
    user: "6a32a3c50e88c825d8873f75",
    restaurant: {
        _id: "6a32a3c50e88c825d8873f7d",
        name: "L'Essence",
        location: "St.Petersburg, RUS",
        address: "Невский проспект 16, Санкт-Петербург, Россия",
        image: "/restaurant_5.png",
    },
    date: "2026-06-25T00:00:00.000Z",
    time: "22:00",
    guests: 2,
    occasion: "",
    specialRequests: "",
    status: "confirmed",
    _id: "6a34e4caf866d0ae1e98e487",
    createdAt: "2026-06-19T06:42:18.305Z",
    updatedAt: "2026-06-19T06:42:18.305Z",
    bookingId: "GR-71B448A7",
};

export const dummyMyBookingsData = [
    {
        _id: "6a34e4caf866d0ae1e98e487",
        user: "6a32a3c50e88c825d8873f75",
        restaurant: {
            _id: "6a32a3c50e88c825d8873f7d",
            name: "L'Essence",
            slug: "l-essence",
            location: "St.Petersburg, RUS",
            address: "Невский проспект 16, Санкт-Петербург, Россия",
            image: "/restaurant_5.png",
        },
        date: "2026-06-25T00:00:00.000Z",
        time: "22:00",
        guests: 2,
        occasion: "",
        specialRequests: "",
        status: "confirmed",
        createdAt: "2026-06-19T06:42:18.305Z",
        updatedAt: "2026-06-19T06:42:18.305Z",
        bookingId: "GR-71B448A7",
    },
    {
        _id: "6a34e55af866d0ae1e98e489",
        user: "6a32a3c50e88c825d8873f75",
        restaurant: {
            _id: "6a32a3c50e88c825d8873f7a",
            name: "Terraza Cielo",
            slug: "terraza-cielo",
            location: "St.Petersburg, RUS",
            address: "Большая морская 20, Санкт-Петербург, Россия",
            image: "/restaurant_3.png",
        },
        date: "2026-06-19T00:00:00.000Z",
        time: "20:00",
        guests: 2,
        occasion: "",
        specialRequests: "",
        status: "confirmed",
        createdAt: "2026-06-19T06:44:42.294Z",
        updatedAt: "2026-06-19T06:44:42.294Z",
        bookingId: "GR-17743C76",
    },
    {
        _id: "6a34e54ff866d0ae1e98e488",
        user: "6a32a3c50e88c825d8873f75",
        restaurant: {
            _id: "6a32a3c50e88c825d8873f78",
            name: "L'Artiste",
            slug: "l-artiste",
            location: "St.Petersburg, RUS",
            address: "Московский проспект 19, Санкт-Петербург, Россия",
            image: "/restaurant_4.png",
        },
        date: "2026-06-19T00:00:00.000Z",
        time: "19:00",
        guests: 2,
        occasion: "",
        specialRequests: "",
        status: "confirmed",
        createdAt: "2026-06-19T06:44:31.052Z",
        updatedAt: "2026-06-19T06:44:31.052Z",
        bookingId: "GR-F82DDD63",
    },
];

export const dummyAdminStats = {
    users: { totalUsers: 1, totalOwners: 1, total: 2 },
    restaurants: { total: 6 },
    bookings: { total: 1 },
    latestBookings: [
        {
            _id: "6a34f88580587be1dada87ba",
            user: { _id: "6a34ef24a4d96fc34d9c906b", name: "Zlata Zolotova", email: "zzszlataz@gamil.com" },
            restaurant: { _id: "6a34ef24a4d96fc34d9c906d", name: "Kuro Omakase" },
            date: "2026-06-19T00:00:00.000Z",
            time: "20:30",
            guests: 2,
            occasion: "",
            specialRequests: "",
            status: "confirmed",
            createdAt: "2026-06-19T08:06:29.155Z",
            updatedAt: "2026-06-19T08:06:29.155Z",
            bookingId: "GR-EB39904C",
        },
    ],
};

export const dummyFeaturedRestaurants = [dummyRestaurant[0], dummyRestaurant[1], dummyRestaurant[2]];
