/**
 * Script de Seed para Strapi - Tienda de Ropa
 * Genera más de 100 productos con imágenes y precios en COP
 *
 * USO:
 * 1. Crear API Token en Strapi: Settings > API Tokens > Create new API Token (Full access)
 * 2. Copiar el token y pegarlo en STRAPI_API_TOKEN
 * 3. Ejecutar: node scripts/seed-strapi.js
 */

// Script de seed - no requiere dependencias externas

// ==================== CONFIGURACIÓN ====================

require("dotenv").config();

const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

// ==================== CATEGORÍAS ====================
const categories = [
  {
    name: "Mesas de Noche",
    slug: "mesas-de-noche",
    description:
		"Catálogo exclusivo de mesas de noche modernas, minimalistas y funcionales. Diseñadas para complementar tu dormitorio con estilo, organización y practicidad.",
  },
  {
   name: "Armarios",
   slug: "armarios",
   description:
   "Descubre nuestra colección de armarios modernos y espaciosos, ideales para mantener tu hogar organizado con diseños elegantes, resistentes y funcionales.",
 },
 {
   name: "Mesas de TV",
   slug: "mesas-de-tv",
   description:
   "Encuentra mesas de TV contemporáneas que combinan diseño, almacenamiento y funcionalidad para crear espacios de entretenimiento modernos y sofisticados.",
 },
 {
		name: "Escritorios",
		slug: "escritorios",
		description:
		"Explora escritorios modernos y ergonómicos diseñados para potenciar tu productividad. Perfectos para oficinas en casa, estudios y espacios de trabajo.",
 },
 {
		name: "Cómodas",
		slug: "comodas",
		description:
		"Catálogo de cómodas elegantes y funcionales que ofrecen amplio espacio de almacenamiento para mantener tu habitación organizada con un toque de estilo.",
 },
 {
		name: "Mesas de Centro",
		slug: "mesas-de-centro",
		description:
		"Descubre mesas de centro modernas que aportan personalidad y armonía a tu sala, combinando diseño innovador, calidad y practicidad.",
 },
 {
		name: "Repisas",
		slug: "repisas",
		description:
		"Colección de repisas decorativas y funcionales para optimizar tus espacios. Ideales para exhibir libros, plantas y elementos decorativos con estilo.",
 },
 {
		name: "Cocinas",
		slug: "cocinas",
		description:
		"Encuentra muebles de cocina modernos y funcionales diseñados para maximizar el espacio, la organización y el estilo en el corazón de tu hogar.",
 },

];

