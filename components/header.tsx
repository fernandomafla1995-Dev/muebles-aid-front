"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Menu, X, Search, User, Package, SearchAlertIcon } from "lucide-react";
import { useUser, UserButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isSignedIn, isLoaded } = useUser();

    return (
        <header className="w-full p-4 items">
            <div className="container flex items-center justify-between max-w-5xl mx-auto">
                <div className="flex item center gap-2">
                    <Link href={"/"} className="flex  item-center space-x-2">
                        <span className="font-bold text-xl">Tienda Muebles y soluciones</span>
                    </Link>
                </div>
                <nav className="hidden md:flex items center space-x-8">
                    <Link
                        href="/productos" className="text-sm font-medium transtion-colors hover:text-primary"
                    >

                        Productos
                    </Link>
                    <Link
                        href="/carrito" className="text-sm font-medium transtion-colors hover:text-primary"
                    >
                        Carrito
                    </Link>
                    <Link
                        href="/ofertas" className="text-sm font-medium transtion-colors hover:text-primary"
                    >

                        Ofertas
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                
                    {/* Autenticacion con clerk */}
                    {isLoaded && !isSignedIn ? (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hidden md:flex"
                            asChild
                        >
                            <Link href="/sign-in">
                                <User className="h-5 w-5" />
                                <span className="sr-only">Iniciar Sesión</span>
                            </Link>
                        </Button>
                    ) : null}
                    {isLoaded && isSignedIn && (
                        <>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="hidden md:flex"
                                asChild
                            >
                                <Link href="/mi-cuenta">
                                    <Package className="h-5 w-5" />
                                    <span className="sr-only">Mi Pedidos</span>
                                </Link>
                            </Button>
                            <UserButton
                                appearance={{
                                    elements: {
                                        avatarBox: "h-8 w-8",
                                    },
                                }}
                            />
                        </>
                    )}

                    <Button
                        variant="outline"
                        size="icon"
                        className="relative rounded-full"
                    >
                        <Link href="/carrito">
                            <ShoppingCart className="h-5 w-5" />
                            <span className="sr-only">Carrito</span>
                        </Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}

