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
      '/images/productos/clasica-1-1.jpg',
      '/images/productos/clasica-1-2.jpg',
      '/images/productos/clasica-1-3.jpg'
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
      '/images/productos/clasica-2-1.jpg',
      '/images/productos/clasica-2-2.jpg'
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
      '/images/productos/clasica-3-1.jpg',
      '/images/productos/clasica-3-2.jpg',
      '/images/productos/clasica-3-3.jpg'
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
      '/images/productos/clasica-4-1.jpg',
      '/images/productos/clasica-4-2.jpg'
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
      '/images/productos/clasica-5-1.jpg',
      '/images/productos/clasica-5-2.jpg'
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
      '/images/productos/clasica-6-1.jpg',
      '/images/productos/clasica-6-2.jpg'
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
      '/images/productos/clasica-7-1.jpg',
      '/images/productos/clasica-7-2.jpg'
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
      '/images/productos/clasica-8-1.jpg',
      '/images/productos/clasica-8-2.jpg',
      '/images/productos/clasica-8-3.jpg'
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
      '/images/productos/clasica-9-1.jpg',
      '/images/productos/clasica-9-2.jpg'
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
      '/images/productos/clasica-10-1.jpg',
      '/images/productos/clasica-10-2.jpg'
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
      '/images/productos/clasica-11-1.jpg',
      '/images/productos/clasica-11-2.jpg'
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
      '/images/productos/clasica-12-1.jpg',
      '/images/productos/clasica-12-2.jpg'
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
      '/images/productos/noche-1-1.jpg',
      '/images/productos/noche-1-2.jpg',
      '/images/productos/noche-1-3.jpg'
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
      '/images/productos/noche-2-1.jpg',
      '/images/productos/noche-2-2.jpg'
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
      '/images/productos/noche-3-1.jpg',
      '/images/productos/noche-3-2.jpg'
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
      '/images/productos/noche-4-1.jpg',
      '/images/productos/noche-4-2.jpg',
      '/images/productos/noche-4-3.jpg'
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
      '/images/productos/noche-5-1.jpg',
      '/images/productos/noche-5-2.jpg'
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
      '/images/productos/noche-6-1.jpg',
      '/images/productos/noche-6-2.jpg'
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
      '/images/productos/noche-7-1.jpg',
      '/images/productos/noche-7-2.jpg',
      '/images/productos/noche-7-3.jpg'
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
      '/images/productos/noche-8-1.jpg',
      '/images/productos/noche-8-2.jpg'
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
      '/images/productos/co-1-1.jpg',
      '/images/productos/co-1-2.jpg'
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
      '/images/productos/co-2-1.jpg',
      '/images/productos/co-2-2.jpg'
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
      '/images/productos/co-3-1.jpg',
      '/images/productos/co-3-2.jpg'
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
      '/images/productos/co-4-1.jpg',
      '/images/productos/co-4-2.jpg'
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
      '/images/productos/co-5-1.jpg',
      '/images/productos/co-5-2.jpg',
      '/images/productos/co-5-3.jpg'
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
      '/images/productos/co-6-1.jpg',
      '/images/productos/co-6-2.jpg'
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
      '/images/productos/co-7-1.jpg',
      '/images/productos/co-7-2.jpg'
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
      '/images/productos/edit-1-1.jpg',
      '/images/productos/edit-1-2.jpg',
      '/images/productos/edit-1-3.jpg'
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
      '/images/productos/edit-2-1.jpg',
      '/images/productos/edit-2-2.jpg'
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
      '/images/productos/edit-3-1.jpg',
      '/images/productos/edit-3-2.jpg'
    ],
    destacado: true,
    esLimitado: true,
    unidadesRestantes: 5
  }
];

// Funciones auxiliares para filtrar productos
export const getProductoById = (id) => {
  return productos.find(p => p.id === id);
};

export const getProductosByLinea = (linea) => {
  return productos.filter(p => p.linea === linea);
};

export const getProductosDestacados = () => {
  return productos.filter(p => p.destacado);
};

export const getProductosEdit = () => {
  return productos.filter(p => p.linea === 'edit');
};

export const filtrarProductos = ({ linea, tallaSeleccionada, precioMin, precioMax }) => {
  return productos.filter(producto => {
    const cumpleLinea = !linea || producto.linea === linea;
    const cumpleTalla = !tallaSeleccionada || producto.tallas.includes(tallaSeleccionada);
    const cumplePrecio = (!precioMin || producto.precio >= precioMin) && 
                         (!precioMax || producto.precio <= precioMax);
    
    return cumpleLinea && cumpleTalla && cumplePrecio;
  });
};
