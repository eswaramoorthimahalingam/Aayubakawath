export default function ProductPackSelector({ PACKS, packIdx, setPackIdx }) {
  const recommendedIndex =
    PACKS.findIndex((item) =>
      String(item.tag || "")
        .toLowerCase()
        .includes("popular"),
    ) >= 0
      ? PACKS.findIndex((item) =>
          String(item.tag || "")
            .toLowerCase()
            .includes("popular"),
        )
      : Math.min(1, Math.max(0, PACKS.length - 1));

  return (
    <div className="pb-0 pt-2.5">
      <div className="mb-2">
        <p className="text-[0.98rem] text-[var(--color-text-secondary)]">
          Quantity
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {PACKS.map((p, i) => {
          const isSel = packIdx === i;
          const bottleCount = Math.max(1, Math.round((p.qty || 30) / 30));
          const showBadge = i === recommendedIndex;

          return (
            <button
              key={i}
              onClick={() => setPackIdx(i)}
              className={`relative w-full rounded-[10px] border bg-white px-4 py-3.5 text-left transition-all
                ${
                  isSel
                    ? "border-[var(--color-sage)]"
                    : "border-[var(--color-border)] hover:border-[var(--color-border-strong)]"
                }`}
            >
              {showBadge && (
                <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-sage)] px-4 py-1 text-[0.75rem] text-white">
                  {p.tag || "Most Popular"}
                </span>
              )}
              <div className="space-y-1 text-center">
                <p className="text-[0.8rem] uppercase tracking-[0.18em] text-[var(--color-text)]">
                  {bottleCount} Bottle{bottleCount > 1 ? "s" : ""}
                </p>
                <p className="text-[1.72rem] leading-none text-[var(--color-text)]">
                  ₹{p.price.toLocaleString()}
                </p>
                <p className="text-[0.82rem] uppercase tracking-[0.14em] text-[var(--color-text)]">
                  Per Bottle
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
