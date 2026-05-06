import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { getWishlist } from "../../services/wishlistService";
import { getProducts } from "../../services/productService";
import { getCategories } from "../../services/categoryService";
import { useAuth } from "../../hooks/useAuth";
import ProductCard from "./ProductCard";
import Banner from "../layout/Banner";
import OfferScrollBar from "../layout/OfferScrollBar";
import FirstBanner from "../layout/banner/FirstBanner";
import FilterPanel from "./FilterPanel";
import cate1 from "../../assets/images/allCate/cate1.jpg";
import cate3 from "../../assets/images/allCate/cate2.jpg";
import cate2 from "../../assets/images/allCate/cate3.jpg";
import cate4 from "../../assets/images/allCate/cate4.jpg";
import cate5 from "../../assets/images/allCate/cate5.jpg";
import cate6 from "../../assets/images/allCate/cate6.jpg";
import { Search, X, SlidersHorizontal } from "lucide-react";

const FALLBACK_EMOJIS = ["🌿", "❤️", "🛡️", "🌱", "✨", "💊", "🔋", "🧘", "🧴", "🥣"];
const FALLBACK_IMAGES = [cate1, cate3, cate2, cate4, cate5, cate6];

const calcDiscount = (p, f) =>
  Math.round(((parseFloat(p) - parseFloat(f)) / parseFloat(p)) * 100);

const normalizeStringList = (value) => {
  if (Array.isArray(value)) {
    return value.map((v) => String(v).trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return [];
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) {
          return parsed.map((v) => String(v).trim()).filter(Boolean);
        }
      } catch {
        // Fall back to comma-separated parsing.
      }
    }
    return trimmed.split(",").map((v) => v.trim()).filter(Boolean);
  }
  return [];
};

function SkeletonCard() {
  return (
    <div className="bg-white overflow-hidden border border-(--color-border) animate-pulse rounded-lg">
      <div className="w-full bg-(--color-bg-soft)" style={{ paddingBottom: "133.33%" }} />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-(--color-bg-muted) w-3/4 rounded" />
        <div className="h-3 bg-(--color-bg-muted) w-full rounded" />
      </div>
    </div>
  );
}

function EmptyState({ search, onClear }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <p className="text-4xl mb-4">🔍</p>
      <h3 className="display-heading text-(--color-text) mb-2" style={{ fontSize: "1.8rem" }}>
        No products found
      </h3>
      <p className="font-body text-(--color-text-secondary) text-sm mb-6">
        {search ? `No results for "${search}"` : "Try adjusting your filters"}
      </p>
      <button onClick={onClear} className="btn-primary">Clear filters</button>
    </div>
  );
}

