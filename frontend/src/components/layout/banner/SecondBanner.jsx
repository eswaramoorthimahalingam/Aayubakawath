import React from "react";
import { motion } from "framer-motion";
import iconbc2 from "../../../assets/images/gmo.jpg";
import iconbc1 from "../../../assets/images/noadd.jpg";
import iconbc3 from "../../../assets/images/gltn.jpg";
import iconbc4 from "../../../assets/images/sugar.jpg";
import ShopPageBanner from "./ShopPageBanner";

const data = [
  {
    icon: iconbc1,
    name: "Preservative Free",
    category:
      "No artificial preservatives added. Maintains natural purity and is safe for daily use.",
  },
  {
    icon: iconbc2,
    name: "GMO Free",
    category:
      "Made with non-GMO ingredients. No genetic modification, ensuring a pure and natural formulation.",
  },
  {
    icon: iconbc3,
    name: "Gluten Free",
    category:
      "Completely free from gluten. Suitable for gluten-sensitive individuals and gentle on digestion.",
  },
  {
    icon: iconbc4,
    name: "No Added Sugar",
    category:
      "Contains no added sugar. Supports healthy lifestyle choices with a naturally balanced formulation.",
  },
];

export default function SecondBanner() {
  return (
    <>
      <section className="w-full max-w-full overflow-x-hidden border-y border-[var(--color-border)] bg-[var(--color-bg-soft)] py-10 sm:py-12">
        <div className="w-full max-w-[1400px] mx-auto px-3 lg:px-4">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-4 py-4">
              <div className="w-8 h-px bg-[var(--color-sage)]" />
              <p
                className="label whitespace-nowrap"
                style={{
                  fontSize: "clamp(1.25rem, 4vw, 2rem)",
                  fontWeight: "500",
                }}
              >
                Our Promise
              </p>
              <div className="w-8 h-px bg-[var(--color-sage)]" />
            </div>
            <h2
              className="display-heading text-[var(--color-text)]"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
            >
              Pure, Clean & Conscious
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-x-0 lg:divide-x divide-[var(--color-border)]">
            {data.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col items-center gap-4 px-4 sm:px-6 py-7 sm:py-8 text-center
                  border-b lg:border-b-0 border-[var(--color-border)] last:border-b-0 sm:[&:nth-child(2)]:border-b"
              >
                <img
                  src={item.icon}
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                  className="w-14 h-14 object-contain"
                />
                <div>
                  <h3 className="font-body font-semibold text-[var(--color-text)] text-sm tracking-[0.02em] mb-1.5">
                    {item.name}
                  </h3>
                  <p className="font-body text-[var(--color-text-secondary)] text-xs leading-relaxed">
                    {item.category}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <ShopPageBanner />
    </>
  );
}
