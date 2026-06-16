import type {
  JobType,
  ApplicationSource,
  ApplicationStatus,
} from '../types/applicationType'

export const JOB_TYPE_OPTIONS: { value: JobType; label: string }[] = [
  { value: 'FULL_TIME', label: 'Full Time' },
  { value: 'PART_TIME', label: 'Part Time' },
  { value: 'CONTRACT', label: 'Contract' },
  { value: 'INTERNSHIP', label: 'Internship' },
  { value: 'FREELANCE', label: 'Freelance' },
  { value: 'REMOTE', label: 'Remote' },
]

export const APPLICATION_SOURCE_OPTIONS: {
  value: ApplicationSource
  label: string
}[] = [
  { value: 'LINKEDIN', label: 'LinkedIn' },
  { value: 'GLINTS', label: 'Glints' },
  { value: 'JOBSTREET', label: 'JobStreet' },
  { value: 'UPWORK', label: 'Upwork' },
  { value: 'INDEED', label: 'Indeed' },
  { value: 'WEBSITE', label: 'Company Website' },
  { value: 'INSTAGRAM', label: 'Instagram' },
  { value: 'X', label: 'X (Twitter)' },
  { value: 'OTHER', label: 'Other' },
]

export const APPLICATION_STATUS_OPTIONS: {
  value: ApplicationStatus
  label: string
  color: string
}[] = [
  { value: 'APPLIED', label: 'Applied', color: 'blue' },
  { value: 'SCREENING', label: 'Screening', color: 'yellow' },
  { value: 'INTERVIEW', label: 'Interview', color: 'purple' },
  { value: 'OFFER', label: 'Offer', color: 'green' },
  { value: 'REJECTED', label: 'Rejected', color: 'red' },
  { value: 'WITHDRAWN', label: 'Withdrawn', color: 'gray' },
  { value: 'ACCEPTED', label: 'Accepted', color: 'emerald' },
]

export const STATUS_COLORS: Record<ApplicationStatus, string> = {
  APPLIED: 'bg-blue-500/15 text-blue-300 ring-blue-500/30',
  SCREENING: 'bg-yellow-500/15 text-yellow-300 ring-yellow-500/30',
  INTERVIEW: 'bg-purple-500/15 text-purple-300 ring-purple-500/30',
  OFFER: 'bg-green-500/15 text-green-300 ring-green-500/30',
  REJECTED: 'bg-red-500/15 text-red-300 ring-red-500/30',
  WITHDRAWN: 'bg-zinc-500/15 text-zinc-300 ring-zinc-500/30',
  ACCEPTED: 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/30',
}
