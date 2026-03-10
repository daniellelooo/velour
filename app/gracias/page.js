import Link from 'next/link';

export default function GraciasPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Icono de éxito */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-velour-black mb-4">
            ¡Gracias por tu pedido!
          </h1>
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
            Hemos enviado los detalles de tu pedido por WhatsApp. 
            Valentina y su equipo se pondrán en contacto contigo para coordinar el pago y la entrega.
          </p>
        </div>

        {/* Información adicional */}
        <div className="bg-white p-8 shadow-sm mb-8">
          <h2 className="text-xl font-medium text-velour-black mb-4">¿Qué sigue?</h2>
          <div className="space-y-4 text-left text-neutral-600">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-velour-cream rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-medium text-velour-black">1</span>
              </div>
              <p>
                <span className="font-medium text-neutral-900">Confirmación:</span> Recibirás un mensaje de WhatsApp confirmando tu pedido en los próximos minutos.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-velour-cream rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-medium text-velour-black">2</span>
              </div>
              <p>
                <span className="font-medium text-neutral-900">Coordinación:</span> Te enviaremos las opciones de pago y los tiempos de entrega según tu ubicación.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-velour-cream rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-medium text-velour-black">3</span>
              </div>
              <p>
                <span className="font-medium text-neutral-900">Entrega:</span> Tu pedido será empacado con cuidado y enviado o coordinado para recogida en nuestro studio.
              </p>
            </div>
          </div>
        </div>

        {/* Contacto directo */}
        <div className="bg-neutral-50 p-6 rounded mb-8">
          <p className="text-sm text-neutral-600">
            ¿Necesitas ayuda inmediata? Escríbenos por WhatsApp:
          </p>
          <a 
            href="https://wa.me/573001234567" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 text-green-600 hover:text-green-700 font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            +57 300 123 4567
          </a>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-velour-black text-white hover:bg-velour-charcoal transition-colors uppercase tracking-wider text-sm font-medium"
          >
            Volver al inicio
          </Link>
          <Link
            href="/catalogo"
            className="inline-block px-8 py-3 border-2 border-velour-black text-velour-black hover:bg-velour-black hover:text-white transition-colors uppercase tracking-wider text-sm font-medium"
          >
            Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
