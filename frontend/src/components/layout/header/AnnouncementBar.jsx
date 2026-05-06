import React, { useMemo } from "react";

const fallbackItems = [
  { icon: "•", text: "More on combos" },
  { icon: "🌿", text: "100% herbal & natural formula" },
  { icon: "💪", text: "Built for strength & energy" },
  { icon: "🎯", text: "Wellness you can trust" },
  { icon: "⚡", text: "Revitalize your routine" },
];

export default function AnnouncementBar({ announcements }) {
  const items = useMemo(() => {
    const apiItems = announcements
      .map((item) => (item?.text || item?.title || "").trim())
      .filter(Boolean)
      .filter((message, index, list) => {
        const normalized = message.toLowerCase();
        return (
          list.findIndex((entry) => entry.toLowerCase() === normalized) === index
        );
      })
      .map((text, index) => ({
        icon: index % 2 === 0 ? "•" : "✦",
        text,
      }));

    return apiItems.length > 0 ? apiItems : fallbackItems;
  }, [announcements]);

  const repeatedItems = [...items, ...items];

  return (
    <div className="relative z-50 overflow-hidden border-y border-[#efefef] bg-white">
      <div className="group relative mx-auto flex h-10 w-full max-w-[1920px] items-center overflow-hidden sm:h-11">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white via-white/90 to-transparent sm:w-12" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white via-white/90 to-transparent sm:w-12" />

        <div className="flex min-w-max animate-top-marquee group-hover:[animation-play-state:paused]">
          {repeatedItems.map((item, index) => (
            <span
              key={`${item.text}-${index}`}
              className="inline-flex items-center gap-4 px-5 font-body text-[0.78rem] font-medium uppercase tracking-[0.18em] whitespace-nowrap text-[var(--color-text)] sm:gap-5 sm:px-8 sm:text-[0.88rem]"
            >
              <span className="text-[var(--color-sage)] opacity-75">
                {item.icon}
              </span>
              {item.text}
            </span>
          ))}
        </div>

        <style>{`
          @keyframes topMarquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-top-marquee {
            animation: topMarquee 30s linear infinite;
            will-change: transform;
          }
        `}</style>
      </div>
    </div>
  );
}
