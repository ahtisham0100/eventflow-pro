import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AccessDenied from "./pages/AccessDenied";

import { TenantGuard } from "@/components/guards/TenantGuard";
import { RoleGuard } from "@/components/guards/RoleGuard";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AttendeeSidebar } from "@/components/layout/AttendeeSidebar";
import { OrganizerSidebar } from "@/components/layout/OrganizerSidebar";

import AttendeeDashboard from "./pages/attendee/AttendeeDashboard";
import MyAgenda from "./pages/attendee/MyAgenda";
import Networking from "./pages/attendee/Networking";
import DigitalBadge from "./pages/attendee/DigitalBadge";

import OrganizerDashboard from "./pages/organizer/OrganizerDashboard";
import EventManagement from "./pages/organizer/EventManagement";
import EventCreate from "./pages/organizer/EventCreate";
import Analytics from "./pages/organizer/Analytics";
import OrganizerSettings from "./pages/organizer/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/access-denied" element={<AccessDenied />} />

            {/* Attendee routes */}
            <Route element={<TenantGuard />}>
              <Route element={<RoleGuard allowedRoles={['attendee', 'staff', 'organizer', 'super_admin']} />}>
                <Route path="/:tenantId" element={<DashboardLayout sidebar={<AttendeeSidebar />} />}>
                  <Route path="dashboard" element={<AttendeeDashboard />} />
                  <Route path="agenda" element={<MyAgenda />} />
                  <Route path="networking" element={<Networking />} />
                  <Route path="badge" element={<DigitalBadge />} />
                </Route>
              </Route>
            </Route>

            {/* Organizer routes */}
            <Route path="/admin" element={<TenantGuard />}>
              <Route element={<RoleGuard allowedRoles={['organizer', 'super_admin']} />}>
                <Route path=":tenantId" element={<DashboardLayout sidebar={<OrganizerSidebar />} />}>
                  <Route path="dashboard" element={<OrganizerDashboard />} />
                  <Route path="events" element={<EventManagement />} />
                  <Route path="events/create" element={<EventCreate />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="settings" element={<OrganizerSettings />} />
                </Route>
              </Route>
            </Route>

            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
