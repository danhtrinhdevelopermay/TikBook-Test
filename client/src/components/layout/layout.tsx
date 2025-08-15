import { ReactNode } from "react";
import Header from "./header";
import LeftSidebar from "./left-sidebar";
import RightSidebar from "./right-sidebar";
import NotificationManager from "../notifications/notification-manager";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400">
      <Header />
      <div className="max-w-7xl mx-auto flex px-2 sm:px-4 lg:px-6">
        {/* Left Sidebar - hiển thị từ lg (1024px) trở lên */}
        <aside className="w-80 sticky top-16 h-screen overflow-y-auto hidden lg:block pr-4 shrink-0">
          <LeftSidebar />
        </aside>
        
        {/* Main Content - responsive width */}
        <main className="flex-1 min-w-0 px-2 sm:px-4 lg:px-6 pb-16 lg:pb-0 max-w-full lg:max-w-2xl xl:max-w-3xl mx-auto lg:mx-0">
          {children}
        </main>
        
        {/* Right Sidebar - hiển thị từ xl (1280px) trở lên */}
        <aside className="w-80 sticky top-16 h-screen overflow-y-auto hidden xl:block pl-4 shrink-0">
          <RightSidebar />
        </aside>
      </div>
      <NotificationManager />
    </div>
  );
}