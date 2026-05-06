import React from "react";
import { Link } from "react-router-dom";
import EyeToggleIcon from "./EyeToggleIcon";
import { UserIcon, MailIcon, LockIcon } from "./AuthIcons";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";

export default function RegisterForm({
  form,
  handleChange,
  handleSubmit,
  mutation,
  showPassword,
  setShowPassword,
  showConfirm,
  setShowConfirm,
  passwordChecks,
}) {
  return (
    <div className="flex-1 bg-white flex flex-col justify-center px-8 lg:px-16 py-12 relative overflow-hidden">
      <div className="flex lg:hidden items-center gap-2 mb-8">
        <div className="w-8 h-8 rounded-lg bg-[#111827] flex items-center justify-center">
          <span className="text-white font-semibold text-sm">A</span>
        </div>
        <span className="text-[#111827] font-semibold text-lg">
          Aayubakwath
        </span>
      </div>

      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-100 mb-5">
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-400">
            New Account
          </span>
        </div>
        <h1 className="text-[32px] font-semibold text-[#111827] mb-2 tracking-tight">
          Create Account
        </h1>
        <p className="text-gray-500 text-[15px] font-medium leading-relaxed">
          Fill in your details below to get started.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div>
          <label className="block text-[11px] font-semibold tracking-[0.12em] uppercase text-[#111827] mb-2 opacity-80">
            Full Name
          </label>
          <div className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#111827] transition-colors">
              <UserIcon />
            </span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
              className="inp-field w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 text-[15px] font-medium text-[#111827]"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold tracking-[0.12em] uppercase text-[#111827] mb-2 opacity-80">
            Email Address
          </label>
          <div className="relative group">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#111827] transition-colors">
              <MailIcon />
            </span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="inp-field w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 text-[15px] font-medium text-[#111827]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-[11px] font-semibold tracking-[0.12em] uppercase text-[#111827] mb-2 opacity-80">
              Password
            </label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#111827] transition-colors">
                <LockIcon />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Create password"
                className="inp-field w-full pl-11 pr-12 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 text-[15px] font-medium text-[#111827]"
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

          <div>
            <label className="block text-[11px] font-semibold tracking-[0.12em] uppercase text-[#111827] mb-2 opacity-80">
              Confirm
            </label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#111827] transition-colors">
                <LockIcon />
              </span>
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Repeat password"
                className="inp-field w-full pl-11 pr-12 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 text-[15px] font-medium text-[#111827]"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#111827] transition-colors"
              >
                <EyeToggleIcon open={showConfirm} />
              </button>
            </div>
          </div>
        </div>

        <PasswordStrengthIndicator
          passwordChecks={passwordChecks}
          password={form.password}
          confirmPassword={form.confirmPassword}
        />

        <div className="flex items-start gap-3 pt-2">
          <div className="relative mt-0.5 shrink-0">
            <input
              type="checkbox"
              name="agree"
              id="agree"
              checked={form.agree}
              onChange={handleChange}
              className="sr-only"
            />
            <label
              htmlFor="agree"
              className="w-5 h-5 rounded-md flex items-center justify-center cursor-pointer transition-all duration-300"
              style={{
                background: form.agree ? "#111827" : "white",
                border: `2px solid ${form.agree ? "#111827" : "#e5e7eb"}`,
              }}
            >
              {form.agree && (
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
            htmlFor="agree"
            className="text-[14px] font-medium text-gray-600 cursor-pointer leading-relaxed"
          >
            I agree to the{" "}
            <a
              href="#"
              className="text-[#111827] font-semibold hover:text-gray-600 transition-colors"
            >
              Terms & Conditions
            </a>
            {" and "}
            <a
              href="#"
              className="text-[#111827] font-semibold hover:text-gray-600 transition-colors"
            >
              Privacy Policy
            </a>
          </label>
        </div>

        <button
          type="submit"
          disabled={mutation.isLoading}
          className="submit-btn w-full mt-8 py-4 rounded-xl text-white text-[14px] font-semibold tracking-wider disabled:opacity-60 disabled:cursor-not-allowed bg-[#111827]"
        >
          {mutation.isLoading ? (
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
              Creating Account...
            </span>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      <div className="mt-8 flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-100" />
        <span className="text-xs text-gray-300 font-semibold">or</span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      <p className="mt-8 text-center text-[14px] font-medium text-gray-500">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-[#111827] font-semibold hover:text-gray-600 transition-colors"
        >
          Sign In
        </Link>
      </p>

      <div className="mt-5 flex items-center justify-center gap-1.5 text-gray-300 text-xs">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-3.5 h-3.5"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <span>256-bit SSL · Secured & Encrypted</span>
      </div>
    </div>
  );
}
