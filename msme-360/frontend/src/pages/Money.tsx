import DesktopLayout from "@/components/layout/DesktopLayout";
import FinancialHealth from "@/components/money/FinancialHealth";
import { IndianRupee, Download, FileText, AlertTriangle, CheckCircle, TrendingUp, TrendingDown } from "lucide-react";

const gstAlerts = [
  {
    id: "1",
    type: "warning",
    message: "GSTR-3B due in 5 days",
    details: "Tax liability: ₹24,500",
  },
  {
    id: "2",
    type: "success",
    message: "GSTR-1 filed successfully",
    details: "Filed on Jan 5, 2026",
  },
];

const recentInvoices = [
  { id: "INV-001", vendor: "Raj Supplies", amount: 45000, status: "matched", date: "Today" },
  { id: "INV-002", vendor: "ABC Traders", amount: 12500, status: "pending", date: "Yesterday" },
  { id: "INV-003", vendor: "XYZ Corp", amount: 78000, status: "matched", date: "Jan 5" },
  { id: "INV-004", vendor: "Local Mart", amount: 5600, status: "mismatch", date: "Jan 4" },
];

const Money = () => {
  return (
    <DesktopLayout>
      <div className="h-full flex flex-col overflow-hidden">
        {/* Header */}
        <header className="px-8 py-6 border-b border-border bg-background">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <IndianRupee className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Finance & GST</h1>
                <p className="text-sm text-muted-foreground">Your complete financial snapshot</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium">
              <Download className="w-4 h-4" />
              Export for CA
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column - Financial Health */}
            <div className="xl:col-span-2 space-y-6">
              <FinancialHealth />
              
              {/* Revenue Summary */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="text-lg font-semibold mb-6">Monthly Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-success/5 rounded-xl border border-success/20">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-success" />
                      <span className="text-sm text-muted-foreground">Revenue</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">₹4,85,000</p>
                    <p className="text-xs text-success mt-1">+12% from last month</p>
                  </div>
                  <div className="p-4 bg-risk/5 rounded-xl border border-risk/20">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingDown className="w-4 h-4 text-risk" />
                      <span className="text-sm text-muted-foreground">Expenses</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">₹2,12,000</p>
                    <p className="text-xs text-risk mt-1">+5% from last month</p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <IndianRupee className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Net Profit</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">₹2,73,000</p>
                    <p className="text-xs text-primary mt-1">Healthy margin: 56%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - GST & Invoices */}
            <div className="space-y-6">
              {/* GST Alerts */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h3 className="text-lg font-semibold mb-4">GST Status</h3>
                <div className="space-y-3">
                  {gstAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`flex items-start gap-3 p-4 rounded-xl ${
                        alert.type === "warning" 
                          ? "bg-warning/10 border border-warning/20" 
                          : "bg-success/10 border border-success/20"
                      }`}
                    >
                      {alert.type === "warning" ? (
                        <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                      )}
                      <div>
                        <p className="font-medium text-foreground">{alert.message}</p>
                        <p className="text-sm text-muted-foreground">{alert.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Invoices */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Auto-Read Invoices</h3>
                  <FileText className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="space-y-3">
                  {recentInvoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                      <div>
                        <p className="font-medium text-foreground">{invoice.vendor}</p>
                        <p className="text-xs text-muted-foreground">{invoice.id} • {invoice.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{invoice.amount.toLocaleString()}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          invoice.status === "matched" 
                            ? "bg-success/20 text-success" 
                            : invoice.status === "mismatch"
                            ? "bg-risk/20 text-risk"
                            : "bg-warning/20 text-warning"
                        }`}>
                          {invoice.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DesktopLayout>
  );
};

export default Money;
