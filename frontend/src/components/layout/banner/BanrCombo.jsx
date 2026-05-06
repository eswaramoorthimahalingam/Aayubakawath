import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getOfferBanners } from "../../../services/offerService";

export default function BanrCombo() {
  const { data: banners = [], isLoading } = useQuery({
    queryKey: ["offerBanners"],
    queryFn: getOfferBanners,
  });

  if (isLoading) {
    return (
      <div className="w-full h-[250px] md:h-[400px] lg:h-[500px] bg-[var(--color-bg-soft)] animate-pulse rounded-none"></div>
    );
  }

  const bannerUrl = banners[0]?.image;
  if (!bannerUrl) return null;

  return (
    <div className="w-full overflow-hidden">
      <div className="relative w-full group cursor-pointer">
        <img
          src={bannerUrl}
          alt="Offer Banner"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
        />
      </div>
    </div>
  );
}
