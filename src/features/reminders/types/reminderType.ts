// Application reference inside a reminder
export interface ReminderApplication {
  id: string
  position: string
  company: {
    name: string
  }
}

// Reminder model
export interface Reminder {
  id: string
  title: string
  description: string | null
  reminderDate: string
  isDone: boolean
  createdAt: string
  updatedAt: string
  deletedAt?: string | null
  application?: ReminderApplication | null
}

// Create Reminder Payload
export interface CreateReminderPayload {
  title: string
  description?: string
  reminderDate: string
  applicationId?: string
}

// Update Reminder Payload (all optional)
export interface UpdateReminderPayload {
  title?: string
  description?: string
  reminderDate?: string
  isDone?: boolean
  applicationId?: string
}

// Query Params for listing reminders
export interface RemindersQueryParams {
  page?: number
  limit?: number
  isDone?: boolean
  applicationId?: string
  upcoming?: boolean
  sortBy?: 'reminderDate' | 'createdAt'
  order?: 'asc' | 'desc'
}

// Query Params for deleted reminders
export interface DeletedRemindersQueryParams {
  page?: number
  limit?: number
  applicationId?: string
}

// Pagination
export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

// API Responses
export interface RemindersResponse {
  message: string
  reminders: Reminder[]
  pagination: Pagination
}

export interface ReminderResponse {
  message: string
  reminder: Reminder
}

export interface DeleteResponse {
  message: string
}
