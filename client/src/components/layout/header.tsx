import { Bell, MessageCircle, Search, Home, Users, Tv, Store, Gamepad2, ChevronDown, LogOut, Settings, User } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserNameWithBadge } from "@/components/ui/user-name-with-badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [location] = useLocation();
  
  // Maintain online status
  useOnlineStatus();
  
  // Get unread notifications count
  const { data: unreadCount = { count: 0 } } = useQuery<{ count: number }>({
    queryKey: ["/api/notifications/unread-count"],
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-black shadow-2xl sticky top-0 z-50 border-b border-gray-700/50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Left Section: Logo & Search */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-9 h-9 sm:w-11 sm:h-11 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-xl border-2 border-gray-500/30 relative">
                <span className="text-white text-base sm:text-lg font-bold font-serif">💖</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 opacity-20 animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl sm:text-2xl font-bold text-white font-serif tracking-wide drop-shadow-lg">
                  Kết Nối Đẹp
                </h1>
                <p className="text-xs text-white/80 -mt-0.5 tracking-wide">Mạng xã hội văn hóa</p>
              </div>
              <div className="block sm:hidden">
                <h1 className="text-lg font-bold text-white font-serif tracking-wide drop-shadow-lg">
                  Kết Nối Đẹp
                </h1>
              </div>
            </div>
            
            {/* Search Bar */}
            <Link href="/search">
              <div className="relative hidden md:block cursor-pointer ml-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <div className="w-64 lg:w-80 pl-10 pr-4 py-2.5 bg-gray-800/90 backdrop-blur-sm rounded-full border border-gray-600 shadow-lg hover:shadow-xl hover:bg-gray-700/90 transition-all duration-300 flex items-center text-gray-300 text-sm">
                  Tìm kiếm bạn bè, người đẹp...
                </div>
              </div>
            </Link>
          </div>

          {/* Center Navigation - Compact Facebook style */}
          <nav className="hidden lg:flex space-x-0">
            <Link href="/home">
              <div className={`flex items-center justify-center px-8 py-3 border-b-3 transition-all duration-200 ${
                location === "/" || location === "/home" 
                  ? "border-blue-500 bg-gray-700/30" 
                  : "border-transparent hover:bg-gray-700/20 hover:border-gray-500"
              }`} data-testid="link-home">
                <Home className={`h-6 w-6 ${
                  location === "/" || location === "/home" ? "text-blue-500" : "text-gray-400"
                }`} />
              </div>
            </Link>
            <Link href="/friends">
              <div className={`flex items-center justify-center px-8 py-3 border-b-3 transition-all duration-200 ${
                location === "/friends" 
                  ? "border-blue-500 bg-gray-700/30" 
                  : "border-transparent hover:bg-gray-700/20 hover:border-gray-500"
              }`} data-testid="link-friends">
                <Users className={`h-6 w-6 ${
                  location === "/friends" ? "text-blue-500" : "text-gray-400"
                }`} />
              </div>
            </Link>
            <Link href="/beauty-contest">
              <div className={`flex items-center justify-center px-8 py-3 border-b-3 transition-all duration-200 ${
                location === "/beauty-contest" 
                  ? "border-blue-500 bg-gray-700/30" 
                  : "border-transparent hover:bg-gray-700/20 hover:border-gray-500"
              }`} data-testid="link-watch">
                <Tv className={`h-6 w-6 ${
                  location === "/beauty-contest" ? "text-blue-500" : "text-gray-400"
                }`} />
              </div>
            </Link>
            <Link href="/groups">
              <div className={`flex items-center justify-center px-8 py-3 border-b-3 transition-all duration-200 ${
                location === "/groups" 
                  ? "border-blue-500 bg-gray-700/30" 
                  : "border-transparent hover:bg-gray-700/20 hover:border-gray-500"
              }`} data-testid="link-marketplace">
                <Store className={`h-6 w-6 ${
                  location === "/groups" ? "text-blue-500" : "text-gray-400"
                }`} />
              </div>
            </Link>
          </nav>

          {/* Mobile Navigation - Compact Facebook style */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden z-50 shadow-lg">
            <div className="grid grid-cols-5 py-1">
              <Link href="/home">
                <div className="flex items-center justify-center p-3" data-testid="mobile-link-home">
                  <Home className={`h-6 w-6 ${
                    location === "/" || location === "/home" ? "text-blue-500" : "text-gray-500"
                  }`} />
                </div>
              </Link>
              <Link href="/friends">
                <div className="flex items-center justify-center p-3" data-testid="mobile-link-friends">
                  <Users className={`h-6 w-6 ${
                    location === "/friends" ? "text-blue-500" : "text-gray-500"
                  }`} />
                </div>
              </Link>
              <Link href="/beauty-contest">
                <div className="flex items-center justify-center p-3" data-testid="mobile-link-watch">
                  <Tv className={`h-6 w-6 ${
                    location === "/beauty-contest" ? "text-blue-500" : "text-gray-500"
                  }`} />
                </div>
              </Link>
              <Link href="/groups">
                <div className="flex items-center justify-center p-3" data-testid="mobile-link-marketplace">
                  <Store className={`h-6 w-6 ${
                    location === "/groups" ? "text-blue-500" : "text-gray-500"
                  }`} />
                </div>
              </Link>
              <Link href="/notifications">
                <div className="flex items-center justify-center p-3 relative" data-testid="mobile-link-notifications">
                  <Bell className={`h-6 w-6 ${
                    location === "/notifications" ? "text-blue-500" : "text-gray-500"
                  }`} />
                  {unreadCount.count > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold min-w-[20px]">
                      {unreadCount.count > 9 ? '9+' : unreadCount.count}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          </div>

          {/* Right Section: Actions & Profile */}
          <div className="flex items-center space-x-2">
            {/* Notifications */}
            <Link href="/notifications" className="hidden sm:block">
              <button 
                className="w-10 h-10 bg-gray-700/30 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gray-600/40 hover:scale-105 transition-all duration-300 relative border border-gray-600/30"
                data-testid="button-notifications"
              >
                <Bell className="h-5 w-5 text-gray-300" />
                {unreadCount.count > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center min-w-[20px] font-bold shadow-lg animate-pulse">
                    {unreadCount.count > 99 ? '99+' : unreadCount.count}
                  </span>
                )}
              </button>
            </Link>
            
            {/* Messages */}
            <Link href="/messages" className="hidden sm:block">
              <button 
                className="w-10 h-10 bg-gray-700/30 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gray-600/40 hover:scale-105 transition-all duration-300 border border-gray-600/30"
                data-testid="button-messages"
              >
                <MessageCircle className="h-5 w-5 text-gray-300" />
              </button>
            </Link>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="flex items-center space-x-2 hover:bg-gray-700/30 rounded-full p-1.5 h-auto border border-gray-600/30 bg-gray-700/20 backdrop-blur-sm hover:scale-105 transition-all duration-300"
                  data-testid="button-profile"
                >
                  <div className="relative">
                    <img 
                      src={user?.profileImage || "/default-avatar.jpg"} 
                      alt="User avatar" 
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-gray-500/50 shadow-lg"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-800"></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-200 hidden md:block max-w-[120px] truncate">
                    <UserNameWithBadge 
                      firstName={user?.firstName || ""}
                      lastName={user?.lastName || ""}
                      badgeImageUrl={user?.badgeImageUrl}
                    />
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-300 hidden md:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-gray-800/95 backdrop-blur-lg border border-gray-600/50 shadow-2xl rounded-2xl">
                <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-gray-700/50 to-gray-800/50 rounded-t-2xl border-b border-gray-600/30">
                  <img 
                    src={user?.profileImage || "/default-avatar.jpg"} 
                    alt="User avatar" 
                    className="w-10 h-10 rounded-full border-2 border-gray-500 shadow-md"
                  />
                  <div>
                    <p className="text-sm font-bold text-gray-100">
                      <UserNameWithBadge 
                        firstName={user?.firstName || ""}
                        lastName={user?.lastName || ""}
                        badgeImageUrl={user?.badgeImageUrl}
                      />
                    </p>
                    <p className="text-xs text-gray-400">{user?.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator className="border-gray-600/50" />
                <DropdownMenuItem className="py-3 px-4 hover:bg-gray-700/50 rounded-lg mx-2 my-1">
                  <Link href="/profile" className="flex items-center w-full">
                    <User className="mr-3 h-5 w-5 text-blue-400" />
                    <span className="text-gray-200 font-medium">Hồ sơ cá nhân</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-3 px-4 hover:bg-gray-700/50 rounded-lg mx-2 my-1">
                  <Settings className="mr-3 h-5 w-5 text-gray-400" />
                  <span className="text-gray-200 font-medium">Cài đặt</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-gray-600/50" />
                <DropdownMenuItem 
                  onClick={async () => {
                    try {
                      await signOut.mutateAsync();
                      toast({
                        title: "Đăng xuất thành công",
                        description: "Bạn đã đăng xuất khỏi hệ thống.",
                      });
                    } catch (error) {
                      toast({
                        title: "Lỗi",
                        description: "Không thể đăng xuất. Vui lòng thử lại.",
                        variant: "destructive",
                      });
                    }
                  }}
                  className="text-red-400 py-3 px-4 hover:bg-red-900/30 rounded-lg mx-2 my-1"
                  data-testid="button-signout"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  <span className="font-medium">Đăng xuất</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
