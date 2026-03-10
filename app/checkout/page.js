'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { formatearPrecioConSimbolo } from '../lib/utils';
import { abrirWhatsApp } from '../lib/whatsapp';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, getCartTotal, getCartCount, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    ciudad: 'Medellín',
    direccion: '',
    notas: ''
  });

  const [errors, setErrors] = useState({});

  // Validación del formulario
  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    } else if (!/^\d{10}$/.test(formData.telefono.replace(/\s/g, ''))) {
      newErrors.telefono = 'Ingresa un número válido de 10 dígitos';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ingresa un email válido';
    }

    if (!formData.direccion.trim()) {
      newErrors.direccion = 'La dirección es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error al escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleFinalizarCompra = () => {
    if (!validateForm()) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    // Construir mensaje para WhatsApp
    let mensaje = `*🛍️ NUEVO PEDIDO - VELOUR STUDIO*%0A%0A`;
    mensaje += `*📋 Información del cliente*%0A`;
    mensaje += `Nombre: ${formData.nombre}%0A`;
    mensaje += `Teléfono: ${formData.telefono}%0A`;
    mensaje += `Email: ${formData.email}%0A`;
    mensaje += `Ciudad: ${formData.ciudad}%0A`;
    mensaje += `Dirección: ${formData.direccion}%0A`;
    if (formData.notas) {
      mensaje += `Notas: ${formData.notas}%0A`;
    }
    
    mensaje += `%0A*🛒 Productos:*%0A`;
    cart.forEach((item, index) => {
      mensaje += `%0A${index + 1}. *${item.producto.nombre}*%0A`;
      mensaje += `   Talla: ${item.talla}%0A`;
      mensaje += `   Cantidad: ${item.quantity}%0A`;
      mensaje += `   Precio: ${formatearPrecioConSimbolo(item.producto.precio * item.quantity)}%0A`;
    });

    mensaje += `%0A*💰 Total: ${formatearPrecioConSimbolo(getCartTotal())}*%0A`;
    mensaje += `%0A_Enviado desde velour-studio.com_`;

    // Abrir WhatsApp
    abrirWhatsApp(`https://wa.me/573001234567?text=${mensaje}`);

    // Limpiar carrito y redirigir
    setTimeout(() => {
      clearCart();
      router.push('/gracias');
    }, 1000);
  };

  // Si el carrito está vacío
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <svg className="w-24 h-24 mx-auto text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h1 className="text-3xl font-light text-velour-black mb-4">Tu carrito está vacío</h1>
          <p className="text-neutral-600 mb-8">
            Agrega productos para continuar con tu compra
          </p>
          <Link
            href="/catalogo"
            className="inline-block px-8 py-3 bg-velour-black text-white hover:bg-velour-charcoal transition-colors uppercase tracking-wider text-sm font-medium"
          >
            Ver catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-light text-velour-black">Checkout</h1>
            <Link href="/catalogo" className="text-sm text-neutral-600 hover:text-velour-black transition-colors">
              ← Seguir comprando
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Formulario */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 shadow-sm">
              <h2 className="text-xl font-medium mb-6">Información de envío</h2>
              
              <div className="space-y-6">
                {/* Nombre completo */}
                <div>
                  <label className="block text-sm font-medium text-neutral-900 mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => handleInputChange('nombre', e.target.value)}
                    className={`w-full px-4 py-3 border ${errors.nombre ? 'border-red-500' : 'border-neutral-300'} focus:border-velour-black focus:outline-none`}
                    placeholder="Valentina Ríos"
                  />
                  {errors.nombre && (
                    <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>
                  )}
                </div>

                {/* Teléfono y Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-900 mb-2">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      value={formData.telefono}
                      onChange={(e) => handleInputChange('telefono', e.target.value)}
                      className={`w-full px-4 py-3 border ${errors.telefono ? 'border-red-500' : 'border-neutral-300'} focus:border-velour-black focus:outline-none`}
                      placeholder="3001234567"
                    />
                    {errors.telefono && (
                      <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-900 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-neutral-300'} focus:border-velour-black focus:outline-none`}
                      placeholder="tu@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Ciudad */}
                <div>
                  <label className="block text-sm font-medium text-neutral-900 mb-2">
                    Ciudad *
                  </label>
                  <select
                    value={formData.ciudad}
                    onChange={(e) => handleInputChange('ciudad', e.target.value)}
                    className="w-full px-4 py-3 border border-neutral-300 focus:border-velour-black focus:outline-none"
                  >
                    <option value="Medellín">Medellín</option>
                    <option value="Bogotá">Bogotá</option>
                    <option value="Cali">Cali</option>
                    <option value="Barranquilla">Barranquilla</option>
                    <option value="Cartagena">Cartagena</option>
                    <option value="Otra">Otra ciudad</option>
                  </select>
                </div>

                {/* Dirección */}
                <div>
                  <label className="block text-sm font-medium text-neutral-900 mb-2">
                    Dirección completa *
                  </label>
                  <input
                    type="text"
                    value={formData.direccion}
                    onChange={(e) => handleInputChange('direccion', e.target.value)}
                    className={`w-full px-4 py-3 border ${errors.direccion ? 'border-red-500' : 'border-neutral-300'} focus:border-velour-black focus:outline-none`}
                    placeholder="Calle 10 # 45-32, Apto 501"
                  />
                  {errors.direccion && (
                    <p className="text-red-500 text-xs mt-1">{errors.direccion}</p>
                  )}
                </div>

                {/* Notas adicionales */}
                <div>
                  <label className="block text-sm font-medium text-neutral-900 mb-2">
                    Notas adicionales (opcional)
                  </label>
                  <textarea
                    value={formData.notas}
                    onChange={(e) => handleInputChange('notas', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-neutral-300 focus:border-velour-black focus:outline-none resize-none"
                    placeholder="Instrucciones de entrega, preferencias, etc."
                  />
                </div>
              </div>

              {/* Información de pago */}
              <div className="mt-8 pt-8 border-t border-neutral-200">
                <h3 className="text-lg font-medium mb-4">Método de pago</h3>
                <div className="bg-neutral-50 p-6 rounded">
                  <div className="flex items-start gap-3 mb-4">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <div>
                      <p className="font-medium text-neutral-900 mb-2">Pago coordinado por WhatsApp</p>
                      <p className="text-sm text-neutral-600 leading-relaxed">
                        Al finalizar tu pedido, te enviaremos los detalles por WhatsApp para coordinar el pago y la entrega. 
                        Aceptamos transferencias bancarias, Nequi, Daviplata y efectivo contra entrega en Medellín.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 shadow-sm sticky top-8">
              <h2 className="text-xl font-medium mb-6">Resumen del pedido</h2>
              
              {/* Productos */}
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={`${item.producto.id}-${item.talla}`} className="flex gap-4">
                    <div className="w-20 h-24 bg-neutral-200 flex-shrink-0 relative overflow-hidden">
                      {item.producto.imagenes && item.producto.imagenes[0] ? (
                        <Image
                          src={item.producto.imagenes[0]}
                          alt={item.producto.nombre}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-neutral-300 to-neutral-400" />
                      )}
                      {/* Badge de cantidad */}
                      <div className="absolute top-2 right-2 bg-velour-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-neutral-900 truncate">{item.producto.nombre}</p>
                      <p className="text-xs text-neutral-600 mt-1">Talla: {item.talla}</p>
                      <p className="text-sm font-medium text-neutral-900 mt-2">
                        {formatearPrecioConSimbolo(item.producto.precio * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totales */}
              <div className="border-t border-neutral-200 pt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Subtotal ({getCartCount()} items)</span>
                  <span className="font-medium">{formatearPrecioConSimbolo(getCartTotal())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Envío</span>
                  <span className="text-sm text-neutral-600">A coordinar</span>
                </div>
                <div className="flex justify-between text-lg font-medium pt-3 border-t border-neutral-200">
                  <span>Total</span>
                  <span className="text-velour-black">{formatearPrecioConSimbolo(getCartTotal())}</span>
                </div>
              </div>

              {/* Botón de finalizar */}
              <button
                onClick={handleFinalizarCompra}
                className="w-full mt-6 py-4 bg-velour-black text-white hover:bg-velour-charcoal transition-colors uppercase tracking-wider text-sm font-medium flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Finalizar pedido por WhatsApp
              </button>

              <p className="text-xs text-neutral-500 text-center mt-4">
                Al continuar, serás redirigido a WhatsApp para confirmar tu pedido
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
