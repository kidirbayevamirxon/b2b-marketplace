"use client";

import { useState } from "react";

import {
  Search,
  Plus,
  Filter,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { CreateProductDialog } from "./create-product-dialog";

export function ProductToolbar({
  search,
  onSearch,
}: {
  search: string;
  onSearch: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);

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

            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>

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