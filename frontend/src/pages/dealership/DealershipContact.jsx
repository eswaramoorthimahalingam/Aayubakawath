import React from "react";
import { Mail, Phone, Clock } from "lucide-react";
import Reveal from "./Reveal";

export default function DealershipContact() {
  return (
    <div className="mt-auto">
      <Reveal delay={0.2}>
        <div className="clean-card rounded-2xl p-8 border border-gray-100 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-widest mb-5 text-gray-500">
            Quick Contact
          </p>
          <div className="space-y-4">
            <a
              href="mailto:info.sblsmarketing@gmail.com"
              className="flex items-center gap-4 text-[1rem] font-medium text-[#111827] no-underline hover:text-[#111827] transition-colors group"
            >
              <span className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-gray-100 text-[#111827] group-hover:bg-gray-100 group-hover:text-[#111827] transition-all duration-300">
                <Mail size={18} />
              </span>
              <span className="break-all">
                info.sblsmarketing@gmail.com
              </span>
            </a>
            <a
              href="tel:+919443157282"
              className="flex items-center gap-4 text-[1rem] font-medium text-[#111827] no-underline hover:text-[#111827] transition-colors group"
            >
              <span className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-gray-100 text-[#111827] group-hover:bg-gray-100 group-hover:text-[#111827] transition-all duration-300">
                <Phone size={18} />
              </span>
              +91 94431 57282
            </a>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="font-medium text-[#111827] text-sm">
              Average response time
            </p>
            <p className="font-display font-semibold text-2xl text-[#111827] mt-1">
              24 – 48 hrs
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
