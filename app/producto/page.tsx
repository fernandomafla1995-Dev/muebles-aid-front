import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Filter, Slider, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import { Checkbox } from "@/components/ui/checkbox";
import { ProductCard } from "@/components/product-card";

export default function ProductoPage() {
    //en una implementacion real, esto vendria de strapi
    const categories = [
        { name: "Mesas de noche", count: 10 },
        { name: "Cosinas integrales", count: 5 },
        { name: "Armario", count: 10 }

    ];
    const filters = [
        { name: "Tamaño", options: ["Pequeño", "Mediano", "Grande"] },
        { name: "Material", options: ["MDF", "Pino", "Sauce"] },
    ];
    const products = [
        {
            id: 1,
            name: "Mesa de noche basica",
            price: 200.0,
            imageSrc: "/placeholder.svg",
            href: "/producto/Mesa-noche1"
        },
        {
            id: 2,
            name: "Mesa de noche premiun",
            price: 400.0,
            imageSrc: "/placeholder.svg",
            href: "/producto/Mesa-noche-premiun"
        },
        {
            id: 3,
            name: "cosina integral basica",
            price: 1000.0,
            imageSrc: "/placeholder.svg",
            href: "/producto/cocina-integral-b"
        },
        {
            id: 4,
            name: "cosina integral premiun",
            price: 2000.0,
            imageSrc: "/placeholder.svg",
            href: "/producto/cocina-integral-premiun"
        },
        {
            id: 5,
            name: "Armario basico",
            price: 2000.0,
            imageSrc: "/placeholder.svg",
            href: "/producto/armaario-basico"
        },
        {
            id: 6,
            name: "Armario premiun",
            price: 3000.0,
            imageSrc: "/placeholder.svg",
            href: "/producto/armario-premiun"
        },
    ];
    return (
        <main className="flex flex-col min-h-screen">
            {/*Banner de categorias*/}
            <section className="relative h-50 md:h-75">
                <Image
                    src="/productos.png"
                    alt="Banner muebles"
                    fill
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center">
                    <div className="text-center text-whit">
                        <h1 className="text-3xl md:text-5xl font-bold">Muebles</h1>
                        <p className="mt-2 md:mt-4 text-sm max-w-md mx-auto">
                            Descubre todo nuestro catalgo de muebles para tu hogar.
                        </p>
                    </div>
                </div>
            </section>
            {/* Breadcrumb */}
            <div className="container px-4 py-4 md:px-6">
                <nav className="flex text-sm text-gray-500">
                    <Link href="/" className="hover:text-gray-700">
                        Inicio
                    </Link>
                    <ChevronRight className="h-4 w-4 mx-2" />
                    <span className="text-gray-900 font-medium">Productos</span>
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
                                {categories.map((category) => (
                                    <li key={category.name}>
                                        <Link
                                            href={`/producto/${category.name.toLowerCase()}`}
                                            className="flex justify-between hover:text-primary"
                                        >
                                            <span>{category.name}</span>
                                            <span className="text-gray-500">({category.count})</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <Separator className="my-6" />

                            <h2 className="text-lg font-medium mb-4">Filtros</h2>
                            {filters.map((filter) => (
                                <Accordion
                                    key={filter.name}
                                    type="single"
                                    collapsible
                                    className="mb-4"
                                >
                                    <AccordionItem value={filter.name}>
                                        <AccordionTrigger className="text-base font-medium py-2">
                                            {filter.name}
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="space-y-2 pt-1">
                                                {filter.options.map((option) => (
                                                    <div
                                                        key={option}
                                                        className="flex items-center space-x-2"
                                                    >
                                                        <Checkbox id={`${filter.name}-${option}`} />
                                                        <label
                                                            htmlFor={`${filter.name}-${option}`}
                                                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        >
                                                            {option}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            ))}

                            <Button variant="outline" className="w-full mt-4">
                                <SlidersHorizontal className="h-4 w-4 mr-2" />
                                Aplicar filtros
                            </Button>
                        </div>
                    </div>

                    {/* Contenido principal */}
                    <div className="flex-1">
                        {/* Controles del filtrado */}
                        <div className="flex flex-col sm:flex-roww justify-between items-start sm:items-center mb-6 gap-4 ">
                            <div className="flex items-center">
                                <h2 className="text-xl font-bold">Productos</h2>
                                <span className="ml-2 text-sm text-gray-500">
                                    ({products.length}{" "}
                                    {products.length === 1 ? "producto" : "productos"})
                                </span>
                            </div>

                            <div className="flex items-center gap-4 w-full sm-w-auto">
                                {/* Boton de filtros movil*/}
                                <Button variant="outline" size="sm" className="md:hidden flex items-center gap-2 "
                                >
                                    <SlidersHorizontal className="h-4 w-4" />
                                    Filtros
                                </Button>
                                {/* Selector de ordenamiento */}
                                <Select defaultValue="Relevancia">
                                    <SelectTrigger className="w-full sm:w-[180px]">
                                        <SelectValue placeholder="Ordenar por" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="relevancia">Relevancia</SelectItem>
                                        <SelectItem value="precio-asc">Precio Menor a Mayor</SelectItem>
                                        <SelectItem value="precio-desc">Precio de Mayor a Menor</SelectItem>
                                        <SelectItem value="novedades">Novedades</SelectItem>
                                    </SelectContent>
                                </Select>

                                {/* Selector de vista grid/lista */}
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="hidden sm:flex"
                                >
                                    <SlidersHorizontal className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Grid de productos */}
                        <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    name={product.name}
                                    price={product.price}
                                    imageSrc={product.imageSrc}
                                    href={`/producto-${product.id}`}
                                />
                            ))}
                        </div>
                        {/*Paginacion*/}
                        <div className="flex justify- center mt-12">
                            <nav className="flex items-center gap-1">
                                <Button variant="outline" size="icon" disabled>
                                    <ChevronLeft className="h-4 w-4 " />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-primary text-primary-foreground"
                                >
                                    1
                                </Button>
                                <Button variant="outline" size="sm">
                                    2
                                </Button>
                                <Button variant="outline" size="sm">
                                    3
                                </Button>
                                <Button variant="outline" size="icon">
                                    <ChevronRight className="h-4 w-4 "  />
                                </Button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </main >
    )
}