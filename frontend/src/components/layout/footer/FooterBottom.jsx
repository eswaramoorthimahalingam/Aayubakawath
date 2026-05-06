import React from "react";

export default function FooterBottom() {
  return (
    <div className="border-t border-[var(--color-border)] bg-white">
      <div className="max-w-[1400px] mx-auto px-3 lg:px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-body text-[var(--color-text-muted)] text-lg font-medium m-0">
          © 2026{" "}
          <span className="text-[var(--color-text)] font-semibold">
            Aayubakwath
          </span>
          . All Rights Reserved.
        </p>
        <p className="font-body text-[var(--color-text-placeholder)] text-base max-w-md text-center sm:text-right m-0 leading-relaxed">
          Ancient wisdom meets modern science. Our products are derived from
          traditional Ayurvedic practices.
        </p>
      </div>
    </div>
  );
}
