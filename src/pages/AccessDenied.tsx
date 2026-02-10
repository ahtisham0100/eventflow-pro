import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldX } from 'lucide-react';

export default function AccessDenied() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <ShieldX className="mx-auto h-16 w-16 text-destructive" />
        <h1 className="text-3xl font-bold">Access Denied</h1>
        <p className="text-muted-foreground max-w-md">You don't have permission to access this page. Please contact your administrator if you believe this is an error.</p>
        <Button asChild>
          <Link to="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );
}
