import React from "react";
import Banner from "../components/layout/Banner";
import HomeQuickShop from "../components/layout/HomeQuickShop";
import OfferScrollBar from "../components/layout/OfferScrollBar";
import CategoryList from "../components/product/CategoryList";
import FirstBanner from "../components/layout/banner/FirstBanner";
import TopSelling from "../components/product/TopSelling";
import OurStory from "../components/layout/OurStory";
import SecondBanner from "../components/layout/banner/SecondBanner";
import Testimonial from "../components/layout/Testimonial";
import RewardsCard from "../components/common/RewardsCard";
import ProductGrid from "../components/product/ProductGrid";
import ClientReview from "../components/clientReview/ClientReview";
import BanrCombo from "../components/layout/banner/BanrCombo";
import Certificate from "./Certificate";
import { Helmet } from "react-helmet-async";
import LazySection from "../components/common/LazySection";
import OurBusiness from "./AboutPage";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

export default function Home() {
  return (
    <div className="w-full max-w-full bg-white overflow-x-hidden">
      <Helmet>
        <title>Aayubakwath — Premium Ayurvedic Wellness</title>
      </Helmet>

      <HomeQuickShop />

      <Banner variant="home" />

      <motion.div {...fadeUp} className="w-full overflow-x-hidden">
        <div className="w-full border-y border-[var(--color-border)] overflow-hidden bg-[var(--color-bg-soft)]">
          <OfferScrollBar />
        </div>
      </motion.div>

      {/* Our Collections */}
      <motion.section
        {...fadeUp}
        className="w-full max-w-[1400px] mx-auto px-3 lg:px-4 pt-6 pb-4 overflow-x-hidden"
      >
        <div className="flex items-center justify-center gap-4 py-4">
          <div className="w-8 h-px bg-[var(--color-sage)]" />
          <p
            className="label whitespace-nowrap"
            style={{ fontSize: "clamp(1.25rem, 4vw, 2rem)", fontWeight: "500" }}
          >
            Browse
          </p>
          <div className="w-8 h-px bg-[var(--color-sage)]" />
        </div>
        <h2
          className="display-heading text-[var(--color-text)] mb-4"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
        >
          Our Collections
        </h2>
        <LazySection minHeight={200}>
          <CategoryList />
        </LazySection>
      </motion.section>

      <motion.div
        {...fadeUp}
        className="w-full max-w-full px-3 lg:px-4 overflow-x-hidden"
      >
        <div className="w-full max-w-[1400px] mx-auto overflow-hidden rounded-[var(--radius-lg)]">
          <FirstBanner />
        </div>
      </motion.div>

      {/* Our Products */}
      <motion.section
        {...fadeUp}
        className="w-full max-w-[1400px] mx-auto px-3 lg:px-4 pt-5 pb-4 overflow-x-hidden"
      >
        <LazySection minHeight={400}>
          <ProductGrid />
        </LazySection>
      </motion.section>

      {/* Our Story */}
      <motion.div {...fadeUp}>
        <LazySection minHeight={300}>
          <div
            className="w-full max-w-[1400px] mx-auto px-3 lg:px-4
            border-t border-[var(--color-border)] overflow-x-hidden"
          >
            <OurStory />
          </div>
        </LazySection>
      </motion.div>

      {/* About */}
      <motion.div {...fadeUp}>
        <LazySection minHeight={300}>
          <div className="w-full max-w-[1400px] mx-auto px-3 lg:px-4 pb-5 overflow-x-hidden">
            <OurBusiness />
          </div>
        </LazySection>
      </motion.div>

      <motion.div {...fadeUp} className="w-full max-w-full overflow-x-hidden">
        <LazySection minHeight={250}>
          <BanrCombo />
        </LazySection>
      </motion.div>

      {/* Top Selling */}
      <motion.section
        {...fadeUp}
        className="w-full max-w-[1400px] mx-auto px-3 lg:px-4 pt-3 pb-4 overflow-x-hidden"
      >
        {/* <div className="flex items-center gap-3 mb-1.5">
          <div className="w-8 h-px bg-[var(--color-sage)]" />
          <p className="label">Most Loved</p>
        </div>
        <h2
          className="display-heading text-[var(--color-text)] mb-4"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
        >
          Top Selling Products
        </h2> */}
        <LazySection minHeight={400}>
          <TopSelling />
        </LazySection>
      </motion.section>

      <motion.div {...fadeUp}>
        <LazySection minHeight={120}>
          <SecondBanner />
        </LazySection>
      </motion.div>

      {/* Community — Customer Reviews */}
      <motion.section
        {...fadeUp}
        className="w-full max-w-full overflow-x-hidden bg-[var(--color-bg-soft)] border-y border-[var(--color-border)] py-12 sm:py-16 lg:py-20"
      >
        <div className="flex items-center justify-center gap-4 py-4">
          <div className="w-8 h-px bg-[var(--color-sage)]" />
          <p
            className="label whitespace-nowrap"
            style={{
              fontSize: "clamp(1.25rem, 4vw, 2rem)",
              fontWeight: "500",
            }}
          >
            Our Community
          </p>
          <div className="w-8 h-px bg-[var(--color-sage)]" />
        </div>
        <div className="w-full max-w-[1400px] mx-auto px-3 lg:px-4 overflow-x-hidden">
          <h2
            className="display-heading text-[var(--color-text)] text-center mb-8"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
          >
            What Our Customers Say
          </h2>
          <LazySection minHeight={300}>
            <ClientReview />
          </LazySection>
          <div className="mt-8">
            <LazySection minHeight={150}>
              <Certificate />
            </LazySection>
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.div {...fadeUp}>
        <LazySection minHeight={400}>
          <Testimonial />
        </LazySection>
      </motion.div>

      <LazySection minHeight={100}>
        <RewardsCard />
      </LazySection>
    </div>
  );
}
