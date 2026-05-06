import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../config/authApi";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import LoginForm from "../components/auth/LoginForm";
import LoginBrandingPanel from "../components/auth/LoginBrandingPanel";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: ({ token, refreshToken }) => {
      login({ token, refreshToken });
      toast.success("Welcome back! Login successful.");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ email: form.email, password: form.password });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 lg:p-8">
      <style>{`
        @keyframes slideUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        .slide-up { animation: slideUp 0.55s cubic-bezier(0.16,1,0.3,1) both; }
        .inp-field { transition: all 0.3s ease; }
        .inp-field:focus { outline: none; border-color: #111827; box-shadow: 0 0 0 4px rgba(17,17,17,0.06); background-color: white; }
        .inp-field::placeholder { color: #d1d5db; }
        .submit-btn { transition: all 0.3s ease; }
        .submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 14px 30px rgba(0,0,0,0.12); }
        .submit-btn:active:not(:disabled) { transform: translateY(0); }
      `}</style>

      <div
        className="slide-up w-full max-w-5xl rounded-3xl overflow-hidden border border-gray-100 shadow-[0_24px_60px_rgba(0,0,0,0.08),0_8px_20px_rgba(0,0,0,0.04)]"
      >
        <div className="flex flex-col lg:flex-row">
          <LoginBrandingPanel />

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
                <span className="w-1.5 h-1.5 rounded-full bg-[#111827]/60 animate-pulse" />
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gray-400">
                  Secure Access
                </span>
              </div>
              <h1 className="text-[32px] font-semibold text-[#111827] mb-2 tracking-tight">
                Welcome Back
              </h1>
              <p className="text-gray-500 text-[15px] font-medium leading-relaxed">
                Enter your credentials to access your account.
              </p>
            </div>

            <LoginForm
              form={form}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              isLoading={mutation.isLoading}
            />

            <div className="mt-7 flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-300 font-semibold">or</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            <p className="mt-8 text-center text-[14px] font-medium text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-[#111827] font-semibold hover:text-gray-600 transition-colors"
              >
                Create Account
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
        </div>
      </div>
    </div>
  );
}
