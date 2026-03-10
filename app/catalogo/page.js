'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import FilterBar from '../components/FilterBar';
import ProductCard from '../components/ProductCard';
import { filtrarProductos } from '../lib/productos';

function CatalogoContent() {
  const searchParams = useSearchParams();
  const lineaInicial = searchParams.get('linea') || '';

  const [filtros, setFiltros] = useState({
    linea: lineaInicial,
    talla: '',
    precioMin: 0,
    precioMax: 0
  });

  // Aplicar filtros cuando cambien (usando useMemo para evitar cascading renders)
  const productosFiltrados = useMemo(() => {
    const tallaSeleccionada = filtros.talla || undefined;
    const precioMin = filtros.precioMin || undefined;
    const precioMax = filtros.precioMax || undefined;
    const linea = filtros.linea || undefined;

    return filtrarProductos({
      linea,
      tallaSeleccionada,
      precioMin,
      precioMax
    });
  }, [filtros]);

  const handleFiltrosChange = (nuevosFiltros) => {
    setFiltros(nuevosFiltros);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header de página */}
      <div className="bg-velour-cream py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-velour-black mb-4">
            Catálogo Velour
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Explora nuestra colección completa. Cada prenda diseñada y producida localmente en Medellín.
          </p>
        </div>
      </div>

      {/* Barra de filtros */}
      <FilterBar filtros={filtros} onFiltrosChange={handleFiltrosChange} />

      {/* Grid de productos */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contador de resultados */}
        <div className="mb-8">
          <p className="text-sm text-neutral-600">
            {productosFiltrados.length} {productosFiltrados.length === 1 ? 'producto encontrado' : 'productos encontrados'}
          </p>
        </div>

        {/* Grid */}
        {productosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {productosFiltrados.map((producto) => (
              <ProductCard key={producto.id} producto={producto} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <svg className="mx-auto h-12 w-12 text-neutral-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 12h.01M12 12h.01M12 20h.01M6 16.5V7a1 1 0 011-1h10a1 1 0 011 1v9.5" />
            </svg>
            <h3 className="text-lg font-medium text-neutral-900 mb-2">
              No encontramos productos con esos filtros
            </h3>
            <p className="text-neutral-600 mb-6">
              Intenta ajustar los filtros para ver más opciones
            </p>
            <button
              onClick={() => setFiltros({ linea: '', talla: '', precioMin: 0, precioMax: 0 })}
              className="inline-flex items-center px-6 py-3 bg-velour-black text-white hover:bg-velour-charcoal transition-colors text-sm uppercase tracking-wider font-medium"
            >
              Ver todos los productos
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CatalogoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-velour-black"></div>
          <p className="mt-4 text-neutral-600">Cargando catálogo...</p>
        </div>
      </div>
    }>
      <CatalogoContent />
    </Suspense>
  );
}
