export interface MockCompany {
  id: string
  name: string
  industry: string
  website: string
  activeApplications?: number
}

export interface MockApplication {
  id: string
  role: string
  company: string
  location: string
  salary: string
  status:
    | 'Applied'
    | 'Interviewing'
    | 'Offered'
    | 'Rejected'
    | 'Screening'
    | 'Technical Test'
    | 'HR Interview'
    | 'Offering'
    | 'Accepted'
    | 'Withdrawn'
  source:
    | 'LinkedIn'
    | 'Glints'
    | 'Jobstreet'
    | 'Upwork'
    | 'Indeed'
    | 'Website'
    | 'Instagram'
    | 'X'
    | 'Other'
  date: string
  sourceUrl?: string
  description?: string
  requirements?: string
  notes?: string
}

export interface MockReminder {
  id: string
  title: string
  type: string
  date: string
  time: string
  status: 'Pending' | 'Completed'
  company?: string
}

const INITIAL_COMPANIES: MockCompany[] = [
  {
    id: 'c-1',
    name: 'Google',
    industry: 'Technology / Internet',
    website: 'https://google.com',
  },
  {
    id: 'c-2',
    name: 'Meta',
    industry: 'Social Media / VR',
    website: 'https://meta.com',
  },
  {
    id: 'c-3',
    name: 'Netflix',
    industry: 'Entertainment / Streaming',
    website: 'https://netflix.com',
  },
  {
    id: 'c-4',
    name: 'Stripe',
    industry: 'Financial Services',
    website: 'https://stripe.com',
  },
  {
    id: 'c-5',
    name: 'Vercel',
    industry: 'Cloud Computing / DevTools',
    website: 'https://vercel.com',
  },
]

const INITIAL_APPLICATIONS: MockApplication[] = [
  {
    id: 'a-1',
    role: 'Frontend Developer',
    company: 'Google',
    location: 'Mountain View, CA',
    salary: '$140k - $160k',
    status: 'Interviewing',
    source: 'LinkedIn',
    date: '2026-06-12',
    sourceUrl: 'https://google.com/careers',
    description:
      'Build responsive and accessible UIs for search and workspace apps.',
    requirements: '3+ years experience with React, TypeScript, and modern CSS.',
    notes:
      'First round interview completed. Preparing for technical coding round next week.',
  },
  {
    id: 'a-2',
    role: 'Software Engineer Intern',
    company: 'Meta',
    location: 'Remote',
    salary: '$50/hr',
    status: 'Applied',
    source: 'Website',
    date: '2026-06-10',
    sourceUrl: 'https://meta.com/careers',
    description: 'Work on scaling Instagram backend APIs.',
    requirements:
      'Enrolled in CS degree, experience with Python, Node.js or C++.',
    notes: 'Applied online. Status updated to resume under review.',
  },
  {
    id: 'a-3',
    role: 'React Developer',
    company: 'Netflix',
    location: 'Los Gatos, CA',
    salary: '$180k',
    status: 'Offered',
    source: 'Other',
    date: '2026-06-08',
    sourceUrl: 'https://netflix.com/careers',
    description: 'Create dynamic content playback tools in React.',
    requirements:
      'Deep understanding of React rendering internals, performance profiling.',
    notes: 'Received oral offer! Negotiating base salary and stock options.',
  },
  {
    id: 'a-4',
    role: 'Full Stack Engineer',
    company: 'Stripe',
    location: 'San Francisco, CA',
    salary: '$150k - $175k',
    status: 'Applied',
    source: 'Indeed',
    date: '2026-06-05',
    sourceUrl: 'https://stripe.com/jobs',
    description: 'Scale payment processing checkout widgets.',
    requirements:
      'Solid database design (Postgres), APIs, and security practices.',
    notes: 'Completed initial phone screen.',
  },
  {
    id: 'a-5',
    role: 'Senior React Dev',
    company: 'Vercel',
    location: 'Remote',
    salary: '$200k',
    status: 'Rejected',
    source: 'LinkedIn',
    date: '2026-05-28',
    sourceUrl: 'https://vercel.com/careers',
    description: 'Optimize Next.js framework component rendering.',
    requirements:
      'Expert knowledge of Next.js, compiler toolchains, React Suspense.',
    notes:
      'Rejected after final round due to lack of low-level compiler optimization experience.',
  },
]

const INITIAL_REMINDERS: MockReminder[] = [
  {
    id: 'r-1',
    title: 'Follow up on Google Application',
    type: 'Follow-up',
    date: '2026-06-15',
    time: '10:00 AM',
    status: 'Pending',
    company: 'Google',
  },
  {
    id: 'r-2',
    title: 'Prepare for Meta System Design',
    type: 'Interview Prep',
    date: '2026-06-18',
    time: '02:00 PM',
    status: 'Pending',
    company: 'Meta',
  },
  {
    id: 'r-3',
    title: 'Send Netflix thank you email',
    type: 'Thank you',
    date: '2026-06-09',
    time: '09:00 AM',
    status: 'Completed',
    company: 'Netflix',
  },
]

// LocalStorage helpers
export const getMockCompanies = (): MockCompany[] => {
  const data = localStorage.getItem('th_mock_companies')
  if (!data) {
    localStorage.setItem('th_mock_companies', JSON.stringify(INITIAL_COMPANIES))
    return INITIAL_COMPANIES
  }
  return JSON.parse(data)
}

export const saveMockCompanies = (companies: MockCompany[]) => {
  localStorage.setItem('th_mock_companies', JSON.stringify(companies))
}

export const getMockApplications = (): MockApplication[] => {
  const data = localStorage.getItem('th_mock_applications')
  if (!data) {
    localStorage.setItem(
      'th_mock_applications',
      JSON.stringify(INITIAL_APPLICATIONS)
    )
    return INITIAL_APPLICATIONS
  }
  return JSON.parse(data)
}

export const saveMockApplications = (apps: MockApplication[]) => {
  localStorage.setItem('th_mock_applications', JSON.stringify(apps))
}

export const getMockReminders = (): MockReminder[] => {
  const data = localStorage.getItem('th_mock_reminders')
  if (!data) {
    localStorage.setItem('th_mock_reminders', JSON.stringify(INITIAL_REMINDERS))
    return INITIAL_REMINDERS
  }
  return JSON.parse(data)
}

export const saveMockReminders = (reminders: MockReminder[]) => {
  localStorage.setItem('th_mock_reminders', JSON.stringify(reminders))
}
