// Import required React functions and types
import { createContext, ReactNode, useContext, useState } from 'react';
import { CartItem } from '../types/CartItem';

// Define the shape of the cart context
interface CartContextType {
  cart: CartItem[]; // List of items in the cart
  addToCart: (item: CartItem) => void; // Function to add/update items in the cart
  removeFromCart: (bookId: number) => void; // Function to remove an item by its bookId
  clearCart: () => void; // Function to clear all items from the cart
}

// Create the context (initially undefined until provided)
const CartContext = createContext<CartContextType | undefined>(undefined);

// Context provider component that wraps parts of the app needing cart access
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]); // Cart state initialized as an empty array

  // Add an item to the cart or update its quantity if it already exists
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((c) => c.bookId === item.bookId);

      if (existingItem) {
        // If the item exists, increase its quantity
        return prevCart.map((c) =>
          c.bookId === item.bookId
            ? { ...c, quantity: c.quantity + item.quantity }
            : c,
        );
      } else {
        // If it's a new item, add it to the cart
        return [...prevCart, item];
      }
    });
  };

  // Remove an item from the cart based on its bookId
  const removeFromCart = (bookId: number) => {
    setCart((prevCart) => prevCart.filter((c) => c.bookId !== bookId));
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart(() => []);
  };

  return (
    // Provide the cart state and functions to the rest of the app
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for easily accessing the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
