import { Package, MessageCircle, AlertTriangle, FileText, Clock } from "lucide-react";

interface PulseItem {
  icon: React.ElementType;
  label: string;
  value: string;
  status: "ok" | "warning" | "risk";
}

const pulseData: PulseItem[] = [
  { icon: Package, label: "Orders today", value: "12 new, ₹48,500", status: "ok" },
  { icon: MessageCircle, label: "Pending replies", value: "3 customers waiting", status: "warning" },
  { icon: AlertTriangle, label: "Vendor status", value: "All deliveries on track", status: "ok" },
  { icon: FileText, label: "GST status", value: "Filing due in 8 days", status: "warning" },
  { icon: Clock, label: "Your hours today", value: "6h 30m — good pace!", status: "ok" },
];

const statusStyles = {
  ok: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/10 text-warning border-warning/30",
  risk: "bg-destructive/10 text-destructive border-destructive/20",
};

const BusinessPulse = () => {
  return (
    <section className="px-4 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Today's Business Pulse</h2>
        <span className="text-xs text-muted-foreground">Updated 2 min ago</span>
      </div>

      <div className="space-y-3">
        {pulseData.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="bg-card rounded-2xl p-4 shadow-card border border-border/50 flex items-center gap-4 transition-all hover:shadow-soft"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${statusStyles[item.status]}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="text-base font-medium text-foreground truncate">{item.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BusinessPulse;
