"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { getCartCount, toggleCart, isHydrated } = useCart();

  const navegacion = [
    { nombre: "Inicio", href: "/" },
    { nombre: "Catálogo", href: "/catalogo" },
    { nombre: "Velour Edit", href: "/velour-edit" },
    { nombre: "Sobre Valentina", href: "/sobre-valentina" },
    { nombre: "Contacto", href: "/contacto" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-neutral-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-light tracking-wider text-velour-black hover:text-velour-charcoal transition-colors"
            >
              VELOUR
            </Link>
          </div>

          {/* Navegación Desktop */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navegacion.map((item) => (
              <Link
                key={item.nombre}
                href={item.href}
                className="text-sm font-medium text-neutral-700 hover:text-velour-black transition-colors"
              >
                {item.nombre}
              </Link>
            ))}
          </div>

          {/* Iconos Instagram y Carrito */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href={
                process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
                "https://instagram.com/velour.studio.med"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-700 hover:text-velour-black transition-colors"
              aria-label="Instagram"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* Botón Carrito */}
            <button
              onClick={toggleCart}
              className="relative text-neutral-700 hover:text-velour-black transition-colors"
              aria-label="Abrir carrito"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-velour-burgundy text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </button>
          </div>

          {/* Botón Menú Mobile */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Carrito Mobile */}
            <button
              onClick={toggleCart}
              className="relative text-neutral-700 hover:text-velour-black transition-colors"
              aria-label="Abrir carrito"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {isHydrated && getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-velour-burgundy text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </button>

            {/* Menú hamburguesa */}
            <button
              type="button"
              onClick={() => setMenuAbierto(!menuAbierto)}
              className="text-neutral-700 hover:text-velour-black focus:outline-none"
              aria-label="Abrir menú"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {menuAbierto ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menú Mobile */}
        {menuAbierto && (
          <div className="md:hidden pb-4 pt-2 space-y-1 border-t border-neutral-200 mt-2">
            {navegacion.map((item) => (
              <Link
                key={item.nombre}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-neutral-700 hover:text-velour-black hover:bg-neutral-50 rounded-md transition-colors"
                onClick={() => setMenuAbierto(false)}
              >
                {item.nombre}
              </Link>
            ))}
            <a
              href={
                process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
                "https://instagram.com/velour.studio.med"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-3 py-2 text-base font-medium text-neutral-700 hover:text-velour-black hover:bg-neutral-50 rounded-md transition-colors"
            >
              Instagram
              <svg
                className="ml-2 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
