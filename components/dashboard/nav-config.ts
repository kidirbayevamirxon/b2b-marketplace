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
  User,
} from 'lucide-react'
import type { Role } from '@/lib/dashboard-data'

export interface NavItem {
  label: string;
  icon: LucideIcon;
  href: string;
  badge?: string;
  active?: boolean;
}

export interface NavGroup {
  title: string
  items: NavItem[]
}

export const navByRole: Record<Role, NavGroup[]> = {
  firma: [
    {
      title: 'Workspace',
      items: [
        { label: 'Dashboard', icon: LayoutDashboard, href: "/dashboard", active: true },
        { label: 'Orders', icon: ShoppingCart, href: "/dashboard/orders", badge: '14' },
        { label: 'Products', icon: Package, href: "/dashboard/products" },
        { label: 'Inventory', icon: Boxes, href: "/dashboard/inventory" },
      ],
    },
    {
      title: 'Insights',
      items: [
        { label: 'Analytics', icon: BarChart3, href: "/dashboard/analytics" },

      ],
    },
  ],
  market: [
  {
    title: "Workspace",
    items: [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        active: true,
      },
      {
        label: "Purchases",
        icon: ShoppingCart,
        href: "/dashboard/purchases",
      },
      {
        label: "Suppliers",
        icon: Factory,
        href: "/dashboard/suppliers",
      },
    ],
  },
],
  admin: [
  {
    title: "Platform",
    items: [
      {
        label: "Overview",
        icon: LayoutDashboard,
        href: "/dashboard",
        active: true,
      },
      {
        label: "Suppliers",
        icon: Factory,
        href: "/dashboard/suppliers",
      },
      {
        label: "Stores",
        icon: Store,
        href: "/dashboard/stores",
      },
      {
        label: "Products",
        icon: Package,
        href: "/dashboard/products",
      },
    ],
  },
],
}

export const bottomNav: NavItem[] = [
  {
    label: "Profile",
    icon: User,
    href: "/dashboard/profile",
  },
  {
    label: "Support",
    icon: LifeBuoy,
    href: "/dashboard/support",
  },
];