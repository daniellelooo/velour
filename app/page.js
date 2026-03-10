import Link from 'next/link';
import { lineas } from './data/lineas';
import { getProductosDestacados, getProductosEdit } from './lib/productos';

export default function Home() {
  const productosDestacados = getProductosDestacados().slice(0, 4);
  const productosEdit = getProductosEdit();

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center bg-velour-cream">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-velour-cream/50" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-velour-black mb-6">
            No somos <span className="italic">fast fashion</span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-700 mb-8 max-w-2xl mx-auto font-light">
            Cada prenda tiene una historia y un proceso. Diseño y producción local en Medellín.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/catalogo"
              className="inline-flex items-center justify-center px-8 py-4 bg-velour-black text-white hover:bg-velour-charcoal transition-colors text-sm uppercase tracking-wider font-medium"
            >
              Explorar Catálogo
            </Link>
            <Link
              href="/velour-edit"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-velour-black text-velour-black hover:bg-velour-black hover:text-white transition-colors text-sm uppercase tracking-wider font-medium"
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
            <Link
              key={producto.id}
              href={`/producto/${producto.id}`}
              className="group"
            >
              <div className="aspect-[3/4] bg-neutral-200 mb-4 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-neutral-300 to-neutral-400 group-hover:scale-105 transition-transform duration-300" />
              </div>
              <h3 className="text-lg font-medium text-velour-black mb-1 group-hover:text-neutral-600 transition-colors">
                {producto.nombre}
              </h3>
              <p className="text-sm text-neutral-500 mb-2">
                {producto.linea === 'clasica' && 'Velour Clásica'}
                {producto.linea === 'noche' && 'Velour Noche'}
                {producto.linea === 'co' && 'Velour Co.'}
                {producto.linea === 'edit' && 'Velour Edit'}
              </p>
              <p className="text-lg font-medium text-velour-black">
                ${producto.precio.toLocaleString('es-CO')}
              </p>
            </Link>
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
            <div className="aspect-[4/5] bg-gradient-to-br from-neutral-300 to-neutral-400" />
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
