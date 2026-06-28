"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Loader2, Trash2 } from "lucide-react";
import { useDeleteProduct } from "@/hooks/use-delete-product";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
onSuccess?: () => void;
  product: any;
}

export function DeleteProductDialog({
  open,
  onOpenChange,
  product,
  onSuccess,
}: Props) {
  const mutation = useDeleteProduct();

 const handleDelete = () => {
  mutation.mutate(product.id, {
    onSuccess() {
      onOpenChange(false);
      onSuccess?.(); 
    },
  });
};
  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent>

        <AlertDialogHeader>

          <AlertDialogTitle className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-red-500" />

            Delete Product
          </AlertDialogTitle>

          <AlertDialogDescription>

            Are you sure you want to delete

            <span className="font-semibold text-foreground">
              {" "}
              {product?.name}
            </span>

            ?

            <br />

            This action cannot be undone.

          </AlertDialogDescription>

        </AlertDialogHeader>

        <AlertDialogFooter>

          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </>
            )}
          </AlertDialogAction>

        </AlertDialogFooter>

      </AlertDialogContent>
    </AlertDialog>
  );
}