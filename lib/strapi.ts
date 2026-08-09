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

// Single Type "Headre" — configuración global del header
export interface StrapiHeaderConfig {
    id: number;
    documentId: string;
    Logo: StrapiImage | null;
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

// Trae la configuración del header (Single Type "Headre") con el logo
export async function getHeaderConfig(): Promise<{ logoUrl: string | null }> {
    try {
        const json = await strapiFetch<StrapiSingleResponse<StrapiHeaderConfig>>(
            "/headre?populate=Logo",
        );

        const logoUrl = json.data?.Logo
            ? getStrapiImageUrl(json.data.Logo, "original")
            : null;

        return { logoUrl };
    } catch (error) {
        console.error("Error al traer configuración del header desde Strapi:", error);
        return { logoUrl: null };
    }
}

// --- Tipos nuevos ---

export interface StrapiReview {
    id: number;
    documentId: string;
    name: string;
    comment: string;
    rating: number;
}

export interface StrapiHomeConfig {
    id: number;
    documentId: string;
    heroTitle: string;
    heroHighlight: string;
    heroDescription: string;
    heroImage: StrapiImage | null;
    ctaTitle: string;
    ctaDescription: string;
    ctaImage: StrapiImage | null;
}

// Extiende StrapiProduct con los campos nuevos (agrégalos directo a la interfaz StrapiProduct que ya tienes):
// heroPick: boolean;
// spotlight: boolean;
// features: string[] | null;

// --- Funciones nuevas ---

// Productos marcados para las mini-cards del hero
export async function getHeroPickProducts(): Promise<StrapiProduct[]> {
    const json = await strapiFetch<StrapiListResponse<StrapiProduct>>(
        "/products?filters[heroPick][$eq]=true&populate=*&pagination[pageSize]=2",
    );
    return json.data;
}

// Productos destacados para el grid "Soñado por ti, hecho por nosotros"
export async function getFeaturedGridProducts(): Promise<StrapiProduct[]> {
    const json = await strapiFetch<StrapiListResponse<StrapiProduct>>(
        "/products?filters[featured][$eq]=true&populate=*&pagination[pageSize]=3",
    );
    return json.data;
}

// Productos "spotlight" (los bloques FeaturedProduct con bullets)
export async function getSpotlightProducts(): Promise<StrapiProduct[]> {
    const json = await strapiFetch<StrapiListResponse<StrapiProduct>>(
        "/products?filters[spotlight][$eq]=true&populate=*&pagination[pageSize]=2",
    );
    return json.data;
}

// Reseñas de clientes
export async function getReviews(): Promise<StrapiReview[]> {
    const json = await strapiFetch<StrapiListResponse<StrapiReview>>(
        "/reviews?pagination[pageSize]=10",
    );
    return json.data;
}

// Configuración de la página de inicio (Single Type)
export async function getHomeConfig(): Promise<StrapiHomeConfig | null> {
    try {
        const json = await strapiFetch<StrapiSingleResponse<StrapiHomeConfig>>(
            "/inicio?populate=*",
        );
        return json.data;
    } catch (error) {
        console.error("Error al traer configuración de inicio desde Strapi:", error);
        return null;
    }
}

// --- Tipos para Cliente y Pedido ---

export interface ItemPedido {
    producto: number; // id del Product
    nombreProducto: string;
    precioUnitario: number;
    cantidad: number;
}

export interface DatosEnvioPedido {
    nombreCompleto: string;
    telefono: string;
    direccion: string;
    ciudad: string;
    notas?: string;
}

interface CrearPedidoInput {
    clerkUserId: string;
    email: string;
    items: ItemPedido[];
    subtotal: number;
    envio: number;
    total: number;
    direccionEnvio: DatosEnvioPedido;
}

// Busca el Cliente por clerkUserId; si no existe, lo crea
async function buscarOCrearCliente(clerkUserId: string, email: string) {
    const existentes = await strapiFetch<StrapiListResponse<{ id: number; documentId: string }>>(
        `/clientes?filters[clerkUserId][$eq]=${clerkUserId}`,
    );

    if (existentes.data.length > 0) {
        return existentes.data[0];
    }

    const res = await fetch(`${STRAPI_URL}/api/clientes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            data: { clerkUserId, email },
        }),
    });

    if (!res.ok) {
        const errorBody = await res.json().catch(() => null);
        console.error("Detalle del error al crear cliente:", JSON.stringify(errorBody, null, 2));
        throw new Error(
            `No se pudo crear el cliente en Strapi: ${res.status} — ${errorBody?.error?.message ?? "sin detalle"}`,
        );
    }

    const json = await res.json();
    return json.data;
}

// Crea el Pedido en estado pendiente_pago y devuelve su documentId (usado como referencia de Wompi)
export async function crearPedidoPendiente(input: CrearPedidoInput) {
    const cliente = await buscarOCrearCliente(input.clerkUserId, input.email);

    const payload = {
        data: {
            cliente: cliente.id,
            items: input.items,
            subtotal: input.subtotal,
            envio: input.envio,
            total: input.total,
            estado: "pendiente_pago",
            direccionEnvio: input.direccionEnvio,
            historialEstados: [
                {
                    estado: "pendiente_pago",
                    fecha: new Date().toISOString(),
                    nota: "Pedido creado, esperando confirmación de pago",
                },
            ],
        },
    };

    // Log temporal para depuración — lo quitamos una vez resuelto el 400
    console.log("Payload enviado a Strapi /api/pedidos:", JSON.stringify(payload, null, 2));

    const res = await fetch(`${STRAPI_URL}/api/pedidos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const errorBody = await res.json().catch(() => null);
        console.error("Detalle del error de Strapi:", JSON.stringify(errorBody, null, 2));
        throw new Error(
            `No se pudo crear el pedido en Strapi: ${res.status} — ${errorBody?.error?.message ?? "sin detalle"}`,
        );
    }

    const json = await res.json();
    return json.data;
}
export interface StrapiPedidoItem {
    id: number;
    nombreProducto: string;
    precioUnitario: number;
    cantidad: number;
}

export interface StrapiPedido {
    id: number;
    documentId: string;
    subtotal: number;
    envio: number;
    total: number;
    estado: string;
    wompiReference: string | null;
    wompiTransactionId: string | null;
    createdAt: string;
    items: StrapiPedidoItem[];
    direccionEnvio: {
        nombreCompleto: string;
        telefono: string;
        direccion: string;
        ciudad: string;
        notas: string | null;
    } | null;
    historialEstados: {
        estado: string;
        fecha: string;
        nota: string;
    }[];
}

// Trae un pedido por su documentId (usado como referencia de Wompi)
export async function getPedidoByReference(reference: string): Promise<StrapiPedido | null> {
    try {
        const json = await strapiFetch<StrapiSingleResponse<StrapiPedido>>(
            `/pedidos/${reference}?populate=*`,
        );
        return json.data;
    } catch (error) {
        console.error("Error al traer pedido desde Strapi:", error);
        return null;
    }
}

// Trae todos los pedidos de un cliente, por su clerkUserId, del más reciente al más antiguo
export async function getPedidosByClerkUserId(clerkUserId: string): Promise<StrapiPedido[]> {
    try {
        const clientes = await strapiFetch<StrapiListResponse<{ id: number }>>(
            `/clientes?filters[clerkUserId][$eq]=${clerkUserId}`,
        );
        if (clientes.data.length === 0) return [];

        const clienteId = clientes.data[0].id;
        const json = await strapiFetch<StrapiListResponse<StrapiPedido>>(
            `/pedidos?filters[cliente][id][$eq]=${clienteId}&populate=*&sort=createdAt:desc`,
        );
        return json.data;
    } catch (error) {
        console.error("Error al traer pedidos del cliente:", error);
        return [];
    }
}

// Actualiza el estado de un pedido (llamado al confirmar el resultado del widget de Wompi)
export async function actualizarEstadoPedido(
    reference: string,
    nuevoEstado: string,
    wompiTransactionId?: string,
): Promise<boolean> {
    try {
        const res = await fetch(`${STRAPI_URL}/api/pedidos/${reference}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                data: {
                    estado: nuevoEstado,
                    ...(wompiTransactionId ? { wompiTransactionId } : {}),
                },
            }),
        });
        return res.ok;
    } catch (error) {
        console.error("Error al actualizar estado del pedido:", error);
        return false;
    }
}