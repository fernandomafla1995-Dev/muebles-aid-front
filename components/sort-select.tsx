"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function SortSelect() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentOrden = searchParams.get("orden") ?? undefined;

    function handleChange(value: string) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("orden", value);

        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <Select value={currentOrden} onValueChange={handleChange}>
            <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Ordenar por precio" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="precio-asc">Precio Menor a Mayor</SelectItem>
                <SelectItem value="precio-desc">Precio de Mayor a Menor</SelectItem>
            </SelectContent>
        </Select>
    );
}