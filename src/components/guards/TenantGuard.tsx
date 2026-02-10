import { Navigate, Outlet } from 'react-router-dom';
import { useTenant } from '@/hooks/useTenant';

export function TenantGuard() {
  const { isValid } = useTenant();
  if (!isValid) return <Navigate to="/404" replace />;
  return <Outlet />;
}
