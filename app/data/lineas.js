// Información de las 4 líneas de producto de Velour Studio

export const lineas = [
  {
    id: 'clasica',
    nombre: 'Velour Clásica',
    descripcion: 'Basics atemporales: blusas, pantalones, conjuntos neutros',
    rangoPrecios: '$120K – $180K',
    precioMin: 120000,
    precioMax: 180000,
    porcentajeVentas: 40,
    slug: 'clasica',
    color: '#E8DED2', // Beige suave
    tagline: 'Lo esencial, diseñado para durar',
    imagen: '/images/lineas/clasica.jpg'
  },
  {
    id: 'noche',
    nombre: 'Velour Noche',
    descripcion: 'Piezas para ocasiones especiales, telas más elaboradas',
    rangoPrecios: '$200K – $320K',
    precioMin: 200000,
    precioMax: 320000,
    porcentajeVentas: 25,
    slug: 'noche',
    color: '#1A1A1A', // Negro elegante
    tagline: 'Cada ocasión merece una pieza especial',
    imagen: '/images/lineas/noche.jpg'
  },
  {
    id: 'co',
    nombre: 'Velour Co.',
    descripcion: 'Ropa cómoda de autor para trabajo y trabajo remoto',
    rangoPrecios: '$140K – $200K',
    precioMin: 140000,
    precioMax: 200000,
    porcentajeVentas: 25,
    slug: 'co',
    color: '#8B7E74', // Taupe
    tagline: 'Profesional sin ser corporativo',
    imagen: '/images/lineas/co.jpg'
  },
  {
    id: 'edit',
    nombre: 'Velour Edit',
    descripcion: 'Colecciones limitadas de 20 piezas cada 6 semanas',
    rangoPrecios: '$180K – $280K',
    precioMin: 180000,
    precioMax: 280000,
    porcentajeVentas: 10,
    slug: 'edit',
    color: '#2D2D2D', // Carbón
    tagline: '20 piezas. Cuando se acaban, se acaban.',
    imagen: '/images/lineas/edit.jpg',
    esLimitada: true
  }
];

export const getLineaById = (id) => {
  return lineas.find(linea => linea.id === id || linea.slug === id);
};

export const getLineaBySlug = (slug) => {
  return lineas.find(linea => linea.slug === slug);
};
