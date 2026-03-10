import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-velour-black text-neutral-300 mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Columna 1: Sobre Velour */}
          <div>
            <h3 className="text-xl font-light tracking-wider text-white mb-4">
              VELOUR
            </h3>
            <p className="text-sm text-neutral-400 mb-4">
              Studio de moda femenina en Medellín. No somos fast fashion. Cada
              prenda tiene una historia y un proceso.
            </p>
            <p className="text-sm text-neutral-400">
              Diseño y producción local, telas de calidad, estética
              contemporánea y atemporal.
            </p>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Navegación
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm hover:text-white transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/catalogo"
                  className="text-sm hover:text-white transition-colors"
                >
                  Catálogo
                </Link>
              </li>
              <li>
                <Link
                  href="/velour-edit"
                  className="text-sm hover:text-white transition-colors"
                >
                  Velour Edit
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre-valentina"
                  className="text-sm hover:text-white transition-colors"
                >
                  Sobre Valentina
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-sm hover:text-white transition-colors"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Contacto y Ubicación */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Visitanos
            </h4>
            <div className="space-y-3 text-sm text-neutral-400">
              <div>
                <p className="font-medium text-white mb-1">Local físico</p>
                <p>Cra. 74 #33-12, Laureles</p>
                <p>Medellín, Colombia</p>
              </div>

              <div>
                <p className="font-medium text-white mb-1">Horarios</p>
                <p>Lun - Vie: 10:00 AM - 7:00 PM</p>
                <p>Sábados: 11:00 AM - 6:00 PM</p>
              </div>

              <div className="pt-2">
                <a
                  href={
                    process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
                    "https://instagram.com/velour.studio.med"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-white hover:text-neutral-200 transition-colors"
                >
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  @velour.studio.med
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-neutral-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500">
            <p>© {currentYear} Velour Studio. Todos los derechos reservados.</p>
            <p className="mt-2 md:mt-0">
              Desarrollado por{" "}
              <span className="text-neutral-300 font-medium">
                EternalGrowth
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
