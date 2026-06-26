"use client";

import {
    ShoppingCart,
    Clock3,
    CheckCircle2,
    DollarSign,
} from "lucide-react";

export function OrdersStats({ orders }: any) {
    const totalRevenue = orders.reduce(
        (sum: number, item: any) => sum + item.amount,
        0
    );

    const cards = [
        {
            title: "Total Orders",
            value: orders.length,
            icon: ShoppingCart,
        },
        {
            title: "Pending",
            value: orders.filter((o: any) => o.status === "Pending").length,
            icon: Clock3,
        },
        {
            title: "Delivered",
            value: orders.filter((o: any) => o.status === "Delivered").length,
            icon: CheckCircle2,
        },
        {
            title: "Revenue",
            value: `$${totalRevenue}`,
            icon: DollarSign,
        },
    ];

    return (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

            {cards.map((card) => {
                const Icon = card.icon;

                return (
                    <div
                        key={card.title}
                        className="rounded-2xl border bg-card p-6"
                    >
                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-muted-foreground">
                                    {card.title}
                                </p>

                                <h2 className="mt-2 text-3xl font-bold">
                                    {card.value}
                                </h2>

                            </div>

                            <div className="rounded-xl bg-primary/10 p-3">
                                <Icon className="h-6 w-6 text-primary" />
                            </div>

                        </div>
                    </div>
                );
            })}

        </div>
    );
}