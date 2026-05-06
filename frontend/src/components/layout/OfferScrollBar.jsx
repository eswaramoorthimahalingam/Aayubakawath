import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getOfferBars } from "../../services/offerService";

export default function OfferScrollBar() {
  const { data: offers = [], isLoading: loading, error } = useQuery({
    queryKey: ["offerBar"],
    queryFn: getOfferBars,
  });

  if (error) return null;

  const repeated = [...offers, ...offers, ...offers, ...offers];

  if (loading) return <div className="text-center py-4 text-[var(--color-text-muted)] font-body text-xs tracking-[0.1em] uppercase">Loading offers...</div>;
  if (offers.length === 0)
    return <div className="text-center py-4 text-[var(--color-text-muted)] font-body text-lg tracking-[0.1em] uppercase">No offers available</div>;

  return (
    <div className="w-full h-16 sm:h-[72px] overflow-hidden flex items-center group justify-center relative">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {repeated.map((offer, i) => (
          <span
            key={i}
            className="inline-flex items-center text-[1rem] sm:text-[1rem] font-medium uppercase tracking-[0.18em]
              text-[var(--color-text)] whitespace-nowrap mr-16"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-sage)] mr-5 opacity-60"></span>
            {offer.text || offer.offerText}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(-25%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
}