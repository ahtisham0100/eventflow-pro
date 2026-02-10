import { useAuth } from '@/contexts/AuthContext';
import { useTenant } from '@/hooks/useTenant';
import { getUserRegistrations, events, sessions } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock, MapPin, Ticket } from 'lucide-react';

export default function AttendeeDashboard() {
  const { user } = useAuth();
  const { tenant } = useTenant();
  const registrations = user ? getUserRegistrations(user.id) : [];

  const registeredEvents = registrations.map(r => events.find(e => e.id === r.eventId)).filter(Boolean);
  const totalSessions = registrations.reduce((acc, r) => acc + r.sessionIds.length, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome back, {user?.name}</h1>
        <p className="text-muted-foreground">{tenant?.name} Dashboard</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Registered Events</CardTitle>
            <Ticket className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{registeredEvents.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Sessions Booked</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalSessions}</div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
        <div className="space-y-3">
          {registeredEvents.map((event) => event && (
            <Card key={event.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="space-y-1">
                  <h3 className="font-medium">{event.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {event.location}
                    </span>
                  </div>
                </div>
                <Badge variant="secondary">{event.category}</Badge>
              </CardContent>
            </Card>
          ))}
          {registeredEvents.length === 0 && (
            <p className="text-muted-foreground text-sm">No registered events yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
