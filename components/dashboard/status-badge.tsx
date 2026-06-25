import { cn } from '@/lib/utils'
import { statusTone, type StatusTone } from '@/lib/dashboard-data'

const toneStyles: Record<StatusTone, string> = {
  success: 'bg-success/12 text-success border-success/25',
  info: 'bg-chart-3/12 text-chart-3 border-chart-3/25',
  warning: 'bg-warning/12 text-warning border-warning/25',
  danger: 'bg-destructive/12 text-destructive border-destructive/25',
  neutral: 'bg-muted text-muted-foreground border-border',
}

export function StatusBadge({ status }: { status: string }) {
  const tone = statusTone[status] ?? 'neutral'
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium',
        toneStyles[tone],
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}
