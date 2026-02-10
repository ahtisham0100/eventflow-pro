import { Card, CardContent } from '@/components/ui/card';
import { Settings as SettingsIcon } from 'lucide-react';

export default function OrganizerSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your organization settings</p>
      </div>
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-16 text-center">
          <SettingsIcon className="h-12 w-12 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-medium">Coming Soon</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm">
            Organization settings including branding, team management, and integrations will be available soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
