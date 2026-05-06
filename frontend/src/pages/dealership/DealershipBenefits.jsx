import React from "react";
import { CheckCircle2, Sparkles } from "lucide-react";
import Reveal from "./Reveal";

const benefits = [
  "Exclusive tiered discounts on every order",
  "Dedicated account manager for your business",
  "Custom branded packaging options available",
  "Priority shipping with pan-India network",
  "Flexible payment terms and credit options",
  "Early access to new product launches",
];

export default function DealershipBenefits() {
  return (
    <Reveal delay={0.1}>
      <div className="clean-card rounded-2xl p-8 lg:p-10 border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-2xl hover:shadow-gray-200 transition-all duration-500 hover:-translate-y-2">
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10 bg-gradient-to-br from-gray-200 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl bg-gradient-to-r from-gray-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
          <div className="w-14 h-14 rounded-2xl mb-6 flex items-center justify-center bg-gray-100 text-[#111827]">
            <Sparkles size={24} />
          </div>
          <h3 className="font-display text-2xl font-semibold text-[#111827] mb-2">
            Why Partner With Us?
          </h3>
          <div className="w-8 h-0.5 rounded-full mb-6 bg-gray-200" />
          <ul className="space-y-4 m-0 p-0 list-none">
            {benefits.map((t) => (
              <li
                key={t}
                className="flex items-start gap-3 text-[1rem] text-gray-600 font-medium"
              >
                <span className="text-gray-500 mt-0.5 flex-shrink-0">
                  <CheckCircle2 size={18} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}
