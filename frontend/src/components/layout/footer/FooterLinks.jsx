import React from "react";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/aboutpage" },
  { label: "Shop", path: "/productListing" },
  { label: "Dealership", path: "/dealership" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

const helpLinks = [
  { label: "FAQ's", path: "/faq" },
  { label: "Shipping Policy", path: "/shipping-policy" },
  { label: "Return & Cancellation", path: "/returns" },
  { label: "Terms of Use", path: "/terms" },
  { label: "Privacy Policy", path: "/privacy" },
];

function LinkColumn({ title, links }) {
  return (
    <div>
      <h4 className="label text-[var(--color-text-muted)] mb-5 pb-3 border-b border-[var(--color-border)] text-base">
        {title}
      </h4>
      <ul className="space-y-2.5 list-none p-0 m-0">
        {links.map((link, i) => (
          <li key={i}>
            <a
              href={link.path}
              className="font-body text-[var(--color-text-secondary)] hover:text-[var(--color-text)] text-lg font-medium transition-all duration-200
                inline-flex items-center gap-2 group"
            >
              <span className="w-0 group-hover:w-2.5 h-px bg-[var(--color-sage)] transition-all duration-300" />
              <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                {link.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function FooterLinks() {
  return (
    <>
      <LinkColumn title="Explore" links={quickLinks} />
      <LinkColumn title="Support" links={helpLinks} />
    </>
  );
}
