import { Heart, X } from "lucide-react";
import { useState } from "react";

const GuardianNudge = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <section className="px-4 mt-6 animate-fade-in" style={{ animationDelay: "300ms" }}>
      <div className="bg-gradient-to-r from-secondary/15 to-primary/10 rounded-2xl p-4 border border-secondary/20 relative">
        <button
          onClick={() => setVisible(false)}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
            <Heart className="w-5 h-5 text-secondary" />
          </div>
          <div className="flex-1 pr-4">
            <p className="text-sm font-medium text-foreground mb-1">
              Guardian Mode
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              You've been active for 7 hours today. Want me to handle customer replies for the next 2 hours while you take a break?
            </p>
            <div className="flex gap-2 mt-3">
              <button className="text-xs bg-secondary text-secondary-foreground px-4 py-2 rounded-full font-medium hover:bg-secondary/90 transition-colors">
                Yes, take over
              </button>
              <button className="text-xs text-muted-foreground hover:text-foreground px-3 py-2 transition-colors">
                Not now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuardianNudge;
