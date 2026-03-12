import Image from 'next/image';

export const metadata = {
  title: 'Sobre Valentina',
  description: 'Conoce la historia de Valentina Ríos, la diseñadora detrás de Velour Studio. Un proyecto de moda femenina de autor nacido en Laureles, Medellín.',
  openGraph: {
    title: 'Sobre Valentina | Velour Studio',
    description: 'La historia detrás de Velour Studio y la filosofía de moda lenta y consciente.',
  },
};

export default function SobreValentinaPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-velour-cream py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-velour-black mb-6">
            Sobre Valentina
          </h1>
          <p className="text-xl text-neutral-600">
            La historia detrás de Velour Studio
          </p>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Sección: El inicio */}
        <div className="mb-16">
          <div className="aspect-[16/9] bg-neutral-200 mb-8 relative overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=675&fit=crop"
              alt="Valentina en su studio de diseño en Laureles, Medellín"
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
              unoptimized
            />
          </div>
          
          <blockquote className="text-2xl font-light text-velour-black mb-8 italic">
            &ldquo;Hace 2 años renuncié para hacer ropa que realmente me gustara diseñar.&rdquo;
          </blockquote>

          <div className="prose prose-lg max-w-none text-neutral-700 space-y-6">
            <p>
              Trabajé 4 años como diseñadora en una marca de moda masiva en Medellín antes de 
              renunciar para montar Velour. Mi frustración principal era que nunca podía diseñar 
              con criterio propio — siempre tenía que seguir tendencias de fast fashion.
            </p>
            
            <p>
              Abrí Velour con $18M COP de ahorros propios, sin crédito ni socios. Solo yo, 
              un local de 45 m² en Laureles, y la convicción de que había una forma mejor 
              de hacer moda.
            </p>
          </div>
        </div>

        {/* Sección: La filosofía */}
        <div className="mb-16 bg-neutral-50 p-8 md:p-12">
          <h2 className="text-3xl font-light text-velour-black mb-6">
            ¿Qué es Velour?
          </h2>
          <div className="space-y-4 text-neutral-700">
            <p className="text-lg">
              Velour no es solo una marca de ropa. Es una declaración de que podemos hacer 
              las cosas diferente:
            </p>
            <ul className="space-y-3 ml-6">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-velour-black flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>No somos fast fashion.</strong> Cada prenda tiene un proceso y una historia.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-velour-black flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>Producción local.</strong> Diseñamos en nuestro studio y producimos en Medellín.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-velour-black flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>Telas de calidad.</strong> Escojo personalmente cada tela en el Clúster Textil.</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-velour-black flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>Atemporal, no tendencias.</strong> Diseñamos piezas que funcionan hoy y en tres años.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-light text-velour-black mb-10 text-center">
            La historia de Velour
          </h2>
          
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-32 text-right">
                <p className="text-sm font-medium text-velour-black">Sep 2023</p>
              </div>
              <div className="flex-1 border-l-2 border-neutral-300 pl-6 pb-8">
                <h3 className="text-lg font-medium text-velour-black mb-2">
                  Apertura del studio
                </h3>
                <p className="text-neutral-600">
                  Inauguración del local físico en Laureles con capital propio. 
                  Primeros días vendiendo a amigas y conocidas.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-32 text-right">
                <p className="text-sm font-medium text-velour-black">Nov 2023</p>
              </div>
              <div className="flex-1 border-l-2 border-neutral-300 pl-6 pb-8">
                <h3 className="text-lg font-medium text-velour-black mb-2">
                  Primeras ventas por Instagram
                </h3>
                <p className="text-neutral-600">
                  Comenzamos a recibir pedidos por DM. Todo 100% gestionado manualmente.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-32 text-right">
                <p className="text-sm font-medium text-velour-black">Jun 2024</p>
              </div>
              <div className="flex-1 border-l-2 border-neutral-300 pl-6 pb-8">
                <h3 className="text-lg font-medium text-velour-black mb-2">
                  Pico de crecimiento orgánico
                </h3>
                <p className="text-neutral-600">
                  Varias microinfluencers empezaron a usar nuestras prendas orgánicamente. 
                  Los seguidores crecieron de 800 a 3.400 en 3 meses.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-32 text-right">
                <p className="text-sm font-medium text-velour-black">Ago 2024</p>
              </div>
              <div className="flex-1 border-l-2 border-neutral-300 pl-6 pb-8">
                <h3 className="text-lg font-medium text-velour-black mb-2">
                  Lanzamiento de Velour Edit
                </h3>
                <p className="text-neutral-600">
                  Primera colección limitada de 20 piezas. Sold out en 48 horas. 
                  Descubrimos que la escasez genera conexión.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-32 text-right">
                <p className="text-sm font-medium text-velour-black">Dic 2024</p>
              </div>
              <div className="flex-1 border-l-2 border-neutral-300 pl-6 pb-8">
                <h3 className="text-lg font-medium text-velour-black mb-2">
                  Mejor mes de ventas
                </h3>
                <p className="text-neutral-600">
                  $23M COP en ventas. Pero también descubrimos que no podíamos seguir 
                  creciendo sin procesos digitales.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-32 text-right">
                <p className="text-sm font-medium text-velour-black">Mar 2026</p>
              </div>
              <div className="flex-1 border-l-2 border-velour-black pl-6">
                <h3 className="text-lg font-medium text-velour-black mb-2">
                  Velour 2.0
                </h3>
                <p className="text-neutral-600">
                  Lanzamiento de nuestra web y automatizaciones con EternalGrowth. 
                  El próximo capítulo comienza ahora.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cierre */}
        <div className="text-center py-12 border-t border-neutral-200">
          <p className="text-lg text-neutral-700 mb-6 max-w-2xl mx-auto">
            Todavía me sorprende cuando alguien me escribe para decirme que encontró en 
            Velour lo que no había encontrado en ningún otro lugar. Ese es el mejor indicador 
            de que estamos haciendo las cosas bien.
          </p>
          <p className="text-base text-neutral-500">
            — Valentina Ríos, Fundadora
          </p>
        </div>
      </div>
    </div>
  );
}
