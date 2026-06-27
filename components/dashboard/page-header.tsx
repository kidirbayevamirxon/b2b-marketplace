import { CalendarRange, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function PageHeader({
  title,
  subtitle,
}: {
  title: string
  subtitle: string
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-semibold tracking-tight text-balance lg:text-3xl">
          {title}
        </h1>
        <p className="text-sm text-muted-foreground text-pretty">{subtitle}</p>
      </div>
    
    </div>
  )
}
