import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext.tsx";
import {
    Menu,
    X,
    LogOut,
    LayoutDashboard,
    ShieldCheck
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

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Закрываем мобильное меню при переходе на другую страницу
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
    };

    const navLinkClass = (path: string) => {
        const isActive = location.pathname === path ||
            (path !== "/" && location.pathname.startsWith(path));

        return `text-sm transition-colors pb-1 border-b cursor-pointer ${
            isActive
                ? "text-secondary border-secondary"
                : "text-[#F3EEE5]/75 hover:text-secondary border-transparent"
        }`;
    };

    return (
        <nav
            className={`fixed top-0 w-full z-40
                bg-[#211B1D]/95 backdrop-blur-md
                border-b border-secondary/20
                transition-all duration-300
                ${scrolled ? "h-16 shadow-lg shadow-black/20" : "h-20"}
            `}
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center h-full px-6 md:px-10">

                {/* Логотип */}
                <div className="flex items-center gap-12">
                    <Link to="/" className="flex items-center">
                        <img
                            src="/logo.png"
                            alt="Culinary Paradise"
                            className="h-8 md:h-9 w-auto object-contain"
                        />
                    </Link>

                    {/* Навигация для компьютера */}
                    <div className="hidden md:flex gap-8 items-center">

                        <Link to="/" className={navLinkClass("/")}>
                            Главная
                        </Link>

                        <Link to="/search" className={navLinkClass("/search")}>
                            Рестораны
                        </Link>

                        <button
                            onClick={handleDashboardClick}
                            className={`text-sm transition-colors pb-1 border-b cursor-pointer ${
                                location.pathname === "/dashboard"
                                    ? "text-secondary border-secondary"
                                    : "text-[#F3EEE5]/75 hover:text-secondary border-transparent"
                            }`}
                        >
                            Мои бронирования
                        </button>

                    </div>
                </div>

                {/* Авторизация для компьютера */}
                <div className="hidden md:flex items-center gap-6">

                    {user ? (
                        <div className="relative">

                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-2 text-sm
                                    text-[#F3EEE5] hover:text-secondary
                                    transition-colors cursor-pointer"
                            >
                                <span className="size-8 rounded-full
                                    bg-secondary/15 border border-secondary/50
                                    flex items-center justify-center
                                    text-secondary text-xs uppercase"
                                >
                                    {user.name.charAt(0)}
                                </span>

                                <span className="max-w-[120px] truncate">
                                    {user.name.split(" ")[0]}
                                </span>
                            </button>

                            {/* Выпадающее меню */}
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-3 w-60
                                    bg-[#211B1D] border border-secondary/30
                                    shadow-xl rounded-lg py-2 z-50
                                    animate-in fade-in slide-in-from-top-2 duration-200"
                                >
                                    <div className="px-4 py-3 border-b border-secondary/20">
                                        <p className="text-sm text-secondary truncate">
                                            {user.name}
                                        </p>

                                        <p className="text-xs text-[#F3EEE5]/55 truncate">
                                            {user.email}
                                        </p>
                                    </div>

                                    <button
                                        onClick={handleDashboardClick}
                                        className="w-full flex items-center gap-3 px-4 py-3
                                            text-sm text-[#F3EEE5]/75
                                            hover:text-secondary hover:bg-white/5
                                            transition-colors cursor-pointer text-left"
                                    >
                                        <LayoutDashboard size={15} />
                                        Мои бронирования
                                    </button>

                                    {user.role === "admin" && (
                                        <Link
                                            to="/admin/dashboard"
                                            className="flex items-center gap-3 px-4 py-3
                                                text-sm text-[#F3EEE5]/75
                                                hover:text-secondary hover:bg-white/5
                                                transition-colors"
                                        >
                                            <ShieldCheck size={15} />
                                            Панель администратора
                                        </Link>
                                    )}

                                    {user.role === "owner" && (
                                        <Link
                                            to="/owner/dashboard"
                                            className="flex items-center gap-3 px-4 py-3
                                                text-sm text-[#F3EEE5]/75
                                                hover:text-secondary hover:bg-white/5
                                                transition-colors"
                                        >
                                            <ShieldCheck size={15} />
                                            Кабинет ресторана
                                        </Link>
                                    )}

                                    <button
                                        onClick={logout}
                                        className="w-full flex items-center gap-3 px-4 py-3
                                            text-sm text-red-300
                                            hover:bg-white/5
                                            transition-colors border-t border-secondary/20
                                            text-left cursor-pointer"
                                    >
                                        <LogOut size={15} />
                                        Выйти
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <button
                                onClick={() => setAuthModalOpen(true)}
                                className="text-sm text-[#F3EEE5]/80
                                    hover:text-secondary transition-colors cursor-pointer"
                            >
                                Войти
                            </button>

                            <button
                                onClick={() => setAuthModalOpen(true)}
                                className="text-xs font-semibold tracking-wider
                                    uppercase px-6 py-3
                                    bg-secondary text-[#211B1D]
                                    hover:bg-[#E8D5AD]
                                    transition-soft cursor-pointer"
                            >
                                Регистрация
                            </button>
                        </>
                    )}
                </div>

                {/* Кнопка мобильного меню */}
                <div className="flex items-center md:hidden">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 text-secondary hover:text-[#F3EEE5]
                            transition-colors cursor-pointer"
                        aria-label="Открыть меню"
                    >
                        {mobileMenuOpen
                            ? <X size={25} />
                            : <Menu size={25} />
                        }
                    </button>
                </div>
            </div>

            {/* Мобильное меню */}
            {mobileMenuOpen && (
                <div className="md:hidden fixed inset-x-0 top-16
                    bg-[#211B1D] border-b border-secondary/30
                    py-6 px-6 z-50 shadow-xl
                    flex flex-col gap-5
                    animate-in slide-in-from-top duration-300"
                >
                    <Link
                        to="/"
                        className="text-base text-[#F3EEE5] hover:text-secondary"
                    >
                        Главная
                    </Link>

                    <Link
                        to="/search"
                        className="text-base text-[#F3EEE5] hover:text-secondary"
                    >
                        Рестораны
                    </Link>

                    <button
                        onClick={handleDashboardClick}
                        className="text-base text-[#F3EEE5]
                            hover:text-secondary text-left cursor-pointer"
                    >
                        Мои бронирования
                    </button>

                    <div className="border-t border-secondary/20 my-2" />

                    {user ? (
                        <div className="flex flex-col gap-4">

                            <div className="flex items-center gap-3">
                                <span className="w-10 h-10 rounded-full
                                    bg-secondary/15 border border-secondary/40
                                    flex items-center justify-center
                                    text-secondary text-sm uppercase"
                                >
                                    {user.name.charAt(0)}
                                </span>

                                <div>
                                    <p className="text-sm text-secondary">
                                        {user.name}
                                    </p>

                                    <p className="text-xs text-[#F3EEE5]/55">
                                        {user.email}
                                    </p>
                                </div>
                            </div>

                            <Link
                                to="/dashboard"
                                className="text-sm text-[#F3EEE5]/80 hover:text-secondary"
                            >
                                Мои бронирования
                            </Link>

                            {user.role === "admin" && (
                                <Link
                                    to="/admin/dashboard"
                                    className="text-sm text-[#F3EEE5]/80 hover:text-secondary"
                                >
                                    Панель администратора
                                </Link>
                            )}

                            {user.role === "owner" && (
                                <Link
                                    to="/owner/dashboard"
                                    className="text-sm text-[#F3EEE5]/80 hover:text-secondary"
                                >
                                    Кабинет ресторана
                                </Link>
                            )}

                            <button
                                onClick={logout}
                                className="text-sm text-red-300 text-left cursor-pointer"
                            >
                                Выйти
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">

                            <button
                                onClick={() => setAuthModalOpen(true)}
                                className="w-full border border-secondary/40
                                    text-[#F3EEE5] py-3 text-sm
                                    hover:border-secondary cursor-pointer"
                            >
                                Войти
                            </button>

                            <button
                                onClick={() => setAuthModalOpen(true)}
                                className="w-full bg-secondary text-[#211B1D]
                                    py-3 text-sm font-semibold
                                    hover:bg-[#E8D5AD] cursor-pointer"
                            >
                                Регистрация
                            </button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}
