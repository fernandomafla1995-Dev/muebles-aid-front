import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getPedidosByClerkUserId } from "@/lib/strapi";
import { formatCOP } from "@/lib/format";

const ESTADO_LABEL: Record<string, string> = {
    pendiente_pago: "Pendiente de pago",
    pagado: "Pago confirmado",
    en_produccion: "En producción",
    listo_despacho: "Listo para despacho",
    enviado: "Enviado",
    entregado: "Entregado",
    cancelado: "Cancelado",
    reembolsado: "Reembolsado",
};

const ESTADO_COLOR: Record<string, string> = {
    pendiente_pago: "bg-amber-100 text-amber-700",
    pagado: "bg-green-100 text-green-700",
    en_produccion: "bg-blue-100 text-blue-700",
    listo_despacho: "bg-blue-100 text-blue-700",
    enviado: "bg-blue-100 text-blue-700",
    entregado: "bg-green-100 text-green-700",
    cancelado: "bg-red-100 text-red-700",
    reembolsado: "bg-red-100 text-red-700",
};

export default async function MisPedidosPage() {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in?redirect_url=/mi-cuenta/pedidos");
    }

    const pedidos = await getPedidosByClerkUserId(userId);

    return (
        <main className="flex flex-col min-h-screen">
            <div className="container px-4 py-12 md:px-6 max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-8">Mis pedidos</h1>

                {pedidos.length === 0 ? (
                    <div className="text-center py-12 border rounded-lg">
                        <p className="text-gray-500 mb-6">
                            Todavía no tienes pedidos registrados.
                        </p>
                        <Link href="/productos" className="text-sm font-medium underline">
                            Ir a productos
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {pedidos.map((pedido) => (
                            <Link
                                key={pedido.id}
                                href={`/gracias?ref=${pedido.wompiReference ?? pedido.documentId}`}
                                className="block border rounded-lg p-6 hover:border-gray-400 transition-colors"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div>
                                        <p className="font-medium">
                                            Pedido #{pedido.wompiReference ?? pedido.documentId}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {new Date(pedido.createdAt).toLocaleDateString("es-CO", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {pedido.items.length}{" "}
                                            {pedido.items.length === 1 ? "producto" : "productos"}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span
                                            className={`text-xs font-medium px-3 py-1 rounded-full ${
                                                ESTADO_COLOR[pedido.estado] ?? "bg-gray-100 text-gray-700"
                                            }`}
                                        >
                                            {ESTADO_LABEL[pedido.estado] ?? pedido.estado}
                                        </span>
                                        <span className="font-medium">{formatCOP(pedido.total)}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}