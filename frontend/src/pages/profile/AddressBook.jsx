import React from "react";

export default function AddressBook({
  addresses,
  onRemove,
  isRemoving,
  newAddress,
  setNewAddress,
  showAddressForm,
  setShowAddressForm,
  onSave,
  isSaving,
}) {
  return (
    <div className="fade-up space-y-4">
      {addresses.map((addr) => (
        <div
          key={addr.id}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-all"
        >
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-[#111827]">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <p className="font-semibold text-[#111827]">{addr.label}</p>
                {addr.isDefault && (
                  <span className="text-[10px] tracking-widest uppercase font-semibold text-[#111827] bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200">
                    Default
                  </span>
                )}
              </div>
              <p className="text-gray-500 text-sm">{addr.details}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button className="text-sm font-semibold text-[#111827] border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-50 transition-all">
              Edit
            </button>
            <button
              onClick={() => onRemove(addr.id)}
              className="text-sm font-semibold text-gray-400 border border-gray-200 px-4 py-2 rounded-xl hover:bg-gray-50 transition-all"
            >
              {isRemoving ? "Removing..." : "Remove"}
            </button>
          </div>
        </div>
      ))}

      {showAddressForm && (
        <div className="p-4 border border-gray-200 rounded-xl space-y-3 fade-up bg-white">
          <textarea
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            placeholder="Enter full address here..."
            className="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-[#111827] bg-gray-50"
            rows="3"
          />
          <div className="flex gap-2">
            <button
              onClick={() => onSave({ label: "Home", details: newAddress })}
              disabled={isSaving}
              className="bg-[#111827] text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-60"
            >
              {isSaving ? "Saving..." : "Save Address"}
            </button>
            <button
              onClick={() => setShowAddressForm(false)}
              className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {!showAddressForm && (
        <button
          onClick={() => setShowAddressForm(true)}
          className="w-full p-5 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 font-semibold text-sm hover:border-gray-400 hover:text-[#111827] hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add New Address
        </button>
      )}
    </div>
  );
}
