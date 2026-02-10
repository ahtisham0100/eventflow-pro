import { LayoutDashboard, CalendarDays, BarChart3, Settings } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useParams } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

export function OrganizerSidebar() {
  const { tenantId } = useParams();
  const basePath = `/admin/${tenantId}`;

  const items = [
    { title: 'Dashboard', url: `${basePath}/dashboard`, icon: LayoutDashboard },
    { title: 'Events', url: `${basePath}/events`, icon: CalendarDays },
    { title: 'Analytics', url: `${basePath}/analytics`, icon: BarChart3 },
    { title: 'Settings', url: `${basePath}/settings`, icon: Settings },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-sidebar-foreground">Organizer</h2>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end activeClassName="bg-sidebar-accent text-sidebar-accent-foreground">
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
