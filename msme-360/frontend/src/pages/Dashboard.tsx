import DesktopLayout from '@/components/layout/DesktopLayout';
import ChatPanel from '@/components/dashboard/ChatPanel';
import ApprovalQueue from '@/components/dashboard/ApprovalQueue';

const Dashboard = () => {
  return (
    <DesktopLayout>
      <div className="flex h-full">
        {/* Main Chat Panel */}
        <div className="flex-1">
          <ChatPanel />
        </div>
        
        {/* Approval Queue */}
        <div className="w-[400px] flex-shrink-0">
          <ApprovalQueue />
        </div>
      </div>
    </DesktopLayout>
  );
};

export default Dashboard;
