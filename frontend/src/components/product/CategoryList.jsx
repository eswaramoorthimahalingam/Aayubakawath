import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { getCategories } from "../../services/categoryService";

export default function CategoryBannerList() {
  const navigate = useNavigate();

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  if (categories.length === 0) return null;

  return (
    <section className="w-full overflow-hidden">
      <div className="flex overflow-x-auto scrollbar-none -mx-4 sm:-mx-6 lg:-mx-10 px-4 sm:px-6 lg:px-10 gap-3">
        {categories.map((cat, i) => (
          <motion.button
            key={cat.id || i}
            onClick={() => navigate(`/productListing?category=${cat.id}`)}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="shrink-0
              px-5 py-3 rounded-md hover:rounded-tr-full hover:rounded-bl-full
              bg-white hover:bg-[var(--color-sage-light)]
              border border-[var(--color-border)] hover:border-[var(--color-sage)]/45
              text-[var(--color-text)] hover:text-[var(--color-text)]
              font-body text-[11px] sm:text-xs font-semibold tracking-[0.12em] uppercase
              shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all duration-[300ms] ease-in-out
              text-center leading-tight line-clamp-1"
          >
            {cat.name}
          </motion.button>
        ))}
      </div>
    </section>
  );
}
