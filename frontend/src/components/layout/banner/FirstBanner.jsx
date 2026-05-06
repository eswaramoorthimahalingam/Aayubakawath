import React from "react";
import firstOrderBanner from "../../../assets/images/first-order-banner.jpeg";
import { useNavigate } from "react-router-dom";

export default function FirstBanner() {
  const navigate = useNavigate();

  return (
    <div
      className="group relative w-full cursor-pointer overflow-hidden rounded-[24px] bg-white"
      onClick={() => navigate("/productListing")}
    >
      <img
        src={firstOrderBanner}
        alt="Get 30% for first order"
        className="block w-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
      />
      <div className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-black/5" />
    </div>
  );
}
