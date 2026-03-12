import { getProductoById } from '../../lib/productos';
import { getNombreLinea } from '../../lib/utils';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const producto = getProductoById(id);

  if (!producto) {
    return {
      title: 'Producto no encontrado',
    };
  }

  const nombreLinea = getNombreLinea(producto.linea);
  const descripcionSEO = `${producto.nombre} de ${nombreLinea}. ${producto.descripcion.slice(0, 120)}...`;

  return {
    title: producto.nombre,
    description: descripcionSEO,
    openGraph: {
      title: `${producto.nombre} | Velour Studio`,
      description: descripcionSEO,
      images: producto.imagenes?.[0]
        ? [{ url: producto.imagenes[0], width: 800, height: 1067, alt: producto.nombre }]
        : [],
    },
  };
}

export default function ProductoLayout({ children }) {
  return children;
}
