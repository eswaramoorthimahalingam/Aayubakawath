import React from "react";
import { Plus } from "lucide-react";

export default function NewAddressForm({
  newAddress,
  setNewAddress,
  setSelectedAddress,
  onSave,
  isSaving,
  hasAddresses,
}) {
  return (
    <div
      className={
        hasAddresses
          ? "pt-5 border-t border-[var(--color-border)]"
          : ""
      }
    >
      <div className="flex items-center gap-2 mb-3">
        <Plus size={13} className="text-[var(--color-text-muted)]" />
        <span className="font-body text-sm font-medium text-[var(--color-text)]">
          {hasAddresses
            ? "Or enter a new address:"
            : "Enter your shipping address:"}
        </span>
      </div>
      <textarea
        value={newAddress}
        onChange={(e) => {
          setNewAddress(e.target.value);
          setSelectedAddress(null);
        }}
        placeholder="123 Main St, City, State, PIN"
        rows={3}
        className="w-full px-4 py-3 border border-[var(--color-border)] bg-white rounded-[var(--radius-md)]
          font-body text-sm text-[var(--color-text)] outline-none resize-none
          focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all placeholder:text-[var(--color-text-placeholder)]"
      />
      {newAddress.trim() && (
        <button
          onClick={() => onSave({ label: "Custom", details: newAddress })}
          disabled={isSaving}
          className="mt-3 font-body text-[12px] font-medium text-[var(--color-sage)]
            tracking-[0.08em] hover:text-[var(--color-sage-dark)] transition-colors"
        >
          {isSaving ? "Saving..." : "Save this address for later"}
        </button>
      )}
    </div>
  );
}
