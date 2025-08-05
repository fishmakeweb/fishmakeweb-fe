"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const verifySchema = z.object({
  otp: z.string().length(6, "Mã OTP phải có 6 ký tự").min(1, "Mã OTP là bắt buộc"),
});

type VerifyFormData = z.infer<typeof verifySchema>;

export default function VerifyPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<VerifyFormData>({
    resolver: zodResolver(verifySchema),
  });

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const onSubmit = async (data: VerifyFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch("https://localhost:7001/api/v1/authentication/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          otp: data.otp,
        }),
      });

      const result = await response.json();

      if (response.ok && result.status === 201) {
        // Verification successful, redirect to login
        router.push("/auth/login?verified=true");
      } else {
        setError("root", {
          message: result.message || "Mã OTP không hợp lệ. Vui lòng kiểm tra lại.",
        });
      }
    } catch (error) {
      setError("root", {
        message: "Có lỗi xảy ra. Vui lòng thử lại sau.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    try {
      const response = await fetch("https://localhost:7001/api/v1/authentication/resend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      if (response.ok) {
        // Show success message - you might want to use a toast library here
        alert("Mã OTP mới đã được gửi đến email của bạn.");
      } else {
        alert("Không thể gửi lại mã OTP. Vui lòng thử lại sau.");
      }
    } catch (error) {
      alert("Có lỗi xảy ra khi gửi lại mã OTP.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
            <Mail className="h-10 w-10 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Xác thực tài khoản</CardTitle>
          <CardDescription>
            Chúng tôi đã gửi mã OTP 6 ký tự đến email
            <br />
            <span className="font-medium text-blue-600">{email}</span>
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">Mã OTP</Label>
              <Input
                id="otp"
                type="text"
                placeholder="Nhập 6 ký tự"
                maxLength={6}
                className={`text-center text-2xl font-mono tracking-wider ${
                  errors.otp ? "border-red-500" : ""
                }`}
                {...register("otp")}
              />
              {errors.otp && (
                <p className="text-sm text-red-500">{errors.otp.message}</p>
              )}
            </div>

            {errors.root && (
              <div className="text-sm text-red-500 text-center p-3 bg-red-50 rounded-md">
                {errors.root.message}
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang xác thực...
                </>
              ) : (
                "Xác thực tài khoản"
              )}
            </Button>
            
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                Không nhận được mã?{" "}
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={isResending}
                  className="text-blue-600 hover:underline font-medium disabled:opacity-50"
                >
                  {isResending ? "Đang gửi..." : "Gửi lại"}
                </button>
              </p>
              <Link href="/auth/login" className="text-sm text-blue-600 hover:underline">
                Quay lại đăng nhập
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}