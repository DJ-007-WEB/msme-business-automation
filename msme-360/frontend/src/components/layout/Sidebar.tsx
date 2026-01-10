import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  MessageSquare,
  ShoppingCart,
  IndianRupee,
  Users,
  Settings,
  LogOut,
  Building2,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip';

const navItems = [
  { icon: MessageSquare, label: 'Dashboard', path: '/' },
  { icon: ShoppingCart, label: 'Orders', path: '/orders' },
  { icon: IndianRupee, label: 'Finance & GST', path: '/money' },
  { icon: Users, label: 'Customers & Vendors', path: '/customers' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  return (
    <TooltipProvider delayDuration={0}>
      <aside className="w-20 bg-sidebar-background flex flex-col items-center py-6 border-r border-sidebar-border">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-12 h-12 bg-sidebar-primary rounded-xl flex items-center justify-center">
            <Building2 className="w-6 h-6 text-sidebar-primary-foreground" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Tooltip key={item.path}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => navigate(item.path)}
                    className={`sidebar-icon-btn ${
                      isActive ? 'active' : ''
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={10}>
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>

        {/* Sign Out */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleSignOut}
              className="sidebar-icon-btn text-sidebar-foreground/50 hover:text-risk"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={10}>
            Sign Out
          </TooltipContent>
        </Tooltip>
      </aside>
    </TooltipProvider>
  );
};

export default Sidebar;
