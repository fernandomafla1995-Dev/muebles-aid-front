import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getProductBySlug, getStrapiImageUrl } from "@/lib/strapi";

export default async function ProductoDetallePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    const formattedPrice = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
    }).format(product.price);

    const formattedOriginalPrice = product.originalPrice
        ? new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP",
              minimumFractionDigits: 0,
          }).format(product.originalPrice)
        : null;

    return (
        <main className="flex flex-col min-h-screen">
            {/* Breadcrumb */}
            <div className="container px-4 py-4 md:px-6">
                <nav className="flex text-sm text-gray-500">
                    <Link href="/" className="hover:text-gray-700">
                        Inicio
                    </Link>
                    <ChevronRight className="h-4 w-4 mx-2" />
                    <Link href="/productos" className="hover:text-gray-700">
                        Productos
                    </Link>
                    <ChevronRight className="h-4 w-4 mx-2" />
                    <span className="text-gray-900 font-medium">{product.name}</span>
                </nav>
            </div>

            <div className="container px-4 py-8 md:px-6">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Imagen del producto */}
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                        <Image
                            src={getStrapiImageUrl(product.image, "large")}
                            alt={product.name}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Información del producto */}
                    <div>
                        <p className="text-sm text-gray-500 mb-2">
                            {product.category?.name}
                        </p>
                        <h1 className="text-2xl md:text-3xl font-bold mb-4">
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-2xl font-bold">{formattedPrice}</span>
                            {formattedOriginalPrice && (
                                <span className="text-lg text-gray-400 line-through">
                                    {formattedOriginalPrice}
                                </span>
                            )}
                        </div>

                        <p className="text-gray-600 mb-6">{product.description}</p>

                        {product.colors?.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-sm font-medium mb-2">Color</h3>
                                <div className="flex gap-2">
                                    {product.colors.map((color) => (
                                        <span
                                            key={color}
                                            className="px-3 py-1 border rounded-md text-sm"
                                        >
                                            {color}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <p className="text-sm text-gray-500 mb-6">
                            {product.stock > 0
                                ? `${product.stock} unidades disponibles`
                                : "Agotado"}
                        </p>

                        <Separator className="mb-6" />

                        <Button className="w-full" disabled={product.stock === 0}>
                            Añadir al carrito
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}