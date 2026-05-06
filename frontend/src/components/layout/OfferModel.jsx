import { useState, useEffect } from "react";

export default function OfferModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem("offerSeen");

    if (!seen) {
      setTimeout(() => {
        setShow(true);
      }, 1000); // appear after 1s
    }
  }, []);

  const closeModal = () => {
    setShow(false);
    localStorage.setItem("offerSeen", "true");
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4">
      {/* Modal Card */}
      <div className="bg-white/95 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-xl transition-colors"
        >
          ✕
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Left Image */}
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1607083206968-13611e3d76db"
              alt="Offer"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Right Content */}
          <div className="md:w-1/2 p-8 flex flex-col justify-center">
            <span className="text-sm font-semibold text-[#111827] bg-gray-100 px-3 py-1 rounded-full w-fit mb-3 border border-gray-200">
              Welcome Offer
            </span>

            <h2 className="text-3xl font-semibold text-[#111827] mb-2 font-display">
              Get <span className="text-gray-400">10% OFF</span>
            </h2>

            <p className="text-gray-500 mb-5">
              Use this special coupon on your first purchase and save instantly.
            </p>

            {/* Coupon */}
            <div className="flex items-center gap-3 mb-5">
              <span className="px-5 py-2 border border-gray-200 text-[#111827] font-semibold tracking-wider rounded-lg bg-gray-50">
                FIRST10
              </span>
            </div>

            {/* CTA */}
            <a
              href="#products"
              onClick={closeModal}
              className="bg-[#111827] text-white text-center py-3 rounded-xl font-semibold hover:bg-black transition-colors"
            >
              Shop Now
            </a>

            <p className="text-xs text-gray-400 mt-3">
              Valid for first order only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
