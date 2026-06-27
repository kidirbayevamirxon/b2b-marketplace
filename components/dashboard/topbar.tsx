"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  Loader2,
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
import { useMe } from "@/hooks/useMe";
import { api } from "@/api/api";
import { useToast } from "@/hooks/use-toast";

// Types
interface Notification {
  id: string;
  title: string;
  message?: string;
  type?: string;
  is_read: boolean;
  created_at: string;
  read_at?: string | null;
  data?: any;
}

interface NotificationsResponse {
  page: number;
  limit: number;
  total: number;
  pages: number;
  notifications: Notification[];
}

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
  const { toast } = useToast();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    router.push("/login");
  };

  const goToProfile = () => {
    router.push("/profile");
  };

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      setLoadingNotifications(true);
      const response = await api.get<NotificationsResponse>("/notifications/me", {
        params: {
          page: 1,
          limit: 20,
        },
      });

      const data = response.data;
      setNotifications(data.notifications || []);
      
      // Count unread notifications
      const unread = (data.notifications || []).filter((n) => !n.is_read).length;
      setUnreadCount(unread);
    } catch (error: any) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoadingNotifications(false);
    }
  };

  // Mark notification as read
  const markAsRead = async (notificationId: string) => {
    try {
      await api.patch(`/notifications/${notificationId}/read`);
      
      // Update local state
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notificationId ? { ...n, is_read: true, read_at: new Date().toISOString() } : n
        )
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (error: any) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      await api.patch("/notifications/read-all");
      
      // Update local state
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, is_read: true, read_at: new Date().toISOString() }))
      );
      setUnreadCount(0);
      
      toast({
        title: "Success",
        description: "All notifications marked as read",
        variant: "success",
      });
    } catch (error: any) {
      console.error("Error marking all as read:", error);
      toast({
        title: "Error",
        description: "Failed to mark all as read",
        variant: "destructive",
      });
    }
  };

  // Load notifications when dropdown opens
  useEffect(() => {
    if (isNotificationsOpen) {
      fetchNotifications();
    }
  }, [isNotificationsOpen]);

  // Initial load
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Get notification icon based on type
  const getNotificationIcon = (type?: string) => {
    switch (type) {
      case "order":
        return "🛒";
      case "payment":
        return "💰";
      case "inventory":
        return "📦";
      case "kyc":
        return "📋";
      default:
        return "🔔";
    }
  };

  // Get notification tone based on type
  const getNotificationTone = (type?: string) => {
    switch (type) {
      case "order":
        return "bg-blue-500";
      case "payment":
        return "bg-green-500";
      case "inventory":
        return "bg-red-500";
      case "kyc":
        return "bg-yellow-500";
      default:
        return "bg-primary";
    }
  };

  // Format time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
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

        {/* Notifications Dropdown */}
        <DropdownMenu open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
          <DropdownMenuTrigger
          //@ts-ignore
          asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label="Notifications"
            >
              <Bell className="size-5" />
              {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-white ring-2 ring-card">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 max-h-[500px] overflow-y-auto">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto text-xs text-primary px-2"
                  onClick={markAllAsRead}
                >
                  Mark all as read
                </Button>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {loadingNotifications ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Bell className="h-10 w-10 text-muted-foreground/50 mb-2" />
                <p className="text-sm text-muted-foreground">No notifications</p>
                <p className="text-xs text-muted-foreground/70">
                  You're all caught up!
                </p>
              </div>
            ) : (
              <DropdownMenuGroup>
                {notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className={`flex items-start gap-3 py-2.5 cursor-pointer ${
                      !notification.is_read ? "bg-primary/5" : ""
                    }`}
                    onClick={() => {
                      if (!notification.is_read) {
                        markAsRead(notification.id);
                      }
                    }}
                  >
                    <span
                      className={`mt-1 flex h-2 w-2 shrink-0 rounded-full ${
                        notification.is_read ? "bg-muted" : getNotificationTone(notification.type)
                      }`}
                    />
                    <span className="flex flex-col gap-0.5 flex-1 min-w-0">
                      <span className="text-sm leading-tight flex items-center gap-1.5">
                        <span>{getNotificationIcon(notification.type)}</span>
                        <span className="font-medium">{notification.title}</span>
                      </span>
                      {notification.message && (
                        <span className="text-xs text-muted-foreground line-clamp-2">
                          {notification.message}
                        </span>
                      )}
                      <span className="text-[10px] text-muted-foreground/70 mt-0.5">
                        {formatTime(notification.created_at)}
                      </span>
                    </span>
                    {!notification.is_read && (
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            )}

            {notifications.length > 0 && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="justify-center text-sm text-primary cursor-pointer"
                  onClick={() => router.push("/notifications")}
                >
                  View all notifications
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator
          orientation="vertical"
          className="mx-1 hidden h-8 sm:block"
        />

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger
          //@ts-ignore
          asChild>
            <button className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 transition-colors hover:bg-secondary/60">
              <Avatar className="size-8">
                <AvatarFallback className="bg-primary/15 text-xs font-semibold text-primary">
                  {meta.initials}
                </AvatarFallback>
              </Avatar>
              <span className="hidden flex-col items-start leading-tight md:flex">
                <span className="text-sm font-medium">
                  {data?.owner_first_name} {data?.owner_last_name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {meta.label}
                </span>
              </span>
              <ChevronDown className="hidden size-4 text-muted-foreground md:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60">
            <DropdownMenuLabel className="flex flex-col">
              <span className="text-sm">
                {data?.owner_first_name} {data?.owner_last_name}
              </span>
              <span className="text-xs font-normal text-muted-foreground">
                {meta.org}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={goToProfile}>
                <User className="size-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="size-4 mr-2" />
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem variant="destructive" onClick={handleLogout}>
              <LogOut className="size-4 mr-2" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}