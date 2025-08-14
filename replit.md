# Kết Nối Đẹp - Social Media App

## Project Overview
A comprehensive social media platform built with React, Express, and PostgreSQL. Features include user authentication, posts, stories, groups, messaging, and more.

## Architecture
- **Frontend**: React with TypeScript, Vite, TailwindCSS, Wouter for routing
- **Backend**: Express.js with TypeScript, PostgreSQL with Drizzle ORM
- **Authentication**: Session-based with express-session
- **File Storage**: Cloudinary integration
- **Deployment**: Render.com

## Recent Changes (August 14, 2025)
### Router Rebuild for Production Deployment
**Issue**: After deploying to render.com, users were redirected to landing page instead of home page after successful login.

**Root Cause**: 
- Authentication state synchronization issues between client and server
- Router logic not handling production environment authentication properly
- SessionStorage markers being cleared too early

**Solution Implemented**:
1. **Enhanced Router Logic** (`client/src/App.tsx`):
   - Priority-based routing system that favors authenticated routes
   - Better handling of authentication markers and URL parameters
   - Improved fallback logic for uncertain authentication states

2. **Improved Authentication Hook** (`client/src/hooks/useAuth.ts`):
   - Extended timeout for authentication markers (60 seconds)
   - Better cache handling with forced no-cache headers
   - Delayed cleanup of session markers until successful authentication

3. **Enhanced SignIn Component** (`client/src/pages/signin.tsx`):
   - Environment-specific redirect strategies
   - Multiple redirect attempts for reliability
   - Direct navigation to `/home` route in production

4. **Smart AuthenticatedRoutes Component**:
   - Force redirect logic from root to home after login
   - URL parameter detection for authentication state
   - Automatic URL cleanup after successful authentication

## User Preferences
- Language: Vietnamese
- Focus on production stability and reliability
- Prioritize fixing deployment-related issues

## Technical Decisions
- Use session-based authentication over JWT for simplicity
- Implement client-side routing with wouter
- Use React Query for state management and API calls
- Prioritize production environment compatibility

## Database Schema
Located in `shared/schema.ts` with Drizzle ORM models and relations.

## Deployment Configuration
- Platform: Render.com
- Environment variables: DATABASE_URL and other secrets
- Build command: `npm run build`
- Start command: `npm start`