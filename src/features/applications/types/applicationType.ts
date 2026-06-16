// Enums
export type JobType =
  | 'FULL_TIME'
  | 'PART_TIME'
  | 'CONTRACT'
  | 'INTERNSHIP'
  | 'FREELANCE'
  | 'REMOTE'

export type ApplicationSource =
  | 'LINKEDIN'
  | 'GLINTS'
  | 'JOBSTREET'
  | 'UPWORK'
  | 'INDEED'
  | 'WEBSITE'
  | 'INSTAGRAM'
  | 'X'
  | 'OTHER'

export type ApplicationStatus =
  | 'APPLIED'
  | 'SCREENING'
  | 'INTERVIEW'
  | 'OFFER'
  | 'REJECTED'
  | 'WITHDRAWN'
  | 'ACCEPTED'

// Company
export interface Company {
  id: string
  name: string
  website?: string | null
  location?: string | null
}

// Application History
export interface ApplicationHistory {
  id: string
  oldStatus: ApplicationStatus | null
  newStatus: ApplicationStatus
  notes: string | null
  createdAt: string
}

// Application
export interface Application {
  id: string
  position: string
  jobType: JobType
  location: string | null
  source: ApplicationSource
  sourceUrl: string | null
  description: string | null
  requirements: string | null
  salaryRange: string | null
  status: ApplicationStatus
  appliedDate: string
  deadlineDate: string | null
  notes: string | null
  createdAt: string
  company: Company
  histories?: ApplicationHistory[]
}

// Create Application Payload
export interface CreateApplicationPayload {
  companyName: string
  companyWebsite?: string
  companyLocation?: string
  position: string
  jobType: JobType
  location?: string
  source: ApplicationSource
  sourceUrl?: string
  description?: string
  requirements?: string
  salaryRange?: string
  status?: ApplicationStatus
  appliedDate?: string
  deadlineDate?: string
  notes?: string
}

// Update Application Payload
export interface UpdateApplicationPayload {
  companyName?: string
  companyWebsite?: string
  companyLocation?: string
  position?: string
  jobType?: JobType
  location?: string
  source?: ApplicationSource
  sourceUrl?: string
  description?: string
  requirements?: string
  salaryRange?: string
  status?: ApplicationStatus
  appliedDate?: string
  deadlineDate?: string
  notes?: string
}

// Extract URL Payload
export interface ExtractUrlPayload {
  url: string
}

// Extract URL Response
export interface ExtractedJobData {
  companyName: string
  companyWebsite?: string
  companyLocation?: string
  position: string
  jobType: JobType
  location?: string
  source: ApplicationSource
  sourceUrl: string
  description?: string
  requirements?: string
  salaryRange?: string
  deadlineDate?: string
}

// Query Params
export interface ApplicationsQueryParams {
  page?: number
  limit?: number
  search?: string
  status?: ApplicationStatus | ''
  source?: ApplicationSource | ''
  jobType?: JobType | ''
  sortBy?: 'appliedDate' | 'createdAt' | 'position' | 'status'
  order?: 'asc' | 'desc'
}

// Pagination
export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

// API Responses
export interface ApplicationsResponse {
  message: string
  applications: Application[]
  pagination: Pagination
}

export interface ApplicationResponse {
  message: string
  application: Application
}

export interface ExtractUrlResponse {
  message: string
  data: ExtractedJobData
}

export interface DeleteResponse {
  message: string
}
