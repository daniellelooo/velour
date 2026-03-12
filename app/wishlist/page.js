"use client";

import Link from "next/link";
import Image from "next/image";
import { useWishlist } from "@/app/context/WishlistContext";
import { useCart } from "@/app/context/CartContext";
import { formatearPrecioConSimbolo, getNombreLinea } from "@/app/lib/utils";

export default function WishlistPage() {
  const { wishlist, quitarDeWishlist, isHydrated } = useWishlist();
  const { addToCart } = useCart();

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-velour-cream flex items-center justify-center">
        <p className="text-neutral-500 text-sm">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-velour-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Encabezado */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-light tracking-wider text-velour-black mb-3">
            Lista de deseos
          </h1>
          <p className="text-neutral-600">
            {wishlist.length === 0
              ? "Tu lista de deseos está vacía"
              : `${wishlist.length} ${wishlist.length === 1 ? "prenda guardada" : "prendas guardadas"}`}
          </p>
        </div>

        {wishlist.length === 0 ? (
          /* Estado vacío */
          <div className="text-center py-24 border border-neutral-200 bg-white">
            <svg
              className="mx-auto h-16 w-16 text-neutral-300 mb-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <h2 className="text-xl font-light text-velour-black mb-3">
              Aún no has guardado nada
            </h2>
            <p className="text-neutral-500 mb-8 max-w-sm mx-auto">
              Explora el catálogo y guarda las prendas que te enamoren para volver a ellas más tarde.
            </p>
            <Link
              href="/catalogo"
              className="inline-block bg-velour-black text-white px-8 py-3 text-sm uppercase tracking-wider hover:bg-velour-charcoal transition-colors"
            >
              Explorar catálogo
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {wishlist.map((producto) => (
              <WishlistCard
                key={producto.id}
                producto={producto}
                onQuitar={quitarDeWishlist}
                onAgregarAlCarrito={addToCart}
              />
            ))}
          </div>
        )}

        {wishlist.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              href="/catalogo"
              className="text-sm text-neutral-600 hover:text-velour-black underline underline-offset-4 transition-colors"
            >
              Seguir explorando
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function WishlistCard({ producto, onQuitar, onAgregarAlCarrito }) {
  const nombreLinea = getNombreLinea(producto.linea);

  // Buscar primera talla disponible para el CTA rápido
  const primeraDisponible = producto.tallas?.find(
    (t) => producto.disponibilidad?.[t]
  );

  const handleAgregarAlCarrito = () => {
    if (primeraDisponible) {
      onAgregarAlCarrito(producto, primeraDisponible);
    }
  };

  return (
    <div className="group relative bg-white">
      {/* Imagen */}
      <div className="aspect-[3/4] bg-neutral-100 overflow-hidden relative">
        {producto.imagenes?.[0] ? (
          <Image
            src={producto.imagenes[0]}
            alt={producto.nombre}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-300" />
        )}

        {/* Botón quitar */}
        <button
          onClick={() => onQuitar(producto.id)}
          className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-sm transition-all"
          aria-label="Quitar de favoritos"
        >
          <svg
            className="h-4 w-4 fill-velour-burgundy stroke-velour-burgundy"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs uppercase tracking-wider text-neutral-500 mb-1">
          {nombreLinea}
        </p>
        <h3 className="text-base font-medium text-velour-black mb-1">
          {producto.nombre}
        </h3>
        <p className="text-base font-medium text-velour-black mb-4">
          {formatearPrecioConSimbolo(producto.precio)}
        </p>

        <div className="flex gap-2">
          <Link
            href={`/producto/${producto.id}`}
            className="flex-1 text-center border border-velour-black text-velour-black px-3 py-2 text-xs uppercase tracking-wider hover:bg-velour-black hover:text-white transition-colors"
          >
            Ver prenda
          </Link>
          {primeraDisponible && (
            <button
              onClick={handleAgregarAlCarrito}
              className="flex-1 bg-velour-black text-white px-3 py-2 text-xs uppercase tracking-wider hover:bg-velour-charcoal transition-colors"
            >
              Añadir ({primeraDisponible})
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
