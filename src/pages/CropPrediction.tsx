import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Sprout, Droplets, ThermometerSun, FlaskConical, Wind, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useWeather } from "@/contexts/WeatherContext";

const CropPrediction = () => {
    const { t } = useLanguage();
    const { toast } = useToast();
    const { weather } = useWeather();
    const [loading, setLoading] = useState(false);
    const [prediction, setPrediction] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        nitrogen: "",
        phosphorus: "",
        potassium: "",
        temperature: "",
        humidity: "",
        ph: "",
        rainfall: "",
        soilMoisture: "",
        windSpeed: "",
        season: "kharif",
        soilType: "alluvial",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSyncWeather = () => {
        setFormData(prev => ({
            ...prev,
            temperature: weather.temp.toString(),
            humidity: weather.humidity.toString(),
            windSpeed: weather.windSpeed.toString(),
        }));
        toast({
            title: "Weather Linked",
            description: `Synced data for ${weather.city}`,
        });
    };

    const handlePredict = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call and prediction logic
        setTimeout(() => {
            setLoading(false);

            // Simple mock logic for demonstration
            const n = parseFloat(formData.nitrogen);
            const p = parseFloat(formData.phosphorus);
            const k = parseFloat(formData.potassium);
            const moisture = parseFloat(formData.soilMoisture);

            let result = "rice"; // Default

            // Simple logic based on season and soil type prioritization
            if (formData.season === "winter") result = "wheat";
            else if (formData.season === "summer") result = "watermelon";
            else if (formData.season === "zaid") result = "cucumber";
            else if (formData.soilType === "black") result = "cotton";
            else if (formData.soilType === "sandy" && k > 40) result = "maize";
            else if (formData.soilType === "clayey") result = "rice";
            else if (moisture < 30) result = "millets";
            else if (n > 100) result = "sugarcane";
            else if (k > 50) result = "banana";
            else if (p > 50) result = "grapes";
            else if (parseFloat(formData.rainfall) > 200) result = "rice";
            else if (parseFloat(formData.rainfall) < 500) result = "maize";
            else if (parseFloat(formData.humidity) > 80) result = "coconut";

            setPrediction(result);

            toast({
                title: t("cropPrediction.successTitle"),
                description: t("cropPrediction.successDescription"),
            });
        }, 1500);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
                    <Sprout className="h-8 w-8 text-primary" />
                    {t("cropPrediction.title")}
                </h1>
                <div className="flex items-center justify-between gap-4">
                    <p className="text-muted-foreground">{t("cropPrediction.subtitle")}</p>
                    <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleSyncWeather}
                        className="flex items-center gap-2 border-primary/20 hover:border-primary/50"
                    >
                        <RefreshCw className="h-4 w-4 text-primary" />
                        Use My Location's Weather
                    </Button>
                </div>
            </div>

            <div className="grid gap-6">
                <Card className="shadow-card border-primary/10">
                    <CardHeader>
                        <CardTitle>{t("cropPrediction.formTitle")}</CardTitle>
                        <CardDescription>{t("cropPrediction.formDescription")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handlePredict} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Soil Nutrients */}
                                <div className="space-y-2">
                                    <Label htmlFor="nitrogen" className="flex items-center gap-1.5">
                                        <FlaskConical className="h-4 w-4 text-blue-500" />
                                        {t("cropPrediction.nitrogen")}
                                    </Label>
                                    <Input
                                        id="nitrogen"
                                        type="number"
                                        placeholder="e.g 90"
                                        value={formData.nitrogen}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phosphorus" className="flex items-center gap-1.5">
                                        <FlaskConical className="h-4 w-4 text-purple-500" />
                                        {t("cropPrediction.phosphorus")}
                                    </Label>
                                    <Input
                                        id="phosphorus"
                                        type="number"
                                        placeholder="e.g 42"
                                        value={formData.phosphorus}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="potassium" className="flex items-center gap-1.5">
                                        <FlaskConical className="h-4 w-4 text-red-500" />
                                        {t("cropPrediction.potassium")}
                                    </Label>
                                    <Input
                                        id="potassium"
                                        type="number"
                                        placeholder="e.g 43"
                                        value={formData.potassium}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Atmosphere */}
                                <div className="space-y-2">
                                    <Label htmlFor="temperature" className="flex items-center gap-1.5">
                                        <ThermometerSun className="h-4 w-4 text-orange-500" />
                                        {t("cropPrediction.temperature")}
                                    </Label>
                                    <Input
                                        id="temperature"
                                        type="number"
                                        placeholder="e.g 20.5"
                                        value={formData.temperature}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="humidity" className="flex items-center gap-1.5">
                                        <Droplets className="h-4 w-4 text-blue-400" />
                                        {t("cropPrediction.humidity")}
                                    </Label>
                                    <Input
                                        id="humidity"
                                        type="number"
                                        placeholder="e.g 82"
                                        value={formData.humidity}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="ph" className="flex items-center gap-1.5">
                                        <FlaskConical className="h-4 w-4 text-green-500" />
                                        {t("cropPrediction.ph")}
                                    </Label>
                                    <Input
                                        id="ph"
                                        type="number"
                                        placeholder="e.g 6.5"
                                        step="0.1"
                                        value={formData.ph}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="rainfall" className="flex items-center gap-1.5">
                                        <Droplets className="h-4 w-4 text-cyan-600" />
                                        {t("cropPrediction.rainfall")}
                                    </Label>
                                    <Input
                                        id="rainfall"
                                        type="number"
                                        placeholder="e.g 202.9"
                                        value={formData.rainfall}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="soilMoisture" className="flex items-center gap-1.5">
                                        <Droplets className="h-4 w-4 text-blue-600" />
                                        {t("cropPrediction.soilMoisture")}
                                    </Label>
                                    <Input
                                        id="soilMoisture"
                                        type="number"
                                        placeholder="e.g 40"
                                        value={formData.soilMoisture}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="windSpeed" className="flex items-center gap-1.5">
                                        <Wind className="h-4 w-4 text-gray-500" />
                                        {t("cropPrediction.windSpeed")}
                                    </Label>
                                    <Input
                                        id="windSpeed"
                                        type="number"
                                        placeholder="e.g 10"
                                        value={formData.windSpeed}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="season" className="flex items-center gap-1.5">
                                        <Sprout className="h-4 w-4 text-green-500" />
                                        {t("cropPrediction.season")}
                                    </Label>
                                    <select
                                        id="season"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={formData.season}
                                        onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                                    >
                                        <option value="kharif">Kharif</option>
                                        <option value="rabi">Rabi</option>
                                        <option value="zaid">Zaid</option>
                                        <option value="summer">Summer</option>
                                        <option value="winter">Winter</option>
                                        <option value="monsoon">Monsoon</option>
                                    </select>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="soilType" className="flex items-center gap-1.5">
                                        <Sprout className="h-4 w-4 text-amber-700" />
                                        {t("cropPrediction.soilType")}
                                    </Label>
                                    <select
                                        id="soilType"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={formData.soilType}
                                        onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                                    >
                                        <option value="alluvial">Alluvial</option>
                                        <option value="black">Black</option>
                                        <option value="red">Red</option>
                                        <option value="sandy">Sandy</option>
                                        <option value="clayey">Clayey</option>
                                        <option value="loamy">Loamy</option>
                                    </select>
                                </div>

                            </div>

                            <div className="pt-4">
                                <Button type="submit" className="w-full md:w-auto" disabled={loading} size="lg">
                                    {loading ? t("cropPrediction.predicting") : t("cropPrediction.predictButton")}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {prediction && (
                    <Card className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <CardHeader>
                            <CardTitle className="text-green-800 dark:text-green-300">
                                {t("cropPrediction.resultTitle")}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                                    <Sprout className="h-8 w-8 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">{t("cropPrediction.recommendedCrop")}</p>
                                    <p className="text-3xl font-bold text-green-700 dark:text-green-400">
                                        {t(`crops.${prediction}` as any)}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default CropPrediction;
