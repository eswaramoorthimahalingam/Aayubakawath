import React from "react";
import { ArrowRight } from "lucide-react";

export default function FooterNewsletter({ showQuote }) {
  return (
    <>
      {showQuote && (
        <div className="border-b border-[var(--color-border)] bg-black py-10 lg:py-12 text-center px-6">
          <p
            className="display-heading text-white/80 italic leading-tight select-none"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            "Ancient wisdom, crafted for the modern soul."
          </p>
        </div>
      )}

      <div className="border-b border-[var(--color-border)] py-12 lg:py-14">
        <div className="max-w-[1400px] mx-auto px-3 lg:px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-8 h-px bg-[var(--color-sage)]" />
              <p className="label text-[var(--color-text-muted)]">
                Join Our Circle
              </p>
            </div>
            <h2
              className="display-heading text-[var(--color-text)]"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
            >
              Get 30% Off Your First Order
            </h2>
            <p className="font-body text-[var(--color-text-secondary)] text-lg mt-2 max-w-md">
              Exclusive wellness tips, new launches, and member-only offers.
            </p>
          </div>
          <form
            className="flex flex-col w-full md:w-auto gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full md:w-72 px-5 py-3.5 bg-white border border-[var(--color-border)] text-[var(--color-text)] text-lg
                font-body outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all
                placeholder:text-[var(--color-text-placeholder)] rounded-lg"
            />
            <button className="btn-primary shrink-0 flex items-center justify-center gap-2 px-4 py-3 rounded-lg w-full md:w-72">
              Subscribe <ArrowRight size={13} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
