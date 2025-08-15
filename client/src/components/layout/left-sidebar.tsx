import { useQuery } from "@tanstack/react-query";
import { UsersRound, Users, Bookmark, Calendar, Clock, Crown, Play } from "lucide-react";
import { Link } from "wouter";
import type { User } from "@shared/schema";
import { UserNameWithBadge } from "@/components/ui/user-name-with-badge";

export default function LeftSidebar() {
  const { data: user } = useQuery<User>({
    queryKey: ["/api/users/me"],
  });

  const { data: friendsCount } = useQuery<{ count: number }>({
    queryKey: ["/api/friends/count"],
  });

  return (
    <aside className="hidden lg:block w-80 sticky top-20 h-fit">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 space-y-2">
        {/* User Profile Section */}
        <Link href="/profile">
          <div className="flex items-center space-x-3 p-3 hover:bg-purple-50 rounded-xl cursor-pointer transition-all duration-200">
            <img 
              src={user?.profileImage || "/default-avatar.jpg"} 
              alt="User profile" 
              className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white shadow-md"
              data-testid="img-profile"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-800 text-sm truncate" data-testid="text-username">
                {user && (
                  <UserNameWithBadge 
                    firstName={user.firstName}
                    lastName={user.lastName}
                    badgeImageUrl={user.badgeImageUrl}
                  />
                )}
              </h3>
            </div>
          </div>
        </Link>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          <Link 
            href="/friends" 
            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-purple-50 transition-all duration-200"
            data-testid="link-friends-nav"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
              <UsersRound className="text-white w-4 h-4" />
            </div>
            <span className="text-gray-800 text-sm font-medium">Bạn bè</span>
            {friendsCount && friendsCount.count > 0 && (
              <span className="ml-auto bg-gradient-to-r from-pink-400 to-red-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
                {friendsCount.count}
              </span>
            )}
          </Link>
          <Link 
            href="/groups" 
            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-purple-50 transition-all duration-200"
            data-testid="link-groups"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-teal-500 rounded-lg flex items-center justify-center">
              <Users className="text-white w-4 h-4" />
            </div>
            <span className="text-gray-800 text-sm font-medium">Nhóm</span>
          </Link>
          <Link 
            href="/beauty-contest" 
            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-purple-50 transition-all duration-200"
            data-testid="link-beauty-contest"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
              <Crown className="text-white w-4 h-4" />
            </div>
            <span className="text-gray-800 text-sm font-medium">Cuộc thi sắc đẹp</span>
          </Link>
          <Link 
            href="/saved" 
            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-purple-50 transition-all duration-200"
            data-testid="link-saved"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
              <Bookmark className="text-white w-4 h-4" />
            </div>
            <span className="text-gray-800 text-sm font-medium">Đã lưu</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
}
