import { Home, CalendarDays, Users, QrCode } from 'lucide-react';
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

export function AttendeeSidebar() {
  const { tenantId } = useParams();
  const basePath = `/${tenantId}`;

  const items = [
    { title: 'Home', url: `${basePath}/dashboard`, icon: Home },
    { title: 'My Agenda', url: `${basePath}/agenda`, icon: CalendarDays },
    { title: 'Networking', url: `${basePath}/networking`, icon: Users },
    { title: 'Digital Badge', url: `${basePath}/badge`, icon: QrCode },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-sidebar-foreground">Attendee</h2>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
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
