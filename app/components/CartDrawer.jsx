"use client";

import { useCart } from "../context/CartContext";
import { formatearPrecioConSimbolo } from "../lib/utils";
import { abrirWhatsApp } from "../lib/whatsapp";
import Link from "next/link";
import Image from "next/image";

export default function CartDrawer() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartCount,
    isOpen,
    closeCart,
  } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-all"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <h2 className="text-2xl font-medium text-velour-black">
            Carrito ({getCartCount()})
          </h2>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
            aria-label="Cerrar carrito"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-24 w-24 text-neutral-300 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <p className="text-neutral-600 mb-4">Tu carrito está vacío</p>
              <Link
                href="/catalogo"
                onClick={closeCart}
                className="inline-block px-6 py-3 bg-velour-black text-white hover:bg-velour-charcoal transition-colors text-sm uppercase tracking-wider font-medium"
              >
                Ver Catálogo
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={`${item.producto.id}-${item.talla}`}
                  className="flex gap-4 pb-4 border-b border-neutral-200"
                >
                  {/* Imagen */}
                  <div className="w-24 h-32 bg-neutral-200 flex-shrink-0 relative overflow-hidden">
                    {item.producto.imagenes &&
                    item.producto.imagenes.length > 0 ? (
                      <Image
                        src={item.producto.imagenes[0]}
                        alt={item.producto.nombre}
                        fill
                        className="object-cover"
                        sizes="96px"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-neutral-300 to-neutral-400" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col">
                    <Link
                      href={`/producto/${item.producto.id}`}
                      onClick={closeCart}
                      className="font-medium text-velour-black hover:text-neutral-600 transition-colors mb-1"
                    >
                      {item.producto.nombre}
                    </Link>
                    <p className="text-sm text-neutral-600 mb-2">
                      Talla: {item.talla}
                    </p>
                    <p className="text-lg font-medium text-velour-black mb-2">
                      {formatearPrecioConSimbolo(item.producto.precio)}
                    </p>

                    {/* Cantidad y eliminar */}
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.producto.id,
                              item.talla,
                              item.cantidad - 1,
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center border border-neutral-300 hover:bg-neutral-100 transition-colors"
                          aria-label="Disminuir cantidad"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 12H4"
                            />
                          </svg>
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.cantidad}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.producto.id,
                              item.talla,
                              item.cantidad + 1,
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center border border-neutral-300 hover:bg-neutral-100 transition-colors"
                          aria-label="Aumentar cantidad"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        </button>
                      </div>

                      <button
                        onClick={() =>
                          removeFromCart(item.producto.id, item.talla)
                        }
                        className="text-sm text-red-600 hover:text-red-800 transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer con total y checkout */}
        {cart.length > 0 && (
          <div className="border-t border-neutral-200 p-6 space-y-4">
            <div className="flex justify-between items-center text-lg">
              <span className="font-medium">Subtotal</span>
              <span className="font-semibold text-velour-black">
                {formatearPrecioConSimbolo(getCartTotal())}
              </span>
            </div>

            <p className="text-xs text-neutral-600">
              Los costos de envío se calcularán en el checkout
            </p>

            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full py-4 bg-velour-black text-white text-center hover:bg-velour-charcoal transition-colors text-sm uppercase tracking-wider font-medium"
            >
              Proceder al Checkout
            </Link>

            <button
              onClick={closeCart}
              className="block w-full py-3 border-2 border-velour-black text-velour-black text-center hover:bg-neutral-50 transition-colors text-sm uppercase tracking-wider font-medium"
            >
              Seguir Comprando
            </button>
          </div>
        )}
      </div>
    </>
  );
}
