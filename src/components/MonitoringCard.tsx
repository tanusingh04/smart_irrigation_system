import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface MonitoringCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  status: "success" | "warning" | "error" | "idle";
  description: string;
  alert?: boolean;
}

export const MonitoringCard = ({
  title,
  value,
  icon: Icon,
  status,
  description,
  alert = false,
}: MonitoringCardProps) => {
  const statusColors = {
    success: "text-success",
    warning: "text-warning",
    error: "text-destructive",
    idle: "text-muted-foreground",
  };

  const statusBgColors = {
    success: "bg-success/10",
    warning: "bg-warning/10",
    error: "bg-destructive/10",
    idle: "bg-muted",
  };

  return (
    <Card className={cn(
      "glass-card border-0",
      alert && "animate-pulse ring-2 ring-destructive"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <div className={cn("p-2 rounded-lg backdrop-blur-sm", statusBgColors[status])}>
            <Icon className={cn("h-5 w-5", statusColors[status])} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-3xl font-bold text-foreground text-glow">{value}</p>
          <CardDescription className="flex items-center gap-2">
            <Badge
              variant={status === "error" ? "destructive" : "secondary"}
              className={cn(
                "backdrop-blur-sm",
                status === "success" && "bg-success/20 text-success-foreground hover:bg-success/30",
                status === "warning" && "bg-warning/20 text-warning-foreground hover:bg-warning/30"
              )}
            >
              {description}
            </Badge>
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  );
};
