import DesktopLayout from "@/components/layout/DesktopLayout";
import CustomerCard from "@/components/customers/CustomerCard";
import { Search, Users, UserPlus } from "lucide-react";
import { useState } from "react";

const customersData = [
  {
    name: "Rajesh Kumar",
    trustScore: 92,
    deliveryBehavior: "excellent" as const,
    pricingPattern: "Always pays on time, prefers bulk",
    aiRecommendation: "Great customer! Consider offering 5% loyalty discount on next order.",
    totalOrders: 47,
    lastOrder: "2 days ago",
  },
  {
    name: "Priya Textiles",
    trustScore: 78,
    deliveryBehavior: "good" as const,
    pricingPattern: "Negotiates 10-15%, pays within 7 days",
    aiRecommendation: "Consistent buyer. May respond well to new collection previews.",
    totalOrders: 23,
    lastOrder: "1 week ago",
  },
  {
    name: "Sharma Brothers",
    trustScore: 45,
    deliveryBehavior: "inconsistent" as const,
    pricingPattern: "Frequent delays, last payment was 20 days late",
    aiRecommendation: "Proceed with caution. Consider advance payment for orders above ₹10,000.",
    totalOrders: 12,
    lastOrder: "3 weeks ago",
  },
];

const vendorsData = [
  {
    name: "Raj Supplies",
    trustScore: 95,
    deliveryBehavior: "excellent" as const,
    pricingPattern: "Competitive pricing, consistent quality",
    aiRecommendation: "Your best vendor! Consider long-term contract for better rates.",
    totalOrders: 120,
    lastOrder: "Today",
  },
  {
    name: "ABC Raw Materials",
    trustScore: 82,
    deliveryBehavior: "good" as const,
    pricingPattern: "Fair pricing, occasional quality issues",
    aiRecommendation: "Good backup vendor. Always inspect deliveries before accepting.",
    totalOrders: 45,
    lastOrder: "3 days ago",
  },
];

const Customers = () => {
  const [activeTab, setActiveTab] = useState<"customers" | "vendors">("customers");
  const [searchQuery, setSearchQuery] = useState("");

  const currentData = activeTab === "customers" ? customersData : vendorsData;

  const filteredData = currentData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCardClick = (name: string) => {
    console.log("Open profile:", name);

    // future-ready:
    // navigate(`/customers/${slugify(name)}`)
    // openCustomerDrawer(name)
    // setSelectedCustomer(name)
  };

  return (
    <DesktopLayout>
      <div className="h-full flex flex-col overflow-hidden">
        {/* Header */}
        <header className="px-8 py-6 border-b border-border bg-background">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Customers & Vendors
                </h1>
                <p className="text-sm text-muted-foreground">
                  AI-powered relationship insights
                </p>
              </div>
            </div>

            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium">
              <UserPlus className="w-4 h-4" />
              Add New
            </button>
          </div>

          {/* Tabs + Search */}
          <div className="flex items-center gap-6 mt-6">
            <div className="flex gap-2 bg-muted/50 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab("customers")}
                className={`px-6 py-2 rounded-lg font-medium text-sm transition-all ${
                  activeTab === "customers"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Customers
              </button>

              <button
                onClick={() => setActiveTab("vendors")}
                className={`px-6 py-2 rounded-lg font-medium text-sm transition-all ${
                  activeTab === "vendors"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Vendors
              </button>
            </div>

            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-card border border-border rounded-xl pl-12 pr-4 py-2.5"
              />
            </div>
          </div>
        </header>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredData.map((item, index) => (
              <div
                key={item.name}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CustomerCard
                  {...item}
                  onClick={() => handleCardClick(item.name)}
                />
              </div>
            ))}
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No {activeTab} found matching "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </DesktopLayout>
  );
};

export default Customers;
