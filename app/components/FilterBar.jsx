"use client";

import { useState, useRef, useEffect } from "react";

function DropdownFiltro({ id, label, opciones, valor, onChange }) {
  const [abierto, setAbierto] = useState(false);
  const ref = useRef(null);

  const etiquetaActual =
    opciones.find((o) => o.value === valor)?.label || opciones[0]?.label;

  // Cerrar al hacer click fuera
  useEffect(() => {
    const handleClickFuera = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setAbierto(false);
      }
    };
    document.addEventListener("mousedown", handleClickFuera);
    return () => document.removeEventListener("mousedown", handleClickFuera);
  }, []);

  return (
    <div className="flex-1 min-w-[180px]" ref={ref}>
      <p className="text-[10px] font-medium text-velour-taupe mb-2 uppercase tracking-widest">
        {label}
      </p>
      <div className="relative">
        <button
          type="button"
          onClick={() => setAbierto(!abierto)}
          className={`w-full flex items-center justify-between px-4 py-2.5 bg-white border text-sm text-velour-black transition-colors ${
            abierto
              ? "border-velour-black"
              : "border-neutral-200 hover:border-neutral-400"
          }`}
        >
          <span className="truncate">{etiquetaActual}</span>
          <svg
            className={`w-3.5 h-3.5 ml-2 flex-shrink-0 text-velour-taupe transition-transform duration-200 ${
              abierto ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {abierto && (
          <div className="absolute top-full left-0 right-0 z-50 bg-white border border-neutral-200 border-t-0 shadow-lg">
            {opciones.map((opcion) => {
              const seleccionada = opcion.value === valor;
              return (
                <button
                  key={opcion.value}
                  type="button"
                  onClick={() => {
                    onChange(opcion.value);
                    setAbierto(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                    seleccionada
                      ? "bg-velour-cream text-velour-black font-medium"
                      : "text-neutral-700 hover:bg-neutral-50 hover:text-velour-black"
                  }`}
                >
                  {opcion.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function FilterBar({ filtros, onFiltrosChange }) {
  const { linea, talla, precioMin, precioMax, busqueda = "" } = filtros;

  const opcionesLinea = [
    { value: "", label: "Todas las líneas" },
    { value: "clasica", label: "Velour Clásica" },
    { value: "noche", label: "Velour Noche" },
    { value: "co", label: "Velour Co." },
    { value: "edit", label: "Velour Edit" },
  ];

  const opcionesTalla = [
    { value: "", label: "Todas las tallas" },
    { value: "XS", label: "XS" },
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
  ];

  const opcionesPrecio = [
    { value: "0-0", label: "Todos los precios" },
    { value: "0-150000", label: "Hasta $150.000" },
    { value: "150000-200000", label: "$150.000 – $200.000" },
    { value: "200000-300000", label: "$200.000 – $300.000" },
    { value: "300000-999999", label: "Más de $300.000" },
  ];

  const valorPrecio = `${precioMin}-${precioMax}`;

  const handleLinea = (value) => onFiltrosChange({ ...filtros, linea: value });

  const handleTalla = (value) => onFiltrosChange({ ...filtros, talla: value });

  const handlePrecio = (value) => {
    const [min, max] = value.split("-").map(Number);
    onFiltrosChange({ ...filtros, precioMin: min, precioMax: max });
  };

  const handleBusqueda = (value) =>
    onFiltrosChange({ ...filtros, busqueda: value });

  const limpiarFiltros = () =>
    onFiltrosChange({ linea: "", talla: "", precioMin: 0, precioMax: 0, busqueda: "" });

  const hayFiltrosActivos =
    linea || talla || precioMin > 0 || precioMax > 0 || busqueda;

  return (
    <div className="bg-velour-cream border-b border-neutral-200 sticky top-20 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col gap-4">
          {/* Fila superior: búsqueda + limpiar */}
          <div className="flex items-end gap-4">
            {/* Campo de búsqueda */}
            <div className="flex-1 max-w-sm">
              <p className="text-[10px] font-medium text-velour-taupe mb-2 uppercase tracking-widest">
                Buscar
              </p>
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-velour-taupe pointer-events-none"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  value={busqueda}
                  onChange={(e) => handleBusqueda(e.target.value)}
                  placeholder="Buscar por nombre o descripción..."
                  className="w-full pl-9 pr-8 py-2.5 bg-white border border-neutral-200 hover:border-neutral-400 focus:border-velour-black outline-none text-sm text-velour-black placeholder:text-neutral-400 transition-colors"
                />
                {busqueda && (
                  <button
                    onClick={() => handleBusqueda("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-velour-black transition-colors"
                    aria-label="Limpiar búsqueda"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Botón limpiar todo */}
            {hayFiltrosActivos && (
              <button
                onClick={limpiarFiltros}
                className="flex items-center gap-1.5 text-xs text-velour-taupe hover:text-velour-black transition-colors pb-2.5 whitespace-nowrap"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Limpiar filtros
              </button>
            )}
          </div>

          {/* Fila inferior: dropdowns */}
          <div className="flex flex-col sm:flex-row gap-3">
            <DropdownFiltro
              id="linea"
              label="Línea"
              opciones={opcionesLinea}
              valor={linea}
              onChange={handleLinea}
            />
            <DropdownFiltro
              id="talla"
              label="Talla"
              opciones={opcionesTalla}
              valor={talla}
              onChange={handleTalla}
            />
            <DropdownFiltro
              id="precio"
              label="Precio"
              opciones={opcionesPrecio}
              valor={valorPrecio}
              onChange={handlePrecio}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
