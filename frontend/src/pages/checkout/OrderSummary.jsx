import React from "react";

export default function OrderSummary({ cartItems, subtotal, shipping, onPlaceOrder, isPending }) {
  return (
    <div className="bg-[var(--color-bg-soft)] border border-[var(--color-border)] rounded-[var(--radius-lg)] overflow-hidden lg:sticky lg:top-24">
      <div className="bg-[var(--color-text)] px-6 py-5 rounded-t-[var(--radius-lg)]">
        <h2
          className="display-heading text-white"
          style={{ fontSize: "1.4rem" }}
        >
          Order Summary
        </h2>
      </div>

      <div className="px-6 pt-5 pb-3 max-h-64 overflow-y-auto space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex gap-4 items-center">
            <div className="w-14 h-14 shrink-0 bg-white rounded-[var(--radius-md)] flex items-center justify-center overflow-hidden border border-[var(--color-border)]">
              <img
                src={
                  item.product?.productImages?.[0]?.url ||
                  item.product?.image
                }
                alt={item.product?.productName}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body font-medium text-[var(--color-text)] text-sm line-clamp-1">
                {item.product?.productName}
              </p>
              <p className="font-body text-[12px] text-[var(--color-text-muted)] mt-0.5">
                Qty: {item.quantity}
              </p>
            </div>
            <p className="font-body font-semibold text-[var(--color-text)] text-sm shrink-0">
              ₹
              {(
                item.quantity *
                parseFloat(
                  item.product?.finalPrice || item.product?.price || 0,
                )
              ).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="px-6 py-5 border-t border-[var(--color-border)] space-y-2.5">
        <div className="flex justify-between font-body text-sm">
          <span className="text-[var(--color-text-secondary)]">Subtotal</span>
          <span className="font-medium text-[var(--color-text)]">
            ₹{subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between font-body text-sm">
          <span className="text-[var(--color-text-secondary)]">Shipping</span>
          <span
            className={`font-semibold ${shipping === 0 ? "text-[var(--color-sage)]" : "text-[var(--color-text)]"}`}
          >
            {shipping === 0 ? "Free" : `₹${shipping}`}
          </span>
        </div>
        <div className="flex justify-between pt-3 mt-1 border-t border-[var(--color-border)]">
          <span
            className="display-heading text-[var(--color-text)]"
            style={{ fontSize: "1.1rem" }}
          >
            Total
          </span>
          <span
            className="display-heading text-[var(--color-text)]"
            style={{ fontSize: "1.5rem" }}
          >
            ₹{(subtotal + shipping).toFixed(2)}
          </span>
        </div>
      </div>

      <div className="px-6 pb-6">
        <button
          onClick={onPlaceOrder}
          disabled={isPending}
          className="btn-sage w-full py-4 text-[13px]"
        >
          {isPending
            ? "Processing..."
            : "Place Order (Cash on Delivery)"}
        </button>
      </div>
    </div>
  );
}
