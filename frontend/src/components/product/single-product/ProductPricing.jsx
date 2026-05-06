export default function ProductPricing({ pack, product, discPct }) {
  const currentPrice = pack.price ?? parseFloat(product.finalPrice);

  return (
    <div className="border-b border-[var(--color-border)] py-4">
      <p className="text-[0.78rem] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
        One-time purchase
      </p>
      <div className="mt-1.5 flex items-end gap-3 flex-wrap">
        <span className="text-[2.2rem] leading-none text-[var(--color-text)]">
          ₹{currentPrice.toLocaleString()}
        </span>
        {pack.orig && (
          <span className="text-lg text-[var(--color-text-placeholder)] line-through">
            ₹{pack.orig.toLocaleString()}
          </span>
        )}
        {discPct > 0 && (
          <span className="rounded-full border border-[var(--color-border)] bg-white px-3 py-1 text-sm text-[var(--color-sage-dark)]">
            Save {discPct}%
          </span>
        )}
      </div>
      <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[0.92rem] text-[var(--color-text-secondary)]">
        <span>MRP inclusive of all taxes</span>
        {pack.perUnit && (
          <span>₹{pack.perUnit.toFixed(2)} per capsule</span>
        )}
      </div>
    </div>
  );
}
