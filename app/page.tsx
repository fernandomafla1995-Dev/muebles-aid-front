import Image from "next/image";
import { Star, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { StatsSection } from "@/components/stats-section";
import { ProductCard } from "@/components/product-card";
import { ReviewCard } from "@/components/review-card";
import { FeaturedInSection } from "@/components/featured-in-section";
import { CommitmentSection } from "@/components/commitment-section";
import { FeaturedProduct } from "@/components/featured-product";

//esta es la pagina principal
export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-16">
          <div className="flex flex-col items-center text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight sm:texxt-4xl md:text-5xl">
              Muebles Diseñados Para{" "}
              <span className="bg-yellow-300 px-1">tu confort</span>
            </h1>
            <p className="mt-4 max-w-[700px] text-gray-500 text-sm">
              Cada mueble está fabricado con los mejores materiales,
              diseñado para máximo confort, estilo y durabilidad - lo que
              necesitas para que tu hogar sea único.
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-6 items-center">
            {/* Avatars clientes */}
            <div className="md:col-span-1 flex md:flex-col items-center gap-2 ">
              <div className="flex md:flex-col gap-1">
                {[1, 2, 3].map((i) => (
                  <div
                    className="w-8 h-8 rounded-full overflow-hidden border-2 border-white"
                    key={i}
                  >
                    <Image
                      src={`/placeholder.svg?height=32&width=32&text=${i}`}
                      width={32}
                      height={32}
                      alt={`Cliente ${i}`}
                      className="object-cover rounded-full"
                    />
                  </div>
                ))}
              </div>
              <span className="text-xs text-gray-500">
                Clientes Satisfechos
              </span>
            </div>

            {/* Imagen principal */}
            <div className="md:col-span-6 relative">
              <Image
                src="/placeholder.svg?height=600&width=800"
                width={800}
                height={600}
                alt="Colección destacada"
                className="rounded-lg object-cover w-full"
              />
            </div>

            {/* Opciones de preductos */}
            <div className="md:col-span-5 space-y-4">
              {/* producto 1 */}
              <div className="flex items-center gap-4 border rounded-lg p-3">
                <Image
                  src="/placeholder.svg?height=100&width=100&text=1"
                  width={100}
                  height={100}
                  alt="Mesa tv premium"
                  className="rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium">Mesa tv Premium</h3>
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
                  <p className="font-bold">$230.000COP</p>
                </div>
              </div>

              {/* producto 2 */}
              <div className="flex items-center gap-4 border rounded-lg p-3">
                <Image
                  src="/placeholder.svg?height=100&width=100&text=1"
                  width={100}
                  height={100}
                  alt="Sudaderas Premium"
                  className="rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium">Armario medino Premium</h3>
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
                  <p className="font-bold">$350.000COP</p>
                </div>
              </div>

              {/* Bóton de compra */}
              <div className="flex justify-end mt-6">
                <Button className="rounded-full px-6 bg-black text-white hover:bg-gray-900 flex items-center gap-2">
                  Ver mas productos
                  <div>
                    <ChevronRight className="w-4 h-4 text-white" />
                  </div>
                </Button>
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
            <ProductCard
              id="cocina-esencial"
              name="Cosina Esencial"
              price={429.999}
              imageSrc="/placeholder.svg"
              href="/producto/camiseta-ensecial-1"
            />
            <ProductCard
              id="comedor-monaco"
              name="Comedor monaco"
              price={600.000}
              imageSrc="/placeholder.svg"
              href="/producto/camiseta-ensecial-1"
            />
            <ProductCard
              id="recibidor-esencial"
              name="Recibidor Esencial"
              price={135800}
              imageSrc="/placeholder.svg"
              href="/producto/camiseta-ensecial-1"
            />
          </div>
        </div>
      </section>

      {/* Prodtos destacados */}
      <FeaturedInSection />

      {/* Seccion de compromiso */}
      <CommitmentSection />

      {/*Sección de reseñas */}
      <section className="py-12 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Reseñas de nuestros clientes satisfechos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ReviewCard
              name="María G."
              comment="Los mueble son increíbles en sus materiales y la calidad es excepcional. ¡Definitivamente compraré más!"
              rating={5}
            />
            <ReviewCard
              name="Carlos R."
              comment="Los armairio son perfectos, tanto en ajuste como en durabilidad. Muy contento con mi compra."
              rating={5}
            />
            <ReviewCard
              name="Laura M."
              comment="El servicio al cliente es excelente y los mueble son de muy buena calidad. Recomiendo totalmente."
              rating={4}
            />
            <ReviewCard
              name="David S."
              comment="las cómodas son muy elegantes y el envío fue rápido. Volveré a comprar pronto."
              rating={4}
            />
          </div>
        </div>
      </section>

      {/* detalles de productos destacados */}
      <FeaturedProduct
        title="Armario Signature"
        description="Nuestro armario insignia, hecho con tableros de melamina de la más alta calidad. Diseñado para brindar un espacio moderno de almacenamiento y organizacion."
        price={600000.00}
        salePrice={540000.00}
        features={[
          "100% madera colombian orgánica y certificado",
          "herrajes y accesorios de alta calidad",
          "Disponible en 5 colores",
        ]}
      />
      <FeaturedProduct
        title="Mesas de noche Premium"
        description="Nuestras mesas de noche premium combinan estilo clásico con tecnología moderna. proporciona comodidad, elegancia y funcionalidad a tu cuarto."
        price={79.99}
        salePrice={59.99}
        features={[
          "100% madera colombian orgánica y certificado",
          "herrajes y accesorios de alta calidad",
          "Disponible en 5 colores",
        ]}
        reversed
      />

      {/* Final CTA Section - Sección final de llamada a la acción */}
      <section className="py-12 md:py-24 bg-gray-900 text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-6 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Muebles modernos para tu hogar y comodidad.
              </h2>
              <p className="mt-4 text-gray-400 md:text-xl">
                Descubre nuestra colección completa y encuentra el mueble de tus sueños                y para toda la vida.
              </p>
              <Button className="mt-6 bg-green-500 hover:bg-green-600">
                Explorar Colección
              </Button>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=800"
                alt="Colección de ropa"
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