import React, { createContext, useContext, useReducer, useEffect } from "react";
import './Cart.css';

// Create a context for the cart
const CartContext = createContext();

// Reducer function to manage cart state
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingIndex = state.findIndex(
        (item) => item.id === action.payload.id && item.size === action.payload.size
      );

      // If the item exists, update its quantity
      if (existingIndex > -1) {
        const updatedCart = [...state];
        updatedCart[existingIndex].quantity += action.payload.quantity;
        return updatedCart;
      }

      // Otherwise, add the new item
      return [...state, { ...action.payload, quantity: action.payload.quantity || 1 }];
    }

    case "REMOVE_FROM_CART": {
      // Filter out the item matching id and size
      return state.filter(
        (item) =>
          item.id !== action.payload.id ||
          (action.payload.size && item.size !== action.payload.size)
      );
    }

    case "DECREASE_QUANTITY": {
      // Decrease quantity, but don't go below 1
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      );
    }

    case "INCREASE_QUANTITY": {
      // Increase quantity
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    default:
      return state;
  }
};

// CartProvider to wrap the app and provide cart state
export const CartProvider = ({ children }) => {
  const initialState = JSON.parse(localStorage.getItem("cart")) || []; // Initialize from localStorage
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    // Sync cart state with localStorage
    if (cart && Array.isArray(cart)) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
