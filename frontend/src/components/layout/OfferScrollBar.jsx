import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getOfferBars } from "../../services/offerService";

export default function OfferScrollBar() {
  const { data: offers = [], isLoading: loading, error } = useQuery({
    queryKey: ["offerBar"],
    queryFn: getOfferBars,
  });

  if (error) return null;

  const repeated = [...offers, ...offers];

  if (loading) return <div className="py-4 text-center font-body text-xs uppercase tracking-[0.1em] text-[var(--color-text-muted)]">Loading offers...</div>;
  if (offers.length === 0)
    return <div className="py-4 text-center font-body text-lg uppercase tracking-[0.1em] text-[var(--color-text-muted)]">No offers available</div>;

  return (
    <div className="group relative flex h-14 w-full items-center overflow-hidden sm:h-16">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white via-white/90 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white via-white/90 to-transparent" />

      <div className="flex min-w-max animate-offer-marquee group-hover:[animation-play-state:paused]">
        {repeated.map((offer, i) => (
          <span
            key={`${offer.id || offer.offerText || offer.text}-${i}`}
            className="inline-flex items-center gap-4 px-6 font-body text-[0.8rem] font-medium uppercase tracking-[0.16em] whitespace-nowrap text-[var(--color-text)] sm:gap-5 sm:px-8 sm:text-[0.9rem]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-sage)] opacity-60" />
            {offer.text || offer.offerText}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes offerMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-offer-marquee {
          animation: offerMarquee 28s linear infinite;
          will-change: transform;
        }
      `}</style>
    </div>
  );
}
