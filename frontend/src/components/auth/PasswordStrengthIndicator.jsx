import React from "react";

export default function PasswordStrengthIndicator({
  passwordChecks,
  password,
  confirmPassword,
}) {
  return (
    <>
      {password && (
        <div className="grid grid-cols-2 gap-1 -mt-2">
          {[
            { key: "length", label: "8+ characters" },
            { key: "upper", label: "Uppercase letter" },
            { key: "lower", label: "Lowercase letter" },
            { key: "number", label: "Number" },
            { key: "special", label: "Special character" },
          ].map(({ key, label }) => (
            <span
              key={key}
              className={`text-[11px] font-semibold flex items-center gap-1 ${passwordChecks[key] ? "text-emerald-600" : "text-gray-400"}`}
            >
              {passwordChecks[key] ? "✓" : "○"} {label}
            </span>
          ))}
        </div>
      )}

      {confirmPassword && (
        <p
          className={`text-[12px] font-semibold flex items-center gap-1.5 -mt-2 ${password === confirmPassword ? "text-emerald-600" : "text-red-500"}`}
        >
          {password === confirmPassword
            ? "✓ Passwords match"
            : "✗ Passwords do not match"}
        </p>
      )}
    </>
  );
}
