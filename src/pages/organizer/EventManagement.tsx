import { useTenant } from '@/hooks/useTenant';
import { getEventsByTenant } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link, useParams } from 'react-router-dom';
import { Plus, Copy, Pencil, CalendarDays, MapPin, Users } from 'lucide-react';

export default function EventManagement() {
  const { tenant } = useTenant();
  const { tenantId } = useParams();
  const tenantEvents = tenant ? getEventsByTenant(tenant.id) : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Events</h1>
          <p className="text-muted-foreground">Manage your events</p>
        </div>
        <Button asChild>
          <Link to={`/admin/${tenantId}/events/create`}>
            <Plus className="mr-2 h-4 w-4" /> Create Event
          </Link>
        </Button>
      </div>

      <div className="space-y-3">
        {tenantEvents.map((event) => (
          <Card key={event.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{event.title}</h3>
                  <Badge variant={event.status === 'published' ? 'default' : event.status === 'draft' ? 'secondary' : 'destructive'}>
                    {event.status}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" />{new Date(event.date).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{event.location}</span>
                  <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{event.ticketsSold}/{event.maxAttendees}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm"><Pencil className="h-4 w-4" /></Button>
                <Button variant="ghost" size="sm"><Copy className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
