// Funciones utilitarias para la aplicación Velour Studio

/**
 * Formatea precio en COP con separadores de miles
 * @param {number} precio - Precio numérico
 * @returns {string} Precio formateado (ej: "145.000")
 */
export const formatearPrecio = (precio) => {
  return precio.toLocaleString('es-CO');
};

/**
 * Formatea precio con símbolo de moneda
 * @param {number} precio - Precio numérico
 * @returns {string} Precio con símbolo (ej: "$145.000")
 */
export const formatearPrecioConSimbolo = (precio) => {
  return `$${formatearPrecio(precio)}`;
};

/**
 * Verifica si una talla está disponible para un producto
 * @param {Object} producto - Objeto producto
 * @param {string} talla - Talla a verificar
 * @returns {boolean} true si está disponible
 */
export const esTallaDisponible = (producto, talla) => {
  return producto.disponibilidad?.[talla] === true;
};

/**
 * Obtiene las tallas disponibles de un producto
 * @param {Object} producto - Objeto producto
 * @returns {Array} Array de tallas disponibles
 */
export const getTallasDisponibles = (producto) => {
  if (!producto.disponibilidad) return [];
  return Object.keys(producto.disponibilidad).filter(talla => producto.disponibilidad[talla]);
};

/**
 * Genera slug a partir de texto (para URLs amigables)
 * @param {string} texto - Texto a convertir
 * @returns {string} Slug generado
 */
export const generarSlug = (texto) => {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Elimina acentos
    .replace(/[^a-z0-9\s-]/g, '') // Elimina caracteres especiales
    .trim()
    .replace(/\s+/g, '-') // Reemplaza espacios con guiones
    .replace(/-+/g, '-'); // Elimina guiones duplicados
};

/**
 * Trunca texto a una longitud específica
 * @param {string} texto - Texto a truncar
 * @param {number} longitud - Longitud máxima
 * @returns {string} Texto truncado con "..."
 */
export const truncarTexto = (texto, longitud = 150) => {
  if (texto.length <= longitud) return texto;
  return texto.substring(0, longitud).trim() + '...';
};

/**
 * Obtiene el nombre legible de una línea a partir de su ID
 * @param {string} lineaId - ID de la línea (clasica, noche, co, edit)
 * @returns {string} Nombre de la línea
 */
export const getNombreLinea = (lineaId) => {
  const nombres = {
    clasica: 'Velour Clásica',
    noche: 'Velour Noche',
    co: 'Velour Co.',
    edit: 'Velour Edit'
  };
  return nombres[lineaId] || lineaId;
};

/**
 * Valida formato de email
 * @param {string} email - Email a validar
 * @returns {boolean} true si es válido
 */
export const esEmailValido = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Valida formato de teléfono colombiano
 * @param {string} telefono - Teléfono a validar
 * @returns {boolean} true si es válido
 */
export const esTelefonoValido = (telefono) => {
  // Acepta formatos: 3001234567, 300 123 4567, +57 300 123 4567
  const regex = /^(\+?57)?[\s-]?3[\d\s-]{9,}$/;
  return regex.test(telefono);
};

/**
 * Formatea fecha en formato legible en español
 * @param {Date|string} fecha - Fecha a formatear
 * @returns {string} Fecha formateada
 */
export const formatearFecha = (fecha) => {
  const date = new Date(fecha);
  return date.toLocaleDateString('es-CO', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

/**
 * Clase utilitaria para combinar classNames condicionalmente (similar a clsx)
 * @param  {...any} classes - Clases a combinar
 * @returns {string} String con clases combinadas
 */
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Capitaliza la primera letra de un string
 * @param {string} texto - Texto a capitalizar
 * @returns {string} Texto capitalizado
 */
export const capitalizar = (texto) => {
  if (!texto) return '';
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
};
