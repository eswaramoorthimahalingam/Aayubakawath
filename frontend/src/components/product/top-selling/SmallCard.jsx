import React from "react";
import { motion } from "framer-motion";
import { getPrimaryProductImage } from "../../../utils/productImageOverrides";

const MotionDiv = motion.div;

function DiscountBadge({ discount, featured = false }) {
  if (discount <= 0) return null;
  const className = featured
    ? "absolute top-4 left-4 z-10 bg-[#829b1c] text-white text-sm font-semibold px-3 py-1.5 rounded-full shadow-sm"
    : "absolute top-4 left-4 z-10 bg-[#829b1c] text-white text-[11px] font-semibold px-4 py-1.5 rounded-full";
  return <div className={className}>-{discount}%</div>;
}

function ProductImage({ product, featured = false }) {
  const imageUrl = getPrimaryProductImage(product);
  const imageClass = featured
    ? "absolute inset-0 h-full w-full object-contain object-center p-6 group-hover:scale-[1.04] transition-transform duration-700"
    : "h-full w-full object-contain px-3 pb-1 pt-4 group-hover:scale-[1.06] transition-transform duration-500";
  const wrapperClass = featured
    ? "relative flex-1 min-h-0 overflow-hidden bg-white"
    : "flex-1 flex items-center justify-center overflow-hidden bg-transparent";

  return (
    <div className={wrapperClass}>
      <img
        src={imageUrl}
        alt={product.productName}
        className={imageClass}
      />
    </div>
  );
}

function SmallProductInfo({ product, discount, saving, formatCurrency }) {
  return (
    <div className="px-4 pt-3 pb-4 space-y-1.5">
      <h3 className="font-semibold text-[var(--color-text)] text-sm leading-snug line-clamp-2">
        {product.productName}
      </h3>
      {discount > 0 && (
        <p className="text-xs leading-snug text-[var(--color-text-muted)] font-medium">
          Save {discount}%* extra
        </p>
      )}
      {saving > 0 && (
        <p className="text-xs leading-snug text-[var(--color-sage)] font-semibold">
          {formatCurrency(saving)} off
        </p>
      )}
    </div>
  );
}

export default function SmallCard({ product, navigate, delay = 0 }) {
  const originalPrice = parseFloat(product.price) || 0;
  const finalPrice = parseFloat(product.finalPrice) || 0;
  const discount = originalPrice > 0 && finalPrice > 0 && originalPrice > finalPrice
    ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100)
    : 0;
  const saving = Math.max(0, Math.round(originalPrice - finalPrice));

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      onClick={() => navigate(`/product/${product.id}`)}
      className="relative bg-transparent rounded-none overflow-visible cursor-pointer group
        border-0 shadow-none transition-all duration-300 flex flex-col h-full"
    >
      <DiscountBadge discount={discount} />
      <ProductImage product={product} />
      <SmallProductInfo
        product={product}
        discount={discount}
        saving={saving}
        formatCurrency={(v) => `₹${Math.round(parseFloat(v) || 0).toLocaleString()}`}
      />
    </MotionDiv>
  );
}
