import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Droplets, Sprout, Volume2, Flame, Settings, Activity } from "lucide-react";
import { MonitoringCard } from "@/components/MonitoringCard";
import { ControlPanel } from "@/components/ControlPanel";
import { AlertSystem } from "@/components/AlertSystem";
import { HeroSection } from "@/components/HeroSection";
import { useLanguage } from "@/contexts/LanguageContext";

import { WeatherWidget } from "@/components/WeatherWidget";
import { AnalyticsSection } from "@/components/AnalyticsSection";

const Index = () => {
  const { t } = useLanguage();
  const [autoIrrigation, setAutoIrrigation] = useState(true);
  const [soundSystem, setSoundSystem] = useState(true);

  const [soilMoisture, setSoilMoisture] = useState(65);
  const [animalDetected, setAnimalDetected] = useState(false);
  const [fireDetected, setFireDetected] = useState(false);
  const timeoutIds = useRef<number[]>([]);

  const registerTimeout = useCallback((callback: () => void, delay: number) => {
    if (typeof window === "undefined") return;
    const id = window.setTimeout(() => {
      callback();
      timeoutIds.current = timeoutIds.current.filter((storedId) => storedId !== id);
    }, delay);
    timeoutIds.current.push(id);
  }, []);

  const clearAllTimeouts = useCallback(() => {
    timeoutIds.current.forEach((id) => {
      if (typeof window !== "undefined") {
        window.clearTimeout(id);
      }
    });
    timeoutIds.current = [];
  }, []);

  useEffect(() => {
    return () => {
      clearAllTimeouts();
    };
  }, [clearAllTimeouts]);

  const handleManualIrrigation = useCallback(() => {
    setSoilMoisture(85);
    registerTimeout(() => setSoilMoisture(65), 3000);
  }, [registerTimeout]);

  const handleTestAnimalDetection = useCallback(() => {
    setAnimalDetected(true);
    registerTimeout(() => setAnimalDetected(false), 5000);
  }, [registerTimeout]);

  const handleTestFireDetection = useCallback(() => {
    setFireDetected(true);
    registerTimeout(() => setFireDetected(false), 5000);
  }, [registerTimeout]);

  const monitoringCards = useMemo(
    () => [
      {
        title: t("dashboard.cards.soilMoisture.title"),
        value: `${soilMoisture}%`,
        icon: Droplets,
        status: (soilMoisture < 40 ? "warning" : "success") as "warning" | "success",
        description: soilMoisture < 40 ? t("dashboard.cards.soilMoisture.warning") : t("dashboard.cards.soilMoisture.success"),
      },
      {
        title: t("dashboard.cards.irrigation.title"),
        value: autoIrrigation ? t("dashboard.cards.irrigation.active") : t("dashboard.cards.irrigation.inactive"),
        icon: Sprout,
        status: (autoIrrigation ? "success" : "idle") as "success" | "idle",
        description: autoIrrigation
          ? t("dashboard.cards.irrigation.descriptionActive")
          : t("dashboard.cards.irrigation.descriptionInactive"),
      },
      {
        title: t("dashboard.cards.fertilizer.title"),
        value: t("dashboard.cards.fertilizer.value"),
        icon: Activity,
        status: "success" as const,
        description: t("dashboard.cards.fertilizer.description"),
      },
      {
        title: t("dashboard.cards.soundSystem.title"),
        value: soundSystem ? t("dashboard.cards.soundSystem.armed") : t("dashboard.cards.soundSystem.disarmed"),
        icon: Volume2,
        status: (soundSystem ? "success" : "idle") as "success" | "idle",
        description: animalDetected ? t("dashboard.cards.soundSystem.alert") : t("dashboard.cards.soundSystem.monitoring"),
        alert: animalDetected,
      },
      {
        title: t("dashboard.cards.fireDetection.title"),
        value: fireDetected ? t("dashboard.cards.fireDetection.alert") : t("dashboard.cards.fireDetection.normal"),
        icon: Flame,
        status: (fireDetected ? "error" : "success") as "error" | "success",
        description: fireDetected
          ? t("dashboard.cards.fireDetection.descriptionAlert")
          : t("dashboard.cards.fireDetection.descriptionNormal"),
        alert: fireDetected,
      },
      {
        title: t("dashboard.cards.systemHealth.title"),
        value: t("dashboard.cards.systemHealth.value"),
        icon: Settings,
        status: "success" as const,
        description: t("dashboard.cards.systemHealth.description"),
      },
    ],
    [soilMoisture, autoIrrigation, soundSystem, animalDetected, fireDetected, t],
  );

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />

      <main className="container mx-auto px-4 py-12" id="dashboard-content">
        <WeatherWidget />

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2 text-glow">{t("dashboard.title")}</h2>
          <p className="text-muted-foreground">{t("dashboard.subtitle")}</p>
        </div>

        <AlertSystem
          animalDetected={animalDetected}
          fireDetected={fireDetected}
          soundSystem={soundSystem}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {monitoringCards.map((card) => (
            <MonitoringCard key={card.title} {...card} />
          ))}
        </div>

        <AnalyticsSection />

        <ControlPanel
          autoIrrigation={autoIrrigation}
          setAutoIrrigation={setAutoIrrigation}
          soundSystem={soundSystem}
          setSoundSystem={setSoundSystem}
          onManualIrrigation={handleManualIrrigation}
          onTestAnimalDetection={handleTestAnimalDetection}
          onTestFireDetection={handleTestFireDetection}
        />
      </main>
    </div>
  );
};

export default Index;
