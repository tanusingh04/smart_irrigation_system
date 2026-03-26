import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { User } from "@supabase/supabase-js";
import { useLanguage } from "@/contexts/LanguageContext";

import { useLocation } from "@/contexts/LocationContext";

const Settings = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const { location, updateLocation } = useLocation();

  const [user, setUser] = useState<User | null>(null);
  const [city, setCity] = useState(location.city);
  const [state, setState] = useState(location.state);
  const [pincode, setPincode] = useState(location.pincode);

  useEffect(() => {
    setCity(location.city);
    setState(location.state);
    setPincode(location.pincode);
  }, [location]);

  const handleLocationUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateLocation({ city, state, pincode });
    toast({
      title: t("settings.successTitle"),
      description: t("settings.locationSaved"),
    });
  };

  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast({
        title: t("settings.errorTitle"),
        description: t("settings.mismatchDescription"),
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: t("settings.errorTitle"),
        description: t("settings.lengthDescription"),
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    setLoading(false);

    if (error) {
      toast({
        title: t("settings.errorTitle"),
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: t("settings.successTitle"),
        description: t("settings.successDescription"),
      });
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">{t("settings.title")}</h1>
        <p className="text-muted-foreground">{t("settings.subtitle")}</p>
      </div>

      <div className="space-y-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>{t("settings.accountInfoTitle")}</CardTitle>
            <CardDescription>{t("settings.accountInfoDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>{t("settings.emailLabel")}</Label>
              <Input value={user?.email || ""} disabled className="bg-muted" />
              <p className="text-xs text-muted-foreground">{t("settings.emailHelper")}</p>
            </div>
            <div className="space-y-2">
              <Label>{t("settings.accountIdLabel")}</Label>
              <Input value={user?.id || ""} disabled className="bg-muted font-mono text-xs" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>{t("settings.securityTitle")}</CardTitle>
            <CardDescription>{t("settings.securityDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">{t("settings.newPasswordLabel")}</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">{t("settings.confirmPasswordLabel")}</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <p className="text-xs text-muted-foreground">{t("settings.passwordHelper")}</p>
              <Button type="submit" disabled={loading}>
                {loading ? t("settings.updatingPassword") : t("settings.updatePassword")}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="shadow-card border-secondary/20 mb-6">
          <CardHeader>
            <CardTitle>{t("settings.locationTitle")}</CardTitle>
            <CardDescription>{t("settings.locationDescription")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLocationUpdate} className="grid gap-4 md:grid-cols-3">
              <div className="md:col-span-3 flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if ("geolocation" in navigator) {
                      toast({
                        title: "Detecting location...",
                        description: "Please allow location access.",
                      });
                      navigator.geolocation.getCurrentPosition(
                        async (position) => {
                          try {
                            const { latitude, longitude } = position.coords;
                            const response = await fetch(
                              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
                            );
                            const data = await response.json();

                            setCity(data.city || data.locality || "");
                            setState(data.principalSubdivision || "");
                            setPincode(data.postcode || "");

                            toast({
                              title: "Location Detected",
                              description: `Found location: ${data.city || data.locality}, ${data.principalSubdivision}`,
                            });
                          } catch (error) {
                            console.error("Geocoding error:", error);
                            toast({
                              title: "Error",
                              description: "Could not fetch address details. Please fill manually.",
                              variant: "destructive",
                            });
                          }
                        },
                        (error) => {
                          toast({
                            title: "Error",
                            description: "Could not detect location. Please enter manually.",
                            variant: "destructive",
                          });
                        }
                      );
                    }
                  }}
                >
                  📍 Auto-Detect Location
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">{t("settings.cityLabel")}</Label>
                <Input
                  id="city"
                  placeholder="e.g. Anand"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">{t("settings.stateLabel")}</Label>
                <Input
                  id="state"
                  placeholder="e.g. Gujarat"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pincode">{t("settings.pincodeLabel")}</Label>
                <Input
                  id="pincode"
                  placeholder="e.g. 388001"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
              </div>
              <div className="md:col-span-3 flex justify-end mt-2">
                <Button type="submit" variant="default" className="w-full md:w-auto">
                  {t("settings.saveLocation")}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="shadow-card border-warning">
          <CardHeader>
            <CardTitle className="text-warning">{t("settings.systemConfigTitle")}</CardTitle>
            <CardDescription>{t("settings.systemConfigDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>{t("settings.irrigationThresholdLabel")}</Label>
              <Input type="number" placeholder="40" defaultValue="40" />
              <p className="text-xs text-muted-foreground">{t("settings.irrigationThresholdHelper")}</p>
            </div>
            <Separator />
            <div className="space-y-2">
              <Label>{t("settings.alertMethodLabel")}</Label>
              <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                <option>{t("settings.alertMethodEmailApp")}</option>
                <option>{t("settings.alertMethodEmail")}</option>
                <option>{t("settings.alertMethodApp")}</option>
              </select>
            </div>
            <Button variant="secondary">{t("settings.saveConfiguration")}</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
