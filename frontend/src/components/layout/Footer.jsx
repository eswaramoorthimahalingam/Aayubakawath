import React from "react";
import { useLocation } from "react-router-dom";
import { Phone } from "lucide-react";
import FooterNewsletter from "./footer/FooterNewsletter";
import FooterContact from "./footer/FooterContact";
import FooterLinks from "./footer/FooterLinks";
import FooterTrustBadges from "./footer/FooterTrustBadges";
import FooterBottom from "./footer/FooterBottom";

export default function Footer() {
  const { pathname } = useLocation();
  const showQuote = pathname === "/contact";

  return (
    <footer className="relative bg-[var(--color-bg-soft)] text-[var(--color-text)] overflow-hidden border-t border-[var(--color-border)]">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />

      <FooterNewsletter showQuote={showQuote} />

      <div className="max-w-[1400px] mx-auto px-3 lg:px-4 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          <FooterContact />
          <div className="lg:col-span-2">
            <FooterLinks />
          </div>
          <div className="lg:col-span-2">
            <FooterTrustBadges />
          </div>
          <div className="lg:col-span-2">
            <h4 className="label text-[var(--color-text-muted)] mb-5 pb-3 border-b border-[var(--color-border)] text-base">
              Working Hours
            </h4>
            <div className="space-y-2.5 font-body text-lg">
              <div className="flex justify-between text-[var(--color-text-secondary)]">
                <span className="font-medium">Mon – Sat</span>
                <span className="font-semibold text-[var(--color-text)]">
                  9 AM – 7 PM
                </span>
              </div>
              <div className="flex justify-between text-[var(--color-text-secondary)]">
                <span className="font-medium">Sunday</span>
                <span className="font-semibold text-[var(--color-text)]">
                  Closed
                </span>
              </div>
              <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                <p className="text-[var(--color-text-muted)] text-base font-medium">
                  Need urgent help?
                </p>
                <a
                  href="tel:9443157282"
                  className="text-[var(--color-text)] text-lg font-semibold hover:text-[var(--color-sage)] transition-colors
                  inline-flex items-center gap-1 mt-1"
                >
                  Call Now <Phone size={11} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterBottom />
    </footer>
  );
}
