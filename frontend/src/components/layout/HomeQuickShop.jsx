import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import cholesterolBottle from "../../assets/images/product-updated/cholesterol-og-white.png";
import sugarBottle from "../../assets/images/product-updated/blood-sugar-updated.png";
import vitalityBottle from "../../assets/images/product-updated/vitality-updated.png";
import wellnessBottle from "../../assets/images/product-updated/general-health-og-white.png";
import brainBottle from "../../assets/images/product-updated/brain-tonic-updated.png";
import cardiacLabel from "../../assets/images/quick-shop-labels/cardiac.jpeg";
import diabeticLabel from "../../assets/images/quick-shop-labels/diabetic.jpeg";
import generalLabel from "../../assets/images/quick-shop-labels/general.jpeg";
import vitalityLabel from "../../assets/images/quick-shop-labels/vitality.jpeg";
import brainLabel from "../../assets/images/quick-shop-labels/brain.jpeg";
import comboLabel from "../../assets/images/quick-shop-labels/combo.jpeg";

const quickLinks = [
  { label: "Bestsellers" },
  { label: "Heart Care", hasMenu: true, isNew: true },
  { label: "Brain Care", hasMenu: true },
  { label: "Sugar Balance", hasMenu: true, isNew: true },
  { label: "Combos" },
  { label: "Shop All" },
];

const spotlightCards = [
  {
    title: "Heart Care",
    caption: "Diabetic support",
    image: cholesterolBottle,
    labelImage: cardiacLabel,
    imageClassName: "h-[140px]",
    bg: "from-[#eff8b9] via-[#d9ef74] to-[#bdd94f]",
  },
  {
    title: "Sugar Care",
    caption: "Balance blend",
    image: sugarBottle,
    labelImage: diabeticLabel,
    imageClassName: "h-[132px]",
    bg: "from-[#d8f3ff] via-[#9cdfef] to-[#68c3d8]",
  },
  {
    title: "Vitality",
    caption: "Energy & Stamina",
    image: vitalityBottle,
    labelImage: vitalityLabel,
    imageClassName: "h-[146px]",
    bg: "from-[#ffe2c8] via-[#ffc387] to-[#f6a25e]",
  },
  {
    title: "General Wellness",
    caption: "Everyday care",
    image: wellnessBottle,
    labelImage: generalLabel,
    imageClassName: "h-[138px]",
    bg: "from-[#e3f8d3] via-[#bde893] to-[#92cf53]",
  },
  {
    title: "Brain Tonic",
    caption: "cognitive Performance",
    image: brainBottle,
    labelImage: brainLabel,
    imageClassName: "h-[138px]",
    bg: "from-[#efe0ff] via-[#d3b8ff] to-[#b48ef4]",
  },
  {
    title: "Shop Combos",
    caption: "Wellness Care",
    image: vitalityBottle,
    labelImage: comboLabel,
    imageClassName: "h-[146px]",
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
                className="flex w-[196px] shrink-0 flex-col rounded-[28px] bg-white px-2 pb-3 pt-3 text-center transition-transform duration-300 hover:-translate-y-1 sm:w-[208px]"
              >
                <button
                  type="button"
                  onClick={goToShop}
                  className="group flex w-full flex-col items-center"
                >
                  <div className="relative mx-auto flex h-[168px] w-full items-center justify-center overflow-hidden rounded-[32px] bg-[#fdfdf9]">
                    <div
                      className={`absolute left-1/2 top-1/2 h-[104px] w-[104px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br ${card.bg} blur-[1px]`}
                    />
                    <div className="absolute left-[26px] top-[26px] h-9 w-9 rounded-full bg-white/55 blur-sm" />
                    <div className="absolute bottom-[22px] right-[30px] h-6 w-6 rounded-full bg-white/55 blur-sm" />
                    <img
                      src={card.image}
                      alt={card.title}
                      className={`relative z-10 w-auto object-contain object-center drop-shadow-[0_12px_24px_rgba(17,24,39,0.16)] transition-transform duration-300 group-hover:scale-[1.04] ${card.imageClassName}`}
                    />
                  </div>
                  <div className="flex w-full flex-col items-center pt-3">
                    <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                      {card.caption}
                    </p>
                    <div className="mx-auto mt-3 w-[72%] overflow-hidden rounded-[18px] border border-transparent bg-transparent shadow-none">
                      <img
                        src={card.labelImage}
                        alt={`${card.title} label`}
                        className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                    <div
                      className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border
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
