import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Droplets, Volume2, Flame, Bug } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ControlPanelProps {
  autoIrrigation: boolean;
  setAutoIrrigation: (value: boolean) => void;
  soundSystem: boolean;
  setSoundSystem: (value: boolean) => void;
  onManualIrrigation: () => void;
  onTestAnimalDetection: () => void;
  onTestFireDetection: () => void;
}

export const ControlPanel = ({
  autoIrrigation,
  setAutoIrrigation,
  soundSystem,
  setSoundSystem,
  onManualIrrigation,
  onTestAnimalDetection,
  onTestFireDetection,
}: ControlPanelProps) => {
  const { t } = useLanguage();

  return (
    <Card className="glass-card border-0">
      <CardHeader>
        <CardTitle className="text-2xl">{t("controlPanel.title")}</CardTitle>
        <CardDescription>{t("controlPanel.description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center justify-between space-x-4 p-4 rounded-lg bg-muted/50">
            <div className="space-y-1">
              <Label htmlFor="auto-irrigation" className="text-base font-semibold">
                {t("controlPanel.autoIrrigationTitle")}
              </Label>
              <p className="text-sm text-muted-foreground">{t("controlPanel.autoIrrigationDescription")}</p>
            </div>
            <Switch
              id="auto-irrigation"
              checked={autoIrrigation}
              onCheckedChange={setAutoIrrigation}
              className="data-[state=checked]:bg-primary"
            />
          </div>

          <div className="flex items-center justify-between space-x-4 p-4 rounded-lg bg-muted/50">
            <div className="space-y-1">
              <Label htmlFor="sound-system" className="text-base font-semibold">
                {t("controlPanel.soundSystemTitle")}
              </Label>
              <p className="text-sm text-muted-foreground">{t("controlPanel.soundSystemDescription")}</p>
            </div>
            <Switch
              id="sound-system"
              checked={soundSystem}
              onCheckedChange={setSoundSystem}
              className="data-[state=checked]:bg-primary"
            />
          </div>
        </div>

        <div className="pt-4 border-t">
          <h4 className="text-lg font-semibold mb-4">{t("controlPanel.quickActions")}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button
              onClick={onManualIrrigation}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              size="lg"
            >
              <Droplets className="mr-2 h-5 w-5" />
              {t("controlPanel.startIrrigation")}
            </Button>

            <Button
              onClick={onTestAnimalDetection}
              variant="outline"
              size="lg"
              className="border-2"
            >
              <Bug className="mr-2 h-5 w-5" />
              {t("controlPanel.testAnimal")}
            </Button>

            <Button
              onClick={onTestFireDetection}
              variant="outline"
              size="lg"
              className="border-2 border-destructive/50 hover:bg-destructive/10"
            >
              <Flame className="mr-2 h-5 w-5" />
              {t("controlPanel.testFire")}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
