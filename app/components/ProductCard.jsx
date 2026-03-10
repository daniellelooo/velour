import Link from "next/link";
import Image from "next/image";
import { formatearPrecioConSimbolo, getNombreLinea } from "../lib/utils";

export default function ProductCard({ producto }) {
  const nombreLinea = getNombreLinea(producto.linea);

  // Verificar cuántas tallas disponibles tiene
  const tallasDisponibles = Object.values(producto.disponibilidad || {}).filter(
    Boolean,
  ).length;
  const pocasUnidades = tallasDisponibles <= 2;

  return (
    <Link href={`/producto/${producto.id}`} className="group">
      <div className="relative">
        {/* Imagen del producto */}
        <div className="aspect-[3/4] bg-neutral-200 mb-4 overflow-hidden relative">
          {producto.imagenes && producto.imagenes.length > 0 ? (
            <Image
              src={producto.imagenes[0]}
              alt={producto.nombre}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-neutral-300 to-neutral-400 group-hover:scale-105 transition-transform duration-300" />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {producto.esLimitado && (
              <span className="px-3 py-1 bg-velour-black text-white text-xs uppercase tracking-wider font-medium">
                Edición Limitada
              </span>
            )}
            {pocasUnidades && !producto.esLimitado && (
              <span className="px-3 py-1 bg-velour-burgundy text-white text-xs uppercase tracking-wider font-medium">
                Últimas unidades
              </span>
            )}
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-velour-black/0 group-hover:bg-velour-black/5 transition-colors" />

          {/* Quick view hint */}
          <div className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="px-4 py-2 bg-white text-velour-black text-xs uppercase tracking-wider font-medium shadow-lg">
              Ver detalles
            </span>
          </div>
        </div>

        {/* Info del producto */}
        <div>
          <p className="text-xs uppercase tracking-wider text-neutral-500 mb-1">
            {nombreLinea}
          </p>
          <h3 className="text-lg font-medium text-velour-black mb-2 group-hover:text-neutral-600 transition-colors">
            {producto.nombre}
          </h3>

          {/* Precio */}
          <div className="flex items-center justify-between">
            <p className="text-lg font-medium text-velour-black">
              {formatearPrecioConSimbolo(producto.precio)}
            </p>

            {/* Tallas disponibles (resumen) */}
            <div className="flex gap-1">
              {producto.tallas.slice(0, 3).map((talla) => {
                const disponible = producto.disponibilidad?.[talla];
                return (
                  <span
                    key={talla}
                    className={`text-xs px-1.5 py-0.5 ${
                      disponible
                        ? "text-neutral-600 bg-neutral-100"
                        : "text-neutral-400 bg-neutral-50 line-through"
                    }`}
                  >
                    {talla}
                  </span>
                );
              })}
              {producto.tallas.length > 3 && (
                <span className="text-xs px-1.5 py-0.5 text-neutral-500">
                  +{producto.tallas.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* Indicador de unidades restantes para Edit */}
          {producto.esLimitado && producto.unidadesRestantes && (
            <p className="text-xs text-velour-burgundy mt-2 font-medium">
              Quedan {producto.unidadesRestantes} unidades
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
