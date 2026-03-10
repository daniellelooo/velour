// Utilidades para integración de WhatsApp

// Número de WhatsApp del negocio (se debe configurar en .env.local)
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573001234567';

/**
 * Genera URL de WhatsApp con mensaje predefinido para consulta de producto
 * @param {Object} producto - Objeto con datos del producto
 * @param {string} talla - Talla seleccionada por el cliente
 * @returns {string} URL de WhatsApp para abrir
 */
export const generarMensajeProducto = (producto, talla = '') => {
  const mensaje = `Hola! Me interesa el producto: *${producto.nombre}*${talla ? ` en talla *${talla}*` : ''}.

Precio: $${formatearPrecio(producto.precio)}

¿Está disponible?

Link: ${typeof window !== 'undefined' ? window.location.href : ''}`;
  
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
};

/**
 * Genera URL de WhatsApp con mensaje de consulta general
 * @returns {string} URL de WhatsApp para abrir
 */
export const generarMensajeConsultaGeneral = () => {
  const mensaje = `Hola! Me gustaría recibir más información sobre Velour Studio. 

¿Podrían ayudarme?`;
  
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
};

/**
 * Genera URL de WhatsApp para agendar visita al local
 * @param {Object} datos - Objeto con nombre, fecha, hora, lineaInteres
 * @returns {string} URL de WhatsApp para abrir
 */
export const generarMensajeAgendarVisita = (datos) => {
  const { nombre, fecha, hora, lineaInteres } = datos;
  
  const mensaje = `Hola! Soy *${nombre}* y me gustaría agendar una visita al studio.

📅 Fecha preferida: ${fecha}
🕐 Hora preferida: ${hora}
👗 Línea de interés: ${lineaInteres || 'Por definir'}

¿Tienen disponibilidad?`;
  
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
};

/**
 * Genera URL de WhatsApp para consulta sobre Velour Edit
 * @returns {string} URL de WhatsApp para abrir
 */
export const generarMensajeVelourEdit = () => {
  const mensaje = `Hola! Me interesa la colección *Velour Edit*. 

¿Cuándo sale la próxima colección y cómo puedo estar en la lista de espera?`;
  
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
};

/**
 * Abre WhatsApp en nueva pestaña o app móvil
 * @param {string} url - URL generada por las funciones anteriores
 */
export const abrirWhatsApp = (url) => {
  if (typeof window !== 'undefined') {
    window.open(url, '_blank');
  }
};

// Helper para formatear precios (exportada también desde utils.js)
function formatearPrecio(precio) {
  return precio.toLocaleString('es-CO');
}
