"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type CartItem = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
};

type CartContextType = {
    items: CartItem[];
    addItem: (item: Omit<CartItem, "quantity">) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    const [isLoaded, setIsLoaded] = useState(false);

    // Load cart from local storage on mount. This has to run in an effect (not a
    // lazy initializer) so the server and first client render match.
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem("cart");
            if (savedCart) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setItems(JSON.parse(savedCart));
            }
        } catch {
            // Corrupt or blocked storage: start with an empty cart
        }
        setIsLoaded(true);
    }, []);

    // Save cart to local storage whenever it changes (after the initial load,
    // so the empty initial state never overwrites a saved cart)
    useEffect(() => {
        if (!isLoaded) return;
        try {
            localStorage.setItem("cart", JSON.stringify(items));
        } catch {
            // Storage unavailable (private mode, quota): cart stays in memory
        }
    }, [items, isLoaded]);

    const addItem = (newItem: Omit<CartItem, "quantity">) => {
        setItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === newItem.id);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === newItem.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevItems, { ...newItem, quantity: 1 }];
        });
    };

    const removeItem = (id: string) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setItems([]);
    };

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, clearCart, total }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
