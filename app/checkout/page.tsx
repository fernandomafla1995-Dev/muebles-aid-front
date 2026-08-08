"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/cart-context";
import { formatCOP } from "@/lib/format";
import { useUser } from "@clerk/nextjs";

declare global {
    interface Window {
        WidgetCheckout: any;
    }
}

interface DatosEnvio {
    nombreCompleto: string;
    telefono: string;
    direccion: string;
    ciudad: string;
    notas: string;
}

export default function CheckoutPage() {
    const { items: cartItems } = useCart();
    const { user, isLoaded, isSignedIn } = useUser();
    const router = useRouter();

    const [datosEnvio, setDatosEnvio] = useState<DatosEnvio>({
        nombreCompleto: "",
        telefono: "",
        direccion: "",
        ciudad: "",
        notas: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [widgetListo, setWidgetListo] = useState(false);

    // Forzar login — si no está autenticado, mandamos a sign-in y regresamos aquí después
    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push("/sign-in?redirect_url=/checkout");
        }
    }, [isLoaded, isSignedIn, router]);

    // Prellenar nombre con la info de Clerk una vez cargue el usuario
    useEffect(() => {
        if (user?.fullName) {
            setDatosEnvio((prev) => ({ ...prev, nombreCompleto: user.fullName ?? "" }));
        }
    }, [user]);

    // Cargar el script del Widget de Wompi una sola vez
    useEffect(() => {
        if (document.getElementById("wompi-widget-script")) {
            setWidgetListo(true);
            return;
        }
        const script = document.createElement("script");
        script.id = "wompi-widget-script";
        script.src = "https://checkout.wompi.co/widget.js";
        script.onload = () => setWidgetListo(true);
        document.body.appendChild(script);
    }, []);

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );
    const shipping = subtotal >= 200000 || subtotal === 0 ? 0 : 15000;
    const total = subtotal + shipping;

    const handleChange = (field: keyof DatosEnvio, value: string) => {
        setDatosEnvio((prev) => ({ ...prev, [field]: value }));
    };

    const formularioValido =
        datosEnvio.nombreCompleto.trim() !== "" &&
        datosEnvio.telefono.trim() !== "" &&
        datosEnvio.direccion.trim() !== "" &&
        datosEnvio.ciudad.trim() !== "";

    const handleProceedToPayment = async () => {
        if (!formularioValido || cartItems.length === 0 || !widgetListo) return;

        setIsSubmitting(true);
        setError(null);

        try {
            // 1. Crear el pedido en Strapi (estado pendiente_pago) y obtener firma
            const res = await fetch("/api/pedidos/crear", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: cartItems.map((item) => ({
                        producto: item.id,
                        nombreProducto: item.name,
                        precioUnitario: item.price,
                        cantidad: item.quantity,
                    })),
                    subtotal,
                    envio: shipping,
                    total,
                    direccionEnvio: datosEnvio,
                }),
            });

            if (!res.ok) {
                throw new Error("No se pudo crear el pedido");
            }

            const { reference, amountInCents, currency, signature, publicKey } =
                await res.json();

            // 2. Abrir el Widget de Wompi con la referencia y firma ya calculadas
            const checkout = new window.WidgetCheckout({
                currency,
                amountInCents,
                reference,
                publicKey,
                signature: { integrity: signature },
                //redirectUrl: `${window.location.origin}/gracias?ref=${reference}`,
            });

            checkout.open((result: any) => {
                setIsSubmitting(false);
                const transaction = result.transaction;

                if (transaction?.status === "APPROVED") {
                    router.push(`/gracias?ref=${reference}`);
                } else {
                    setError(
                        "El pago no se completó. Puedes intentarlo de nuevo.",
                    );
                }
            });
        } catch (err) {
            console.error(err);
            setError("No pudimos procesar tu pedido. Intenta de nuevo.");
            setIsSubmitting(false);
        }
    };

    if (!isLoaded || !isSignedIn) {
        return (
            <main className="flex flex-col min-h-screen items-center justify-center">
                <p className="text-gray-500">Verificando sesión...</p>
            </main>
        );
    }

    if (cartItems.length === 0) {
        return (
            <main className="flex flex-col min-h-screen">
                <div className="container px-4 py-12 md:px-6 text-center">
                    <h1 className="text-2xl font-bold mb-4">
                        No tienes productos en tu carrito
                    </h1>
                    <Button asChild>
                        <Link href="/productos">Ir a productos</Link>
                    </Button>
                </div>
            </main>
        );
    }

    return (
        <main className="flex flex-col min-h-screen">
            <div className="container px-4 py-4 md:px-6">
                <nav className="flex text-sm text-gray-500">
                    <Link href="/" className="hover:text-gray-700">
                        Inicio
                    </Link>
                    <ChevronRight className="h-4 w-4 mx-2" />
                    <Link href="/carrito" className="hover:text-gray-700">
                        Carrito
                    </Link>
                    <ChevronRight className="h-4 w-4 mx-2" />
                    <span className="text-gray-900 font-medium">Checkout</span>
                </nav>
            </div>

            <div className="container px-4 py-8 md:px-6">
                <h1 className="text-2xl font-bold mb-8">Finalizar compra</h1>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                        <div className="border rounded-lg p-6">
                            <h2 className="text-lg font-medium mb-4">
                                Datos de envío
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="nombreCompleto">
                                        Nombre completo
                                    </Label>
                                    <Input
                                        id="nombreCompleto"
                                        value={datosEnvio.nombreCompleto}
                                        onChange={(e) =>
                                            handleChange("nombreCompleto", e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="telefono">Teléfono</Label>
                                    <Input
                                        id="telefono"
                                        value={datosEnvio.telefono}
                                        onChange={(e) =>
                                            handleChange("telefono", e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="direccion">Dirección</Label>
                                    <Input
                                        id="direccion"
                                        value={datosEnvio.direccion}
                                        onChange={(e) =>
                                            handleChange("direccion", e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="ciudad">Ciudad</Label>
                                    <Input
                                        id="ciudad"
                                        value={datosEnvio.ciudad}
                                        onChange={(e) =>
                                            handleChange("ciudad", e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="notas">
                                        Notas de entrega (opcional)
                                    </Label>
                                    <Input
                                        id="notas"
                                        value={datosEnvio.notas}
                                        onChange={(e) =>
                                            handleChange("notas", e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border rounded-lg p-6">
                            <h2 className="text-lg font-medium mb-4">
                                Productos ({cartItems.length})
                            </h2>
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4 items-center">
                                        <Image
                                            src={item.imageSrc || "/placeholder.svg"}
                                            alt={item.name}
                                            width={64}
                                            height={64}
                                            className="rounded-md object-cover w-16 h-16"
                                        />
                                        <div className="flex-1">
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-gray-500">
                                                Cantidad: {item.quantity}
                                            </p>
                                        </div>
                                        <p className="font-medium">
                                            {formatCOP(item.price * item.quantity)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {error && <p className="text-sm text-red-600">{error}</p>}
                    </div>

                    <div className="md:col-span-1">
                        <div className="border rounded-lg p-6 bg-gray-50 sticky top-20">
                            <h2 className="text-lg font-medium mb-4">
                                Resumen del pedido
                            </h2>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span>{formatCOP(subtotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Envío</span>
                                    <span>
                                        {shipping === 0 ? "Gratis" : formatCOP(shipping)}
                                    </span>
                                </div>

                                <Separator />

                                <div className="flex justify-between font-medium text-base pt-2">
                                    <span>Total</span>
                                    <span>{formatCOP(total)}</span>
                                </div>
                            </div>

                            <Button
                                className="w-full mt-6"
                                disabled={!formularioValido || isSubmitting || !widgetListo}
                                onClick={handleProceedToPayment}
                            >
                                {isSubmitting ? "Procesando..." : "Pagar ahora"}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>

                            <div className="mt-6 text-xs text-gray-500">
                                <p>Aceptamos: Tarjetas, PSE, Nequi (vía Wompi)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}