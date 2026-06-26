"use client";
import { useRouter } from "next/navigation";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { roleMeta, type Role } from "@/lib/dashboard-data";
import {useMe} from "@/hooks/useMe";
const notifications = [
  {
    title: "New purchase order received",
    meta: "Northgate Retail · 2m ago",
    tone: "bg-primary",
  },
  {
    title: "Inventory critical: Aluminium Sheet",
    meta: "Warehouse 3 · 24m ago",
    tone: "bg-destructive",
  },
  {
    title: "Payout of $48,200 processed",
    meta: "Finance · 1h ago",
    tone: "bg-chart-3",
  },
  {
    title: "Supplier KYC approved",
    meta: "Compliance · 3h ago",
    tone: "bg-warning",
  },
];

export function Topbar({
  role,
  isDark,
  onToggleTheme,
  onOpenMobileNav,
}: {
  role: Role;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenMobileNav: () => void;
}) {
  const meta = roleMeta[role];
  const { data } = useMe();
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");

    router.push("/login");
  };
  const goToProfile = () => {
    router.push("/profile");
  };
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
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                aria-label="Notifications"
              >
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
                <DropdownMenuItem
                  key={n.title}
                  className="flex items-start gap-3 py-2.5"
                >
                  <span
                    className={`mt-1 size-2 shrink-0 rounded-full ${n.tone}`}
                  />
                  <span className="flex flex-col gap-0.5">
                    <span className="text-sm leading-tight">{n.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {n.meta}
                    </span>
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

        <Separator
          orientation="vertical"
          className="mx-1 hidden h-8 sm:block"
        />

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
                  <span className="text-sm font-medium">{data?.owner_first_name} {data?.owner_last_name}</span>
                  <span className="text-xs text-muted-foreground">
                    {meta.label}
                  </span>
                </span>
                <ChevronDown className="hidden size-4 text-muted-foreground md:block" />
              </button>
            }
          />
          <DropdownMenuContent align="end" className="w-60">
            <DropdownMenuLabel className="flex flex-col">
              <span className="text-sm">{data?.owner_first_name} {data?.owner_last_name}</span>
              <span className="text-xs font-normal text-muted-foreground">
                {meta.org}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuTrigger
              render={
                <Button variant="outline" size="sm">
                  🇺🇿 Uzbek
                  <ChevronDown className="size-4 ml-2" />
                </Button>
              }
            />

            <DropdownMenuContent>
              <DropdownMenuItem>🇺🇿 O'zbekcha</DropdownMenuItem>
              <DropdownMenuItem>🇷🇺 Русский</DropdownMenuItem>
              <DropdownMenuItem>🇬🇧 English</DropdownMenuItem>
            </DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={goToProfile}>
                <User className="size-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                <LogOut className="size-4" /> Sign out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
