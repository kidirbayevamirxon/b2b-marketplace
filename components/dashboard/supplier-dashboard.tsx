'use client'

import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Label,
  Pie,
  PieChart,
  XAxis,
} from 'recharts'
import {
  Boxes,
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
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
import {
  supplierCategoryMix,
  supplierInventory,
  supplierRecentOrders,
  supplierSales,
  supplierTopCustomers,
} from '@/lib/dashboard-data'

const salesConfig = {
  revenue: { label: 'Revenue', color: 'var(--chart-1)' },
} satisfies ChartConfig

const mixConfig = {
  value: { label: 'Share' },
  components: { label: 'Components', color: 'var(--chart-1)' },
  packaging: { label: 'Packaging', color: 'var(--chart-2)' },
  raw: { label: 'Raw Material', color: 'var(--chart-3)' },
  tooling: { label: 'Tooling', color: 'var(--chart-4)' },
} satisfies ChartConfig

const performance = [
  { label: 'On-time delivery', value: 96 },
  { label: 'Order accuracy', value: 99 },
  { label: 'Quality acceptance', value: 94 },
  { label: 'Response SLA', value: 88 },
]

export function SupplierDashboard() {
  const totalProducts = supplierCategoryMix.reduce((a, b) => a + b.value, 0)
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Supplier overview"
        subtitle="Track revenue, orders, and inventory health across Vanta Industrial Co."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Total revenue" value={formatCurrency(3466000, true)} change={18.2} icon={DollarSign} caption="vs. last year" />
        <KpiCard label="Total orders" value={formatNumber(5855)} change={12.4} icon={ShoppingCart} caption="701 this month" />
        <KpiCard label="Active products" value="342" change={4.8} icon={Package} caption="28 low stock" />
        <KpiCard label="Avg. order value" value={formatCurrency(592)} change={-2.1} icon={TrendingUp} caption="per order" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="glass lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly sales</CardTitle>
            <CardDescription>Gross revenue across all channels</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={salesConfig} className="h-[280px] w-full">
              <AreaChart data={supplierSales} margin={{ left: 4, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} className="text-xs" />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      formatter={(value) => formatCurrency(Number(value))}
                    />
                  }
                />
                <Area
                  dataKey="revenue"
                  type="monotone"
                  fill="url(#fillRevenue)"
                  stroke="var(--color-revenue)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Sales by category</CardTitle>
            <CardDescription>Revenue mix this quarter</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={mixConfig} className="mx-auto aspect-square h-[200px]">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie data={supplierCategoryMix} dataKey="value" nameKey="category" innerRadius={58} strokeWidth={4} stroke="var(--card)">
                  {supplierCategoryMix.map((entry) => (
                    <Cell key={entry.category} fill={entry.fill} />
                  ))}
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                        return (
                          <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                            <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-2xl font-semibold">
                              {totalProducts}%
                            </tspan>
                            <tspan x={viewBox.cx} y={(viewBox.cy ?? 0) + 20} className="fill-muted-foreground text-xs">
                              tracked
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
            <div className="mt-2 flex flex-col gap-2">
              {supplierCategoryMix.map((c) => (
                <div key={c.category} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <span className="size-2.5 rounded-full" style={{ background: c.fill }} />
                    {c.category}
                  </span>
                  <span className="font-medium tabular-nums">{c.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="glass lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <div className="flex flex-col gap-1.5">
              <CardTitle>Recent orders</CardTitle>
              <CardDescription>Latest purchase orders from buyers</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              View all
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {supplierRecentOrders.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell className="font-medium">{o.id}</TableCell>
                    <TableCell className="text-muted-foreground">{o.customer}</TableCell>
                    <TableCell className="text-right tabular-nums">{formatCurrency(o.total)}</TableCell>
                    <TableCell><StatusBadge status={o.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Performance metrics</CardTitle>
            <CardDescription>Rolling 30-day fulfillment</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            {performance.map((p) => (
              <div key={p.label} className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{p.label}</span>
                  <span className="font-medium tabular-nums">{p.value}%</span>
                </div>
                <Progress value={p.value} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="glass lg:col-span-2">
          <CardHeader>
            <CardTitle>Inventory status</CardTitle>
            <CardDescription>Stock levels vs. reorder thresholds</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>SKU</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">In stock</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {supplierInventory.map((i) => (
                  <TableRow key={i.sku}>
                    <TableCell className="font-mono text-xs text-muted-foreground">{i.sku}</TableCell>
                    <TableCell className="font-medium">{i.name}</TableCell>
                    <TableCell className="text-right tabular-nums">{formatNumber(i.stock)}</TableCell>
                    <TableCell><StatusBadge status={i.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Top customers</CardTitle>
            <CardDescription>By spend this year</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {supplierTopCustomers.map((c) => (
              <div key={c.name} className="flex items-center gap-3">
                <Avatar className="size-9">
                  <AvatarFallback className="bg-secondary text-xs font-medium">
                    {c.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-sm font-medium">{c.name}</span>
                  <span className="text-xs text-muted-foreground">{c.orders} orders</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium tabular-nums">{formatCurrency(c.spend, true)}</span>
                  <span className={c.change >= 0 ? 'text-xs text-success' : 'text-xs text-destructive'}>
                    {c.change >= 0 ? '+' : ''}{c.change}%
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
