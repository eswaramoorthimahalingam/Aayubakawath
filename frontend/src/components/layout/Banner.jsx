import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getHomeBanners } from "../../services/bannerService";
import heroBg1 from "../../assets/images/Cholesterol.jpeg";
import heroBg2 from "../../assets/images/vitality.jpeg";
import heroBg3 from "../../assets/images/sugar.jpeg";
import heroBg4 from "../../assets/images/homebanner.jpeg";
import cholesterolBottle from "../../assets/images/product-updated/cholesterol-og-white.png";
import sugarBottle from "../../assets/images/product-updated/blood-sugar-updated.png";
import vitalityBottle from "../../assets/images/product-updated/vitality-updated.png";
import wellnessBottle from "../../assets/images/product-updated/general-health-og-white.png";
import brainBottle from "../../assets/images/product-updated/brain-tonic-updated.png";
import herbsImage from "../../assets/images/ingredients/amla.png";
import rootsImage from "../../assets/images/ingredients/ashwagandha.png";
import brahmiImage from "../../assets/images/ingredients/brahmi.png";

const INTERVAL = 6000;
const hasBannerApi = Boolean(import.meta.env.VITE_API_BASE_URL);

const promoSlides = [
  {
    id: "welcome-offer",
    type: "promo",
    theme:
      "bg-[linear-gradient(90deg,#152d1c_0%,#213e1f_38%,#365722_100%)] text-white",
    badge: "Welcome Offer",
    eyebrow: "Starter Deal",
    heading: "Get 30% Off For Your First Order",
    subheading: "Ayurvedic essentials to begin your wellness routine.",
    code: "NEW30",
    note: "Applies on first purchase only",
    primaryImage: wellnessBottle,
    secondaryImage: brainBottle,
    tertiaryImage: vitalityBottle,
    accent: "bg-[#d7b857] text-[#1d2e17]",
  },
  {
    id: "brain-tonic",
    type: "split",
    theme: "bg-white text-[#111111]",
    leftPanel: "bg-[#8faa13] text-white",
    eyebrow: "Clean Formulation",
    heading: "Pure. Clean. Powerful.",
    subheading: "Next-Gen Health Nutrition made for modern daily focus.",
    primaryImage: brainBottle,
    centerImage: brahmiImage,
    secondaryImage: herbsImage,
    accentLabel: "Brain Tonic",
  },
  {
    id: "summer-sale",
    type: "seasonal",
    theme:
      "bg-[linear-gradient(90deg,#bfd133_0%,#effa5a_48%,#d8ef46_100%)] text-[#111111]",
    eyebrow: "Best Offer",
    heading: "Daily Wellness Health Supplement",
    subheading: "For hot summer days, enjoy flat 20% off across featured blends.",
    code: "HURRY26",
    primaryImage: sugarBottle,
    secondaryImage: brainBottle,
    tertiaryImage: cholesterolBottle,
    quaternaryImage: vitalityBottle,
    detailImageLeft: herbsImage,
    detailImageRight: rootsImage,
  },
];

const imageFallbackSlides = [
  { id: "legacy-1", image: heroBg1, alt: "Cholesterol wellness banner" },
  { id: "legacy-2", image: heroBg2, alt: "Vitality wellness banner" },
  { id: "legacy-3", image: heroBg3, alt: "Blood sugar wellness banner" },
  { id: "legacy-4", image: heroBg4, alt: "Aayubakwath wellness banner" },
];

