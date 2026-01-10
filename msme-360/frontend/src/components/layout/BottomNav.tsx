import { useLocation, useNavigate } from "react-router-dom";
import { Package, IndianRupee, Users } from "lucide-react";

const navItems = [
  { path: "/orders", label: "Orders", icon: Package },
  { path: "/", label: "Home", icon: null, isHome: true },
  { path: "/money", label: "Money", icon: IndianRupee },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border safe-bottom z-50">
      <div className="max-w-md mx-auto flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          if (item.isHome) {
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="relative -mt-6 flex flex-col items-center"
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-elevated transition-all duration-200 ${
                  isActive 
                    ? "bg-primary scale-110" 
                    : "bg-primary/90 hover:bg-primary"
                }`}>
                  <span className="text-primary-foreground text-xl font-bold">M</span>
                </div>
                <span className={`text-xs mt-1 font-medium ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}>
                  Home
                </span>
              </button>
            );
          }

          const Icon = item.icon!;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center py-2 px-6 rounded-xl transition-all duration-200 ${
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-6 h-6 mb-1" strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-xs ${isActive ? "font-semibold" : "font-medium"}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
