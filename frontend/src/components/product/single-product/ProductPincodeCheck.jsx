import { Truck } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductPincodeCheck({
  pincode,
  setPincode,
  pincodeMsg,
  setPincodeMsg,
  checkPincode,
}) {
  return (
    <div className="rounded-[24px] border border-[var(--color-border)] bg-white p-5">
      <div className="mb-3 flex items-center gap-2">
        <Truck size={15} className="text-[var(--color-text-muted)]" />
        <span className="text-[0.98rem] text-[var(--color-text)]">Delivery</span>
      </div>
      <p className="mb-4 text-[0.94rem] leading-6 text-[var(--color-text-secondary)]">
        Enter your pincode to estimate shipping time for this product.
      </p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          maxLength={6}
          placeholder="Enter pincode"
          value={pincode}
          onChange={(e) => {
            setPincode(e.target.value.replace(/\D/g, ""));
            setPincodeMsg(null);
          }}
          className="h-12 flex-1 rounded-full border border-[var(--color-border)] bg-white px-4 text-sm outline-none transition-colors placeholder:text-[var(--color-text-placeholder)] focus:border-[var(--color-sage)]"
        />
        <button
          onClick={checkPincode}
          className="h-12 rounded-full bg-black px-6 text-sm uppercase tracking-[0.14em] text-white transition-colors hover:bg-[var(--color-accent-hover)]"
        >
          Check
        </button>
      </div>
      {pincodeMsg && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-3 rounded-2xl p-3 text-sm ${
            pincodeMsg.type === "success"
              ? "bg-[var(--color-sage-light)] text-emerald-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {pincodeMsg.msg}
        </motion.div>
      )}
    </div>
  );
}
