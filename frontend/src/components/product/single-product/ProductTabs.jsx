import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ImageIcon, Check } from "lucide-react";

export default function ProductTabs({
  sectionRef,
  activeTab,
  setActiveTab,
  TABS,
  fadeInUp,
  product,
  benefits,
  warnings,
  howToUse,
  beforeAfter,
  ingredients,
  ingredientCards,
  getMatchingIngredientPill,
  showSelectedIngredient,
  selectedIngredientCards,
  previewIngredientPill,
  activeIngredientPill,
  setActiveIngredientPill,
  setHoveredIngredientPill,
  setShowIngredientModal,
  showIngredientModal,
  StarRow,
  RatingBar,
  REVIEWS,
}) {
  const ingredientCount =
    ingredients?.pills?.length || ingredients?.list?.length || 0;
  const descriptionText =
    product.content?.description || product.productDescription;

  return (
    <div
      ref={sectionRef}
      className="max-w-[1360px] mx-auto scroll-mt-24 px-4 py-12 lg:px-6 lg:py-16"
    >
      <motion.div {...fadeInUp}>
        <div className="mb-8 flex flex-wrap gap-x-6 gap-y-3 border-b border-[var(--color-border)]">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`-mb-px border-b-2 pb-3 text-[1rem] whitespace-nowrap transition-all ${
                activeTab === id
                  ? "border-[var(--color-sage)] text-[var(--color-text)]"
                  : "border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
          >
            {activeTab === "benefits" && (
              <div className="grid gap-4 md:grid-cols-2">
                {benefits.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="rounded-[24px] border border-[var(--color-border)] bg-white p-6"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-sage-light)] text-xl">
                      {item.icon}
                    </div>
                    <h3 className="text-[1.16rem] leading-tight text-[var(--color-text)]">
                      {item.key}
                    </h3>
                    <p className="mt-3 text-[0.98rem] leading-7 text-[var(--color-text-secondary)]">
                      {item.val}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === "description" && (
              <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12">
                <div className="space-y-5">
                  <p className="text-[1.12rem] leading-9 text-[var(--color-text-secondary)]">
                    {descriptionText}
                  </p>
                  <p className="text-[1rem] leading-8 text-[var(--color-text-secondary)]">
                    Crafted to feel more premium and easier to scan, this new
                    product-detail layout keeps the focus on the product story,
                    ingredients, and purchase options without crowding the
                    screen.
                  </p>
                </div>
                <div className="rounded-[28px] border border-[var(--color-border)] bg-white p-6 lg:p-8">
                  <p className="text-[0.78rem] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                    Quick Facts
                  </p>
                  <div className="mt-5 space-y-5">
                    <div>
                      <p className="text-[0.82rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                        Best for
                      </p>
                      <p className="mt-1 text-[1.05rem] text-[var(--color-text)]">
                        {product.forWhom || "General wellness"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[0.82rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                        Ingredient focus
                      </p>
                      <p className="mt-1 text-[1.05rem] text-[var(--color-text)]">
                        {ingredientCount > 0
                          ? `${ingredientCount} key herbs in the formulation`
                          : "Herbal wellness support"}
                      </p>
                    </div>
                    <div>
                      <p className="text-[0.82rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                        Product format
                      </p>
                      <p className="mt-1 text-[1.05rem] text-[var(--color-text)]">
                        Vegetarian capsules
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "ingredients" && ingredients && (
              <div
                className="rounded-[30px] border border-[var(--color-border)] bg-white p-6 lg:p-8 space-y-8"
                onMouseLeave={() => setHoveredIngredientPill(null)}
                onClick={() => {
                  setHoveredIngredientPill(null);
                }}
              >
                {ingredients.pills?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setActiveIngredientPill(null);
                        setHoveredIngredientPill(null);
                      }}
                      aria-pressed={!previewIngredientPill}
                      className={`rounded-full border px-4 py-2 text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#111827] focus-visible:ring-offset-2 ${
                        !previewIngredientPill
                          ? "bg-black border-black text-white"
                          : "bg-white border-[var(--color-border)] text-[var(--color-text)] hover:border-black"
                      }`}
                    >
                      All
                    </motion.button>
                    {ingredients.pills.map((pill, i) => (
                      <motion.button
                        key={i}
                        type="button"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() =>
                          setActiveIngredientPill((current) => {
                            setHoveredIngredientPill(null);
                            return current === pill ? null : pill;
                          })
                        }
                        aria-pressed={previewIngredientPill === pill}
                        className={`rounded-full border px-4 py-2 text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[#111827] focus-visible:ring-offset-2 ${
                          previewIngredientPill === pill
                            ? "bg-black border-black text-white"
                            : "bg-white border-[var(--color-border)] text-[var(--color-text)] hover:border-black"
                        }`}
                      >
                        {pill}
                      </motion.button>
                    ))}
                    <button
                      onClick={() => setShowIngredientModal(true)}
                      className="rounded-full bg-[var(--color-sage)] px-4 py-2 text-sm text-white transition-colors hover:bg-[var(--color-sage-dark)]"
                    >
                      View All Ingredients
                    </button>
                  </div>
                )}

                {showSelectedIngredient ? (
                  selectedIngredientCards.map(
                    ({ name, desc, img, index }) => (
                      <motion.button
                        key={name || index}
                        type="button"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        onClick={() => {
                          setActiveIngredientPill(previewIngredientPill);
                          setHoveredIngredientPill(null);
                        }}
                        aria-pressed={
                          activeIngredientPill === previewIngredientPill
                        }
                        className="grid min-h-[360px] w-full grid-cols-1 items-center gap-8 rounded-[28px] border border-[var(--color-border)] bg-white p-6 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#111827] focus-visible:ring-offset-2 sm:p-8 lg:grid-cols-[minmax(260px,0.8fr)_1.2fr]"
                      >
                        <div className="mx-auto flex aspect-square w-full max-w-sm items-center justify-center overflow-hidden rounded-[24px] bg-white border border-[var(--color-border)]">
                          <img
                            src={img}
                            alt={name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="mb-3 text-[0.78rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                            Selected Ingredient
                          </p>
                          <h3 className="mb-4 text-[2.2rem] leading-tight text-[var(--color-text)]">
                            {name}
                          </h3>
                          <p className="text-[1rem] leading-8 text-[var(--color-text-secondary)]">
                            {desc}
                          </p>
                        </div>
                      </motion.button>
                    ),
                  )
                ) : (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {ingredientCards.map(({ name, desc, img, index }) => {
                      const matchingPill = getMatchingIngredientPill(name);
                      return (
                        <motion.button
                          key={index}
                          type="button"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          whileHover={{ y: -6 }}
                          whileTap={{ scale: 0.98 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.06 }}
                          onMouseEnter={() =>
                            setHoveredIngredientPill(matchingPill)
                          }
                          onClick={() =>
                            setActiveIngredientPill(matchingPill)
                          }
                          aria-pressed={
                            previewIngredientPill === matchingPill
                          }
                          className="flex h-full flex-col items-center rounded-[24px] border border-[var(--color-border)] bg-white p-5 text-center shadow-sm outline-none transition-colors hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#111827] focus-visible:ring-offset-2"
                        >
                          <div className="mb-4 flex h-28 w-28 items-center justify-center overflow-hidden rounded-[20px] border border-[var(--color-border)] bg-white">
                            <img
                              src={img}
                              alt={name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <h3 className="mb-1 text-sm leading-snug text-[var(--color-text)]">
                            {name}
                          </h3>
                          <p className="text-xs leading-6 text-[var(--color-text-secondary)]">
                            {desc}
                          </p>
                        </motion.button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            <AnimatePresence>
              {showIngredientModal && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4"
                  style={{ backgroundColor: "rgba(0,0,0,0.42)" }}
                  onClick={() => setShowIngredientModal(false)}
                >
                  <motion.div
                    initial={{ scale: 0.94, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.94, opacity: 0, y: 20 }}
                    transition={{ type: "spring", damping: 25 }}
                    className="relative w-full max-w-xl overflow-hidden rounded-[28px] bg-white shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="border-b border-[var(--color-border)] px-8 pb-6 pt-8">
                      <button
                        onClick={() => setShowIngredientModal(false)}
                        className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-text)] transition-colors hover:bg-[#fafafa]"
                      >
                        ×
                      </button>
                      <h3 className="text-[1.5rem] text-[var(--color-text)]">
                        Full Ingredient List
                      </h3>
                      <p className="mt-1 text-[0.95rem] text-[var(--color-text-secondary)]">
                        {product?.productName}
                      </p>
                    </div>
                    <div className="max-h-[60vh] overflow-y-auto px-8 py-6">
                      {ingredients.list?.map((item, i) => (
                        <div key={i} className="mb-5 last:mb-0">
                          <p className="text-[0.78rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                            {item.key}
                          </p>
                          <p className="mt-2 text-[0.98rem] leading-7 text-[var(--color-text-secondary)]">
                            {item.val}
                          </p>
                        </div>
                      ))}
                      {(!ingredients.list || ingredients.list.length === 0) &&
                        ingredients.pills?.length > 0 && (
                          <p className="text-[0.98rem] leading-7 text-[var(--color-text-secondary)]">
                            {ingredients.pills.join(", ")}
                          </p>
                        )}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {activeTab === "warning" && (
              <div className="max-w-4xl space-y-4">
                <div className="rounded-[24px] bg-[var(--color-error-bg)] p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                      <AlertTriangle
                        size={18}
                        className="text-[var(--color-warn)]"
                      />
                    </div>
                    <p className="text-[0.98rem] text-[var(--color-warn)]">
                      Please read all warnings carefully before use.
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  {warnings.map((row, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      className="rounded-[22px] border border-[var(--color-border)] bg-white p-5"
                    >
                      <span className="text-[0.78rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                        Warning {String(idx + 1).padStart(2, "0")}
                      </span>
                      <p className="mt-2 text-[1.05rem] text-[var(--color-text)]">
                        {row.key}
                      </p>
                      <p className="mt-2 text-[0.98rem] leading-7 text-[var(--color-text-secondary)]">
                        {row.val}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "howToUse" && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {howToUse.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                    className="rounded-[24px] border border-[var(--color-border)] bg-white p-6 shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-sage-light)] text-2xl">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-[0.78rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                          Step {String(item.step).padStart(2, "0")}
                        </p>
                        <h4 className="mt-2 text-[1.18rem] leading-tight text-[var(--color-text)]">
                          {item.title}
                        </h4>
                        <p className="mt-3 text-[0.98rem] leading-7 text-[var(--color-text-secondary)]">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === "beforeAfter" && (
              <div>
                {beforeAfter.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {beforeAfter.map((item, idx) => (
                      <div
                        key={idx}
                        className="aspect-square overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-white shadow-sm"
                      >
                        <img
                          src={item}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-16 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-bg-soft)]">
                      <ImageIcon
                        size={24}
                        className="text-[var(--color-text-placeholder)]"
                      />
                    </div>
                    <p className="text-[0.98rem] text-[var(--color-text-muted)]">
                      Before & after images will be available soon.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-4">
                  <div className="rounded-[28px] border border-[var(--color-border)] bg-white p-6 lg:sticky lg:top-8">
                    <div className="text-center">
                      <span className="text-[4rem] leading-none text-[var(--color-text)]">
                        4.7
                      </span>
                      <div className="my-3 flex justify-center">
                        <StarRow rating={4.7} size={18} />
                      </div>
                      <span className="text-[0.82rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                        Based on 1,248 verified reviews
                      </span>
                    </div>
                    <div className="mt-6 space-y-3">
                      <RatingBar label="5" value={82} />
                      <RatingBar label="4" value={11} />
                      <RatingBar label="3" value={4} />
                      <RatingBar label="2" value={2} />
                      <RatingBar label="1" value={1} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 lg:col-span-8">
                  {REVIEWS.map((review, idx) => (
                    <motion.div
                      key={`${review.name}-${idx}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="rounded-[24px] border border-[var(--color-border)] bg-white p-6 shadow-sm"
                    >
                      <div className="mb-4 flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-sage-light)]">
                            <span className="text-sm text-[var(--color-sage-dark)]">
                              {review.initial || "A"}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[0.98rem] text-[var(--color-text)]">
                                {review.name || "Verified Buyer"}
                              </span>
                              {review.verified && (
                                <span className="flex items-center gap-1 rounded-full bg-[var(--color-sage-light)] px-2 py-0.5 text-[0.72rem] uppercase tracking-[0.14em] text-[var(--color-sage-dark)]">
                                  <Check size={9} /> Verified
                                </span>
                              )}
                            </div>
                            <span className="text-[0.88rem] text-[var(--color-text-placeholder)]">
                              {review.date || "Recently posted"}
                            </span>
                          </div>
                        </div>
                        <StarRow rating={review.rating || 5} />
                      </div>
                      <p className="text-[1rem] leading-7 text-[var(--color-text-secondary)]">
                        &ldquo;{review.text}&rdquo;
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