function SlideShell({ children, className = "" }) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden rounded-none sm:rounded-[20px] ${className}`}
    >
      {children}
    </div>
  );
}

function PromoSlide({ slide }) {
  return (
    <SlideShell className={slide.theme}>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -left-8 top-10 h-20 w-20 rounded-full border border-[#d9bd63]/60" />
        <div className="absolute left-[18%] top-0 h-40 w-8 rotate-[24deg] rounded-full bg-[#d9bd63]/80 blur-[1px]" />
        <div className="absolute bottom-8 right-10 h-28 w-28 rotate-45 border border-[#d9bd63]/35" />
        <div className="absolute right-[5%] top-[18%] h-3 w-3 rounded-full bg-[#f7e79d]" />
        <div className="absolute left-[31%] bottom-10 h-24 w-6 -rotate-45 rounded-full bg-[#e0c76f]/90" />
      </div>

      <div className="relative grid h-full gap-6 px-4 py-6 sm:px-7 sm:py-7 lg:grid-cols-[1.1fr_1fr_1.25fr] lg:items-center lg:px-10 lg:py-8 xl:px-14">
        <div className="flex flex-col items-start justify-center gap-3 lg:gap-4">
          <div className="rounded-[28px] bg-[#ff1e12] px-5 py-4 text-center shadow-[0_16px_30px_rgba(0,0,0,0.24)] sm:px-6">
            <p className="text-[1.6rem] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-[2rem] lg:text-[2.4rem]">
              Welcome
            </p>
            <p className="mt-1 text-[1.2rem] font-semibold leading-none tracking-[-0.03em] sm:text-[1.55rem] lg:text-[1.85rem]">
              Offers
            </p>
          </div>
          <div className="max-w-[220px] text-white/82">
            <p className="text-xs font-medium uppercase tracking-[0.22em]">
              {slide.eyebrow}
            </p>
          </div>
        </div>

        <div className="relative flex min-h-[170px] items-end justify-center sm:min-h-[220px] lg:min-h-[260px]">
          <div className="absolute bottom-0 h-[64px] w-[82%] rounded-[999px] bg-[radial-gradient(circle,#e8cf7b_0%,#c18a3a_52%,#7a4d24_100%)] shadow-[0_18px_42px_rgba(0,0,0,0.24)] sm:h-[84px]" />
          <div className="absolute bottom-8 h-[42px] w-[58%] rounded-[999px] bg-[radial-gradient(circle,#f6e69c_0%,#d8ab54_56%,#83572d_100%)] shadow-[0_16px_30px_rgba(0,0,0,0.18)] sm:bottom-11 sm:h-[56px]" />
          <div className="relative z-10 flex items-end justify-center gap-1 sm:gap-3">
            {[slide.primaryImage, slide.secondaryImage, slide.tertiaryImage].map(
              (image, index) => (
                <img
                  key={`${slide.id}-${index}`}
                  src={image}
                  alt={slide.heading}
                  className={`w-[84px] object-contain drop-shadow-[0_18px_32px_rgba(0,0,0,0.28)] sm:w-[104px] lg:w-[122px] ${
                    index === 1
                      ? "translate-y-0"
                      : index === 0
                        ? "translate-y-2 rotate-[-4deg]"
                        : "translate-y-2 rotate-[4deg]"
                  }`}
                />
              ),
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center gap-3 lg:items-end lg:text-right">
          <div className="rounded-[26px] border border-[#d7b857]/55 bg-white/5 px-4 py-4 backdrop-blur-[2px] sm:px-6 sm:py-5">
            <h2 className="display-heading text-[2rem] font-semibold leading-[0.98] tracking-[-0.05em] text-white sm:text-[2.6rem] lg:text-[3.2rem] xl:text-[3.8rem]">
              Get 30% For
              <span className="block mt-2">First Order</span>
            </h2>
          </div>
          <p className="max-w-[460px] text-sm text-white/82 sm:text-base">
            {slide.subheading}
          </p>
          <div className="flex flex-wrap items-center gap-3 lg:justify-end">
            <div className={`rounded-full px-4 py-2 text-sm font-semibold ${slide.accent}`}>
              Code: {slide.code}
            </div>
            <p className="text-xs uppercase tracking-[0.16em] text-white/72">
              {slide.note}
            </p>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

function SplitSlide({ slide }) {
  return (
    <SlideShell className={slide.theme}>
      <div className="grid h-full lg:grid-cols-[1.1fr_1.4fr]">
        <div
          className={`relative overflow-hidden px-4 py-6 sm:px-7 sm:py-7 lg:px-9 lg:py-8 ${slide.leftPanel}`}
        >
          <div className="absolute -right-16 top-0 h-full w-32 skew-x-[-32deg] bg-white/95" />
          <div className="relative z-10 flex h-full flex-col justify-center gap-4 sm:flex-row sm:items-center sm:gap-6 lg:gap-8">
            <img
              src={slide.primaryImage}
              alt={slide.accentLabel}
              className="mx-auto w-[110px] rotate-[-8deg] object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.28)] sm:mx-0 sm:w-[130px] lg:w-[160px]"
            />
            <div className="text-white">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/75">
                {slide.eyebrow}
              </p>
              <h2 className="display-heading mt-2 text-[2rem] italic leading-[1.02] tracking-[-0.04em] text-white sm:text-[2.4rem] lg:text-[3.2rem] xl:text-[3.6rem]">
                Pure...
                <span className="mt-3 block">Clean...</span>
                <span className="mt-3 block">Powerful...</span>
              </h2>
            </div>
          </div>
        </div>

        <div className="relative px-4 py-6 sm:px-7 sm:py-7 lg:px-10 lg:py-8">
          <div className="relative z-10 grid h-full items-center gap-4 sm:grid-cols-[0.9fr_1.2fr_0.9fr] lg:gap-6">
            <div className="order-2 flex justify-center sm:order-1">
              <img
                src={slide.centerImage}
                alt="Natural herbs"
                className="w-[120px] object-contain drop-shadow-[0_12px_26px_rgba(0,0,0,0.16)] sm:w-[160px] lg:w-[190px]"
              />
            </div>
            <div className="order-1 text-center sm:order-2">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                {slide.accentLabel}
              </p>
              <h2 className="display-heading mt-2 text-[2rem] italic leading-[1.05] tracking-[-0.05em] text-[#0f0f0f] sm:text-[2.5rem] lg:text-[3.3rem] xl:text-[3.9rem]">
                Next-Gen
                <span className="mt-3 block">Health</span>
                <span className="mt-3 block">Nutrition</span>
              </h2>
              <p className="mx-auto mt-4 max-w-[420px] text-sm text-[var(--color-text-secondary)] sm:text-base">
                {slide.subheading}
              </p>
            </div>
            <div className="order-3 flex justify-center sm:justify-end">
              <img
                src={slide.secondaryImage}
                alt="Ayurvedic ingredients"
                className="w-[128px] object-contain drop-shadow-[0_12px_26px_rgba(0,0,0,0.16)] sm:w-[170px] lg:w-[200px]"
              />
            </div>
          </div>
        </div>
      </div>
    </SlideShell>
  );
}

function SeasonalSlide({ slide }) {
  return (
    <SlideShell className={slide.theme}>
      <div className="relative grid h-full gap-6 px-4 py-6 sm:px-7 sm:py-7 lg:grid-cols-[1fr_1.2fr_1fr] lg:items-center lg:px-10 lg:py-8 xl:px-14">
        <div className="flex items-center justify-center gap-2 sm:gap-4">
          <img
            src={slide.primaryImage}
            alt="Blood sugar support"
            className="w-[92px] rotate-[-9deg] object-contain drop-shadow-[0_14px_26px_rgba(0,0,0,0.22)] sm:w-[120px] lg:w-[142px]"
          />
          <img
            src={slide.secondaryImage}
            alt="Brain tonic"
            className="w-[92px] rotate-[8deg] object-contain drop-shadow-[0_14px_26px_rgba(0,0,0,0.22)] sm:w-[120px] lg:w-[142px]"
          />
        </div>

        <div className="text-center">
          <div className="inline-flex rounded-[8px] bg-white px-4 py-2 shadow-[0_10px_20px_rgba(255,255,255,0.28)]">
            <p className="text-sm font-semibold text-[#111111] sm:text-base lg:text-lg">
              {slide.heading}
            </p>
          </div>
          <p className="mt-5 text-[1.65rem] font-medium leading-tight tracking-[-0.04em] sm:text-[2rem] lg:text-[2.5rem]">
            For Hot Summer Days
          </p>
          <p className="mt-3 text-[2.1rem] font-semibold italic leading-none tracking-[-0.05em] text-[#ef2a1a] drop-shadow-[2px_4px_0_rgba(0,0,0,0.18)] sm:text-[2.8rem] lg:text-[4.1rem]">
            FLAT 20% OFF
          </p>
          <div className="mt-5 inline-flex rounded-[18px] border-[3px] border-dashed border-[#2d2d2d] bg-[#fbff92] px-5 py-3 shadow-[0_10px_24px_rgba(0,0,0,0.08)]">
            <p className="text-lg font-semibold tracking-[-0.03em] sm:text-xl lg:text-[2rem]">
              Use Code: {slide.code}
            </p>
          </div>
          <p className="mx-auto mt-4 max-w-[480px] text-sm text-[var(--color-text-secondary)] sm:text-base">
            {slide.subheading}
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 sm:gap-4">
          <img
            src={slide.tertiaryImage}
            alt="Cholesterol balance"
            className="w-[92px] rotate-[-7deg] object-contain drop-shadow-[0_14px_26px_rgba(0,0,0,0.22)] sm:w-[120px] lg:w-[142px]"
          />
          <img
            src={slide.quaternaryImage}
            alt="Vitality support"
            className="w-[92px] rotate-[9deg] object-contain drop-shadow-[0_14px_26px_rgba(0,0,0,0.22)] sm:w-[120px] lg:w-[142px]"
          />
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-2 hidden items-end justify-between px-4 opacity-85 lg:flex xl:px-10">
          <img
            src={slide.detailImageLeft}
            alt=""
            aria-hidden="true"
            className="w-[120px] object-contain"
          />
          <div className="-translate-y-28 rounded-[16px] bg-[#e53c2e] px-3 py-2 rotate-[-12deg] shadow-[0_12px_24px_rgba(0,0,0,0.16)]">
            <span className="block text-[10px] font-semibold uppercase leading-none tracking-[0.18em] text-white">
              Best
            </span>
            <span className="mt-1 block text-[10px] font-semibold uppercase leading-none tracking-[0.18em] text-white">
              Offer
            </span>
          </div>
          <img
            src={slide.detailImageRight}
            alt=""
            aria-hidden="true"
            className="w-[120px] object-contain"
          />
        </div>
      </div>
    </SlideShell>
  );
}

function ManagedImageSlide({ slide, isActive }) {
  return (
    <img
      src={slide.image}
      alt={slide.alt}
      className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
        isActive ? "opacity-100" : "opacity-0"
      } bg-white`}
    />
  );
}

