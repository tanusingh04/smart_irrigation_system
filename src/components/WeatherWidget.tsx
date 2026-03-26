import { CloudSun, Droplets, Wind, MapPin, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWeather } from "@/contexts/WeatherContext";
import { Button } from "./ui/button";

export const WeatherWidget = () => {
    const { weather, refetchWeather } = useWeather();

    return (
        <Card className="glass-card border-0 mb-6">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <CloudSun className="h-5 w-5 text-primary" />
                        <span className="text-primary">Weather</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-full hover:bg-white/10" 
                            onClick={() => refetchWeather()}
                            disabled={weather.loading}
                        >
                            <RefreshCw className={`h-4 w-4 ${weather.loading ? 'animate-spin' : ''}`} />
                        </Button>
                        <div className="flex items-center gap-1.5 text-sm font-normal text-muted-foreground bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>{weather.city}</span>
                        </div>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {weather.error ? (
                    <div className="text-center py-4 text-sm text-red-400">{weather.error}</div>
                ) : (
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/5 transition-colors">
                            <span className="text-2xl font-bold text-foreground">
                                {weather.loading ? "--" : `${weather.temp}°C`}
                            </span>
                            <span className="text-xs text-muted-foreground">Temperature</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-1">
                                <Droplets className="h-4 w-4 text-blue-400" />
                                <span className="text-2xl font-bold text-foreground">
                                    {weather.loading ? "--" : `${weather.humidity}%`}
                                </span>
                            </div>
                            <span className="text-xs text-muted-foreground">Humidity</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-1">
                                <Wind className="h-4 w-4 text-gray-400" />
                                <span className="text-2xl font-bold text-foreground">
                                    {weather.loading ? "--" : `${weather.windSpeed}km/h`}
                                </span>
                            </div>
                            <span className="text-xs text-muted-foreground">Wind</span>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
