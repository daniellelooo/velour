// Mock data: Catálogo de productos Velour Studio
// 30 productos distribuidos en las 4 líneas: Clásica, Noche, Co., Edit

export const tallas = ['XS', 'S', 'M', 'L', 'XL'];

export const productos = [
  // VELOUR CLÁSICA (12 productos - 40%)
  {
    id: 'clasica-1',
    nombre: 'Blusa Atelier',
    linea: 'clasica',
    precio: 145000,
    descripcion: 'Blusa de algodón pima 100% nacional. Corte recto con mangas largas y cuello mao. Perfecta para combinar con cualquier pantalón.',
    tallas: ['XS', 'S', 'M', 'L', 'XL'],
    disponibilidad: { XS: true, S: true, M: true, L: true, XL: false },
    colores: ['Blanco', 'Negro', 'Beige'],
    imagenes: [
      'https://placehold.co/800x1200/f5f5f5/404040.png?text=Blusa+Atelier',
      'https://placehold.co/800x1200/e5e5e5/404040.png?text=Blusa+Atelier',
      'https://placehold.co/800x1200/d5d5d5/404040.png?text=Blusa+Atelier'
    ],
    destacado: true
  },
  {
    id: 'clasica-2',
    nombre: 'Pantalón Minimal',
    linea: 'clasica',
    precio: 168000,
    descripcion: 'Pantalón de tela de viscosa con elastano. Corte recto de tiro medio. Bolsillos laterales funcionales.',
    tallas: ['XS', 'S', 'M', 'L', 'XL'],
    disponibilidad: { XS: true, S: true, M: true, L: true, XL: true },
    colores: ['Negro', 'Café', 'Gris'],
    imagenes: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1200',
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&h=1200'
    ],
    destacado: false
  },
  {
    id: 'clasica-3',
    nombre: 'Conjunto Linen',
    linea: 'clasica',
    precio: 180000,
    descripcion: 'Conjunto de dos piezas en lino natural. Top cropped con pantalón de tiro alto. Ideal para días de calor.',
    tallas: ['XS', 'S', 'M', 'L'],
    disponibilidad: { XS: true, S: true, M: false, L: true, XL: false },
    colores: ['Crudo', 'Arena'],
    imagenes: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=1200',
      'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&h=1200',
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&h=1200'
    ],
    destacado: false
  },
  {
    id: 'clasica-4',
    nombre: 'Camisa Oversize',
    linea: 'clasica',
    precio: 152000,
    descripcion: 'Camisa oversize en popelina de algodón. Corte amplio con bolsillo frontal. Se puede usar como blusa o sobrecamisa.',
    tallas: ['S', 'M', 'L', 'XL'],
    disponibilidad: { XS: false, S: true, M: true, L: true, XL: true },
    colores: ['Blanco', 'Azul claro'],
    imagenes: [
      'https://images.unsplash.com/photo-1624206112918-f140f087f9b5?w=800&h=1200',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=1200'
    ],
    destacado: false
  },
  {
    id: 'clasica-5',
    nombre: 'Vestido Midi Básico',
    linea: 'clasica',
    precio: 135000,
    descripcion: 'Vestido midi en jersey de algodón. Manga corta, cuello redondo. Versátil para el día a día.',
    tallas: ['XS', 'S', 'M', 'L', 'XL'],
    disponibilidad: { XS: true, S: true, M: true, L: true, XL: true },
    colores: ['Negro', 'Gris', 'Camel'],
    imagenes: [
      'https://placehold.co/800x1200/2a2a2a/ffffff.png?text=Vestido+Midi',
      'https://placehold.co/800x1200/1a1a1a/ffffff.png?text=Vestido+Midi'
    ],
    destacado: true
  },
  {
    id: 'clasica-6',
    nombre: 'Top Cuello Alto',
    linea: 'clasica',
    precio: 125000,
    descripcion: 'Top de cuello alto en rib de algodón. Manga larga ajustada. Básico que funciona con todo.',
    tallas: ['XS', 'S', 'M', 'L', 'XL'],
    disponibilidad: { XS: true, S: true, M: true, L: false, XL: true },
    colores: ['Negro', 'Blanco', 'Tierra'],
    imagenes: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&h=1200',
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&h=1200'
    ],
    destacado: false
  },
  {
    id: 'clasica-7',
    nombre: 'Falda Recta',
    linea: 'clasica',
    precio: 148000,
    descripcion: 'Falda midi de corte recto en lana sintética. Cierre lateral invisible. Forro interior.',
    tallas: ['XS', 'S', 'M', 'L', 'XL'],
    disponibilidad: { XS: true, S: true, M: true, L: true, XL: false },
    colores: ['Negro', 'Gris'],
    imagenes: [
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&h=1200',
      'https://images.unsplash.com/photo-1590330297626-d7aff25a0431?w=800&h=1200'
    ],
    destacado: false
  },
  {
    id: 'clasica-8',
    nombre: 'Blazer Desestructurado',
    linea: 'clasica',
    precio: 178000,
    descripcion: 'Blazer sin forro, corte relajado. Un solo botón. La pieza que eleva cualquier outfit.',
    tallas: ['S', 'M', 'L', 'XL'],
    disponibilidad: { XS: false, S: true, M: true, L: true, XL: true },
    colores: ['Beige', 'Negro'],
    imagenes: [
      'https://placehold.co/800x1200/d4c5b0/404040.png?text=Blazer+Desestructurado',
      'https://placehold.co/800x1200/2a2a2a/ffffff.png?text=Blazer+Desestructurado',
      'https://placehold.co/800x1200/c4b5a0/404040.png?text=Blazer+Desestructurado'
    ],
    destacado: true
  },
  {
    id: 'clasica-9',
    nombre: 'Jean Wide Leg',
    linea: 'clasica',
    precio: 165000,
    descripcion: 'Jean de pierna ancha en mezclilla de algodón. Tiro alto, 5 bolsillos clásicos.',
    tallas: ['XS', 'S', 'M', 'L', 'XL'],
    disponibilidad: { XS: true, S: true, M: true, L: true, XL: true },
    colores: ['Azul oscuro', 'Negro'],
    imagenes: [
      'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&h=1200',
      'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=800&h=1200'
    ],
    destacado: false
  },
  {
    id: 'clasica-10',
    nombre: 'Body Essential',
    linea: 'clasica',
    precio: 122000,
    descripcion: 'Body de tirantes en jersey elástico. Escote en V. Broche de cierre invisible. Base perfecta para cualquier outfit.',
    tallas: ['XS', 'S', 'M', 'L', 'XL'],
    disponibilidad: { XS: true, S: true, M: false, L: true, XL: true },
    colores: ['Negro', 'Blanco', 'Nude'],
    imagenes: [
      'https://images.unsplash.com/photo-1562137369-1a1a0bc66744?w=800&h=1200',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1200'
    ],
    destacado: false
  },
  {
    id: 'clasica-11',
    nombre: 'Chaleco Largo',
    linea: 'clasica',
    precio: 158000,
    descripcion: 'Chaleco largo tipo vest. Sin mangas, corte recto. Ideal para crear capas.',
    tallas: ['S', 'M', 'L', 'XL'],
    disponibilidad: { XS: false, S: true, M: true, L: true, XL: false },
    colores: ['Camel', 'Negro', 'Gris'],
    imagenes: [
      'https://images.unsplash.com/photo-1594633313593-bab3db0f4e1f?w=800&h=1200',
      'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800&h=1200'
    ],
    destacado: false
  },
  {
    id: 'clasica-12',
    nombre: 'Pantalón Cargo',
    linea: 'clasica',
    precio: 172000,
    descripcion: 'Pantalón cargo en gabardina de algodón. Bolsillos laterales con fuelle. Pretina con pasadores.',
    tallas: ['XS', 'S', 'M', 'L', 'XL'],
    disponibilidad: { XS: true, S: true, M: true, L: true, XL: true },
    colores: ['Verde militar', 'Beige', 'Negro'],
    imagenes: [
      'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&h=1200',
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=1200'
    ],
    destacado: false
  },

  // VELOUR NOCHE (8 productos - 25%)
  {
    id: 'noche-1',
    nombre: 'Vestido Midi Satinado',
    linea: 'noche',
    precio: 245000,
    descripcion: 'Vestido midi en satén suave. Escote cruzado, manga corta. Caída fluida con movimiento. Perfecto para eventos especiales.',
    tallas: ['XS', 'S', 'M', 'L', 'XL'],
    disponibilidad: { XS: true, S: true, M: true, L: false, XL: true },
    colores: ['Negro', 'Borgoña', 'Verde esmeralda'],
    imagenes: [
      'https://placehold.co/800x1200/1a1a1a/ffffff.png?text=Vestido+Satinado',
      'https://placehold.co/800x1200/6b1f33/ffffff.png?text=Vestido+Satinado',
      'https://placehold.co/800x1200/0d5447/ffffff.png?text=Vestido+Satinado'
    ],
    destacado: true
  },
  {
    id: 'noche-2',
    nombre: 'Top Lentejuelas',
    linea: 'noche',
    precio: 210000,
    descripcion: 'Top bordado con lentejuelas en tulle. Tirantes delgados, espalda abierta. Combinarlo con pantalón sastre.',
    tallas: ['XS', 'S', 'M', 'L'],
    disponibilidad: { XS: true, S: true, M: false, L: true, XL: false },
    colores: ['Dorado', 'Plateado', 'Negro'],
    imagenes: [
      'https://images.unsplash.com/photo-1544957992-20514f595d6f?w=800&h=1200',
      'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=800&h=1200'
    ],
    destacado: false
  },
  {
    id: 'noche-3',
    nombre: 'Palazzo Elegante',
    linea: 'noche',
    precio: 228000,
    descripcion: 'Pantalón palazzo de tiro alto en crepé. Pierna ultra ancha con caída impecable. Se ve increíble con tacones.',
    tallas: ['S', 'M', 'L', 'XL'],
    disponibilidad: { XS: false, S: true, M: true, L: true, XL: true },
    colores: ['Negro', 'Azul noche'],
    imagenes: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1200',
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&h=1200'
    ],
    destacado: false
  },
  {
    id: 'noche-4',
    nombre: 'Vestido Largo Terciopelo',
    linea: 'noche',
    precio: 320000,
    descripcion: 'Vestido largo en terciopelo stretch. Escote en V profundo, ajuste en cintura. La pieza statement de la temporada.',
    tallas: ['XS', 'S', 'M', 'L'],
    disponibilidad: { XS: true, S: true, M: true, L: false, XL: false },
    colores: ['Borgoña', 'Negro'],
    imagenes: [
      'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&h=1200',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=1200',
      'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&h=1200'
    ],
    destacado: true
  },
  {
    id: 'noche-5',
    nombre: 'Blusa Seda',
    linea: 'noche',
    precio: 235000,
    descripcion: 'Blusa en seda natural. Cuello lazo, manga larga con puño francés. Elegancia discreta.',
    tallas: ['XS', 'S', 'M', 'L', 'XL'],
    disponibilidad: { XS: true, S: true, M: true, L: true, XL: true },
    colores: ['Marfil', 'Negro'],
    imagenes: [
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&h=1200',
      'https://images.unsplash.com/photo-1624206112918-f140f087f9b5?w=800&h=1200'
    ],
    destacado: false
  },
  {
    id: 'noche-6',
    nombre: 'Falda Midi Plisada',
    linea: 'noche',
    precio: 198000,
    descripcion: 'Falda midi con plisado permanente. Cintura alta elástica. Movimiento y sofisticación.',
    tallas: ['XS', 'S', 'M', 'L', 'XL'],
    disponibilidad: { XS: true, S: true, M: true, L: true, XL: false },
    colores: ['Champagne', 'Negro', 'Azul noche'],
    imagenes: [
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&h=1200',
      'https://images.unsplash.com/photo-1590330297626-d7aff25a0431?w=800&h=1200'
    ],
    destacado: false
  },
  {
    id: 'noche-7',
    nombre: 'Conjunto Cocktail',
    linea: 'noche',
    precio: 285000,
    descripcion: 'Conjunto de dos piezas: crop top estructurado + falda midi ajustada. Tejido jacquard con textura.',
    tallas: ['S', 'M', 'L'],
    disponibilidad: { XS: false, S: true, M: true, L: true, XL: false },
    colores: ['Negro', 'Plata'],
    imagenes: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1200',
      'https://images.unsplash.com/photo-1562137369-1a1a0bc66744?w=800&h=1200',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1200'
    ],
    destacado: true
  },
  {
    id: 'noche-8',
    nombre: 'Blazer Satinado',
    linea: 'noche',
    precio: 268000,
    descripcion: 'Blazer oversize en satén con solapa de pico. Un solo botón. Llévalo con pantalón o como vestido.',
    tallas: ['S', 'M', 'L', 'XL'],
    disponibilidad: { XS: false, S: true, M: true, L: true, XL: true },
    colores: ['Negro', 'Champagne'],
    imagenes: [
      'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800&h=1200',
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&h=1200'
    ],
    destacado: false
  },

  // VELOUR CO. (7 productos - 25%)
  {
    id: 'co-1',
    nombre: 'Sweater Merino',
    linea: 'co',
    precio: 185000,
    descripcion: 'Sweater en lana merino. Cuello redondo, fit relajado. Cómodo sin perder estructura. Ideal para videollamadas.',
    tallas: ['XS', 'S', 'M', 'L', 'XL'],
    disponibilidad: { XS: true, S: true, M: true, L: true, XL: true },
    colores: ['Camel', 'Gris', 'Verde oliva'],
    imagenes: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&h=1200',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=1200'
    ],
    destacado: true
  },
  {
    id: 'co-2',
    nombre: 'Jogger Premium',
    linea: 'co',
    precio: 165000,
    descripcion: 'Jogger en french terry de algodón. Pretina con cordón, bolsillos laterales. Cómodo pero se ve bien en una reunión.',
    tallas: ['XS', 'S', 'M', 'L', 'XL'],
    disponibilidad: { XS: true, S: true, M: true, L: true, XL: true },
    colores: ['Negro', 'Gris', 'Beige'],
    imagenes: [
      'https://images.unsplash.com/photo-1594633313593-bab3db0f4e1f?w=800&h=1200',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=1200'
    ],
    destacado: false
  },
  {
    id: 'co-3',
    nombre: 'Cardigan Largo',
    linea: 'co',
    precio: 198000,
    descripcion: 'Cardigan largo sin botones. Bolsillos laterales, corte suelto. La pieza comodín del trabajo remoto.',
    tallas: ['S', 'M', 'L', 'XL'],
    disponibilidad: { XS: false, S: true, M: true, L: true, XL: true },
    colores: ['Camel', 'Negro', 'Gris'],
    imagenes: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1200',
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&h=1200'
    ],
    destacado: true
  },
  {
    id: 'co-4',
    nombre: 'Camisa Popelina Suave',
    linea: 'co',
    precio: 155000,
    descripcion: 'Camisa en popelina con stretch. Corte recto, manga larga. Profesional de cintura para arriba, cómoda abajo.',
    tallas: ['XS', 'S', 'M', 'L', 'XL'],
    disponibilidad: { XS: true, S: true, M: true, L: false, XL: true },
    colores: ['Blanco', 'Azul claro', 'Gris'],
    imagenes: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=1200',
      'https://images.unsplash.com/photo-1624206112918-f140f087f9b5?w=800&h=1200'
    ],
    destacado: false
  },
  {
    id: 'co-5',
    nombre: 'Mono Jumper',
    linea: 'co',
    precio: 178000,
    descripcion: 'Mono jumper en mezcla de algodón. Tirantes anchos, bolsillos laterales, cintura elástica. Un outfit en una pieza.',
    tallas: ['XS', 'S', 'M', 'L'],
    disponibilidad: { XS: true, S: true, M: true, L: true, XL: false },
    colores: ['Negro', 'Tierra', 'Gris oscuro'],
    imagenes: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1200',
      'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&h=1200',
      'https://images.unsplash.com/photo-1564257975821-b280f74e9df9?w=800&h=1200'
    ],
    destacado: false
  },
  {
    id: 'co-6',
    nombre: 'Vestido Hoodie',
    linea: 'co',
    precio: 145000,
    descripcion: 'Vestido midi con capucha en algodón felpa. Manga larga, bolsillo canguro. Comodidad máxima con estilo.',
    tallas: ['XS', 'S', 'M', 'L', 'XL'],
    disponibilidad: { XS: true, S: true, M: true, L: true, XL: true },
    colores: ['Gris', 'Negro', 'Camel'],
    imagenes: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=1200',
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&h=1200'
    ],
    destacado: false
  },
  {
    id: 'co-7',
    nombre: 'Set Loungewear',
    linea: 'co',
    precio: 195000,
    descripcion: 'Set de dos piezas: top cropped + pantalón wide. Jersey suave de algodón. El uniforme perfecto para home office.',
    tallas: ['S', 'M', 'L', 'XL'],
    disponibilidad: { XS: false, S: true, M: true, L: true, XL: true },
    colores: ['Beige', 'Gris melange', 'Café'],
    imagenes: [
      'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&h=1200',
      'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=800&h=1200'
    ],
    destacado: true
  },

  // VELOUR EDIT (3 productos - 10%, colecciones limitadas)
  {
    id: 'edit-1',
    nombre: 'Edit #8: Vestido Asimétrico',
    linea: 'edit',
    precio: 265000,
    descripcion: 'Vestido midi con corte asimétrico. Un hombro descubierto, drapeado lateral. Solo 20 piezas. Cuando se acaban, se acaban.',
    tallas: ['S', 'M', 'L'],
    disponibilidad: { XS: false, S: true, M: false, L: true, XL: false },
    colores: ['Negro'],
    imagenes: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&h=1200',
      'https://images.unsplash.com/photo-1605763240000-58bddd6a6b68?w=800&h=1200',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1200'
    ],
    destacado: true,
    esLimitado: true,
    unidadesRestantes: 7
  },
  {
    id: 'edit-2',
    nombre: 'Edit #8: Top Estructurado',
    linea: 'edit',
    precio: 215000,
    descripcion: 'Top corset con estructura interna. Escote corazón, cierre posterior. Pieza de colección limitada.',
    tallas: ['XS', 'S', 'M', 'L'],
    disponibilidad: { XS: false, S: true, M: true, L: false, XL: false },
    colores: ['Marfil'],
    imagenes: [
      'https://images.unsplash.com/photo-1544957992-20514f595d6f?w=800&h=1200',
      'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=800&h=1200'
    ],
    destacado: true,
    esLimitado: true,
    unidadesRestantes: 3
  },
  {
    id: 'edit-3',
    nombre: 'Edit #8: Pantalón Escultura',
    linea: 'edit',
    precio: 245000,
    descripcion: 'Pantalón de tiro ultra alto con pinzas frontales. Pierna recta. Diseñado para crear silueta. Edición limitada.',
    tallas: ['S', 'M', 'L', 'XL'],
    disponibilidad: { XS: false, S: true, M: true, L: true, XL: false },
    colores: ['Blanco roto'],
    imagenes: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1200',
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&h=1200'
    ],
    destacado: true,
    esLimitado: true,
    unidadesRestantes: 5
  }
];

