import { useState } from "react";
import { Check, Edit2, X, MessageCircle, Save } from "lucide-react";

interface OrderCardProps {
  id: string;
  customerName: string;
  message: string;
  platform: "whatsapp" | "instagram";
  aiReply: string;
  orderValue: number;
  paymentStatus: "paid" | "pending" | "partial";
  timeAgo: string;

  /* 🔑 Actions */
  onApprove: (id: string) => void;
  onIgnore: (id: string) => void;
  onEditSave: (id: string, newReply: string) => void;
}

const platformStyles = {
  whatsapp: "bg-success/10 text-success",
  instagram: "bg-gradient-to-r from-pink-500/10 to-purple-500/10 text-pink-600",
};

const paymentStyles = {
  paid: "status-ok",
  pending: "status-warning",
  partial: "status-warning",
};

const OrderCard = ({
  id,
  customerName,
  message,
  platform,
  aiReply,
  orderValue,
  paymentStatus,
  timeAgo,
  onApprove,
  onIgnore,
  onEditSave,
}: OrderCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draftReply, setDraftReply] = useState(aiReply);

  const handleSave = () => {
    onEditSave(id, draftReply);
    setIsEditing(false);
  };

  return (
    <div className="bg-card rounded-2xl shadow-card border border-border/50 overflow-hidden animate-fade-in card-interactive">
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-lg font-semibold">
            {customerName.charAt(0)}
          </div>
          <div>
            <p className="font-medium">{customerName}</p>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-0.5 rounded-full ${platformStyles[platform]}`}>
                {platform === "whatsapp" ? "WhatsApp" : "Instagram"}
              </span>
              <span className="text-xs text-muted-foreground">{timeAgo}</span>
            </div>
          </div>
        </div>

        {/* Customer message */}
        <div className="bg-muted/50 rounded-xl p-3 mt-3">
          <div className="flex gap-2">
            <MessageCircle className="w-4 h-4 text-muted-foreground mt-0.5" />
            <p className="text-sm">{message}</p>
          </div>
        </div>
      </div>

      {/* AI Reply */}
      <div className="p-4 bg-primary/5">
        <p className="text-xs text-primary font-medium mb-2">
          AI-drafted reply:
        </p>

        {isEditing ? (
          <textarea
            className="w-full text-sm p-2 rounded-lg border border-border bg-background resize-none input-focus"
            rows={3}
            value={draftReply}
            onChange={e => setDraftReply(e.target.value)}
          />
        ) : (
          <p className="text-sm italic">"{aiReply}"</p>
        )}

        <div className="flex items-center gap-3 mt-3">
          <span className="text-sm font-semibold">
            ₹{orderValue.toLocaleString()}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full ${paymentStyles[paymentStatus]}`}>
            {paymentStatus}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex border-t border-border/50">
        <button
          onClick={() => onApprove(id)}
          className="flex-1 flex items-center justify-center gap-2 py-3 text-success hover:bg-success/5 font-medium"
        >
          <Check className="w-5 h-5" />
          Approve
        </button>

        <div className="w-px bg-border/50" />

        {isEditing ? (
          <button
            onClick={handleSave}
            className="flex-1 flex items-center justify-center gap-2 py-3 text-primary hover:bg-primary/5 font-medium"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="flex-1 flex items-center justify-center gap-2 py-3 text-primary hover:bg-primary/5 font-medium"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
        )}

        <div className="w-px bg-border/50" />

        <button
          onClick={() => onIgnore(id)}
          className="flex-1 flex items-center justify-center gap-2 py-3 text-muted-foreground hover:bg-muted/50 font-medium"
        >
          <X className="w-5 h-5" />
          Ignore
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
