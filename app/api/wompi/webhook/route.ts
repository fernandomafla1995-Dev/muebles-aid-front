import { NextRequest, NextResponse } from "next/server";
import { verificarFirmaEvento, traducirEstadoWompi } from "@/lib/wompi";
import { actualizarEstadoPedido } from "@/lib/strapi";

export async function POST(req: NextRequest) {
    const payload = await req.json();

    console.log("Evento recibido de Wompi:", JSON.stringify(payload, null, 2));

    const eventsSecret = process.env.WOMPI_EVENTS_SECRET!;
    const esValido = verificarFirmaEvento(payload, eventsSecret);

    if (!esValido) {
        console.error("Firma de evento inválida — posible mensaje falso");
        return NextResponse.json({ error: "Firma inválida" }, { status: 401 });
    }

    if (payload.event !== "transaction.updated") {
        return NextResponse.json({ ok: true, procesado: false });
    }

    const { reference, status, id: wompiTransactionId } = payload.data.transaction;
    const nuevoEstado = traducirEstadoWompi(status);

    if (!nuevoEstado) {
        console.warn(`Status de Wompi no reconocido en webhook: ${status}`);
        return NextResponse.json({ ok: true, procesado: false });
    }

    const actualizado = await actualizarEstadoPedido(reference, nuevoEstado, wompiTransactionId);
    return NextResponse.json({ ok: true, actualizado });
}