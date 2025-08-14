import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpUser } from "@shared/schema";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Mail, Lock, User, Calendar } from "lucide-react";

export default function SignUp() {
  const [, setLocation] = useLocation();
  const { signUp } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string>("");

  const form = useForm<SignUpUser>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      dateOfBirth: undefined,
      gender: undefined,
      phoneNumber: undefined,
      bio: undefined,
      location: undefined,
      website: undefined,
      workplace: undefined,
      education: undefined,
      relationshipStatus: undefined,
      profileImage: undefined,
      coverImage: undefined,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: SignUpUser) => {
    console.log("Form submitted with data:", data);
    
    try {
      setError("");
      console.log("Calling signUp mutation...");
      
      const result = await signUp.mutateAsync(data);
      console.log("SignUp successful:", result);
      
      // Show success notification
      toast({
        title: "Thành công!",
        description: "Tài khoản đã được tạo và bạn đã đăng nhập.",
      });
      
      // Set user data in cache immediately
      queryClient.setQueryData(["/api/users/me"], result.user);
      
      // Determine environment
      const isOnRender = window.location.hostname.includes('onrender.com');
      const isDevelopment = window.location.hostname === 'localhost' || 
                           window.location.hostname.includes('replit.dev') ||
                           window.location.hostname.includes('5000');
      
      console.log("Environment detection:", { isOnRender, isDevelopment });
      
      // Special handling for production environment
      if (isOnRender || !isDevelopment) {
        console.log("🔥 Production/Render environment: implementing comprehensive signup redirect");
        
        // Step 1: Mark successful signup and set target
        sessionStorage.setItem('signupSuccess', 'true');
        sessionStorage.setItem('signupTime', Date.now().toString());
        sessionStorage.setItem('redirectTo', 'setup-profile');
        
        // Step 2: Immediately set user data in cache
        queryClient.setQueryData(["/api/users/me"], result.user);
        
        // Step 3: Wait for state persistence
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Step 4: Use location.href for guaranteed navigation
        window.location.href = "/setup-profile?authenticated=true&_t=" + Date.now();
      } else {
        console.log("Development environment: using client-side navigation to setup-profile");
        await queryClient.invalidateQueries({ queryKey: ["/api/users/me"] });
        await new Promise(resolve => setTimeout(resolve, 500));
        setLocation("/setup-profile");
      }
      
    } catch (err: any) {
      console.error("SignUp error:", err);
      let message = "Không thể tạo tài khoản. Vui lòng thử lại.";
      
      if (err.message?.includes("already exists") || err.message?.includes("duplicate") || err.message?.includes("email")) {
        message = "Email hoặc username đã được sử dụng. Vui lòng thử thông tin khác.";
      }
      
      setError(message);
      toast({
        title: "Lỗi",
        description: message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            Kết Nối Đẹp
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Tham gia và kết nối với bạn bè trên khắp thế giới
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tạo tài khoản</CardTitle>
            <CardDescription>
              Điền thông tin của bạn để bắt đầu
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tên</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              {...field}
                              placeholder="Tên"
                              className="pl-10"
                              data-testid="input-firstName"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Họ</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              {...field}
                              placeholder="Họ"
                              className="pl-10"
                              data-testid="input-lastName"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên người dùng</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            {...field}
                            placeholder="Chọn tên người dùng duy nhất"
                            className="pl-10"
                            data-testid="input-username"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                            placeholder="Tạo mật khẩu mạnh"
                            className="pl-10"
                            data-testid="input-password"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Xác nhận mật khẩu</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            {...field}
                            type="password"
                            placeholder="Xác nhận mật khẩu của bạn"
                            className="pl-10"
                            data-testid="input-confirmPassword"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />



                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={signUp.isPending}
                  data-testid="button-signup"
                >
                  {signUp.isPending ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Đã có tài khoản?{" "}
                <Link
                  href="/signin"
                  className="text-blue-600 hover:text-blue-500 font-medium"
                  data-testid="link-signin"
                >
                  Đăng nhập tại đây
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}