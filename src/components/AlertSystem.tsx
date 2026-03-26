import { useEffect } from "react";
import { AlertCircle, Volume2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSoundAlert } from "@/hooks/useSoundAlert";

interface AlertSystemProps {
  animalDetected: boolean;
  fireDetected: boolean;
  soundSystem: boolean;
}

export const AlertSystem = ({ animalDetected, fireDetected, soundSystem }: AlertSystemProps) => {
  const { toast } = useToast();
  const { t } = useLanguage();

  // Determine active alert (Fire takes precedence)
  const activeAlert = fireDetected ? 'fire' : (animalDetected && soundSystem ? 'cattle' : null);

  useSoundAlert(activeAlert);

  useEffect(() => {
    if (animalDetected && soundSystem) {
      toast({
        title: t("alerts.animalToastTitle"),
        description: t("alerts.animalToastDescription"),
        variant: "default",
      });
    }
  }, [animalDetected, soundSystem, toast, t]);

  useEffect(() => {
    if (fireDetected) {
      toast({
        title: t("alerts.fireToastTitle"),
        description: t("alerts.fireToastDescription"),
        variant: "destructive",
      });
    }
  }, [fireDetected, toast, t]);

  return (
    <div className="space-y-4 mb-8">
      {animalDetected && soundSystem && (
        <Alert className="border-warning bg-warning/10 backdrop-blur-sm animate-in slide-in-from-top-2 duration-300">
          <Volume2 className="h-5 w-5 text-warning" />
          <AlertTitle className="text-warning font-semibold">{t("alerts.animalBannerTitle")}</AlertTitle>
          <AlertDescription className="text-warning-foreground">
            {t("alerts.animalBannerDescription")}
          </AlertDescription>
        </Alert>
      )}

      {fireDetected && (
        <Alert className="border-destructive bg-destructive/10 animate-in slide-in-from-top-2 duration-300">
          <AlertCircle className="h-5 w-5 text-destructive animate-pulse" />
          <AlertTitle className="text-destructive font-bold">{t("alerts.fireBannerTitle")}</AlertTitle>
          <AlertDescription className="text-destructive-foreground">
            {t("alerts.fireBannerDescription")}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
