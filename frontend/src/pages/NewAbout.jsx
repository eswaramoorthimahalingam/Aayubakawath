import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Helmet } from "react-helmet-async";

import heroBg from "../assets/images/about/about.jpeg";
import img0 from "../assets/images/about/53.jpg";
import img1 from "../assets/images/about/54.jpg";
import img2 from "../assets/images/about/55.jpg";
import img3 from "../assets/images/resar.jpeg";
import img4 from "../assets/images/about/img.jpg";

const MotionDiv = motion.div;

/* ── Scroll-triggered reveal ── */
function Reveal({ children, delay = 0, x = 0, className = "" }) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 32, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </MotionDiv>
  );
}

/* ── Eyebrow label ── */
function Eyebrow({ text, light, center = false }) {
  return (
    <div
      className={`flex items-center gap-3 mb-5 ${center ? "justify-center" : ""}`}
    >
      <span
        className="block w-8 h-px"
        style={{
          background: light ? "rgba(255,255,255,0.4)" : "var(--color-sage)",
        }}
      />
      <span
        className="font-body font-semibold uppercase tracking-[0.22em]"
        style={{
          fontSize: "1.5rem",
          color: light ? "rgba(255,255,255,0.55)" : "var(--color-text-muted)",
        }}
      >
        {text}
      </span>
      <span
        className="block w-8 h-px"
        style={{
          background: light ? "rgba(255,255,255,0.4)" : "var(--color-sage)",
        }}
      />
    </div>
  );
}

const stats = [
  { value: "100%", label: "Natural Ingredients" },
  { value: "10K+", label: "Families Supported" },
  { value: "15+", label: "Product Variants" },
  { value: "5★", label: "Avg. Rating" },
];

const sections = [
  {
    tag: "Who We Are",
    title: "Founded on a Vision of Healthier Lives.",
    body: "Aayubakwath was founded to support healthier lives through natural wellness solutions. In today's fast-paced world, individuals face increasing health challenges — unstable blood sugar, high cholesterol, mental fatigue, and reduced concentration.\n\nWe address these issues through carefully developed, scientifically formulated supplements that harmoniously combine nutrition with evidence-based botany.",
    image: img0,
  },
  {
    tag: "What We Do",
    title: "Supplements for Modern Life.",
    body: "We develop supplements that integrate scientifically backed ingredients with traditional knowledge to create effective solutions for modern lifestyles.\n\nWe are extremely committed to maintaining the strictest quality standards throughout our entire production process.",
    image: img1,
    reverse: true,
  },
  {
    tag: "Our Mission",
    title: "Three Values at Our Core.",
    values: [
      {
        label: "Purity",
        desc: "Premium health supplements made with carefully vetted organic ingredients.",
      },
      {
        label: "Trust",
        desc: "Long-term relationships built on total transparency and clinical reliability.",
      },
      {
        label: "Wellness",
        desc: "Supporting healthier lifestyles sustainably through true nutritional support.",
      },
    ],
    image: img2,
  },
  {
    tag: "Our Vision",
    title: "The Future of Herbal Wellness.",
    body: "Our vision is to become the most trusted wellness brand globally, renowned for providing reliable and high-quality nutritional supplements that genuinely support your long-term health.\n\nWe strive to empower people with minimalist, natural health solutions that quietly maintain your energy and mental clarity.",
    image: img3,
    reverse: true,
  },
  {
    tag: "Quality Commitment",
    title: "Absolute Clinical Precision.",
    body: "We follow unforgiving quality guidelines during sourcing, formulation, and manufacturing. Every single batch is produced with rigorous hygiene, consistency, and care to ensure ultra-premium grade outcomes.\n\nOur goal is to provide safe, highly effective, and beautiful health supplements that seamlessly fit your lifestyle.",
    image: img4,
  },
];

