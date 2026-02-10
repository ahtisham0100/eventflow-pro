import { Tenant, User, EventItem, Session, Registration } from '@/types';

export const tenants: Tenant[] = [
  {
    id: 't1',
    name: 'TechConf Global',
    slug: 'techconf',
    description: 'The world\'s premier technology conference series',
    createdAt: '2024-01-15',
  },
  {
    id: 't2',
    name: 'DesignWeek',
    slug: 'designweek',
    description: 'Where creativity meets innovation',
    createdAt: '2024-03-01',
  },
];

export const users: User[] = [
  {
    id: 'u1',
    email: 'admin@platform.com',
    password: 'admin123',
    name: 'Sarah Chen',
    role: 'super_admin',
    title: 'Platform Administrator',
  },
  {
    id: 'u2',
    email: 'organizer@techconf.com',
    password: 'org123',
    name: 'James Miller',
    role: 'organizer',
    tenantId: 't1',
    company: 'TechConf Global',
    title: 'Event Director',
  },
  {
    id: 'u3',
    email: 'staff@techconf.com',
    password: 'staff123',
    name: 'Emily Watson',
    role: 'staff',
    tenantId: 't1',
    title: 'Event Coordinator',
  },
  {
    id: 'u4',
    email: 'attendee@email.com',
    password: 'att123',
    name: 'Alex Johnson',
    role: 'attendee',
    tenantId: 't1',
    company: 'Startup Inc.',
    title: 'Software Engineer',
    bio: 'Passionate about building great products.',
  },
  {
    id: 'u5',
    email: 'organizer@designweek.com',
    password: 'org123',
    name: 'Maria Garcia',
    role: 'organizer',
    tenantId: 't2',
    company: 'DesignWeek',
    title: 'Creative Director',
  },
];

export const events: EventItem[] = [
  {
    id: 'e1',
    tenantId: 't1',
    title: 'TechConf 2025',
    description: 'Join 5,000+ developers, designers, and tech leaders for three days of cutting-edge talks, workshops, and networking.',
    date: '2025-09-15',
    endDate: '2025-09-17',
    location: 'San Francisco Convention Center',
    featured: true,
    ticketPrice: 299,
    ticketsSold: 3200,
    maxAttendees: 5000,
    status: 'published',
    category: 'Technology',
  },
  {
    id: 'e2',
    tenantId: 't1',
    title: 'AI Summit',
    description: 'Deep dive into the latest advancements in artificial intelligence and machine learning.',
    date: '2025-11-05',
    endDate: '2025-11-06',
    location: 'Virtual',
    featured: true,
    ticketPrice: 149,
    ticketsSold: 1800,
    maxAttendees: 3000,
    status: 'published',
    category: 'AI & ML',
  },
  {
    id: 'e3',
    tenantId: 't2',
    title: 'DesignWeek NYC 2025',
    description: 'A week of design thinking, UX workshops, and creative showcases in the heart of New York.',
    date: '2025-10-20',
    endDate: '2025-10-25',
    location: 'NYC Design Center',
    featured: true,
    ticketPrice: 199,
    ticketsSold: 950,
    maxAttendees: 1500,
    status: 'published',
    category: 'Design',
  },
  {
    id: 'e4',
    tenantId: 't1',
    title: 'Cloud DevOps Workshop',
    description: 'Hands-on workshop covering CI/CD pipelines, Kubernetes, and cloud-native architecture.',
    date: '2025-08-10',
    location: 'Online',
    featured: false,
    ticketPrice: 79,
    ticketsSold: 150,
    maxAttendees: 200,
    status: 'published',
    category: 'DevOps',
  },
];

export const sessions: Session[] = [
  {
    id: 's1',
    eventId: 'e1',
    title: 'Keynote: The Future of Web',
    description: 'Opening keynote exploring emerging web technologies.',
    speaker: 'Dr. Lisa Park',
    startTime: '2025-09-15T09:00:00',
    endTime: '2025-09-15T10:00:00',
    room: 'Main Hall',
    track: 'General',
  },
  {
    id: 's2',
    eventId: 'e1',
    title: 'Building Scalable APIs',
    description: 'Best practices for designing APIs that scale.',
    speaker: 'Tom Reynolds',
    startTime: '2025-09-15T10:30:00',
    endTime: '2025-09-15T11:30:00',
    room: 'Room A',
    track: 'Backend',
  },
  {
    id: 's3',
    eventId: 'e1',
    title: 'React Server Components Deep Dive',
    description: 'Understanding the architecture behind RSC.',
    speaker: 'Nina Patel',
    startTime: '2025-09-15T13:00:00',
    endTime: '2025-09-15T14:00:00',
    room: 'Room B',
    track: 'Frontend',
  },
  {
    id: 's4',
    eventId: 'e2',
    title: 'Intro to Large Language Models',
    description: 'Understanding how LLMs work and their applications.',
    speaker: 'Dr. Wei Zhang',
    startTime: '2025-11-05T09:00:00',
    endTime: '2025-11-05T10:30:00',
    room: 'Virtual Room 1',
    track: 'AI',
  },
];

export const registrations: Registration[] = [
  {
    id: 'r1',
    userId: 'u4',
    eventId: 'e1',
    sessionIds: ['s1', 's2', 's3'],
    registeredAt: '2025-06-20',
    checkedIn: false,
  },
  {
    id: 'r2',
    userId: 'u4',
    eventId: 'e2',
    sessionIds: ['s4'],
    registeredAt: '2025-07-01',
    checkedIn: false,
  },
];

export function getTenantBySlug(slug: string): Tenant | undefined {
  return tenants.find(t => t.slug === slug);
}

export function getEventsByTenant(tenantId: string): EventItem[] {
  return events.filter(e => e.tenantId === tenantId);
}

export function getSessionsByEvent(eventId: string): Session[] {
  return sessions.filter(s => s.eventId === eventId);
}

export function getUserRegistrations(userId: string): Registration[] {
  return registrations.filter(r => r.userId === userId);
}

export function getFeaturedEvents(): EventItem[] {
  return events.filter(e => e.featured && e.status === 'published');
}
