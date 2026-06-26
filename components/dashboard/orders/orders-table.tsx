"use client";

import {
    BadgeCheck,
    Clock3,
    Truck,
} from "lucide-react";

import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
} from "@/components/ui/table";

function Status({ status }: { status: string }) {

    if (status === "Pending")
        return (
            <span className="inline-flex items-center gap-2 rounded-full bg-yellow-500/10 px-3 py-1 text-sm text-yellow-500">
                <Clock3 className="h-4 w-4" />
                Pending
            </span>
        );

    if (status === "Confirmed")
        return (
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-500">
                <BadgeCheck className="h-4 w-4" />
                Confirmed
            </span>
        );

    return (
        <span className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-500">
            <Truck className="h-4 w-4" />
            Delivered
        </span>
    );
}

export function OrdersTable({ orders }: any) {

    return (
        <div className="overflow-hidden rounded-2xl border bg-card">

            <Table>

                <TableHeader>

                    <TableRow>

                        <TableHead>Order</TableHead>

                        <TableHead>Market</TableHead>

                        <TableHead>Product</TableHead>

                        <TableHead>Qty</TableHead>

                        <TableHead>Total</TableHead>

                        <TableHead>Status</TableHead>

                        <TableHead>Date</TableHead>

                    </TableRow>

                </TableHeader>

                <TableBody>

                    {orders.map((order: any) => (

                        <TableRow key={order.id}>

                            <TableCell className="font-semibold">
                                {order.id}
                            </TableCell>

                            <TableCell>
                                {order.market}
                            </TableCell>

                            <TableCell>
                                {order.product}
                            </TableCell>

                            <TableCell>
                                {order.quantity}
                            </TableCell>

                            <TableCell>
                                ${order.amount}
                            </TableCell>

                            <TableCell>
                                <Status status={order.status} />
                            </TableCell>

                            <TableCell>
                                {order.date}
                            </TableCell>

                        </TableRow>

                    ))}

                </TableBody>

            </Table>

        </div>
    );
}