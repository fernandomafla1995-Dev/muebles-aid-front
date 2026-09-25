import { consultarTransaccionWompi, traducirEstadoWompi } from "@/lib/wompi";
import { actualizarEstadoPedido, getPedidoByReference } from "@/lib/strapi";
import { ClearCartOnSuccess } from "@/components/clear-cart-on-success";
import Link from "next/link";
import {
    CheckCircle,
    Clock,
    XCircle,
    Package,
    Truck,
    ArrowRight,
    AlertTriangle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatCOP } from "@/lib/format";

const ESTADO_INFO: Record<string, { label: string; color: string }> = {
    pendiente_pago: { label: "Pendiente de pago", color: "text-amber-600" },
    en_verificacion: { label: "Verificando tu pago", color: "text-amber-600" },
    pagado: { label: "Pago confirmado", color: "text-green-600" },
    en_produccion: { label: "En producción", color: "text-green-600" },
    listo_despacho: { label: "Listo para despacho", color: "text-green-600" },
    enviado: { label: "Enviado", color: "text-green-600" },
    entregado: { label: "Entregado", color: "text-green-600" },
    cancelado: { label: "Cancelado", color: "text-red-600" },
    reembolsado: { label: "Reembolsado", color: "text-red-600" },
};

const PASOS = ["pagado", "en_produccion", "listo_despacho", "enviado"];
const PASOS_ICONOS = [CheckCircle, Package, Package, Truck];
const PASOS_LABELS = ["Pago confirmado", "En producción", "Listo despacho", "Enviado"];

const ESTADOS_NO_FINALES = ["pendiente_pago", "en_verificacion"];

