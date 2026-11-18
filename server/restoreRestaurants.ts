
import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

import { User } from "./models/User.js";
import { Restaurant } from "./models/Restaurant.js";

const MONGO_URL = process.env.MONGODB_URL || "";

const restaurantsData = [
    {
        name: "L'Essence",
        slug: "l-essence",
        description:
            "Уютный ресторан французской кухни с атмосферой Парижа, мягким светом свечей и изысканной подачей блюд.",
        cuisine: "French",
        priceRange: "₽₽₽₽",
        rating: 4.9,
        reviewCount: 88,
        location: "Манхэттен, Нью-Йорк",
        address: "115 Greenwich St, New York, NY 10006",
        image: "/restaurant_5.png",
        chef: "Jean-Luc Picard",
        tags: ["Романтическая атмосфера", "Мягкие кресла", "Свечи", "Высокая кухня"],
        availableSlots: ["18:00", "19:00", "20:00", "21:00", "22:00"],
        featured: true,
        exclusive: false,
    },
    {
        name: "Terraza Cielo",
        slug: "terraza-cielo",
        description:
            "Ресторан на крыше с панорамным видом на город, средиземноморской кухней, домашней пастой и морепродуктами.",
        cuisine: "Italian",
        priceRange: "₽₽₽",
        rating: 4.7,
        reviewCount: 205,
        location: "Манхэттен, Нью-Йорк",
        address: "244 Fifth Ave Rooftop, New York, NY 10001",
        image: "/restaurant_3.png",
        chef: "Elena Rossi",
        tags: ["Терраса", "Панорамный вид", "Домашняя паста", "Коктейли"],
        availableSlots: ["12:00", "13:00", "17:00", "18:00", "19:00", "20:00", "21:00"],
        featured: true,
        exclusive: false,
    },
    {
        name: "Kuro Omakase",
        slug: "kuro-omakase",
        description:
            "Атмосферный японский ресторан, где шеф-повар Кэндзи Сато создаёт авторские суши и блюда из сезонных продуктов.",
        cuisine: "Japanese",
        priceRange: "₽₽₽₽",
        rating: 4.8,
        reviewCount: 92,
        location: "Манхэттен, Нью-Йорк",
        address: "18 Orchard St, New York, NY 10002",
        image: "/restaurant_2.png",
        chef: "Kenji Sato",
        tags: ["Омакасе", "Японская кухня", "Авторская подача", "Уютная атмосфера"],
        availableSlots: ["18:00", "20:30"],
        featured: true,
        exclusive: true,
    },
    {
        name: "Flora Garden",
        slug: "flora-garden",
        description:
            "Светлый ресторан с растительной кухней, сезонными продуктами и уютной атмосферой зимнего сада.",
        cuisine: "Vegetarian",
        priceRange: "₽₽₽",
        rating: 4.8,
        reviewCount: 110,
        location: "Манхэттен, Нью-Йорк",
        address: "90 Grand St, New York, NY 10013",
        image: "/restaurant_6.png",
        chef: "Chloe Mercer",
        tags: ["Растительная кухня", "Органические продукты", "Зимний сад"],
        availableSlots: ["11:30", "13:00", "14:30", "17:30", "19:00", "20:30"],
        featured: false,
        exclusive: false,
    },
    {
        name: "Ember Grille",
        slug: "ember-grille",
        description:
            "Современный стейк-хаус с уютными кожаными креслами и мясом сухого вызревания, приготовленным на открытом огне.",
        cuisine: "Steakhouse",
        priceRange: "₽₽₽₽",
        rating: 4.6,
        reviewCount: 142,
        location: "Манхэттен, Нью-Йорк",
        address: "320 Bowery, New York, NY 10012",
        image: "/restaurant_1.png",
        chef: "Marcus Vance",
        tags: ["Стейки", "Открытый огонь", "Авторская кухня", "Уютный интерьер"],
        availableSlots: ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
        featured: false,
        exclusive: false,
    },
    {
        name: "L'Artiste",
        slug: "l-artiste",
        description:
            "Ресторан современной французской кухни, сочетающий классические рецепты, необычную подачу и атмосферный интерьер.",
        cuisine: "French",
        priceRange: "₽₽₽₽",
        rating: 4.9,
        reviewCount: 124,
        location: "Манхэттен, Нью-Йорк",
        address: "420 Mercer St, New York, NY 10003",
        image: "/restaurant_4.png",
        chef: "Jean-Pierre Dubois",
        tags: ["Высокая кухня", "Дегустационное меню", "Романтическая атмосфера"],
        availableSlots: ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"],
        featured: true,
        exclusive: true,
    },
];

const restoreRestaurants = async () => {
    if (!MONGO_URL) {
        throw new Error("Не найдена переменная MONGODB_URL в .env");
    }

    try {
        console.log("Подключение к базе данных...");
        await mongoose.connect(MONGO_URL);

        console.log("Проверка пользователя-владельца...");

        let ownerUser = await User.findOne({ role: "owner" });

        if (!ownerUser) {
            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash("owner123", salt);

            ownerUser = await User.create({
                name: "Владелец ресторана",
                email: "owner@example.com",
                password,
                phone: "+79990000000",
                role: "owner",
            });

            console.log("Создан тестовый пользователь-владелец.");
        }

        console.log("Восстановление ресторанов...");

        for (const restaurant of restaurantsData) {
            await Restaurant.findOneAndUpdate(
                { slug: restaurant.slug },
                {
                    ...restaurant,
                    owner: ownerUser._id,
                    status: "approved",
                    totalSeats: 30,
                },
                {
                    upsert: true,
                    new: true,
                    runValidators: true,
                    setDefaultsOnInsert: true,
                }
            );

            console.log(`Готово: ${restaurant.name}`);
        }

        const count = await Restaurant.countDocuments({ status: "approved" });

        console.log(`Восстановление завершено. Одобренных ресторанов: ${count}`);
    } catch (error) {
        console.error("Ошибка восстановления ресторанов:", error);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
        console.log("Соединение с базой данных закрыто.");
    }
};

restoreRestaurants();
