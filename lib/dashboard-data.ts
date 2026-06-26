export type Role = 'firma' | 'market' | 'admin'

export const roleMeta: Record<
  Role,
  { title: string; label: string; tagline: string; person: string; org: string; initials: string }
> = {
  firma: {
    title: 'Firma',
    label: 'Firma',
    tagline: 'Manufacturer workspace',
    person: 'Marcus Chen',
    org: 'Vanta Industrial Co.',
    initials: 'MC',
  },
  market: {
    title: 'Market',
    label: 'Market',
    tagline: 'Retail buyer workspace',
    person: 'Sofia Reyes',
    org: 'Northgate Retail Group',
    initials: 'SR',
  },
  admin: {
    title: 'Super Admin',
    label: 'Super Admin',
    tagline: 'Platform operations',
    person: 'Avery Okafor',
    org: 'Nexus Platform',
    initials: 'AO',
  },
}

/* ---------------- Firma ---------------- */

export const firmaSales = [
  { month: 'Jan', revenue: 184000, orders: 320 },
  { month: 'Feb', revenue: 212000, orders: 372 },
  { month: 'Mar', revenue: 198000, orders: 341 },
  { month: 'Apr', revenue: 246000, orders: 418 },
  { month: 'May', revenue: 273000, orders: 462 },
  { month: 'Jun', revenue: 251000, orders: 430 },
  { month: 'Jul', revenue: 298000, orders: 504 },
  { month: 'Aug', revenue: 324000, orders: 548 },
  { month: 'Sep', revenue: 312000, orders: 521 },
  { month: 'Oct', revenue: 358000, orders: 596 },
  { month: 'Nov', revenue: 389000, orders: 642 },
  { month: 'Dec', revenue: 421000, orders: 701 },
]

export const firmaCategoryMix = [
  { category: 'Components', value: 42, fill: 'var(--color-components)' },
  { category: 'Packaging', value: 26, fill: 'var(--color-packaging)' },
  { category: 'Raw Material', value: 19, fill: 'var(--color-raw)' },
  { category: 'Tooling', value: 13, fill: 'var(--color-tooling)' },
]

export const firmaTopCustomers = [
  { name: 'Northgate Retail Group', orders: 184, spend: 412800, change: 12.4 },
  { name: 'Meridian Stores', orders: 142, spend: 318400, change: 8.1 },
  { name: 'Harbor & Co.', orders: 121, spend: 274900, change: -3.2 },
  { name: 'Lumen Markets', orders: 98, spend: 221500, change: 5.6 },
  { name: 'Civic Supply', orders: 76, spend: 168200, change: 2.9 },
]

export const firmaRecentOrders = [
  { id: 'ORD-90412', customer: 'Northgate Retail Group', items: 24, total: 18420, status: 'Processing', date: 'Jun 24' },
  { id: 'ORD-90408', customer: 'Meridian Stores', items: 12, total: 9240, status: 'Shipped', date: 'Jun 24' },
  { id: 'ORD-90401', customer: 'Harbor & Co.', items: 36, total: 27600, status: 'Delivered', date: 'Jun 23' },
  { id: 'ORD-90396', customer: 'Lumen Markets', items: 8, total: 5120, status: 'Pending', date: 'Jun 23' },
  { id: 'ORD-90388', customer: 'Civic Supply', items: 18, total: 13380, status: 'Delivered', date: 'Jun 22' },
  { id: 'ORD-90377', customer: 'Atlas Wholesale', items: 42, total: 31900, status: 'Cancelled', date: 'Jun 22' },
]

export const firmaInventory = [
  { sku: 'CMP-1180', name: 'Precision Bearing Kit', stock: 1840, reorder: 500, status: 'Healthy' },
  { sku: 'PKG-4420', name: 'Recycled Mailer Box L', stock: 320, reorder: 400, status: 'Low' },
  { sku: 'RAW-0098', name: 'Aluminium Sheet 2mm', stock: 90, reorder: 250, status: 'Critical' },
  { sku: 'TOL-7731', name: 'CNC Cutter Head', stock: 612, reorder: 200, status: 'Healthy' },
]

/* ---------------- Market ---------------- */

export const marketSpending = [
  { month: 'Jan', spend: 42000 },
  { month: 'Feb', spend: 38500 },
  { month: 'Mar', spend: 51200 },
  { month: 'Apr', spend: 47800 },
  { month: 'May', spend: 56400 },
  { month: 'Jun', spend: 61900 },
  { month: 'Jul', spend: 58300 },
  { month: 'Aug', spend: 67100 },
  { month: 'Sep', spend: 72400 },
  { month: 'Oct', spend: 69800 },
  { month: 'Nov', spend: 81200 },
  { month: 'Dec', spend: 88600 },
]

