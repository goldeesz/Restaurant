import { Request, Response } from "express";
import { Restaurant } from "../models/Restaurant.js";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { Booking } from "../models/Booking.js";

// Получение списка ресторанов
export const getRestaurants = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { search, priceRange, rating, location, sort } = req.query;

        const queryObj: any = { status: "approved" };

        if (search && typeof search === "string") {
            queryObj.$or = [
                { name: { $regex: search, $options: "i" } },
                { tags: { $regex: search, $options: "i" } },
                { location: { $regex: search, $options: "i" } },
            ];
        }

        if (priceRange) {
            const prices = Array.isArray(priceRange)
                ? priceRange
                : [priceRange];

            queryObj.priceRange = { $in: prices };
        }

        if (rating) {
            queryObj.rating = {
                $gte: parseFloat(rating as string),
            };
        }

        if (location && typeof location === "string") {
            queryObj.location = {
                $regex: location,
                $options: "i",
            };
        }

        let sortOption: any = { createdAt: -1 };

        if (sort === "rating") {
            sortOption = { rating: -1 };
        } else if (sort === "price_low") {
            sortOption = { priceRange: 1 };
        } else if (sort === "price_high") {
            sortOption = { priceRange: -1 };
        }

        const restaurants = await Restaurant.find(queryObj).sort(sortOption);

        res.json(restaurants);
    } catch (error: any) {
        console.error("Get Restaurants Error:", error);

        res.status(500).json({
            message: error.message || "Не удалось загрузить рестораны",
        });
    }
};

// Получение популярных ресторанов
export const getFeaturedRestaurants = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const featured = await Restaurant.find({
            status: "approved",
            $or: [{ featured: true }, { exclusive: true }],
        }).limit(6);

        res.json(featured);
    } catch (error) {
        console.error("Get Featured Restaurants Error:", error);

        res.status(500).json({
            message: "Не удалось загрузить популярные рестораны",
        });
    }
};

// Получение ресторана по адресу страницы (slug)
export const getRestaurantBySlug = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const restaurant = await Restaurant.findOne({
            slug: req.params.slug,
        });

        if (!restaurant) {
            res.status(404).json({
                message: "Ресторан не найден",
            });
            return;
        }

        if (restaurant.status !== "approved") {
            let isAuthorized = false;

            const authorization = req.headers.authorization;

            if (authorization && authorization.startsWith("Bearer ")) {
                try {
                    const token = authorization.split(" ")[1];

                    const decoded = jwt.verify(
                        token,
                        process.env.JWT_SECRET as string
                    ) as { id: string };

                    const user = await User.findById(decoded.id);

                    if (
                        user &&
                        (
                            user.role === "admin" ||
                            (
                                user.role === "owner" &&
                                restaurant.owner?.toString() === user._id.toString()
                            )
                        )
                    ) {
                        isAuthorized = true;
                    }
                } catch (error) {
                    console.error("Authorization Error:", error);
                }
            }

            if (!isAuthorized) {
                res.status(404).json({
                    message: "Ресторан не найден или ожидает подтверждения",
                });
                return;
            }
        }

        res.json(restaurant);
    } catch (error: any) {
        console.error("Get Restaurant By Slug Error:", error);

        res.status(500).json({
            message: error.message || "Не удалось загрузить ресторан",
        });
    }
};

// Получение свободного времени для бронирования
export const getRestaurantAvailability = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { date } = req.query;

        if (!date || typeof date !== "string") {
            res.status(400).json({
                message: "Необходимо указать дату посещения",
            });
            return;
        }

        const restaurant = await Restaurant.findById(req.params.id);

        if (!restaurant) {
            res.status(404).json({
                message: "Ресторан не найден",
            });
            return;
        }

        // Проверяем корректность даты
        const bookingDate = new Date(`${date}T00:00:00.000Z`);

        if (Number.isNaN(bookingDate.getTime())) {
            res.status(400).json({
                message: "Некорректная дата",
            });
            return;
        }

        // Определяем границы выбранного дня
        const nextDay = new Date(bookingDate);
        nextDay.setUTCDate(nextDay.getUTCDate() + 1);

        // Получаем подтверждённые бронирования за этот день
        const bookings = await Booking.find({
            restaurant: restaurant._id,
            date: {
                $gte: bookingDate,
                $lt: nextDay,
            },
            status: "confirmed",
        });

        const totalSeats = restaurant.totalSeats || 20;

        // Рассчитываем свободные места для каждого времени
        const availability = (restaurant.availableSlots || []).map((slot) => {
            const bookedSeats = bookings
                .filter((booking) => booking.time === slot)
                .reduce(
                    (sum, booking) =>
                        sum + Number(booking.guests || 0),
                    0
                );

            const availableSeats = Math.max(
                0,
                totalSeats - bookedSeats
            );

            return {
                time: slot,
                availableSeats,
                isAvailable: availableSeats > 0,
            };
        });

        res.json(availability);
    } catch (error: any) {
        console.error("Get Restaurant Availability Error:", error);

        res.status(500).json({
            message:
                error.message ||
                "Не удалось получить свободное время",
        });
    }
};
