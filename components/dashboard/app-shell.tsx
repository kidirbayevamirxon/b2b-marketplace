'use client'

import { useEffect, useState } from 'react'
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from '@/components/ui/sheet'
import { SidebarNav } from './sidebar-nav'
import { Topbar } from './topbar'
import { SupplierDashboard } from './supplier-dashboard'
import { StoreDashboard } from './store-dashboard'
import { AdminDashboard } from './admin-dashboard'
import type { Role } from '@/lib/dashboard-data'

export function AppShell() {
  const [role, setRole] = useState<Role>('supplier')
  const [isDark, setIsDark] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', isDark)
  }, [isDark])

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border/60 bg-sidebar lg:block">
        <SidebarNav role={role} />
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-72 bg-sidebar p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SidebarNav role={role} onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="flex min-w-0 flex-1 flex-col lg:pl-64">
        <Topbar
          role={role}
          onRoleChange={setRole}
          isDark={isDark}
          onToggleTheme={() => setIsDark((v) => !v)}
          onOpenMobileNav={() => setMobileOpen(true)}
        />
        <main className="flex-1 px-4 py-6 lg:px-6 lg:py-8">
          {role === 'supplier' && <SupplierDashboard />}
          {role === 'store' && <StoreDashboard />}
          {role === 'admin' && <AdminDashboard />}
        </main>
      </div>
    </div>
  )
}
