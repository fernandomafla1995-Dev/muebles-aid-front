const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

// --- Tipos adaptados a la respuesta real de Strapi v5 ---

export interface StrapiImageFormat {
    url: string;
    width: number;
    height: number;
}

export interface StrapiImage {
    id: number;
    url: string;
    formats?: {
        thumbnail?: StrapiImageFormat;
        small?: StrapiImageFormat;
        medium?: StrapiImageFormat;
        large?: StrapiImageFormat;
    };
}

export interface StrapiCategory {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    description: string;
}

export interface StrapiProduct {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    originalPrice: number | null;
    colors: string[];
    stock: number;
    featured: boolean;
    image: StrapiImage | null;
    images: StrapiImage[] | null;
    category: StrapiCategory;
}

interface StrapiListResponse<T> {
    data: T[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

interface StrapiSingleResponse<T> {
    data: T;
}

// Helper genérico de fetch
async function strapiFetch<T>(path: string): Promise<T> {
    const res = await fetch(`${STRAPI_URL}/api${path}`, {
        cache: "no-store", // en desarrollo; ajusta a revalidate en producción
    });

    if (!res.ok) {
        throw new Error(`Error al consultar Strapi (${path}): ${res.status}`);
    }

    return res.json();
}

// Trae TODOS los productos (pageSize alto para evitar la paginación por defecto de 25)
export async function getProducts(): Promise<StrapiProduct[]> {
    const json = await strapiFetch<StrapiListResponse<StrapiProduct>>(
        "/products?populate=*&pagination[pageSize]=100",
    );
    return json.data;
}

// Trae un producto individual por su slug
export async function getProductBySlug(slug: string): Promise<StrapiProduct | null> {
    const json = await strapiFetch<StrapiListResponse<StrapiProduct>>(
        `/products?filters[slug][$eq]=${slug}&populate=*`,
    );
    return json.data[0] ?? null;
}

// Trae todas las categorías
export async function getCategories(): Promise<StrapiCategory[]> {
    const json = await strapiFetch<StrapiListResponse<StrapiCategory>>(
        "/categories?pagination[pageSize]=100",
    );
    return json.data;
}

// Arma la URL completa de una imagen (Strapi devuelve rutas relativas)
export function getStrapiImageUrl(
    image: StrapiImage | null | undefined,
    size: "thumbnail" | "small" | "medium" | "large" | "original" = "medium",
): string {
    if (!image) return "/placeholder.svg";

    if (size !== "original" && image.formats?.[size]) {
        return `${STRAPI_URL}${image.formats[size]!.url}`;
    }

    return `${STRAPI_URL}${image.url}`;
}