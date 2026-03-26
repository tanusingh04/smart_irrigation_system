import { Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <header className="relative bg-gradient-primary text-primary-foreground overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDEzNGg1djVoLTV6TTUxIDE0OWg1djVoLTV6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>

      <div className="container mx-auto px-4 py-20 relative">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-primary-foreground/10 p-4 rounded-2xl backdrop-blur-sm">
            <Sprout className="h-12 w-12" />
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-center mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {t("hero.title")}
        </h1>

        <p className="text-xl text-center text-primary-foreground/90 max-w-3xl mx-auto mb-8 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
          {t("hero.description")}
        </p>

        <div className="flex flex-wrap gap-4 justify-center animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
          <Button
            size="lg"
            variant="secondary"
            className="shadow-lg hover:shadow-xl transition-shadow"
            onClick={() => {
              const element = document.getElementById('dashboard-content');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {t("hero.primaryCta")}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-primary-foreground/10 border-primary-foreground/30 hover:bg-primary-foreground/20 text-primary-foreground shadow-lg"
          >
            {t("hero.secondaryCta")}
          </Button>
        </div>
      </div>
    </header>
  );
};
