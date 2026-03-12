"use client";

/**
 * Modal de confirmación estilizado — reemplaza window.confirm().
 * 
 * Uso:
 *   const [modalConfig, setModalConfig] = useState(null);
 * 
 *   // Para abrir:
 *   setModalConfig({
 *     titulo: '¿Eliminar producto?',
 *     mensaje: 'Esta acción no se puede deshacer.',
 *     textoCancelar: 'Cancelar',       // opcional
 *     textoConfirmar: 'Eliminar',      // opcional
 *     peligroso: true,                 // opcional — botón confirmar en burgundy
 *     onConfirmar: () => { ... },
 *   });
 * 
 *   // En el JSX:
 *   {modalConfig && (
 *     <ModalConfirmacion
 *       {...modalConfig}
 *       onCancelar={() => setModalConfig(null)}
 *     />
 *   )}
 */

export default function ModalConfirmacion({
  titulo,
  mensaje,
  textoCancelar = "Cancelar",
  textoConfirmar = "Confirmar",
  peligroso = false,
  onConfirmar,
  onCancelar,
}) {
  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-velour-black/50 backdrop-blur-sm"
      onClick={onCancelar}
    >
      <div
        className="bg-white w-full max-w-sm p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-confirmacion-titulo"
      >
        {/* Título */}
        <h2
          id="modal-confirmacion-titulo"
          className="text-lg font-light text-velour-black mb-3 tracking-wide"
        >
          {titulo}
        </h2>

        {/* Mensaje */}
        {mensaje && (
          <p className="text-sm text-neutral-500 mb-8 leading-relaxed">
            {mensaje}
          </p>
        )}

        {/* Botones */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancelar}
            className="px-5 py-2.5 text-sm font-light text-velour-black border border-neutral-200 hover:border-velour-black transition-colors tracking-wide"
          >
            {textoCancelar}
          </button>
          <button
            onClick={() => {
              onConfirmar();
              onCancelar();
            }}
            className={`px-5 py-2.5 text-sm font-light text-white transition-colors tracking-wide ${
              peligroso
                ? "bg-velour-burgundy hover:bg-velour-burgundy/90"
                : "bg-velour-black hover:bg-velour-charcoal"
            }`}
          >
            {textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
}
