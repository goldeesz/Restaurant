
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext.tsx";
import {
    Menu,
    X,
    LogOut,
    LayoutDashboard,
    ShieldCheck,
    ChevronDown,
} from "lucide-react";

export default function Navbar() {
    const { user, logout, setAuthModalOpen } = useAppContext();

    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
        setDropdownOpen(false);
    }, [location]);

    const handleDashboardClick = () => {
        if (!user) {
            setAuthModalOpen(true);
        } else {
            navigate("/dashboard");
        }

        setMobileMenuOpen(false);
        setDropdownOpen(false);
    };

    const handleLogout = () => {
        setDropdownOpen(false);
        setMobileMenuOpen(false);
        logout();
    };

    const navLinkClass = (path: string) => {
        const isActive =
            location.pathname === path ||
            (path !== "/" && location.pathname.startsWith(path));

        return `relative py-2 text-[13px] font-medium tracking-wide transition-colors duration-200
            after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-[#702638]
            after:transition-all after:duration-300
            ${isActive
                ? "text-[#702638] after:w-full"
                : "text-[#756A66] hover:text-[#702638] after:w-0 hover:after:w-full"
            }`;
    };

    const mobileLinkClass =
        "block py-2 text-[15px] font-medium text-[#493D3D] transition-colors hover:text-[#702638]";

    return (
        <nav
            className={`fixed left-0 top-0 z-50 w-full border-b border-[#D8CBBB]/80 bg-[#FFFCF8]/95 backdrop-blur-xl transition-all duration-300 ${
                scrolled
                    ? "h-[68px] shadow-[0_5px_25px_rgba(41,33,38,0.07)]"
                    : "h-[78px]"
            }`}
        >
            <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 md:px-10">

                {/* Логотип */}
                <Link
                    to="/"
                    className="group flex shrink-0 flex-col leading-none"
                    aria-label="Culinary Paradise — главная"
                >
                    <span className="font-display text-[24px] font-semibold tracking-[-0.04em] text-[#702638] transition-colors group-hover:text-[#491B2A] md:text-[27px]">
                        Culinary
                    </span>

                    <span className="font-display text-[24px] font-semibold tracking-[-0.04em] text-[#702638] transition-colors group-hover:text-[#491B2A] md:text-[27px]">
                        Paradise
                    </span>

                    <span className="mt-1 text-[8px] font-semibold tracking-[0.25em] text-[#A18455]">
                        THE ART OF DINING
                    </span>
                </Link>

                {/* Навигация для компьютера */}
                <div className="hidden items-center gap-9 md:flex">
                    <Link to="/" className={navLinkClass("/")}>
                        Главная
                    </Link>

                    <Link to="/search" className={navLinkClass("/search")}>
                        Рестораны
                    </Link>

                    <button
                        onClick={handleDashboardClick}
                        className={`${navLinkClass("/dashboard")} cursor-pointer border-0 bg-transparent`}
                    >
                        Мои бронирования
                    </button>
                </div>

                {/* Авторизация для компьютера */}
                <div className="hidden items-center gap-5 md:flex">
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                aria-expanded={dropdownOpen}
                                className="flex cursor-pointer items-center gap-2 rounded-full border border-[#D8CBBB] bg-white/60 py-1.5 pl-1.5 pr-3 transition-colors hover:border-[#702638]/50"
                            >
                                <span className="flex size-8 items-center justify-center rounded-full bg-[#702638] font-display text-sm text-white">
                                    {user.name.charAt(0)}
                                </span>

                                <span className="max-w-[110px] truncate text-[13px] font-medium text-[#493D3D]">
                                    {user.name.split(" ")[0]}
                                </span>

                                <ChevronDown
                                    size={14}
                                    className={`text-[#A18455] transition-transform ${
                                        dropdownOpen ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-xl border border-[#D8CBBB] bg-[#FFFCF8] py-2 shadow-[0_15px_40px_rgba(41,33,38,0.13)]">
                                    <div className="border-b border-[#E9DFD2] px-5 py-3">
                                        <p className="truncate text-sm font-semibold text-[#702638]">
                                            {user.name}
                                        </p>

                                        <p className="mt-1 truncate text-xs text-[#8B8079]">
                                            {user.email}
                                        </p>
                                    </div>

                                    <button
                                        onClick={handleDashboardClick}
                                        className="flex w-full cursor-pointer items-center gap-3 px-5 py-3 text-left text-[13px] text-[#493D3D] transition-colors hover:bg-[#F5F0E8] hover:text-[#702638]"
                                    >
                                        <LayoutDashboard size={16} />
                                        Мои бронирования
                                    </button>

                                    {user.role === "admin" && (
                                        <Link
                                            to="/admin/dashboard"
                                            className="flex items-center gap-3 px-5 py-3 text-[13px] text-[#493D3D] transition-colors hover:bg-[#F5F0E8] hover:text-[#702638]"
                                        >
                                            <ShieldCheck size={16} />
                                            Панель администратора
                                        </Link>
                                    )}

                                    {user.role === "owner" && (
                                        <Link
                                            to="/owner/dashboard"
                                            className="flex items-center gap-3 px-5 py-3 text-[13px] text-[#493D3D] transition-colors hover:bg-[#F5F0E8] hover:text-[#702638]"
                                        >
                                            <ShieldCheck size={16} />
                                            Кабинет ресторана
                                        </Link>
                                    )}

                                    <button
                                        onClick={handleLogout}
                                        className="flex w-full cursor-pointer items-center gap-3 border-t border-[#E9DFD2] px-5 py-3 text-left text-[13px] text-[#A33D43] transition-colors hover:bg-[#FFF3F0]"
                                    >
                                        <LogOut size={16} />
                                        Выйти из аккаунта
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <button
                                onClick={() => setAuthModalOpen(true)}
                                className="cursor-pointer text-[13px] font-medium text-[#702638] transition-colors hover:text-[#491B2A]"
                            >
                                Войти
                            </button>

                            <button
                                onClick={() => setAuthModalOpen(true)}
                                className="rounded-md bg-[#702638] px-6 py-3 text-[11px] font-semibold tracking-[0.12em] text-white transition-all duration-300 hover:bg-[#491B2A] hover:shadow-lg hover:shadow-[#702638]/15"
                            >
                                РЕГИСТРАЦИЯ
                            </button>
                        </>
                    )}
                </div>

                {/* Мобильная кнопка */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="rounded-md p-2 text-[#702638] transition-colors hover:bg-[#F5F0E8] md:hidden"
                    aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
                    aria-expanded={mobileMenuOpen}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Мобильное меню */}
            {mobileMenuOpen && (
                <div className="absolute left-0 top-full z-50 w-full border-t border-[#D8CBBB] bg-[#FFFCF8] px-6 pb-7 pt-5 shadow-[0_15px_30px_rgba(41,33,38,0.09)] md:hidden">
                    <div className="flex flex-col gap-3">
                        <Link to="/" className={mobileLinkClass}>
                            Главная
                        </Link>

                        <Link to="/search" className={mobileLinkClass}>
                            Рестораны
                        </Link>

                        <button
                            onClick={handleDashboardClick}
                            className={`${mobileLinkClass} cursor-pointer text-left`}
                        >
                            Мои бронирования
                        </button>

                        <div className="my-2 border-t border-[#E9DFD2]" />

                        {user ? (
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <span className="flex size-10 items-center justify-center rounded-full bg-[#702638] font-display text-white">
                                        {user.name.charAt(0)}
                                    </span>

                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold text-[#702638]">
                                            {user.name}
                                        </p>
                                        <p className="truncate text-xs text-[#8B8079]">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>

                                {user.role === "admin" && (
                                    <Link
                                        to="/admin/dashboard"
                                        className={mobileLinkClass}
                                    >
                                        Панель администратора
                                    </Link>
                                )}

                                {user.role === "owner" && (
                                    <Link
                                        to="/owner/dashboard"
                                        className={mobileLinkClass}
                                    >
                                        Кабинет ресторана
                                    </Link>
                                )}

                                <button
                                    onClick={handleLogout}
                                    className="flex cursor-pointer items-center gap-2 py-2 text-left text-sm text-[#A33D43]"
                                >
                                    <LogOut size={16} />
                                    Выйти из аккаунта
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => {
                                        setAuthModalOpen(true);
                                        setMobileMenuOpen(false);
                                    }}
                                    className="w-full rounded-md border border-[#702638] py-3 text-sm font-medium text-[#702638]"
                                >
                                    Войти
                                </button>

                                <button
                                    onClick={() => {
                                        setAuthModalOpen(true);
                                        setMobileMenuOpen(false);
                                    }}
                                    className="w-full rounded-md bg-[#702638] py-3 text-sm font-semibold text-white"
                                >
                                    Регистрация
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
