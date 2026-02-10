import { useAuth } from '@/contexts/AuthContext';
import { useTenant } from '@/hooks/useTenant';
import { Card, CardContent } from '@/components/ui/card';
import { QrCode, User } from 'lucide-react';

export default function DigitalBadge() {
  const { user } = useAuth();
  const { tenant } = useTenant();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Digital Badge</h1>
        <p className="text-muted-foreground">Your event badge & QR code</p>
      </div>
      <div className="flex justify-center">
        <Card className="w-full max-w-sm">
          <CardContent className="flex flex-col items-center py-8 space-y-4">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-10 w-10 text-primary" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold">{user?.name}</h3>
              <p className="text-sm text-muted-foreground">{user?.title || 'Attendee'}</p>
              {user?.company && <p className="text-sm text-muted-foreground">{user.company}</p>}
            </div>
            <div className="border-t w-full pt-4 flex flex-col items-center gap-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{tenant?.name}</p>
              <div className="h-32 w-32 bg-muted rounded-lg flex items-center justify-center">
                <QrCode className="h-16 w-16 text-muted-foreground/40" />
              </div>
              <p className="text-xs text-muted-foreground">Scan for check-in</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