// Funciones auxiliares para filtrar productos
// Helper: Obtiene productos desde localStorage si están disponibles, sino usa los del mock
const getProductos = () => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('velour-productos');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error al leer productos de localStorage:', error);
    }
  }
  return productos;
};

export const getProductoById = (id) => {
  const allProductos = getProductos();
  return allProductos.find(p => p.id === id);
};

export const getProductosByLinea = (linea) => {
  const allProductos = getProductos();
  return allProductos.filter(p => p.linea === linea);
};

export const getProductosDestacados = () => {
  const allProductos = getProductos();
  return allProductos.filter(p => p.destacado);
};

export const getProductosEdit = () => {
  const allProductos = getProductos();
  return allProductos.filter(p => p.linea === 'edit');
};

export const filtrarProductos = ({ linea, tallaSeleccionada, precioMin, precioMax }) => {
  const allProductos = getProductos();
  return allProductos.filter(producto => {
    const cumpleLinea = !linea || producto.linea === linea;
    const cumpleTalla = !tallaSeleccionada || producto.tallas.includes(tallaSeleccionada);
    const cumplePrecio = (!precioMin || producto.precio >= precioMin) && 
                         (!precioMax || producto.precio <= precioMax);
    
    return cumpleLinea && cumpleTalla && cumplePrecio;
  });
};
