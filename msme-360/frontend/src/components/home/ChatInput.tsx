import { useState } from "react";
import { Send, Mic } from "lucide-react";

const suggestedQuestions = [
  "Show pending payments",
  "Who hasn't paid this week?",
  "Prepare GST summary",
  "Best customers this month",
];

const ChatInput = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("Sending:", message);
      setMessage("");
    }
  };

  return (
    <section className="px-4 mt-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
      <div className="bg-card rounded-3xl shadow-soft border border-border/50 p-4">
        <p className="text-sm text-muted-foreground mb-3 text-center">
          Ask your business manager…
        </p>

        {/* Suggested questions */}
        <div className="flex flex-wrap gap-2 mb-4">
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => setMessage(question)}
              className="text-xs bg-accent hover:bg-accent/80 text-accent-foreground px-3 py-1.5 rounded-full transition-colors"
            >
              {question}
            </button>
          ))}
        </div>

        {/* Input area */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your question..."
              className="w-full bg-muted/50 rounded-2xl px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Mic className="w-5 h-5" />
            </button>
          </div>
          <button
            type="submit"
            disabled={!message.trim()}
            className="w-12 h-12 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground text-primary-foreground rounded-2xl flex items-center justify-center transition-all shadow-sm"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </section>
  );
};

export default ChatInput;
