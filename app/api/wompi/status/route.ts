import { NextRequest, NextResponse } from "next/server";
import { consultarTransaccionWompi, traducirEstadoWompi } from "@/lib/wompi";
import { actualizarEstadoPedido } from "@/lib/strapi";

export async function GET(req: NextRequest) {
    const transactionId = req.nextUrl.searchParams.get("id");

    if (!transactionId) {
        return NextResponse.json({ error: "Falta el id de transacción" }, { status: 400 });
    }

    const transaccion = await consultarTransaccionWompi(transactionId);

    if (!transaccion) {
        return NextResponse.json({ error: "No se pudo consultar la transacción" }, { status: 502 });
    }

    const nuevoEstado = traducirEstadoWompi(transaccion.status);

    // Si ya tenemos un estado final, aprovechamos para sincronizar Strapi aquí mismo
    if (nuevoEstado) {
        await actualizarEstadoPedido(transaccion.reference, nuevoEstado, transaccion.id);
    }

    return NextResponse.json({
        reference: transaccion.reference,
        wompiStatus: transaccion.status,
        estadoPedido: nuevoEstado,
    });
}