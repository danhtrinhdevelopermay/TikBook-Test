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
### Final Authentication and Session Fix
**Issue**: After deploying to render.com, users were redirected to landing page instead of home page after successful login, plus browser cookie persistence problems.

**Root Cause**: 
- Session store not properly configured for PostgreSQL
- Browser sending stale cookies from previous sessions
- SameSite cookie policy inconsistencies

**Solution Implemented**:
1. **Fixed PostgreSQL Session Store** (`server/routes.ts`):
   - Set `createTableIfMissing: true` for automatic session table setup
   - Configured `saveUninitialized: true` for better session handling
   - Standardized `sameSite: 'lax'` for cross-environment compatibility

2. **Clear Cookies Endpoint** (`/api/auth/clear-cookies`):
   - Added endpoint to destroy stale sessions
   - Browser can clear old cookies before new login attempts

3. **Test Login Page** (`/test-login`):
   - Created comprehensive test page for authentication debugging
   - Tests login flow, user API, and posts API in sequence
   - Auto-redirects to home page after successful authentication

4. **Session Debugging Enhanced**:
   - Added detailed session logging throughout authentication flow
   - Clear visibility into cookie headers and session state
   - Confirmed authentication works via curl and browser

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