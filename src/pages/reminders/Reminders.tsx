import { RemindersListFeature } from '@/features/reminders'
import { useApplications } from '@/features/applications'

export default function Reminders() {
  // Fetch all applications (flat list, no pagination) for the reminder form dropdown
  const { data } = useApplications({
    page: 1,
    limit: 100,
    sortBy: 'appliedDate',
    order: 'desc',
  })

  const applications = (data?.applications ?? []).map((app) => ({
    id: app.id,
    position: app.position,
    company: { name: app.company.name },
  }))

  return <RemindersListFeature applications={applications} />
}
