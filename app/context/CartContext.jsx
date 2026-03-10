"use client";

import { createContext, useContext, useState, useEffect, startTransition } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Cargar carrito desde localStorage después de la hidratación
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("velour-cart");
      if (savedCart) {
        try {
          const parsed = JSON.parse(savedCart);
          startTransition(() => {
            setCart(parsed);
          });
        } catch (e) {
          console.error("Error al cargar el carrito:", e);
        }
      }
      startTransition(() => {
        setIsHydrated(true);
      });
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    if (cart.length >= 0) {
      localStorage.setItem("velour-cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (producto, talla, cantidad = 1) => {
    setCart((prevCart) => {
      // Verificar si el producto con esa talla ya existe
      const existingItemIndex = prevCart.findIndex(
        (item) => item.producto.id === producto.id && item.talla === talla,
      );

      if (existingItemIndex > -1) {
        // Si existe, incrementar cantidad
        const newCart = [...prevCart];
        newCart[existingItemIndex].cantidad += cantidad;
        return newCart;
      } else {
        // Si no existe, agregar nuevo item
        return [...prevCart, { producto, talla, cantidad }];
      }
    });

    // Abrir el carrito automáticamente
    setIsOpen(true);
  };

  const removeFromCart = (productoId, talla) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.producto.id === productoId && item.talla === talla),
      ),
    );
  };

  const updateQuantity = (productoId, talla, cantidad) => {
    if (cantidad <= 0) {
      removeFromCart(productoId, talla);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.producto.id === productoId && item.talla === talla
          ? { ...item, cantidad }
          : item,
      ),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.cantidad, 0);
  };

  const getCartTotal = () => {
    return cart.reduce(
      (total, item) => total + item.producto.precio * item.cantidad,
      0,
    );
  };

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  const closeCart = () => {
    setIsOpen(false);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        isHydrated,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartCount,
        getCartTotal,
        toggleCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
}
