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
      <div className="space-y-2">
        {/* User Profile Section */}
        <Link href="/profile">
          <div className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
            <img 
              src={user?.profileImage || "/default-avatar.jpg"} 
              alt="User profile" 
              className="w-9 h-9 rounded-full bg-gray-200"
              data-testid="img-profile"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 text-sm truncate" data-testid="text-username">
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
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            data-testid="link-friends-nav"
          >
            <UsersRound className="text-blue-600 w-5 h-5" />
            <span className="text-gray-900 text-sm font-medium">Bạn bè</span>
            {friendsCount && friendsCount.count > 0 && (
              <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {friendsCount.count}
              </span>
            )}
          </Link>
          <Link 
            href="/groups" 
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            data-testid="link-groups"
          >
            <Users className="text-blue-600 w-5 h-5" />
            <span className="text-gray-900 text-sm font-medium">Nhóm</span>
          </Link>
          <Link 
            href="/beauty-contest" 
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            data-testid="link-beauty-contest"
          >
            <Crown className="text-blue-600 w-5 h-5" />
            <span className="text-gray-900 text-sm font-medium">Cuộc thi sắc đẹp</span>
          </Link>
          <Link 
            href="/saved" 
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            data-testid="link-saved"
          >
            <Bookmark className="text-blue-600 w-5 h-5" />
            <span className="text-gray-900 text-sm font-medium">Đã lưu</span>
          </Link>
        </nav>


      </div>
    </aside>
  );
}
