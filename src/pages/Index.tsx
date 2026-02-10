import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getFeaturedEvents } from '@/data/mockData';
import { CalendarDays, MapPin, Search, ArrowRight, Sparkles } from 'lucide-react';

const Index = () => {
  const [search, setSearch] = useState('');
  const featuredEvents = getFeaturedEvents();
  const filtered = featuredEvents.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-24 sm:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary-foreground)/0.2),transparent_70%)]" />
        </div>
        <div className="container relative">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="mr-1 h-3 w-3" />
              Smart Event Platform
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-6xl">
              Discover & Manage
              <br />
              Events Effortlessly
            </h1>
            <p className="mt-6 text-lg leading-8 text-primary-foreground/80">
              The all-in-one platform for organizers and attendees. Create, discover, and manage events with powerful tools.
            </p>
            <div className="mt-8 flex items-center gap-2 max-w-md mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search events, topics..."
                  className="pl-10 bg-primary-foreground text-foreground"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button variant="secondary" size="default">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="container py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">Featured Events</h2>
            <p className="text-muted-foreground mt-1">Don't miss out on these upcoming events</p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((event) => (
            <Card key={event.id} className="group hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{event.category}</Badge>
                  <Badge variant={event.ticketPrice === 0 ? 'default' : 'outline'}>
                    {event.ticketPrice === 0 ? 'Free' : `$${event.ticketPrice}`}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" />
                    {event.location}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
                  <Link to={`/${event.tenantId === 't1' ? 'techconf' : 'designweek'}/dashboard`}>
                    View Event <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No events found matching "{search}"
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container text-center text-sm text-muted-foreground">
          © 2025 EventHub. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
