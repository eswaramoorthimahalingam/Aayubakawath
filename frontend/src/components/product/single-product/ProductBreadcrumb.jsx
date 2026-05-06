export default function ProductBreadcrumb({ productName, navigate }) {
  return (
    <div className="bg-white">
      <div className="max-w-[1360px] mx-auto px-4 lg:px-6 pt-6 lg:pt-8 pb-2">
        <nav className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[0.95rem] text-[var(--color-text-secondary)]">
            <button
              onClick={() => navigate("/")}
              className="hover:text-[var(--color-text)] transition-colors"
            >
              Home
            </button>
            <span className="text-[var(--color-text-placeholder)]">›</span>
            <button
              onClick={() => navigate("/products")}
              className="hover:text-[var(--color-text)] transition-colors"
            >
              Products
            </button>
            <span className="text-[var(--color-text-placeholder)]">›</span>
            <span className="text-[var(--color-text)] truncate max-w-[240px] font-semibold">
              {productName}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--color-sage)]" />
              In stock
            </span>
          </div>
        </nav>
      </div>
    </div>
  );
}
