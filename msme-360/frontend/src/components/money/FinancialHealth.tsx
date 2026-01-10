import { CheckCircle, AlertTriangle, AlertCircle, Download, FileText, TrendingUp } from "lucide-react";

interface HealthItem {
  label: string;
  status: "ok" | "warning" | "risk";
  detail: string;
}

const healthData: HealthItem[] = [
  { label: "Cash Flow", status: "ok", detail: "Healthy — ₹2.4L available" },
  { label: "Receivables", status: "warning", detail: "₹85,000 overdue by 15+ days" },
  { label: "GST Status", status: "warning", detail: "Filing due in 8 days" },
  { label: "Invoice Errors", status: "ok", detail: "All invoices validated" },
];

const statusIcons = {
  ok: CheckCircle,
  warning: AlertTriangle,
  risk: AlertCircle,
};

const statusStyles = {
  ok: { bg: "bg-success/10", text: "text-success", border: "border-success/20" },
  warning: { bg: "bg-warning/10", text: "text-warning", border: "border-warning/30" },
  risk: { bg: "bg-destructive/10", text: "text-destructive", border: "border-destructive/20" },
};

const FinancialHealth = () => {
  return (
    <section className="px-4 animate-fade-in">
      <h2 className="text-lg font-semibold text-foreground mb-4">Financial Health</h2>

      <div className="space-y-3">
        {healthData.map((item, index) => {
          const Icon = statusIcons[item.status];
          const styles = statusStyles[item.status];

          return (
            <div
              key={index}
              className={`bg-card rounded-2xl p-4 shadow-card border ${styles.border} flex items-center gap-4`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${styles.bg}`}>
                <Icon className={`w-5 h-5 ${styles.text}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="text-base font-medium text-foreground">{item.detail}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <button className="bg-card rounded-2xl p-4 shadow-card border border-border/50 flex flex-col items-center gap-2 hover:shadow-soft transition-all">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <span className="text-sm font-medium text-foreground">Auto-read Invoices</span>
        </button>

        <button className="bg-card rounded-2xl p-4 shadow-card border border-border/50 flex flex-col items-center gap-2 hover:shadow-soft transition-all">
          <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
            <Download className="w-6 h-6 text-secondary" />
          </div>
          <span className="text-sm font-medium text-foreground">Export for CA</span>
        </button>
      </div>

      {/* Revenue Summary */}
      <div className="mt-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-4 border border-primary/20">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-foreground">This Month</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Revenue</p>
            <p className="text-xl font-bold text-foreground">₹4.8L</p>
            <p className="text-xs text-success">+12% vs last month</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Expenses</p>
            <p className="text-xl font-bold text-foreground">₹2.1L</p>
            <p className="text-xs text-muted-foreground">On track</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinancialHealth;
