import {
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronRight,
} from "lucide-react";

interface CustomerCardProps {
  name: string;
  trustScore: number;
  deliveryBehavior: "excellent" | "good" | "inconsistent";
  pricingPattern: string;
  aiRecommendation: string;
  totalOrders: number;
  lastOrder: string;

  /** ACTION HANDLERS */
  onClick?: () => void;
}

const getTrustColor = (score: number) => {
  if (score >= 80) return "trust-high";
  if (score >= 50) return "trust-medium";
  return "trust-low";
};

const getTrustLabel = (score: number) => {
  if (score >= 80) return { text: "Trusted", color: "text-success" };
  if (score >= 50) return { text: "Moderate", color: "text-warning" };
  return { text: "Caution", color: "text-destructive" };
};

const deliveryIcons = {
  excellent: TrendingUp,
  good: Minus,
  inconsistent: TrendingDown,
};

const deliveryColors = {
  excellent: "text-success",
  good: "text-muted-foreground",
  inconsistent: "text-warning",
};

const CustomerCard = ({
  name,
  trustScore,
  deliveryBehavior,
  pricingPattern,
  aiRecommendation,
  totalOrders,
  lastOrder,
  onClick,
}: CustomerCardProps) => {
  const trustLabel = getTrustLabel(trustScore);
  const DeliveryIcon = deliveryIcons[deliveryBehavior];

  return (
    <button
      onClick={onClick}
      className={`w-full text-left bg-card rounded-2xl shadow-card border border-border/50 overflow-hidden animate-fade-in card-interactive ${getTrustColor(
        trustScore
      )}`}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-xl font-semibold text-foreground">
              {name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-foreground">{name}</p>
              <p className="text-sm text-muted-foreground">
                {totalOrders} orders • Last: {lastOrder}
              </p>
            </div>
          </div>

          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>

        {/* Trust Score */}
        <div className="mt-4 flex items-center gap-4">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground mb-1">
              Trust Score
            </p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    trustScore >= 80
                      ? "bg-success"
                      : trustScore >= 50
                      ? "bg-warning"
                      : "bg-destructive"
                  }`}
                  style={{ width: `${trustScore}%` }}
                />
              </div>
              <span
                className={`text-sm font-semibold ${trustLabel.color}`}
              >
                {trustScore}%
              </span>
            </div>
          </div>

          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              trustScore >= 80
                ? "status-ok"
                : trustScore >= 50
                ? "status-warning"
                : "status-risk"
            }`}
          >
            {trustLabel.text}
          </span>
        </div>

        {/* Insights */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <DeliveryIcon
              className={`w-4 h-4 ${deliveryColors[deliveryBehavior]}`}
            />
            <span className="text-muted-foreground">
              Delivery:
            </span>
            <span className="text-foreground capitalize">
              {deliveryBehavior}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Pricing:</span>
            <span className="text-foreground">
              {pricingPattern}
            </span>
          </div>
        </div>

        {/* AI Recommendation */}
        <div className="mt-4 bg-primary/5 rounded-xl p-3 border border-primary/10">
          <p className="text-xs text-primary font-medium mb-1">
            💡 AI Recommendation
          </p>
          <p className="text-sm text-foreground">
            {aiRecommendation}
          </p>
        </div>
      </div>
    </button>
  );
};

export default CustomerCard;
