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
        <div className="mx-auto flex h-[78px] w-full max-w-[1600px] items-center gap-2 px-3 sm:px-5 lg:h-[82px] lg:px-6 xl:h-[86px] xl:px-8 2xl:px-10">
          {/* Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
            className="group flex min-w-0 shrink-0 items-center gap-2.5 xl:gap-3.5"
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
              className="hidden whitespace-nowrap font-display text-[24px] font-semibold leading-none tracking-tight text-[var(--color-text)] sm:block xl:text-[28px] 2xl:text-[31px]
              group-hover:text-[var(--color-sage)] transition-colors duration-300"
            >
              Aayubakwath
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="ml-1 hidden min-w-0 flex-1 items-center justify-center gap-1 rounded-2xl border border-[var(--color-border)] bg-white p-1 xl:flex">
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
                  className={`relative rounded-xl px-2.5 py-3 font-body text-[13px] font-semibold tracking-[0.03em] whitespace-nowrap transition-all duration-250 xl:px-3.5 xl:text-[14px]
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

          <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-1.5 xl:ml-0 xl:gap-2">
            <a
              href="/wishlist"
              onClick={(e) => {
                e.preventDefault();
                navigate("/wishlist");
              }}
              aria-label="Wishlist"
              className="relative hidden h-11 w-11 items-center justify-center rounded-xl
                text-[var(--color-text-secondary)] hover:text-[var(--color-text)]
                hover:bg-white border border-transparent hover:border-[var(--color-border)] transition-all duration-200 xl:flex"
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
              className="hidden h-11 w-11 items-center justify-center rounded-xl
                text-[var(--color-text-secondary)] hover:text-[var(--color-text)]
                hover:bg-white border border-transparent hover:border-[var(--color-border)] transition-all duration-200 xl:flex"
            >
              <FaTruck size={17} />
            </a>

            <div className="relative hidden xl:block" ref={dropRef}>
              <button
                onClick={() => setDropdown((v) => !v)}
                aria-label="Account"
                className="flex h-11 w-11 items-center justify-center rounded-xl
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
              className="relative hidden h-11 items-center gap-2.5 rounded-xl px-5
                bg-[var(--color-text)] text-white hover:bg-[var(--color-accent-hover)] hover:scale-[1.02]
                shadow-[0_10px_24px_rgba(17,24,39,0.22)] transition-all duration-300 ml-1
                text-[13px] font-semibold uppercase tracking-[0.12em] xl:flex 2xl:px-6"
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
              className="relative flex h-10 w-10 items-center justify-center rounded-lg
                text-[var(--color-text-secondary)] hover:text-[var(--color-text)]
                hover:bg-white transition-all duration-200 xl:hidden"
            >
              <FaShoppingCart size={15} />
              {cartCount > 0 && <BadgeCount n={cartCount} />}
            </button>

            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg
              text-[var(--color-text-secondary)] hover:text-[var(--color-text)]
              hover:bg-white transition-all duration-200 xl:hidden"
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
