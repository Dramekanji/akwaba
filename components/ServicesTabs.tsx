"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

/* tiny inline icons so you don't need a package */
function BridgeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.7" strokeLinecap="round" d="M3 18V9m18 9V9" />
      <path strokeWidth="1.7" d="M3 12c6 0 12-6 18 0" />
      <path strokeWidth="1.7" d="M3 15c6 0 12-6 18 0" />
      <path strokeWidth="1.7" d="M2 18h20" />
    </svg>
  );
}
function RoadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.7" d="M7 21 9 3h6l2 18" />
      <path strokeWidth="1.7" strokeLinecap="round" d="M12 5v3m0 3v3m0 3v3" />
    </svg>
  );
}
function ClipboardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <rect x="6" y="4" width="12" height="16" rx="2" strokeWidth="1.7" />
      <path
        strokeWidth="1.7"
        d="M9 4.5h6a2 2 0 0 1 2 2V8H7V6.5a2 2 0 0 1 2-2Z"
      />
      <path strokeWidth="1.7" strokeLinecap="round" d="M9 12h6M9 16h6" />
    </svg>
  );
}

type Service = {
  id: "ponts" | "voiries" | "etudes";
  title: string;
  blurb: string;
  img: string;
  bulletsLeft: string[];
  bulletsRight: string[];
  Icon: (p: React.SVGProps<SVGSVGElement>) => JSX.Element;
  /** Optional CSS object-position to fine-tune image crop */
  objectPosition?: string;
};

const SERVICES: Service[] = [
  {
    id: "ponts",
    title: "Construction de Ponts",
    blurb:
      "Conception et réalisation d’ouvrages d’art durables : fondations, superstructures, tabliers et équipements.",
    img: "/images/services-1.jpg",
    bulletsLeft: ["Ponts routiers", "Ouvrages d’art", "Appareils d’appui"],
    bulletsRight: ["Passerelles", "Tabliers & culées", "Étanchéité & joints"],
    Icon: BridgeIcon,
    objectPosition: "50% 50%", // centered
  },
  {
    id: "voiries",
    title: "Routes & Voiries",
    blurb:
      "Traçage, terrassement, drainage, revêtements et signalisation pour routes urbaines et interurbaines.",
    img: "/images/services-2.jpg",
    bulletsLeft: ["Routes urbaines", "Routes interurbaines", "Ronds-points"],
    bulletsRight: ["Drainage & assainissement", "Signalisation", "Revêtements"],
    Icon: RoadIcon,
    objectPosition: "50% 50%",
  },
  {
    id: "etudes",
    title: "Études & Conseil",
    blurb:
      "Études techniques, management de projet, contrôle qualité & sécurité (HSE) de bout en bout.",
    img: "/images/services-3.jpg",
    bulletsLeft: ["Ingénierie", "Pilotage", "Contrôle HSE"],
    bulletsRight: ["Optimisation coûts/délais", "Audit technique", "AMO/MOE"],
    Icon: ClipboardIcon,
    // Nudge the crop upward so the head stays in frame:
    objectPosition: "35% 5%", // try 10–30% if you want a bit more/less headroom
  },
];

export default function ServicesTabs() {
  const [active, setActive] = useState<Service["id"]>("ponts");
  const current = SERVICES.find((s) => s.id === active)!;

  return (
    <div className="grid gap-6 md:grid-cols-12">
      {/* Left mini-cards */}
      <div className="md:col-span-5 lg:col-span-4">
        <div className="space-y-4">
          {SERVICES.map((s) => {
            const selected = s.id === active;
            return (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={[
                  "w-full flex items-center gap-4 rounded-2xl border transition shadow-sm",
                  selected
                    ? "bg-slate-900 text-white border-slate-900 ring-2 ring-blue-300"
                    : "bg-white border-slate-200 hover:border-slate-300",
                ].join(" ")}
              >
                <span
                  className={[
                    "grid place-items-center rounded-2xl h-16 w-16 shrink-0",
                    selected
                      ? "bg-amber-400 text-slate-900"
                      : "bg-amber-400/90",
                  ].join(" ")}
                >
                  <s.Icon className="h-7 w-7" />
                </span>
                <span className="text-left font-medium pr-4">{s.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right large card */}
      <div className="md:col-span-7 lg:col-span-8">
        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          {/* ONE image only */}
          <div className="relative h-56 sm:h-72 md:h-80 lg:h-96">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={current.img}
                  alt={current.title}
                  fill
                  className="object-cover"
                  style={{
                    objectPosition: current.objectPosition ?? "50% 50%",
                  }}
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="p-6 md:p-8">
            <h3 className="text-2xl md:text-3xl font-semibold">
              {current.title}
            </h3>
            <p className="mt-3 text-slate-600">{current.blurb}</p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-slate-800">
              <ul className="list-disc list-inside space-y-1">
                {current.bulletsLeft.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <ul className="list-disc list-inside space-y-1">
                {current.bulletsRight.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>

            <a
              href="#quote"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-amber-400 px-5 py-2.5 font-semibold text-slate-900 hover:opacity-90"
            >
              En savoir plus ▸
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