export const marketFavoriteSuppliers = [
  { name: 'Vanta Industrial Co.', category: 'Components', orders: 64, rating: 4.9 },
  { name: 'Solace Packaging', category: 'Packaging', orders: 41, rating: 4.7 },
  { name: 'Terra Goods', category: 'Raw Material', orders: 33, rating: 4.8 },
  { name: 'Pinnacle Tools', category: 'Tooling', orders: 22, rating: 4.6 },
]

export const marketRecentPurchases = [
  { id: 'PO-22841', supplier: 'Vanta Industrial Co.', items: 18, total: 12480, status: 'In Transit', date: 'Jun 24' },
  { id: 'PO-22835', supplier: 'Solace Packaging', items: 40, total: 4200, status: 'Delivered', date: 'Jun 23' },
  { id: 'PO-22829', supplier: 'Terra Goods', items: 9, total: 8870, status: 'Processing', date: 'Jun 23' },
  { id: 'PO-22820', supplier: 'Pinnacle Tools', items: 6, total: 3340, status: 'Delivered', date: 'Jun 22' },
  { id: 'PO-22812', supplier: 'Lumen Supply', items: 24, total: 15600, status: 'In Transit', date: 'Jun 21' },
]

export const marketTracking = [
  { id: 'PO-22841', supplier: 'Vanta Industrial Co.', eta: 'Jun 26', progress: 72, stage: 'Out for delivery' },
  { id: 'PO-22829', supplier: 'Terra Goods', eta: 'Jun 27', progress: 45, stage: 'In transit' },
  { id: 'PO-22812', supplier: 'Lumen Supply', eta: 'Jun 28', progress: 28, stage: 'Dispatched' },
]

/* ---------------- Super Admin ---------------- */

export const adminGrowth = [
  { month: 'Jan', suppliers: 820, stores: 3100, revenue: 2.1 },
  { month: 'Feb', suppliers: 868, stores: 3320, revenue: 2.4 },
  { month: 'Mar', suppliers: 902, stores: 3560, revenue: 2.6 },
  { month: 'Apr', suppliers: 961, stores: 3880, revenue: 3.0 },
  { month: 'May', suppliers: 1024, stores: 4210, revenue: 3.4 },
  { month: 'Jun', suppliers: 1098, stores: 4520, revenue: 3.9 },
  { month: 'Jul', suppliers: 1162, stores: 4880, revenue: 4.3 },
  { month: 'Aug', suppliers: 1240, stores: 5210, revenue: 4.8 },
  { month: 'Sep', suppliers: 1318, stores: 5560, revenue: 5.2 },
  { month: 'Oct', suppliers: 1402, stores: 5910, revenue: 5.9 },
  { month: 'Nov', suppliers: 1488, stores: 6280, revenue: 6.5 },
  { month: 'Dec', suppliers: 1574, stores: 6640, revenue: 7.2 },
]

export const adminRegions = [
  { region: 'North America', value: 38, fill: 'var(--color-na)' },
  { region: 'Europe', value: 29, fill: 'var(--color-eu)' },
  { region: 'Asia Pacific', value: 24, fill: 'var(--color-apac)' },
  { region: 'Rest of World', value: 9, fill: 'var(--color-row)' },
]

export const adminTopFirmas = [
  { name: 'Vanta Industrial Co.', gmv: 4128000, stores: 184, health: 98 },
  { name: 'Solace Packaging', gmv: 3184000, stores: 142, health: 95 },
  { name: 'Terra Goods', gmv: 2749000, stores: 121, health: 91 },
  { name: 'Pinnacle Tools', gmv: 2215000, stores: 98, health: 88 },
  { name: 'Atlas Wholesale', gmv: 1682000, stores: 76, health: 82 },
]

export const adminSystemHealth = [
  { service: 'API Gateway', uptime: 99.99, latency: 84, status: 'Operational' },
  { service: 'Payments', uptime: 99.97, latency: 132, status: 'Operational' },
  { service: 'Search Index', uptime: 99.92, latency: 210, status: 'Degraded' },
  { service: 'Logistics Sync', uptime: 99.99, latency: 96, status: 'Operational' },
]

export type StatusTone = 'success' | 'info' | 'warning' | 'danger' | 'neutral'

export const statusTone: Record<string, StatusTone> = {
  Delivered: 'success',
  Operational: 'success',
  Healthy: 'success',
  Shipped: 'info',
  'In Transit': 'info',
  'Out for delivery': 'info',
  Processing: 'info',
  Dispatched: 'info',
  Pending: 'warning',
  Low: 'warning',
  Degraded: 'warning',
  Cancelled: 'danger',
  Critical: 'danger',
}
