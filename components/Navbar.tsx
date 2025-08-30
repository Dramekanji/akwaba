"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";

type LinkItem = { href: string; label: string };

const links: LinkItem[] = [
  { href: "#home", label: "Accueil" },
  { href: "#about", label: "À propos" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projets" },
];

/** Framer Motion variants */
const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -8, height: 0 },
  visible: {
    opacity: 1,
    y: 0,
    height: "auto",
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, y: -8, height: 0, transition: { duration: 0.2 } },
};
const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: -6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.22 } },
};

export default function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [active, setActive] = useState<string>("home");

  const dropRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);

    // Active link highlight
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main section[id]")
    );
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-20% 0px -60% 0px" }
    );
    sections.forEach((s) => io.observe(s));

    // Close on click outside (ignore clicks on the toggle button)
    const handleClickOutside = (evt: MouseEvent) => {
      if (!open) return;
      const t = evt.target as Node;
      if (dropRef.current?.contains(t)) return;
      if (buttonRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside, true);

    // Close on Esc
    const handleKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousedown", handleClickOutside, true);
      document.removeEventListener("keydown", handleKey);
      io.disconnect();
    };
  }, [open]);

  return (
    <header className="fixed top-4 left-0 right-0 z-50">
      {/* make this relative so the dropdown can be absolutely positioned beneath the pill */}
      <div className="container relative">
        <div
          className={`relative z-50 h-16 w-full rounded-full bg-white shadow-lg ring-1 ring-black/5 overflow-hidden transition-all ${
            scrolled ? "shadow-xl" : ""
          }`}
        >
          {/* No extra horizontal padding so the right CTA can touch the rounded edge */}
          <div className="flex h-full items-stretch">
            {/* Brand */}
            <Link href="#home" className="flex items-center gap-3 px-4 md:px-6">
              <Image
                src="/images/logo.png"
                width={40}
                height={40}
                alt="Akwaba logo"
                className="rounded-full bg-primary/10 p-1"
                priority
              />
              <div className="hidden sm:block leading-tight">
                <div className="font-extrabold text-primary tracking-wide">
                  AKWABA CONSTRUCTION
                </div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  Ponts & Routes
                </div>
              </div>
            </Link>

            <span className="hidden md:block h-full w-px bg-slate-200" />

            {/* Center links (desktop) */}
            <ul className="hidden md:flex items-center gap-10 mx-auto px-6 text-[17px] font-medium">
              {links.map((l) => {
                const id = l.href.replace("#", "");
                const isActive = active === id;
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className={`transition hover:text-primary ${
                        isActive ? "text-primary" : "text-slate-800"
                      }`}
                    >
                      {l.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Right CTA (desktop) */}
            <a
              href="#quote"
              className="ml-auto hidden md:inline-flex h-full px-8 items-center bg-primary text-white font-semibold"
            >
              Demander un Devis{" "}
            </a>

            {/* Mobile: hamburger -> X (kept above dropdown with z-index) */}
            <button
              ref={buttonRef}
              type="button"
              aria-label="Ouvrir le menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="md:hidden ml-auto px-4"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">Menu</span>
              <span
                className={`block h-0.5 w-6 bg-slate-800 transition-transform ${
                  open ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-slate-800 my-1 transition-opacity ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-slate-800 transition-transform ${
                  open ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile dropdown (absolute, sits below pill; lower z-index so the button stays clickable) */}
        <AnimatePresence>
          {open && (
            <motion.div
              ref={dropRef}
              id="mobile-menu"
              className="md:hidden absolute left-0 right-0 top-full mt-2 z-40 rounded-2xl bg-white shadow-lg ring-1 ring-black/5 overflow-hidden"
              key="mobile-menu"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={dropdownVariants}
            >
              <motion.ul
                className="py-2"
                variants={listVariants}
                initial="hidden"
                animate="visible"
              >
                {links.map((l) => (
                  <motion.li key={l.href} variants={itemVariants}>
                    <a
                      href={l.href}
                      className="block px-4 py-3 hover:bg-slate-50"
                      onClick={() => setOpen(false)}
                    >
                      {l.label}
                    </a>
                  </motion.li>
                ))}
                <motion.li className="px-3 py-3" variants={itemVariants}>
                  <a
                    href="#quote"
                    onClick={() => setOpen(false)}
                    className="w-full inline-flex justify-center items-center h-11 rounded-full bg-primary text-white font-semibold"
                  >
                    Demander un Devis
                  </a>
                </motion.li>
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
