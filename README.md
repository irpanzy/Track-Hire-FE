# 📊 Track Hire - Frontend

Modern job application tracking system built with React, TypeScript, and Vite. Track your job applications, manage companies, set reminders, and monitor your job search progress with a beautiful, intuitive interface.

## ✨ Features

### 🔐 Authentication & User Management

- **Email/Username + Password Login** - Secure authentication
- **Google OAuth Sign-In** - Quick sign-in with Google
- **User Registration** - With email verification
- **Password Recovery** - Forgot & reset password flow
- **Auto Token Refresh** - Seamless session management
- **Protected Routes** - Role-based access control (User/Admin)
- **Profile Management** - Update profile information and avatar

### 📝 Application Management

- **CRUD Operations** - Create, read, update, delete applications
- **AI Job Extractor** - Auto-fill from job posting URL (rate-limited: 10/hour)
- **Advanced Filtering** - By status, source, job type, with search
- **Status Tracking** - Applied, Screening, Interview, Offer, Rejected, Withdrawn, Accepted
- **Application History** - Track status changes over time
- **Recycle Bin** - Soft delete with restore capability
- **Permanent Delete** - Remove applications permanently
- **Detailed View** - View full application details with history

### 🏢 Company Management

- **Company Database** - Track companies you're interested in
- **Company Information** - Name, website, location
- **Application Link** - See your applications per company
- **Filtering** - Search, sort, filter by user applications
- **Recycle Bin** - Soft delete with restore capability
- **Permanent Delete** - With safety checks (can't delete if has applications)

### 📊 Dashboard & Analytics

- **Application Statistics** - Total, by status, pending
- **Monthly Trends** - Track applications over time with charts
- **Source Analytics** - See which job boards work best
- **Status Distribution** - Visual breakdown by status
- **Quick Actions** - Add application, view reminders

### 🔔 Reminders System

- **Custom Reminders** - Set reminders for interviews, follow-ups, etc.
- **Link to Applications** - Connect reminders to specific applications
- **Due Date Tracking** - Never miss important dates
- **CRUD Operations** - Full reminder management

### 👥 Admin Features

- **User Management** - View and manage all users
- **User Filtering** - Search by name/email, filter by role
- **Role Management** - Assign admin/user roles
- **User Deletion** - Soft delete users
- **Recycle Bin** - Restore or permanently delete users
- **Statistics** - View total users, admins, regular users

### 🎨 UI/UX

- **Shadcn UI** - Beautiful, accessible components
- **Dark Theme** - Modern dark interface
- **Responsive Design** - Works on desktop, tablet, mobile
- **Toast Notifications** - Real-time feedback
- **Loading States** - Smooth loading indicators
- **Empty States** - Helpful messages when no data
- **Form Validation** - Real-time validation with Zod
- **Pagination** - Efficient data browsing

### 🔒 Security

- **Content Security Policy (CSP)** - Prevent XSS attacks
- **CORS Configuration** - Secure API communication
- **HttpOnly Cookies** - Secure token storage
- **XSS Protection** - Security headers
- **Clickjacking Protection** - X-Frame-Options header
- **HTTPS Enforcement** - Via Vercel
- **Secure Authentication** - JWT with refresh tokens

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** and npm
- **Backend API** running (default: `http://localhost:3000`)
- **Google OAuth Client ID** (for Sign-In with Google)

### Installation

```bash
# Clone repository
git clone <repository-url>
cd track-hire-fe

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env and add your values

# Start development server
npm run dev
```

Visit `http://localhost:5173` 🎉

---

## 📚 Documentation

**Complete documentation available in [`docs/`](./docs/) folder.**

### 🌟 Start Here:

1. **[CORS & CSP Setup](./docs/cors-csp-setup.md)** ⭐ - Configuration overview
2. **[Deployment Guide](./docs/deployment.md)** - Deploy to Vercel
3. **[Deploy Checklist](./docs/deploy-checklist.md)** - Pre/post deployment checks

### 🔧 Feature Documentation:

- **[Shadcn Migration](./docs/shadcn-migration-complete.md)** - UI components migration
- **[Companies Feature](./docs/companies-feature-implementation.md)** - Companies management
- **[Applications Recycle Bin](./docs/applications-recycle-bin-implementation.md)** - Soft delete & restore

### 🐛 Troubleshooting:

- **[Google OAuth Fix](./docs/google-oauth-fix.md)** - Button tidak muncul?
- **[CSP Configuration](./docs/csp-configuration.md)** - CSP violations?
- **[Security Headers](./docs/security-headers.md)** - CORS/security issues?

### 📖 Full Documentation:

See **[docs/README.md](./docs/README.md)** for complete documentation index.

---

## 🛠️ Tech Stack

### Core

- **React 19.2.6** - UI library with latest features
- **TypeScript 6.0.2** - Type safety and better DX
- **Vite 8.0.12** - Lightning fast build tool & dev server
- **React Router 7.17.0** - Client-side routing

### State Management

- **TanStack Query 5.101.0** - Server state, caching & data fetching
- **Zustand 5.0.14** - Lightweight client state management

### Forms & Validation

- **React Hook Form 7.79.0** - Performant form handling
- **Zod 4.4.3** - TypeScript-first schema validation

### UI & Styling

- **Tailwind CSS 4.3.1** - Utility-first CSS framework
- **Shadcn UI** - Beautiful, accessible component library
- **Radix UI** - Unstyled, accessible primitives
- **Lucide React** - Clean, consistent icon library
- **Sonner** - Elegant toast notifications
- **Recharts** - Composable charting library

### Authentication & HTTP

- **Axios 1.17.0** - HTTP client with interceptors
- **@react-oauth/google 0.13.5** - Google OAuth integration

---

## 📁 Project Structure

```
track-hire-fe/
├── docs/                      # 📚 Complete documentation
│   ├── README.md             # Documentation index
│   ├── companies-feature-implementation.md
│   ├── applications-recycle-bin-implementation.md
│   └── ...                   # More guides
├── src/
│   ├── features/             # Feature modules (feature slicing)
│   │   ├── auth/            # Authentication
│   │   ├── applications/    # Application management
│   │   ├── companies/       # Company management
│   │   ├── users/           # User profile
│   │   ├── admin/           # Admin features
│   │   └── dashboard/       # Dashboard & analytics
│   ├── pages/               # Page components (route wrappers)
│   ├── layouts/             # Layout components
│   ├── components/          # Shared components (shadcn UI)
│   │   └── ui/             # Shadcn UI components
│   ├── lib/                 # Utilities & configs
│   │   ├── api.ts          # Axios instance
│   │   ├── utils.ts        # Helper functions
│   │   └── mockData.ts     # Development mock data
│   ├── routes.tsx           # Route definitions
│   └── main.tsx             # App entry point
├── public/                   # Static assets
├── vercel.json              # Vercel config (development)
├── vercel.production.json   # Vercel config (production)
├── .env                     # Environment variables (local)
└── package.json             # Dependencies & scripts
```

### Feature Slicing Architecture

Each feature is organized as a self-contained module:

```
features/applications/
├── components/              # UI components
│   ├── ApplicationsListFeature.tsx      # Main feature component
│   ├── ApplicationFormDialog.tsx        # Create/edit form
│   ├── ApplicationDetailDialog.tsx      # View details
│   ├── ApplicationsRecycleBinFeature.tsx # Recycle bin
│   ├── ConfirmDeleteDialog.tsx         # Delete confirmation
│   ├── ConfirmRestoreDialog.tsx        # Restore confirmation
│   └── ...
├── hooks/                   # React Query hooks
│   ├── useApplications.ts              # Query hooks
│   └── useApplicationMutations.ts      # Mutation hooks
├── schemas/                 # Zod validation schemas
│   └── applicationSchema.ts
├── services/                # API service layer
│   └── applicationService.ts
├── types/                   # TypeScript types
│   └── applicationType.ts
├── constants/               # Constants & config
│   └── applicationConstants.ts
└── index.ts                 # Public API exports
```

**Benefits:**

- ✅ Clear separation of concerns
- ✅ Easy to test and maintain
- ✅ Scalable for new features
- ✅ Self-contained and reusable
- ✅ TypeScript-first approach

---

## 🎯 API Integration

### Endpoints

#### Authentication (5 endpoints)

- `POST /auth/register` - User registration
- `POST /auth/login` - Login with email/username
- `POST /auth/google` - Google OAuth login
- `POST /auth/refresh-token` - Refresh access token
- `POST /auth/logout` - Logout user

#### Applications (9 endpoints)

- `POST /applications` - Create application
- `POST /applications/extract-url` - AI extract from URL
- `GET /applications` - List applications (with filters)
- `GET /applications/:id` - Get application by ID
- `PUT /applications/:id` - Update application
- `DELETE /applications/:id` - Soft delete
- `GET /applications/deleted/list` - List deleted
- `POST /applications/:id/restore` - Restore application
- `DELETE /applications/:id/permanent` - Permanent delete

#### Companies (8 endpoints)

- `POST /companies` - Create company
- `GET /companies` - List companies (with filters)
- `GET /companies/:id` - Get company by ID
- `PUT /companies/:id` - Update company
- `DELETE /companies/:id` - Soft delete
- `GET /companies/deleted/list` - List deleted
- `POST /companies/:id/restore` - Restore company
- `DELETE /companies/:id/permanent` - Permanent delete

#### Admin (8 endpoints)

- `GET /admin/users` - List all users
- `GET /admin/users/:id` - Get user by ID
- `PATCH /admin/users/:id/role` - Update user role
- `DELETE /admin/users/:id` - Soft delete user
- `GET /admin/users/deleted/list` - List deleted users
- `POST /admin/users/:id/restore` - Restore user
- `DELETE /admin/users/:id/permanent` - Permanent delete
- `GET /admin/stats` - Get admin statistics

**Total: 30+ API endpoints fully integrated**

---

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start dev server (localhost:5173)

# Build
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
npm run type-check       # TypeScript type checking

# Deployment
vercel --prod            # Deploy to Vercel production
```

---

## 🌍 Environment Variables

### Development (`.env`)

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_GOOGLE_CLIENT_ID=your-dev-google-client-id
```

### Production (Vercel Dashboard)

```env
VITE_API_BASE_URL=https://api.track-hire.app/api
VITE_GOOGLE_CLIENT_ID=your-production-google-client-id
```

**Setup Guide:** [docs/deployment.md](./docs/deployment.md)

---

## 🚀 Deployment

### Quick Deploy to Vercel

1. **Push to GitHub**

   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your repository

3. **Set Environment Variables**
   - `VITE_API_BASE_URL`
   - `VITE_GOOGLE_CLIENT_ID`

4. **Deploy!**

**Full Guide:** [docs/deployment.md](./docs/deployment.md)  
**Checklist:** [docs/deploy-checklist.md](./docs/deploy-checklist.md)

---

## 🐛 Troubleshooting

### Common Issues

| Issue                        | Solution                                              |
| ---------------------------- | ----------------------------------------------------- |
| Google button tidak muncul   | [google-oauth-fix.md](./docs/google-oauth-fix.md)     |
| CSP violations / API blocked | [csp-configuration.md](./docs/csp-configuration.md)   |
| CORS errors                  | [cors-csp-setup.md](./docs/cors-csp-setup.md)         |
| Deployment fails             | [deployment.md](./docs/deployment.md#troubleshooting) |
| Dialog too small             | Check `!max-w-none` override in DialogContent         |

**Full Troubleshooting:** [docs/README.md](./docs/README.md#-getting-help)

---

## 🤝 Contributing

### Development Workflow

1. **Create feature branch**

   ```bash
   git checkout -b feature/your-feature
   ```

2. **Make changes and test**

   ```bash
   npm run dev
   npm run lint
   npm run type-check
   ```

3. **Commit and push**

   ```bash
   git add .
   git commit -m "feat: your feature description"
   git push origin feature/your-feature
   ```

4. **Create Pull Request**

### Code Standards

- ✅ TypeScript strict mode
- ✅ ESLint + Prettier
- ✅ Feature slicing architecture
- ✅ Shadcn UI components
- ✅ React Query for server state
- ✅ Zod for validation

---

## 📊 Project Stats

- **Bundle Size:** ~1.1MB (~319KB gzipped)
- **Build Time:** ~900-1100ms
- **Modules:** 2700+
- **Dependencies:** 50+ packages
- **TypeScript Coverage:** 100%
- **Components:** 100+
- **Features:** 6 major features
- **API Endpoints:** 30+ integrated

---

## 🎨 UI Components (Shadcn)

### Installed Components

- **Button** - All variants (default, destructive, outline, ghost)
- **Input** - Text, email, password, date inputs
- **Select** - Dropdown selection
- **Textarea** - Multi-line text input
- **Dialog** - Modal dialogs
- **Badge** - Status badges with colors
- **Card** - Content containers
- **Table** - Data tables
- **Avatar** - User avatars
- **Label** - Form labels
- **Separator** - Visual dividers
- **Sonner** - Toast notifications
- **Chart** - Recharts integration

All components are fully typed and accessible!

---

## 📝 License

[Your License Here]

---

## 🆘 Support

### Documentation

- **[Complete Docs](./docs/README.md)** - All documentation
- **[CORS/CSP Setup](./docs/cors-csp-setup.md)** - Configuration guide
- **[Deployment](./docs/deployment.md)** - Deploy to Vercel
- **[Companies Feature](./docs/companies-feature-implementation.md)** - Companies management
- **[Applications Recycle Bin](./docs/applications-recycle-bin-implementation.md)** - Soft delete & restore

### External Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Shadcn UI](https://ui.shadcn.com/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Vercel Documentation](https://vercel.com/docs)

---

## 🎯 Roadmap

### ✅ Completed

- Authentication system with Google OAuth
- Application management with CRUD
- Companies management
- Recycle bins (applications & companies)
- Dashboard with analytics
- Admin panel
- Profile management
- Reminders system
- All shadcn UI migration

### 🔜 Upcoming

- Email notifications
- Export data (CSV/PDF)
- Advanced search
- Application templates
- Mobile app (React Native)
- Multi-language support

---

**Built with ❤️ using React + TypeScript + Vite + Shadcn UI**

🚀 **[Start Development](./docs/cors-csp-setup.md)** | 📚 **[Read Docs](./docs/README.md)** | 🐛 **[Report Issue](#)**
