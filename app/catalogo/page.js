import { Suspense } from 'react';
import CatalogoContent from './CatalogoContent';

export const metadata = {
  title: 'Catálogo',
  description: 'Explora la colección completa de Velour Studio. Blusas, vestidos, blazers y prendas de temporada diseñadas y producidas localmente en Medellín.',
  openGraph: {
    title: 'Catálogo | Velour Studio',
    description: 'Moda femenina de autor en Medellín. Colección completa disponible.',
  },
};

export default function CatalogoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-velour-black"></div>
          <p className="mt-4 text-neutral-600">Cargando catálogo...</p>
        </div>
      </div>
    }>
      <CatalogoContent />
    </Suspense>
  );
}
