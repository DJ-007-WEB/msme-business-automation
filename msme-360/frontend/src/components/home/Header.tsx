import { Bell, Settings } from "lucide-react";

const Header = () => {
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Good morning" : currentHour < 17 ? "Good afternoon" : "Good evening";

  return (
    <header className="px-4 pt-4 pb-2 safe-top">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{greeting}</p>
          <h1 className="text-xl font-bold text-foreground">MSME 360</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="relative w-10 h-10 rounded-full bg-card flex items-center justify-center shadow-sm border border-border/50 hover:bg-accent transition-colors">
            <Bell className="w-5 h-5 text-foreground" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
              3
            </span>
          </button>
          <button className="w-10 h-10 rounded-full bg-card flex items-center justify-center shadow-sm border border-border/50 hover:bg-accent transition-colors">
            <Settings className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
