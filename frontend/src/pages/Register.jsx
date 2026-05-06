import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../config/authApi";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import RegisterBrandingPanel from "../components/auth/RegisterBrandingPanel";
import RegisterForm from "../components/auth/RegisterForm";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const passwordChecks = {
    length: form.password.length >= 8,
    upper: /[A-Z]/.test(form.password),
    lower: /[a-z]/.test(form.password),
    number: /[0-9]/.test(form.password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(form.password),
  };

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: ({ token, refreshToken }) => {
      login({ token, refreshToken });
      toast.success("Account created successfully!");
      setTimeout(() => navigate("/"), 1500);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword)
      return toast.error("Passwords do not match!");
    if (!Object.values(passwordChecks).every(Boolean))
      return toast.error("Password does not meet all requirements.");
    if (!form.agree) return toast.warning("You must agree to the terms!");
    mutation.mutate({
      name: form.name,
      email: form.email,
      password: form.password,
    });
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
          <RegisterBrandingPanel />
          <RegisterForm
            form={form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            mutation={mutation}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirm={showConfirm}
            setShowConfirm={setShowConfirm}
            passwordChecks={passwordChecks}
          />
        </div>
      </div>
    </div>
  );
}
