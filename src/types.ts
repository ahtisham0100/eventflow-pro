export type Role = 'super_admin' | 'organizer' | 'staff' | 'attendee';

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  description: string;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: Role;
  tenantId?: string;
  avatar?: string;
  bio?: string;
  company?: string;
  title?: string;
}

export interface EventItem {
  id: string;
  tenantId: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  location: string;
  imageUrl?: string;
  featured: boolean;
  ticketPrice: number;
  ticketsSold: number;
  maxAttendees: number;
  status: 'draft' | 'published' | 'cancelled';
  category: string;
}

export interface Session {
  id: string;
  eventId: string;
  title: string;
  description: string;
  speaker: string;
  startTime: string;
  endTime: string;
  room: string;
  track?: string;
}

export interface Registration {
  id: string;
  userId: string;
  eventId: string;
  sessionIds: string[];
  registeredAt: string;
  checkedIn: boolean;
}
