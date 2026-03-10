export default function sitemap() {
  const baseUrl = 'https://velour-studio.vercel.app'; // Actualizar con la URL real después del deploy

  // Obtener productos para incluir en el sitemap
  // En producción, esto vendría de tu base de datos
  const productos = [
    'vestido-lapiz-clasico',
    'vestido-tubo-negro',
    'blazer-sastre-negro',
    'falda-midi-plisada',
    'camisa-seda-blanca',
    'pantalon-sastre-alto',
    'blusa-escote-v',
    'vestido-abrigo',
    'cardigan-punto-camel',
    'top-lino-beige',
    'bermuda-sastre-lino',
    'conjunto-blazer-pantalon',
    'vestido-lencero-saten',
    'blazer-terciopelo',
    'falda-larga-saten',
    'camisa-transparente',
    'vestido-asimetrico',
    'pantalon-pinzas-terciopelo',
    'body-manga-larga',
    'top-cruzado-saten',
    'vestido-co-lino-natural',
    'camisa-oversize-algodon',
    'pantalon-linen-blend',
    'short-cintura-alta',
    'blusa-espalda-descubierta',
    'vestido-midi-tirantes',
    'cardigan-lino-largo',
    'vestido-edit-8-drapeado',
    'falda-edit-8-asimetrica',
    'top-edit-8-nudo'
  ];

  // URLs estáticas
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/catalogo`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/velour-edit`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sobre-valentina`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // URLs de productos
  const productPages = productos.map((productoId) => ({
    url: `${baseUrl}/producto/${productoId}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // URLs de catálogo por línea
  const lineaPages = [
    {
      url: `${baseUrl}/catalogo?linea=clasica`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/catalogo?linea=noche`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/catalogo?linea=co`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/catalogo?linea=edit`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  return [...staticPages, ...lineaPages, ...productPages];
}
