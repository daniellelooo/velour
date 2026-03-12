export default function sitemap() {
  const baseUrl = 'https://velour-studio.vercel.app'; // Actualizar con la URL real después del deploy

  // IDs reales de los 30 productos del catálogo (app/lib/productos.js)
  const productos = [
    // Velour Clásica
    'clasica-1',
    'clasica-2',
    'clasica-3',
    'clasica-4',
    'clasica-5',
    'clasica-6',
    'clasica-7',
    'clasica-8',
    'clasica-9',
    'clasica-10',
    'clasica-11',
    'clasica-12',
    // Velour Noche
    'noche-1',
    'noche-2',
    'noche-3',
    'noche-4',
    'noche-5',
    'noche-6',
    'noche-7',
    'noche-8',
    // Velour Co.
    'co-1',
    'co-2',
    'co-3',
    'co-4',
    'co-5',
    'co-6',
    'co-7',
    // Velour Edit
    'edit-1',
    'edit-2',
    'edit-3'
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
