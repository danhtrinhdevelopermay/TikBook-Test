# Kết Nối Đẹp - Social Media App

## Project Overview
A comprehensive social media platform built with React, Express, and PostgreSQL. Features include user authentication, posts, stories, groups, messaging, and more.

## Architecture
- **Frontend**: React with TypeScript, Vite, TailwindCSS, Wouter for routing
- **Backend**: Express.js with TypeScript, PostgreSQL with Drizzle ORM
- **Authentication**: Session-based with express-session
- **File Storage**: Cloudinary integration
- **Deployment**: Render.com

## Recent Changes (August 15, 2025)

### Facebook-Style Navigation Implementation
**User Request**: Transform navigation to match Facebook's compact, mobile-first design with notification/message buttons in top header.

**Changes Made**:
1. **Mobile Bottom Navigation** (`client/src/components/ui/mobile-nav.tsx`):
   - Reduced to 5 icons only (Home, Friends, Contest, Groups, Menu) like Facebook
   - Removed text labels for cleaner look
   - Added hamburger menu dropdown for additional pages
   - Excluded admin pages from navigation menus

2. **Top Header Notifications** (`client/src/components/layout/header.tsx`):
   - Moved notification and message buttons to top navigation bar
   - Made buttons visible on both mobile and desktop (removed hidden classes)
   - Responsive sizing: smaller on mobile (8x8), larger on desktop (10x10)
   - Added notification badge with count display

3. **Menu Organization**:
   - Main navigation: Only essential pages (Home, Friends, Contest, Groups)
   - Dropdown menu: Secondary pages (Saved, Events, Videos, Memories, Profile)
   - Clean separation between primary and secondary navigation

**Result**: Navigation now matches Facebook's design philosophy with compact bottom nav and top-positioned notification/message buttons.

### Previous Authentication and Posts Display Fix (August 14, 2025)
**Issues Fixed**:
1. Users not seeing posts due to authentication problems
2. Mobile/desktop responsive design not working properly 
3. Infinite 401 authentication loops

**Solutions Implemented**:
1. **Authentication Routing Fix** - Proper route handling
2. **Responsive Design Improvements** - Mobile/desktop layout optimization  
3. **Mobile Navigation Enhancement** - Better routing and styling
4. **Stories Component Responsive** - Mobile-optimized display
5. **CSS Utilities** - Enhanced responsive breakpoints

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