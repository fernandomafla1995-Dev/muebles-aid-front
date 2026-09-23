import crypto from "crypto";

interface WompiEventPayload {
    event: string;
    data: {
        transaction: {
            id: string;
            reference: string;
            status: string;
            amount_in_cents: number;
        };
    };
    signature: {
        properties: string[];
        checksum: string;
    };
    timestamp: number;
}

export interface WompiTransaction {
    id: string;
    reference: string;
    status: string;
    amountInCents: number;
}

// Extrae el valor de un campo anidado, ej: "transaction.status" -> payload.data.transaction.status
function getNestedValue(obj: any, path: string): any {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

// Verifica que el evento realmente venga de Wompi, recalculando el checksum
// con el mismo algoritmo que ellos usan y comparándolo contra el que enviaron.
export function verificarFirmaEvento(payload: WompiEventPayload, eventsSecret: string): boolean {
    const { properties, checksum } = payload.signature;

    const valoresConcatenados = properties
        .map((prop) => getNestedValue(payload.data, prop))
        .join("");

    const cadenaCompleta = `${valoresConcatenados}${payload.timestamp}${eventsSecret}`;

    const checksumCalculado = crypto
        .createHash("sha256")
        .update(cadenaCompleta)
        .digest("hex")
        .toUpperCase();

    return checksumCalculado === checksum.toUpperCase();
}

// Traduce el status de Wompi a nuestro estado interno de Pedido.
// Única fuente de verdad de esta traducción — la usan tanto el webhook
// como la confirmación activa al regresar del banco.
export function traducirEstadoWompi(status: string): string | null {
    switch (status) {
        case "APPROVED":
            return "pagado";
        case "DECLINED":
        case "ERROR":
        case "VOIDED":
            return "cancelado";
        case "PENDING":
            return "en_verificacion";
        default:
            return null;
    }
}

// Consulta el estado real de una transacción directo en la API de Wompi,
// usando la llave privada. SOLO se llama desde el servidor (nunca desde
// el navegador) — exponer la llave privada al cliente sería un riesgo serio.
export async function consultarTransaccionWompi(
    transactionId: string,
): Promise<WompiTransaction | null> {
    try {
        const res = await fetch(
            `${process.env.WOMPI_API_URL}/transactions/${transactionId}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY}`,
                },
                cache: "no-store",
            },
        );

        if (!res.ok) {
            console.error(`Error consultando transacción Wompi: ${res.status}`);
            return null;
        }

        const json = await res.json();
        return {
            id: json.data.id,
            reference: json.data.reference,
            status: json.data.status,
            amountInCents: json.data.amount_in_cents,
        };
    } catch (error) {
        console.error("Error al consultar transacción en Wompi:", error);
        return null;
    }
}