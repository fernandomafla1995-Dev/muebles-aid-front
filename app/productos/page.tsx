import Link from "next/link";
import { ChevronRight, X } from "lucide-react";

import { ProductCard } from "@/components/product-card";
import { SortSelect } from "@/components/sort-select";

import { getProducts, getCategories, getStrapiImageUrl } from "@/lib/strapi";

export default async function ProductosPage({
    searchParams,
}: {
    searchParams: Promise<{ categoria?: string; orden?: string }>;
}) {
    const { categoria, orden } = await searchParams;

    const [allProducts, categories] = await Promise.all([
        getProducts(),
        getCategories(),
    ]);

    // Cuenta productos por categoría (sobre el total, no sobre el filtrado)
    const categoriesWithCount = categories.map((category) => ({
        ...category,
        count: allProducts.filter((p) => p.category?.slug === category.slug).length,
    }));

    // 1. Filtra por categoría si viene un parámetro "categoria" en la URL
    const filteredProducts = categoria
        ? allProducts.filter((p) => p.category?.slug === categoria)
        : allProducts;

    // 2. Ordena el resultado ya filtrado según el parámetro "orden"
    const products = [...filteredProducts].sort((a, b) => {
        switch (orden) {
            case "precio-asc":
                return a.price - b.price;
            case "precio-desc":
                return b.price - a.price;
            default:
                // Sin ordenamiento seleccionado: mantiene el orden original
                return 0;
        }
    });

    // Nombre legible de la categoría activa, para mostrarlo en el encabezado
    const activeCategory = categoria
        ? categories.find((c) => c.slug === categoria)
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
                    {activeCategory && (
                        <>
                            <ChevronRight className="h-4 w-4 mx-2" />
                            <span className="text-gray-900 font-medium">
                                {activeCategory.name}
                            </span>
                        </>
                    )}
                </nav>
            </div>

            {/* Contenido principal */}
            <div className="container px-4 py-8 md:px-6">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar filtros */}
                    <div className="hidden md:block w-64 flex-shrink-0">
                        <div className="sticky top-20">
                            <h2 className="text-lg font-medium mb-4">Categorias</h2>
                            <ul className="space-y-2 mb-6">
                                {categoriesWithCount.map((category) => {
                                    const isActive = category.slug === categoria;

                                    const params = new URLSearchParams();
                                    if (!isActive) params.set("categoria", category.slug);
                                    if (orden) params.set("orden", orden);
                                    const query = params.toString();

                                    return (
                                        <li key={category.id}>
                                            <Link
                                                href={`/productos${query ? `?${query}` : ""}`}
                                                className={`flex justify-between hover:text-primary ${
                                                    isActive
                                                        ? "text-primary font-medium"
                                                        : ""
                                                }`}
                                            >
                                                <span>{category.name}</span>
                                                <span className="text-gray-500">
                                                    ({category.count})
                                                </span>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>

                    {/* Listado de productos */}
                    <div className="flex-1">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                            <div className="flex items-center flex-wrap gap-2">
                                <h2 className="text-xl font-bold">
                                    {activeCategory ? activeCategory.name : "Productos"}
                                </h2>
                                <span className="text-sm text-gray-500">
                                    ({products.length}{" "}
                                    {products.length === 1 ? "producto" : "productos"})
                                </span>

                                {activeCategory && (
                                    <Link
                                        href={
                                            orden
                                                ? `/productos?orden=${orden}`
                                                : "/productos"
                                        }
                                        className="flex items-center gap-1 text-xs text-gray-500 border rounded-full px-2 py-1 hover:bg-gray-100"
                                    >
                                        <X className="h-3 w-3" />
                                        Quitar filtro
                                    </Link>
                                )}
                            </div>

                            <SortSelect />
                        </div>

                        {products.length === 0 ? (
                            <p className="text-gray-500 py-12 text-center">
                                No hay productos en esta categoría todavía.
                            </p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        name={product.name}
                                        price={product.price}
                                        imageSrc={getStrapiImageUrl(product.image, "medium")}
                                        href={`/producto/${product.slug}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}