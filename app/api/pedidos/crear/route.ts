import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import crypto from "crypto";
import { crearPedidoPendiente } from "@/lib/strapi";

export async function POST(req: NextRequest) {
    console.log("SECRETO cargado:", JSON.stringify(process.env.WOMPI_INTEGRITY_SECRET));
    console.log("LONGITUD:", process.env.WOMPI_INTEGRITY_SECRET?.length);
    // 1. Verificar sesión — nunca confiar en un clerkUserId que venga del body
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const user = await currentUser();
    const email = user?.emailAddresses?.[0]?.emailAddress ?? "";

    try {
        const body = await req.json();
        const { items, subtotal, envio, total, direccionEnvio } = body;

        // 2. Crear el pedido en Strapi con estado pendiente_pago
        const pedido = await crearPedidoPendiente({
            clerkUserId: userId,
            email,
            items,
            subtotal,
            envio,
            total,
            direccionEnvio,
        });

        // 3. Calcular datos para el Widget de Wompi
        const reference = pedido.documentId;
        const amountInCents = Math.round(total * 100);
        const currency = "COP";
        const integritySecret = process.env.WOMPI_INTEGRITY_SECRET!;

        // Firma = SHA256(referencia + monto + moneda + secreto)
        const signature = crypto
            .createHash("sha256")
            .update(`${reference}${amountInCents}${currency}${integritySecret}`)
            .digest("hex");

        return NextResponse.json({
            reference,
            amountInCents,
            currency,
            signature,
            publicKey: process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY,
        });
    } catch (error) {
        console.error("Error creando pedido:", error);
        return NextResponse.json(
            { error: "No se pudo crear el pedido" },
            { status: 500 },
        );
    }
}