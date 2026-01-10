import { useState } from 'react';
import {
  Check,
  Pencil,
  X,
  ShoppingCart,
  AlertTriangle,
  MessageSquare,
  IndianRupee,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

/* ================= TYPES ================= */

interface ApprovalItem {
  id: string;
  type: 'order' | 'reply' | 'alert' | 'payment';
  title: string;
  description: string;
  reason: string;
  impact: string;
  impactType: 'positive' | 'neutral' | 'negative';
  timestamp: string;
  edited?: boolean;
}

/* ================= DATA ================= */

const initialApprovalItems: ApprovalItem[] = [
  {
    id: '1',
    type: 'order',
    title: 'New Order from Sharma Traders',
    description: 'Widget Pro x 50 units',
    reason: 'Regular customer, good payment history',
    impact: '+₹15,000',
    impactType: 'positive',
    timestamp: '5 min ago',
  },
  {
    id: '2',
    type: 'reply',
    title: 'Auto-reply to Retail Plus',
    description: '"Yes, we can deliver by Thursday. Payment link attached."',
    reason: 'Standard delivery timeline, auto-drafted',
    impact: 'Time saved',
    impactType: 'neutral',
    timestamp: '12 min ago',
  },
  {
    id: '3',
    type: 'alert',
    title: 'Vendor Raj flagged risky',
    description: 'No delivery in 5 days, 2 orders pending',
    reason: 'Unusual delay pattern detected',
    impact: '₹25,000 at risk',
    impactType: 'negative',
    timestamp: '1 hour ago',
  },
  {
    id: '4',
    type: 'payment',
    title: 'Payment reminder to Gupta & Sons',
    description: 'Invoice #892 overdue by 7 days',
    reason: 'Auto-scheduled follow-up',
    impact: '₹8,500 pending',
    impactType: 'neutral',
    timestamp: '2 hours ago',
  },
];

/* ================= CONFIG ================= */

const typeIcons = {
  order: ShoppingCart,
  reply: MessageSquare,
  alert: AlertTriangle,
  payment: IndianRupee,
};

const typeColors = {
  order: 'bg-success/10 text-success',
  reply: 'bg-primary/10 text-primary',
  alert: 'bg-warning/10 text-warning',
  payment: 'bg-muted text-muted-foreground',
};

/* ================= COMPONENT ================= */

const ApprovalQueue = () => {
  const [items, setItems] = useState<ApprovalItem[]>(initialApprovalItems);

  /* ===== Actions ===== */

  const handleApprove = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleReject = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleEdit = (id: string) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, edited: true } : item
      )
    );
  };

  const handleApproveAll = () => {
    setItems([]);
  };

  /* ================= RENDER ================= */

  return (
    <div className="flex flex-col h-full bg-muted/30 border-l border-border">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border bg-card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-foreground">
              Approval Queue
            </h2>
            <p className="text-sm text-muted-foreground">
              {items.length} items pending
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            disabled={items.length === 0}
            onClick={handleApproveAll}
          >
            Approve All
          </Button>
        </div>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {items.length === 0 && (
          <div className="text-center text-sm text-muted-foreground py-12">
            🎉 All caught up! No approvals pending.
          </div>
        )}

        {items.map(item => {
          const Icon = typeIcons[item.type];

          return (
            <div key={item.id} className="approval-card">
              {/* Header */}
              <div className="flex items-start gap-3 mb-3">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${typeColors[item.type]}`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm text-foreground truncate">
                    {item.title}
                    {item.edited && (
                      <span className="ml-2 text-xs text-warning">
                        (edited)
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>

                <span className="text-xs text-muted-foreground flex-shrink-0">
                  {item.timestamp}
                </span>
              </div>

              {/* Reason */}
              <div className="text-xs text-muted-foreground mb-3 pl-12">
                <span className="text-foreground/70">Why: </span>
                {item.reason}
              </div>

              {/* Impact & Actions */}
              <div className="flex items-center justify-between pl-12">
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    item.impactType === 'positive'
                      ? 'border-success/30 text-success bg-success/5'
                      : item.impactType === 'negative'
                      ? 'border-risk/30 text-risk bg-risk/5'
                      : 'border-border'
                  }`}
                >
                  {item.impact}
                </Badge>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-risk hover:bg-risk/10"
                    onClick={() => handleReject(item.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                    onClick={() => handleEdit(item.id)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-success hover:bg-success/10"
                    onClick={() => handleApprove(item.id)}
                  >
                    <Check className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ApprovalQueue;
