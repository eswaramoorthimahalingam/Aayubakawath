import React from "react";
import { MapPin } from "lucide-react";

export default function AddressSelector({ addresses, selectedAddress, onSelect }) {
  if (addresses.length === 0) return null;

  return (
    <div className="space-y-3 mb-7">
      {addresses.map((addr) => (
        <div
          key={addr.id}
          onClick={() => onSelect(addr.details)}
          className={`flex items-start gap-3 p-4 border-2 cursor-pointer transition-all rounded-[var(--radius-md)]
            ${
              selectedAddress === addr.details
                ? "border-[var(--color-sage)] bg-[var(--color-sage-light)]"
                : "border-[var(--color-border)] hover:border-[var(--color-sage)]/50"
            }`}
        >
          <MapPin
            size={15}
            className={`mt-0.5 shrink-0 ${selectedAddress === addr.details ? "text-[var(--color-sage)]" : "text-[var(--color-text-muted)]"}`}
          />
          <div>
            <p className="font-body font-semibold text-[var(--color-text)] text-sm">
              {addr.label}
            </p>
            <p className="font-body text-sm text-[var(--color-text-secondary)] mt-0.5 leading-relaxed">
              {addr.details}
            </p>
          </div>
          {selectedAddress === addr.details && (
            <span
              className="ml-auto label text-[var(--color-sage)]"
              style={{ fontSize: "0.55rem" }}
            >
              Selected
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
