"use client";

import { createContext, useContext, useState, useEffect, startTransition } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Cargar wishlist desde localStorage después de la hidratación
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const guardada = localStorage.getItem("velour-wishlist");
        if (guardada) {
          const parsed = JSON.parse(guardada);
          startTransition(() => {
            setWishlist(parsed);
          });
        }
      } catch (e) {
        console.error("Error al cargar la wishlist:", e);
      }
      startTransition(() => {
        setIsHydrated(true);
      });
    }
  }, []);

  // Guardar wishlist en localStorage cuando cambie
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem("velour-wishlist", JSON.stringify(wishlist));
      } catch (e) {
        console.error("Error al guardar la wishlist:", e);
      }
    }
  }, [wishlist, isHydrated]);

  /**
   * Agregar un producto a la wishlist
   * @param {object} producto - Objeto del producto
   */
  const agregarAWishlist = (producto) => {
    setWishlist((prev) => {
      const yaExiste = prev.some((p) => p.id === producto.id);
      if (yaExiste) return prev;
      return [...prev, producto];
    });
  };

  /**
   * Quitar un producto de la wishlist por ID
   * @param {string} productoId - ID del producto a quitar
   */
  const quitarDeWishlist = (productoId) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productoId));
  };

  /**
   * Alternar un producto en la wishlist (agregar si no está, quitar si está)
   * @param {object} producto - Objeto del producto
   */
  const toggleWishlist = (producto) => {
    setWishlist((prev) => {
      const yaExiste = prev.some((p) => p.id === producto.id);
      if (yaExiste) return prev.filter((p) => p.id !== producto.id);
      return [...prev, producto];
    });
  };

  /**
   * Verificar si un producto está en la wishlist
   * @param {string} productoId - ID del producto
   * @returns {boolean}
   */
  const estaEnWishlist = (productoId) => {
    return wishlist.some((p) => p.id === productoId);
  };

  /**
   * Obtener el número de productos en la wishlist
   * @returns {number}
   */
  const getWishlistCount = () => wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isHydrated,
        agregarAWishlist,
        quitarDeWishlist,
        toggleWishlist,
        estaEnWishlist,
        getWishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist debe usarse dentro de un WishlistProvider");
  }
  return context;
}
