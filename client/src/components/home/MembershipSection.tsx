
import { assets } from "../../assets/assets";
import { BadgeCheck, Armchair, Sparkles } from "lucide-react";

export default function MembershipSection() {
    return (
        <section className="py-20 xl:py-28 bg-[#E9DFD2] px-6 md:px-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-center">

                {/* Фотография */}
                <div className="lg:col-span-7 relative h-[350px] md:h-[450px] xl:h-[510px] overflow-hidden rounded-sm group">
                    <img
                        src={assets.membership_section_img}
                        alt="Изысканный ужин от шеф-повара"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#291820]/35 via-transparent to-transparent" />

                    <div className="absolute bottom-6 left-6 md:bottom-9 md:left-9">
                        <span className="text-[9px] tracking-[0.25em] text-white/85 uppercase">
                            CULINARY PARADISE
                        </span>
                        <p className="font-display text-2xl md:text-3xl text-white mt-1">
                            Искусство особенного вечера
                        </p>
                    </div>
                </div>

                {/* Текстовая часть */}
                <div className="lg:col-span-5 flex flex-col justify-center lg:pl-2">

                    <div className="flex items-center gap-2 mb-4">
                        <Sparkles size={15} className="text-[#A47D3C]" />
                        <span className="text-[10px] text-[#A47D3C] tracking-[0.22em] uppercase font-semibold">
                            КЛУБ ОСОБЫХ ВПЕЧАТЛЕНИЙ
                        </span>
                    </div>

                    <h2 className="font-display text-4xl md:text-5xl text-[#491B2A] mb-6 leading-[1.12]">
                        Откройте мир
                        <br />
                        <span className="italic text-[#702638]">
                            высокой кухни
                        </span>
                    </h2>

                    <p className="text-sm text-[#756A66] mb-9 leading-[1.9]">
                        Станьте частью Culinary Paradise и откройте для себя
                        особенный мир гастрономии: эксклюзивные предложения,
                        закрытые мероприятия и возможность бронировать
                        лучшие столики.
                    </p>

                    {/* Преимущества */}
                    <div className="space-y-6">

                        <div className="flex gap-4">
                            <div className="shrink-0 w-10 h-10 rounded-full bg-[#FFFCF8] flex items-center justify-center">
                                <BadgeCheck
                                    size={20}
                                    strokeWidth={1.4}
                                    className="text-[#A47D3C]"
                                />
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold text-[#491B2A]">
                                    Приоритетное бронирование
                                </h4>

                                <p className="text-xs text-[#756A66] mt-2 leading-relaxed">
                                    Получайте доступ к специальным столикам
                                    и бронируйте места даже в самые популярные вечера.
                                </p>
                            </div>
                        </div>

                        <div className="w-full h-px bg-[#D8CBBB]" />

                        <div className="flex gap-4">
                            <div className="shrink-0 w-10 h-10 rounded-full bg-[#FFFCF8] flex items-center justify-center">
                                <Armchair
                                    size={20}
                                    strokeWidth={1.4}
                                    className="text-[#A47D3C]"
                                />
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold text-[#491B2A]">
                                    Особенные гастрономические события
                                </h4>

                                <p className="text-xs text-[#756A66] mt-2 leading-relaxed">
                                    Открывайте новые вкусы на закрытых дегустациях
                                    и специальных ужинах от шеф-поваров.
                                </p>
                            </div>
                        </div>

                    </div>

                    <div className="mt-9 pt-6 border-t border-[#D8CBBB]">
                        <span className="text-[9px] tracking-[0.2em] text-[#A47D3C] uppercase">
                            ВАШ СЛЕДУЮЩИЙ ОСОБЕННЫЙ ВЕЧЕР
                        </span>
                    </div>

                </div>
            </div>
        </section>
    );
}
