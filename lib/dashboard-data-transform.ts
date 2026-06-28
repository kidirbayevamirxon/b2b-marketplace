import { AdminDashboardStats } from "./admin-dashboard";


// Transform summary data to KPI card format
export function transformSummaryToKpis(data: AdminDashboardStats) {
  return {
    totalSuppliers: data.summary.firmalar_total || 0,
    totalStores: data.summary.markets_total || 0,
    totalProducts: data.summary.products_total || 0,
    totalOrders: data.summary.orders_total || 0,
    totalRevenue: data.summary.revenue_total || 0,
    pendingOrders: data.summary.pending_orders_total || 0,
  };
}

// Generate growth data from orders (mock for now since API doesn't provide historical data)
// In production, you'd want a separate endpoint for time-series data
export function generateGrowthData(orders: any[]) {
  // This is a mock - ideally you'd have historical data from API
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const totalOrders = orders.length || 0;
  
  return months.map((month, index) => ({
    month,
    suppliers: Math.floor((index + 1) * 2), // Mock growth
    stores: Math.floor((index + 1) * 4), // Mock growth
  }));
}

// Transform region data (mock since API doesn't provide this)
export function getRegionData() {
  return [
    { region: 'North America', value: 34, fill: 'var(--chart-1)' },
    { region: 'Europe', value: 28, fill: 'var(--chart-2)' },
    { region: 'Asia Pacific', value: 24, fill: 'var(--chart-3)' },
    { region: 'Rest of World', value: 14, fill: 'var(--chart-4)' },
  ];
}

// Transform top firms from orders data
export function getTopFirmas(orders: any[]) {
  const firmaMap = new Map();
  
  orders.forEach(order => {
    if (!firmaMap.has(order.firma_id)) {
      firmaMap.set(order.firma_id, {
        name: order.firma_name,
        gmv: 0,
        stores: new Set(),
        health: 85 + Math.floor(Math.random() * 15), // Mock health score
      });
    }
    
    const firma = firmaMap.get(order.firma_id);
    firma.gmv += order.total_price;
    firma.stores.add(order.store_name);
  });
  
  return Array.from(firmaMap.values())
    .map(f => ({
      ...f,
      stores: f.stores.size,
    }))
    .sort((a, b) => b.gmv - a.gmv)
    .slice(0, 5);
}

// Transform system health (mock)
export function getSystemHealth() {
  return [
    { service: 'API Gateway', status: 'online', uptime: 99.97, latency: 12 },
    { service: 'Order Service', status: 'online', uptime: 99.95, latency: 8 },
    { service: 'Payment Service', status: 'online', uptime: 99.99, latency: 15 },
    { service: 'Notification Service', status: 'online', uptime: 98.50, latency: 22 },
  ];
}