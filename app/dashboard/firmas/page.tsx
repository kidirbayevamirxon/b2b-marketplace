'use client';

import { useEffect, useState } from 'react';
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Shield,
  Store,
  Phone,
  Building2,
  Truck,
  Check,
  X,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/dashboard/page-header';
import {
  fetchFirmas,
  toggleFirmaStatus,
  verifyFirma,
  Firma,
} from '@/lib/firmas';

const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

export default function FirmasPage() {
  const [firmas, setFirmas] = useState<Firma[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [filterVerified, setFilterVerified] = useState<'all' | 'verified' | 'unverified'>('all');
  const [filterDelivery, setFilterDelivery] = useState<'all' | 'available' | 'unavailable'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalFirmas, setTotalFirmas] = useState(0);
  const [selectedFirma, setSelectedFirma] = useState<Firma | null>(null);
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [showVerifyDialog, setShowVerifyDialog] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const { toast } = useToast();

  const loadFirmas = async (page: number = 1) => {
    try {
      setLoading(true);
      const data = await fetchFirmas(page);
      setFirmas(data.firmalar);
      setTotalPages(data.pages);
      setTotalFirmas(data.total);
      setCurrentPage(data.page);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load firms. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFirmas();
  }, []);

  const handleToggleStatus = (firma: Firma) => {
    setSelectedFirma(firma);
    setShowStatusDialog(true);
  };

  const handleVerify = (firma: Firma) => {
    setSelectedFirma(firma);
    setShowVerifyDialog(true);
  };

  const confirmToggleStatus = async () => {
    if (!selectedFirma) return;
    
    try {
      setActionLoading(true);
      await toggleFirmaStatus(selectedFirma.id, !selectedFirma.is_active);
      
      toast({
        title: 'Success',
        description: `Firm ${selectedFirma.is_active ? 'deactivated' : 'activated'} successfully.`,
      });
      
      await loadFirmas(currentPage);
      setShowStatusDialog(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update firm status. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setActionLoading(false);
      setSelectedFirma(null);
    }
  };

  const confirmVerify = async () => {
    if (!selectedFirma) return;
    
    try {
      setActionLoading(true);
      await verifyFirma(selectedFirma.id);
      
      toast({
        title: 'Success',
        description: 'Firm verified successfully.',
      });
      
      await loadFirmas(currentPage);
      setShowVerifyDialog(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to verify firm. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setActionLoading(false);
      setSelectedFirma(null);
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
  };

  // Filter firms based on search and filters
  const filteredFirmas = firmas.filter((firma) => {
    const matchesSearch = 
      firma.firma_profile.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      firma.owner_first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      firma.owner_last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      firma.phone.includes(searchTerm) ||
      firma.login.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      filterStatus === 'all' || 
      (filterStatus === 'active' && firma.is_active) ||
      (filterStatus === 'inactive' && !firma.is_active);
    
    const matchesVerified =
      filterVerified === 'all' ||
      (filterVerified === 'verified' && firma.is_verified) ||
      (filterVerified === 'unverified' && !firma.is_verified);

    const matchesDelivery =
      filterDelivery === 'all' ||
      (filterDelivery === 'available' && firma.firma_profile.delivery_available) ||
      (filterDelivery === 'unavailable' && !firma.firma_profile.delivery_available);
    
    return matchesSearch && matchesStatus && matchesVerified && matchesDelivery;
  });

  // Pagination controls
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      loadFirmas(page);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Firms"
          subtitle="Manage all supplier firms on the platform"
        />
        
        <Card className="glass">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>All Firms</CardTitle>
                <CardDescription>Loading firms...</CardDescription>
              </div>
            
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <Skeleton className="h-10 w-full max-w-sm" />
                <div className="flex gap-2">
                  <Skeleton className="h-10 w-32" />
                  <Skeleton className="h-10 w-32" />
                </div>
              </div>
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
        title="Firms"
        subtitle="Manage all supplier firms on the platform"
        
      />

      <Card className="glass">
        <CardHeader>
          <CardTitle>All Firms</CardTitle>
          <CardDescription>
            {totalFirmas} firm{totalFirmas !== 1 ? 's' : ''} on the platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search firms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Select
                  value={filterStatus}
                  //@ts-ignore
                  onValueChange={(value: 'all' | 'active' | 'inactive') => setFilterStatus(value)}
                >
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={filterVerified}
                  //@ts-ignore
                  onValueChange={(value: 'all' | 'verified' | 'unverified') => setFilterVerified(value)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Verified" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="unverified">Unverified</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={filterDelivery}
                  //@ts-ignore
                  onValueChange={(value: 'all' | 'available' | 'unavailable') => setFilterDelivery(value)}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Delivery" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="unavailable">Unavailable</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Verification</TableHead>
                    <TableHead>Delivery</TableHead>
                    <TableHead>Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFirmas.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-muted-foreground">
                        {searchTerm || filterStatus !== 'all' || filterVerified !== 'all' || filterDelivery !== 'all'
                          ? 'No firms match your filters'
                          : 'No firms found'}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredFirmas.map((firma) => (
                      <TableRow key={firma.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-primary/10 text-primary">
                                <Building2 className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{firma.firma_profile.company_name}</div>
                              <div className="text-xs text-muted-foreground">
                                {firma.firma_profile.min_order_amount 
                                  ? `Min order: $${firma.firma_profile.min_order_amount}`
                                  : 'No minimum order'}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="bg-secondary text-xs">
                                {getInitials(firma.owner_first_name, firma.owner_last_name)}
                              </AvatarFallback>
                            </Avatar>
                            <span>
                              {firma.owner_first_name} {firma.owner_last_name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-sm">{firma.phone}</span>
                            <span className="text-xs text-muted-foreground">{firma.login}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={firma.is_active ? 'default' : 'secondary'}
                            className={firma.is_active ? 'bg-green-500/10 text-green-500' : ''}
                          >
                            {firma.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {firma.is_verified ? (
                            <Badge variant="outline" className="border-green-500/20 bg-green-500/10 text-green-500">
                              <Check className="mr-1 h-3 w-3" />
                              Verified
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="border-yellow-500/20 bg-yellow-500/10 text-yellow-500">
                              <X className="mr-1 h-3 w-3" />
                              Unverified
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={firma.firma_profile.delivery_available ? 'default' : 'secondary'}
                            className={firma.firma_profile.delivery_available ? 'bg-blue-500/10 text-blue-500' : ''}
                          >
                            <Truck className="mr-1 h-3 w-3" />
                            {firma.firma_profile.delivery_available ? 'Available' : 'Unavailable'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-sm">
                              {formatDate(firma.created_at)}
                            </span>
                          </div>
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

      {/* Status Toggle Dialog */}
      <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedFirma?.is_active ? 'Deactivate' : 'Activate'} Firm
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to {selectedFirma?.is_active ? 'deactivate' : 'activate'}{' '}
              "{selectedFirma?.firma_profile.company_name}"? 
              {selectedFirma?.is_active 
                ? ' This will prevent them from selling products.' 
                : ' This will allow them to sell products again.'}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowStatusDialog(false)}
              disabled={actionLoading}
            >
              Cancel
            </Button>
            <Button
              variant={selectedFirma?.is_active ? 'destructive' : 'default'}
              onClick={confirmToggleStatus}
              disabled={actionLoading}
            >
              {actionLoading ? 'Processing...' : 'Confirm'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Verify Dialog */}
      <Dialog open={showVerifyDialog} onOpenChange={setShowVerifyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Firm</DialogTitle>
            <DialogDescription>
              Are you sure you want to verify "{selectedFirma?.firma_profile.company_name}"?
              This will mark the firm as verified and trusted.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowVerifyDialog(false)}
              disabled={actionLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={confirmVerify}
              disabled={actionLoading}
            >
              {actionLoading ? 'Processing...' : 'Verify Firm'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}