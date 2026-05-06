import React from "react";
import { Users, MapPin, TrendingUp, Award } from "lucide-react";
import Reveal from "./Reveal";

const stats = [
  { icon: Users, val: "500+", label: "Active Dealers" },
  { icon: MapPin, val: "28", label: "States Covered" },
  { icon: Award, val: "99%", label: "Satisfaction Rate" },
  { icon: TrendingUp, val: "₹10Cr+", label: "Partner Revenue" },
];

export default function DealershipStats() {
  return (
    <Reveal>
      <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm border border-gray-100 mb-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="text-center group">
                <div className="w-14 h-14 rounded-2xl mb-4 flex items-center justify-center mx-auto transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 bg-gray-100 text-[#111827]">
                  <Icon size={24} />
                </div>
                <p className="font-display font-black text-3xl lg:text-4xl text-[#111827] mb-1">
                  {s.val}
                </p>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                  {s.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}
