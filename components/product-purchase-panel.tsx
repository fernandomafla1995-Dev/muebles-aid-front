"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";

interface VarianteColor {
    slug: string;
    color: string | null;
    stock: number;
}

interface ProductPurchasePanelProps {
    id: string;
    name: string;
    price: number;
    imageSrc: string;
    href: string;
    stock: number;
    color: string | null;
    variantes: VarianteColor[]; // otros colores del mismo grupoVariante
}

export function ProductPurchasePanel({
    id,
    name,
    price,
    imageSrc,
    href,
    stock,
    color,
    variantes,
}: ProductPurchasePanelProps) {
    const { addItem } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    const sinStock = stock === 0;
    const tieneVariantes = variantes.length > 0 || !!color;

    function handleAddToCart() {
        addItem(
            {
                id,
                name,
                price,
                imageSrc,
                href,
                color: color ?? undefined,
                stock,
            },
            quantity,
        );

        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    }

    return (
        <div>
            {tieneVariantes && (
                <div className="mb-6">
                    <h3 className="text-sm font-medium mb-2">Color</h3>
                    <div className="flex gap-2 flex-wrap">
                        {/* Color actual (no es link, ya estás en su página) */}
                        {color && (
                            <span className="px-3 py-1 border rounded-md text-sm border-black bg-black text-white">
                                {color}
                            </span>
                        )}
                        {/* Otros colores disponibles */}
                        {variantes.map((v) => (
                            <Link
                                key={v.slug}
                                href={`/producto/${v.slug}`}
                                className={`px-3 py-1 border rounded-md text-sm transition-colors ${
                                    v.stock === 0
                                        ? "opacity-40 pointer-events-none"
                                        : "hover:border-gray-400"
                                }`}
                            >
                                {v.color}
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {!sinStock && (
                <div className="mb-6">
                    <h3 className="text-sm font-medium mb-2">Cantidad</h3>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-9 w-9 rounded-full"
                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                            disabled={quantity <= 1}
                        >
                            <Minus className="h-3 w-3" />
                            <span className="sr-only">Reducir cantidad</span>
                        </Button>
                        <span className="w-8 text-center">{quantity}</span>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-9 w-9 rounded-full"
                            onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
                            disabled={quantity >= stock}
                        >
                            <Plus className="h-3 w-3" />
                            <span className="sr-only">Aumentar cantidad</span>
                        </Button>
                    </div>
                </div>
            )}

            <Button className="w-full" disabled={sinStock} onClick={handleAddToCart}>
                {added ? (
                    <>
                        <Check className="h-4 w-4 mr-2" />
                        Añadido
                    </>
                ) : sinStock ? (
                    "Agotado"
                ) : (
                    "Añadir al carrito"
                )}
            </Button>
        </div>
    );
}