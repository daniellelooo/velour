"use client";

import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";

const ToastContext = createContext();

/**
 * Tipos de toast disponibles.
 * - 'exito'   → fondo oscuro velour-black, ícono check
 * - 'error'   → fondo burgundy, ícono X
 * - 'aviso'   → fondo taupe, ícono !
 */

let contadorId = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const mostrarToast = useCallback((mensaje, tipo = "exito", duracion = 3500) => {
    const id = ++contadorId;
    setToasts((prev) => [...prev, { id, mensaje, tipo, saliendo: false }]);

    // Iniciar animación de salida antes de remover
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, saliendo: true } : t))
      );
    }, duracion);

    // Remover del DOM
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duracion + 400);
  }, []);

  const cerrarToast = useCallback((id) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, saliendo: true } : t))
    );
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 400);
  }, []);

  return (
    <ToastContext.Provider value={{ mostrarToast }}>
      {children}
      <ContenedorToasts toasts={toasts} onCerrar={cerrarToast} />
    </ToastContext.Provider>
  );
}

function ContenedorToasts({ toasts, onCerrar }) {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] flex flex-col items-center gap-3 pointer-events-none"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onCerrar={onCerrar} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onCerrar }) {
  const estilosTipo = {
    exito: {
      contenedor: "bg-velour-black text-white",
      icono: (
        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
    error: {
      contenedor: "bg-velour-burgundy text-white",
      icono: (
        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
    },
    aviso: {
      contenedor: "bg-velour-taupe text-white",
      icono: (
        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z" />
        </svg>
      ),
    },
  };

  const { contenedor, icono } = estilosTipo[toast.tipo] || estilosTipo.exito;

  return (
    <div
      className={`
        pointer-events-auto flex items-center gap-3 px-5 py-3.5
        shadow-lg min-w-[260px] max-w-sm
        transition-all duration-400
        ${toast.saliendo
          ? "opacity-0 translate-y-2 scale-95"
          : "opacity-100 translate-y-0 scale-100"
        }
        ${contenedor}
      `}
      role="status"
    >
      {icono}
      <span className="text-sm font-light tracking-wide leading-snug flex-1">
        {toast.mensaje}
      </span>
      <button
        onClick={() => onCerrar(toast.id)}
        aria-label="Cerrar notificación"
        className="ml-2 opacity-60 hover:opacity-100 transition-opacity flex-shrink-0"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

/**
 * Hook para mostrar toasts desde cualquier componente cliente.
 * Uso: const { mostrarToast } = useToast();
 *      mostrarToast('Mensaje', 'exito' | 'error' | 'aviso');
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast debe usarse dentro de un ToastProvider");
  }
  return context;
}
