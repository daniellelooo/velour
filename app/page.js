import Link from 'next/link';
import Image from 'next/image';
import { lineas } from './data/lineas';
import { getProductosDestacados, getProductosEdit } from './lib/productos';
import ProductCard from './components/ProductCard';

export default function Home() {
  const productosDestacados = getProductosDestacados().slice(0, 4);
  const productosEdit = getProductosEdit();

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-neutral-900">
        {/* Imagen de fondo */}
        <div className="absolute inset-0">
          <Image
            src="https://placehold.co/1920x1080/1a1a1a/808080.png?text=VELOUR+Fashion"
            alt="Fashion background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            unoptimized
          />
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-white mb-6 drop-shadow-lg">
            No somos <span className="italic">fast fashion</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/95 mb-8 max-w-2xl mx-auto font-light drop-shadow-md">
            Cada prenda tiene una historia y un proceso. Diseño y producción local en Medellín.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/catalogo"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-velour-black hover:bg-neutral-100 transition-colors text-sm uppercase tracking-wider font-medium shadow-lg"
            >
              Explorar Catálogo
            </Link>
            <Link
              href="/velour-edit"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-velour-black hover:bg-neutral-100 transition-colors text-sm uppercase tracking-wider font-medium shadow-lg"
            >
              Velour Edit
            </Link>
          </div>
        </div>
      </section>

      {/* Sección: Las 4 Líneas de Producto */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-velour-black mb-4">
            Nuestras Líneas
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Cuatro colecciones diseñadas para diferentes momentos de tu vida
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {lineas.map((linea) => (
            <Link
              key={linea.id}
              href={`/catalogo?linea=${linea.slug}`}
              className="group relative overflow-hidden bg-neutral-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-[4/5] bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center">
                <div className="text-center p-8">
                  <div 
                    className="w-24 h-24 rounded-full mx-auto mb-6 opacity-30"
                    style={{ backgroundColor: linea.color }}
                  />
                  <h3 className="text-2xl font-light text-velour-black mb-2">
                    {linea.nombre}
                  </h3>
                  <p className="text-sm text-neutral-600 mb-4">
                    {linea.descripcion}
                  </p>
                  <p className="text-sm font-medium text-neutral-800">
                    {linea.rangoPrecios}
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 bg-velour-black/0 group-hover:bg-velour-black/5 transition-colors" />
              <div className="absolute bottom-6 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-sm uppercase tracking-wider text-velour-black font-medium">
                  Ver colección →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Sección: Velour Edit - Urgencia y FOMO */}
      <section className="py-20 bg-velour-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              Velour Edit
            </h2>
            <p className="text-xl md:text-2xl font-light mb-4 text-neutral-300">
              20 piezas. Cuando se acaban, se acaban.
            </p>
            <p className="text-lg text-neutral-400 mb-8">
              Colecciones limitadas cada 6 semanas. Diseño exclusivo, producción mínima. 
              Si algo te fascina, no esperes.
            </p>
            
            {productosEdit.length > 0 && (
              <div className="mb-8">
                <p className="text-sm uppercase tracking-wider text-neutral-500 mb-2">
                  Colección actual
                </p>
                <p className="text-3xl font-light mb-6">
                  Edit #{productosEdit[0].nombre.match(/#(\d+)/)?.[1] || '8'}
                </p>
                <div className="flex justify-center gap-6 text-sm">
                  {productosEdit.map((producto) => (
                    <div key={producto.id} className="text-center">
                      <p className="text-neutral-400">{producto.nombre.split(': ')[1]}</p>
                      <p className="text-white font-medium">
                        {producto.unidadesRestantes} unidades
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/velour-edit"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-velour-black hover:bg-neutral-100 transition-colors text-sm uppercase tracking-wider font-medium"
              >
                Ver Edit Actual
              </Link>
              <Link
                href="/velour-edit#lista-espera"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-velour-black transition-colors text-sm uppercase tracking-wider font-medium"
              >
                Lista de Espera
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Productos Destacados */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-velour-black mb-4">
            Piezas Destacadas
          </h2>
          <p className="text-lg text-neutral-600">
            Lo que nuestras clientas están eligiendo ahora
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productosDestacados.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/catalogo"
            className="inline-flex items-center justify-center px-8 py-4 bg-velour-black text-white hover:bg-velour-charcoal transition-colors text-sm uppercase tracking-wider font-medium"
          >
            Ver Todo el Catálogo
          </Link>
        </div>
      </section>

      {/* Sección: Sobre Velour - Preview */}
      <section className="py-20 bg-velour-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/5] bg-neutral-200 overflow-hidden relative">
              <Image
                src="https://placehold.co/800x1000/e5e5e5/404040.png?text=Valentina+Designer"
                alt="Diseñadora trabajando"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
              />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-light text-velour-black mb-6">
                Diseñado por Valentina
              </h2>
              <p className="text-lg text-neutral-700 mb-6 leading-relaxed">
                Hace 2 años renuncié a mi trabajo en una marca de moda masiva para crear 
                ropa que realmente me gustara diseñar. Sin seguir tendencias, sin producción 
                en masa, sin comprometer la calidad por velocidad.
              </p>
              <p className="text-lg text-neutral-700 mb-8 leading-relaxed">
                Velour es el resultado de esa decisión. Cada prenda se diseña en nuestro 
                studio en Laureles, se produce localmente con telas que escojo personalmente 
                en el Clúster Textil de Medellín.
              </p>
              <Link
                href="/sobre-valentina"
                className="inline-flex items-center text-velour-black hover:text-neutral-600 transition-colors font-medium"
              >
                Conoce la historia completa
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final: Visita el Studio */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-light text-velour-black mb-6">
          Visita nuestro studio en Laureles
        </h2>
        <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
          ¿Quieres ver las piezas en persona? Agenda una visita a nuestro local. 
          Te asesoramos personalmente y puedes probarte todo lo que quieras.
        </p>
        <Link
          href="/contacto"
          className="inline-flex items-center justify-center px-8 py-4 bg-velour-black text-white hover:bg-velour-charcoal transition-colors text-sm uppercase tracking-wider font-medium"
        >
          Agendar Visita
        </Link>
      </section>
    </div>
  );
}
