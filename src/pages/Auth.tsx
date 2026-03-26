import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Sprout, Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Auth = () => {
    const { t } = useLanguage();
    const { toast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");

    const handleAuth = async (event: React.FormEvent, type: "signin" | "signup") => {
        event.preventDefault();
        setIsLoading(true);

        try {
            if (type === "signup") {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: fullName,
                        },
                    },
                });

                if (error) throw error;

                toast({
                    title: t("auth.signUpSuccessTitle"),
                    description: t("auth.signUpSuccessDescription"),
                });
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

                if (error) throw error;

                navigate("/");
            }
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: type === "signup" ? t("auth.signUpErrorTitle") : t("auth.signInErrorTitle"),
                description: error.message,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent',
                    },
                }
            });
            if (error) throw error;
            // For mock mode or if redirect doesn't happen immediately
            navigate("/");
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
            });
        }
    };

    return (
        <div className="min-h-screen w-full flex bg-background">
            {/* Left Panel - Hero Image */}
            <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-black">
                <div
                    className="absolute inset-0 z-0 opacity-60"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

                <div className="relative z-20 flex flex-col justify-between p-12 h-full text-white">
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-xl bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary">
                            <Sprout className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">Smart Farm Guardian</span>
                    </div>

                    <div className="space-y-6 max-w-lg">
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                            {t("hero.title")}
                        </h1>
                        <p className="text-lg text-gray-300">
                            {t("hero.description")}
                        </p>
                    </div>

                    <div className="text-sm text-gray-400">
                        © {new Date().getFullYear()} Smart Farm Guardian. All rights reserved.
                    </div>
                </div>
            </div>

            {/* Right Panel - Auth Form */}
            <div className="flex-1 flex items-center justify-center p-4 sm:p-8 relative bg-dot-pattern">

                {/* Mobile Background */}
                <div className="absolute inset-0 lg:hidden z-0">
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: 'url("https://images.unsplash.com/photo-1625246333195-bf4f8c2b0dce?q=80&w=2000&auto=format&fit=crop")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md space-y-8 relative z-10"
                >
                    <div className="text-center space-y-2 lg:text-left">
                        <div className="inline-flex lg:hidden p-3 rounded-2xl bg-primary/10 text-primary mb-4">
                            <Sprout className="h-8 w-8" />
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight">{t("auth.welcomeTitle")}</h2>
                        <p className="text-muted-foreground">{t("auth.welcomeDescription")}</p>
                    </div>

                    <Tabs defaultValue="signin" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-8 p-1 bg-muted/50 rounded-xl">
                            <TabsTrigger value="signin" className="rounded-lg">{t("auth.tabs.signIn")}</TabsTrigger>
                            <TabsTrigger value="signup" className="rounded-lg">{t("auth.tabs.signUp")}</TabsTrigger>
                        </TabsList>

                        <AnimatePresence mode="wait">
                            <TabsContent value="signin" asChild>
                                <motion.div
                                    key="signin"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <form onSubmit={(e) => handleAuth(e, "signin")} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="signin-email">{t("auth.emailLabel")}</Label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    id="signin-email"
                                                    className="pl-9 h-11 bg-background/50 backdrop-blur-sm"
                                                    type="email"
                                                    placeholder="name@example.com"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="signin-password">{t("auth.passwordLabel")}</Label>
                                                <a href="#" className="text-xs text-primary hover:underline font-medium">Forgot password?</a>
                                            </div>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    id="signin-password"
                                                    className="pl-9 h-11 bg-background/50 backdrop-blur-sm"
                                                    type="password"
                                                    placeholder="••••••••"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <Button type="submit" className="w-full h-11 text-base group" disabled={isLoading}>
                                            {isLoading ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    {t("auth.signInLoading")}
                                                </>
                                            ) : (
                                                <>
                                                    {t("auth.signInButton")}
                                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                </motion.div>
                            </TabsContent>

                            <TabsContent value="signup" asChild>
                                <motion.div
                                    key="signup"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <form onSubmit={(e) => handleAuth(e, "signup")} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="signup-name">Full Name</Label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    id="signup-name"
                                                    className="pl-9 h-11 bg-background/50 backdrop-blur-sm"
                                                    type="text"
                                                    placeholder="John Doe"
                                                    value={fullName}
                                                    onChange={(e) => setFullName(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="signup-email">{t("auth.emailLabel")}</Label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    id="signup-email"
                                                    className="pl-9 h-11 bg-background/50 backdrop-blur-sm"
                                                    type="email"
                                                    placeholder="name@example.com"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="signup-password">{t("auth.passwordLabel")}</Label>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    id="signup-password"
                                                    className="pl-9 h-11 bg-background/50 backdrop-blur-sm"
                                                    type="password"
                                                    placeholder="••••••••"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    minLength={6}
                                                    required
                                                />
                                            </div>
                                            <p className="text-xs text-muted-foreground">{t("auth.passwordHint")}</p>
                                        </div>
                                        <Button type="submit" className="w-full h-11 text-base group" disabled={isLoading}>
                                            {isLoading ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    {t("auth.signUpLoading")}
                                                </>
                                            ) : (
                                                <>
                                                    {t("auth.signUpButton")}
                                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                </motion.div>
                            </TabsContent>
                        </AnimatePresence>
                    </Tabs>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-muted/50" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        className="w-full h-11 relative overflow-hidden transition-all hover:bg-slate-50 hover:text-slate-900 dark:hover:bg-slate-800"
                        onClick={handleGoogleLogin}
                    >
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-10 transition-opacity bg-primary" />
                        <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                            <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                        </svg>
                        Google
                    </Button>

                    <p className="text-center text-sm text-muted-foreground mt-6">
                        By continuing, you agree to our <a href="#" className="underline hover:text-primary">Terms of Service</a> and <a href="#" className="underline hover:text-primary">Privacy Policy</a>.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Auth;




