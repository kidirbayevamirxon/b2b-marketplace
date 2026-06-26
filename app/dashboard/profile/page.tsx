"use client";

import { useQuery } from "@tanstack/react-query";
import {
  User,
  Phone,
  Shield,
  BadgeCheck,
  XCircle,
  MessageCircle,
  Building2,
  Loader2,
} from "lucide-react";

import { api } from "@/api/api";

export default function ProfilePage() {
  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await api.get("/auth/me");
      return res.data.account;
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Profile
        </h1>

        <p className="text-muted-foreground">
          Manage your account information.
        </p>

      </div>

      <div className="grid gap-6 lg:grid-cols-3">

        <div className="rounded-3xl border bg-card p-8">

          <div className="flex flex-col items-center">

            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary/10">
              <User className="h-12 w-12 text-primary" />
            </div>

            <h2 className="mt-5 text-2xl font-bold">
              {data?.owner_first_name} {data?.owner_last_name}
            </h2>

            <p className="text-muted-foreground">
              @{data?.login}
            </p>

            <div className="mt-6 rounded-full bg-primary/10 px-5 py-2 text-sm font-semibold text-primary">
              {data?.role?.toUpperCase()}
            </div>

          </div>

        </div>

        <div className="space-y-6 lg:col-span-2">

          <div className="rounded-3xl border bg-card p-8">

            <h2 className="mb-6 text-xl font-semibold">
              Account Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              <InfoCard
                icon={<Building2 size={18} />}
                label="Company"
                value={data?.name}
              />

              <InfoCard
                icon={<User size={18} />}
                label="Username"
                value={data?.login}
              />

              <InfoCard
                icon={<Phone size={18} />}
                label="Phone"
                value={data?.phone}
              />

              <InfoCard
                icon={<Shield size={18} />}
                label="Role"
                value={data?.role}
              />

            </div>

          </div>

          <div className="rounded-3xl border bg-card p-8">

            <h2 className="mb-6 text-xl font-semibold">
              Account Status
            </h2>

            <div className="space-y-4">

              <StatusItem
                title="Account Active"
                value={data?.is_active}
              />

              <StatusItem
                title="Verified"
                value={data?.is_verified}
              />

              <StatusItem
                title="Telegram Connected"
                value={data?.telegram_connected}
              />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border p-5">

      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>

      <p className="text-sm text-muted-foreground">
        {label}
      </p>

      <p className="mt-2 text-lg font-semibold">
        {value || "-"}
      </p>

    </div>
  );
}

function StatusItem({
  title,
  value,
}: {
  title: string;
  value: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border p-5">

      <span className="font-medium">
        {title}
      </span>

      {value ? (
        <div className="flex items-center gap-2 text-green-500">
          <BadgeCheck size={20} />
          Enabled
        </div>
      ) : (
        <div className="flex items-center gap-2 text-red-500">
          <XCircle size={20} />
          Disabled
        </div>
      )}

    </div>
  );
}