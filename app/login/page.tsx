"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

import { AuthService } from "@/services/auth.service";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    login: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await AuthService.login(form.login, form.password);

      localStorage.setItem("access_token", res.access_token);

      localStorage.setItem("role", res.role);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* LEFT */}

      <div className="hidden lg:flex flex-col justify-between bg-primary p-10 text-white">
        <div>
          <h1 className="text-4xl font-bold">B2B Marketplace</h1>

          <p className="mt-4 text-white/80">
            Enterprise platform connecting suppliers and markets.
          </p>
        </div>

        <div className="space-y-4">
          <div>✓ Product Management</div>

          <div>✓ Inventory Tracking</div>

          <div>✓ Purchase Orders</div>

          <div>✓ Analytics Dashboard</div>
        </div>

        <p className="text-sm text-white/70">© 2026 B2B Marketplace</p>
      </div>

      {/* RIGHT */}

      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold">Welcome Back</h2>

            <p className="mt-2 text-muted-foreground">
              Sign in to your account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm">Login</label>

              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />

                <Input
                  type="text"
                  className="pl-10"
                  placeholder="Login"
                  value={form.login}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      login: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm">Password</label>

              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />

                <Input
                  type={showPassword ? "text" : "password"}
                  className="pl-10 pr-10"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value,
                    })
                  }
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
