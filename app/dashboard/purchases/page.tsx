"use client";

import { useEffect, useState, useRef } from "react";
import {
  Search,
  Package,
  CheckCircle2,
  Truck,
  XCircle,
  Plus,
  Loader2,
  MapPin,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/api/api";

// ============ TYPES ============
interface Order {
  id: string;
  order_number: string;
  store_name: string;
  firma_name: string;
  product_id: string;
  product_name: string;
  product_image_url: string;
  quantity: number;
  total_price: number;  // Изменено с total на total_price
  delivery_address: string | null;
  contact_phone: string | null;
  delivery_latitude: number | null;
  delivery_longitude: number | null;
  delivery_date: string | null;
  notes: string | null;
  cancel_reason: string | null;
  status: "pending" | "confirmed" | "completed" | "cancelled"; // Добавлен pending
  payment_status: string;
  payment_method: string | null;
  confirmed_at: string | null;
  completed_at: string | null;
  cancelled_at: string | null;
  created_at: string;
}

interface OrderStats {
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
}

interface ApiResponse {
  orders: Order[];
  page: number;
  limit: number;
  total: number;
  pages: number;
}

// ============ PHONE INPUT COMPONENT ============
interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  className?: string;
}

function PhoneInput({ value, onChange, error, className }: PhoneInputProps) {
  const [displayValue, setDisplayValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const previousValueRef = useRef("");

  useEffect(() => {
    if (value) {
      const clean = value.replace(/\D/g, "");
      if (clean.startsWith("998")) {
        const numbers = clean.slice(3);
        setDisplayValue(formatDisplay(numbers));
        previousValueRef.current = numbers;
      } else {
        setDisplayValue("");
        previousValueRef.current = "";
      }
    } else {
      setDisplayValue("");
      previousValueRef.current = "";
    }
  }, [value]);

  const formatDisplay = (numbers: string): string => {
    const clean = numbers.replace(/\D/g, "");
    if (clean.length === 0) return "";
    if (clean.length <= 2) return clean;
    if (clean.length <= 5) return `${clean.slice(0, 2)}-${clean.slice(2)}`;
    if (clean.length <= 7) return `${clean.slice(0, 2)}-${clean.slice(2, 5)}-${clean.slice(5)}`;
    return `${clean.slice(0, 2)}-${clean.slice(2, 5)}-${clean.slice(5, 7)}-${clean.slice(7, 9)}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    let numbers = raw.replace(/\D/g, "");

    if (numbers === "") {
      setDisplayValue("");
      onChange("");
      previousValueRef.current = "";
      return;
    }

    if (numbers.startsWith("998")) {
      numbers = numbers.slice(3);
    }

    if (numbers.length > 9) {
      return;
    }

    previousValueRef.current = numbers;
    const formatted = formatDisplay(numbers);
    setDisplayValue(formatted);
    const fullNumber = `+998${numbers}`;
    onChange(fullNumber);

    setTimeout(() => {
      const newPos = formatted.length + 4;
      e.target.setSelectionRange(newPos, newPos);
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const cursorPos = input.selectionStart || 0;
    const selectionEnd = input.selectionEnd || 0;
    const currentValue = input.value;

    if (e.key === "Backspace" || e.key === "Delete") {
      if (selectionEnd - cursorPos === currentValue.length) {
        e.preventDefault();
        setDisplayValue("");
        onChange("");
        previousValueRef.current = "";
        return;
      }

      if (cursorPos <= 4) {
        e.preventDefault();
        setTimeout(() => {
          input.setSelectionRange(4, 4);
        }, 0);
        return;
      }

      return;
    }

    if (e.key.length === 1 && !/[\d]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setTimeout(() => {
      const pos = Math.min(4, displayValue.length + 4);
      e.target.setSelectionRange(pos, pos);
    }, 0);
  };

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const cursorPos = input.selectionStart || 0;
    if (cursorPos < 4) {
      input.setSelectionRange(4, 4);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text");
    let numbers = pasteData.replace(/\D/g, "");

    if (numbers === "") return;

    if (numbers.startsWith("998")) {
      numbers = numbers.slice(3);
    }

    if (numbers.length > 9) {
      numbers = numbers.slice(0, 9);
    }

    previousValueRef.current = numbers;
    const formatted = formatDisplay(numbers);
    setDisplayValue(formatted);
    const fullNumber = `+998${numbers}`;
    onChange(fullNumber);
  };

  return (
    <div className="space-y-2">
      <div className="relative flex">
        <div className="flex items-center rounded-l-md border border-r-0 bg-muted px-3 text-sm text-muted-foreground whitespace-nowrap">
          +998
        </div>
        <Input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          value={displayValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onClick={handleClick}
          onPaste={handlePaste}
          className={`rounded-l-none ${className}`}
          placeholder="90-574-13-28"
          maxLength={13}
          required
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

// ============ YANDEX MAP COMPONENT ============
interface YandexMapProps {
  onLocationSelect: (lat: number, lng: number, address: string) => void;
  initialLat?: number;
  initialLng?: number;
}

declare global {
  interface Window {
    ymaps: any;
  }
}

function YandexMap({ onLocationSelect, initialLat = 41.2995, initialLng = 69.2401 }: YandexMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [placemark, setPlacemark] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY;

  useEffect(() => {
    if (!apiKey || apiKey === "4234d936-c955-4304-a236-1208ac5e4561") {
      setError("API ключ не настроен. Проверьте .env.local");
      setIsLoading(false);
      return;
    }

    if (window.ymaps) {
      window.ymaps.ready(initMap);
      return;
    }

    const oldScript = document.querySelector('script[src*="api-maps.yandex.ru"]');
    if (oldScript) {
      oldScript.remove();
    }

    const script = document.createElement("script");
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`;
    script.async = true;

    script.onload = () => {
      if (window.ymaps) {
        window.ymaps.ready(initMap);
      } else {
        setError("Не удалось загрузить Яндекс.Карты");
        setIsLoading(false);
      }
    };

    script.onerror = () => {
      setError("Ошибка загрузки Яндекс.Карт. Проверьте интернет соединение.");
      setIsLoading(false);
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [apiKey]);

  const initMap = () => {
    if (!mapRef.current || !window.ymaps) {
      setError("Ошибка инициализации карты");
      setIsLoading(false);
      return;
    }

    try {
      const myMap = new window.ymaps.Map(mapRef.current, {
        center: [initialLat, initialLng],
        zoom: 13,
        controls: ["zoomControl", "fullscreenControl"],
      });

      const myPlacemark = new window.ymaps.Placemark(
        [initialLat, initialLng],
        {
          hintContent: "Выберите место доставки",
          balloonContent: "Место доставки",
        },
        {
          draggable: true,
          preset: "islands#blueCircleDotIcon",
        }
      );

      myMap.geoObjects.add(myPlacemark);
      setMap(myMap);
      setPlacemark(myPlacemark);

      myPlacemark.events.add("dragend", () => {
        const coords = myPlacemark.geometry.getCoordinates();
        getAddress(coords[0], coords[1]);
      });

      myMap.events.add("click", (e: any) => {
        const coords = e.get("coords");
        myPlacemark.geometry.setCoordinates(coords);
        getAddress(coords[0], coords[1]);
      });

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            myMap.setCenter([latitude, longitude], 13);
            myPlacemark.geometry.setCoordinates([latitude, longitude]);
            getAddress(latitude, longitude);
          },
          () => {
            console.log("Geolocation failed, using default location");
            getAddress(initialLat, initialLng);
          }
        );
      } else {
        getAddress(initialLat, initialLng);
      }

      setIsLoading(false);
      setError(null);
    } catch (err) {
      console.error("Error initializing map:", err);
      setError("Ошибка при создании карты");
      setIsLoading(false);
    }
  };

  const getAddress = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&geocode=${lng},${lat}&format=json`
      );
      const data = await response.json();

      const geoObject = data.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject;
      const address = geoObject?.metaDataProperty?.GeocoderMetaData?.text || `${lat}, ${lng}`;

      onLocationSelect(lat, lng, address);
    } catch (error) {
      console.error("Error getting address:", error);
      onLocationSelect(lat, lng, `${lat}, ${lng}`);
    }
  };

  const searchLocation = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);

    try {
      const response = await fetch(
        `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&geocode=${encodeURIComponent(searchQuery)}&format=json`
      );
      const data = await response.json();

      const geoObject = data.response?.GeoObjectCollection?.featureMember?.[0]?.GeoObject;

      if (geoObject) {
        const pos = geoObject.Point.pos.split(" ");
        const lng = parseFloat(pos[0]);
        const lat = parseFloat(pos[1]);
        const address = geoObject.metaDataProperty?.GeocoderMetaData?.text || searchQuery;

        if (map && placemark) {
          map.setCenter([lat, lng], 13);
          placemark.geometry.setCoordinates([lat, lng]);
          onLocationSelect(lat, lng, address);
        }
      } else {
        toast({
          title: "Не найдено",
          description: "По вашему запросу ничего не найдено",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Ошибка поиска",
        description: "Не удалось выполнить поиск",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  if (error) {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center rounded-lg border bg-red-50 p-4">
        <p className="text-center text-red-500">{error}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Проверьте настройки API ключа в .env.local
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Обновить страницу
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-lg border bg-muted/20">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Загрузка карты...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Поиск адреса..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchLocation()}
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          onClick={searchLocation}
          disabled={isSearching}
        >
          {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : "Найти"}
        </Button>
      </div>
      <div ref={mapRef} className="h-[400px] w-full rounded-lg border" />
    </div>
  );
}

// ============ STATUS BADGE COMPONENT ============
function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "confirmed":
      return (
        <Badge className="bg-blue-500">
          <Truck className="mr-1 h-3 w-3" />
          Confirmed
        </Badge>
      );
    case "completed":
      return (
        <Badge className="bg-green-600">
          <CheckCircle2 className="mr-1 h-3 w-3" />
          Completed
        </Badge>
      );
    case "cancelled":
      return (
        <Badge variant="destructive">
          <XCircle className="mr-1 h-3 w-3" />
          Cancelled
        </Badge>
      );
    case "pending":
      return (
        <Badge variant="secondary">
          <Loader2 className="mr-1 h-3 w-3 animate-spin" />
          Pending
        </Badge>
      );
    default:
      return (
        <Badge variant="outline">
          <Package className="mr-1 h-3 w-3" />
          {status || "Unknown"}
        </Badge>
      );
  }
}

// ============ MAIN PAGE COMPONENT ============
export default function PurchasesPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<OrderStats>({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const { toast } = useToast();

  // Product types state
  const [productTypes, setProductTypes] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const [formData, setFormData] = useState({
    product_id: "",
    quantity: 1,
    delivery_address: "",
    contact_phone: "",
    delivery_latitude: 0,
    delivery_longitude: 0,
    delivery_date: "",
    payment_method: "cash",
    notes: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});



  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get<ApiResponse>("/orders/me", {
        params: {
          page: 1,
          limit: 50,
        },
      });

      const data = response.data;
      const orderList = data.orders || [];

      setOrders(orderList);

      const statsData = {
        total: orderList.length,
        pending: orderList.filter((o: Order) => o.status === "pending").length,
        confirmed: orderList.filter((o: Order) => o.status === "confirmed").length,
        completed: orderList.filter((o: Order) => o.status === "completed").length,
        cancelled: orderList.filter((o: Order) => o.status === "cancelled").length,
      };
      setStats(statsData);
    } catch (error: any) {
      console.error("Error fetching orders:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to load orders.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleLocationSelect = (lat: number, lng: number, address: string) => {
    setFormData((prev) => ({
      ...prev,
      delivery_address: address,
      delivery_latitude: lat,
      delivery_longitude: lng,
    }));
    setFormErrors((prev) => ({ ...prev, delivery_address: "" }));
  };

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors({});

    if (!formData.product_id) {
      setFormErrors((prev) => ({ ...prev, product_id: "Пожалуйста, выберите продукт" }));
      setIsSubmitting(false);
      return;
    }

    const phoneRegex = /^\+998\d{9}$/;
    if (!phoneRegex.test(formData.contact_phone)) {
      setFormErrors((prev) => ({ ...prev, contact_phone: "Введите корректный номер телефона" }));
      setIsSubmitting(false);
      return;
    }

    try {
      await api.post("/orders", formData);

      toast({
        title: "Success",
        description: "Order created successfully!",
        variant: "success",
      });

      setIsCreateDialogOpen(false);
      resetForm();
      fetchOrders();
    } catch (error: any) {
      console.error("Error creating order:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to create order",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateStatus = async (orderId: string, status: string, cancelReason?: string) => {
    try {
      await api.patch(`/orders/${orderId}/status`, {
        status,
        ...(cancelReason && { cancel_reason: cancelReason }),
      });

      toast({
        title: `✅ ${status.charAt(0).toUpperCase() + status.slice(1)}`,
        description: `Order ${status} successfully!`,
        variant: status === "cancelled" ? "warning" : "success",
      });

      fetchOrders();
    } catch (error: any) {
      console.error("Error updating order:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to update order status",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      product_id: "",
      quantity: 1,
      delivery_address: "",
      contact_phone: "",
      delivery_latitude: 0,
      delivery_longitude: 0,
      delivery_date: "",
      payment_method: "cash",
      notes: "",
    });
    setFormErrors({});
  };

  const filteredOrders = orders.filter((order) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      order.id.toLowerCase().includes(searchLower) ||
      order.order_number.toLowerCase().includes(searchLower) ||
      order.product_name.toLowerCase().includes(searchLower) ||
      order.store_name.toLowerCase().includes(searchLower) ||
      order.firma_name.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Purchases</h1>
          <p className="text-muted-foreground">Track all purchased products</p>
        </div>
       
      </div>

      {/* Map Dialog */}
      <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Выберите место доставки</DialogTitle>
            <DialogDescription>
              Кликните на карте или перетащите маркер, чтобы выбрать место доставки.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <YandexMap
              onLocationSelect={handleLocationSelect}
              initialLat={formData.delivery_latitude || 41.2995}
              initialLng={formData.delivery_longitude || 69.2401}
            />
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Выбранный адрес:</p>
                <p className="text-sm text-muted-foreground">
                  {formData.delivery_address || "Адрес не выбран"}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsMapOpen(false)}>
                  Отмена
                </Button>
                <Button onClick={() => setIsMapOpen(false)}>
                  Подтвердить
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <Package className="mb-2 h-7 w-7 text-primary" />
            <p className="text-sm text-muted-foreground">Total Orders</p>
            <h2 className="text-3xl font-bold">{stats.total}</h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <Loader2 className="mb-2 h-7 w-7 text-yellow-500 animate-spin" />
            <p className="text-sm text-muted-foreground">Pending</p>
            <h2 className="text-3xl font-bold">{stats.pending}</h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <Truck className="mb-2 h-7 w-7 text-blue-500" />
            <p className="text-sm text-muted-foreground">Confirmed</p>
            <h2 className="text-3xl font-bold">{stats.confirmed}</h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <CheckCircle2 className="mb-2 h-7 w-7 text-green-500" />
            <p className="text-sm text-muted-foreground">Completed</p>
            <h2 className="text-3xl font-bold">{stats.completed}</h2>
          </CardContent>
        </Card>
      </div>

      {/* Orders List */}
      <Card>
        <CardContent className="p-6">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by order ID, product, or supplier..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="flex h-40 flex-col items-center justify-center text-center">
                <Package className="mb-2 h-10 w-10 text-muted-foreground" />
                <p className="text-muted-foreground">No orders found</p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-xl border p-5 transition hover:bg-muted/40"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold">
                        {order.product_name || `Product #${order.product_id}`}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {order.firma_name || "Unknown Supplier"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Store: {order.store_name}
                      </p>
                    </div>
                 
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                    <div>
                      <p className="text-muted-foreground">Order #</p>
                      <p className="font-mono text-xs truncate">{order.order_number}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Quantity</p>
                      <p>{order.quantity} pcs</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total</p>
                      <p className="font-semibold">
                        ${order.total_price ? order.total_price.toFixed(2) : "0.00"}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Delivery Date</p>
                      <p>
                        {order.delivery_date 
                          ? new Date(order.delivery_date).toLocaleDateString() 
                          : "Not set"}
                      </p>
                    </div>
                  </div>
                  
                  {order.delivery_address && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      📍 {order.delivery_address}
                    </div>
                  )}
                  
                  {order.notes && (
                    <div className="mt-1 text-xs text-muted-foreground">
                      📝 {order.notes}
                    </div>
                  )}
                  
                  <div className="mt-2 text-xs text-muted-foreground">
                    Created: {new Date(order.created_at).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}