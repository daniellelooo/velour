'use client';

import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { formatearPrecioConSimbolo, getNombreLinea } from '../lib/utils';
import ProductForm from './components/ProductForm';
import ModalConfirmacion from '../components/ModalConfirmacion';
import { useToast } from '../context/ToastContext';

export default function AdminPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [productos, setProductos] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [filter, setFilter] = useState('all');
  const [modalEliminar, setModalEliminar] = useState(null); // { productId }
  const { mostrarToast } = useToast();

  useEffect(() => {
    // Cargar productos cuando el usuario está autenticado
    if (session) {
      loadProductos();
    }
  }, [session]);

  const loadProductos = async () => {
    try {
      // Cargar productos desde localStorage o usar los del mock
      const savedProducts = localStorage.getItem('velour-productos');
      if (savedProducts) {
        setProductos(JSON.parse(savedProducts));
      } else {
        // Importar productos iniciales
        const { productos: mockProductos } = await import('../lib/productos');
        setProductos(mockProductos);
        localStorage.setItem('velour-productos', JSON.stringify(mockProductos));
      }
    } catch (error) {
      console.error('Error cargando productos:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setLoginError('Email o contraseña incorrectos');
    } else {
      // La sesión se actualizará automáticamente
      loadProductos();
    }
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/admin' });
  };

  const handleDeleteProduct = (productId) => {
    setModalEliminar({ productId });
  };

  const confirmarEliminarProducto = () => {
    const { productId } = modalEliminar;
    const updatedProducts = productos.filter(p => p.id !== productId);
    setProductos(updatedProducts);
    localStorage.setItem('velour-productos', JSON.stringify(updatedProducts));
    mostrarToast('Producto eliminado', 'exito');
  };

  const handleToggleDestacado = (productId) => {
    const updatedProducts = productos.map(p => 
      p.id === productId ? { ...p, destacado: !p.destacado } : p
    );
    setProductos(updatedProducts);
    localStorage.setItem('velour-productos', JSON.stringify(updatedProducts));
  };

  const handleSaveProduct = (productData) => {
    let updatedProducts;
    
    if (editingProduct) {
      // Actualizar producto existente
      updatedProducts = productos.map(p => 
        p.id === editingProduct.id ? productData : p
      );
    } else {
      // Añadir nuevo producto
      updatedProducts = [...productos, productData];
    }
    
    setProductos(updatedProducts);
    localStorage.setItem('velour-productos', JSON.stringify(updatedProducts));
    setEditingProduct(null);
    setShowAddModal(false);
    
    // Mensaje de éxito
    mostrarToast(editingProduct ? 'Producto actualizado correctamente' : 'Producto creado correctamente', 'exito');
  };

  const filteredProducts = productos.filter(p => {
    if (filter === 'all') return true;
    return p.linea === filter;
  });

  // Pantalla de carga mientras se verifica la sesión
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-velour-black mx-auto mb-4"></div>
          <p className="text-neutral-600">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  // Pantalla de login
  if (!session) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-8 rounded shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-light mb-2">VELOUR STUDIO</h1>
            <p className="text-neutral-600">Panel de Administración</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-300 focus:border-velour-black focus:outline-none"
                placeholder="admin@velourstudio.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-300 focus:border-velour-black focus:outline-none"
                placeholder="Ingresa la contraseña"
                required
              />
            </div>

            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm">
                {loginError}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full py-3 bg-velour-black text-white hover:bg-velour-charcoal transition-colors uppercase tracking-wider text-sm font-medium"
            >
              Ingresar
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-neutral-600 hover:text-velour-black">
              ← Volver al sitio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Panel de administración
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-light">Panel de Administración</h1>
              <p className="text-sm text-neutral-600">
                Hola, {session.user.name || session.user.email}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-sm text-neutral-600 hover:text-velour-black"
              >
                Ver sitio
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm border border-neutral-300 hover:border-velour-black transition-colors"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Barra de acciones */}
        <div className="bg-white p-6 mb-6 rounded shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-lg font-medium mb-1">Productos ({productos.length})</h2>
              <p className="text-sm text-neutral-600">Gestiona tu catálogo completo</p>
            </div>

            <div className="flex items-center gap-3">
              {/* Filtro por línea */}
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-neutral-300 focus:border-velour-black focus:outline-none text-sm"
              >
                <option value="all">Todas las líneas</option>
                <option value="clasica">Clásica</option>
                <option value="noche">Noche</option>
                <option value="co">Co.</option>
                <option value="edit">Edit</option>
              </select>

              <button
                onClick={() => setShowAddModal(true)}
                className="px-6 py-2 bg-velour-black text-white hover:bg-velour-charcoal transition-colors text-sm uppercase tracking-wider font-medium"
              >
                + Nuevo Producto
              </button>
            </div>
          </div>
        </div>

        {/* Lista de productos */}
        <div className="bg-white rounded shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-neutral-100 border-b border-neutral-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                  Línea
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                  Tallas
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-700 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-neutral-700 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredProducts.map((producto) => (
                <tr key={producto.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-20 bg-neutral-200 flex-shrink-0 relative overflow-hidden">
                        {producto.imagenes && producto.imagenes[0] ? (
                          <Image
                            src={producto.imagenes[0]}
                            alt={producto.nombre}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-neutral-300 to-neutral-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900">{producto.nombre}</p>
                        <p className="text-sm text-neutral-600 line-clamp-1">{producto.descripcion}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 bg-neutral-200 text-neutral-700 text-xs rounded">
                      {getNombreLinea(producto.linea)}
                    </span>
                  </td>
                  <td className="px-4 py-4 font-medium">
                    {formatearPrecioConSimbolo(producto.precio)}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-1">
                      {producto.tallas.map((talla) => {
                        const disponible = producto.disponibilidad?.[talla];
                        return (
                          <span
                            key={talla}
                            className={`text-xs px-1.5 py-0.5 ${
                              disponible
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700 line-through'
                            }`}
                          >
                            {talla}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1">
                      {producto.destacado && (
                        <span className="text-xs text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded inline-flex items-center gap-1 w-fit">
                          ⭐ Destacado
                        </span>
                      )}
                      {producto.esLimitado && (
                        <span className="text-xs text-purple-700 bg-purple-100 px-2 py-0.5 rounded w-fit">
                          Edición Limitada
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleToggleDestacado(producto.id)}
                        className="p-2 hover:bg-neutral-100 rounded transition-colors"
                        title={producto.destacado ? 'Quitar de destacados' : 'Marcar como destacado'}
                      >
                        <svg className="w-4 h-4" fill={producto.destacado ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      </button>
                      
                      <button
                        onClick={() => setEditingProduct(producto)}
                        className="p-2 hover:bg-neutral-100 rounded transition-colors"
                        title="Editar producto"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>

                      <button
                        onClick={() => handleDeleteProduct(producto.id)}
                        className="p-2 hover:bg-red-100 text-red-600 rounded transition-colors"
                        title="Eliminar producto"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12 text-neutral-500">
              No hay productos en esta categoría
            </div>
          )}
        </div>
      </div>

      {/* Modal de formulario para crear/editar productos */}
      {(editingProduct || showAddModal) && (
        <ProductForm
          producto={editingProduct}
          onSave={handleSaveProduct}
          onCancel={() => {
            setEditingProduct(null);
            setShowAddModal(false);
          }}
        />
      )}

      {/* Modal de confirmación para eliminar producto */}
      {modalEliminar && (
        <ModalConfirmacion
          titulo="¿Eliminar producto?"
          mensaje="Esta acción no se puede deshacer."
          textoConfirmar="Eliminar"
          peligroso={true}
          onConfirmar={confirmarEliminarProducto}
          onCancelar={() => setModalEliminar(null)}
        />
      )}
    </div>
  );
}
