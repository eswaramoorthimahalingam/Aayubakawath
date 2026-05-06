import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroBg1 from "../../assets/images/Cholesterol.jpeg";
import heroBg2 from "../../assets/images/vitality.jpeg";
import heroBg3 from "../../assets/images/sugar.jpeg";
import heroBg4 from "../../assets/images/homebanner.jpeg";
import { getHomeBanners } from "../../services/bannerService";

const fallbackSlides = [
  { id: 1, image: heroBg1, alt: "Cholesterol wellness banner" },
  { id: 2, image: heroBg2, alt: "Vitality wellness banner" },
  { id: 3, image: heroBg3, alt: "Blood sugar wellness banner" },
  { id: 4, image: heroBg4, alt: "Aayubakwath wellness banner" },
];

const INTERVAL = 6000;
const hasBannerApi = Boolean(import.meta.env.VITE_API_BASE_URL);

export default function Banner() {
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

  const slides = apiSlides.length > 0 ? apiSlides : fallbackSlides;
  const usesManagedBanners = apiSlides.length > 0;
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
        className={`relative w-full overflow-hidden bg-white ${
          usesManagedBanners
            ? "h-[170px] sm:h-[240px] lg:h-auto lg:aspect-[2048/473]"
            : "aspect-[1920/700]"
        }`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {slides.map((slide, index) => (
          <img
            key={slide.id}
            src={slide.image}
            alt={slide.alt}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
              index === current ? "opacity-100" : "opacity-0"
            } ${usesManagedBanners ? "bg-white" : ""}`}
          />
        ))}

        {showControls && (
          <>
            <button
              type="button"
              onClick={prev}
              className="hidden sm:flex absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-10
                h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full
                bg-white/92 hover:bg-[var(--color-sage)] border border-black/8 shadow-[var(--shadow-md)]
                transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} className="text-[var(--color-text)] hover:text-white" />
            </button>

            <button
              type="button"
              onClick={next}
              className="hidden sm:flex absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10
                h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full
                bg-white/92 hover:bg-[var(--color-sage)] border border-black/8 shadow-[var(--shadow-md)]
                transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight size={20} className="text-[var(--color-text)] hover:text-white" />
            </button>

            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
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
