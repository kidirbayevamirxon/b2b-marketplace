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
  Activity,
  DollarSign,
  Factory,
  Package,
  ShoppingCart,
  Store,
  Truck,
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
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { Progress } from '@/components/ui/progress'
import { KpiCard } from './kpi-card'
import { PageHeader } from './page-header'
import { StatusBadge } from './status-badge'
import { formatCurrency, formatNumber } from '@/lib/format'
import {
  adminGrowth,
  adminRegions,
  adminSystemHealth,
  adminTopFirmas,
} from '@/lib/dashboard-data'

const growthConfig = {
  suppliers: { label: 'Suppliers', color: 'var(--chart-1)' },
  stores: { label: 'Stores', color: 'var(--chart-3)' },
} satisfies ChartConfig

const regionConfig = {
  value: { label: 'Share' },
  na: { label: 'North America', color: 'var(--chart-1)' },
  eu: { label: 'Europe', color: 'var(--chart-2)' },
  apac: { label: 'Asia Pacific', color: 'var(--chart-3)' },
  row: { label: 'Rest of World', color: 'var(--chart-4)' },
} satisfies ChartConfig

export function AdminDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Platform overview"
        subtitle="Marketplace-wide health, growth, and operations across the Nexus network."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <KpiCard label="Total suppliers" value={formatNumber(1574)} change={8.4} icon={Factory} />
        <KpiCard label="Total stores" value={formatNumber(6640)} change={11.2} icon={Store} />
        <KpiCard label="Total products" value={formatNumber(284000, true)} change={6.1} icon={Package} />
        <KpiCard label="Total orders" value={formatNumber(1290000, true)} change={15.7} icon={ShoppingCart} />
        <KpiCard label="Marketplace GMV" value={formatCurrency(72000000, true)} change={19.3} icon={DollarSign} />
        <KpiCard label="Active deliveries" value={formatNumber(8412)} change={3.5} icon={Truck} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="glass lg:col-span-2">
          <CardHeader>
            <CardTitle>Network growth</CardTitle>
            <CardDescription>Suppliers and stores onboarded over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={growthConfig} className="h-[280px] w-full">
              <AreaChart data={adminGrowth} margin={{ left: 4, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="fillSuppliers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-suppliers)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--color-suppliers)" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="fillStores" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-stores)" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="var(--color-stores)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} className="text-xs" />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Area dataKey="stores" type="monotone" fill="url(#fillStores)" stroke="var(--color-stores)" strokeWidth={2} />
                <Area dataKey="suppliers" type="monotone" fill="url(#fillSuppliers)" stroke="var(--color-suppliers)" strokeWidth={2} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle>Revenue by region</CardTitle>
            <CardDescription>GMV distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={regionConfig} className="mx-auto aspect-square h-[200px]">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie data={adminRegions} dataKey="value" nameKey="region" innerRadius={58} strokeWidth={4} stroke="var(--card)">
                  {adminRegions.map((entry) => (
                    <Cell key={entry.region} fill={entry.fill} />
                  ))}
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                        return (
                          <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                            <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-2xl font-semibold">
                              $72M
                            </tspan>
                            <tspan x={viewBox.cx} y={(viewBox.cy ?? 0) + 20} className="fill-muted-foreground text-xs">
                              total GMV
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
              {adminRegions.map((r) => (
                <div key={r.region} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <span className="size-2.5 rounded-full" style={{ background: r.fill }} />
                    {r.region}
                  </span>
                  <span className="font-medium tabular-nums">{r.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="glass lg:col-span-2">
          <CardHeader>
            <CardTitle>Top firmas</CardTitle>
            <CardDescription>By gross merchandise value</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Supplier</TableHead>
                  <TableHead className="text-right">GMV</TableHead>
                  <TableHead className="text-right">Stores</TableHead>
                  <TableHead className="w-32">Health</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {adminTopFirmas.map((s) => (
                  <TableRow key={s.name}>
                    <TableCell className="font-medium">{s.name}</TableCell>
                    <TableCell className="text-right tabular-nums">{formatCurrency(s.gmv, true)}</TableCell>
                    <TableCell className="text-right tabular-nums text-muted-foreground">{s.stores}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={s.health} className="h-1.5" />
                        <span className="w-9 text-right text-xs tabular-nums text-muted-foreground">{s.health}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex-row items-center justify-between">
            <div className="flex flex-col gap-1.5">
              <CardTitle>System health</CardTitle>
              <CardDescription>Live service monitoring</CardDescription>
            </div>
            <span className="flex items-center gap-1.5 text-xs text-success">
              <Activity className="size-3.5" /> All systems
            </span>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {adminSystemHealth.map((s) => (
              <div key={s.service} className="flex items-center justify-between rounded-lg border border-border/50 bg-secondary/30 px-3 py-2.5">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{s.service}</span>
                  <span className="text-xs text-muted-foreground">{s.uptime}% uptime · {s.latency}ms</span>
                </div>
                <StatusBadge status={s.status} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
