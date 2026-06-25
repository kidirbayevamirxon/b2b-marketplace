import {
  Boxes,
  BarChart3,
  Building2,
  CreditCard,
  Factory,
  Heart,
  LayoutDashboard,
  LifeBuoy,
  Package,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Store,
  Truck,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react'
import type { Role } from '@/lib/dashboard-data'

export interface NavItem {
  label: string
  icon: LucideIcon
  badge?: string
  active?: boolean
}

export interface NavGroup {
  title: string
  items: NavItem[]
}

export const navByRole: Record<Role, NavGroup[]> = {
  supplier: [
    {
      title: 'Workspace',
      items: [
        { label: 'Dashboard', icon: LayoutDashboard, active: true },
        { label: 'Orders', icon: ShoppingCart, badge: '14' },
        { label: 'Products', icon: Package },
        { label: 'Inventory', icon: Boxes },
      ],
    },
    {
      title: 'Insights',
      items: [
        { label: 'Analytics', icon: BarChart3 },
        { label: 'Customers', icon: Users },
        { label: 'Payouts', icon: Wallet },
      ],
    },
  ],
  store: [
    {
      title: 'Workspace',
      items: [
        { label: 'Dashboard', icon: LayoutDashboard, active: true },
        { label: 'Purchases', icon: ShoppingCart, badge: '5' },
        { label: 'Suppliers', icon: Factory },
        { label: 'Favorites', icon: Heart },
      ],
    },
    {
      title: 'Insights',
      items: [
        { label: 'Spending', icon: BarChart3 },
        { label: 'Deliveries', icon: Truck },
        { label: 'Billing', icon: CreditCard },
      ],
    },
  ],
  admin: [
    {
      title: 'Platform',
      items: [
        { label: 'Overview', icon: LayoutDashboard, active: true },
        { label: 'Suppliers', icon: Factory },
        { label: 'Stores', icon: Store },
        { label: 'Products', icon: Package },
        { label: 'Orders', icon: ShoppingCart, badge: '212' },
      ],
    },
    {
      title: 'Operations',
      items: [
        { label: 'Logistics', icon: Truck },
        { label: 'Revenue', icon: Wallet },
        { label: 'Compliance', icon: ShieldCheck },
        { label: 'Organizations', icon: Building2 },
      ],
    },
  ],
}

export const bottomNav: NavItem[] = [
  { label: 'Settings', icon: Settings },
  { label: 'Support', icon: LifeBuoy },
]
