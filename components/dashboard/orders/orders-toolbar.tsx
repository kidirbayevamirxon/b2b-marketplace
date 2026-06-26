"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function OrdersToolbar() {
    return (
        <div className="rounded-xl border bg-card p-4">

            <div className="relative max-w-sm">

                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                <Input
                    placeholder="Search orders..."
                    className="pl-10"
                />

            </div>

        </div>
    );
}