import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Agent, CartItem } from '../types';

interface CartContextValue {
  items: CartItem[];
  addToCart: (agent: Agent) => void;
  removeFromCart: (agentId: string) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (agent: Agent) => {
    setItems((prev) => {
      if (prev.some((i) => i.agent.id === agent.id)) return prev;
      return [...prev, { agent, quantity: 1 }];
    });
  };

  const removeFromCart = (agentId: string) =>
    setItems((prev) => prev.filter((i) => i.agent.id !== agentId));

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, i) => sum + i.agent.price, 0);
  const itemCount = items.length;

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
