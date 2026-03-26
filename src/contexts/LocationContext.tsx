import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface LocationState {
    city: string;
    state: string;
    pincode: string;
}

interface LocationContextType {
    location: LocationState;
    updateLocation: (newLocation: LocationState) => void;
}

const defaultLocation: LocationState = {
    city: "",
    state: "",
    pincode: "",
};

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
    const [location, setLocation] = useState<LocationState>(() => {
        const saved = localStorage.getItem("farm_location");
        return saved ? JSON.parse(saved) : defaultLocation;
    });

    const updateLocation = (newLocation: LocationState) => {
        setLocation(newLocation);
        localStorage.setItem("farm_location", JSON.stringify(newLocation));
    };

    return (
        <LocationContext.Provider value={{ location, updateLocation }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocation = () => {
    const context = useContext(LocationContext);
    if (context === undefined) {
        throw new Error("useLocation must be used within a LocationProvider");
    }
    return context;
};
