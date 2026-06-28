"use client";

import { useEffect, useState } from "react";

import {
  Search,
  Plus,
  Filter,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { CreateProductDialog } from "./create-product-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
export function ProductToolbar({
  search,
  onSearch,
  onStockFilter,
}: {
  search: string;
  onSearch: (v: string) => void;
  stockFilter: string;
  onStockFilter: (v: any) => void;
}) {
  const [open, setOpen] = useState(false);
  const [stockFilter, setStockFilter] =
    useState<"all" | "in" | "low">("all");
  useEffect(() => {
    const t = setTimeout(() => {
      onSearch(search);
    }, 300);

    return () => clearTimeout(t);
  }, [search]);
  return (
    <>
      <div className="rounded-2xl border bg-card p-5">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div className="relative w-full lg:max-w-md">

            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

            <Input
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search products..."
              className="pl-9"
            />

          </div>

          <div className="flex gap-3">
            <Select
              value={stockFilter}
              onValueChange={(value) => {
                if (!value) return;
                setStockFilter(value as "all" | "in" | "low");
              }}
            >              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Stock filter" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="in">In stock</SelectItem>
                <SelectItem value="low">Low stock</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={() => setOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Product
            </Button>

          </div>

        </div>

      </div>

      <CreateProductDialog
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}