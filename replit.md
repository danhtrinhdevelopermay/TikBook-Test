# Social Media Platform

## Overview
A dynamic social media platform built with React, Express.js, and PostgreSQL, focusing on personalized content discovery and real-time interactions.

## Stack
- Frontend: React.js with TypeScript
- Backend: Express.js
- Database: PostgreSQL with Drizzle ORM (Single database connection)
- State Management: React Query
- Authentication: Custom session-based authentication
- Routing: React Router
- Media Storage: Cloudinary integration
- Video Playback: Advanced custom video player with interactive controls

## Recent Changes  
- **Authentication Redirect Fix v3 (August 14, 2025)**: Complete solution for authentication redirect issues on Render production
  - **Root Path Redirect**: Changed redirect target from `/home` to `/` (root path) to ensure proper SPA routing
  - **SessionStorage Persistence**: Added sessionStorage markers to track successful login/signup events
  - **Enhanced Timing**: Increased delay to 1000ms for better authentication state synchronization
  - **Cache Busting**: Added timestamp parameter (`?_t=`) and `cache: 'no-store'` to force fresh requests
  - **Authentication Logging**: Added comprehensive console logging for debugging authentication flow
  - **Improved Build Process**: Enhanced deploy.sh with dependency installation and verification
  - **Production Detection**: Specific onrender.com detection for environment-aware navigation logic

- **Complete Render Deploy Fix (August 14, 2025)**: Resolved persistent 404 errors after successful login/signup on Render
  - **Root Cause Discovery**: Issue wasn't just session persistence but client-side navigation race conditions in production
  - **Production Redirect Strategy**: Implemented environment-specific navigation - `window.location.href` for production (full reload) vs `setLocation` for development (client routing)
  - **Authentication State Management**: Enhanced query cache invalidation after login/signup with longer sync delays (500ms)
  - **Environment Detection**: Hostname-based production detection instead of `import.meta.env.PROD` for more reliable environment detection
  - **Cache-Busting**: Added timestamp query parameters to force fresh requests and avoid caching issues
  - **Session Configuration**: Fixed `sameSite: 'strict'` instead of `'none'` for same-domain production deployment
  - **CORS Configuration**: Updated to properly handle same-domain requests on Render with null/same-origin checks
  - **Build Process**: Created `deploy.sh` script to copy static files from `dist/public` to `server/public` correctly
  - **Debug Infrastructure**: Added comprehensive logging to auth endpoints, session middleware, and `/api/debug/session` endpoint
  - **Documentation**: Created comprehensive `RENDER_DEPLOY.md` with step-by-step deployment, debugging, and new redirect strategy
  - **Solution Logic**: Full page reload on production ensures fresh authentication state fetch, avoiding SPA routing conflicts

- **Production Deployment Fixes (August 14, 2025)**: Fixed authentication redirect issues for Render deployment
  - Updated session configuration with proper CORS and cookie settings for production
  - Added secure session handling with sameSite and secure cookie options
  - Improved authentication state management with query cache reset after login/signup
  - Added small delays in navigation to ensure state synchronization 
  - Enhanced error handling and authentication state detection
  - Added production-compatible CORS middleware to handle cross-origin requests properly

## Previous Changes
- **Database Simplification (August 13, 2025)**: Removed multi-database system and simplified to single PostgreSQL connection
  - Deleted `database-manager.ts` and `multi-database-config.ts`
  - Removed `DATABASE_SETUP.md` documentation
  - Updated `db.ts` to use simple Neon connection
  - Replaced all `databaseManager.executeMultiDatabaseRead/Write` calls with direct database operations
  - Simplified health check endpoints
  - Removed admin database monitoring endpoints

- **Hybrid Storage System (August 14, 2025)**: Implemented external storage solution for message archiving
  - Added Firebase/JSON storage for message backup and archiving
  - Created hybrid storage system: PostgreSQL for recent messages, external storage for archived messages
  - Added storage management admin panel at `/admin/storage`
  - Implemented automatic message archiving to save database space
  - Added storage statistics and management API endpoints

- **YouTube Integration (August 14, 2025)**: Added complete YouTube Data API v3 integration
  - Created `/videos` page with YouTube search functionality
  - Integrated YouTube Data API v3 for video search and details
  - **Custom Video Player**: Built completely custom video controls replacing YouTube's default interface
  - **Search on Demand**: Only search when user clicks search button to save API quota
  - **Hidden Branding**: Removed YouTube logo and title overlays for cleaner interface
  - **Redesigned Layout**: Moved channel info below video title with custom avatar design
  - Implemented video statistics display (views, likes, channel info)
  - Added navigation link in left sidebar for easy access
  - Included error handling and authentication for API requests

## Project Architecture
### Database Layer
- Single PostgreSQL database using Neon serverless
- Drizzle ORM for type-safe database operations
- Simple connection pool for session management
- Health check endpoint at `/api/health`

### Backend Structure
- `server/db.ts`: Database connection and pool setup
- `server/storage.ts`: Database operations and business logic
- `server/routes.ts`: API endpoints and middleware
- `server/auth.ts`: Authentication middleware
- `server/cloudinary.ts`: Media upload handling

### Frontend Structure
- React components with TypeScript
- TanStack Query for state management
- Wouter for routing
- Shadcn/ui components
- Tailwind CSS for styling

## User Preferences
- Language: Vietnamese (when user communicates in Vietnamese)
- Prefer simple, clean architecture without over-engineering
- Focus on single database approach for reliability

## Development Guidelines
- Follow the fullstack_js blueprint for consistent patterns
- Use proper TypeScript types from shared schema
- Implement proper error handling
- Maintain clean separation between frontend and backend
- Use Drizzle ORM for all database operations