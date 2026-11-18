import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.js";
import { Booking } from "../models/Booking.js";
import { Restaurant } from "../models/Restaurant.js";

// Создание бронирования
export const createBooking = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const {
            restaurantId,
            date,
            time,
            guests,
            occasion,
            specialRequests
        } = req.body;

        if (!restaurantId || !date || !time || !guests) {
            res.status(400).json({
                message: "Необходимо заполнить все обязательные поля"
            });
            return;
        }

        const requestedGuests = Number(guests);

        if (!Number.isInteger(requestedGuests) || requestedGuests < 1) {
            res.status(400).json({
                message: "Количество гостей должно быть положительным целым числом"
            });
            return;
        }

        const restaurant = await Restaurant.findById(restaurantId);

        if (!restaurant) {
            res.status(404).json({
                message: "Ресторан не найден"
            });
            return;
        }

        if (restaurant.status !== "approved") {
            res.status(400).json({
                message: "Бронирование этого ресторана пока недоступно"
            });
            return;
        }

        const bookingDate = new Date(`${date}T00:00:00.000Z`);

        if (Number.isNaN(bookingDate.getTime())) {
            res.status(400).json({
                message: "Некорректная дата бронирования"
            });
            return;
        }

        const nextDay = new Date(bookingDate);
        nextDay.setUTCDate(nextDay.getUTCDate() + 1);

        const existingBookings = await Booking.find({
            restaurant: restaurantId,
            date: {
                $gte: bookingDate,
                $lt: nextDay
            },
            time,
            status: "confirmed"
        });

        const bookedSeats = existingBookings.reduce(
            (sum, booking) => sum + booking.guests,
            0
        );

        const totalSeats = restaurant.totalSeats || 20;
        const availableSeats = totalSeats - bookedSeats;

        if (requestedGuests > availableSeats) {
            res.status(400).json({
                message: `Недостаточно свободных мест. Доступно: ${Math.max(0, availableSeats)}`
            });
            return;
        }

        const booking = await Booking.create({
            user: req.user?._id,
            restaurant: restaurantId,
            date: bookingDate,
            time,
            guests: requestedGuests,
            occasion,
            specialRequests,
            status: "confirmed"
        });

        const populatedBooking = await booking.populate(
            "restaurant",
            "name location image address"
        );

        res.status(201).json(populatedBooking);

    } catch (error: any) {
        console.error("Create Booking Error:", error);

        res.status(500).json({
            message: error.message || "Не удалось создать бронирование"
        });
    }
};

// Получение бронирований пользователя
export const getMyBookings = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const bookings = await Booking.find({
            user: req.user?._id
        })
            .populate("restaurant", "name location image address slug")
            .sort({ date: -1, time: -1 });

        res.json(bookings);

    } catch (error: any) {
        console.error("Get My Bookings Error:", error);

        res.status(500).json({
            message: error.message || "Не удалось получить бронирования"
        });
    }
};

// Отмена бронирования
export const cancelBooking = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            res.status(404).json({
                message: "Бронирование не найдено"
            });
            return;
        }

        if (booking.user.toString() !== req.user?._id.toString()) {
            res.status(401).json({
                message: "Нет доступа к отмене этого бронирования"
            });
            return;
        }

        booking.status = "cancelled";
        await booking.save();

        const populatedBooking = await booking.populate(
            "restaurant",
            "name location image address"
        );

        res.json(populatedBooking);

    } catch (error: any) {
        console.error("Cancel Booking Error:", error);

        res.status(500).json({
            message: error.message || "Не удалось отменить бронирование"
        });
    }
};
