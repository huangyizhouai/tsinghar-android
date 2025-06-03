import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { loginSchema, signupSchema } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Apple, Eye, EyeOff, Languages } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";


type LoginData = {
  username: string;
  password: string;
};

type SignupData = {
  username: string;
  password: string;
  email?: string;
};

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { t, language, setLanguage } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  const loginForm = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const signupForm = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await apiRequest("POST", "/api/auth/login", data);
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: t("success"),
        description: t("loginSuccessful"),
      });
      setLocation("/");
    },
    onError: (error: any) => {
      toast({
        title: t("error"),
        description: error.message || t("loginFailed"),
        variant: "destructive",
      });
    },
  });

  const signupMutation = useMutation({
    mutationFn: async (data: SignupData) => {
      const response = await apiRequest("POST", "/api/auth/signup", data);
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: t("success"),
        description: t("accountCreated"),
      });
      setLocation("/");
    },
    onError: (error: any) => {
      toast({
        title: t("error"),
        description: error.message || t("signupFailed"),
        variant: "destructive",
      });
    },
  });

  const handleAppleLogin = () => {
    toast({
      title: t("comingSoon"),
      description: t("appleLoginComingSoon"),
    });
  };

  const onLoginSubmit = (data: LoginData) => {
    loginMutation.mutate(data);
  };

  const onSignupSubmit = (data: SignupData) => {
    signupMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Exact Purple Gradient Background matching the reference image */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-600 via-purple-700 to-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-purple-800/40 to-slate-800/60" />
        {/* Subtle texture overlay to match the reference */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-400/10 via-transparent to-purple-900/20" />
        </div>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl relative z-10">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1"></div>
            <div className="flex-1 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">清花</span>
              </div>
            </div>
            <div className="flex-1 flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                <Languages className="h-5 w-5" />
                <span className="ml-1 text-xs">{language === 'zh' ? 'EN' : '中'}</span>
              </Button>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            {t("welcome")}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {t("loginDescription")}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">{t("login")}</TabsTrigger>
              <TabsTrigger value="signup">{t("signup")}</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login" className="space-y-4">
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <div className="space-y-1">
                            <div>用户名</div>
                            <div className="text-xs text-gray-500">Username</div>
                          </div>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="请输入用户名 / Enter username"
                            {...field}
                            className="h-12"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <div className="space-y-1">
                            <div>密码</div>
                            <div className="text-xs text-gray-500">Password</div>
                          </div>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="请输入密码 / Enter password"
                              {...field}
                              className="h-12 pr-10"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-500" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-500" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium"
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? (
                      <div className="space-y-1">
                        <div>登录中...</div>
                        <div className="text-xs opacity-80">Logging in...</div>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <div>登录</div>
                        <div className="text-xs opacity-80">Login</div>
                      </div>
                    )}
                  </Button>
                </form>
              </Form>
            </TabsContent>

            {/* Signup Tab */}
            <TabsContent value="signup" className="space-y-4">
              <Form {...signupForm}>
                <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                  <FormField
                    control={signupForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <div className="space-y-1">
                            <div>用户名</div>
                            <div className="text-xs text-gray-500">Username</div>
                          </div>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="请输入用户名 / Enter username"
                            {...field}
                            className="h-12"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signupForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <div className="space-y-1">
                            <div>邮箱 (可选)</div>
                            <div className="text-xs text-gray-500">Email (Optional)</div>
                          </div>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="请输入邮箱 / Enter email"
                            {...field}
                            className="h-12"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={signupForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <div className="space-y-1">
                            <div>密码</div>
                            <div className="text-xs text-gray-500">Password</div>
                          </div>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="请输入密码 / Enter password"
                              {...field}
                              className="h-12 pr-10"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-500" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-500" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium"
                    disabled={signupMutation.isPending}
                  >
                    {signupMutation.isPending ? (
                      <div className="space-y-1">
                        <div>创建账户中...</div>
                        <div className="text-xs opacity-80">Creating account...</div>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <div>创建账户</div>
                        <div className="text-xs opacity-80">Create Account</div>
                      </div>
                    )}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">{t("orContinueWith")}</span>
            </div>
          </div>

          {/* Apple Login Button */}
          <Button
            onClick={handleAppleLogin}
            variant="outline"
            className="w-full h-12 border-gray-300 hover:bg-gray-50"
          >
            <Apple className="w-5 h-5 mr-2" />
            {t("continueWithApple")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}