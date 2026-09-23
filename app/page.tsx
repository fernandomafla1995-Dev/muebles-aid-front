import Link from "next/link";
import Image from "next/image";
import { Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatsSection } from "@/components/stats-section";
import { ProductCard } from "@/components/product-card";
import { ReviewCard } from "@/components/review-card";
import { FeaturedInSection } from "@/components/featured-in-section";
import { CommitmentSection } from "@/components/commitment-section";
import { FeaturedProduct } from "@/components/featured-product";
import {
  getHomeConfig,
  getHeroPickProducts,
  getFeaturedGridProducts,
  getSpotlightProducts,
  getReviews,
  getStrapiImageUrl,
} from "@/lib/strapi";

// esta es la pagina principal
export default async function Home() {
  const [homeConfig, heroPicks, featuredGrid, spotlightProducts, reviews] =
    await Promise.all([
      getHomeConfig(),
      getHeroPickProducts(),
      getFeaturedGridProducts(),
      getSpotlightProducts(),
      getReviews(),
    ]);

  const heroImageUrl = getStrapiImageUrl(homeConfig?.heroImage, "large");
  const ctaImageUrl = getStrapiImageUrl(homeConfig?.ctaImage, "large");

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-16">
          <div className="flex flex-col items-center text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight sm:texxt-4xl md:text-5xl">
              {homeConfig?.heroTitle ?? "Muebles Diseñados Para"}{" "}
              <span className="bg-yellow-300 px-1">
                {homeConfig?.heroHighlight ?? "tu confort"}
              </span>
            </h1>
            <p className="mt-4 max-w-[700px] text-gray-500 text-sm">
              {homeConfig?.heroDescription ??
                "Cada mueble está fabricado con los mejores materiales, diseñado para máximo confort, estilo y durabilidad - lo que necesitas para que tu hogar sea único."}
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-6 items-center">
            {/* Imagen principal */}
            <div className="md:col-span-7 relative">
              <Image
                src={heroImageUrl}
                width={800}
                height={600}
                alt="Colección destacada"
                className="rounded-lg object-cover w-full"
              />
            </div>

            {/* Opciones de productos */}
            <div className="md:col-span-5 space-y-4">
              {heroPicks.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 border rounded-lg p-3"
                >
                  <Image
                    src={getStrapiImageUrl(product.image, "thumbnail")}
                    width={100}
                    height={100}
                    alt={product.name}
                    className="rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{product.name}</h3>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">
                      ${product.price.toLocaleString("es-CO")} COP
                    </p>
                  </div>
                </div>
              ))}

              {/* Botón para ver mas productos */}
              <div className="flex justify-end mt-6">
                <Link href="/productos">
                  <Button className="rounded-full px-6 bg-black text-white hover:bg-gray-900 flex items-center gap-2">
                    Ver más productos
                    <div>
                      <ChevronRight className="w-4 h-4 text-white" />
                    </div>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsSection />

      {/* Seccion hecho por nosotros */}
      <section className="py-2 md:py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Soñado Por Ti, hecho por Nosotros
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGrid.map((product) => (
              <ProductCard
                key={product.id}
                id={product.documentId}
                name={product.name}
                price={product.price}
                imageSrc={getStrapiImageUrl(product.image, "medium")}
                href={`/producto/${product.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Prodtos destacados */}
      <FeaturedInSection />

      {/* Seccion de compromiso */}
      <CommitmentSection />

      {/* Sección de reseñas */}
      <section className="py-12 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Reseñas de nuestros clientes satisfechos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                name={review.name}
                comment={review.comment}
                rating={review.rating}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Detalles de productos destacados */}
      {spotlightProducts.map((product, index) => (
        <FeaturedProduct
          key={product.id}
          title={product.name}
          description={product.description}
          price={product.originalPrice ?? product.price}
          salePrice={product.price}
          features={product.features ?? []}
          reversed={index % 2 === 1}
        />
      ))}

      {/* Final CTA Section */}
      <section className="py-12 md:py-24 bg-gray-900 text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-6 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                {homeConfig?.ctaTitle ?? "Muebles modernos para tu hogar y comodidad."}
              </h2>
              <p className="mt-4 text-gray-400 md:text-xl">
                {homeConfig?.ctaDescription ??
                  "Descubre nuestra colección completa y encuentra el mueble de tus sueños y para toda la vida."}
              </p>
              <Button className="mt-6 bg-green-500 hover:bg-green-600">
                Explorar Colección
              </Button>
            </div>
            <div className="relative">
              <Image
                src={ctaImageUrl}
                alt="Colección de muebles"
                width={800}
                height={500}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}