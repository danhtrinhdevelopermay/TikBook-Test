import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, type SignInUser } from "@shared/schema";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Mail, Lock } from "lucide-react";

export default function SignIn() {
  const [, setLocation] = useLocation();
  const { signIn } = useAuth();
  const { toast } = useToast();
  const [error, setError] = useState<string>("");

  const form = useForm<SignInUser>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInUser) => {
    console.log("Sign in form submitted with data:", data);
    try {
      setError("");
      console.log("Calling signIn mutation...");
      const result = await signIn.mutateAsync(data);
      console.log("SignIn successful:", result);
      
      toast({
        title: "Thành công!",
        description: "Bạn đã đăng nhập thành công.",
      });
      
      // Wait longer for authentication state to propagate
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Force a window reload to ensure fresh authentication state
      window.location.href = "/home";
      
    } catch (err: any) {
      console.error("SignIn error:", err);
      const message = "Email hoặc mật khẩu không đúng. Vui lòng thử lại.";
      setError(message);
      toast({
        title: "Đăng nhập thất bại",
        description: message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            Kết Nối Đẹp
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Kết nối với bạn bè và thế giới xung quanh bạn
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Đăng nhập</CardTitle>
            <CardDescription>
              Nhập thông tin đăng nhập để truy cập tài khoản của bạn
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            {...field}
                            type="email"
                            placeholder="Nhập email của bạn"
                            className="pl-10"
                            data-testid="input-email"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mật khẩu</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            {...field}
                            type="password"
                            placeholder="Nhập mật khẩu của bạn"
                            className="pl-10"
                            data-testid="input-password"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={signIn.isPending}
                  data-testid="button-signin"
                >
                  {signIn.isPending ? "Đang đăng nhập..." : "Đăng nhập"}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Chưa có tài khoản?{" "}
                <Link
                  href="/signup"
                  className="text-blue-600 hover:text-blue-500 font-medium"
                  data-testid="link-signup"
                >
                  Đăng ký tại đây
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}