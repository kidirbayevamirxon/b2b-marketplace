// components/status-badge.tsx
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusStyles = (status: string) => {
    const statusMap: Record<string, string> = {
      // System health statuses
      online: 'bg-green-500/10 text-green-500 border-green-500/20',
      offline: 'bg-red-500/10 text-red-500 border-red-500/20',
      warning: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      maintenance: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      
      // Order statuses
      pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      confirmed: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      completed: 'bg-green-500/10 text-green-500 border-green-500/20',
      cancelled: 'bg-red-500/10 text-red-500 border-red-500/20',
    };
    
    return statusMap[status.toLowerCase()] || 'bg-gray-500/10 text-gray-500 border-gray-500/20';
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize',
        getStatusStyles(status),
        className
      )}
    >
      {status}
    </span>
  );
}