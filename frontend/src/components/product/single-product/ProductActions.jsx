import { ShoppingCart, Minus, Plus } from "lucide-react";

export default function ProductActions({
  qty,
  setQty,
  handleAddToCart,
  handleBuyNow,
  addMut,
}) {
  return (
    <div className="space-y-3 border-b border-[var(--color-border)] pb-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-[0.82rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
          Order quantity
        </span>
        <div className="flex items-center overflow-hidden rounded-full border border-[var(--color-border)] bg-white sm:shrink-0">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex h-11 w-11 items-center justify-center border-r border-[var(--color-border)] text-[var(--color-text)] transition-colors hover:bg-black hover:text-white"
          >
            <Minus size={14} />
          </button>
          <span className="flex w-12 items-center justify-center text-base font-semibold">
            {qty}
          </span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="flex h-11 w-11 items-center justify-center border-l border-[var(--color-border)] text-[var(--color-text)] transition-colors hover:bg-black hover:text-white"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      <div className="grid gap-2.5 sm:grid-cols-2">
        <button
          onClick={handleAddToCart}
          disabled={addMut.isPending}
          className="flex h-[50px] items-center justify-center gap-2 rounded-full bg-black px-6 text-[0.88rem] uppercase tracking-[0.14em] text-white transition-colors hover:bg-[var(--color-accent-hover)] disabled:opacity-50"
        >
          <ShoppingCart size={15} />
          {addMut.isPending ? "Adding..." : "Add to Cart"}
        </button>
        <button
          onClick={handleBuyNow}
          disabled={addMut.isPending}
          className="flex h-[50px] items-center justify-center rounded-full border border-black bg-white px-6 text-[0.88rem] uppercase tracking-[0.14em] text-[var(--color-text)] transition-colors hover:bg-black hover:text-white disabled:opacity-50"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
