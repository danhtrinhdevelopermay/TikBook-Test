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
      <Header />
      
      <div className="max-w-screen-xl mx-auto flex gap-6 pt-4">
        <LeftSidebar />
        
        <main className="flex-1 max-w-2xl mx-auto px-4 lg:px-0">
          <Stories />
          <CreatePost />
          <NewsFeed />
        </main>
        
        <RightSidebar />
      </div>
      
      <MobileNav />
    </div>
  );
}
