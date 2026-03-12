"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ imagenes, nombreProducto }) {
  const [imagenActual, setImagenActual] = useState(0);
  const [zoomAbierto, setZoomAbierto] = useState(false);

  if (!imagenes || imagenes.length === 0) {
    return (
      <div className="aspect-[3/4] bg-neutral-200 flex items-center justify-center">
        <span className="text-neutral-400">Sin imagen</span>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {/* Imagen principal */}
        <div
          className="aspect-[3/4] bg-neutral-200 overflow-hidden relative group cursor-zoom-in"
          onClick={() => setZoomAbierto(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setZoomAbierto(true)}
          aria-label={`Ampliar imagen de ${nombreProducto}`}
        >
          <Image
            src={imagenes[imagenActual]}
            alt={`${nombreProducto} - Imagen ${imagenActual + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={imagenActual === 0}
            unoptimized
          />

          {/* Indicador de zoom */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-white/90 p-2 rounded shadow">
              <svg
                className="w-4 h-4 text-neutral-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Thumbnails */}
        {imagenes.length > 1 && (
          <div className="grid grid-cols-4 gap-3">
            {imagenes.map((imagen, index) => (
              <button
                key={index}
                onClick={() => setImagenActual(index)}
                className={`aspect-square bg-neutral-200 overflow-hidden border-2 transition-all relative ${
                  index === imagenActual
                    ? "border-velour-black"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
                aria-label={`Ver imagen ${index + 1}`}
              >
                <Image
                  src={imagen}
                  alt={`${nombreProducto} - Miniatura ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="120px"
                  unoptimized
                />
              </button>
            ))}
          </div>
        )}

        {/* Contador de imágenes */}
        {imagenes.length > 1 && (
          <p className="text-sm text-neutral-500 text-center">
            {imagenActual + 1} / {imagenes.length}
          </p>
        )}
      </div>

      {/* Lightbox de zoom */}
      {zoomAbierto && (
        <div
          className="fixed inset-0 z-50 bg-velour-black/90 flex items-center justify-center p-4"
          onClick={() => setZoomAbierto(false)}
        >
          {/* Botón cerrar */}
          <button
            onClick={() => setZoomAbierto(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            aria-label="Cerrar zoom"
          >
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Botón imagen anterior */}
          {imagenes.length > 1 && imagenActual > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); setImagenActual(imagenActual - 1); }}
              className="absolute left-4 text-white/80 hover:text-white transition-colors"
              aria-label="Imagen anterior"
            >
              <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Imagen ampliada */}
          <div
            className="relative w-full max-w-2xl max-h-[90vh] aspect-[3/4]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={imagenes[imagenActual]}
              alt={`${nombreProducto} - Ampliada ${imagenActual + 1}`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 672px"
              unoptimized
            />
          </div>

          {/* Botón imagen siguiente */}
          {imagenes.length > 1 && imagenActual < imagenes.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setImagenActual(imagenActual + 1); }}
              className="absolute right-4 text-white/80 hover:text-white transition-colors"
              aria-label="Imagen siguiente"
            >
              <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Contador en el lightbox */}
          {imagenes.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
              {imagenActual + 1} / {imagenes.length}
            </div>
          )}
        </div>
      )}
    </>
  );
}
