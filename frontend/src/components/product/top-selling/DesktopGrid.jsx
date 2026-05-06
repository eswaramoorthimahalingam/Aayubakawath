import React from "react";
import ProductCard from "../ProductCard";

function DesktopSkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="aspect-square rounded-3xl bg-[var(--color-bg-soft)]" />
      <div className="mt-4 space-y-3 px-2">
        <div className="h-5 rounded bg-[var(--color-bg-muted)]" />
        <div className="h-4 w-3/4 rounded bg-[var(--color-bg-muted)]" />
        <div className="h-4 w-1/2 rounded bg-[var(--color-bg-muted)]" />
        <div className="h-11 rounded-2xl bg-[var(--color-bg-muted)]" />
      </div>
    </div>
  );
}

export default function DesktopGrid({ products, isLoading }) {
  return (
    <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-3 lg:gap-3.5">
      {isLoading
        ? Array.from({ length: 5 }, (_, index) => (
            <DesktopSkeletonCard key={index} />
          ))
        : products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              animDelay={index * 0.06}
              sectionVisible={true}
            />
          ))}
    </div>
  );
}
