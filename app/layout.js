import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import CartDrawer from "./components/CartDrawer";
import AuthProvider from "./components/AuthProvider";

export const metadata = {
  title: {
    template: '%s | Velour Studio',
    default: 'Velour Studio - Moda femenina de autor en Medellín',
  },
  description: 'Studio de moda femenina en Medellín. No somos fast fashion. Cada prenda tiene una historia y un proceso. Diseño y producción local, telas de calidad.',
  keywords: ['moda femenina', 'ropa de autor', 'Medellín', 'producción local', 'slow fashion', 'Velour', 'Laureles'],
  authors: [{ name: 'Velour Studio' }],
  creator: 'Valentina Ríos',
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://velour.studio',
    siteName: 'Velour Studio',
    title: 'Velour Studio - Moda femenina de autor en Medellín',
    description: 'No somos fast fashion. Cada prenda tiene una historia y un proceso.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Velour Studio',
      },
    ],
  },
  instagram: {
    handle: '@velour.studio.med',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-CO">
      <body className="antialiased flex flex-col min-h-screen">
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
