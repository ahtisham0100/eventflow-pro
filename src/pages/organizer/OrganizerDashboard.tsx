import { useTenant } from '@/hooks/useTenant';
import { getEventsByTenant } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, DollarSign, TrendingUp, CalendarDays } from 'lucide-react';

export default function OrganizerDashboard() {
  const { tenant } = useTenant();
  const tenantEvents = tenant ? getEventsByTenant(tenant.id) : [];

  const totalRegistrations = tenantEvents.reduce((acc, e) => acc + e.ticketsSold, 0);
  const totalRevenue = tenantEvents.reduce((acc, e) => acc + e.ticketsSold * e.ticketPrice, 0);

  const chartData = tenantEvents.map(e => ({
    name: e.title.length > 15 ? e.title.slice(0, 15) + '…' : e.title,
    registrations: e.ticketsSold,
    capacity: e.maxAttendees,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{tenant?.name} Dashboard</h1>
        <p className="text-muted-foreground">Overview of your events and performance</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Registrations</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent><div className="text-3xl font-bold">{totalRegistrations.toLocaleString()}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent><div className="text-3xl font-bold">${totalRevenue.toLocaleString()}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Events</CardTitle>
            <CalendarDays className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent><div className="text-3xl font-bold">{tenantEvents.filter(e => e.status === 'published').length}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Fill Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {tenantEvents.length > 0
                ? Math.round(tenantEvents.reduce((acc, e) => acc + (e.ticketsSold / e.maxAttendees) * 100, 0) / tenantEvents.length)
                : 0}%
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registrations vs Capacity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Bar dataKey="registrations" fill="hsl(239, 84%, 67%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="capacity" fill="hsl(220, 14%, 96%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
