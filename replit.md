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

### Facebook-Style Interface Implementation
**User Request**: Transform entire interface to look like Facebook's design.

**Changes Made**:
1. **Header Design** (`client/src/components/layout/header.tsx`):
   - Changed from dark gradient to clean white background with gray border
   - Updated logo from custom design to Facebook's blue "f" logo with "Facebook" text
   - Modified search bar to light gray with Facebook-style placeholder text
   - Updated navigation to use Facebook's underline indicator system (3px blue border-bottom)
   - Changed notification/message buttons to gray rounded background
   - Updated dropdown menu to clean white design with proper gray text colors

2. **Layout and Background** (`client/src/components/layout/layout.tsx`, `client/src/pages/home.tsx`):
   - Changed main background from custom color to Facebook's light gray (#f3f4f6)
   - Updated mobile header to match desktop Facebook styling
   - Removed dark gradient themes throughout

3. **Sidebar Styling** (`client/src/components/layout/left-sidebar.tsx`, `client/src/components/layout/right-sidebar.tsx`):
   - Left sidebar: Removed card background, updated to clean Facebook-style navigation
   - Right sidebar: Removed white card backgrounds, updated text colors to Facebook's gray palette
   - Updated hover states to use light gray backgrounds
   - Changed buttons to Facebook's blue color scheme

4. **Mobile Navigation** (`client/src/components/ui/mobile-nav.tsx`):
   - Updated active state color from light blue to Facebook's blue (#2563eb)
   - Maintained clean white background with proper borders

5. **Custom CSS** (`client/src/index.css`):
   - Added `.border-b-3` utility class for Facebook's 3px navigation indicators

**Result**: Complete transformation to Facebook's clean, professional white and blue interface design.

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