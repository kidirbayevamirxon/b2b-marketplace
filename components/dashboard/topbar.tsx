'use client'

import {
  Bell,
  Check,
  ChevronDown,
  LogOut,
  Menu,
  Moon,
  Search,
  Settings,
  Sun,
  User,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/ui/toggle-group'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { roleMeta, type Role } from '@/lib/dashboard-data'

const roles: Role[] = ['supplier', 'store', 'admin']

const notifications = [
  { title: 'New purchase order received', meta: 'Northgate Retail · 2m ago', tone: 'bg-primary' },
  { title: 'Inventory critical: Aluminium Sheet', meta: 'Warehouse 3 · 24m ago', tone: 'bg-destructive' },
  { title: 'Payout of $48,200 processed', meta: 'Finance · 1h ago', tone: 'bg-chart-3' },
  { title: 'Supplier KYC approved', meta: 'Compliance · 3h ago', tone: 'bg-warning' },
]

export function Topbar({
  role,
  onRoleChange,
  isDark,
  onToggleTheme,
  onOpenMobileNav,
}: {
  role: Role
  onRoleChange: (role: Role) => void
  isDark: boolean
  onToggleTheme: () => void
  onOpenMobileNav: () => void
}) {
  const meta = roleMeta[role]

  return (
    <header className="glass sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/60 px-4 lg:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onOpenMobileNav}
        aria-label="Open navigation"
      >
        <Menu className="size-5" />
      </Button>

      <div className="relative hidden max-w-sm flex-1 md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search orders, suppliers, SKUs…"
          className="h-9 border-border/60 bg-secondary/50 pl-9"
        />
        <kbd className="pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground lg:block">
          ⌘K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <ToggleGroup
          value={[role]}
          onValueChange={(vals) => {
            const next = vals[0] as Role | undefined
            if (next) onRoleChange(next)
          }}
          className="hidden rounded-lg border border-border/60 bg-secondary/40 p-0.5 sm:flex"
        >
          {roles.map((r) => (
            <ToggleGroupItem
              key={r}
              value={r}
              className="h-7 rounded-md px-3 text-xs data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              {roleMeta[r].label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle theme"
          onClick={onToggleTheme}
        >
          {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
                <Bell className="size-5" />
                <span className="absolute right-2 top-2 size-2 rounded-full bg-primary ring-2 ring-card" />
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              Notifications
              <span className="rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                4 new
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {notifications.map((n) => (
                <DropdownMenuItem key={n.title} className="flex items-start gap-3 py-2.5">
                  <span className={`mt-1 size-2 shrink-0 rounded-full ${n.tone}`} />
                  <span className="flex flex-col gap-0.5">
                    <span className="text-sm leading-tight">{n.title}</span>
                    <span className="text-xs text-muted-foreground">{n.meta}</span>
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-sm text-primary">
              View all activity
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator orientation="vertical" className="mx-1 hidden h-8 sm:block" />

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <button className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 transition-colors hover:bg-secondary/60">
                <Avatar className="size-8">
                  <AvatarFallback className="bg-primary/15 text-xs font-semibold text-primary">
                    {meta.initials}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden flex-col items-start leading-tight md:flex">
                  <span className="text-sm font-medium">{meta.person}</span>
                  <span className="text-xs text-muted-foreground">{meta.label}</span>
                </span>
                <ChevronDown className="hidden size-4 text-muted-foreground md:block" />
              </button>
            }
          />
          <DropdownMenuContent align="end" className="w-60">
            <DropdownMenuLabel className="flex flex-col">
              <span className="text-sm">{meta.person}</span>
              <span className="text-xs font-normal text-muted-foreground">
                {meta.org}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
              Switch workspace
            </DropdownMenuLabel>
            <DropdownMenuGroup>
              {roles.map((r) => (
                <DropdownMenuItem key={r} onClick={() => onRoleChange(r)}>
                  <span className="flex-1">{roleMeta[r].label}</span>
                  {r === role ? <Check className="size-4 text-primary" /> : null}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="size-4" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="size-4" /> Settings
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive">
                <LogOut className="size-4" /> Sign out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
