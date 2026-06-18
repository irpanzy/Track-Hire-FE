import { Clock, Building2, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { STATUS_COLORS } from '@/features/applications/constants/applicationConstants'
import { cn } from '@/lib/utils'
import type { RecentApplication } from '../types/dashboardType'

interface RecentApplicationsProps {
  applications: RecentApplication[]
}

export default function RecentApplications({
  applications,
}: RecentApplicationsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Applications
            </CardTitle>
            <CardDescription>
              Your latest application submissions
            </CardDescription>
          </div>
          <Link
            to="/applications"
            className="text-primary hover:text-primary/80 flex items-center gap-1 text-sm transition-colors"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        {applications.length > 0 ? (
          <div className="space-y-3">
            {applications.map((app) => (
              <Link
                key={app.id}
                to={`/applications`}
                className="border-border hover:border-border/80 hover:bg-muted/50 flex items-center justify-between rounded-lg border p-4 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="border-border bg-muted flex h-10 w-10 items-center justify-center rounded-lg border">
                    <Building2 className="text-muted-foreground h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">
                      {app.position}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {app.company.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1',
                      STATUS_COLORS[app.status as keyof typeof STATUS_COLORS] ||
                        'bg-zinc-500/15 text-zinc-300 ring-zinc-500/30'
                    )}
                  >
                    {app.status}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {new Date(app.appliedDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className="text-muted-foreground text-sm">
              No recent applications
            </p>
            <Link
              to="/applications"
              className="text-primary hover:text-primary/80 mt-2 inline-flex items-center gap-2 text-sm transition-colors"
            >
              Add your first application
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
