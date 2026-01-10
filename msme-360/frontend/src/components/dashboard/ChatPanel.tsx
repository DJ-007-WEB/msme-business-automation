import { useState, useRef, useEffect } from 'react';
import { Send, Mic, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
  id: string;
  role: 'ai' | 'user';
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'ai',
    content: "Good morning! I've been busy managing your business. Here's what I did:",
    timestamp: new Date(),
  },
  {
    id: '2',
    role: 'ai',
    content: "✅ Replied to 12 customer messages on WhatsApp\n✅ Created 3 payment links for new orders\n⚠️ 2 orders need your approval\n⚠️ Vendor Raj hasn't delivered in 5 days - flagged as risky\n✅ GST looks clean for this month",
    timestamp: new Date(),
  },
  {
    id: '3',
    role: 'ai',
    content: "What would you like me to do next?",
    timestamp: new Date(),
  },
];

const suggestedCommands = [
  "Approve all orders",
  "Handle replies for 2 hours",
  "Why is cash low?",
  "Prepare Diwali campaign",
];

const ChatPanel = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: getAIResponse(messageText),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('approve all orders')) {
      return "Done! I've approved all 2 pending orders:\n• Order #1234 - ₹15,000 from Sharma Traders\n• Order #1235 - ₹8,500 from Retail Plus\n\nPayment links have been sent to customers.";
    }
    if (input.includes('handle replies')) {
      return "I'll take over customer replies for the next 2 hours. I'll notify you only for urgent matters. Take a break, boss! ☕";
    }
    if (input.includes('cash low') || input.includes('why is cash')) {
      return "Your cash is low because:\n• ₹45,000 pending from 3 customers (overdue)\n• ₹30,000 paid to vendor last week\n• ₹12,000 GST payment due tomorrow\n\nShould I send payment reminders to overdue customers?";
    }
    if (input.includes('diwali')) {
      return "Great idea! I'll prepare a Diwali campaign:\n• Special discount offers for top 50 customers\n• WhatsApp broadcast message draft\n• Festival greeting cards\n\nI'll have everything ready in 10 minutes. Should I proceed?";
    }
    
    return "I understand. Let me work on that for you. Is there anything specific you'd like me to focus on?";
  };

  const getUserName = () => {
    return user?.user_metadata?.full_name || 'Boss';
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Your AI Business Manager</h2>
            <p className="text-sm text-muted-foreground">Always here to help</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="w-2 h-2 bg-success rounded-full animate-pulse-soft" />
            <span className="text-sm text-muted-foreground">Active</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}
          >
            {message.role === 'ai' && (
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary" />
              </div>
            )}
            <div
              className={`max-w-[70%] ${
                message.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'
              }`}
            >
              <p className="whitespace-pre-line text-sm">{message.content}</p>
            </div>
            {message.role === 'user' && (
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Commands */}
      <div className="px-6 py-3 border-t border-border bg-muted/30">
        <div className="flex flex-wrap gap-2">
          {suggestedCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleSend(cmd)}
              className="text-xs bg-card hover:bg-accent text-foreground px-3 py-1.5 rounded-full border border-border transition-colors"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="px-6 py-4 border-t border-border bg-card">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-3"
        >
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`What would you like me to do, ${getUserName()}?`}
              className="w-full bg-muted rounded-xl px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground input-focus transition-all"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Mic className="w-5 h-5" />
            </button>
          </div>
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim()}
            className="w-12 h-12 rounded-xl"
          >
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatPanel;
