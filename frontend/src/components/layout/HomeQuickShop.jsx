import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import cholesterolBottle from "../../assets/images/product-updated/cholesterol-og-white.png";
import sugarBottle from "../../assets/images/product-updated/blood-sugar-updated.png";
import vitalityBottle from "../../assets/images/product-updated/vitality-updated.png";
import wellnessBottle from "../../assets/images/product-updated/general-health-og-white.png";
import brainBottle from "../../assets/images/product-updated/brain-tonic-updated.png";

const quickLinks = [
  { label: "Bestsellers" },
  { label: "Heart Care", hasMenu: true, isNew: true },
  { label: "Brain Care", hasMenu: true },
  { label: "Sugar Balance", hasMenu: true, isNew: true },
  { label: "Combos" },
  { label: "Shop All" },
  { label: "About us" },
  { label: "Blog" },
];

const spotlightCards = [
  {
    title: "Heart Care",
    caption: "Daily support",
    image: cholesterolBottle,
    bg: "from-[#eff8b9] via-[#d9ef74] to-[#bdd94f]",
  },
  {
    title: "Sugar Care",
    caption: "Balance blend",
    image: sugarBottle,
    bg: "from-[#d8f3ff] via-[#9cdfef] to-[#68c3d8]",
  },
  {
    title: "Vitality",
    caption: "Power plus",
    image: vitalityBottle,
    bg: "from-[#ffe2c8] via-[#ffc387] to-[#f6a25e]",
  },
  {
    title: "General Wellness",
    caption: "Everyday care",
    image: wellnessBottle,
    bg: "from-[#e3f8d3] via-[#bde893] to-[#92cf53]",
  },
  {
    title: "Brain Tonic",
    caption: "Focus support",
    image: brainBottle,
    bg: "from-[#efe0ff] via-[#d3b8ff] to-[#b48ef4]",
  },
  {
    title: "Shop Combos",
    caption: "Save more",
    image: vitalityBottle,
    bg: "from-[#ffe4ed] via-[#ffc0d3] to-[#f596b6]",
  },
];

export default function HomeQuickShop() {
  const navigate = useNavigate();

  const goToShop = () => {
    navigate("/productListing");
  };

  return (
    <section className="w-full border-b border-[#efefef] bg-white">
      <div className="mx-auto w-full max-w-[1600px] px-3 sm:px-5 lg:px-6 xl:px-8 2xl:px-10">
        <div className="hidden xl:flex items-center justify-center gap-8 py-5 text-[15px] text-[var(--color-text)] bg-white">
          {quickLinks.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={goToShop}
              className="relative inline-flex items-center gap-1.5 bg-white transition-colors duration-200 hover:text-[var(--color-sage-dark)]"
            >
              {item.isNew && (
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full bg-[#4ec5db] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                  New
                </span>
              )}
              <span>{item.label}</span>
              {item.hasMenu && <ChevronDown size={15} strokeWidth={2.2} />}
            </button>
          ))}
        </div>

        <div className="xl:hidden -mx-3 overflow-x-auto bg-white px-3 pb-2 pt-4 scrollbar-none sm:-mx-5 sm:px-5">
          <div className="flex min-w-max items-center gap-2.5">
            {quickLinks.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={goToShop}
                className="relative inline-flex items-center gap-1 rounded-full border border-[var(--color-border)]
                  bg-white px-4 py-2 text-sm text-[var(--color-text)] shadow-[var(--shadow-sm)]"
              >
                <span>{item.label}</span>
                {item.hasMenu && <ChevronDown size={14} strokeWidth={2.2} />}
                {item.isNew && (
                  <span className="absolute -top-2 right-2 rounded-full bg-[#4ec5db] px-2 py-[2px] text-[9px] font-semibold uppercase tracking-[0.14em] text-white">
                    New
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="-mx-3 overflow-x-auto bg-white px-3 py-5 scrollbar-none sm:-mx-5 sm:px-5 lg:-mx-6 lg:px-6 xl:-mx-8 xl:px-8 2xl:-mx-10 2xl:px-10">
          <div className="flex min-w-max gap-4 xl:justify-center xl:gap-5">
            {spotlightCards.map((card) => (
              <article
                key={card.title}
                className="w-[168px] shrink-0 rounded-[28px] bg-white px-2 pb-2 pt-3 text-center transition-transform duration-300 hover:-translate-y-1 sm:w-[184px]"
              >
                <button
                  type="button"
                  onClick={goToShop}
                  className="group block w-full"
                >
                  <div className="relative mx-auto flex h-[164px] w-full items-center justify-center overflow-hidden rounded-[32px] bg-[#fdfdf9]">
                    <div
                      className={`absolute left-1/2 top-1/2 h-[104px] w-[104px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br ${card.bg} blur-[1px]`}
                    />
                    <div className="absolute left-[26px] top-[26px] h-9 w-9 rounded-full bg-white/55 blur-sm" />
                    <div className="absolute bottom-[22px] right-[30px] h-6 w-6 rounded-full bg-white/55 blur-sm" />
                    <img
                      src={card.image}
                      alt={card.title}
                      className="relative z-10 h-[138px] w-auto object-contain drop-shadow-[0_12px_24px_rgba(17,24,39,0.16)] transition-transform duration-300 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="pt-3">
                    <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                      {card.caption}
                    </p>
                    <div
                      className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full border
                        border-[var(--color-border-strong)] px-4 py-2.5 text-[13px] font-medium text-[var(--color-text)]
                        transition-colors duration-200 group-hover:border-[var(--color-sage)] group-hover:text-[var(--color-sage-dark)]"
                    >
                      <span>{card.title}</span>
                      <ChevronRight size={16} strokeWidth={2.1} />
                    </div>
                  </div>
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
