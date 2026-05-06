import logo from "../../assets/images/logo.jpg";
import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaUser, FaTruck } from "react-icons/fa";
import { Menu } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../../services/cartService";
import { getWishlist } from "../../services/wishlistService";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import { getAnnouncements } from "../../services/announcementService";
import { useAuth } from "../../hooks/useAuth";
import AnnouncementBar from "./header/AnnouncementBar";
import HeaderSearch from "./header/HeaderSearch";
import MobileMenu from "./header/MobileMenu";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/aboutpage" },
  { label: "Shop", href: "/productListing" },
  { label: "Bulk Order", href: "/dealership" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const BadgeCount = ({ n }) => (
  <span
    className="absolute -top-1 -right-1.5 min-w-[16px] h-4 flex items-center justify-center
    rounded-full bg-[var(--color-sage)] text-white font-semibold text-[9px] leading-none"
  >
    {n}
  </span>
);

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [dropdown, setDropdown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropRef = useRef(null);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target))
        setDropdown(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const { data: cartData } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    retry: false,
    enabled: isAuthenticated,
  });
  const cartCount =
    cartData?.data?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const { data: wishlistData } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
    retry: false,
    enabled: isAuthenticated,
  });
  const wishlistCount = wishlistData?.data?.length || 0;

  const { data: announcements = [] } = useQuery({
    queryKey: ["announcements"],
    queryFn: getAnnouncements,
  });

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    setDropdown(false);
    navigate("/login");
  };

  const headerBg = scrolled
    ? "bg-white/96 backdrop-blur-xl shadow-[0_10px_28px_rgba(15,23,42,0.05)] border-b border-[var(--color-border)]"
    : "bg-white border-b border-[var(--color-border)]";

  return (
    <>
      <AnnouncementBar announcements={announcements} />

      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${headerBg}`}
      >
        <div className="max-w-[1680px] mx-auto px-2.5 sm:px-8 lg:px-12 2xl:px-16 h-[86px] flex items-center gap-2 sm:gap-4 lg:gap-5">
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
            className="flex items-center gap-3.5 shrink-0 group"
          >
            <div
              className="w-12 h-12 overflow-hidden rounded-xl border border-[var(--color-border)] flex-shrink-0
              shadow-[0_6px_16px_rgba(15,23,42,0.08)] group-hover:border-[var(--color-sage)] transition-colors duration-300"
            >
              <img
                src={logo}
                className="w-full h-full object-cover"
                alt="Aayubakwath"
              />
            </div>
            <span
              className="font-display text-[31px] font-semibold tracking-tight hidden sm:block text-[var(--color-text)]
              group-hover:text-[var(--color-sage)] transition-colors duration-300"
            >
              Aayubakwath
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex flex-1 min-w-0 items-center justify-center gap-1 ml-2 bg-white border border-[var(--color-border)] rounded-2xl p-1">
            {navLinks.map(({ label, href }) => {
              const active = isActive(href);
              return (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(href);
                  }}
                  className={`relative px-3 xl:px-4 py-3 font-body text-[14px] xl:text-[15px] font-semibold tracking-[0.03em]
                    transition-all duration-250 rounded-xl whitespace-nowrap
                    ${
                      active
                        ? "text-[var(--color-text)] bg-white"
                        : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-white"
                    }`}
                >
                  {label}
                  {active && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--color-sage)]" />
                  )}
                </a>
              );
            })}
          </nav>

          <HeaderSearch />

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <a
              href="/wishlist"
              onClick={(e) => {
                e.preventDefault();
                navigate("/wishlist");
              }}
              aria-label="Wishlist"
              className="hidden lg:flex relative w-12 h-12 items-center justify-center rounded-xl
                text-[var(--color-text-secondary)] hover:text-[var(--color-text)]
                hover:bg-white border border-transparent hover:border-[var(--color-border)] transition-all duration-200"
            >
              <FaHeart size={17} />
              {wishlistCount > 0 && <BadgeCount n={wishlistCount} />}
            </a>

            <a
              href="/trackorder"
              onClick={(e) => {
                e.preventDefault();
                navigate("/trackorder");
              }}
              aria-label="Track order"
              className="hidden lg:flex w-12 h-12 items-center justify-center rounded-xl
                text-[var(--color-text-secondary)] hover:text-[var(--color-text)]
                hover:bg-white border border-transparent hover:border-[var(--color-border)] transition-all duration-200"
            >
              <FaTruck size={17} />
            </a>

            <div className="hidden lg:block relative" ref={dropRef}>
              <button
                onClick={() => setDropdown((v) => !v)}
                aria-label="Account"
                className="w-12 h-12 flex items-center justify-center rounded-xl
                  text-[var(--color-text-secondary)] hover:text-[var(--color-text)]
                  hover:bg-white border border-transparent hover:border-[var(--color-border)] transition-all duration-200"
              >
                <FaUser size={17} />
              </button>
              <AnimatePresence>
                {dropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute right-0 top-[calc(100%+8px)] w-56 bg-white z-50 text-left
                      border border-[var(--color-border)] shadow-[var(--shadow-xl)] py-1.5 rounded-xl overflow-hidden"
                  >
                    {isAuthenticated ? (
                      <>
                        <a
                          href="/profile"
                          onClick={(e) => {
                            e.preventDefault();
                            setDropdown(false);
                            navigate("/profile");
                          }}
                          className="flex items-center gap-2.5 px-4 py-3 text-[13px] font-medium text-[var(--color-text-secondary)]
                            hover:bg-white hover:text-[var(--color-text)] transition-colors"
                        >
                          <FaUser size={12} className="text-[var(--color-text-muted)]" /> My Profile
                        </a>
                        <a
                          href="/wishlist"
                          onClick={(e) => {
                            e.preventDefault();
                            setDropdown(false);
                            navigate("/wishlist");
                          }}
                          className="flex items-center gap-2.5 px-4 py-3 text-[13px] font-medium text-[var(--color-text-secondary)]
                            hover:bg-white hover:text-[var(--color-text)] transition-colors"
                        >
                          <FaHeart size={12} className="text-[var(--color-text-muted)]" /> Wishlist
                        </a>
                        <div className="h-px bg-[var(--color-border)] mx-3 my-1" />
                        <button
                          onClick={handleLogout}
                          className="w-full text-left flex items-center gap-2.5 px-4 py-3 text-[13px]
                            font-medium text-[var(--color-terracotta)] hover:bg-[var(--color-error-bg)] transition-colors"
                        >
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <a
                          href="/login"
                          onClick={(e) => {
                            e.preventDefault();
                            setDropdown(false);
                            navigate("/login");
                          }}
                          className="block px-4 py-3 text-[13px] font-medium text-[var(--color-text-secondary)]
                            hover:bg-white transition-colors"
                        >
                          Sign In
                        </a>
                        <a
                          href="/register"
                          onClick={(e) => {
                            e.preventDefault();
                            setDropdown(false);
                            navigate("/register");
                          }}
                          className="block px-4 py-3 text-[13px] font-medium text-[var(--color-text-secondary)]
                            hover:bg-white transition-colors"
                        >
                          Create Account
                        </a>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => navigate("/cart")}
              aria-label="Cart"
              className="relative hidden lg:flex items-center gap-2.5 h-12 px-7 rounded-xl
                bg-[var(--color-text)] text-white hover:bg-[var(--color-accent-hover)] hover:scale-[1.02]
                shadow-[0_10px_24px_rgba(17,24,39,0.22)] transition-all duration-300 ml-1
                text-[14px] font-semibold uppercase tracking-[0.12em]"
            >
              <FaShoppingCart size={15} />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-white/15 text-white">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => navigate("/cart")}
              aria-label="Cart"
              className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg
                text-[var(--color-text-secondary)] hover:text-[var(--color-text)]
                hover:bg-white transition-all duration-200"
            >
              <FaShoppingCart size={15} />
              {cartCount > 0 && <BadgeCount n={cartCount} />}
            </button>

            <button
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg
              text-[var(--color-text-secondary)] hover:text-[var(--color-text)]
              hover:bg-white transition-all duration-200"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navigate={navigate}
        isActive={isActive}
        isLoggedIn={isAuthenticated}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onLogout={handleLogout}
      />
    </>
  );
}
