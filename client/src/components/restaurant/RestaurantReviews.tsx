
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Star } from "lucide-react";
import { dummyReviews } from "../../assets/assets.ts";

export default function RestaurantReviews() {
    return (
        <section className="space-y-8 pt-6 border-t border-[#D8CBBB] text-left">

            <div>
                <span className="text-[10px] text-[#C6A15B] tracking-[0.2em] uppercase block mb-2">
                    Впечатления гостей
                </span>

                <h3 className="font-display text-xl font-semibold text-[#702638]">
                    Отзывы посетителей
                </h3>
            </div>

            <div className="space-y-6">
                {dummyReviews.length === 0 ? (
                    <div className="bg-[#FFFCF8] border border-[#D8CBBB] p-6 rounded-lg">
                        <p className="text-sm text-[#756A66] italic">
                            Отзывов пока нет. Станьте первым, кто поделится своими впечатлениями!
                        </p>
                    </div>
                ) : (
                    dummyReviews.map((r: any) => (
                        <div
                            key={r._id}
                            className="pb-6 border-b border-[#D8CBBB] last:border-b-0 space-y-3"
                        >
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <h4 className="text-sm font-medium text-[#702638]">
                                        {r.userName}
                                    </h4>

                                    <span className="text-xs text-[#756A66]">
                                        Посещение:{" "}
                                        {new Date(r.visitedDate).toLocaleDateString("ru-RU")}
                                    </span>
                                </div>

                                <div className="flex items-center gap-0.5 text-[#C6A15B]">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={13}
                                            fill={i < r.rating ? "currentColor" : "none"}
                                            className={i < r.rating ? "" : "text-[#D8CBBB]"}
                                        />
                                    ))}
                                </div>
                            </div>

                            <p className="text-sm text-[#756A66] max-w-lg leading-relaxed">
                                {r.comment}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}
