import { Leaf, Shield, Zap, Clock } from "lucide-react";

export default function ProductTrustBadges() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {[
        {
          icon: <Leaf size={15} />,
          title: "100% Natural",
          sub: "Organic extracts",
        },
        {
          icon: <Shield size={15} />,
          title: "Lab Tested",
          sub: "Quality assured",
        },
        {
          icon: <Zap size={15} />,
          title: "Fast Delivery",
          sub: "4-7 business days",
        },
        {
          icon: <Clock size={15} />,
          title: "60-Day Returns",
          sub: "Hassle-free",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-white p-4"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[var(--color-sage)]">
            {item.icon}
          </div>
          <div>
            <span className="block text-[0.98rem] text-[var(--color-text)]">
              {item.title}
            </span>
            <span className="text-[0.88rem] text-[var(--color-text-secondary)]">
              {item.sub}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
