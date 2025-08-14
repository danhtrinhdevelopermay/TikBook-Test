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

function AuthenticatedRoutes() {
  console.log("📍 AuthenticatedRoutes component is rendering");
  console.log("📍 Current pathname:", window.location.pathname);
  
  return (
    <Switch>
      <Route path="/" component={Home} />
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
      <Route component={NotFound} />
    </Switch>
  );
}

function Router() {
  const { isAuthenticated, isLoading, isError, user } = useAuth();
  
  console.log("🔄 Router state:", { isAuthenticated, isLoading, isError, userExists: !!user });

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

  // If there's an authentication error, show unauthenticated routes
  if (isError) {
    console.log("Authentication error detected, showing unauthenticated routes");
    return <UnauthenticatedRoutes />;
  }

  // Proper routing based on authentication status
  if (isAuthenticated) {
    console.log("User is authenticated, showing authenticated routes");
    return <AuthenticatedRoutes />;
  } else {
    console.log("User is not authenticated, showing unauthenticated routes");
    return <UnauthenticatedRoutes />;
  }
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
