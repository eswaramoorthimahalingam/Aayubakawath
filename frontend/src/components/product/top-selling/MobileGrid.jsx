import React from "react";
import { motion } from "framer-motion";
import SmallCard from "./SmallCard";

const MotionDiv = motion.div;

export default function MobileGrid({ products, isLoading, navigate }) {
  if (isLoading) {
    return (
      <div className="md:hidden grid grid-cols-1 min-[420px]:grid-cols-2 gap-3">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className="h-52 bg-[var(--color-bg-soft)] rounded-2xl animate-pulse border border-[var(--color-border)]"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="md:hidden grid grid-cols-1 min-[420px]:grid-cols-2 gap-3">
      {products.map((product, index) => (
        <MotionDiv
          key={product.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 }}
          className={index === 2 ? "min-[420px]:col-span-2" : ""}
        >
          <SmallCard product={product} navigate={navigate} />
        </MotionDiv>
      ))}
    </div>
  );
}
