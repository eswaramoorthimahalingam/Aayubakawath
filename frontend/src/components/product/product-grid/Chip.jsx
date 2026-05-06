import React from "react";

export default function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 px-3 py-1.5 font-body text-xs font-semibold tracking-wide rounded-full border transition-all duration-200
        ${
          active
            ? "bg-[var(--color-sage-light)] text-(--color-text) border-(--color-sage)"
            : "bg-white text-(--color-text-secondary) border-(--color-border) hover:border-(--color-sage) hover:text-(--color-text)"
        }`}
    >
      {children}
    </button>
  );
}
