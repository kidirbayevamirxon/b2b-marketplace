"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
  const role =
    typeof window !== "undefined"
      ? localStorage.getItem("role")
      : null;

  const { data, isLoading, error } = useQuery({
    queryKey: ["profile", role],
    enabled: !!role,
    queryFn: async () => {
      const userRes = await api.get("/auth/me");

      if (role === "firma") {
        const profileRes = await api.get("/catalog/firma-profile/me");

        return {
          user: userRes.data,
          profile: profileRes.data,
        };
      }

      if (role === "market") {
        const profileRes = await api.get("/orders/store-profile/me");

        return {
          user: userRes.data,
          profile: profileRes.data,
        };
      }

      return {
        user: userRes.data,
      };
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Profile yuklanmadi</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Profile</h1>

      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <div>
            <strong>ID:</strong> {data?.user?.id}
          </div>

          <div>
            <strong>Login:</strong> {data?.user?.login}
          </div>

          <div>
            <strong>Name:</strong> {data?.user?.name}
          </div>

          <div>
            <strong>Role:</strong> {data?.user?.role}
          </div>
        </CardContent>
      </Card>

      {data?.profile && (
        <Card>
          <CardHeader>
            <CardTitle>
              {role === "firma"
                ? "Company Information"
                : "Store Information"}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <pre className="overflow-auto text-sm">
              {JSON.stringify(data.profile, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}