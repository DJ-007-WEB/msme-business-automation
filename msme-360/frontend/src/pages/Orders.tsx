import { useState } from "react";
import DesktopLayout from "@/components/layout/DesktopLayout";
import OrderCard from "@/components/orders/OrderCard";
import { Filter, ShoppingCart } from "lucide-react";

/* ================= DATA ================= */

const initialOrders = [
  {
    id: "1",
    customerName: "Rajesh Kumar",
    message: "Bhai, wo 50 packets blue color wala chahiye, jaldi bhej do",
    platform: "whatsapp" as const,
    aiReply:
      "Sure Rajesh ji! 50 packets of blue color ready hai. ₹12,500 total. Kal subah dispatch kar deta hoon. Payment UPI ya cash?",
    orderValue: 12500,
    paymentStatus: "pending" as const,
    timeAgo: "5 min ago",
  },
  {
    id: "2",
    customerName: "Priya Textiles",
    message: "Please send catalog for new cotton prints collection",
    platform: "instagram" as const,
    aiReply:
      "Hi! Sending our latest cotton prints catalog now. We have 45 new designs this season. Shall I highlight the bestsellers for you?",
    orderValue: 0,
    paymentStatus: "pending" as const,
    timeAgo: "12 min ago",
  },
  {
    id: "3",
    customerName: "Amit Sharma",
    message: "Previous order was great. Same order repeat kar do",
    platform: "whatsapp" as const,
    aiReply:
      "Dhanyavaad Amit ji! Repeating your last order: 25 packets assorted. Total ₹8,750. Confirm kar dein toh aaj dispatch ho jayega!",
    orderValue: 8750,
    paymentStatus: "paid" as const,
    timeAgo: "28 min ago",
  },
  {
    id: "4",
    customerName: "Mumbai Traders",
    message: "Need urgent delivery of 100 pieces mixed colors",
    platform: "whatsapp" as const,
    aiReply:
      "Noted Mumbai Traders! 100 pieces mixed colors - ₹25,000 total. Can dispatch today for tomorrow delivery. Shall I proceed?",
    orderValue: 25000,
    paymentStatus: "partial" as const,
    timeAgo: "45 min ago",
  },
  {
    id: "5",
    customerName: "Sita Garments",
    message: "What's the price for wholesale order of 500 units?",
    platform: "instagram" as const,
    aiReply:
      "Hello! For 500 units wholesale, we offer special pricing at ₹95/unit (regular ₹120). Total would be ₹47,500 with free shipping!",
    orderValue: 47500,
    paymentStatus: "pending" as const,
    timeAgo: "1 hour ago",
  },
];

/* ================= COMPONENT ================= */

const Orders = () => {
  const [orders, setOrders] = useState(initialOrders);

  /* ===== Handlers passed to OrderCard ===== */

  const handleApprove = (id: string) => {
    setOrders(prev => prev.filter(order => order.id !== id));
  };

  const handleIgnore = (id: string) => {
    setOrders(prev => prev.filter(order => order.id !== id));
  };

  const handleEditSave = (id: string, newReply: string) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === id
          ? { ...order, aiReply: newReply }
          : order
      )
    );
  };

  return (
    <DesktopLayout>
      <div className="h-full flex flex-col overflow-hidden">
        {/* Header */}
        <header className="px-8 py-6 border-b border-border bg-background">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Orders
                </h1>
                <p className="text-sm text-muted-foreground">
                  Live customer messages & order management
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Live indicator */}
              <div className="flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-sm font-medium text-success">
                  Live
                </span>
                <span className="text-sm text-muted-foreground">
                  • {orders.length} messages need attention
                </span>
              </div>

              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border hover:bg-accent transition-colors">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">Filter</span>
              </button>
            </div>
          </div>
        </header>

        {/* Orders Grid */}
        <div className="flex-1 overflow-y-auto p-8">
          {orders.length === 0 ? (
            <div className="text-center text-muted-foreground py-20">
              🎉 All orders handled!
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {orders.map((order, index) => (
                <div
                  key={order.id}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className="animate-fade-in"
                >
                  <OrderCard
                    {...order}
                    onApprove={handleApprove}
                    onIgnore={handleIgnore}
                    onEditSave={handleEditSave}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DesktopLayout>
  );
};

export default Orders;
