import React, { memo } from "react";
import { FaHeart, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { ShoppingBag } from "lucide-react";
import { getPrimaryProductImage } from "../../../utils/productImageOverrides";

export const StarRating = memo(function StarRating({ rating }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<FaStar key={i} size={14} style={{ color: "#F59E0B" }} />);
    } else if (i - 0.5 <= rating) {
      stars.push(
        <FaStarHalfAlt key={i} size={14} style={{ color: "#F59E0B" }} />,
      );
    } else {
      stars.push(
        <FaRegStar key={i} size={14} style={{ color: "#D9D9D9" }} />,
      );
    }
  }
  return <div className="flex items-center gap-0.5">{stars}</div>;
});

const toStringList = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return [];

    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) {
          return parsed.map((item) => String(item).trim()).filter(Boolean);
        }
      } catch {
        // Fall back to comma-separated parsing.
      }
    }

    return trimmed
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const cleanLabel = (value) => {
  const label = String(value || "").trim();

  if (!label) return "";
  if (/^not specified$/i.test(label)) return "";
  if (/^over all$/i.test(label)) return "";

  return label;
};

const clampText = (value, maxLength = 96) => {
  const text = String(value || "").replace(/\s+/g, " ").trim();

  if (!text) return "";
  if (text.length <= maxLength) return text;

  return `${text.slice(0, maxLength).trimEnd()}...`;
};

const getCardDescription = (product) => {
  const forWhom = cleanLabel(product?.forWhom);
  const rawDescription = String(product?.productDescription || "")
    .replace(/\s+/g, " ")
    .trim();
  const firstSentence = rawDescription.split(/(?<=[.!?])\s+/)[0];

  if (firstSentence) {
    return clampText(firstSentence, 98);
  }

  if (forWhom) {
    return `Daily herbal support for ${forWhom.toLowerCase()}.`;
  }

  return "Clean daily wellness support with a simple capsule routine.";
};

export function ProductCardImage({
  product,
  hov,
  wishlisted,
  onToggleWishlist,
  adding,
  wishlistPending,
}) {
  const imageUrl = getPrimaryProductImage(product);

  return (
    <div className="relative shrink-0 bg-transparent">
      <div className="relative aspect-square overflow-hidden bg-transparent">
        {imageUrl ? (
          <div className="absolute inset-0 flex items-center justify-center px-2 pb-1 pt-3 sm:px-3 sm:pb-2 sm:pt-4">
            <img
              src={imageUrl}
              alt={product.productName}
              loading="lazy"
              decoding="async"
              draggable={false}
              className={`max-h-[94%] w-auto max-w-[82%] object-contain object-center transition-transform duration-500 sm:max-w-[84%] ${
                hov ? "scale-[1.05]" : "scale-100"
              }`}
            />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center px-6 text-center text-sm text-[var(--color-text-muted)]">
            Product image coming soon
          </div>
        )}
      </div>

      <button
        onClick={onToggleWishlist}
        disabled={wishlistPending}
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        className={`absolute right-2.5 top-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full
          border border-[#eceae4] bg-white shadow-[0_6px_18px_rgba(17,24,39,0.08)] backdrop-blur-sm transition-all duration-300 sm:right-3 sm:top-3 sm:h-9 sm:w-9
          ${wishlisted ? "text-[var(--color-terracotta)]" : "text-[var(--color-text-muted)] hover:text-[var(--color-terracotta)]"}
          ${wishlistPending ? "animate-pulse" : ""}`}
      >
        <FaHeart size={12} />
      </button>

      {adding && (
        <div className="absolute bottom-7 right-7 z-10 rounded-full bg-black px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-white">
          Adding
        </div>
      )}
    </div>
  );
}

export function ProductCardInfo({ product }) {
  const seedRating = (id) => {
    let hash = 0;
    const str = String(id);
    for (let i = 0; i < str.length; i++)
      hash = (hash * 31 + str.charCodeAt(i)) & 0xffff;
    return (3.5 + (hash % 15) / 10).toFixed(1);
  };
  const seedReviews = (id) => {
    let hash = 0;
    const str = String(id) + "r";
    for (let i = 0; i < str.length; i++)
      hash = (hash * 37 + str.charCodeAt(i)) & 0xffff;
    return 28 + (hash % 220);
  };

  const rating =
    product.rating > 0 ? product.rating : parseFloat(seedRating(product.id));
  const reviewCount =
    product.reviewCount > 0 ? product.reviewCount : seedReviews(product.id);
  const price = Number(product?.price || 0);
  const finalPrice = Number(product?.finalPrice || 0);
  const displayPrice = Number.isFinite(finalPrice) && finalPrice > 0
    ? finalPrice
    : Number.isFinite(price)
      ? price
      : 0;
  const disc =
    price > 0 && finalPrice > 0 && price > finalPrice
      ? Math.round(((price - finalPrice) / price) * 100)
      : 0;
  const description = getCardDescription(product);

  return (
    <div className="px-2.5 pb-1 pt-1 sm:px-3.5 sm:pb-1.5 sm:pt-1.5">
      <div className="flex flex-col gap-[0.32rem]">
        <h3
          className="card-title-gradient min-h-[1.1rem] text-center font-display text-[0.84rem] font-medium leading-[0.96] tracking-[-0.04em] line-clamp-2 sm:min-h-[1.16rem] sm:text-[0.91rem]"
        >
          {product.productName}
        </h3>

        <p className="min-h-[1.62rem] text-center font-body text-[0.68rem] leading-[1.08] tracking-[-0.01em] text-[var(--color-text-muted)] line-clamp-2 sm:min-h-[1.76rem] sm:text-[0.73rem]">
          {description}
        </p>

        <div className="flex min-h-[0.84rem] items-center gap-1">
          <StarRating rating={rating} />
          <span className="font-body text-[0.72rem] font-semibold tracking-[-0.02em] text-[var(--color-text)]">
            ({reviewCount})
          </span>
        </div>

        <div className="flex min-h-[1.36rem] flex-wrap items-baseline gap-x-1.5 gap-y-0">
          {disc > 0 && (
            <span className="font-body text-[0.7rem] leading-none text-[var(--color-text-muted)] line-through">
              ₹{price.toLocaleString("en-IN")}
            </span>
          )}
          <span className="card-price-gradient font-display text-[0.88rem] font-medium leading-none tracking-[-0.03em] sm:text-[0.96rem]">
            From ₹{displayPrice.toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </div>
  );
}

export function ProductCardActions({ onAddToCart, adding }) {
  return (
    <button
      onClick={onAddToCart}
      disabled={adding}
      className="card-btn-gradient flex w-full items-center justify-center gap-1.5 rounded-[8px] border border-[#98b321] bg-white py-1.5 text-[0.76rem] font-medium tracking-[-0.01em] text-[#718915] hover:border-[#98b321] hover:bg-white hover:text-[#718915] disabled:opacity-60"
    >
      <ShoppingBag size={12} />
      {adding ? "Adding..." : "Add to cart"}
    </button>
  );
}
