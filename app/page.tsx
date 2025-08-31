"use client";
import { motion, Variants, useInView } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fadeInUp, fadeIn, stagger } from "@/lib/motion";
import ServicesTabs from "@/components/ServicesTabs";
import { FormEvent, useEffect, useRef, useState } from "react";

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

export default function Page() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Merci ! Nous vous contacterons rapidement.");
  };

  const team = [
    {
      name: "Aïcha Kouamé",
      role: "Cheffe de projet",
      img: "/images/aicha.jpg",
    },
    {
      name: "Moussa Camara",
      role: "Ingénieur civil",
      img: "/images/moussa.webp",
    },
    { name: "Fatou Diarra", role: "Architecte", img: "/images/fatou.jpg" },
    {
      name: "Ibrahima Touré",
      role: "Responsable HSE",
      img: "/images/ibrahima.webp",
    },
    {
      name: "Nana Traoré",
      role: "Conductrice de travaux",
      img: "/images/nana.jpg",
    },
    { name: "Sékou Diallo", role: "Topographe", img: "/images/sekou.jpg" },
    {
      name: "Mariame Bamba",
      role: "Cheffe de chantier",
      img: "/images/mariame.webp",
    },
    { name: "Yao N'Guessan", role: "Dessinatrice", img: "/images/yao.webp" },
  ];

  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const projectsContainer: Variants = {
    hidden: {},
    visible: { transition: { delayChildren: 0.1, staggerChildren: 0.25 } },
  };
  const projectCard: Variants = {
    hidden: { opacity: 0, y: 28, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1.0, ease },
    },
  };

  return (
    <main className="md:snap-y md:snap-mandatory overflow-y-auto h-screen">
      <Navbar />

      {/* Hero */}
      <section
        id="home"
        className="section md:snap-start relative bg-[#214f7a]"
      >
        <div className="pointer-events-none absolute inset-0 opacity-10" />
        <div className="container pt-24 md:pt-28">
          <div className="grid items-center gap-10 md:grid-cols-12">
            <motion.div
              variants={stagger()}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="text-white md:col-span-6"
            >
              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-6xl font-extrabold leading-tight"
              >
                Construire des Ponts & Routes Durables
              </motion.h1>
              <motion.p variants={fadeInUp} className="mt-4 text-lg opacity-95">
                De la conception à la réalisation, nous livrons des
                infrastructures robustes qui connectent les communautés et
                soutiennent l'économie régionale.
              </motion.p>

              {/* Zoom-on-hover buttons */}
              <motion.div variants={fadeInUp} className="mt-8 flex gap-4">
                <motion.a
                  href="#projects"
                  className="px-5 py-3 rounded bg-white/90 text-slate-900 hover:bg-white shadow-md hover:shadow-lg will-change-transform"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                >
                  Voir nos projets
                </motion.a>
                <motion.a
                  href="#quote"
                  className="px-5 py-3 rounded bg-slate-900 text-white hover:opacity-90 shadow-lg will-change-transform"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                >
                  Demander un devis
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Image block */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="md:col-span-6"
            >
              <div className="relative mx-auto w-full max-w-xl">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -inset-2 rounded-[44px] ring-2 ring-white/30"
                />
                <div className="relative rounded-[36px] bg-white p-2 shadow-2xl">
                  <div className="relative h-[320px] sm:h-[380px] md:h-[420px] rounded-[28px] overflow-hidden">
                    <Image
                      src="/images/bridge-1.jpg"
                      alt="Pont moderne"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* À propos with Integrated Milestones */}
      <section id="about" className="section md:snap-start bg-white relative">
        <div className="container 2xl:max-w-[1600px] grid items-center gap-10 lg:gap-16 xl:gap-24 md:grid-cols-12 pt-24 md:pt-0 pb-24 md:pb-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="md:col-span-6 xl:col-span-7"
          >
            <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold">
              Excellence à chaque étape
            </h2>
            <p className="mt-4 text-slate-600 text-base md:text-lg">
              Implantée en Côte d'Ivoire et en Guinée, Akwaba Construction
              conçoit et réalise des ponts, routes et ouvrages d'art avec une
              exigence de qualité, de sécurité et de durabilité. Notre équipe
              pluridisciplinaire accompagne les maîtres d'ouvrage publics et
              privés, de l'étude à la livraison.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm md:text-base">
              <li>✔️ Une équipe formidable</li>
              <li>✔️ Le respect des Normes internationales</li>
              <li>✔️ Ingénierie & design</li>
              <li>✔️ Délais maîtrisés</li>
            </ul>

            {/* Mobile: Milestones cards below text content */}
            <div className="mt-8 md:hidden space-y-4">
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
          </motion.div>

          <motion.div
            className="relative md:col-span-6 xl:col-span-5 h-[300px] md:h-[420px] xl:h-[520px] rounded-xl overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <Image
              src="/images/about-1.jpg"
              alt="Équipe sur chantier"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* Desktop: Full-width milestones banner overlay at bottom */}
        <div className="hidden md:block absolute bottom-0 left-0 right-0 bg-primary text-white">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-3 divide-x divide-white/20"
            >
              <div className="py-8 px-6 text-center">
                <div className="text-4xl lg:text-5xl font-extrabold tracking-tight">
                  <CountUp to={20} />
                  <span>+</span>
                </div>
                <p className="mt-2 text-white/90 text-sm lg:text-base">
                  ans d'expérience
                </p>
              </div>
              <div className="py-8 px-6 text-center">
                <div className="text-4xl lg:text-5xl font-extrabold tracking-tight">
                  <CountUp to={1000} />
                  <span>+</span>
                </div>
                <p className="mt-2 text-white/90 text-sm lg:text-base">
                  projets
                </p>
              </div>
              <div className="py-8 px-6 text-center">
                <div className="text-4xl lg:text-5xl font-extrabold tracking-tight">
                  <CountUp to={85} />
                  <span>%</span>
                </div>
                <p className="mt-2 text-white/90 text-sm lg:text-base">
                  clients satisfaits
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section
        id="services"
        className="section md:snap-start bg-primary scroll-mt-28 md:scroll-mt-36"
      >
        <div className="container pt-28 md:pt-14">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold text-center text-white"
          >
            Solutions que nous offrons
          </motion.h2>

          <div className="mt-10">
            <ServicesTabs />
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="section md:snap-start bg-white">
        <div className="container pt-24 md:pt-0 2xl:max-w-[1600px]">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="text-3xl md:text-4xl xl:text-5xl font-bold text-center"
          >
            Nos Réalisations
          </motion.h2>

          <motion.div
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 xl:gap-12 justify-items-center"
            variants={projectsContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            {[
              {
                img: "/images/projects-1.jpg",
                title: "Pont côtier - Abidjan",
                text: "Ouvrage d'art reliant deux communes.",
              },
              {
                img: "/images/projects-2.jpg",
                title: "Route nationale - Kindia",
                text: "Réhabilitation sur 45 km, drainage complet.",
              },
              {
                img: "/images/projects-3.jpg",
                title: "Passerelle urbaine - Conakry",
                text: "Sécurité piétonne et fluidité du trafic.",
              },
            ].map((p) => (
              <motion.figure
                key={p.title}
                variants={projectCard}
                className="w-full max-w-[420px] rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-64 sm:h-72">
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <figcaption className="p-6">
                  <h3 className="font-semibold text-xl">{p.title}</h3>
                  <p className="text-sm text-slate-600 mt-1">{p.text}</p>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CEO */}
      <section
        id="ceo"
        className="section md:snap-start relative overflow-hidden"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-20 -inset-y-24 -z-10"
        >
          <svg viewBox="0 0 1200 800" className="h-full w-full">
            <defs>
              <radialGradient
                id="blobA"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(280 260) rotate(18) scale(620 420)"
              >
                <stop stopColor="#214f7a" stopOpacity=".80" />
                <stop offset="1" stopColor="#214f7a" stopOpacity="0" />
              </radialGradient>
              <radialGradient
                id="blobB"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(980 520) rotate(-22) scale(520 360)"
              >
                <stop stopColor="#214f7a" stopOpacity=".40" />
                <stop offset="1" stopColor="#214f7a" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="wash" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#214f7a" stopOpacity=".06" />
                <stop offset="1" stopColor="#214f7a" stopOpacity="0" />
              </linearGradient>
              <filter id="blur60">
                <feGaussianBlur stdDeviation="40" />
              </filter>
            </defs>
            <rect width="1200" height="800" fill="url(#wash)" />
            <g filter="url(#blur60)">
              <rect width="1200" height="800" fill="url(#blobA)" />
              <rect width="1200" height="800" fill="url(#blobB)" />
            </g>
          </svg>
        </div>

        <div className="container relative z-10 pt-24 md:pt-0">
          <div className="grid items-center gap-10 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="uppercase tracking-widest text-slate-900">
                PDG d'AKOUABA GROUP
              </p>
              <h3 className="mt-3 text-2xl md:text-3xl italic font-medium text-slate-900">
                Mr. Moussa Marena
              </h3>
            </div>

            <div className="md:col-span-6 flex items-end justify-center">
              <div className="relative w-full max-w-2xl md:max-w-3xl">
                <div className="relative mx-auto h-[560px] sm:h-[640px] md:h-[720px] lg:h-[780px] rounded-[36px] overflow-hidden bg-white shadow-2xl ring-1 ring-black/10">
                  <Image
                    src="/images/akwaba-ceo.jpg"
                    alt="CEO d'Akwaba Construction"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-3">
              <h4 className="font-semibold text-slate-900">« Notre vision »</h4>
              <p className="mt-3 text-slate-700">
                « Chez Akouaba Group, nous bâtissons des ouvrages qui servent
                les communautés pendant des décennies. Notre priorité est simple
                : sécurité irréprochable, qualité mesurable et respect des
                délais. Nous investissons dans l'ingénierie, la formation et des
                contrôles rigoureux pour que chaque pont, route et ouvrage d'art
                améliore durablement la mobilité et la vie locale. »
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section
        id="team"
        className="section md:snap-start"
        style={{
          background:
            "linear-gradient(90deg, hsla(209, 57%, 30%, 1) 14%, hsla(338, 75%, 64%, 1) 72%, hsla(14, 92%, 86%, 1) 100%)",
        }}
      >
        <div className="container pt-24 md:pt-0">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="text-center text-white"
          >
            <p className="uppercase tracking-widest/relaxed text-lg opacity-90">
              Notre Équipe
            </p>
            <p className="mt-3 max-w-2xl mx-auto opacity-90">
              Des spécialistes passionnés par les infrastructures durables en
              Côte d'Ivoire et en Guinée.
            </p>
          </motion.div>

          <motion.div
            variants={stagger(0.16)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {team.map((m) => (
              <motion.article
                key={m.name}
                variants={fadeInUp}
                className="rounded-2xl overflow-hidden bg-white/95 shadow ring-1 ring-black/5"
              >
                <div className="relative h-48">
                  <Image
                    src={m.img}
                    alt={m.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-slate-900">{m.name}</h3>
                  <p className="text-sm text-slate-600">{m.role}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quote */}
      <section id="quote" className="section md:snap-start bg-slate-50">
        <div className="container pt-24 md:pt-0">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold text-center"
          >
            Demander un Devis
          </motion.h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <motion.form
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
              className="bg-white rounded-xl p-6 border"
              onSubmit={handleSubmit}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  required
                  className="rounded border px-3 py-2"
                  placeholder="Nom complet"
                />
                <input
                  required
                  className="rounded border px-3 py-2"
                  placeholder="Email"
                  type="email"
                />
                <input
                  className="rounded border px-3 py-2 md:col-span-2"
                  placeholder="Téléphone"
                />
                <select
                  className="rounded border px-3 py-2 md:col-span-2"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Choisir un service
                  </option>
                  <option>Ponts</option>
                  <option>Routes & Voiries</option>
                  <option>Études & Conseil</option>
                </select>
                <textarea
                  className="rounded border px-3 py-2 md:col-span-2"
                  rows={5}
                  placeholder="Décrivez votre projet..."
                />
              </div>
              <button className="mt-6 px-5 py-3 rounded bg-primary text-white">
                Envoyer la demande
              </button>
            </motion.form>
            <motion.div
              className="relative h-64 md:h-auto rounded-xl overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeIn}
            >
              <Image
                src="/images/logo.png"
                alt="Contact Akwaba"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
