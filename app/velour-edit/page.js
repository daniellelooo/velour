'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getProductosEdit } from '../lib/productos';
import { formatearPrecioConSimbolo } from '../lib/utils';
import { esEmailValido } from '../lib/utils';

export default function VelourEditPage() {
  const productosEdit = getProductosEdit();
  
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    talla: '',
    coleccion: 'Edit #9 (Próxima)'
  });

  const [errors, setErrors] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const tallas = ['XS', 'S', 'M', 'L', 'XL'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrors = {};

    if (!formData.nombre.trim()) {
      nuevosErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      nuevosErrors.email = 'El email es requerido';
    } else if (!esEmailValido(formData.email)) {
      nuevosErrors.email = 'Email inválido';
    }

    if (!formData.talla) {
      nuevosErrors.talla = 'Selecciona tu talla';
    }

    setErrors(nuevosErrors);
    return Object.keys(nuevosErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    setEnviando(true);

    try {
      // Enviar datos a la API
      const response = await fetch('/api/lista-espera', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al procesar la solicitud');
      }

      setEnviado(true);
      setFormData({
        nombre: '',
        email: '',
        talla: '',
        coleccion: 'Edit #9 (Próxima)'
      });
    } catch (error) {
      console.error('Error al registrar en lista de espera:', error);
      alert('Hubo un error al enviar el formulario. Por favor intenta de nuevo.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero - Dark and dramatic */}
      <div className="bg-velour-charcoal text-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-light mb-6 tracking-tight">
            Velour Edit
          </h1>
          <p className="text-2xl md:text-3xl font-light mb-4 text-neutral-300">
            20 piezas. Cuando se acaban, se acaban.
          </p>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Colecciones limitadas cada 6 semanas. Diseño exclusivo, producción mínima.
            Si algo te fascina, no esperes.
          </p>
        </div>
      </div>

      {/* Colección actual */}
      {productosEdit.length > 0 && (
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-wider text-neutral-500 mb-2">
                Colección actual
              </p>
              <h2 className="text-4xl font-light text-velour-black mb-4">
                Edit #{productosEdit[0].nombre.match(/#(\d+)/)?.[1] || '8'}
              </h2>
              <p className="text-neutral-600">
                Último lanzamiento. Quedan pocas unidades.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {productosEdit.map((producto) => (
                <Link
                  key={producto.id}
                  href={`/producto/${producto.id}`}
                  className="group"
                >
                  <div className="relative">
                    <div className="aspect-[3/4] bg-neutral-200 mb-4 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-neutral-300 to-neutral-400 group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    
                    {/* Badge de unidades restantes */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-velour-burgundy text-white text-xs uppercase tracking-wider font-medium">
                        {producto.unidadesRestantes} unidades
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-medium text-velour-black mb-2 group-hover:text-neutral-600 transition-colors">
                    {producto.nombre.split(': ')[1]}
                  </h3>
                  <p className="text-sm text-neutral-600 mb-2">
                    {producto.descripcion.substring(0, 80)}...
                  </p>
                  <p className="text-lg font-medium text-velour-black">
                    {formatearPrecioConSimbolo(producto.precio)}
                  </p>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/catalogo?linea=edit"
                className="inline-flex items-center px-8 py-4 bg-velour-black text-white hover:bg-velour-charcoal transition-colors text-sm uppercase tracking-wider font-medium"
              >
                Ver colección completa
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Cómo funciona Velour Edit */}
      <div className="py-20 bg-velour-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-light text-velour-black mb-12 text-center">
            ¿Cómo funciona Velour Edit?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-velour-black text-white flex items-center justify-center mx-auto mb-4 text-2xl font-light">
                1
              </div>
              <h3 className="text-lg font-medium text-velour-black mb-2">
                Diseño exclusivo
              </h3>
              <p className="text-neutral-600">
                Cada 6 semanas diseñamos una micro-colección de 3 piezas únicas que no 
                volverán a producirse.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-velour-black text-white flex items-center justify-center mx-auto mb-4 text-2xl font-light">
                2
              </div>
              <h3 className="text-lg font-medium text-velour-black mb-2">
                Producción limitada
              </h3>
              <p className="text-neutral-600">
                Solo producimos 20 unidades en total (distribuidas entre las 3 piezas). 
                Cuando se acaban, se acaban.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-velour-black text-white flex items-center justify-center mx-auto mb-4 text-2xl font-light">
                3
              </div>
              <h3 className="text-lg font-medium text-velour-black mb-2">
                Se agotan rápido
              </h3>
              <p className="text-neutral-600">
                Históricamente, las colecciones Edit se agotan en menos de 48 horas. 
                La lista de espera te da prioridad.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de espera */}
      <div id="lista-espera" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {enviado ? (
            <div className="text-center py-12">
              <div className="mb-6">
                <svg className="mx-auto h-16 w-16 text-velour-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-light text-velour-black mb-4">
                ¡Ya estás en la lista!
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                Te avisaremos 48 horas antes del lanzamiento de Edit #9. 
                Revisa tu email (incluyendo spam).
              </p>
              <button
                onClick={() => setEnviado(false)}
                className="inline-flex items-center px-6 py-3 bg-velour-black text-white hover:bg-velour-charcoal transition-colors text-sm uppercase tracking-wider font-medium"
              >
                Registrar otro email
              </button>
            </div>
          ) : (
            <>
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-light text-velour-black mb-4">
                  Lista de espera Edit #9
                </h2>
                <p className="text-lg text-neutral-600">
                  Sé la primera en ver la próxima colección. Te avisamos 48h antes del lanzamiento.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="bg-neutral-50 p-8 space-y-6">
                {/* Nombre */}
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-neutral-700 mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${errors.nombre ? 'border-red-500' : 'border-neutral-300'} bg-white focus:ring-2 focus:ring-velour-black focus:border-transparent outline-none`}
                    placeholder="Tu nombre"
                  />
                  {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-neutral-300'} bg-white focus:ring-2 focus:ring-velour-black focus:border-transparent outline-none`}
                    placeholder="tu@email.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  <p className="mt-1 text-xs text-neutral-500">
                    Te enviaremos un email 48h antes del lanzamiento
                  </p>
                </div>

                {/* Talla */}
                <div>
                  <label htmlFor="talla" className="block text-sm font-medium text-neutral-700 mb-2">
                    Tu talla preferida *
                  </label>
                  <div className="grid grid-cols-5 gap-3">
                    {tallas.map((talla) => {
                      const seleccionada = formData.talla === talla;
                      return (
                        <button
                          key={talla}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, talla }))}
                          className={`
                            aspect-square flex items-center justify-center border-2 transition-all
                            ${seleccionada
                              ? 'border-velour-black bg-velour-black text-white'
                              : 'border-neutral-300 bg-white text-neutral-900 hover:border-velour-black'
                            }
                          `}
                        >
                          <span className="text-sm font-medium">{talla}</span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.talla && <p className="mt-1 text-sm text-red-600">{errors.talla}</p>}
                </div>

                {/* Información adicional */}
                <div className="bg-white border border-neutral-200 p-4 text-sm text-neutral-600">
                  <p className="font-medium text-neutral-900 mb-2">¿Qué incluye estar en la lista?</p>
                  <ul className="space-y-1 ml-4">
                    <li>✓ Email 48h antes del lanzamiento con preview de la colección</li>
                    <li>✓ Link exclusivo para compra anticipada</li>
                    <li>✓ Si no compras, seguimiento 72h después con disponibilidad</li>
                  </ul>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={enviando}
                  className={`w-full py-4 px-6 text-sm uppercase tracking-wider font-medium transition-colors ${
                    enviando
                      ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                      : 'bg-velour-black text-white hover:bg-velour-charcoal'
                  }`}
                >
                  {enviando ? 'Registrando...' : 'Unirme a la lista de espera'}
                </button>

                <p className="text-xs text-neutral-500 text-center">
                  Puedes darte de baja en cualquier momento. No compartimos tu información.
                </p>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Testimonios / Proof social */}
      <div className="py-20 bg-velour-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light text-velour-black mb-12 text-center">
            Por qué nuestras clientas aman Velour Edit
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6">
              <p className="text-neutral-700 mb-4 italic">
                &ldquo;Compré una pieza de Edit #6 y todavía recibo preguntas de dónde la saqué. 
                Saber que nadie más va a tener lo mismo es increíble.&rdquo;
              </p>
              <p className="text-sm text-neutral-500">— Daniela M., Medellín</p>
            </div>

            <div className="bg-white p-6">
              <p className="text-neutral-700 mb-4 italic">
                &ldquo;Al principio dudé por el precio, pero la calidad y el diseño lo valen completamente. 
                Terminé comprando dos piezas de la misma colección.&rdquo;
              </p>
              <p className="text-sm text-neutral-500">— Salomé G., Envigado</p>
            </div>

            <div className="bg-white p-6">
              <p className="text-neutral-700 mb-4 italic">
                &ldquo;Edit #7 se agotó antes de que pudiera decidirme. Ahora estoy en la lista 
                desde el día 1. No me vuelvo a perder un lanzamiento.&rdquo;
              </p>
              <p className="text-sm text-neutral-500">— Marcela O., El Poblado</p>
            </div>

            <div className="bg-white p-6">
              <p className="text-neutral-700 mb-4 italic">
                &ldquo;Lo que más me gusta es que Velour no sigue tendencias. Las piezas Edit 
                son arriesgadas pero atemporales. Inversión, no gasto.&rdquo;
              </p>
              <p className="text-sm text-neutral-500">— Carolina R., Laureles</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
