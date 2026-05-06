import React from "react";

export default function ProfileHero({ user, orders, wishlist, addresses }) {
  const nameParts = (user.name || "").split(" ");
  const firstName = nameParts[0] || "Guest";
  const lastName = nameParts[1] || "";
  const avatar = nameParts[0]?.charAt(0)?.toUpperCase() || "G";

  return (
    <div className="relative overflow-hidden bg-gray-50 border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row min-h-[220px]">
        {/* Left — dark block */}
        <div className="relative lg:w-[55%] overflow-hidden px-10 py-12 flex flex-col justify-between bg-[#111827]">
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-10 bg-white/10" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg,transparent,transparent 28px,rgba(255,255,255,0.015) 28px,rgba(255,255,255,0.015) 29px)",
            }}
          />

          <div className="relative z-10 flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl shrink-0 flex items-center justify-center text-4xl font-semibold bg-white text-[#111827] shadow-lg">
              {avatar}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-5 h-px bg-gray-400" />
                <span className="text-[9px] tracking-[4px] uppercase text-gray-400 font-semibold">
                  My Account
                </span>
              </div>
              <h1 className="text-3xl font-semibold text-white leading-tight">
                {firstName} <span className="text-gray-300">{lastName}</span>
              </h1>
              <p className="text-white/40 text-xs mt-1">{user.email}</p>
            </div>
          </div>

          <div
            className="hidden lg:block absolute top-0 -right-8 w-16 h-full z-20 bg-gray-50"
            style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%, 40% 0)" }}
          />
        </div>

        {/* Right — stats */}
        <div className="flex-1 flex items-center justify-around px-10 py-10 gap-4">
          {[
            {
              label: "Total Orders",
              value: orders.length,
              color: "#111827",
              bg: "rgba(0,0,0,0.05)",
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              ),
            },
            {
              label: "Wishlist",
              value: wishlist.length,
              color: "#111827",
              bg: "rgba(0,0,0,0.05)",
              icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0" className="w-5 h-5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              ),
            },
            {
              label: "Addresses",
              value: addresses.length,
              color: "#111827",
              bg: "rgba(0,0,0,0.05)",
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              ),
            },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: s.bg, color: s.color }}>
                {s.icon}
              </div>
              <div className="text-center">
                <p className="text-3xl font-semibold" style={{ color: s.color }}>
                  {s.value}
                </p>
                <p className="text-gray-400 text-xs tracking-widest uppercase font-medium mt-0.5">
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
