'use client';

import { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ProductGallery from '../../components/ProductGallery';
import ProductCard from '../../components/ProductCard';
import { getProductoById, getProductosByLinea } from '../../lib/productos';
import { formatearPrecioConSimbolo, getNombreLinea } from '../../lib/utils';
import { generarMensajeProducto, abrirWhatsApp } from '../../lib/whatsapp';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

export default function ProductoPage({ params }) {
  // Next.js 16+: params es una Promise, usar React.use() para unwrap
  const { id } = use(params);
  const { addToCart } = useCart();
  const { mostrarToast } = useToast();
  const [modalTallasAbierto, setModalTallasAbierto] = useState(false);

  // Usar lazy initialization para evitar cascading renders
  const [producto, setProducto] = useState(() => getProductoById(id));
  const [productosRelacionados, setProductosRelacionados] = useState(() => {
    const prod = getProductoById(id);
    if (prod) {
      return getProductosByLinea(prod.linea)
        .filter(p => p.id !== id)
        .slice(0, 4);
    }
    return [];
  });
  const [tallaSeleccionada, setTallaSeleccionada] = useState('');

  // Si no se encuentra el producto, mostrar 404
  if (!producto) {
    notFound();
  }

  const nombreLinea = getNombreLinea(producto.linea);

  const handleComprarWhatsApp = () => {
    if (!tallaSeleccionada) {
      mostrarToast('Por favor selecciona una talla antes de continuar', 'aviso');
      return;
    }

    const url = generarMensajeProducto(producto, tallaSeleccionada);
    abrirWhatsApp(url);
  };

  const handleAddToCart = () => {
    if (!tallaSeleccionada) {
      mostrarToast('Por favor selecciona una talla antes de continuar', 'aviso');
      return;
    }

    addToCart(producto, tallaSeleccionada, 1);
    mostrarToast('Producto añadido al carrito', 'exito');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex text-sm text-neutral-600">
          <Link href="/" className="hover:text-velour-black transition-colors">
            Inicio
          </Link>
          <span className="mx-2">/</span>
          <Link href="/catalogo" className="hover:text-velour-black transition-colors">
            Catálogo
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/catalogo?linea=${producto.linea}`} className="hover:text-velour-black transition-colors">
            {nombreLinea}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-velour-black">{producto.nombre}</span>
        </nav>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Galería de imágenes */}
          <div>
            <ProductGallery imagenes={producto.imagenes} nombreProducto={producto.nombre} />
          </div>

          {/* Información del producto */}
          <div className="lg:sticky lg:top-28 lg:self-start lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-2">
            {/* Badges */}
            <div className="flex gap-2 mb-4">
              {producto.esLimitado && (
                <span className="px-3 py-1 bg-velour-black text-white text-xs uppercase tracking-wider font-medium">
                  Edición Limitada
                </span>
              )}
              <span className="px-3 py-1 bg-neutral-200 text-neutral-700 text-xs uppercase tracking-wider">
                {nombreLinea}
              </span>
            </div>

            {/* Nombre y precio */}
            <h1 className="text-3xl md:text-4xl font-light text-velour-black mb-4">
              {producto.nombre}
            </h1>
            <p className="text-2xl font-medium text-velour-black mb-6">
              {formatearPrecioConSimbolo(producto.precio)}
            </p>

            {/* Descripción */}
            <div className="mb-8 pb-8 border-b border-neutral-200">
              <p className="text-neutral-700 leading-relaxed">
                {producto.descripcion}
              </p>
            </div>

            {/* Selector de talla */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-neutral-900 uppercase tracking-wider">
                  Selecciona tu talla
                </label>
                <button
                  type="button"
                  onClick={() => setModalTallasAbierto(true)}
                  className="text-xs text-neutral-500 underline underline-offset-2 hover:text-velour-black transition-colors"
                >
                  ¿Cuál es mi talla?
                </button>
              </div>
              {producto.esLimitado && producto.unidadesRestantes && (
                <span className="text-sm text-velour-burgundy font-medium block mb-3">
                  Quedan {producto.unidadesRestantes} unidades
                </span>
              )}
              <div className="grid grid-cols-5 gap-3">
                {producto.tallas.map((talla) => {
                  const disponible = producto.disponibilidad?.[talla];
                  const seleccionada = tallaSeleccionada === talla;

                  return (
                    <button
                      key={talla}
                      onClick={() => disponible && setTallaSeleccionada(talla)}
                      disabled={!disponible}
                      className={`
                        aspect-square flex items-center justify-center border-2 transition-all
                        ${seleccionada
                          ? 'border-velour-black bg-velour-black text-white'
                          : disponible
                          ? 'border-neutral-300 hover:border-velour-black bg-white text-neutral-900'
                          : 'border-neutral-200 bg-neutral-100 text-neutral-400 cursor-not-allowed line-through'
                        }
                      `}
                    >
                      <span className="text-sm font-medium">{talla}</span>
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-neutral-500 mt-3">
                Las tallas tachadas no están disponibles actualmente
              </p>
            </div>

            {/* Colores disponibles */}
            {producto.colores && producto.colores.length > 0 && (
              <div className="mb-8 pb-8 border-b border-neutral-200">
                <p className="text-sm font-medium text-neutral-900 uppercase tracking-wider mb-3">
                  Colores disponibles
                </p>
                <div className="flex gap-2 flex-wrap">
                  {producto.colores.map((color) => (
                    <span
                      key={color}
                      className="px-4 py-2 bg-neutral-100 text-neutral-800 text-sm rounded-full"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Botones de compra */}
            <button
              onClick={handleAddToCart}
              disabled={!tallaSeleccionada}
              className={`
                w-full py-4 px-6 text-sm uppercase tracking-wider font-medium transition-all mb-3
                ${tallaSeleccionada
                  ? 'bg-velour-black text-white hover:bg-velour-charcoal'
                  : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                }
              `}
            >
              Añadir al Carrito
            </button>

            <button
              onClick={handleComprarWhatsApp}
              disabled={!tallaSeleccionada}
              className={`
                w-full py-4 px-6 text-sm uppercase tracking-wider font-medium transition-all mb-4
                flex items-center justify-center gap-2
                ${tallaSeleccionada
                  ? 'border-2 border-velour-black text-velour-black hover:bg-velour-black hover:text-white'
                  : 'border-2 border-neutral-200 text-neutral-400 cursor-not-allowed'
                }
              `}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Comprar por WhatsApp
            </button>

            <p className="text-xs text-neutral-500 text-center mb-6">
              Añade al carrito para seguir comprando o contacta directamente por WhatsApp
            </p>

            {/* Info adicional */}
            <div className="space-y-4 text-sm text-neutral-600 bg-neutral-50 p-6">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-neutral-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p>Diseño y producción local en Medellín</p>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-neutral-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p>Telas de calidad media-alta</p>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-neutral-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p>Puedes probar la prenda en nuestro studio en Laureles</p>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-neutral-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p>Atención personalizada por Valentina y su equipo</p>
              </div>
            </div>
          </div>
        </div>

        {/* También te puede gustar */}
        {productosRelacionados.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl md:text-3xl font-light text-velour-black mb-8 text-center">
              También de {nombreLinea}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {productosRelacionados.map((prod) => (
                <ProductCard key={prod.id} producto={prod} />
              ))}
            </div>
          </div>
        )}

      {/* Modal Guía de Tallas */}
      {modalTallasAbierto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-velour-black/50 backdrop-blur-sm"
          onClick={() => setModalTallasAbierto(false)}
        >

          <div
            className="bg-white max-w-lg w-full p-8 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalTallasAbierto(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-velour-black transition-colors"
              aria-label="Cerrar guía de tallas"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-2xl font-light text-velour-black mb-2">
              Guía de tallas
            </h2>
            <p className="text-sm text-neutral-500 mb-6">
              Medidas en centímetros. Tómalas sobre ropa interior ajustada.
            </p>

            <table className="w-full text-sm border-collapse mb-6">
              <thead>
                <tr className="bg-velour-cream">
                  <th className="py-3 px-4 text-left font-medium text-velour-black border border-neutral-200">Talla</th>
                  <th className="py-3 px-4 text-center font-medium text-velour-black border border-neutral-200">Busto (cm)</th>
                  <th className="py-3 px-4 text-center font-medium text-velour-black border border-neutral-200">Cintura (cm)</th>
                  <th className="py-3 px-4 text-center font-medium text-velour-black border border-neutral-200">Cadera (cm)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { talla: 'XS', busto: '80-83', cintura: '60-63', cadera: '86-89' },
                  { talla: 'S',  busto: '84-87', cintura: '64-67', cadera: '90-93' },
                  { talla: 'M',  busto: '88-91', cintura: '68-71', cadera: '94-97' },
                  { talla: 'L',  busto: '92-96', cintura: '72-76', cadera: '98-102' },
                  { talla: 'XL', busto: '97-101', cintura: '77-82', cadera: '103-108' },
                ].map(({ talla, busto, cintura, cadera }, i) => (
                  <tr key={talla} className={i % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                    <td className="py-3 px-4 font-medium text-velour-black border border-neutral-200">{talla}</td>
                    <td className="py-3 px-4 text-center text-neutral-700 border border-neutral-200">{busto}</td>
                    <td className="py-3 px-4 text-center text-neutral-700 border border-neutral-200">{cintura}</td>
                    <td className="py-3 px-4 text-center text-neutral-700 border border-neutral-200">{cadera}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="bg-neutral-50 p-4 text-xs text-neutral-600 space-y-1">
              <p><strong>Consejo:</strong> Si estás entre dos tallas, te recomendamos elegir la mayor.</p>
              <p>¿Tienes dudas? Escríbenos por WhatsApp y te ayudamos a elegir.</p>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
