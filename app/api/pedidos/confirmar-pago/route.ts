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
                  : null;

        // Si el estado es PENDING (algunos métodos como PSE tardan), no tocamos
        // el pedido — se queda en pendiente_pago hasta que el webhook lo confirme
        if (!nuevoEstado) {
            return NextResponse.json({ ok: true, actualizado: false });
        }

        const actualizado = await actualizarEstadoPedido(reference, nuevoEstado, wompiTransactionId);
        return NextResponse.json({ ok: true, actualizado });
    } catch (error) {
        console.error("Error confirmando pago:", error);
        return NextResponse.json({ error: "No se pudo confirmar el pago" }, { status: 500 });
    }
}