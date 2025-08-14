import Header from "@/components/layout/header";
import LeftSidebar from "@/components/layout/left-sidebar";
import RightSidebar from "@/components/layout/right-sidebar";
import Stories from "@/components/feed/stories";
import CreatePost from "@/components/feed/create-post";
import NewsFeed from "@/components/feed/news-feed";
import MobileNav from "@/components/ui/mobile-nav";

export default function Home() {
  console.log("🏠 Home component is rendering");
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header - only show on desktop (lg+) */}
      <div className="hidden lg:block">
        <Header />
      </div>
      
      {/* Mobile Header - show on mobile and tablet */}
      <div className="lg:hidden bg-gradient-to-r from-gray-900 via-gray-800 to-black shadow-2xl sticky top-0 z-50 border-b border-gray-700/50">
        <div className="flex items-center justify-between h-14 px-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">💖</span>
            </div>
            <h1 className="text-lg font-bold text-white font-serif">Kết Nối Đẹp</h1>
          </div>
        </div>
      </div>
      
      {/* Main Layout */}
      <div className="lg:max-w-screen-xl lg:mx-auto lg:flex lg:gap-6 lg:pt-4">
        {/* Left Sidebar - only on desktop (lg+) */}
        <div className="hidden lg:block lg:w-80 lg:flex-shrink-0">
          <LeftSidebar />
        </div>
        
        {/* Main Content */}
        <main className="flex-1 px-4 pt-4 pb-20 lg:px-0 lg:pb-4 lg:max-w-2xl lg:mx-auto">
          <Stories />
          <CreatePost />
          <NewsFeed />
        </main>
        
        {/* Right Sidebar - only on desktop (lg+) */}
        <div className="hidden lg:block lg:w-80 lg:flex-shrink-0">
          <RightSidebar />
        </div>
      </div>
      
      {/* Mobile Navigation - only show on mobile and tablet */}
      <MobileNav />
    </div>
  );
}
