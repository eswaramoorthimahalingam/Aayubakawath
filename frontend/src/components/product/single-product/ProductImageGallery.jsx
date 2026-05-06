import { motion, AnimatePresence } from "framer-motion";

export default function ProductImageGallery({
  product,
  IMAGES,
  activeImg,
  setActiveImg,
  activeImageUrl,
  imageZoom,
  handleImageZoomMove,
  hideImageZoom,
  discPct,
  offerTags,
}) {
  return (
    <div className="2xl:sticky 2xl:top-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="flex flex-col gap-3 2xl:flex-row">
          {IMAGES.length > 1 && (
            <div className="order-2 flex gap-2 overflow-x-auto pb-1 scrollbar-none 2xl:order-1 2xl:w-[76px] 2xl:flex-col 2xl:overflow-visible">
              {IMAGES.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl border bg-white transition-all 2xl:h-[82px] 2xl:w-[76px] ${
                    activeImg === i
                      ? "border-black shadow-sm"
                      : "border-[var(--color-border)] hover:border-[var(--color-border-strong)]"
                  }`}
                >
                  <img
                    src={src?.url}
                    alt=""
                    className="h-full w-full object-contain p-3"
                  />
                </button>
              ))}
            </div>
          )}

          <div
            className="relative order-1 min-h-[300px] flex-1 overflow-hidden bg-white group sm:min-h-[360px] md:min-h-[420px] xl:min-h-[460px] 2xl:order-2 2xl:min-h-[580px]"
            onMouseMove={handleImageZoomMove}
            onMouseEnter={handleImageZoomMove}
            onMouseLeave={hideImageZoom}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImg}
                src={activeImageUrl}
                alt={product.productName}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="h-full w-full object-contain p-4 sm:p-5 md:p-6 xl:p-6 2xl:p-8 cursor-zoom-in select-none"
                draggable={false}
              />
            </AnimatePresence>

            {imageZoom.active && activeImageUrl && (
              <div
                className="pointer-events-none absolute hidden h-[42%] w-[42%] -translate-x-1/2 -translate-y-1/2 rounded-[18px] border border-[#111827]/10 bg-white/15 shadow-[0_0_0_1px_rgba(255,255,255,0.4)_inset] backdrop-blur-[1px] 2xl:block"
                style={{
                  left: `${imageZoom.x}%`,
                  top: `${imageZoom.y}%`,
                }}
              />
            )}

            {imageZoom.active && activeImageUrl && (
              <div
                className="pointer-events-none fixed z-50 hidden overflow-hidden rounded-[24px] border border-[#efefef] bg-white shadow-[0_20px_56px_rgba(17,24,39,0.12)] 2xl:block"
                style={{
                  left: `${imageZoom.panelLeft}px`,
                  top: `${imageZoom.panelTop}px`,
                  width: `${imageZoom.panelSize}px`,
                  height: `${imageZoom.panelSize}px`,
                  backgroundImage: `url(${activeImageUrl})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "250% 250%",
                  backgroundPosition: `${imageZoom.x}% ${imageZoom.y}%`,
                }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_58%,rgba(255,255,255,0.08)_100%)]" />
                <div className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#111827] shadow-sm">
                  Zoom Preview
                </div>
              </div>
            )}

            {discPct > 0 && (
              <div className="absolute left-4 top-4 rounded-full border border-[var(--color-border)] bg-white px-3.5 py-1.5 text-[0.72rem] font-semibold tracking-[0.14em] text-[var(--color-sage)]">
                SAVE {discPct}%
              </div>
            )}

            {offerTags[0] && (
              <div className="absolute right-4 top-4 rounded-full bg-[#829b1c] px-3.5 py-1.5">
                <span className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-white">
                  {offerTags[0]}
                </span>
              </div>
            )}

            <div className="absolute bottom-4 right-4 hidden rounded-full border border-[var(--color-border)] bg-white px-3 py-1.5 text-[0.72rem] font-semibold tracking-[0.12em] text-[var(--color-text-secondary)] 2xl:block">
              Hover to zoom
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
