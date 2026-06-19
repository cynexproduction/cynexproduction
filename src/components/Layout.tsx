import { Link } from "@tanstack/react-router";
import { Menu, X, Instagram, Youtube } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/video-production-company", label: "Film & Video" },
  { to: "/animation-videos", label: "Animation" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/blog", label: "Blog" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur border-b border-[#222]">
      <div className="max-w-7xl mx-auto px-4 h-[70px] flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/cynex-logo.png"
            alt="CYNEX Production"
            className="h-9"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-white/80 hover:text-primary transition-colors"
              activeProps={{ className: "text-primary" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/enquiry"
            className="text-sm font-semibold bg-primary text-white px-5 py-2 rounded hover:bg-primary/90 transition-colors"
          >
            Let's Connect
          </Link>
        </nav>

        <button
          className="lg:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-black border-t border-[#222] overflow-hidden"
          >
            <nav className="flex flex-col gap-2 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm font-medium text-white/80 hover:text-primary transition-colors py-2"
                  activeProps={{ className: "text-primary" }}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/enquiry"
                className="text-sm font-semibold bg-primary text-white px-5 py-2 rounded text-center"
                onClick={() => setOpen(false)}
              >
                Let's Connect
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#222]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-center gap-3 mb-6">
          {[
            { href: "https://www.instagram.com/cynex.production", icon: Instagram, label: "Instagram" },
            { href: "https://www.youtube.com/@Cynex_Production", icon: Youtube, label: "YouTube" },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center text-white/80 hover:text-primary transition-colors"
                title={s.label}
              >
                <Icon size={18} />
              </a>
            );
          })}
        </div>

        <div className="text-center mb-6">
          <h3 className="text-white text-lg font-semibold mb-2">Let's Talk</h3>
          <Link
            to="/contact"
            className="inline-block text-primary border border-primary px-5 py-2 rounded text-sm font-semibold hover:bg-primary hover:text-white transition-colors"
          >
            Post a Query
          </Link>
        </div>

        <div className="flex justify-center gap-8 flex-wrap mb-6 text-sm text-[#aaa]">
          <div>
            <strong className="text-white block mb-1">Rajkot & Ahmedabad</strong>
            <span>Main Office, Gujarat</span>
          </div>
          <div>
            <strong className="text-white block mb-1">For Business</strong>
            <a href="mailto:sales@cynexproduction.in" className="text-[#aaa] hover:text-white no-underline">sales@cynexproduction.in</a>
          </div>
          <div>
            <strong className="text-white block mb-1">For Careers</strong>
            <a href="mailto:hr@cynexproduction.in" className="text-[#aaa] hover:text-white no-underline">hr@cynexproduction.in</a>
          </div>
        </div>

        <div className="border-t border-[#222] pt-4 flex justify-between items-center flex-wrap gap-3 text-xs text-[#666]">
          <span>2026 &copy; <Link to="/" className="text-white no-underline">CYNEX Production</Link>, All rights reserved. Created by <a href="https://bhumitnasit.vercel.app" target="_blank" rel="noopener noreferrer" className="text-[#888] hover:text-white no-underline">BHUMIT NASIT</a></span>
          <div className="flex gap-4">
            <Link to="/blog" className="text-[#888] hover:text-white no-underline">Blog</Link>
            <Link to="/terms" className="text-[#888] hover:text-white no-underline">Terms</Link>
            <Link to="/privacy" className="text-[#888] hover:text-white no-underline">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Section({ children, className = "", id, style }: { children: React.ReactNode; className?: string; id?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`py-16 md:py-24 ${className}`}
      style={style}
    >
      <div>{children}</div>
    </motion.section>
  );
}

export function SectionTitle({ label, title, subtitle }: { label?: string; title: string; subtitle?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="text-center mb-12"
    >
      {label && <span className="text-primary text-sm font-semibold uppercase tracking-wider">{label}</span>}
      <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">{title}</h2>
      {subtitle && <p className="text-[#999] mt-3 max-w-2xl mx-auto">{subtitle}</p>}
    </motion.div>
  );
}
