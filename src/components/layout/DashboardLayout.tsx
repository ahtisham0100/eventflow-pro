import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { CalendarDays } from 'lucide-react';

interface DashboardLayoutProps {
  sidebar: React.ReactNode;
}

export function DashboardLayout({ sidebar }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {sidebar}
        <div className="flex-1 flex flex-col">
          <header className="h-14 border-b flex items-center justify-between px-4 bg-background">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <Link to="/" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                <CalendarDays className="h-4 w-4" />
                EventHub
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">{user?.name}</span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </header>
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
