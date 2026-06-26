"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Hexagon } from "lucide-react";

import { bottomNav, navByRole } from "./nav-config";
import { roleMeta, type Role } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

export function SidebarNav({
  role,
  onNavigate,
}: {
  role: Role;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  const groups = navByRole[role];
  const meta = roleMeta[role];

  return (
    <div className="flex h-full flex-col bg-sidebar">

      {/* Logo */}

      <div className="flex items-center gap-3 border-b px-5 py-5">

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">

          <Hexagon className="h-6 w-6" />

        </div>

        <div>

          <h1 className="text-lg font-bold tracking-tight">
            Nexus
          </h1>

          <p className="text-xs text-muted-foreground">
            {meta.title}
          </p>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-7 overflow-y-auto px-3 py-5">

        {groups.map((group) => (
          <div key={group.title}>

            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              {group.title}
            </p>

            <div className="space-y-1">

              {group.items.map((item) => {

                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard" &&
                    pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      "group relative flex items-center gap-3 overflow-hidden rounded-xl px-3 py-3 transition-all duration-200",

                      isActive
                        ? "bg-primary text-white shadow-lg shadow-primary/30"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {/* Left Indicator */}

                    <span
                      className={cn(
                        "absolute left-0 top-2 bottom-2 w-1 rounded-r-full transition-all",

                        isActive
                          ? "bg-white"
                          : "bg-transparent"
                      )}
                    />

                    <item.icon
                      className={cn(
                        "h-5 w-5 transition-all",

                        isActive &&
                          "scale-110"
                      )}
                    />

                    <span className="flex-1 font-medium">
                      {item.label}
                    </span>

                    {item.badge && (
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[11px] font-semibold",

                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {item.badge}
                      </span>
                    )}

                  </Link>
                );
              })}

            </div>

          </div>
        ))}

      </nav>

      {/* Bottom */}

      <div className="border-t p-3">

        {bottomNav.map((item) => {

          const isActive =
            pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "mb-1 flex items-center gap-3 rounded-xl px-3 py-3 transition-all",

                isActive
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />

              <span>{item.label}</span>

            </Link>
          );
        })}

      </div>

    </div>
  );
}