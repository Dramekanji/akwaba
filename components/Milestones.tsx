"use client";

import { motion, useInView } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

/** Lightweight count-up that runs once when visible */
function CountUp({ to, duration = 1.6 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    let start: number | null = null;

    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / (duration * 1000), 1);
      setVal(Math.floor(to * p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return <span ref={ref}>{val}</span>;
}

export default function Milestones() {
  return (
    <section
      id="milestones"
      className="md:snap-start"
      aria-label="Nos chiffres"
    >
      {/* Mobile: stacked cards integrated within the À propos section */}
      <div className="container md:hidden -mt-16 relative z-10 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl bg-primary text-white p-6 shadow-md ring-1 ring-black/5"
        >
          <div className="text-4xl font-extrabold tracking-tight">
            <CountUp to={20} />
            <span>+</span>
          </div>
          <p className="mt-1 text-white/90">ans d'expérience</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl bg-primary text-white p-6 shadow-md ring-1 ring-black/5"
        >
          <div className="text-4xl font-extrabold tracking-tight">
            <CountUp to={1000} />
            <span>+</span>
          </div>
          <p className="mt-1 text-white/90">projets</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl bg-primary text-white p-6 shadow-md ring-1 ring-black/5"
        >
          <div className="text-4xl font-extrabold tracking-tight">
            <CountUp to={85} />
            <span>%</span>
          </div>
          <p className="mt-1 text-white/90">clients satisfaits</p>
        </motion.div>
      </div>

      {/* Desktop: full-width banner as its own section */}
      <div className="hidden md:block">
        <div className="bg-primary text-white">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-3 divide-x divide-white/10"
            >
              <div className="p-8 text-center">
                <div className="text-4xl lg:text-5xl font-extrabold tracking-tight">
                  <CountUp to={20} />
                  <span>+</span>
                </div>
                <p className="mt-1 text-white/90">ans d'expérience</p>
              </div>
              <div className="p-8 text-center">
                <div className="text-4xl lg:text-5xl font-extrabold tracking-tight">
                  <CountUp to={1000} />
                  <span>+</span>
                </div>
                <p className="mt-1 text-white/90">projets</p>
              </div>
              <div className="p-8 text-center">
                <div className="text-4xl lg:text-5xl font-extrabold tracking-tight">
                  <CountUp to={85} />
                  <span>%</span>
                </div>
                <p className="mt-1 text-white/90">clients satisfaits</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
