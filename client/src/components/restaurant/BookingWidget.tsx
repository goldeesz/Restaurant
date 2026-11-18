import { Calendar, Users } from "lucide-react";

interface BookingWidgetProps {
    restaurant: any;
    selectedDate: string;
    setSelectedDate: (date: string) => void;
    selectedGuests: string;
    setSelectedGuests: (guests: string) => void;
    selectedSlot: string;
    setSelectedSlot: (slot: string) => void;
    slotsAvailability: any[];
    loadingSlots: boolean;
    isAuthenticated: boolean;
    handleReserveClick: () => void;
}

export default function BookingWidget({
    restaurant,
    selectedDate,
    setSelectedDate,
    selectedGuests,
    setSelectedGuests,
    selectedSlot,
    setSelectedSlot,
    slotsAvailability,
    loadingSlots,
    isAuthenticated,
    handleReserveClick,
}: BookingWidgetProps) {
    if (!restaurant) return null;

    // Определяем, выбрана ли сегодняшняя дата
    const todayStr = new Date().toISOString().split("T")[0];
    const isToday = selectedDate === todayStr;

    // Получаем список доступного времени
    const allSlots =
        slotsAvailability.length > 0
            ? slotsAvailability
            : (restaurant.availableSlots || []).map((slot: string) => ({
                  time: slot,
                  availableSeats: 20,
                  isAvailable: true,
              }));

    // Скрываем прошедшее время, если выбрана сегодняшняя дата
    const visibleSlots = allSlots.filter((slotInfo: any) => {
        if (!isToday) return true;

        const [slotHour, slotMinute] = slotInfo.time
            .split(":")
            .map(Number);

        const now = new Date();

        return (
            slotHour > now.getHours() ||
            (slotHour === now.getHours() &&
                slotMinute > now.getMinutes())
        );
    });

    return (
        <div className="bg-[#FFFCF8] border border-[#D8CBBB] p-6 rounded-lg shadow-[0_12px_35px_rgba(41,33,38,0.07)] text-left">

            <div className="mb-5 pb-4 border-b border-[#D8CBBB]">
                <span className="text-[10px] text-[#C6A15B] tracking-[0.2em] uppercase block mb-2">
                    Culinary Paradise
                </span>

                <h3 className="font-display text-xl font-semibold text-[#702638]">
                    Забронировать столик
                </h3>
            </div>

            <div className="space-y-5">

                {/* Количество гостей */}
                <div className="space-y-2">
                    <label className="block text-[10px] font-semibold text-[#756A66] tracking-wider uppercase">
                        Количество гостей
                    </label>

                    <div className="relative">
                        <Users
                            className="absolute left-3 top-3 text-[#702638]"
                            size={16}
                        />

                        <select
                            value={selectedGuests}
                            onChange={(e) => setSelectedGuests(e.target.value)}
                            className="w-full bg-[#F5F0E8] pl-9 pr-3 py-3 text-sm border border-[#D8CBBB] focus:border-[#702638] focus:outline-none rounded-md cursor-pointer text-[#292126]"
                        >
                            <option value="1">1 гость</option>
                            <option value="2">2 гостя</option>
                            <option value="4">4 гостя</option>
                            <option value="6">6 гостей</option>
                            <option value="8">8 гостей</option>
                        </select>
                    </div>
                </div>

                {/* Дата */}
                <div className="space-y-2">
                    <label className="block text-[10px] font-semibold text-[#756A66] tracking-wider uppercase">
                        Дата посещения
                    </label>

                    <div className="relative">
                        <Calendar
                            className="absolute left-3 top-3 text-[#702638]"
                            size={16}
                        />

                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => {
                                setSelectedDate(e.target.value);
                                setSelectedSlot("");
                            }}
                            min={todayStr}
                            className="w-full bg-[#F5F0E8] pl-9 pr-3 py-3 text-sm border border-[#D8CBBB] focus:border-[#702638] focus:outline-none rounded-md cursor-pointer text-[#292126]"
                        />
                    </div>
                </div>

                {/* Время посещения */}
                <div className="space-y-3 pt-2">
                    <span className="block text-[10px] font-semibold text-[#756A66] tracking-wider uppercase">
                        Выберите время
                    </span>

                    {!selectedDate ? (
                        <p className="text-xs text-[#756A66] bg-[#F5F0E8] border border-[#D8CBBB] rounded-md p-3">
                            Сначала выберите дату посещения
                        </p>
                    ) : loadingSlots ? (
                        <div className="py-4 flex justify-center">
                            <div className="w-5 h-5 border-2 border-[#D8CBBB] border-t-[#702638] rounded-full animate-spin" />
                        </div>
                    ) : visibleSlots.length === 0 ? (
                        <p className="text-xs text-[#756A66] bg-[#F5F0E8] border border-[#D8CBBB] rounded-md p-3">
                            На выбранную дату свободного времени нет
                        </p>
                    ) : (
                        <div className="grid grid-cols-3 gap-2">
                            {visibleSlots.map((slotInfo: any) => {
                                const slot = slotInfo.time;
                                const isSelected = selectedSlot === slot;

                                const isFull =
                                    !slotInfo.isAvailable ||
                                    slotInfo.availableSeats < Number(selectedGuests);

                                return (
                                    <button
                                        key={slot}
                                        type="button"
                                        disabled={isFull}
                                        onClick={() => setSelectedSlot(slot)}
                                        className={`py-2.5 px-1 text-center text-xs font-medium border transition-all rounded-md ${
                                            isSelected
                                                ? "bg-[#702638] border-[#702638] text-white"
                                                : isFull
                                                ? "bg-[#E9DFD2] border-[#D8CBBB] text-[#9A8E88] cursor-not-allowed opacity-60"
                                                : "bg-[#F5F0E8] border-[#D8CBBB] text-[#702638] hover:border-[#C6A15B] cursor-pointer"
                                        }`}
                                    >
                                        {slot}

                                        {isFull && (
                                            <span className="block text-[8px] text-red-700 uppercase mt-1">
                                                Нет мест
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Бронирование */}
                <button
                    onClick={handleReserveClick}
                    className="w-full bg-[#702638] hover:bg-[#491B2A] text-white py-4 mt-3 text-xs font-semibold tracking-[0.15em] uppercase transition-colors cursor-pointer rounded-md"
                >
                    {isAuthenticated
                        ? "Забронировать"
                        : "Войти для бронирования"}
                </button>

                <p className="text-center text-[10px] text-[#756A66] mt-3 leading-relaxed">
                    Условия отмены бронирования уточняются при оформлении заказа
                </p>
            </div>
        </div>
    );
}
