// app/admin/product-types/page.tsx
'use client';

import { useEffect, useState } from 'react';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  MoreVertical,
  CheckCircle,
  XCircle,
  Package,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/dashboard/page-header';
import {
  fetchProductTypes,
  createProductType,
  updateProductType,
  toggleProductTypeStatus,
  deleteProductType,
  ProductType,
} from '@/lib/product-types';

export default function ProductTypesPage() {
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  
  // Form states
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [selectedType, setSelectedType] = useState<ProductType | null>(null);
  const [formName, setFormName] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  
  const { toast } = useToast();

  const loadProductTypes = async (page: number = 1) => {
    try {
      setLoading(true);
      const data = await fetchProductTypes(page);
      setProductTypes(data.product_types);
      setTotalPages(data.pages);
      setTotalItems(data.total);
      setCurrentPage(data.page);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load product types. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProductTypes();
  }, []);

  const handleCreate = async () => {
    if (!formName.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please enter a product type name.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setActionLoading(true);
      await createProductType({ name: formName.trim() });
      
      toast({
        title: 'Success',
        description: 'Product type created successfully.',
      });
      
      setShowCreateDialog(false);
      setFormName('');
      await loadProductTypes(currentPage);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create product type. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleEdit = async () => {
    if (!selectedType || !formName.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please enter a product type name.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setActionLoading(true);
      await updateProductType(selectedType.id, { name: formName.trim() });
      
      toast({
        title: 'Success',
        description: 'Product type updated successfully.',
      });
      
      setShowEditDialog(false);
      setFormName('');
      setSelectedType(null);
      await loadProductTypes(currentPage);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update product type. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedType) return;

    try {
      setActionLoading(true);
      await deleteProductType(selectedType.id);
      
      toast({
        title: 'Success',
        description: 'Product type deleted successfully.',
      });
      
      setShowDeleteDialog(false);
      setSelectedType(null);
      await loadProductTypes(currentPage);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete product type. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleStatus = async () => {
    if (!selectedType) return;

    try {
      setActionLoading(true);
      await toggleProductTypeStatus(selectedType.id, !selectedType.is_active);
      
      toast({
        title: 'Success',
        description: `Product type ${selectedType.is_active ? 'deactivated' : 'activated'} successfully.`,
      });
      
      setShowStatusDialog(false);
      setSelectedType(null);
      await loadProductTypes(currentPage);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update product type status. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setActionLoading(false);
    }
  };

  const openEditDialog = (type: ProductType) => {
    setSelectedType(type);
    setFormName(type.name);
    setShowEditDialog(true);
  };

  const openDeleteDialog = (type: ProductType) => {
    setSelectedType(type);
    setShowDeleteDialog(true);
  };

  const openStatusDialog = (type: ProductType) => {
    setSelectedType(type);
    setShowStatusDialog(true);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Filter product types based on search
  const filteredTypes = productTypes.filter((type) =>
    type.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination controls
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      loadProductTypes(page);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Product Types"
          subtitle="Manage product categories and types"
        />
        
        <Card className="glass">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Product Types</CardTitle>
                <CardDescription>Loading product types...</CardDescription>
              </div>
              <Button disabled>
                <Plus className="mr-2 h-4 w-4" />
                Add Type
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-10 w-full max-w-sm" />
              <div className="rounded-md border">
                <div className="space-y-2 p-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Product Types"
        subtitle="Manage product categories and types"
        action={
          <Button onClick={() => {
            setFormName('');
            setShowCreateDialog(true);
          }}>
            <Plus className="mr-2 h-4 w-4" />
            Add Type
          </Button>
        }
      />

      <Card className="glass">
        <CardHeader>
          <CardTitle>All Product Types</CardTitle>
          <CardDescription>
            {totalItems} product type{totalItems !== 1 ? 's' : ''} on the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search */}
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search product types..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTypes.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground">
                        {searchTerm
                          ? 'No product types match your search'
                          : 'No product types found'}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTypes.map((type) => (
                      <TableRow key={type.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-primary/10 p-2">
                              <Package className="h-4 w-4 text-primary" />
                            </div>
                            <span className="font-medium">{type.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={type.is_active ? 'default' : 'secondary'}
                            className={type.is_active ? 'bg-green-500/10 text-green-500' : ''}
                          >
                            {type.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">
                            {formatDate(type.created_at)}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger
                          //@ts-ignore
                             asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => openEditDialog(type)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => openStatusDialog(type)}
                                className={type.is_active ? 'text-yellow-600' : 'text-green-600'}
                              >
                                {type.is_active ? (
                                  <>
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Deactivate
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Activate
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => openDeleteDialog(type)}
                                className="text-destructive"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing page {currentPage} of {totalPages}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Create Dialog - POST */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Product Type</DialogTitle>
            <DialogDescription>
              Add a new product category or type to the platform.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                placeholder="Enter product type name..."
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCreate();
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowCreateDialog(false);
                setFormName('');
              }}
              disabled={actionLoading}
            >
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={actionLoading}>
              {actionLoading ? 'Creating...' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog - PUT */}
    

      {/* Delete Dialog - DELETE */}


      {/* Status Dialog - PATCH */}
    
    </div>
  );
}