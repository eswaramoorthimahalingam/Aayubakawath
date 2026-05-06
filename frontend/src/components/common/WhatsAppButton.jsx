import { FaWhatsapp } from "react-icons/fa";
import { useLocation } from "react-router-dom";

export default function WhatsAppButton() {
  const { pathname } = useLocation();
  const phoneNumber = "9443157282";
  const message = "Hello, I would like to know more about your products.";
  const isProductDetailPage = /^\/product\/[^/]+$/i.test(pathname);

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div
      className={`fixed bottom-40 left-4 sm:bottom-28 sm:left-8 z-50 flex-col items-center ${
        isProductDetailPage ? "hidden md:flex" : "flex"
      }`}
    >
      <button
        onClick={handleClick}
        className="relative bg-[#25D366] hover:bg-[#20BD5A] text-white p-3.5 rounded-full shadow-[var(--shadow-lg)]
          cursor-pointer border-0 outline-none transition-all duration-200 hover:scale-105 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={22} />
      </button>
    </div>
  );
}
