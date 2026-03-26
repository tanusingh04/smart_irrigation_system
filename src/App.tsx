import { Suspense, lazy } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { LocationProvider } from "@/contexts/LocationContext";
import { WeatherProvider } from "@/contexts/WeatherContext";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { LoadingScreen } from "@/components/LoadingScreen";

const Index = lazy(() => import("./pages/Index"));
const Settings = lazy(() => import("./pages/Settings"));
const CropPrediction = lazy(() => import("./pages/CropPrediction"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Auth = lazy(() => import("./pages/Auth"));
const AppSidebar = lazy(() =>
  import("./components/AppSidebar").then((module) => ({ default: module.AppSidebar })),
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <LocationProvider>
        <WeatherProvider>
          <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<LoadingScreen />}>
              <Routes>
                <Route path="/auth" element={<Auth />} />

                <Route
                  path="/*"
                  element={
                    <SidebarProvider>
                      <div className="flex min-h-screen w-full">
                        <AppSidebar />
                        <div className="flex-1 flex flex-col">
                          <header className="h-12 flex items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 px-2">
                            <SidebarTrigger />
                            <div className="ml-auto">
                              <LanguageSelector />
                            </div>
                          </header>
                          <main className="flex-1">
                            <Routes>
                              <Route path="/" element={<Index />} />
                              <Route path="/crop-prediction" element={<CropPrediction />} />
                              <Route path="/settings" element={<Settings />} />
                              <Route path="*" element={<NotFound />} />
                            </Routes>
                          </main>
                        </div>
                      </div>
                    </SidebarProvider>
                  }
                />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </WeatherProvider>
    </LocationProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
