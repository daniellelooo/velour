'use client';

import { useState } from 'react';
import { esEmailValido, esTelefonoValido } from '../lib/utils';
import { generarMensajeAgendarVisita, abrirWhatsApp } from '../lib/whatsapp';
import { useToast } from '../context/ToastContext';

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    fecha: '',
    hora: '',
    lineaInteres: '',
    mensaje: ''
  });

  const [errors, setErrors] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const { mostrarToast } = useToast();

  const lineas = [
    { value: '', label: 'Selecciona una línea' },
    { value: 'Velour Clásica', label: 'Velour Clásica - Basics atemporales' },
    { value: 'Velour Noche', label: 'Velour Noche - Ocasiones especiales' },
    { value: 'Velour Co.', label: 'Velour Co. - Trabajo y comodidad' },
    { value: 'Velour Edit', label: 'Velour Edit - Colecciones limitadas' },
    { value: 'No estoy segura', label: 'No estoy segura, quiero ver todo' }
  ];

  const horarios = [
    '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', 
    '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpiar error del campo cuando el usuario empiece a escribir
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

    if (!formData.telefono.trim()) {
      nuevosErrors.telefono = 'El teléfono es requerido';
    } else if (!esTelefonoValido(formData.telefono)) {
      nuevosErrors.telefono = 'Teléfono inválido (ej: 3001234567)';
    }

    if (!formData.fecha) {
      nuevosErrors.fecha = 'Selecciona una fecha';
    }

    if (!formData.hora) {
      nuevosErrors.hora = 'Selecciona una hora';
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

    // Enviar datos a la API
    try {
      const response = await fetch('/api/agendar-visita', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al procesar la solicitud');
      }

      // También abrir WhatsApp con el mensaje
      const url = generarMensajeAgendarVisita({
        nombre: formData.nombre,
        fecha: formData.fecha,
        hora: formData.hora,
        lineaInteres: formData.lineaInteres
      });
      abrirWhatsApp(url);

      setEnviado(true);
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        fecha: '',
        hora: '',
        lineaInteres: '',
        mensaje: ''
      });
    } catch (error) {
      console.error('Error al agendar visita:', error);
      mostrarToast('Hubo un error al enviar el formulario. Por favor intenta de nuevo.', 'error');
    } finally {
      setEnviando(false);
    }
  };

  if (enviado) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mb-6">
            <svg className="mx-auto h-16 w-16 text-velour-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-light text-velour-black mb-4">
            ¡Solicitud enviada!
          </h2>
          <p className="text-lg text-neutral-600 mb-8">
            Hemos recibido tu solicitud de visita. Te contactaremos pronto por WhatsApp 
            para confirmar la disponibilidad.
          </p>
          <button
            onClick={() => setEnviado(false)}
            className="inline-flex items-center px-6 py-3 bg-velour-black text-white hover:bg-velour-charcoal transition-colors text-sm uppercase tracking-wider font-medium"
          >
            Agendar otra visita
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-velour-cream py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-velour-black mb-6">
            Visitanos en Laureles
          </h1>
          <p className="text-xl text-neutral-600">
            Agenda una visita a nuestro studio y conoce las piezas en persona
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Información de contacto */}
          <div>
            <h2 className="text-2xl font-light text-velour-black mb-6">
              ¿Por qué visitarnos?
            </h2>
            <div className="space-y-4 text-neutral-700 mb-10">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-velour-black flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p>Pruébate las prendas y verifica tallas antes de comprar</p>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-velour-black flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p>Asesoría personalizada por Valentina y su equipo</p>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-velour-black flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p>Conoce el proceso de diseño y selección de telas</p>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-velour-black flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p>Explora piezas que aún no están en la web</p>
              </div>
            </div>

            <div className="bg-neutral-50 p-6 mb-8">
              <h3 className="text-lg font-medium text-velour-black mb-4">
                Ubicación
              </h3>
              <p className="text-neutral-700 mb-2">
                <strong>Dirección:</strong> Cra. 74 #33-12, Laureles
              </p>
              <p className="text-neutral-700 mb-2">
                <strong>Ciudad:</strong> Medellín, Colombia
              </p>
              <p className="text-neutral-700 mb-4">
                <strong>Horarios:</strong> Lun - Vie: 10AM - 7PM | Sáb: 11AM - 6PM
              </p>
              <div className="aspect-video bg-neutral-200 rounded">
                <div className="w-full h-full bg-gradient-to-br from-neutral-300 to-neutral-400 flex items-center justify-center text-neutral-500 text-sm">
                  Mapa de Google Maps
                </div>
              </div>
            </div>

            <div className="bg-velour-black text-white p-6">
              <h3 className="text-lg font-medium mb-4">
                ¿Prefieres escribirnos directamente?
              </h3>
              <p className="text-neutral-300 mb-4 text-sm">
                También puedes contactarnos por WhatsApp o Instagram
              </p>
              <div className="space-y-3">
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573001234567'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm hover:text-neutral-300 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  WhatsApp: +57 300 123 4567
                </a>
                <a
                  href={process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/velour.studio.med'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm hover:text-neutral-300 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram: @velour.studio.med
                </a>
              </div>
            </div>
          </div>

          {/* Formulario de agendamiento */}
          <div>
            <div className="bg-white border border-neutral-200 p-8">
              <h2 className="text-2xl font-light text-velour-black mb-6">
                Agenda tu visita
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nombre */}
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-neutral-700 mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${errors.nombre ? 'border-red-500' : 'border-neutral-300'} focus:ring-2 focus:ring-velour-black focus:border-transparent outline-none`}
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
                    className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-neutral-300'} focus:ring-2 focus:ring-velour-black focus:border-transparent outline-none`}
                    placeholder="tu@email.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                {/* Teléfono */}
                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-neutral-700 mb-2">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${errors.telefono ? 'border-red-500' : 'border-neutral-300'} focus:ring-2 focus:ring-velour-black focus:border-transparent outline-none`}
                    placeholder="3001234567"
                  />
                  {errors.telefono && <p className="mt-1 text-sm text-red-600">{errors.telefono}</p>}
                </div>

                {/* Fecha y Hora */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fecha" className="block text-sm font-medium text-neutral-700 mb-2">
                      Fecha preferida *
                    </label>
                    <input
                      type="date"
                      id="fecha"
                      name="fecha"
                      value={formData.fecha}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full px-4 py-3 border ${errors.fecha ? 'border-red-500' : 'border-neutral-300'} focus:ring-2 focus:ring-velour-black focus:border-transparent outline-none`}
                    />
                    {errors.fecha && <p className="mt-1 text-sm text-red-600">{errors.fecha}</p>}
                  </div>

                  <div>
                    <label htmlFor="hora" className="block text-sm font-medium text-neutral-700 mb-2">
                      Hora preferida *
                    </label>
                    <select
                      id="hora"
                      name="hora"
                      value={formData.hora}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border ${errors.hora ? 'border-red-500' : 'border-neutral-300'} focus:ring-2 focus:ring-velour-black focus:border-transparent outline-none`}
                    >
                      <option value="">Selecciona</option>
                      {horarios.map(hora => (
                        <option key={hora} value={hora}>{hora}</option>
                      ))}
                    </select>
                    {errors.hora && <p className="mt-1 text-sm text-red-600">{errors.hora}</p>}
                  </div>
                </div>

                {/* Línea de interés */}
                <div>
                  <label htmlFor="lineaInteres" className="block text-sm font-medium text-neutral-700 mb-2">
                    ¿Qué línea te interesa?
                  </label>
                  <select
                    id="lineaInteres"
                    name="lineaInteres"
                    value={formData.lineaInteres}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-300 focus:ring-2 focus:ring-velour-black focus:border-transparent outline-none"
                  >
                    {lineas.map(linea => (
                      <option key={linea.value} value={linea.value}>{linea.label}</option>
                    ))}
                  </select>
                </div>

                {/* Mensaje opcional */}
                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-neutral-700 mb-2">
                    Mensaje adicional (opcional)
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-neutral-300 focus:ring-2 focus:ring-velour-black focus:border-transparent outline-none resize-none"
                    placeholder="¿Algo específico que quieras que sepamos?"
                  />
                </div>

                {/* Botón submit */}
                <button
                  type="submit"
                  disabled={enviando}
                  className={`w-full py-4 px-6 text-sm uppercase tracking-wider font-medium transition-colors ${
                    enviando
                      ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                      : 'bg-velour-black text-white hover:bg-velour-charcoal'
                  }`}
                >
                  {enviando ? 'Enviando...' : 'Enviar solicitud'}
                </button>

                <p className="text-xs text-neutral-500 text-center">
                  Te contactaremos por WhatsApp para confirmar tu visita
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
