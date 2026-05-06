import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import logo from "../../../assets/images/logo.jpg";

const socials = [
  { icon: <FaFacebookF size={13} />, link: "https://www.facebook.com/", label: "Facebook" },
  { icon: <FaInstagram size={13} />, link: "https://www.instagram.com/Aayubakwath/", label: "Instagram" },
  { icon: <FaTwitter size={13} />, link: "https://x.com/Aayubakwath", label: "Twitter" },
  { icon: <FaYoutube size={13} />, link: "https://studio.youtube.com/channel/UCx9SZTz-XdtUMtKz5pZsJcg/editing/profile", label: "YouTube" },
  { icon: <FaLinkedinIn size={13} />, link: "https://www.linkedin.com/in/sri-bakawathi-life-science-932a143b2/", label: "LinkedIn" },
];

export default function FooterContact() {
  return (
    <div className="lg:col-span-4">
      <div className="flex items-center gap-3 mb-6">
        <a href="/">
          <img
            src={logo}
            alt="Aayubakwath Logo"
            className="w-9 h-9 object-cover rounded-md border border-[var(--color-border)]"
          />
        </a>
        <div className="border-l border-[var(--color-border)] pl-4">
          <p className="font-display text-2xl text-[var(--color-text)] leading-tight font-medium">
            Aayubakwath
          </p>
          <span
            className="label text-[var(--color-text-muted)]"
            style={{ fontSize: "0.8rem" }}
          >
            Ayurvedic Wellness
          </span>
        </div>
      </div>

      <p className="font-body text-[var(--color-text-secondary)] text-lg leading-relaxed mb-8 max-w-sm">
        Nature's wisdom, crafted for your well-being. Rooted in tradition,
        refined for today's modern lifestyle.
      </p>

      <div className="space-y-3.5 mb-8">
        <div className="flex items-start gap-3.5">
          <MapPin size={14} className="text-[var(--color-text-muted)] mt-0.5 shrink-0" />
          <p className="font-body text-[var(--color-text-secondary)] text-lg leading-relaxed">
            Sri Bakawathi Life Science
            <br />
            No: 1/770, K. Ayyampalayam, K.S.N Puram
            <br />
            Palladam, Tiruppur – 641662, TN
          </p>
        </div>
        <a
          href="tel:9443157282"
          className="flex items-center gap-3.5 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors group"
        >
          <Phone size={14} className="text-[var(--color-text-muted)] shrink-0" />
          <span className="font-body text-lg font-medium">+91 94431 57282</span>
        </a>
        <a
          href="mailto:info.sblsmarketing@gmail.com"
          className="flex items-center gap-3.5 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors group"
        >
          <Mail size={14} className="text-[var(--color-text-muted)] shrink-0" />
          <span className="font-body text-lg font-medium break-all">
            info.sblsmarketing@gmail.com
          </span>
        </a>
      </div>

      <div className="flex gap-2">
        {socials.map((s, i) => (
          <a
            key={i}
            href={s.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-md border border-[var(--color-border)] bg-white flex items-center justify-center
              text-[var(--color-text-muted)] hover:bg-[var(--color-text)] hover:text-white hover:border-[var(--color-text)]
              transition-all duration-300"
            aria-label={s.label}
          >
            {s.icon}
          </a>
        ))}
      </div>
    </div>
  );
}
