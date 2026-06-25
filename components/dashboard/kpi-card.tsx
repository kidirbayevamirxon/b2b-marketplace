import type { LucideIcon } from 'lucide-react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export interface KpiCardProps {
  label: string
  value: string
  change: number
  icon: LucideIcon
  caption?: string
}

export function KpiCard({ label, value, change, icon: Icon, caption }: KpiCardProps) {
  const positive = change >= 0
  return (
    <Card className="glass relative overflow-hidden border-border/60">
      <div
        className="pointer-events-none absolute -right-8 -top-10 size-28 rounded-full bg-primary/10 blur-2xl"
        aria-hidden
      />
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/20">
            <Icon className="size-5" />
          </div>
          <span
            className={cn(
              'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
              positive
                ? 'bg-success/12 text-success'
                : 'bg-destructive/12 text-destructive',
            )}
          >
            {positive ? (
              <ArrowUpRight className="size-3.5" />
            ) : (
              <ArrowDownRight className="size-3.5" />
            )}
            {Math.abs(change)}%
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="font-heading text-2xl font-semibold tracking-tight tabular-nums">
            {value}
          </p>
          {caption ? (
            <p className="text-xs text-muted-foreground">{caption}</p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
