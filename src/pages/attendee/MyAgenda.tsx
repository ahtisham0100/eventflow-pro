import { useAuth } from '@/contexts/AuthContext';
import { getUserRegistrations, sessions } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, User } from 'lucide-react';

export default function MyAgenda() {
  const { user } = useAuth();
  const registrations = user ? getUserRegistrations(user.id) : [];
  const sessionIds = registrations.flatMap(r => r.sessionIds);
  const mySessions = sessions.filter(s => sessionIds.includes(s.id)).sort(
    (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Agenda</h1>
        <p className="text-muted-foreground">Your personal schedule</p>
      </div>
      <div className="space-y-3">
        {mySessions.map((session) => (
          <Card key={session.id}>
            <CardContent className="p-4 space-y-2">
              <div className="flex items-start justify-between">
                <h3 className="font-medium">{session.title}</h3>
                {session.track && <Badge variant="outline">{session.track}</Badge>}
              </div>
              <p className="text-sm text-muted-foreground">{session.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" />{session.speaker}</span>
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{new Date(session.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(session.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{session.room}</span>
              </div>
            </CardContent>
          </Card>
        ))}
        {mySessions.length === 0 && <p className="text-muted-foreground text-sm">No sessions booked yet.</p>}
      </div>
    </div>
  );
}
