import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useLocation } from "./LocationContext";

interface WeatherData {
    temp: number;
    humidity: number;
    windSpeed: number;
    condition: string;
    city: string;
    loading: boolean;
    error: string | null;
}

interface WeatherContextType {
    weather: WeatherData;
    refetchWeather: () => Promise<void>;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
    const { location: manualLocation } = useLocation();
    const [weather, setWeather] = useState<WeatherData>({
        temp: 24,
        humidity: 45,
        windSpeed: 12,
        condition: "Clear",
        city: "Loading...",
        loading: true,
        error: null,
    });

    const fetchWeatherData = async (lat?: number, lon?: number, city?: string) => {
        setWeather(prev => ({ ...prev, loading: true, error: null }));
        try {
            let query = city || "London"; // Default
            if (lat && lon) {
                query = `${lat},${lon}`;
            }

            const response = await fetch(`https://wttr.in/${query}?format=j1`);
            if (!response.ok) throw new Error("Weather data fetch failed");
            
            const data = await response.json();
            const current = data.current_condition?.[0];
            const area = data.nearest_area?.[0];

            if (!current || !area) throw new Error("Incomplete weather data received");

            setWeather({
                temp: parseInt(current.temp_C),
                humidity: parseInt(current.humidity),
                windSpeed: parseInt(current.windspeedKmph),
                condition: current.weatherDesc?.[0]?.value || "Clear",
                city: city || area.areaName?.[0]?.value || "Your Location",
                loading: false,
                error: null,
            });
        } catch (err) {
            console.error("Weather fetch error:", err);
            setWeather(prev => ({ 
                ...prev, 
                loading: false, 
                error: "Failed to fetch weather data",
                city: city || "Local Field"
            }));
        }
    };

    const refetchWeather = async () => {
        if (manualLocation.city) {
            await fetchWeatherData(undefined, undefined, manualLocation.city);
        } else if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => fetchWeatherData(pos.coords.latitude, pos.coords.longitude),
                (err) => {
                    console.warn("Geolocation error:", err.message);
                    fetchWeatherData(); // Fallback to default
                },
                { timeout: 10000 }
            );
        } else {
            await fetchWeatherData();
        }
    };

    useEffect(() => {
        refetchWeather();
    }, [manualLocation.city]);

    return (
        <WeatherContext.Provider value={{ weather, refetchWeather }}>
            {children}
        </WeatherContext.Provider>
    );
};

export const useWeather = () => {
    const context = useContext(WeatherContext);
    if (context === undefined) {
        throw new Error("useWeather must be used within a WeatherProvider");
    }
    return context;
};
