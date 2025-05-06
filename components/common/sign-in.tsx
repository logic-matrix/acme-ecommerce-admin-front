"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Lock, Mail } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import Image from "next/image";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!rememberMe) {
      toast("must check remember me");
      return;
    }
    if (email && password) {
      setLoading(true);
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
          { email, password },
          {
            withCredentials: true,
          }
        );

        // console.log(response.data);

        if (response.status === 200) {
          toast("Signed in successfully!");
          if (response.data?.user.role === "admin") {
            router.push("/dashboard");
          } else {
            router.push("/");
          }
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response) {
          toast(err.response.data?.error || "Login failed");
        } else {
          toast("Login failed");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex max-h-screen">
      <Toaster position="top-right" />
      <div className="hidden md:flex w-1/2 bg-black items-center justify-center relative h-screen">
        <Image
          src="/login/image.webp"
          alt="VR Girl"
          className="object-cover h-full w-full"
          fill
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <h2 className="text-2xl font-bold">Sign in</h2>
            <p className="text-sm text-gray-500 mt-2">
              Welcome back, you&apos;ve been missed!
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Email Input */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  {/* Email Icon */}
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black h-5 w-5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={email}
                    className="pl-10"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  {/* Email Icon */}
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black h-5 w-5" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="******"
                    value={password}
                    className="pl-10"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Remember Me + Forgot Password */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(!!checked)}
                  />
                  <Label htmlFor="remember" className="text-sm">
                    Remember Me
                  </Label>
                </div>
                <Link
                  href="/forget"
                  className="text-sm text-[#0085FF] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={loading}
              >
                {loading ? "..." : "Sign In"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="justify-center ">
            <p className="text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-[#FD593E] hover:underline">
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
