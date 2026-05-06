export default function ProductOffers({ OFFERS }) {
  return (
    <div className="py-6">
      <div className="mb-3 flex items-center gap-2">
        <p className="text-[0.78rem] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
          Offers
        </p>
        <span className="text-[0.9rem] text-[var(--color-text-secondary)]">
          {OFFERS.length} ways to save
        </span>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {OFFERS.map((offer, i) => (
          <div
            key={i}
            className="rounded-2xl border border-[var(--color-border)] bg-white p-4"
          >
            <p className="text-[0.98rem] text-[var(--color-text)]">
              {offer.icon}
            </p>
            <p className="mt-1 text-[0.92rem] leading-6 text-[var(--color-text-secondary)]">
              {offer.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