export default async function ThankYouPage({
    searchParams,
}: {
    searchParams: Promise<{ ref?: string; id?: string }>;
}) {
    const { ref, id } = await searchParams;
    let pedido = ref ? await getPedidoByReference(ref) : null;

    // Si el pedido sigue en un estado no-final y tenemos el id de transacción
    // de Wompi (viene en la URL cuando Wompi redirige tras PSE/Nequi/Bancolombia),
    // consultamos activamente el estado real — esto resuelve el caso donde el
    // webhook aún no ha llegado o tardó más de lo esperado.
    if (pedido && ESTADOS_NO_FINALES.includes(pedido.estado)) {
        const transactionId = id ?? pedido.wompiTransactionId ?? null;

        if (transactionId) {
            const transaccion = await consultarTransaccionWompi(transactionId);
            const nuevoEstado = transaccion ? traducirEstadoWompi(transaccion.status) : null;

            if (nuevoEstado && nuevoEstado !== pedido.estado) {
                await actualizarEstadoPedido(ref!, nuevoEstado, transaccion!.id);
                pedido = await getPedidoByReference(ref!); // releer el estado ya actualizado
            }
        }
    }

    // No encontramos el pedido (referencia inválida, o aún no se creó del todo)
    if (!pedido) {
        return (
            <main className="flex flex-col min-h-screen">
                <div className="container px-4 py-12 md:px-6 max-w-2xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-4">
                        <AlertTriangle className="h-8 w-8 text-amber-600" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">
                        No pudimos confirmar tu pedido
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Si realizaste un pago, no te preocupes — puede que esté
                        procesándose todavía. Revisa el estado desde tu cuenta o
                        contáctanos si tienes dudas.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild>
                            <Link href="/mi-cuenta/pedidos">Ver mis pedidos</Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/">Volver al inicio</Link>
                        </Button>
                    </div>
                </div>
            </main>
        );
    }

    const estadoInfo = ESTADO_INFO[pedido.estado] ?? {
        label: pedido.estado,
        color: "text-gray-600",
    };
    const esRechazado = pedido.estado === "cancelado" || pedido.estado === "reembolsado";
    const esPendiente = pedido.estado === "pendiente_pago" || pedido.estado === "en_verificacion";
    const pasoActualIndex = PASOS.indexOf(pedido.estado);

    const fechaPedido = new Date(pedido.createdAt).toLocaleDateString("es-CO", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <main className="flex flex-col min-h-screen">
            <ClearCartOnSuccess estado={pedido.estado} />
            <div className="container px-4 py-12 md:px-6 max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <div
                        className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${esRechazado ? "bg-red-100" : esPendiente ? "bg-amber-100" : "bg-green-100"
                            }`}
                    >
                        {esRechazado ? (
                            <XCircle className="h-8 w-8 text-red-600" />
                        ) : esPendiente ? (
                            <Clock className="h-8 w-8 text-amber-600" />
                        ) : (
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        )}
                    </div>
                    <h1 className="text-3xl font-bold mb-2">
                        {esRechazado
                            ? "Tu pedido no se completó"
                            : esPendiente
                                ? "Estamos confirmando tu pago"
                                : "¡Gracias por tu compra!"}
                    </h1>
                    <p className="text-gray-600">
                        {esPendiente
                            ? "Esto puede tardar unos minutos. Actualiza esta página en breve para ver el estado más reciente."
                            : esRechazado
                                ? "Si crees que esto es un error, contáctanos con tu número de referencia."
                                : "Tu pedido ha sido recibido y está siendo procesado."}
                    </p>
                </div>

                <div className="border rounded-lg overflow-hidden mb-8">
                    <div className="bg-gray-50 p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <h2 className="text-sm font-medium text-gray-500 mb-1">
                                    Número de pedido
                                </h2>
                                <p className="font-medium">
                                    {pedido.wompiReference ?? pedido.documentId}
                                </p>
                            </div>
                            <div>
                                <h2 className="text-sm font-medium text-gray-500 mb-1">
                                    Fecha del pedido
                                </h2>
                                <p className="font-medium">{fechaPedido}</p>
                            </div>
                            <div>
                                <h2 className="text-sm font-medium text-gray-500 mb-1">
                                    Estado actual
                                </h2>
                                <p className={`font-medium ${estadoInfo.color}`}>
                                    {estadoInfo.label}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <h2 className="text-lg font-medium mb-4">Detalles del pedido</h2>

                        <div className="space-y-4 mb-6">
                            {pedido.items.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="flex-1">
                                        <h3 className="font-medium">{item.nombreProducto}</h3>
                                        <p className="text-sm text-gray-500">
                                            Cantidad: {item.cantidad}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">
                                            {formatCOP(item.precioUnitario * item.cantidad)}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {formatCOP(item.precioUnitario)} por unidad
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Separator />

                        <div className="space-y-2 py-4">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Subtotal</span>
                                <span>{formatCOP(pedido.subtotal)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Envío</span>
                                <span>{pedido.envio === 0 ? "Gratis" : formatCOP(pedido.envio)}</span>
                            </div>
                            <div className="flex justify-between font-medium text-lg pt-2">
                                <span>Total</span>
                                <span>{formatCOP(pedido.total)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {pasoActualIndex >= 0 && (
                    <div className="border rounded-lg p-6 mb-8">
                        <h2 className="text-lg font-medium mb-6">Estado del pedido</h2>
                        <div className="relative">
                            <div className="absolute top-5 left-5 right-5 h-0.5 bg-gray-200">
                                <div
                                    className="absolute top-0 left-0 h-0.5 bg-green-500"
                                    style={{
                                        width: `${(pasoActualIndex / (PASOS.length - 1)) * 100}%`,
                                    }}
                                />
                            </div>
                            <div className="grid grid-cols-4 relative">
                                {PASOS_LABELS.map((label, i) => {
                                    const Icon = PASOS_ICONOS[i];
                                    return (
                                        <div className="text-center" key={label}>
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 relative z-10 ${i <= pasoActualIndex
                                                        ? "bg-green-500 text-white"
                                                        : "bg-gray-200 text-gray-500"
                                                    }`}
                                            >
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <h3 className="font-medium text-sm">{label}</h3>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild>
                        <Link href="/mi-cuenta/pedidos">Ver mis pedidos</Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/">
                            Continuar comprando
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </main>
    );
}