import React from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import useInView from "../../hooks/useInView";

const contactCards = [
  { icon: MapPin, label: "Visit Us", value: "No:1/770, K.Ayyampalayam (PO)", sub: "Palladam, Tiruppur, TN 641662", href: null },
  { icon: Mail, label: "Email Us", value: "info.sblsmarketing@gmail.com", sub: "Reply within 24 hours", href: "mailto:info.sblsmarketing@gmail.com" },
  { icon: Phone, label: "Call Us", value: "+91 94431 57282", sub: "Mon – Sat, 9 AM – 6 PM", href: "tel:+919443157282" },
];

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.8s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.8s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function ContactCards() {
  return (
    <Reveal>
      <div className="mb-12">
        <div className="text-center mb-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-3">
            01 — Contact Info
          </p>
          <h2 className="font-display text-3xl lg:text-4xl font-black tracking-tight text-[#111827]">
            Reach Us Directly
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {contactCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <Reveal key={i} delay={i * 0.1}>
                <div className="clean-card rounded-2xl p-8 border border-gray-100 shadow-sm h-full group hover:shadow-2xl hover:shadow-gray-200 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#111827] to-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center bg-gray-100 text-[#111827] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <Icon size={24} />
                  </div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-2">
                    {card.label}
                  </p>
                  {card.href ? (
                    <a href={card.href} className="font-display font-semibold text-xl text-[#111827] hover:text-[#111827] transition-colors block mb-1 break-all">
                      {card.value}
                    </a>
                  ) : (
                    <p className="font-display font-semibold text-xl text-[#111827] mb-1">{card.value}</p>
                  )}
                  <p className="text-gray-500 text-base font-medium">{card.sub}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}
