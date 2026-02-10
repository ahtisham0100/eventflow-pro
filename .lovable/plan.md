

# Phase 1: Multi-Tenant Smart Event Management & Networking Platform

## Design & Style
- **Enterprise SaaS** aesthetic — clean, professional, spacious
- **Primary color**: Indigo (#4f46e5) applied throughout the design system
- Sidebar layout for dashboards, clean navbar for public pages
- Fully responsive design with mobile-friendly navigation

---

## Step 1: Data Foundation
- Create `types.ts` with TypeScript interfaces: `Tenant`, `Event`, `User`, `Session`, `Role`
- Create `mockData.ts` with sample tenants, events, users, and sessions — centralized for easy future backend swap
- Define 4 roles: Super Admin, Organizer, Staff, Attendee

## Step 2: Multi-Tenant Routing & Guards
- Path-based multi-tenancy using React Router: `/:tenantId/*` for attendees, `/admin/:tenantId/*` for organizers
- Tenant resolution hook that validates `tenantId` against mock data, redirecting to 404 if not found
- Role-based route guard component — attendees trying to access `/admin` see an "Access Denied" page
- Simple auth context using local JSON/localStorage (no real backend)

## Step 3: Public Pages
- **Landing Page (`/`)**: Hero section, search bar, "Featured Events" cards grid, clean navbar
- **Login Page (`/login`)**: Email/password form with role-aware login
- **Signup Page (`/signup`)**: Registration form with role selection (Attendee or Organizer)

## Step 4: Attendee Dashboard
- **Route**: `/:tenantId/dashboard`
- **Sidebar navigation**: Home, My Agenda, Networking, Digital Badge
- **Dashboard home**: Stats cards (registered sessions, upcoming events), upcoming event list
- **My Agenda page**: Personal schedule view
- **Networking page**: Placeholder for attendee connections
- **Digital Badge page**: QR code badge placeholder

## Step 5: Organizer Dashboard
- **Route**: `/admin/:tenantId/dashboard`
- **Sidebar navigation**: Dashboard, Events, Analytics, Settings
- **Dashboard home**: Stats cards (Total Registrations, Revenue, Attendance Trends) with mock chart
- **Event Management**: List view of events with Edit, Duplicate, and Create New actions
- **Event Creation**: Multi-step form (Title, Date, Location, Description, Tickets)

## Step 6: Polish & PWA Prep
- PWA manifest placeholder file
- 404 page for invalid tenants
- Access Denied page for unauthorized role access
- Responsive tweaks across all pages