function FallbackContentSlide({ slide, isActive }) {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-700 ${
        isActive ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {slide.type === "promo" && <PromoSlide slide={slide} />}
      {slide.type === "split" && <SplitSlide slide={slide} />}
      {slide.type === "seasonal" && <SeasonalSlide slide={slide} />}
    </div>
  );
}

export default function Banner({ variant = "default" }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const { data: homeBanners = [] } = useQuery({
    queryKey: ["homeBanners"],
    queryFn: getHomeBanners,
    enabled: hasBannerApi,
  });

  const apiSlides = useMemo(
    () =>
      homeBanners
        .filter((banner) => Boolean(banner?.image) && banner?.isActive !== false)
        .sort((a, b) => {
          const orderDiff = (a?.order ?? 0) - (b?.order ?? 0);
          if (orderDiff !== 0) return orderDiff;

          const aTime = new Date(a?.updatedAt || a?.createdAt || 0).getTime();
          const bTime = new Date(b?.updatedAt || b?.createdAt || 0).getTime();
          return bTime - aTime;
        })
        .slice(0, 4)
        .map((banner, index) => ({
          id: banner.id ?? `home-banner-${index}`,
          image: banner.image,
          alt: banner.alt || banner.title || `Homepage banner ${index + 1}`,
        })),
    [homeBanners],
  );

  const usesPromoSlides = variant === "home";
  const slides = usesPromoSlides
    ? promoSlides
    : apiSlides.length > 0
      ? apiSlides
      : imageFallbackSlides;
  const showControls = slides.length > 1;

  const goTo = (idx) => setCurrent((idx + slides.length) % slides.length);
  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  useEffect(() => {
    setCurrent((slide) => slide % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (paused || slides.length <= 1) return undefined;

    const timer = window.setTimeout(() => {
      setCurrent((slide) => (slide + 1) % slides.length);
    }, INTERVAL);

    return () => window.clearTimeout(timer);
  }, [current, paused, slides.length]);

  return (
    <section className="w-full border-b border-[var(--color-border)] bg-white">
      <div
        className={`relative mx-auto w-full max-w-[1600px] overflow-hidden ${
          usesPromoSlides
            ? "min-h-[360px] sm:min-h-[430px] lg:min-h-[500px] xl:min-h-[540px]"
            : "h-[180px] sm:h-[260px] lg:h-auto lg:aspect-[2048/473]"
        }`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {slides.map((slide, index) =>
          usesPromoSlides ? (
            <FallbackContentSlide
              key={slide.id}
              slide={slide}
              isActive={index === current}
            />
          ) : (
            <ManagedImageSlide
              key={slide.id}
              slide={slide}
              isActive={index === current}
            />
          ),
        )}

        {showControls && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/92 shadow-[var(--shadow-md)] transition-colors hover:bg-[var(--color-sage)] sm:flex lg:left-5"
              aria-label="Previous slide"
            >
              <ChevronLeft
                size={20}
                className="text-[var(--color-text)] hover:text-white"
              />
            </button>

            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/92 shadow-[var(--shadow-md)] transition-colors hover:bg-[var(--color-sage)] sm:flex lg:right-5"
              aria-label="Next slide"
            >
              <ChevronRight
                size={20}
                className="text-[var(--color-text)] hover:text-white"
              />
            </button>

            <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 sm:bottom-4">
              {slides.map((slide, index) => (
                <button
                  key={`${slide.id}-dot`}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-2.5 rounded-full border transition-all duration-300 ${
                    index === current
                      ? "w-8 border-[var(--color-sage)] bg-[var(--color-sage)]"
                      : "w-2.5 border-black/20 bg-white/90 hover:border-[var(--color-sage)]"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
