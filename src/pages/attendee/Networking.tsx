import { Card, CardContent } from '@/components/ui/card';
import { Users } from 'lucide-react';

export default function Networking() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Networking</h1>
        <p className="text-muted-foreground">Connect with other attendees</p>
      </div>
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <Users className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-medium">Coming Soon</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm">
            Networking features including attendee directory, messaging, and meeting scheduling will be available soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
