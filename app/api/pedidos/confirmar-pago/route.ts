import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { actualizarEstadoPedido } from "@/lib/strapi";

export async function POST(req: NextRequest) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    try {
        const { reference, wompiStatus, wompiTransactionId } = await req.json();

        if (!reference || !wompiStatus) {
            return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
        }

        const nuevoEstado =
            wompiStatus === "APPROVED"
                ? "pagado"
                : wompiStatus === "DECLINED" || wompiStatus === "ERROR" || wompiStatus === "VOIDED"
                    ? "cancelado"
                    : wompiStatus === "PENDING"
                        ? "en_verificacion"
                        : null;

        // null solo ocurre si Wompi nos manda un status que no reconocemos —
        // en ese caso preferimos no tocar el pedido antes que asumir algo incorrecto
        if (!nuevoEstado) {
            console.warn(`Status de Wompi no reconocido: ${wompiStatus}`);
            return NextResponse.json({ ok: true, actualizado: false });
        }

        const actualizado = await actualizarEstadoPedido(reference, nuevoEstado, wompiTransactionId);
        return NextResponse.json({ ok: true, actualizado });
    } catch (error) {
        console.error("Error confirmando pago:", error);
        return NextResponse.json({ error: "No se pudo confirmar el pago" }, { status: 500 });
    }
}