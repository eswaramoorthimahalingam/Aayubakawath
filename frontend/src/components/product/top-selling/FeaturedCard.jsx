import React from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { getPrimaryProductImage } from "../../../utils/productImageOverrides";

const MotionDiv = motion.div;

function DiscountBadge({ discount, featured = false }) {
  if (discount <= 0) return null;
  const className = featured
    ? "absolute top-4 left-4 z-10 bg-[#829b1c] text-white text-sm font-semibold px-3 py-1.5 rounded-full shadow-sm"
    : "absolute top-3 left-3 z-10 bg-[#829b1c] text-white text-[11px] font-semibold px-2.5 py-1 rounded-full";
  return <div className={className}>-{discount}%</div>;
}

function ProductImage({ product, featured = false }) {
  const imageUrl = getPrimaryProductImage(product);
  const imageClass = featured
    ? "absolute inset-0 h-full w-full object-contain object-center px-4 pb-2 pt-5 group-hover:scale-[1.06] transition-transform duration-700"
    : "h-full w-full object-contain px-6 pb-5 pt-9 group-hover:scale-[1.04] transition-transform duration-500";
  const wrapperClass = featured
    ? "relative flex-1 min-h-0 overflow-hidden bg-transparent"
    : "flex-1 items-center justify-center overflow-hidden bg-white";

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

function FeaturedProductInfo({ product, discount, saving, onBuy, formatCurrency }) {
  const originalPrice = parseFloat(product.price) || 0;
  const finalPrice = parseFloat(product.finalPrice) || 0;

  return (
    <div className="p-6 bg-white border-t border-[var(--color-border)] space-y-2">
      <h2 className="font-extrasemibold text-[var(--color-text)] text-xl leading-tight line-clamp-2">
        {product.productName}
      </h2>

      <div className="flex items-baseline gap-2">
        {originalPrice > finalPrice && (
          <span className="text-sm text-[var(--color-text-placeholder)] line-through font-medium">
            {formatCurrency(originalPrice)}
          </span>
        )}
        <span className="text-xl font-semibold text-[var(--color-text)]">
          {formatCurrency(finalPrice)}
        </span>
      </div>

      {discount > 0 && (
        <p className="text-sm leading-snug text-[var(--color-text-muted)] font-medium">
          Save {discount}%* extra
        </p>
      )}
      {saving > 0 && (
        <p className="text-sm leading-snug font-semibold text-[var(--color-sage)]">
          {formatCurrency(saving)}* Instant savings
        </p>
      )}

      <button
        onClick={onBuy}
        className="inline-flex items-center gap-2 bg-[var(--color-text)] text-white
          text-sm font-semibold tracking-wide px-5 py-2.5 rounded-xl
          hover:bg-black transition-colors"
      >
        <ShoppingCart size={14} />
        Buy Now
      </button>
    </div>
  );
}

export default function FeaturedCard({ product, navigate }) {
  const originalPrice = parseFloat(product.price) || 0;
  const finalPrice = parseFloat(product.finalPrice) || 0;
  const discount = originalPrice > 0 && finalPrice > 0 && originalPrice > finalPrice
    ? Math.round(((originalPrice - finalPrice) / originalPrice) * 100)
    : 0;
  const saving = Math.max(0, Math.round(originalPrice - finalPrice));

  const goToProduct = () => navigate(`/product/${product.id}`);
  const handleBuy = (event) => {
    event.stopPropagation();
    goToProduct();
  };

  return (
    <MotionDiv
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onClick={goToProduct}
      className="relative bg-transparent rounded-none overflow-visible cursor-pointer group
        border-0 shadow-none transition-all duration-500 flex flex-col h-full"
    >
      <DiscountBadge discount={discount} featured />
      <ProductImage product={product} featured />
      <FeaturedProductInfo
        product={product}
        discount={discount}
        saving={saving}
        onBuy={handleBuy}
        formatCurrency={(v) => `₹${Math.round(parseFloat(v) || 0).toLocaleString()}`}
      />
    </MotionDiv>
  );
}
