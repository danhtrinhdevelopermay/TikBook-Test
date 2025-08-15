import { useState } from "react";
import { Bell, MessageCircle, Search, Home, Users, Tv, Store, Gamepad2, ChevronDown, LogOut, Settings, User, Menu, Bookmark, Calendar, Crown, Clock } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Maintain online status
  useOnlineStatus();
  
  // Get unread notifications count
  const { data: unreadCount = { count: 0 } } = useQuery<{ count: number }>({
    queryKey: ["/api/notifications/unread-count"],
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Left Section: Logo & Search */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-bold">f</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-blue-600">
                  Facebook
                </h1>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="relative hidden md:block ml-4">
              <input 
                type="text"
                placeholder="Tìm kiếm trên Facebook"
                className="w-64 lg:w-80 px-4 py-2 pl-10 rounded-full bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            </div>
          </div>

          {/* Center Navigation - Facebook style */}
          <nav className="hidden lg:flex space-x-0">
            <Link href="/home">
              <div className={`flex items-center justify-center px-8 py-3 border-b-3 transition-all duration-200 ${
                location === "/" || location === "/home" 
                  ? "border-blue-600 text-blue-600" 
                  : "border-transparent text-gray-500 hover:bg-gray-100"
              }`} data-testid="link-home">
                <Home className="h-6 w-6" />
              </div>
            </Link>
            <Link href="/friends">
              <div className={`flex items-center justify-center px-8 py-3 border-b-3 transition-all duration-200 ${
                location === "/friends" 
                  ? "border-blue-600 text-blue-600" 
                  : "border-transparent text-gray-500 hover:bg-gray-100"
              }`} data-testid="link-friends">
                <Users className="h-6 w-6" />
              </div>
            </Link>
            <Link href="/beauty-contest">
              <div className={`flex items-center justify-center px-8 py-3 border-b-3 transition-all duration-200 ${
                location === "/beauty-contest" 
                  ? "border-blue-600 text-blue-600" 
                  : "border-transparent text-gray-500 hover:bg-gray-100"
              }`} data-testid="link-watch">
                <Tv className="h-6 w-6" />
              </div>
            </Link>
            <Link href="/groups">
              <div className={`flex items-center justify-center px-8 py-3 border-b-3 transition-all duration-200 ${
                location === "/groups" 
                  ? "border-blue-600 text-blue-600" 
                  : "border-transparent text-gray-500 hover:bg-gray-100"
              }`} data-testid="link-marketplace">
                <Store className="h-6 w-6" />
              </div>
            </Link>
          </nav>

          {/* Mobile Navigation - Simplified like Facebook */}
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
              
              {/* Mobile Menu Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="flex items-center justify-center p-3 w-full" 
                  data-testid="mobile-menu-toggle"
                >
                  <Menu className="h-6 w-6 text-gray-500" />
                </button>
                
                {/* Dropdown Menu */}
                {isMobileMenuOpen && (
                  <div className="absolute bottom-full right-0 mb-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <Link href="/saved">
                      <div 
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Bookmark className="h-5 w-5 text-gray-600" />
                        <span className="text-gray-900 font-medium">Đã lưu</span>
                      </div>
                    </Link>
                    <Link href="/events">
                      <div 
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Calendar className="h-5 w-5 text-gray-600" />
                        <span className="text-gray-900 font-medium">Sự kiện</span>
                      </div>
                    </Link>
                    <Link href="/videos">
                      <div 
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Tv className="h-5 w-5 text-gray-600" />
                        <span className="text-gray-900 font-medium">Video YouTube</span>
                      </div>
                    </Link>
                    <Link href="/memories">
                      <div 
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Clock className="h-5 w-5 text-gray-600" />
                        <span className="text-gray-900 font-medium">Kỷ niệm</span>
                      </div>
                    </Link>
                    <Link href="/profile">
                      <div 
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <User className="h-5 w-5 text-gray-600" />
                        <span className="text-gray-900 font-medium">Hồ sơ cá nhân</span>
                      </div>
                    </Link>
                    <div className="border-t border-gray-200 my-2"></div>
                    <button
                      onClick={() => {
                        signOut.mutate();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 transition-colors w-full text-left"
                    >
                      <LogOut className="h-5 w-5 text-red-600" />
                      <span className="text-red-600 font-medium">Đăng xuất</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Overlay to close menu when clicking outside */}
            {isMobileMenuOpen && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-25 z-[-1]"
                onClick={() => setIsMobileMenuOpen(false)}
              ></div>
            )}
          </div>

          {/* Right Section: Actions & Profile */}
          <div className="flex items-center space-x-2">
            {/* Notifications */}
            <Link href="/notifications">
              <button 
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all duration-200 relative"
                data-testid="button-notifications"
              >
                <Bell className="h-5 w-5 text-gray-600" />
                {unreadCount.count > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center min-w-[20px] font-bold">
                    {unreadCount.count > 99 ? '99+' : unreadCount.count}
                  </span>
                )}
              </button>
            </Link>
            
            {/* Messages */}
            <Link href="/messages">
              <button 
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all duration-200"
                data-testid="button-messages"
              >
                <MessageCircle className="h-5 w-5 text-gray-600" />
              </button>
            </Link>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="flex items-center space-x-2 hover:bg-gray-100 rounded-full p-1.5 h-auto"
                  data-testid="button-profile"
                >
                  <div className="relative">
                    <img 
                      src={user?.profileImage || "/default-avatar.jpg"} 
                      alt="User avatar" 
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 hidden md:block max-w-[120px] truncate">
                    <UserNameWithBadge 
                      firstName={user?.firstName || ""}
                      lastName={user?.lastName || ""}
                      badgeImageUrl={user?.badgeImageUrl}
                    />
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-600 hidden md:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white border border-gray-200 shadow-lg rounded-lg">
                <div className="flex items-center space-x-3 p-3 border-b border-gray-200">
                  <img 
                    src={user?.profileImage || "/default-avatar.jpg"} 
                    alt="User avatar" 
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      <UserNameWithBadge 
                        firstName={user?.firstName || ""}
                        lastName={user?.lastName || ""}
                        badgeImageUrl={user?.badgeImageUrl}
                      />
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator className="border-gray-200" />
                <DropdownMenuItem className="py-3 px-4 hover:bg-gray-100">
                  <Link href="/profile" className="flex items-center w-full">
                    <User className="mr-3 h-5 w-5 text-gray-600" />
                    <span className="text-gray-900 font-medium">Hồ sơ cá nhân</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-3 px-4 hover:bg-gray-100">
                  <Settings className="mr-3 h-5 w-5 text-gray-600" />
                  <span className="text-gray-900 font-medium">Cài đặt</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-gray-200" />
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
                  className="text-red-600 py-3 px-4 hover:bg-red-50"
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
