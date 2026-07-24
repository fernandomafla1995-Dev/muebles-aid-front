"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { formatCOP } from "@/lib/format";

export function ProductCard({
    id,
    name,
    price,
    imageSrc,
    href,
}: {
    id: string;
    name: string;
    price: number;
    imageSrc: string;
    href?: string;
}) {
    const { addItem } = useCart();
    const [added, setAdded] = useState(false);

    function handleAddToCart(e: React.MouseEvent) {
        // Evita que el clic en el botón también dispare la navegación
        // del <Link> que envuelve toda la tarjeta
        e.preventDefault();
        e.stopPropagation();

        addItem({ id, name, price, imageSrc, href: href ?? "#" });

        // Feedback visual breve: el ícono cambia a un check por 1.5s
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    }

    const card = (
        <div className="group relative overflow-hidden rounded-lg border">
            <div className="relative aspect-square overflow-hidden">
                <Image
                    src={imageSrc || "/placeholder.svg"}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform group-hover:scale-105"
                />
                <Button
                    size="icon"
                    variant="secondary"
                    onClick={handleAddToCart}
                    className="absolute bottom-2 right-2 h-8 w-8 rounded-full z-20"
                >
                    {added ? (
                        <Check className="h-4 w-4 text-green-600" />
                    ) : (
                        <ShoppingCart className="h-4 w-4" />
                    )}
                    <span className="sr-only">Añadir al carrito</span>
                </Button>
            </div>
            <div className="p-4">
                <h3 className="font-medium">{name}</h3>
                <p className="font-bold mt-1">{formatCOP(price)}</p>
            </div>
        </div>
    );

    if (href) {
        return (
            <Link href={href} className="block">
                {card}
            </Link>
        );
    }

    return card;
}