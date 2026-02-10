import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { CalendarDays, LogOut, User } from 'lucide-react';

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <CalendarDays className="h-6 w-6 text-primary" />
          <span>EventHub</span>
        </Link>

        <nav className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="hidden sm:inline text-sm text-muted-foreground">
                <User className="inline h-4 w-4 mr-1" />
                {user?.name}
              </span>
              {(user?.role === 'organizer' || user?.role === 'super_admin') && user?.tenantId && (
                <Button variant="ghost" size="sm" asChild>
                  <Link to={`/admin/${user.tenantId === 't1' ? 'techconf' : 'designweek'}/dashboard`}>
                    Dashboard
                  </Link>
                </Button>
              )}
              {user?.role === 'attendee' && user?.tenantId && (
                <Button variant="ghost" size="sm" asChild>
                  <Link to={`/${user.tenantId === 't1' ? 'techconf' : 'designweek'}/dashboard`}>
                    My Dashboard
                  </Link>
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/signup">Sign up</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