export default function ProductListingPage() {
  const { isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [offerTag, setOfferTag] = useState("All");
  const [priceIdx, setPriceIdx] = useState(0);
  const [forWhom, setForWhom] = useState("All");
  const [discountMin, setDiscountMin] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const { data: rawProducts = [], isLoading: loading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  const products = Array.isArray(rawProducts) ? rawProducts : [rawProducts];

  const { data: wishlistData } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
    enabled: isAuthenticated,
  });
  const wishlistSet = useMemo(() => {
    const items = wishlistData?.data || [];
    return new Set(items.map((w) => w.productId || w.product?.id || w.product?._id));
  }, [wishlistData]);

  const { data: rawCategories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  useEffect(() => {
    const catParam = searchParams.get("category");
    if (catParam) setCategory(catParam);
  }, [searchParams]);

  const computedCategories = useMemo(() => {
    const allItem = { id: "all", name: "All Products", emoji: "🌿", img: cate6, count: products.length };
    const dynamic = (rawCategories || []).map((cat, idx) => ({
      id: cat.id,
      name: cat.name,
      emoji: FALLBACK_EMOJIS[idx % FALLBACK_EMOJIS.length],
      img: cat.image || FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length],
      count: products.filter((p) => p.categoryId === cat.id).length,
    }));
    return [allItem, ...dynamic];
  }, [rawCategories, products]);

  const offerTags = useMemo(() => {
    const s = new Set(["All"]);
    products.filter(Boolean).forEach((p) => {
      normalizeStringList(p.offerTags).forEach((t) => s.add(t));
    });
    return [...s];
  }, [products]);

  const forWhomOptions = useMemo(() => {
    const s = new Set(["All"]);
    products.filter(Boolean).forEach((p) => {
      if (p.forWhom && p.forWhom !== "Not specified") s.add(p.forWhom);
    });
    return [...s];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const range = [
      { label: "All Prices", min: 0, max: Infinity },
      { label: "Under ₹500", min: 0, max: 500 },
      { label: "₹500–₹1K", min: 500, max: 1000 },
      { label: "₹1K–₹2K", min: 1000, max: 2000 },
      { label: "₹2K+", min: 2000, max: Infinity },
    ][priceIdx];
    let list = products.filter((p) => {
      const matchCat = category === "all" || p.categoryId === category;
      const q = search.toLowerCase();
      const productTags = normalizeStringList(p.productTags);
      const offerTagList = normalizeStringList(p.offerTags);
      const matchQ = !q || p.productName.toLowerCase().includes(q) || productTags.some((t) => t.toLowerCase().includes(q));
      const matchTag = offerTag === "All" || offerTagList.includes(offerTag);
      const price = parseFloat(p.finalPrice);
      const matchPrice = price >= range.min && price < range.max;
      const matchForWhom = forWhom === "All" || p.forWhom === forWhom;
      const disc = p.price > 0 ? Math.round(((p.price - p.finalPrice) / p.price) * 100) : 0;
      const matchDiscount = disc >= discountMin;
      return matchCat && matchQ && matchTag && matchPrice && matchForWhom && matchDiscount;
    });
    if (sortBy === "price-asc") list = [...list].sort((a, b) => +a.finalPrice - +b.finalPrice);
    if (sortBy === "price-desc") list = [...list].sort((a, b) => +b.finalPrice - +a.finalPrice);
    if (sortBy === "discount") list = [...list].sort((a, b) => calcDiscount(b.price, b.finalPrice) - calcDiscount(a.price, a.finalPrice));
    if (sortBy === "newest") list = [...list].reverse();
    return list;
  }, [products, category, search, offerTag, sortBy, priceIdx, forWhom, discountMin]);

  const activeFiltersCount =
    (category !== "all" ? 1 : 0) +
    (priceIdx !== 0 ? 1 : 0) +
    (forWhom !== "All" ? 1 : 0) +
    (discountMin !== 0 ? 1 : 0) +
    (offerTag !== "All" ? 1 : 0) +
    (sortBy !== "default" ? 1 : 0);

  const activeCategoryName = computedCategories.find((c) => c.id === category)?.name ?? "All Products";

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setOfferTag("All");
    setSortBy("default");
    setPriceIdx(0);
    setForWhom("All");
    setDiscountMin(0);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full mb-0"><Banner /></div>
      <div className="border-b border-(--color-border)"><OfferScrollBar /></div>
      <div className="max-w-[1400px] mx-auto px-3 lg:px-4 py-6 sm:py-10"><FirstBanner /></div>

      {/* Sticky filter bar */}
      <div className="sticky top-0 z-30 bg-white/92 backdrop-blur-xl border-b border-(--color-border)">
        <div className="max-w-[1400px] mx-auto px-3 lg:px-4 py-3.5">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3">
            {/* Search */}
            <label className="flex items-center gap-2.5 w-full lg:flex-1 lg:max-w-xs border border-(--color-border) bg-white px-4 py-2.5 cursor-text rounded-lg focus-within:border-(--color-accent) focus-within:ring-1 focus-within:ring-(--color-accent) transition-all">
              <Search size={14} className="text-(--color-text-muted) shrink-0" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 text-sm font-body bg-transparent text-(--color-text) placeholder:text-(--color-text-placeholder)"
              />
              {search && (
                <button onClick={() => setSearch("")} className="shrink-0 text-(--color-text-muted) hover:text-(--color-text) transition-colors">
                  <X size={13} />
                </button>
              )}
            </label>

            {/* Category pills */}
            <div className="flex w-full lg:flex-1 items-center gap-2 overflow-x-auto scrollbar-none">
              {computedCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`shrink-0 px-4 py-2 font-semibold text-[.7rem] tracking-[0.12em] uppercase font-medium border transition-all duration-300 rounded-lg
                    ${category === cat.id ? "bg-black text-white border-black" : "bg-transparent text-(--color-text-secondary) border-(--color-border) hover:border-black hover:text-black"}`}
                >
                  {cat.name} <span className="ml-1.5 opacity-60">({cat.count})</span>
                </button>
              ))}
            </div>

            {/* Filters toggle */}
            <button
              onClick={() => setShowFilters((v) => !v)}
              className={`w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border text-xs font-semibold tracking-wide transition-all
                ${showFilters || activeFiltersCount > 0 ? "bg-black text-white border-black" : "bg-white text-(--color-text-secondary) border-(--color-border) hover:border-black hover:text-black"}`}
            >
              <SlidersHorizontal size={13} />
              Filters
              {activeFiltersCount > 0 && (
                <span className="bg-white/25 text-white px-1.5 py-0.5 rounded-full text-[10px] font-semibold leading-none">{activeFiltersCount}</span>
              )}
            </button>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto shrink-0 font-body text-[10px] tracking-[0.1em] uppercase border border-(--color-border) bg-white px-4 py-2.5 outline-none text-(--color-text) cursor-pointer hover:border-black transition-colors rounded-lg"
            >
              <option value="default">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price ↑</option>
              <option value="price-desc">Price ↓</option>
              <option value="discount">Best Discount</option>
            </select>
          </div>

          {/* Offer tags */}
          {offerTags.length > 1 && (
            <div className="flex items-center gap-2 mt-3 overflow-x-auto scrollbar-none">
              <span className="label text-(--color-text-muted) shrink-0" style={{ fontSize: ".7rem" }}>Offers:</span>
              {offerTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setOfferTag(tag)}
                  className={`shrink-0 px-3 py-1 font-semibold text-[.7rem] tracking-[0.1em] uppercase border transition-all rounded-md
                    ${offerTag === tag ? "bg-black text-white border-black" : "bg-transparent text-(--color-text-secondary) border-(--color-border) hover:border-black hover:text-black"}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          <FilterPanel
            showFilters={showFilters}
            priceIdx={priceIdx}
            setPriceIdx={setPriceIdx}
            forWhom={forWhom}
            setForWhom={setForWhom}
            discountMin={discountMin}
            setDiscountMin={setDiscountMin}
            forWhomOptions={forWhomOptions}
            activeFiltersCount={activeFiltersCount}
            onClearAll={clearFilters}
          />
        </div>
      </div>

      <AnimatePresence>
        {category !== "all" && (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="bg-(--color-bg-soft) border-b border-(--color-border) overflow-hidden"
            style={{ height: 140 }}
          >
            <div className="max-w-[1400px] mx-auto px-3 lg:px-4 h-full flex items-end pb-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-6 h-px bg-(--color-sage)" />
                  <p className="label text-(--color-text-muted)" style={{ fontSize: "0.55rem" }}>Browsing</p>
                </div>
                <h1 className="display-heading text-(--color-text)" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
                  {activeCategoryName}
                </h1>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1400px] mx-auto px-3 lg:px-4 py-8 sm:py-10 pb-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 sm:mb-8">
          <div>
            {category === "all" && (
              <>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-6 h-px bg-(--color-sage)" />
                  <p className="label" style={{ fontSize: "0.55rem" }}>Browse</p>
                </div>
                <h1 className="display-heading text-(--color-text)" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>All Products</h1>
              </>
            )}
          </div>
          <span className="font-body text-sm text-(--color-text-secondary)">
            <span className="font-semibold text-(--color-text)">{filteredProducts.length}</span> products
            {activeFiltersCount > 0 && (
              <button onClick={clearFilters} className="ml-2 text-(--color-sage) hover:underline text-xs">Clear filters</button>
            )}
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filteredProducts.length === 0 ? (
          <EmptyState search={search} onClear={clearFilters} />
        ) : (
          <motion.div
            key={`${category}-${offerTag}-${sortBy}`}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.filter(Boolean).map((product, idx) => (
                <motion.div
                  key={product.id || idx}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ delay: idx * 0.03, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProductCard product={product} animDelay={idx * 0.07} sectionVisible={true} wishlistSet={wishlistSet} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
