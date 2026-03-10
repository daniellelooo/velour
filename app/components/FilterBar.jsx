"use client";

export default function FilterBar({ filtros, onFiltrosChange }) {
  const { linea, talla, precioMin, precioMax } = filtros;

  const lineas = [
    { value: "", label: "Todas las líneas" },
    { value: "clasica", label: "Velour Clásica" },
    { value: "noche", label: "Velour Noche" },
    { value: "co", label: "Velour Co." },
    { value: "edit", label: "Velour Edit" },
  ];

  const tallas = ["", "XS", "S", "M", "L", "XL"];

  const rangosPrecios = [
    { min: 0, max: 0, label: "Todos los precios" },
    { min: 0, max: 150000, label: "Hasta $150.000" },
    { min: 150000, max: 200000, label: "$150.000 - $200.000" },
    { min: 200000, max: 300000, label: "$200.000 - $300.000" },
    { min: 300000, max: 999999, label: "Más de $300.000" },
  ];

  const handleChange = (key, value) => {
    onFiltrosChange({ ...filtros, [key]: value });
  };

  const handleRangoPrecio = (min, max) => {
    onFiltrosChange({ ...filtros, precioMin: min, precioMax: max });
  };

  const limpiarFiltros = () => {
    onFiltrosChange({ linea: "", talla: "", precioMin: 0, precioMax: 0 });
  };

  const hayFiltrosActivos = linea || talla || precioMin > 0 || precioMax > 0;

  return (
    <div className="bg-neutral-50 border-b border-neutral-200 sticky top-20 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full lg:w-auto">
            {/* Filtro Línea */}
            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="linea"
                className="block text-xs font-medium text-neutral-600 mb-1 uppercase tracking-wider"
              >
                Línea
              </label>
              <select
                id="linea"
                value={linea}
                onChange={(e) => handleChange("linea", e.target.value)}
                className="w-full px-4 py-2 border border-neutral-300 bg-white text-neutral-900 focus:ring-2 focus:ring-velour-black focus:border-transparent outline-none"
              >
                {lineas.map((l) => (
                  <option key={l.value} value={l.value}>
                    {l.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro Talla */}
            <div className="flex-1 min-w-[150px]">
              <label
                htmlFor="talla"
                className="block text-xs font-medium text-neutral-600 mb-1 uppercase tracking-wider"
              >
                Talla
              </label>
              <select
                id="talla"
                value={talla}
                onChange={(e) => handleChange("talla", e.target.value)}
                className="w-full px-4 py-2 border border-neutral-300 bg-white text-neutral-900 focus:ring-2 focus:ring-velour-black focus:border-transparent outline-none"
              >
                <option value="">Todas las tallas</option>
                {tallas.slice(1).map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro Precio */}
            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="precio"
                className="block text-xs font-medium text-neutral-600 mb-1 uppercase tracking-wider"
              >
                Rango de Precio
              </label>
              <select
                id="precio"
                value={`${precioMin}-${precioMax}`}
                onChange={(e) => {
                  const [min, max] = e.target.value.split("-").map(Number);
                  handleRangoPrecio(min, max);
                }}
                className="w-full px-4 py-2 border border-neutral-300 bg-white text-neutral-900 focus:ring-2 focus:ring-velour-black focus:border-transparent outline-none"
              >
                {rangosPrecios.map((rango) => (
                  <option
                    key={`${rango.min}-${rango.max}`}
                    value={`${rango.min}-${rango.max}`}
                  >
                    {rango.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Botón Limpiar Filtros */}
          {hayFiltrosActivos && (
            <button
              onClick={limpiarFiltros}
              className="px-6 py-2 text-sm text-neutral-600 hover:text-velour-black border border-neutral-300 hover:border-velour-black transition-colors"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
