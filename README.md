# 📊 Track Hire - Frontend

Modern job application tracking system built with React, TypeScript, and Vite.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Backend API running (default: `http://localhost:3000`)
- Google OAuth Client ID (for Sign-In with Google)

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

### 🔧 Troubleshooting:

- **[Google OAuth Fix](./docs/google-oauth-fix.md)** - Button tidak muncul?
- **[CSP Configuration](./docs/csp-configuration.md)** - CSP violations?
- **[Security Headers](./docs/security-headers.md)** - CORS/security issues?

### 📖 Full Documentation:

See **[docs/README.md](./docs/README.md)** for complete documentation index.

---

## 🛠️ Tech Stack

### Core

- **React 19.2.6** - UI library
- **TypeScript 6.0.2** - Type safety
- **Vite 8.0.12** - Build tool & dev server
- **React Router 7.17.0** - Routing

### State Management

- **TanStack Query 5.101.0** - Server state & data fetching
- **Zustand 5.0.14** - Client state management

### Forms & Validation

- **React Hook Form 7.79.0** - Form handling
- **Zod 4.4.3** - Schema validation

### UI & Styling

- **Tailwind CSS 4.3.1** - Utility-first CSS
- **Radix UI** - Accessible components
- **Lucide React** - Icon library
- **Sonner** - Toast notifications

### Authentication

- **Axios 1.17.0** - HTTP client with interceptors
- **@react-oauth/google 0.13.5** - Google OAuth

---

## 📁 Project Structure

```
track-hire-fe/
├── docs/                    # 📚 Complete documentation
│   ├── README.md           # Documentation index
│   ├── cors-csp-setup.md   # CORS & CSP configuration
│   ├── deployment.md       # Deployment guide
│   └── ...                 # More guides
├── src/
│   ├── features/           # Feature modules (feature slicing)
│   │   └── auth/          # Authentication feature
│   │       ├── components/ # UI components
│   │       ├── hooks/      # React Query hooks
│   │       ├── schemas/    # Zod validation schemas
│   │       ├── services/   # API service layer
│   │       ├── store/      # Zustand state
│   │       ├── types/      # TypeScript types
│   │       └── index.ts    # Public exports
│   ├── pages/             # Page components (route wrappers)
│   ├── layouts/           # Layout components
│   ├── components/        # Shared components
│   ├── lib/               # Utilities & configs
│   └── main.tsx           # App entry point
├── public/                # Static assets
├── vercel.json            # Vercel config (development)
├── vercel.production.json # Vercel config (production)
├── .env                   # Environment variables (local)
└── package.json           # Dependencies & scripts
```

---

## 🎯 Features

### ✅ Implemented

- **Authentication System**
  - Email/username + password login
  - Google OAuth Sign-In
  - User registration with email verification
  - Forgot & reset password flow
  - Auto token refresh
  - Protected routes

- **Security**
  - Content Security Policy (CSP)
  - CORS configuration
  - HttpOnly & Secure cookies
  - XSS protection
  - Clickjacking protection

- **Developer Experience**
  - Feature slicing architecture
  - TypeScript strict mode
  - ESLint + Prettier
  - Hot Module Replacement (HMR)

### 🚧 Coming Soon

- Applications management
- Companies tracking
- Reminders system
- Dashboard with statistics
- User profile management

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

## 🔒 Security

This project implements security best practices:

- ✅ Content Security Policy (CSP)
- ✅ HTTPS enforcement (via Vercel)
- ✅ XSS protection headers
- ✅ Clickjacking protection (X-Frame-Options)
- ✅ MIME sniffing protection
- ✅ CORS configuration
- ✅ Secure cookie flags (HttpOnly, Secure, SameSite)

**Details:** [docs/security-headers.md](./docs/security-headers.md)

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

**Full Troubleshooting:** [docs/README.md](./docs/README.md#-getting-help)

---

## 📖 Architecture

### Feature Slicing Pattern

Features are organized as self-contained modules:

```
features/auth/
├── components/   # UI components (forms, feedback)
├── hooks/        # React Query hooks (useAuthMutations)
├── schemas/      # Zod validation schemas
├── services/     # API calls (authService)
├── store/        # Zustand state (authStore)
├── types/        # TypeScript types
└── index.ts      # Public API (controlled exports)
```

**Benefits:**

- ✅ Clear separation of concerns
- ✅ Easy to test and maintain
- ✅ Scalable for new features
- ✅ Self-contained and reusable

---

## 🤝 Contributing

### Development Workflow

1. Create feature branch

   ```bash
   git checkout -b feature/your-feature
   ```

2. Make changes and test

   ```bash
   npm run dev
   npm run lint
   npm run type-check
   ```

3. Commit and push

   ```bash
   git add .
   git commit -m "feat: your feature description"
   git push origin feature/your-feature
   ```

4. Create Pull Request

---

## 📝 License

[Your License Here]

---

## 🆘 Support

### Documentation

- **[Complete Docs](./docs/README.md)** - All documentation
- **[CORS/CSP Setup](./docs/cors-csp-setup.md)** - Configuration guide
- **[Deployment](./docs/deployment.md)** - Deploy to Vercel

### External Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vercel Documentation](https://vercel.com/docs)

---

## 📊 Stats

- **Bundle Size:** ~627KB (181KB gzipped)
- **Build Time:** ~700ms
- **Dependencies:** 50+ packages
- **TypeScript Coverage:** 100%

---

**Built with ❤️ using React + TypeScript + Vite**

🚀 **[Start Development](./docs/cors-csp-setup.md)** | 📚 **[Read Docs](./docs/README.md)** | 🐛 **[Report Issue](#)**
