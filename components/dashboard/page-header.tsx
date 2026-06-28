
import { ReactNode } from 'react';
import { CalendarRange, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  action?: ReactNode; 
}

export function PageHeader({
  title,
  subtitle,
  action,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-balance lg:text-3xl">
          {title}
        </h1>
        <p className="text-sm text-muted-foreground text-pretty">{subtitle}</p>
      </div>
      
      {/* Добавляем блок для action */}
      {action && (
        <div className="flex items-center gap-2">
          {action}
        </div>
      )}
    </div>
  );
}