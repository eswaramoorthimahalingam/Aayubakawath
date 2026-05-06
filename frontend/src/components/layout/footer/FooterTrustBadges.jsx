import React from "react";
import { ShieldCheck, Leaf, Award } from "lucide-react";

const trustBadges = [
  { icon: <Leaf size={15} />, label: "100% Pure & Natural" },
  { icon: <ShieldCheck size={15} />, label: "ISO Certified" },
  { icon: <Award size={15} />, label: "GMP Certified" },
];

export default function FooterTrustBadges() {
  return (
    <div>
      <h4 className="label text-[var(--color-text-muted)] mb-5 pb-3 border-b border-[var(--color-border)] text-base">
        Certifications
      </h4>
      <div className="space-y-2.5">
        {trustBadges.map((b, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-3.5 py-3 bg-white rounded-lg border border-[var(--color-border)]
              hover:border-[var(--color-sage)]/30 transition-all duration-300"
          >
            <span className="text-[var(--color-sage)]">{b.icon}</span>
            <span className="font-body text-[var(--color-text-secondary)] text-lg font-medium">
              {b.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
