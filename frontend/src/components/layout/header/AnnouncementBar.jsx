import React, { useEffect, useState } from "react";

export default function AnnouncementBar({ announcements }) {
  const messages = announcements
    .map((item) => (item?.text || item?.title || "").trim())
    .filter(Boolean)
    .filter((message) => {
      const wordCount = message
        .split(/\s+/)
        .filter((word) => /[a-z]/i.test(word) && word.replace(/[^a-z]/gi, "").length > 1).length;
      return wordCount >= 2;
    })
    .filter((message, index, list) => {
      const normalized = message.toLowerCase();
      return list.findIndex((entry) => entry.toLowerCase() === normalized) === index;
    });

  if (messages.length === 0) return null;

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (messages.length <= 1) return undefined;

    const timer = window.setInterval(() => {
      setCurrent((index) => (index + 1) % messages.length);
    }, 3500);

    return () => window.clearInterval(timer);
  }, [messages.length]);

  const activeAnnouncement =
    messages[current] || messages[0];

  return (
    <div className="relative z-50 min-h-9 bg-[var(--color-sage)] px-4 text-white">
      <div className="mx-auto flex h-9 max-w-[1600px] items-center justify-center">
        <p
          key={current}
          className="animate-fade-in truncate text-center text-[11px] font-semibold uppercase tracking-[0.18em] opacity-95 sm:text-xs"
        >
          {activeAnnouncement}
        </p>
      </div>
    </div>
  );
}
