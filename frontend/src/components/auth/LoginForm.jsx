import React from "react";
import { Link } from "react-router-dom";
import EyeToggleIcon from "./EyeToggleIcon";

export default function LoginForm({ form, showPassword, setShowPassword, handleChange, handleSubmit, isLoading }) {
  return (
    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
      <div>
        <label className="block text-[11px] font-semibold tracking-[0.12em] uppercase text-[#111827] mb-2 opacity-80">
          Email Address
        </label>
        <div className="relative group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#111827] transition-colors">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-[18px] h-[18px]"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
            className="inp-field w-full pl-[2.75rem] pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 text-[15px] font-medium text-[#111827]"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-[11px] font-semibold tracking-[0.12em] uppercase text-[#111827] opacity-80">
            Password
          </label>
          <Link
            to="/forgot-password"
            className="text-[12px] text-[#111827] font-semibold hover:text-gray-600 transition-colors"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#111827] transition-colors">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-[18px] h-[18px]"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </span>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
            className="inp-field w-full pl-[2.75rem] pr-12 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 text-[15px] font-medium text-[#111827]"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#111827] transition-colors"
          >
            <EyeToggleIcon open={showPassword} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <div className="relative shrink-0">
          <input
            type="checkbox"
            name="remember"
            id="remember"
            checked={form.remember}
            onChange={handleChange}
            className="sr-only"
          />
          <label
            htmlFor="remember"
            className="w-5 h-5 rounded-md flex items-center justify-center cursor-pointer transition-all duration-300"
            style={{
              background: form.remember ? "#111827" : "white",
              border: `2px solid ${form.remember ? "#111827" : "#e5e7eb"}`,
            }}
          >
            {form.remember && (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3 h-3"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </label>
        </div>
        <label
          htmlFor="remember"
          className="text-[14px] font-medium text-gray-600 cursor-pointer select-none"
        >
          Keep me signed in
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="submit-btn w-full mt-8 py-4 rounded-xl text-white text-[14px] font-semibold tracking-wider disabled:opacity-60 disabled:cursor-not-allowed bg-[#111827]"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-3">
            <svg
              className="animate-spin w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="white"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="white"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
            Authenticating...
          </span>
        ) : (
          "Secure Sign In"
        )}
      </button>
    </form>
  );
}
