import React, { useRef, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { getProducts } from "../../../services/productService";
import { useQuery } from "@tanstack/react-query";

const ANIMATED_PLACEHOLDERS = [
  "Blood Sugar",
  "Joint Pain Relief",
  "Immunity Booster",
  "Digestive Health",
  "Stress & Anxiety",
  "Weight Management",
  "Liver Detox",
  "Herbal Supplements",
  "Skin Care",
  "Ayurvedic Churna",
];

export default function HeaderSearch() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const searchRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => {
      setPlaceholderIdx((i) => (i + 1) % ANIMATED_PLACEHOLDERS.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const fn = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const { data: allProducts = [] } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 5 * 60 * 1000,
  });

  const searchResults = useMemo(() => {
    if (!searchQuery.trim() || !searchFocused) return [];
    const q = searchQuery.toLowerCase().trim();
    const list = Array.isArray(allProducts) ? allProducts : [allProducts];
    return list
      .filter(
        (p) =>
          p.productName?.toLowerCase().includes(q) ||
          p.productTags?.some((t) => t.toLowerCase().includes(q)),
      )
      .slice(0, 8);
  }, [searchQuery, searchFocused, allProducts]);

  const getProductImage = (product) => {
    const image =
      product?.productImages?.[0] || product?.images?.[0] || product?.image;
    return typeof image === "string" ? image : image?.url;
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(
        `/productListing?search=${encodeURIComponent(searchQuery.trim())}`,
      );
      setSearchQuery("");
      setSearchFocused(false);
    }
  };

  return (
    <div
      ref={searchRef}
      className="relative hidden lg:block w-[180px] xl:w-[260px] 2xl:w-[340px] shrink-0"
    >
      <form onSubmit={handleSearchSubmit}>
        <label
          className="relative flex items-center gap-2.5 border border-[var(--color-border)] bg-white
          px-3.5 sm:px-5 h-12 sm:h-14 rounded-xl sm:rounded-2xl cursor-text shadow-[0_8px_24px_rgba(15,23,42,0.06)]
          focus-within:border-[var(--color-sage)] focus-within:ring-2 focus-within:ring-[rgba(130,155,28,0.2)]
          transition-all duration-200"
        >
          <Search size={18} className="shrink-0 text-[var(--color-text-muted)]" />
          <div className="relative flex h-full min-w-0 flex-1 items-center overflow-hidden">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              placeholder={`Search ${ANIMATED_PLACEHOLDERS[placeholderIdx]}`}
              className="relative z-10 w-full bg-transparent font-body text-[14px] xl:text-[15px] text-[var(--color-text)] outline-none placeholder:text-[var(--color-text-placeholder)]"
            />
          </div>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="shrink-0 text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
            >
              <X size={16} />
            </button>
          )}
        </label>
      </form>
      <AnimatePresence>
        {searchFocused && searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-[var(--color-border)] bg-white shadow-[var(--shadow-xl)]"
          >
            {searchResults.map((product) => {
              const productImage = getProductImage(product);
              return (
                <button
                  key={product.id || product._id}
                  onClick={() => {
                    setSearchQuery("");
                    setSearchFocused(false);
                    navigate(`/product/${product.id || product._id}`);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-[var(--color-bg-muted)]"
                >
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-[var(--color-bg-soft)]">
                    {productImage ? (
                      <img
                        src={productImage}
                        alt={product.productName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-[var(--color-text-muted)]">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-body font-medium text-[var(--color-text)]">
                      {product.productName}
                    </p>
                    <p className="text-xs font-body font-semibold text-[var(--color-sage)]">
                      ₹{product.finalPrice}
                    </p>
                  </div>
                  <ChevronRight size={14} className="shrink-0 text-[var(--color-text-muted)]" />
                </button>
              );
            })}
            <button
              onClick={() => {
                if (searchQuery.trim()) {
                  navigate(
                    `/productListing?search=${encodeURIComponent(searchQuery.trim())}`,
                  );
                  setSearchQuery("");
                  setSearchFocused(false);
                }
              }}
              className="w-full border-t border-[var(--color-border)] px-4 py-2.5 text-xs font-body font-semibold text-[var(--color-sage)] transition-colors hover:bg-[var(--color-bg-muted)]"
            >
              View all results for "{searchQuery}"
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
