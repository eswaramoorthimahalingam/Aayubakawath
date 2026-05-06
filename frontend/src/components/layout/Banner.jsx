import { useState } from "react";
import ban1 from "../../assets/images/ban1.jpeg";

export default function Banner() {
  return (
    <section className="w-full border-b border-[var(--color-border)] bg-white">
      <div className="relative mx-auto w-full max-w-[1600px] overflow-hidden min-h-[360px] sm:min-h-[430px] lg:min-h-[500px] xl:min-h-[540px] flex items-center justify-center">
        <img
          src={ban1}
          alt="Main Banner"
          className="w-full h-auto object-contain"
        />
      </div>
    </section>
  );
}
