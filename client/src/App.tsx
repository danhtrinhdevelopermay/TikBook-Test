import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import Home from "@/pages/home";
import SignIn from "@/pages/signin";
import SignUp from "@/pages/signup";
import Landing from "@/pages/landing";
import NotFound from "@/pages/not-found";
import SetupProfile from "@/pages/setup-profile";
import FriendsPage from "@/pages/friends";
import GroupsPage from "@/pages/groups";
import SavedPage from "@/pages/saved";
import EventsPage from "@/pages/events";
import MemoriesPage from "@/pages/memories";
import NotificationsPage from "@/pages/notifications";
import MessagesPage from "@/pages/messages";
import ProfilePage from "@/pages/profile";
import MediaTestPage from "@/pages/media-test";
import UserProfile from "@/pages/user-profile";
import PostDetail from "@/pages/post-detail";
import GroupDetail from "@/pages/group-detail";
import SearchPage from "@/pages/search";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminDatabaseStatus from "@/pages/AdminDatabaseStatus";
import StoryDetail from "@/pages/story-detail";
import BeautyContest from "@/pages/beauty-contest";
import AdminBeautyContest from "@/pages/admin-beauty-contest";
import StorageManagement from "@/pages/storage-management";
import VideosPage from "@/pages/videos";
import TestLogin from "@/pages/test-login";
import DebugSession from "@/pages/debug-session";

function AuthenticatedRoutes() {
  console.log("📍 AuthenticatedRoutes component is rendering");
  console.log("📍 Current pathname:", window.location.pathname);
  
  // Check if we should force redirect to home after login
  const shouldRedirectToHome = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const authenticatedParam = urlParams.get('authenticated');
    const currentPath = window.location.pathname;
    
    // Force redirect to home if:
    // 1. We have authenticated parameter in URL and we're on root
    // 2. We're on root path and just logged in
    if ((authenticatedParam && currentPath === '/') || 
        (currentPath === '/' && sessionStorage.getItem('loginSuccess'))) {
      console.log("🎯 Forcing redirect to home page");
      // Clean URL and redirect to home
      if (window.history.replaceState) {
        window.history.replaceState({}, '', '/home');
      }
      return true;
    }
    return false;
  };
  
  return (
    <Switch>
      <Route path="/">{() => {
        if (shouldRedirectToHome()) {
          console.log("🏠 Redirecting from root to home");
          return <Home />;
        }
        console.log("🏠 Rendering home on root path");
        return <Home />;
      }}</Route>
      <Route path="/home">{() => {
        console.log("🏠 /home route matched!");
        return <Home />;
      }}</Route>
      <Route path="/setup-profile" component={SetupProfile} />
      <Route path="/friends" component={FriendsPage} />
      <Route path="/groups" component={GroupsPage} />
      <Route path="/saved" component={SavedPage} />
      <Route path="/events" component={EventsPage} />
      <Route path="/memories" component={MemoriesPage} />
      <Route path="/notifications" component={NotificationsPage} />
      <Route path="/messages" component={MessagesPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/search" component={SearchPage} />
      <Route path="/user/:userId" component={UserProfile} />
      <Route path="/post/:postId" component={PostDetail} />
      <Route path="/group/:groupId" component={GroupDetail} />
      <Route path="/media-test" component={MediaTestPage} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/database" component={AdminDatabaseStatus} />
      <Route path="/story/:storyId" component={StoryDetail} />
      <Route path="/beauty-contest" component={BeautyContest} />
      <Route path="/admin/beauty-contest" component={AdminBeautyContest} />
      <Route path="/admin/storage" component={StorageManagement} />
      <Route path="/videos" component={VideosPage} />
      <Route path="/test-login" component={TestLogin} />
      <Route path="/debug-session" component={DebugSession} />
      <Route>{() => {
        console.log("❌ No route matched, rendering NotFound");
        return <NotFound />;
      }}</Route>
    </Switch>
  );
}

function UnauthenticatedRoutes() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/test-login" component={TestLogin} />
      <Route path="/debug-session" component={DebugSession} />
      <Route component={NotFound} />
    </Switch>
  );
}

function Router() {
  const { isAuthenticated, isLoading, isError, user } = useAuth();
  
  // Check for authentication markers and URL parameters
  const loginSuccess = typeof window !== 'undefined' && sessionStorage.getItem('loginSuccess');
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const authenticatedParam = urlParams?.get('authenticated');
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
  
  console.log("🔄 Router state:", { 
    isAuthenticated, 
    isLoading, 
    isError, 
    userExists: !!user, 
    loginSuccess: !!loginSuccess, 
    authenticatedParam: !!authenticatedParam,
    currentPath 
  });

  // Show loading screen during authentication check
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            Kết Nối Đẹp
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Đang tải...</p>
        </div>
      </div>
    );
  }

  // Priority routing logic for production environment
  // 1. If user is authenticated (confirmed by API), always show authenticated routes
  if (isAuthenticated && user) {
    console.log("✅ User is authenticated (API confirmed), showing authenticated routes");
    return <AuthenticatedRoutes />;
  }

  // 2. If we have recent login markers or URL auth parameter, prioritize authenticated routes
  if (loginSuccess || authenticatedParam) {
    console.log("🎯 Recent login detected or auth parameter found, showing authenticated routes");
    return <AuthenticatedRoutes />;
  }

  // 3. Special handling for root path "/" - prefer authenticated routes unless explicitly unauthenticated
  if (currentPath === '/' && !isError) {
    console.log("📍 On root path with no explicit auth error, showing authenticated routes");
    return <AuthenticatedRoutes />;
  }

  // 4. If user is on authenticated paths (not signin/signup), prefer authenticated routes
  if (currentPath !== '/signin' && currentPath !== '/signup' && !isError) {
    console.log("🎯 On authenticated path, showing authenticated routes");
    return <AuthenticatedRoutes />;
  }

  // 5. If there's a clear authentication error and we're on auth-related paths, show unauthenticated routes
  if (isError && (currentPath === '/signin' || currentPath === '/signup')) {
    console.log("❌ Authentication error on auth pages, showing unauthenticated routes");
    return <UnauthenticatedRoutes />;
  }

  // 6. If we're on root path with auth error, show unauthenticated routes
  if (isError && currentPath === '/') {
    console.log("❌ Authentication error on root path, showing unauthenticated routes");
    return <UnauthenticatedRoutes />;
  }

  // 7. Default fallback - if no clear indication, try authenticated routes first
  if (!isError) {
    console.log("🤔 Uncertain state but no error, defaulting to authenticated routes");
    return <AuthenticatedRoutes />;
  }

  // 8. Final fallback - show unauthenticated routes
  console.log("🔄 Final fallback - showing unauthenticated routes");
  return <UnauthenticatedRoutes />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
