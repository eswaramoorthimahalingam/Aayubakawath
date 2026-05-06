import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import blogBanner from "../assets/images/blog/5.jpg";
import blogPosts, { categories } from "../data/blogData";
import {
  ArrowRight,
  Calendar,
  Clock,
  Sparkles,
  Search,
  BookOpen,
  TrendingUp,
} from "lucide-react";

function Reveal({ children, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className="h-full"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.8s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.8s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);

  const filtered =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  const visiblePosts = filtered.slice(0, visibleCount);
  const shownCount = visiblePosts.length;

  return (
    <>
      <Helmet>
        <title>Blog - Aayubakwath</title>
        <meta
          name="description"
          content="Read the latest articles on health, wellness, lifestyle, and more at Aayubakwath Blog."
        />
      </Helmet>

      <div className="relative bg-white min-h-screen">
        {/* ── Hero ── */}
        <div className="relative w-full pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-60" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gray-200 rounded-full blur-3xl opacity-40" />

          <div className="relative max-w-[1400px] mx-auto px-3 lg:px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100 border border-gray-200 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#111827] relative">
                <span className="absolute inset-0 rounded-full bg-[#111827] animate-ping opacity-50"></span>
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                Wellness Insights
              </span>
            </div>

            <h1 className="text-[40px] sm:text-[52px] md:text-[64px] font-black tracking-tighter text-[#111827] mb-6 leading-[1.05]">
              Explore Our
              <br />
              <span className="relative inline-block">
                Wellness Journal.
                <div className="absolute bottom-2 left-0 w-full h-4 bg-gray-200 -z-10 -rotate-1"></div>
              </span>
            </h1>

            <p className="text-gray-500 font-medium text-lg lg:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
              Expert insights on natural health, Ayurvedic wisdom, and modern
              wellness — curated for your journey to better living.
            </p>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-400 font-medium">
              <div className="flex items-center gap-2">
                <BookOpen size={16} />
                <span>{blogPosts.length} Articles</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-2">
                <Sparkles size={16} />
                <span>Weekly Updates</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Category Filter ── */}
        <div className="sticky top-[72px] z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100">
          <div className="max-w-[1400px] mx-auto px-3 lg:px-4 py-4">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setVisibleCount(6);
                  }}
                  className={`shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-[#111827] text-white shadow-lg shadow-gray-900/20"
                      : "bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-[#111827] border border-gray-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Section Header ── */}
        <div className="max-w-[1400px] mx-auto px-3 lg:px-4 pt-12 pb-8">
          <Reveal>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                  Latest Articles
                </p>
                <h2 className="font-display text-2xl font-semibold text-[#111827]">
                  {activeCategory === "All" ? "All Posts" : activeCategory}
                </h2>
              </div>
              <p className="text-sm text-gray-400 font-medium">
                {filtered.length} article{filtered.length !== 1 ? "s" : ""}
              </p>
            </div>
          </Reveal>
        </div>

        {/* ── Grid Posts ── */}
        {visiblePosts.length > 0 && (
          <div className="max-w-[1400px] mx-auto px-3 lg:px-4 pb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visiblePosts.map((post, i) => (
                <Reveal key={post.id} delay={i * 0.08}>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group flex flex-col h-full rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-900/5 transition-all duration-500 hover:-translate-y-1"
                  >
                    <div className="overflow-hidden h-48 relative shrink-0">
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-[#111827] uppercase tracking-wider">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-display font-semibold text-[15px] text-[#111827] mb-2 leading-snug group-hover:text-[#111827] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2 font-medium">
                        {post.excerpt}
                      </p>

                      <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-gray-400 font-semibold">
                          <span className="inline-flex items-center gap-1">
                            <Calendar size={11} /> {post.date}
                          </span>
                          <span>·</span>
                          <span className="inline-flex items-center gap-1">
                            <Clock size={11} /> {post.readTime}
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#111827] group-hover:gap-2 transition-all">
                          Read <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* ─ Load More ── */}
        {filtered.length > visibleCount && (
          <div className="text-center pb-20">
            <button
              className="bg-[#111827] text-white px-10 py-4 text-[14px] shadow-xl shadow-gray-900/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-gray-900/30 transition-all duration-300 inline-flex items-center gap-2 rounded-xl"
              onClick={() => setVisibleCount((prev) => prev + 6)}
            >
              Load More Articles <ArrowRight size={16} />
            </button>
            <p className="text-xs text-gray-400 mt-4 font-medium">
              Showing {shownCount} of {filtered.length} articles
            </p>
          </div>
        )}
      </div>
    </>
  );
}