export default function NewAbout() {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <>
      <Helmet>
        <title>About Us — Aayubakwath</title>
      </Helmet>

      {/* ══════════════════════════════════
          01. HERO
      ══════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative w-full h-[clamp(500px,calc(100vh-150px),620px)] overflow-hidden"
      >
        <MotionDiv
          className="absolute inset-0 will-change-transform"
          style={{ y: heroY }}
        >
          <img
            src={heroBg}
            alt="About Aayubakwath"
            className="w-full h-full object-cover scale-105"
            style={{ objectPosition: "58% 44%" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(8,15,12,0.88) 0%, rgba(8,15,12,0.7) 31%, rgba(8,15,12,0.18) 62%, rgba(8,15,12,0.04) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(8,15,12,0.08) 0%, rgba(8,15,12,0.02) 52%, rgba(8,15,12,0.18) 100%)",
            }}
          />
        </MotionDiv>

        <div className="relative z-10 h-full flex items-center px-5 sm:px-8 lg:px-12 max-w-[1400px] mx-auto hero-text-fix">
          <div className="max-w-[620px]">
            <Reveal delay={0.15}>
              <div className="mb-6 inline-flex items-center gap-3 border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-[#8bc53f]" />
                <span className="font-body text-xs font-semibold uppercase text-white/85">
                  About Aayubakwath
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.25}>
              <h1
                className="font-display font-semibold text-white leading-[0.98] mb-6"
                style={{
                  fontSize: "clamp(3.25rem, 8vw, 6.75rem)",
                  letterSpacing: 0,
                  textShadow: "0 20px 60px rgba(0,0,0,0.35)",
                }}
              >
                Purity
                <span className="text-[#9fd34a]">,</span>
                <br />
                <span className="italic text-white/88">Redefined.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.35}>
              <p
                className="font-body max-w-[520px] leading-relaxed text-white/82"
                style={{ fontSize: "clamp(1rem, 1.5vw, 1.22rem)" }}
              >
                Supporting your pursuit of absolute health with uncompromised,
                clinical-grade natural formulations.
              </p>
            </Reveal>
            <Reveal delay={0.45}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => navigate("/productListing")}
                  className="border border-white/10 bg-white px-6 py-3 font-body text-sm font-semibold uppercase text-[#172014] shadow-[0_18px_45px_rgba(0,0,0,0.22)] transition hover:bg-[#f5f8ef]"
                >
                  Explore Products
                </button>
                <button
                  onClick={() => navigate("/contact")}
                  className="border border-white/25 px-6 py-3 font-body text-sm font-semibold uppercase text-white transition hover:border-white/55 hover:bg-white/10"
                >
                  Contact Us
                </button>
              </div>
            </Reveal>
          </div>

          {/* Scroll hint */}
          <div className="absolute right-8 bottom-10 hidden lg:flex flex-col items-center gap-3">
            {/* <div className="w-px h-10 bg-white/15 relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 w-full bg-white/50"
                animate={{ height: ["0%", "100%"], top: ["0%", "100%"] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div> */}
            {/* <span
              className="font-body text-white/25 uppercase tracking-[0.25em]"
              style={{ fontSize: "0.5rem" }}
            >
              Scroll
            </span> */}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          02. MANIFESTO BAND
      ══════════════════════════════════ */}
      <section
        style={{ background: "#829b1c" }}
        className="py-2 overflow-hidden"
      >
        <div className="flex items-center  animate-marquee whitespace-nowrap">
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="font-display font-medium text-white mx-10 shrink-0"
              style={{
                fontSize: "clamp(1.1rem, 2vw, 1.6rem)",
                letterSpacing: "-0.01em",
              }}
            >
              The Philosophy of Extraction &nbsp;·&nbsp; Rooted in Nature
              &nbsp;·&nbsp; Guided by Science
            </span>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════
          03. STATS STRIP
      ══════════════════════════════════ */}
      <section
        className="border-b border-(--color-border)"
        style={{ background: "var(--color-bg)" }}
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-(--color-border)">
            {stats.map((s, i) => (
              <Reveal
                key={i}
                delay={i * 0.08}
                className="text-center py-12 px-4"
              >
                <p
                  className="font-display font-medium text-(--color-text) leading-none mb-2"
                  style={{
                    fontSize: "clamp(2.8rem, 5vw, 2rem)",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {s.value}
                </p>
                <p
                  className="font-body text-(--color-text-muted) uppercase tracking-[0.18em]"
                  style={{ fontSize: "0.6rem" }}
                >
                  {s.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          04. PHILOSOPHY HEADER
      ══════════════════════════════════ */}
      <section
        className="py-10 md:py-10"
        style={{ background: "var(--color-bg-soft)" }}
      >
        <div className="max-w-[1400px] mx-auto px-3 lg:px-4 pt-0 text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-4 pt-0">
              <div className="w-8 h-px bg-[var(--color-sage)]" />
              <p
                className="label "
                style={{ fontSize: "1.5rem", fontWeight: "700" }}
              >
                What We Do
              </p>
              <div className="w-8 h-px bg-[var(--color-sage)]" />
            </div>
            {/* <Eyebrow text="" /> */}
            <h2
              className="font-display font-medium pt-10 text-(--color-text) leading-[1.05] mb-6"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 5rem)",
                letterSpacing: "-0.04em",
              }}
            >
              The Philosophy of{" "}
              <span
                style={{
                  color: "#829b1c",
                  fontStyle: "italic",
                }}
              >
                Extraction
              </span>
            </h2>
            <p
              className="font-body text-(--color-text-secondary) leading-relaxed mx-auto"
              style={{ fontSize: "clamp(1rem, 1.4vw, 2rem)", maxWidth: 640 }}
            >
              We harmonize native organic botanical wisdom with rigorous,
              state-of-the-art modern processing standards to yield
              uncompromising health solutions.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════
          05. ALTERNATING STORY SECTIONS
      ══════════════════════════════════ */}
      {sections.map((section, i) => (
        <section
          key={i}
          className="py-20 md:py-10 border-t border-(--color-border)"
          style={{
            background:
              i % 2 === 0 ? "var(--color-bg)" : "var(--color-bg-muted)",
          }}
        >
          <div className="max-w-[1400px] mx-auto px-3 lg:px-4">
            <div
              className={`grid lg:grid-cols-2 gap-14 lg:gap-20 items-center ${section.reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
            >
              {/* Image */}
              <Reveal x={section.reverse ? 24 : -24} delay={0.05}>
                <div className="relative aspect-4/3 rounded-3xl overflow-hidden group">
                  <img
                    src={section.image}
                    alt={section.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[10s]"
                  />
                  <div className="absolute inset-0 border border-black/5 rounded-3xl pointer-events-none" />
                </div>
              </Reveal>

              {/* Text */}
              <Reveal x={section.reverse ? -24 : 24} delay={0.12}>
                <div className="max-w-[980px]">
                  <Eyebrow text={section.tag} center />
                </div>
                <h2
                  className="font-display font-medium text-(--color-text) leading-[1.05] mb-8"
                  style={{
                    fontSize: "clamp(2rem, 3.5vw, 3.5rem)",
                    letterSpacing: "-0.025em",
                  }}
                >
                  {section.title.split(".").map((part, j, arr) =>
                    j === arr.length - 1 ? (
                      part
                    ) : (
                      <React.Fragment key={j}>
                        {part}
                        <span style={{ color: "var(--color-border-medium)" }}>
                          .
                        </span>
                      </React.Fragment>
                    ),
                  )}
                </h2>

                {section.body && (
                  <div className="space-y-4">
                    {section.body.split("\n\n").map((para, j) => (
                      <p
                        key={j}
                        className="font-body text-(--color-text-secondary) leading-relaxed"
                        style={{ fontSize: "1rem" }}
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                )}

                {section.values && (
                  <div className="space-y-7 pt-2">
                    {section.values.map((v, j) => (
                      <div
                        key={j}
                        className="flex gap-5 items-start pb-7 border-b border-(--color-border) last:border-0 last:pb-0"
                      >
                        <span
                          className="font-display font-medium shrink-0"
                          style={{
                            fontSize: "1.6rem",
                            letterSpacing: "-0.02em",
                            color: "var(--color-border-medium)",
                          }}
                        >
                          0{j + 1}
                        </span>
                        <div>
                          <h4
                            className="font-display font-medium text-(--color-text) mb-1.5"
                            style={{
                              fontSize: "1.25rem",
                              letterSpacing: "-0.01em",
                            }}
                          >
                            {v.label}
                          </h4>
                          <p
                            className="font-body text-(--color-text-secondary) leading-relaxed"
                            style={{ fontSize: "0.95rem" }}
                          >
                            {v.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* ══════════════════════════════════
          06. QUOTE SECTION
      ══════════════════════════════════ */}
      <section
        className="relative py-15 overflow-hidden"
        style={{ background: "var(--color-accent)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.04), transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.03), transparent 50%)",
          }}
        />
        <div className="relative z-10 max-w-[1400px] mx-auto px-3 lg:px-4 text-center">
          <Reveal>
            {/* <div className="w-8 h-px bg-white/25 mx-auto mb-8" /> */}
            <blockquote
              className="font-display font-medium text-white leading-[1.1] mx-auto"
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                letterSpacing: "-0.03em",
                maxWidth: 900,
              }}
            >
              "Wellness isn't a product —<br />
              <span style={{ color: "#829b1c", fontStyle: "italic" }}>
                it's a practice.
              </span>
              <br />
              We're here to support yours, every day."
            </blockquote>
            <p
              className="font-body text-white/50 mt-8 uppercase tracking-[0.25em]"
              style={{ fontSize: "1rem" }}
            >
              The Aayubakwath Philosophy
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════
          07. CTA FOOTER
      ══════════════════════════════════ */}
      <section
        className="py-28 md:py-15"
        style={{ background: "var(--color-bg-muted)" }}
      >
        <div className="max-w-[1400px] mx-auto px-3 lg:px-4 text-center">
          <Reveal>
            <Eyebrow text="Begin Your Journey" center />
            <h2
              className="font-display font-medium text-(--color-text) leading-none mb-5"
              style={{
                fontSize: "clamp(2.8rem, 7vw, 6rem)",
                letterSpacing: "-0.04em",
              }}
            >
              Experience Truest
              <br />
              <span
                style={{
                  color: "#829b1c",
                  fontStyle: "italic",
                }}
              >
                Health Today.
              </span>
            </h2>
            <p
              className="font-body text-(--color-text-secondary) leading-relaxed mb-10 mx-auto"
              style={{ fontSize: "1.05rem", maxWidth: 460 }}
            >
              Elevate your baseline. Discover our meticulously crafted
              collection.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate("/productListing")}
                className="btn-primary"
              >
                Explore Collection
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="btn-ghost"
              >
                Contact Us
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
