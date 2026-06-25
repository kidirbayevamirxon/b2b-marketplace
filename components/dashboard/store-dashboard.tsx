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
import {
  storeFavoriteSuppliers,
  storeRecentPurchases,
  storeSpending,
  storeTracking,
} from '@/lib/dashboard-data'

const spendConfig = {
  spend: { label: 'Spend', color: 'var(--chart-1)' },
} satisfies ChartConfig

export function StoreDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Store overview"
        subtitle="Monitor purchasing, deliveries, and supplier relationships for Northgate Retail Group."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Total spend" value={formatCurrency(764700, true)} change={9.6} icon={Wallet} caption="vs. last year" />
        <KpiCard label="Active orders" value="5" change={2.0} icon={Package} caption="3 in transit" />
        <KpiCard label="Delivered orders" value={formatNumber(1284)} change={14.1} icon={CheckCircle2} caption="this year" />
        <KpiCard label="Favorite suppliers" value="12" change={4.0} icon={Star} caption="4 top-rated" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="glass lg:col-span-2">
          <CardHeader>
            <CardTitle>Spending analytics</CardTitle>
            <CardDescription>Monthly procurement spend</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={spendConfig} className="h-[280px] w-full">
              <BarChart data={storeSpending} margin={{ left: 4, right: 8, top: 8 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} className="text-xs" />
                <ChartTooltip
                  cursor={{ fill: 'var(--secondary)', opacity: 0.4 }}
                  content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value))} />}
                />
                <Bar dataKey="spend" fill="var(--color-spend)" radius={[6, 6, 0, 0]} maxBarSize={36} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Order tracking</CardTitle>
            <CardDescription>In-progress shipments</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            {storeTracking.map((t) => (
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
            ))}
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
                {storeRecentPurchases.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.id}</TableCell>
                    <TableCell className="text-muted-foreground">{p.supplier}</TableCell>
                    <TableCell className="text-right tabular-nums">{formatCurrency(p.total)}</TableCell>
                    <TableCell><StatusBadge status={p.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Favorite suppliers</CardTitle>
            <CardDescription>Your most-trusted partners</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {storeFavoriteSuppliers.map((s) => (
              <div key={s.name} className="flex items-center gap-3">
                <Avatar className="size-9">
                  <AvatarFallback className="bg-secondary text-xs font-medium">
                    {s.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-sm font-medium">{s.name}</span>
                  <span className="text-xs text-muted-foreground">{s.category} · {s.orders} orders</span>
                </div>
                <span className="flex items-center gap-1 text-sm font-medium tabular-nums">
                  <Star className="size-3.5 fill-warning text-warning" />
                  {s.rating}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
