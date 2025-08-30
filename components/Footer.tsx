export default function Footer() {
  const year = new Date().getFullYear();

  return (
    // smaller footer that is still a snap target
    <footer id="footer" className="snap-end bg-slate-900 text-slate-200">
      <div className="container py-12 md:py-14 grid gap-8 md:grid-cols-3 items-start">
        {/* Brand/intro */}
        <div>
          <h3 className="text-white text-lg md:text-xl font-semibold">
            Akwaba Construction
          </h3>
          <p className="mt-3 text-sm opacity-80 max-w-prose">
            Ponts, routes et infrastructures de confiance en Côte d’Ivoire et en
            Guinée.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold text-base md:text-lg">
            Contact
          </h4>
          <p className="mt-3 text-sm">Abidjan, CI • Conakry, GN</p>
          <p className="text-sm">+225 00 00 00 00 • +224 000 00 00</p>
          <p className="text-sm">contact@akwaba-construction.com</p>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-semibold text-base md:text-lg">
            Newsletter
          </h4>
          <form
            className="mt-3 flex gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="flex-1 rounded px-3 py-2 text-slate-900"
              placeholder="Votre email"
              type="email"
              aria-label="Adresse email"
            />
            <button
              className="px-4 py-2 rounded bg-primary text-white"
              type="submit"
            >
              S’inscrire
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container py-5 text-xs md:text-sm opacity-75">
          © {year} Akwaba Construction. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
