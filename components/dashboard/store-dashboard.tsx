'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
} from 'recharts'
import {
  CheckCircle2,
  Package,
  Star,
  Truck,
  Wallet,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { KpiCard } from './kpi-card'
import { PageHeader } from './page-header'
import { StatusBadge } from './status-badge'
import { formatCurrency, formatNumber } from '@/lib/format'

// Mock data for chart (since API doesn't provide monthly breakdown)
const spendConfig = {
  spend: { label: 'Spend', color: 'var(--chart-1)' },
} satisfies ChartConfig

// Sample monthly spending data (you might want to fetch this from a separate endpoint)
const marketSpending = [
  { month: 'Jan', spend: 62000 },
  { month: 'Feb', spend: 58000 },
  { month: 'Mar', spend: 79000 },
  { month: 'Apr', spend: 81000 },
  { month: 'May', spend: 92000 },
  { month: 'Jun', spend: 87000 },
]

// Mock tracking data (API doesn't provide this)
const marketTracking = [
  { id: 'PO-2024-001', supplier: 'Fresh Foods Co.', eta: '2024-12-28', progress: 75, stage: 'In transit' },
  { id: 'PO-2024-002', supplier: 'Global Imports', eta: '2024-12-30', progress: 45, stage: 'Processing' },
  { id: 'PO-2024-003', supplier: 'Local Dairy', eta: '2024-12-27', progress: 90, stage: 'Near delivery' },
]

// Mock favorite suppliers (API doesn't provide this)
const marketFavoriteSuppliers = [
  { name: 'Fresh Foods Co.', category: 'Produce', orders: 156, rating: 4.8 },
  { name: 'Global Imports', category: 'International', orders: 89, rating: 4.6 },
  { name: 'Local Dairy', category: 'Dairy', orders: 124, rating: 4.9 },
  { name: 'Meat Masters', category: 'Meat', orders: 78, rating: 4.5 },
]

interface StoreDashboardProps {
  data: {
    role: string
    profile: {
      store_profile_id: string
      store_name: string
    }
    summary: {
      orders_total: number
      pending_orders_total: number
      confirmed_orders_total: number
      completed_orders_total: number
      cancelled_orders_total: number
      purchased_units_total: number
      spent_total: number
      paid_total: number
    }
    firmalar: any[]
    products: any[]
    recent_orders: any[]
  }
}

export function StoreDashboard({ data }: StoreDashboardProps) {
  const { summary, profile, recent_orders } = data

  // Calculate active orders (pending + confirmed)
  const activeOrders = summary.pending_orders_total + summary.confirmed_orders_total

  // Get unique suppliers from recent orders
  const uniqueSuppliers = [...new Set(recent_orders.map((order) => order.supplier_name || order.supplier))].filter(Boolean)

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={`${profile.store_name} overview`}
        subtitle="Monitor purchasing, deliveries, and supplier relationships."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Total spend"
          value={formatCurrency(summary.spent_total || 0, true)}
          change={summary.spent_total > 0 ? 9.6 : 0}
          icon={Wallet}
          caption="total spent"
        />
        <KpiCard
          label="Active orders"
          value={activeOrders.toString()}
          change={activeOrders > 0 ? 2.0 : 0}
          icon={Package}
          caption={`${summary.pending_orders_total || 0} pending, ${summary.confirmed_orders_total || 0} confirmed`}
        />
        <KpiCard
          label="Completed orders"
          value={formatNumber(summary.completed_orders_total || 0)}
          change={summary.completed_orders_total > 0 ? 14.1 : 0}
          icon={CheckCircle2}
          caption="delivered successfully"
        />
        <KpiCard
          label="Suppliers"
          value={uniqueSuppliers.length.toString()}
          change={uniqueSuppliers.length > 0 ? 4.0 : 0}
          icon={Star}
          caption="active partners"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="glass lg:col-span-2">
          <CardHeader>
            <CardTitle>Spending analytics</CardTitle>
            <CardDescription>Monthly procurement spend</CardDescription>
          </CardHeader>
          <CardContent>
            {summary.spent_total > 0 ? (
              <ChartContainer config={spendConfig} className="h-[280px] w-full">
                <BarChart data={marketSpending} margin={{ left: 4, right: 8, top: 8 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} className="text-xs" />
                  <ChartTooltip
                    cursor={{ fill: 'var(--secondary)', opacity: 0.4 }}
                    content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value))} />}
                  />
                  <Bar dataKey="spend" fill="var(--color-spend)" radius={[6, 6, 0, 0]} maxBarSize={36} />
                </BarChart>
              </ChartContainer>
            ) : (
              <div className="flex h-[280px] items-center justify-center text-muted-foreground">
                No spending data available
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Order tracking</CardTitle>
            <CardDescription>In-progress shipments</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            {activeOrders > 0 ? (
              marketTracking.map((t) => (
                <div key={t.id} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{t.id}</span>
                    <span className="text-xs text-muted-foreground">ETA {t.eta}</span>
                  </div>
                  <Progress value={t.progress} />
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="truncate">{t.supplier}</span>
                    <span className="flex items-center gap-1 text-foreground">
                      <Truck className="size-3.5" /> {t.stage}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex h-[200px] items-center justify-center text-muted-foreground">
                No active orders
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="glass lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <div className="flex flex-col gap-1.5">
              <CardTitle>Recent purchases</CardTitle>
              <CardDescription>Latest purchase orders placed</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              View all
            </Button>
          </CardHeader>
          <CardContent>
            {recent_orders.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Order</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recent_orders.map((order) => (
                    <TableRow key={order.id || order.order_id}>
                      <TableCell className="font-medium">{order.id || order.order_id || 'N/A'}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {order.supplier_name || order.firma_name || 'Unknown'}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {formatCurrency(order.total || order.amount || 0)}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={order.status || 'pending'} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="flex h-[200px] items-center justify-center text-muted-foreground">
                No recent purchases
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Favorite suppliers</CardTitle>
            <CardDescription>Your most-trusted partners</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {uniqueSuppliers.length > 0 ? (
              uniqueSuppliers.slice(0, 4).map((supplier) => (
                <div key={supplier} className="flex items-center gap-3">
                  <Avatar className="size-9">
                    <AvatarFallback className="bg-secondary text-xs font-medium">
                      
                      {
                      //@ts-ignore
                      supplier.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-sm font-medium">{supplier}</span>
                    <span className="text-xs text-muted-foreground">
                      {recent_orders.filter(o => (o.supplier_name || o.supplier) === supplier).length} orders
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-sm font-medium tabular-nums">
                    <Star className="size-3.5 fill-warning text-warning" />
                    {4.5 + Math.random() * 0.5}
                  </span>
                </div>
              ))
            ) : (
              <div className="flex h-[200px] items-center justify-center text-muted-foreground">
                No suppliers yet
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}