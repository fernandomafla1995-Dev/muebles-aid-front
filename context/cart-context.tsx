"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";

export interface CartItem {
    id: string; // documentId del producto, o `${documentId}-${color}` si tiene color
    name: string;
    price: number;
    imageSrc: string;
    href: string;
    quantity: number;
    color?: string;
    stock?: number; // máximo disponible — si no se pasa, no se limita
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = "muebles-aid-cart";

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                setItems(JSON.parse(stored));
            } catch {
                // si el JSON guardado está corrupto, simplemente empieza vacío
            }
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        }
    }, [items, isLoaded]);

    function addItem(newItem: Omit<CartItem, "quantity">, quantity = 1) {
        setItems((prev) => {
            const existing = prev.find((i) => i.id === newItem.id);
            if (existing) {
                const maxQty = existing.stock ?? Infinity;
                const nuevaCantidad = Math.min(
                    existing.quantity + quantity,
                    maxQty,
                );
                return prev.map((i) =>
                    i.id === newItem.id ? { ...i, quantity: nuevaCantidad } : i,
                );
            }
            const maxQty = newItem.stock ?? Infinity;
            return [...prev, { ...newItem, quantity: Math.min(quantity, maxQty) }];
        });
    }

    function removeItem(id: string) {
        setItems((prev) => prev.filter((i) => i.id !== id));
    }

    function updateQuantity(id: string, quantity: number) {
        if (quantity < 1) return;
        setItems((prev) =>
            prev.map((i) => {
                if (i.id !== id) return i;
                const maxQty = i.stock ?? Infinity;
                return { ...i, quantity: Math.min(quantity, maxQty) };
            }),
        );
    }

    function clearCart() {
        setItems([]);
    }

    return (
        <CartContext.Provider
            value={{ items, addItem, removeItem, updateQuantity, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart debe usarse dentro de un <CartProvider>");
    }
    return context;
}