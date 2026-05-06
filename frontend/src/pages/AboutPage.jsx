import React from "react";
import pure from "../assets/images/pure.jpeg";
import health from "../assets/images/health.jpeg";
import safe from "../assets/images/safe.jpeg";
import ht from "../assets/images/ht.jpeg";

const cards = [
  {
    title: "Pure Formulation",
    desc: "Ethically selected botanicals, inspired by traditional herbal mastery.",
    image: pure,
    color: "brand-red",
  },
  {
    title: "Daily Wellness",
    desc: "Architected for everyday vitality and metabolic balance.",
    image: health,
    color: "brand-gold",
  },
  {
    title: "Safe Nutrition",
    desc: "Gentle on the body, seamlessly integrating into your lifestyle.",
    image: safe,
    color: "emerald-600",
  },
  {
    title: "Trusted Quality",
    desc: "Rigorous standards ensuring clinical purity and consistency.",
    image: ht,
    color: "indigo-600",
  },
];

export default function OurBusiness() {
  return (
    <section className="py-10 md:py-16 bg-transparent">
      <div className="text-center max-w-3xl mx-auto mb-10 px-4">
        <h2
          className="display-heading text-[var(--color-text)] mb-4"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
        >
          The Philosophy Of Extraction
        </h2>
        <p className="text-gray-500 text-lg font-medium leading-relaxed">
          We harmonize native organic botanical wisdom with rigorous,
          state-of-the-art modern processing standards to yield uncompromising
          health solutions.
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-3 lg:px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <div
            key={i}
            className="group flex-1 flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            {/* Image — top */}
            <div className="flex h-64 md:h-72 w-full items-center justify-center overflow-hidden bg-transparent p-0">
              <img
                src={card.image}
                alt={card.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>

            {/* Text — bottom */}
            <div className="flex flex-col justify-center px-5 py-4">
              <h3 className="text-lg font-black text-[#111827] mb-1">
                {card.title}
              </h3>
              <p className="text-gray-500 font-medium leading-relaxed text-sm">
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
