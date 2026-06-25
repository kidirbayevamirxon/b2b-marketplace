'use client'

import { Hexagon, Sparkles } from 'lucide-react'
import { bottomNav, navByRole } from './nav-config'
import { roleMeta, type Role } from '@/lib/dashboard-data'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function SidebarNav({
  role,
  onNavigate,
}: {
  role: Role
  onNavigate?: () => void
}) {
  const groups = navByRole[role]
  const meta = roleMeta[role]

  return (
    <div className="flex h-full flex-col gap-6 px-3 py-5">
      <div className="flex items-center gap-2.5 px-2">
        <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Hexagon className="size-5" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-heading text-base font-semibold tracking-tight">
            Nexus
          </span>
          <span className="text-xs text-muted-foreground">B2B Marketplace</span>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-6 overflow-y-auto">
        {groups.map((group) => (
          <div key={group.title} className="flex flex-col gap-1">
            <p className="px-3 pb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
              {group.title}
            </p>
            {group.items.map((item) => (
              <button
                key={item.label}
                onClick={onNavigate}
                className={cn(
                  'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  item.active
                    ? 'bg-primary/12 text-primary'
                    : 'text-muted-foreground hover:bg-sidebar-accent hover:text-foreground',
                )}
              >
                <item.icon className="size-4.5 shrink-0" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge ? (
                  <span
                    className={cn(
                      'rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums',
                      item.active
                        ? 'bg-primary/20 text-primary'
                        : 'bg-muted text-muted-foreground',
                    )}
                  >
                    {item.badge}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div className="flex flex-col gap-1">
        {bottomNav.map((item) => (
          <button
            key={item.label}
            onClick={onNavigate}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
          >
            <item.icon className="size-4.5 shrink-0" />
            {item.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-primary/20 bg-primary/8 p-3.5">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-primary" />
          <p className="text-sm font-medium">Upgrade to Enterprise</p>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Unlock advanced analytics, SLAs, and priority logistics for{' '}
          {meta.org}.
        </p>
        <Button size="sm" className="mt-3 w-full">
          View plans
        </Button>
      </div>
    </div>
  )
}
