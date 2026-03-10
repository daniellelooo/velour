"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ imagenes, nombreProducto }) {
  const [imagenActual, setImagenActual] = useState(0);

  if (!imagenes || imagenes.length === 0) {
    return (
      <div className="aspect-[3/4] bg-neutral-200 flex items-center justify-center">
        <span className="text-neutral-400">Sin imagen</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Imagen principal */}
      <div className="aspect-[3/4] bg-neutral-200 overflow-hidden relative group">
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
          <div className="bg-white/90 px-3 py-2 rounded text-xs text-neutral-700">
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
  );
}
