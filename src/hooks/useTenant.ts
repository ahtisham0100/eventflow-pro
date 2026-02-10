import { useParams } from 'react-router-dom';
import { getTenantBySlug } from '@/data/mockData';
import { Tenant } from '@/types';

export function useTenant(): { tenant: Tenant | undefined; isValid: boolean; tenantSlug: string } {
  const { tenantId } = useParams<{ tenantId: string }>();
  const tenant = tenantId ? getTenantBySlug(tenantId) : undefined;
  return {
    tenant,
    isValid: !!tenant,
    tenantSlug: tenantId || '',
  };
}
