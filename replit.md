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

### Authentication and Posts Display Fix
**Issues Fixed**:
1. Users not seeing posts due to authentication problems
2. Mobile/desktop responsive design not working properly 
3. Infinite 401 authentication loops

**Root Causes**:
- Router showing authenticated routes even when user not logged in
- Session userId was missing from browser sessions
- Responsive breakpoints not properly configured

**Solutions Implemented**:
1. **Authentication Routing Fix** (`client/src/App.tsx`):
   - Fixed Router component to properly check authentication status
   - Added logic to show unauthenticated routes when user not logged in
   - Eliminated infinite 401 error loops

2. **Responsive Design Improvements** (`client/src/pages/home.tsx`):
   - Separate desktop and mobile headers
   - Proper responsive sidebar and navigation layout
   - Mobile navigation only shows on small screens (lg:hidden)
   - Desktop header and sidebars only show on large screens (lg:block)

3. **Mobile Navigation Enhancement** (`client/src/components/ui/mobile-nav.tsx`):
   - Added proper routing with wouter Link components
   - Active state indication for current page
   - Vietnamese labels and improved styling

4. **Stories Component Responsive** (`client/src/components/feed/stories.tsx`):
   - Responsive story card sizes (w-24 lg:w-28)
   - Mobile-optimized spacing and heights
   - Added scrollbar hiding CSS utility

5. **CSS Utilities** (`client/src/index.css`):
   - Added scrollbar-hide utility class
   - Enhanced responsive breakpoint handling

### Previous Authentication and Session Fix
**Issue**: After deploying to render.com, users were redirected to landing page instead of home page after successful login, plus browser cookie persistence problems.

**Solutions**:
1. **Fixed PostgreSQL Session Store** - Automatic session table setup
2. **Clear Cookies Endpoint** - Browser session cleanup
3. **Test Login Page** - Authentication debugging tools
4. **Session Debugging Enhanced** - Detailed logging throughout flow

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