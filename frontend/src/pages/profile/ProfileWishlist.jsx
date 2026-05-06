import React from "react";

export default function ProfileWishlist({ wishlist, onRemove }) {
  if (wishlist.length === 0) {
    return (
      <div className="fade-up bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
          <svg viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-[#111827] mb-2">Your wishlist is empty</h3>
        <p className="text-gray-400 text-sm">Start adding items you love!</p>
      </div>
    );
  }

  return (
    <div className="fade-up grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {wishlist.map((item, i) => (
        <div
          key={item.id}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-lg transition-all duration-300 fade-up"
          style={{ animationDelay: `${i * 0.08}s` }}
        >
          <div className="relative overflow-hidden h-52">
            <img src={item.image} alt={item.name} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <button
              onClick={() => onRemove(item.id)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-400 hover:text-red-500 hover:scale-110 transition-all"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>
          <div className="p-5">
            <h4 className="font-semibold text-[#111827] mb-1">{item.name}</h4>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg font-semibold text-[#111827]">${item.price.toFixed(2)}</span>
              <span className="text-sm text-gray-400 line-through">${item.originalPrice.toFixed(2)}</span>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                {Math.round((1 - item.price / item.originalPrice) * 100)}% off
              </span>
            </div>
            <button className="w-full py-2.5 rounded-xl text-white text-sm font-semibold tracking-wide transition-all hover:opacity-90 active:scale-[0.98] bg-[#111827]">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
