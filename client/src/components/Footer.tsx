
import { Link } from "react-router-dom";
import { bottomLinks, footerSections, socialLinks } from "../assets/assets";

export default function Footer() {
    return (
        <footer className="w-full bg-[#E9DFD2] border-t border-[#D8CBBB] pt-16 pb-10">
            <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                {/* Логотип и описание */}
                <div className="lg:col-span-1">
                    <Link to="/" className="block mb-4">
                        <img
                            src="/logo.svg"
                            alt="Culinary Paradise"
                            className="h-11 mt-1.5"
                        />
                    </Link>

                    <p className="text-[#756A66] text-sm leading-relaxed pr-4">
                        Откройте для себя мир особенных впечатлений.
                        Находите особенные рестораны, выбирайте удобное время
                        и бронируйте столики для незабываемых встреч
                    </p>
                </div>

                {/* Разделы сайта */}
                {footerSections.map((section) => (
                    <div key={section.title} className="flex flex-col gap-4">
                        <h4 className="text-xs font-semibold tracking-[0.16em] text-[#702638] uppercase">
                            {section.title}
                        </h4>

                        {section.links.map((link) => (
                            <Link
                                key={link.label}
                                to={link.path}
                                className="text-sm text-[#756A66] hover:text-[#702638] transition-colors duration-200"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                ))}

                {/* Контакты */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-xs font-semibold tracking-[0.16em] text-[#702638] uppercase">
                        Контакты
                    </h4>

                    <p className="text-sm text-[#756A66]">
                        support@example.com
                    </p>

                    <div className="flex gap-4 mt-2">
                        {socialLinks.map(({ icon: Icon, href }, index) => (
                            <a
                                key={index}
                                href={href}
                                aria-label={`Социальная ссылка ${index + 1}`}
                                className="text-[#702638] hover:text-[#C6A15B] transition-colors duration-200"
                            >
                                <Icon size={19} strokeWidth={1.5} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Нижняя строка */}
            <div className="max-w-7xl mx-auto px-6 md:px-10 mt-14 pt-7 border-t border-[#D8CBBB] flex flex-col md:flex-row justify-between items-center gap-4">

                <p className="text-xs text-[#756A66] text-center">
                    © 2026 Culinary Paradise. Все права защищены
                </p>

                <div className="flex gap-6">
                    {bottomLinks.map((link) => (
                        <Link
                            key={link.label}
                            to={link.path}
                            className="text-xs text-[#756A66] hover:text-[#702638] transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
}
