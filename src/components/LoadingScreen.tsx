import { Sprout } from "lucide-react";

interface LoadingScreenProps {
  message?: string;
  fullScreen?: boolean;
}

const containerBase = "flex items-center justify-center bg-background";

export const LoadingScreen = ({ message = "Loading...", fullScreen = true }: LoadingScreenProps) => (
  <div className={`${containerBase} ${fullScreen ? "min-h-screen" : "py-12"}`}>
    <div className="text-center space-y-4">
      <div className="inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary/40">
        <Sprout className="h-6 w-6 text-primary animate-spin" />
      </div>
      <p className="text-muted-foreground">{message}</p>
    </div>
  </div>
);