// ==================== PRODUCTOS (40+) ====================
const products = [
  // ===================== MESAS DE NOCHE - (5) =========================
 {
		name: "Mesa de Noche Nórdica Oslo",
		slug: "mesa-de-noche-nordica-oslo",
		description:
		"Mesa de noche con diseño escandinavo, cajón amplio y acabados en madera clara para un dormitorio moderno.",
		price: 189900,
		originalPrice: 229900,
		category: "mesas-de-noche",
		measurement: "45cm x 40cm x 60cm",
		colors: ["Roble Claro"],
		stock: 20,
		featured: true,
		imageUrl:
		"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
 },
 {
		name: "Mesa de Noche Moderna Tokio",
		slug: "mesa-de-noche-moderna-tokio",
		description:
		"Diseño contemporáneo con dos cajones y acabados elegantes para complementar cualquier habitación.",
		price: 219900,
		originalPrice: null,
		category: "mesas-de-noche",
		measurement: "50cm x 40cm x 55cm",
		colors: ["Blanco", "Madera"],
		stock: 15,
		featured: true,
		imageUrl:
		"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
 },
 {
		name: "Mesa de Noche Minimalista Luna",
		slug: "mesa-de-noche-minimalista-luna",
		description:
		"Mesa de noche compacta y funcional con espacio de almacenamiento para objetos esenciales.",
		price: 169900,
		originalPrice: null,
		category: "mesas-de-noche",
		measurement: "40cm x 35cm x 55cm",
		colors: ["Blanco"],
		stock: 30,
		featured: false,
		imageUrl:
		"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
 },
 {
		name: "Mesa de Noche Premium Verona",
		slug: "mesa-de-noche-premium-verona",
		description:
		"Elegancia y funcionalidad en una mesa de noche fabricada con materiales de alta calidad.",
		price: 259900,
		originalPrice: 299900,
		category: "mesas-de-noche",
		measurement: "50cm x 42cm x 60cm",
		colors: ["Nogal"],
		stock: 12,
		featured: true,
		imageUrl:
		"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
 },
 {
		name: "Mesa de Noche Essential",
		slug: "mesa-de-noche-essential",
		description:
		"Diseño versátil y práctico para complementar cualquier estilo de dormitorio.",
		price: 149900,
		originalPrice: null,
		category: "mesas-de-noche",
		measurement: "45cm x 35cm x 55cm",
		colors: ["Gris"],
		stock: 25,
		featured: false,
		imageUrl:
		"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
 },

  // ===================== ARMARIOS - (5) =========================

 {
		name: "Armario Moderno Milán",
		slug: "armario-moderno-milan",
		description:
		"Amplio armario de puertas corredizas con excelente capacidad de almacenamiento.",
		price: 1199900,
		originalPrice: 1399900,
		category: "armarios",
		measurement: "180cm x 60cm x 200cm",
		colors: ["Blanco"],
		stock: 10,
		featured: true,
		imageUrl:
		"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
 },
 {
		name: "Armario Premium Viena",
		slug: "armario-premium-viena",
		description:
		"Diseño elegante con acabados sofisticados y compartimentos organizadores.",
		price: 1499900,
		originalPrice: null,
		category: "armarios",
		measurement: "200cm x 60cm x 220cm",
		colors: ["Nogal"],
		stock: 8,
		featured: true,
		imageUrl:
		"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
	},
	{
		name: "Armario Compacto Urban",
		slug: "armario-compacto-urban",
		description:
		"Ideal para espacios pequeños sin sacrificar capacidad de almacenamiento.",
		price: 899900,
		originalPrice: null,
		category: "armarios",
		measurement: "120cm x 55cm x 190cm",
		colors: ["Blanco", "Gris"],
		stock: 18,
		featured: false,
		imageUrl:
		"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
	},
	{
		name: "Armario Oslo 4 Puertas",
		slug: "armario-oslo-4-puertas",
		description:
		"Armario espacioso con diseño nórdico y excelente distribución interior.",
		price: 1299900,
		originalPrice: 1499900,
		category: "armarios",
		measurement: "160cm x 60cm x 210cm",
		colors: ["Roble Claro"],
		stock: 14,
		featured: true,
		imageUrl:
		"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
	},
	{
		name: "Armario Elite Plus",
		slug: "armario-elite-plus",
		description:
		"Máxima capacidad y organización para dormitorios modernos y funcionales.",
		price: 1699900,
		originalPrice: null,
		category: "armarios",
		measurement: "220cm x 65cm x 230cm",
		colors: ["Negro Mate"],
		stock: 6,
		featured: true,
		imageUrl:
		"https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
	},

  // ===================== MESAS DE TV  (5) =====================

 {
		name: "Mesa TV Nórdica Bergen",
		slug: "mesa-tv-nordica-bergen",
		description:
		"Mesa para TV con diseño escandinavo, espacios abiertos y almacenamiento funcional para tu sala.",
		price: 459900,
		originalPrice: 529900,
		category: "mesas-de-tv",
		measurement: "140cm x 40cm x 55cm",
		colors: ["Roble Claro"],
		stock: 15,
		featured: true,
		imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
 },
 {
		name: "Mesa TV Moderna Dubai",
		slug: "mesa-tv-moderna-dubai",
		description:
		"Diseño elegante con compartimentos cerrados para mantener el orden en tu espacio de entretenimiento.",
		price: 599900,
		originalPrice: null,
		category: "mesas-de-tv",
		measurement: "160cm x 40cm x 60cm",
		colors: ["Blanco"],
		stock: 12,
		featured: true,
		imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
 },
 {
		name: "Mesa TV Verona Plus",
		slug: "mesa-tv-verona-plus",
		description:
		"Mueble moderno con amplio espacio para televisores y dispositivos multimedia.",
		price: 649900,
		originalPrice: 749900,
		category: "mesas-de-tv",
		measurement: "180cm x 45cm x 60cm",
		colors: ["Nogal"],
		stock: 10,
		featured: true,
		imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
 },
 {
		name: "Mesa TV Urban Style",
		slug: "mesa-tv-urban-style",
		description:
		"Diseño minimalista ideal para apartamentos y espacios contemporáneos.",
		price: 399900,
		originalPrice: null,
		category: "mesas-de-tv",
		measurement: "120cm x 35cm x 50cm",
		colors: ["Gris"],
		stock: 18,
		featured: false,
		imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
 },
 {
		name: "Mesa TV Elite Home",
		slug: "mesa-tv-elite-home",
		description:
		"Mueble premium con acabados sofisticados para salas modernas y elegantes.",
		price: 799900,
		originalPrice: 899900,
		category: "mesas-de-tv",
		measurement: "200cm x 45cm x 60cm",
		colors: ["Negro Mate"],
		stock: 8,
		featured: true,
		imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
 },

 // ===================== MESAS DE TV  (5) =====================

	{
		name: "Escritorio Ejecutivo Boston",
		slug: "escritorio-ejecutivo-boston",
		description:
		"Amplia superficie de trabajo con diseño elegante para oficina o estudio.",
		price: 549900,
		originalPrice: 649900,
		category: "escritorios",
		measurement: "140cm x 60cm x 75cm",
		colors: ["Nogal"],
		stock: 14,
		featured: true,
		imageUrl: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800",
	},
	{
		name: "Escritorio Home Office Oslo",
		slug: "escritorio-home-office-oslo",
		description:
		"Diseño moderno y funcional para crear un espacio de trabajo productivo.",
		price: 399900,
		originalPrice: null,
		category: "escritorios",
		measurement: "120cm x 55cm x 75cm",
		colors: ["Blanco"],
		stock: 20,
		featured: true,
		imageUrl: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800",
  },
	{
		name: "Escritorio Minimal Urban",
		slug: "escritorio-minimal-urban",
		description:
		"Estilo moderno con líneas limpias y estructura resistente.",
		price: 329900,
		originalPrice: null,
		category: "escritorios",
		measurement: "100cm x 50cm x 75cm",
		colors: ["Gris"],
		stock: 25,
		featured: false,
		imageUrl: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800",
 },
 {
		name: "Escritorio Gamer Pro",
		slug: "escritorio-gamer-pro",
		description:
		"Diseñado para largas jornadas de juego y trabajo con amplio espacio.",
		price: 699900,
		originalPrice: 799900,
		category: "escritorios",
		measurement: "160cm x 70cm x 75cm",
		colors: ["Negro"],
		stock: 10,
		featured: true,
		imageUrl: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800",
 },
 {
		name: "Escritorio Premium Tokio",
		slug: "escritorio-premium-tokio",
		description:
		"Elegancia y productividad combinadas en un escritorio contemporáneo.",
		price: 849900,
		originalPrice: null,
		category: "escritorios",
		measurement: "180cm x 70cm x 75cm",
		colors: ["Roble Claro"],
		stock: 8,
		featured: true,
		imageUrl: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800",
	},


	// ===================== MESAS DE TV  (5) =====================

	{
		name: "Cómoda Verona 4 Cajones",
		slug: "comoda-verona-4-cajones",
		description:
		"Cómoda elegante con amplio almacenamiento y diseño contemporáneo.",
		price: 549900,
		originalPrice: 629900,
		category: "comodas",
		measurement: "120cm x 45cm x 85cm",
		colors: ["Nogal"],
		stock: 12,
		featured: true,
		imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
	},
	{
		name: "Cómoda Oslo Minimalista",
		slug: "comoda-oslo-minimalista",
		description:
		"Diseño nórdico ideal para dormitorios modernos y funcionales.",
		price: 449900,
		originalPrice: null,
		category: "comodas",
		measurement: "100cm x 40cm x 80cm",
		colors: ["Blanco"],
		stock: 18,
		featured: true,
		imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
	},
	{
		name: "Cómoda Urban Storage",
		slug: "comoda-urban-storage",
		description:
		"Perfecta para optimizar el almacenamiento sin ocupar demasiado espacio.",
		price: 399900,
		originalPrice: null,
		category: "comodas",
		measurement: "90cm x 40cm x 75cm",
		colors: ["Gris"],
		stock: 22,
		featured: false,
		imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
	},
	{
		name: "Cómoda Premium Milán",
		slug: "comoda-premium-milan",
		description:
		"Acabados de lujo y gran capacidad para organizar tu habitación.",
		price: 749900,
		originalPrice: 849900,
		category: "comodas",
		measurement: "140cm x 45cm x 90cm",
		colors: ["Negro Mate"],
		stock: 8,
		featured: true,
		imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
	},
	{
		name: "Cómoda Essential Home",
		slug: "comoda-essential-home",
		description:
		"Versátil y práctica para complementar cualquier dormitorio.",
		price: 349900,
		originalPrice: null,
		category: "comodas",
		measurement: "80cm x 40cm x 75cm",
		colors: ["Roble Claro"],
		stock: 25,
		featured: false,
		imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
	},

  // ===================== MESAS DE CENTRO (5) =====================

	{
		name: "Mesa de Centro Nórdica Oslo",
		slug: "mesa-de-centro-nordica-oslo",
		description:
		"Mesa de centro moderna con acabados en madera natural y diseño minimalista.",
		price: 329900,
		originalPrice: 399900,
		category: "mesas-de-centro",
		measurement: "100cm x 60cm x 40cm",
		colors: ["Roble Claro"],
		stock: 20,
		featured: true,
		imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
	},
	{
		name: "Mesa de Centro Verona",
		slug: "mesa-de-centro-verona",
		description:
		"Diseño elegante ideal para complementar salas contemporáneas.",
		price: 429900,
		originalPrice: null,
		category: "mesas-de-centro",
		measurement: "110cm x 60cm x 42cm",
		colors: ["Nogal"],
		stock: 15,
		featured: true,
		imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
  },
	{
		name: "Mesa de Centro Urban",
		slug: "mesa-de-centro-urban",
		description:
		"Estilo moderno y funcional para espacios compactos.",
		price: 279900,
		originalPrice: null,
		category: "mesas-de-centro",
		measurement: "90cm x 50cm x 40cm",
		colors: ["Blanco"],
		stock: 25,
		featured: false,
		imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
	},
	{
		name: "Mesa de Centro Elite",
		slug: "mesa-de-centro-elite",
		description:
		"Acabados premium que aportan sofisticación y personalidad.",
		price: 549900,
		originalPrice: 649900,
		category: "mesas-de-centro",
		measurement: "120cm x 70cm x 45cm",
		colors: ["Negro Mate"],
		stock: 10,
		featured: true,
		imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
	},
	{
		name: "Mesa de Centro Dubai",
		slug: "mesa-de-centro-dubai",
		description:
		"Combinación perfecta entre diseño moderno y funcionalidad.",
		price: 469900,
		originalPrice: null,
		category: "mesas-de-centro",
		measurement: "110cm x 65cm x 42cm",
		colors: ["Gris"],
		stock: 12,
		featured: true,
		imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
	},

	// ===================== MESAS DE CENTRO (5) =====================

	{
		name: "Repisa Flotante Oslo",
		slug: "repisa-flotante-oslo",
		description:
		"Repisa decorativa ideal para exhibir libros y accesorios.",
		price: 89900,
		originalPrice: null,
		category: "repisas",
		measurement: "80cm x 20cm x 5cm",
		colors: ["Roble Claro"],
		stock: 35,
		featured: true,
		imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
	},
	{
		name: "Repisa Moderna Urban",
		slug: "repisa-moderna-urban",
		description:
		"Diseño contemporáneo que optimiza espacios con estilo.",
		price: 119900,
		originalPrice: null,
		category: "repisas",
		measurement: "100cm x 25cm x 5cm",
		colors: ["Blanco"],
		stock: 30,
		featured: false,
		imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
	},
	{
		name: "Repisa Verona Premium",
		slug: "repisa-verona-premium",
		description:
		"Acabados sofisticados para una decoración elegante y funcional.",
		price: 149900,
		originalPrice: 179900,
		category: "repisas",
		measurement: "120cm x 25cm x 5cm",
		colors: ["Nogal"],
		stock: 20,
		featured: true,
		imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
	},
	{
		name: "Repisa Cube Decor",
		slug: "repisa-cube-decor",
		description:
		"Diseño geométrico moderno ideal para cualquier ambiente.",
		price: 169900,
		originalPrice: null,
		category: "repisas",
		measurement: "90cm x 30cm x 20cm",
		colors: ["Negro"],
		stock: 15,
		featured: true,
		imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
	},
	{
		name: "Repisa Essential Home",
		slug: "repisa-essential-home",
		description:
		"Solución práctica y decorativa para organizar tus espacios.",
		price: 79900,
		originalPrice: null,
		category: "repisas",
		measurement: "60cm x 20cm x 5cm",
		colors: ["Gris"],
		stock: 40,
		featured: false,
		imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
	},

 // COCINAS

	{
		name: "Cocina Integral Milán",
		slug: "cocina-integral-milan",
		description:
		"Cocina moderna con múltiples módulos para maximizar almacenamiento y funcionalidad.",
		price: 3499900,
		originalPrice: 3999900,
		category: "cocinas",
		measurement: "300cm x 60cm x 220cm",
		colors: ["Blanco"],
		stock: 5,
		featured: true,
		imageUrl: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
	},
	{
		name: "Cocina Integral Oslo",
		slug: "cocina-integral-oslo",
		description:
		"Diseño escandinavo que combina elegancia y practicidad.",
		price: 2999900,
		originalPrice: null,
		category: "cocinas",
		measurement: "280cm x 60cm x 220cm",
		colors: ["Roble Claro"],
		stock: 6,
		featured: true,
		imageUrl: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
	},
	{
		name: "Cocina Premium Verona",
		slug: "cocina-premium-verona",
		description:
		"Acabados de lujo y excelente distribución para cocinas modernas.",
		price: 4599900,
		originalPrice: 5299900,
		category: "cocinas",
		measurement: "350cm x 60cm x 220cm",
		colors: ["Negro Mate"],
		stock: 3,
		featured: true,
		imageUrl: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
	},
	{
		name: "Cocina Compacta Urban",
		slug: "cocina-compacta-urban",
		description:
		"Ideal para apartamentos y espacios reducidos sin sacrificar funcionalidad.",
		price: 2499900,
		originalPrice: null,
		category: "cocinas",
		measurement: "220cm x 60cm x 220cm",
		colors: ["Gris"],
		stock: 8,
		featured: false,
		imageUrl: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
	},
	{
		name: "Cocina Elite Home",
		slug: "cocina-elite-home",
		description:
		"La combinación perfecta entre diseño, calidad y organización.",
		price: 5299900,
		originalPrice: 5999900,
		category: "cocinas",
		measurement: "400cm x 60cm x 220cm",
		colors: ["Nogal"],
		stock: 2,
		featured: true,
		imageUrl: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
	},
]
// ===================== OFERTAS (15) =====================
  
