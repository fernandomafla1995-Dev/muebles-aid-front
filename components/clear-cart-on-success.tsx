"use client";

import { useEffect } from "react";
import { useCart } from "@/context/cart-context";

// Cualquier estado a partir de "pagado" en adelante confirma que la compra
// se completó — el carrito debe quedar vacío para que el cliente pueda
// empezar una compra nueva sin ver productos ya comprados.
const ESTADOS_EXITOSOS = [
    "pagado",
    "en_produccion",
    "listo_despacho",
    "enviado",
    "entregado",
];

export function ClearCartOnSuccess({ estado }: { estado: string }) {
    const { clearCart } = useCart();

    useEffect(() => {
        if (ESTADOS_EXITOSOS.includes(estado)) {
            clearCart();
        }
        // Si el estado es pendiente_pago, en_verificacion, cancelado o
        // reembolsado, no hacemos nada — el carrito sigue intacto para
        // que el cliente pueda reintentar la compra.
    }, [estado, clearCart]);

    return null; // no renderiza nada visible, solo ejecuta el efecto
}