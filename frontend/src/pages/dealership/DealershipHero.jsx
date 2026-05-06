import React from "react";
import bulkHero from "../../assets/images/bulk.jpg";
import { ArrowRight, Phone } from "lucide-react";

export default function DealershipHero() {
  return (
    <div className="relative z-10 w-full mb-16 pt-20 px-3 lg:px-4">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start pt-8 pb-8 lg:py-12 lg:pr-12">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gray-200 mb-6 shadow-sm bg-white">
            <span className="w-2 h-2 rounded-full bg-[#111827] relative">
              <span className="absolute inset-0 rounded-full bg-[#111827] animate-ping opacity-50"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#111827]">
              Partnership Program
            </span>
          </div>

          <h1 className="text-[44px] sm:text-[56px] lg:text-[72px] font-semibold tracking-tighter text-[#111827] mb-8 leading-[1.05]">
            Grow Your Business,
            <br />
            <span className="text-[#111827] font-display italic tracking-tight">
              Naturally.
            </span>
          </h1>

          <p className="text-gray-500 font-medium text-[20px] sm:text-[24px] leading-[1.8] mb-8 max-w-lg">
            Join our premium network of 500+ active dealers across India
            earning exceptional margins on 100% pure herbal wellness
            products.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <a
              href="#enquiry-form"
              className="bg-[#111827] text-white rounded-xl px-12 h-16 text-[16px] font-black uppercase tracking-widest shadow-xl shadow-gray-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-gray-300 transition-all flex items-center justify-center gap-3"
            >
              Start Partnership <ArrowRight size={16} />
            </a>
            <a
              href="tel:+919443157282"
              className="flex items-center justify-center gap-3 px-10 h-16 rounded-xl bg-white border-2 border-gray-100 text-[13px] font-black uppercase tracking-widest text-[#111827] hover:border-gray-100 hover:bg-white hover:text-[#111827] transition-all"
            >
              <Phone size={16} /> Call Us
            </a>
          </div>
        </div>

        {/* Right Image Container */}
        <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-2xl aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-gray-100 bg-white group">
            <img
              src={bulkHero}
              alt="Bulk Dealership"
              className="w-full h-full object-cover object-center scale-105 transition-transform duration-[10000ms] ease-out group-hover:scale-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