// ==================== FUNCIONES ====================

async function fetchAPI(endpoint, options = {}) {
  const url = `${STRAPI_URL}/api${endpoint}`;
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HTTP ${response.status}: ${error}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Error en ${endpoint}:`, error.message);
    throw error;
  }
}

async function uploadImageFromUrl(imageUrl, fileName) {
  try {
    console.log(`   📷 Descargando imagen: ${fileName}`);

    // Descargar imagen
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error(
        `No se pudo descargar la imagen: ${imageResponse.status}`,
      );
    }

    const buffer = Buffer.from(await imageResponse.arrayBuffer());

    // Crear boundary para multipart
    const boundary = "----formdata-" + Date.now();
    const fileName_ = `${fileName}.jpg`;

    // Construir el body manualmente
    const header = `--${boundary}\r\nContent-Disposition: form-data; name="files"; filename="${fileName_}"\r\nContent-Type: image/jpeg\r\n\r\n`;
    const footer = `\r\n--${boundary}--\r\n`;

    const headerBuffer = Buffer.from(header, "utf-8");
    const footerBuffer = Buffer.from(footer, "utf-8");
    const body = Buffer.concat([headerBuffer, buffer, footerBuffer]);

    // Subir a Strapi
    const response = await fetch(`${STRAPI_URL}/api/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        "Content-Type": `multipart/form-data; boundary=${boundary}`,
      },
      body: body,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Error subiendo imagen: ${error}`);
    }

    const data = await response.json();
    console.log(`   ✅ Imagen subida: ${fileName}`);
    return data[0]?.id;
  } catch (error) {
    console.error(`   ❌ Error con imagen ${fileName}: ${error.message}`);
    return null;
  }
}

async function createCategory(category) {
  try {
    const response = await fetchAPI("/categories", {
      method: "POST",
      body: JSON.stringify({ data: category }),
    });
    console.log(`✅ Categoría creada: ${category.name}`);
    return response.data;
  } catch (error) {
    // Si ya existe, intentar obtenerla
    console.log(
      `⚠️  Categoría "${category.name}" puede que ya exista, buscando...`,
    );
    const existing = await fetchAPI(
      `/categories?filters[slug][$eq]=${category.slug}`,
    );
    if (existing.data && existing.data.length > 0) {
      console.log(`📦 Usando categoría existente: ${category.name}`);
      return existing.data[0];
    }
    throw error;
  }
}

async function createProduct(product, categoryId, imageId) {
  const productData = {
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    originalPrice: product.originalPrice,
    sizes: product.sizes,
    colors: product.colors,
    stock: product.stock,
    featured: product.featured,
    category: categoryId,
  };

  // Solo agregar imagen si se subió correctamente
  if (imageId) {
    productData.image = imageId;
  }

  try {
    const response = await fetchAPI("/products", {
      method: "POST",
      body: JSON.stringify({ data: productData }),
    });

    const priceFormatted = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(product.price);

    console.log(`✅ Producto creado: ${product.name} - ${priceFormatted}`);
    return response.data;
  } catch (error) {
    console.error(
      `❌ Error creando producto "${product.name}": ${error.message}`,
    );
    return null;
  }
}

async function clearExistingData() {
  console.log("\n🧹 Limpiando datos existentes...");

  try {
    // Obtener y eliminar productos
    const products = await fetchAPI("/products?pagination[pageSize]=100");
    if (products.data && products.data.length > 0) {
      for (const product of products.data) {
        await fetchAPI(`/products/${product.id}`, { method: "DELETE" });
      }
      console.log(`   Eliminados ${products.data.length} productos`);
    }

    // Obtener y eliminar categorías
    const categories = await fetchAPI("/categories?pagination[pageSize]=100");
    if (categories.data && categories.data.length > 0) {
      for (const category of categories.data) {
        await fetchAPI(`/categories/${category.id}`, { method: "DELETE" });
      }
      console.log(`   Eliminadas ${categories.data.length} categorías`);
    }
  } catch (error) {
    console.log(
      "   No se pudo limpiar datos existentes (puede que no existan aún)",
    );
  }
}

async function seed() {
  console.log("╔════════════════════════════════════════════════════════════╗");
  console.log("║        🌱 SEED DE DATOS - TIENDA DE ROPA                   ║");
  console.log("║        Más de 100 productos con precios en COP             ║");
  console.log(
    "╚════════════════════════════════════════════════════════════╝\n",
  );

  console.log(`🔗 Strapi URL: ${STRAPI_URL}`);
  console.log(
    `🔑 Token configurado: ${STRAPI_API_TOKEN !== "TU_API_TOKEN_AQUI" ? "Sí" : "No (configurar!)"}\n`,
  );

  if (STRAPI_API_TOKEN === "TU_API_TOKEN_AQUI") {
    console.error("❌ ERROR: Debes configurar el STRAPI_API_TOKEN");
    console.log("\nPasos:");
    console.log("1. Abre Strapi Admin: http://localhost:1337/admin");
    console.log("2. Ve a Settings > API Tokens > Create new API Token");
    console.log('3. Nombre: "Seed Script", Tipo: "Full access"');
    console.log(
      "4. Copia el token y configúralo en este script o como variable de entorno",
    );
    process.exit(1);
  }

  // Opción para limpiar datos
  const args = process.argv.slice(2);
  if (args.includes("--clean")) {
    await clearExistingData();
  }

  // 1. Crear categorías
  console.log("\n📁 CREANDO CATEGORÍAS...");
  console.log("─".repeat(50));
  const categoryMap = {};

  for (const cat of categories) {
    const created = await createCategory(cat);
    if (created) {
      categoryMap[cat.slug] = created.id;
    }
  }

  // 2. Crear productos
  console.log("\n👕 CREANDO PRODUCTOS...");
  console.log("─".repeat(50));

  let created = 0;
  let failed = 0;

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    console.log(`\n[${i + 1}/${products.length}] ${product.name}`);

    // Subir imagen
    const imageId = await uploadImageFromUrl(product.imageUrl, product.slug);

    // Crear producto
    const categoryId = categoryMap[product.category];
    const result = await createProduct(product, categoryId, imageId);

    if (result) {
      created++;
    } else {
      failed++;
    }

    // Pequeña pausa para no sobrecargar el servidor
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  // Resumen
  console.log("\n" + "═".repeat(50));
  console.log("📊 RESUMEN");
  console.log("═".repeat(50));
  console.log(`✅ Categorías creadas: ${Object.keys(categoryMap).length}`);
  console.log(`✅ Productos creados: ${created}`);
  if (failed > 0) {
    console.log(`❌ Productos fallidos: ${failed}`);
  }

  // Estadísticas por categoría
  console.log("\n📈 PRODUCTOS POR CATEGORÍA:");
  const stats = {};
  products.forEach((p) => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });
  Object.entries(stats).forEach(([cat, count]) => {
    console.log(`   - ${cat}: ${count} productos`);
  });

  console.log("\n✨ ¡Seed completado exitosamente!");
  console.log("\nPróximos pasos:");
  console.log(
    "1. Verifica los datos en Strapi Admin: http://localhost:1337/admin",
  );
  console.log("2. Configura los permisos públicos para Category y Product");
  console.log(
    "3. Prueba la API: curl http://localhost:1337/api/products?populate=*",
  );
}

// Ejecutar
seed().catch((error) => {
  console.error("\n❌ Error fatal:", error);
  process.exit(1);
});