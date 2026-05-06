import React from "react";
import panelBg from "../../assets/images/luxury_hero_bg2.png";

export default function LoginBrandingPanel() {
  return (
    <div className="lg:w-[42%] relative hidden lg:block overflow-hidden bg-[#111827]">
      <img
        src={panelBg}
        alt="Luxury Experience"
        className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/90" />

      <div className="absolute top-12 left-10 flex items-center gap-3 z-10">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/10 border border-white/20 backdrop-blur-md">
          <span className="text-white font-semibold text-lg">A</span>
        </div>
        <span className="text-white font-semibold text-xl tracking-tight">
          Aayubakwath
        </span>
      </div>

      <div className="absolute bottom-12 left-10 right-10 z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-6 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-white relative">
            <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-40"></span>
          </span>
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-white/70">
            Premium Wellness
          </span>
        </div>
        <h2 className="text-[36px] font-semibold text-white leading-[1.1] mb-5 tracking-tight">
          Absolute
          <br />
          <span className="italic font-light">Excellence.</span>
        </h2>
        <p className="text-white/60 font-medium text-[15px] leading-relaxed max-w-[280px]">
          A curated experience of purity, wellness, and unparalleled
          quality.
        </p>
      </div>
    </div>
  );
}
