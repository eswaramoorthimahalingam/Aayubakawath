import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Amit Sharma",
    title: "Health Enthusiast",
    image:
      "https://media.gettyimages.com/id/1311655328/photo/im-the-best-asset-in-my-business.jpg?s=612x612&w=0&k=20&c=ebkVt_iY6rRjXvyx2CESPC8EtcWrv0nYt_y4IdKmN3M=",
    quote:
      "I've been using this supplement for a month now and noticed better control in my sugar levels. It really supports my daily routine along with proper diet. Feeling more stable and energetic.",
  },
  {
    id: 2,
    name: "Priya Verma",
    title: "Wellness Blogger",
    image:
      "https://media.istockphoto.com/id/1598828828/photo/portrait-of-successful-mature-boss-senior-businessman-in-business-suit-looking-at-camera-and.jpg?s=612x612&w=0&k=20&c=rDFntGhTIr4qIp4aasGq0fMgKszA23kAsWHmnJ7m1AU=",
    quote:
      "I was struggling with fatigue, but Aayubakwath really helped me. It gives a natural boost without any side effects. Very satisfied with the results.",
  },
  {
    id: 3,
    name: "Rahul Singh",
    title: "Certified Fitness Coach",
    image:
      "https://media.istockphoto.com/id/1398994132/photo/happy-businesswoman-using-a-digital-tablet-young-leading-businesswoman-using-a-wireless.jpg?s=612x612&w=0&k=20&c=BM3E3osJBZSukhs98G6vn7HXe8QQTExGaymi2a61T3E=",
    quote:
      "After using this brain tonic, my focus and alertness improved noticeably. Now I feel more sharp, productive, and confident throughout the day. Truly a game changer.",
  },
  {
    id: 4,
    name: "Deepika Nair",
    title: "Yoga Instructor",
    image:
      "https://media.gettyimages.com/id/1311655328/photo/im-the-best-asset-in-my-business.jpg?s=612x612&w=0&k=20&c=ebkVt_iY6rRjXvyx2CESPC8EtcWrv0nYt_y4IdKmN3M=",
    quote:
      "The quality of these products is unmatched. I feel the difference in my energy and overall health. My entire family now uses Aayubakwath products daily.",
  },
  {
    id: 5,
    name: "Suresh Kumar",
    title: "Software Engineer",
    image:
      "https://media.istockphoto.com/id/1598828828/photo/portrait-of-successful-mature-boss-senior-businessman-in-business-suit-looking-at-camera-and.jpg?s=612x612&w=0&k=20&c=rDFntGhTIr4qIp4aasGq0fMgKszA23kAsWHmnJ7m1AU=",
    quote:
      "Pure natural ingredients, no side effects, and genuinely effective. I've tried many brands but Aayubakwath stands apart in quality and results. Worth every rupee.",
  },
  {
    id: 6,
    name: "Meena Krishnan",
    title: "College Student",
    image:
      "https://media.istockphoto.com/id/1398994132/photo/happy-businesswoman-using-a-digital-tablet-young-leading-businesswoman-using-a-wireless.jpg?s=612x612&w=0&k=20&c=BM3E3osJBZSukhs98G6vn7HXe8QQTExGaymi2a61T3E=",
    quote:
      "I love the herbal drops. It's lightweight, absorbs quickly and gives a natural healthy boost. Spending just a few weeks and I can already feel the difference in the way I feel.",
  },
];

function ReviewCard({ testimonial }) {
  return (
    <div
      className="bg-white rounded-2xl p-7 flex flex-col gap-5 h-full"
      style={{ minHeight: 260 }}
    >
      {/* Avatar */}
      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-100 shrink-0">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Quote */}
      <p
        className="font-body leading-relaxed flex-1"
        style={{
          color: "var(--color-text-secondary)",
          fontSize: "clamp(0.9rem, 1.1vw, 1rem)",
        }}
      >
        {testimonial.quote}
      </p>

      {/* Author */}
      <div>
        <p
          className="font-body font-semibold text-base leading-tight"
          style={{ color: "var(--color-text)" }}
        >
          {testimonial.name}
        </p>
        <p
          className="font-body text-sm mt-0.5"
          style={{ color: "var(--color-text-muted)" }}
        >
          {testimonial.title}
        </p>
      </div>
    </div>
  );
}

export default function Testimonial() {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(520);

  const count = testimonials.length;

  useEffect(() => {
    const updateWidth = () => {
      const w = window.innerWidth;
      if (w < 640) setCardWidth(w - 48);
      else if (w < 768) setCardWidth(340);
      else if (w < 1024) setCardWidth(420);
      else setCardWidth(520);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const GAP = 20;

  const prev = () => setCurrent((c) => (c - 1 + count) % count);
  const next = () => setCurrent((c) => (c + 1) % count);

  useEffect(() => {
    if (!trackRef.current) return;
    trackRef.current.style.transform = `translateX(-${current * (cardWidth + GAP)}px)`;
  }, [current, cardWidth]);

  return (
    <section
      className="w-full max-w-full overflow-x-hidden py-12 md:py-20"
      style={{ background: "var(--color-bg-muted)" }}
    >
      <div className="w-full max-w-full flex flex-col lg:flex-row gap-8 lg:gap-0 items-start px-4 sm:px-6 lg:pl-20 xl:pl-28 lg:pr-0">
        {/* ── Left: Heading ── */}
        <div className="w-full lg:w-72 xl:w-80 shrink-0 lg:pr-8 xl:pr-12 pt-2">
          <h2
            className="display-heading text-[var(--color-text)]"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
          >
            What Our Customers Say
          </h2>
          <p
            className="font-body leading-relaxed"
            style={{
              color: "var(--color-text-secondary)",
              fontSize: "clamp(0.85rem, 1vw, 1.3rem)",
            }}
          >
            We value your trust &amp; feedback. Our #AayubakwathTribe results
            &amp; reviews are 100% honest. No retouch.
          </p>
        </div>

        {/* ── Right: Carousel (overflows right edge) ── */}
        <div className="w-full max-w-full flex-1 min-w-0 flex flex-col gap-6 overflow-hidden">
          {/* Track */}
          <div className="w-full max-w-full overflow-hidden">
            <div
              ref={trackRef}
              className="flex"
              style={{
                gap: GAP,
                transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                willChange: "transform",
              }}
            >
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  style={{ width: cardWidth, minWidth: cardWidth }}
                >
                  <ReviewCard testimonial={t} />
                </div>
              ))}
            </div>
          </div>

          {/* ── Navigation: arrows + dots ── */}
          <div className="flex items-center justify-between gap-2">
            {/* Prev */}
            <button
              onClick={prev}
              aria-label="Previous"
              className="w-9 h-9 rounded-full border border-gray-300 bg-white
                flex items-center justify-center hover:border-gray-400
                transition-colors duration-200 shrink-0"
            >
              <ChevronLeft size={14} className="text-gray-600" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Review ${i + 1}`}
                  className="rounded-full transition-all duration-300 shrink-0"
                  style={{
                    height: 8,
                    width: i === current ? 24 : 8,
                    background:
                      i === current
                        ? "var(--color-sage)"
                        : "var(--color-border-medium)",
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>

            {/* Next */}
            <button
              onClick={next}
              aria-label="Next"
              className="w-9 h-9 rounded-full border border-gray-300 bg-white
                flex items-center justify-center hover:border-gray-400
                transition-colors duration-200 shrink-0"
            >
              <ChevronRight size={14} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
