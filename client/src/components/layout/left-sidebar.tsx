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
      <div className="bg-white rounded-lg shadow-sm p-4">
        {/* User Profile Section */}
        <div className="flex items-center space-x-3 mb-4">
          <img 
            src={user?.profileImage || "/default-avatar.jpg"} 
            alt="User profile" 
            className="w-12 h-12 rounded-full bg-gray-200"
            data-testid="img-profile"
          />
          <div>
            <h3 className="font-semibold text-foreground" data-testid="text-username">
              {user && (
                <UserNameWithBadge 
                  firstName={user.firstName}
                  lastName={user.lastName}
                  badgeImageUrl={user.badgeImageUrl}
                />
              )}
            </h3>
            <p className="text-sm text-muted-foreground" data-testid="text-bio">
              {user?.bio || "Lập trình viên"}
            </p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          <Link 
            href="/friends" 
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary transition-colors"
            data-testid="link-friends-nav"
          >
            <UsersRound className="text-primary w-5 h-5" />
            <span className="text-foreground">Bạn bè</span>
            {friendsCount && friendsCount.count > 0 && (
              <span className="ml-auto bg-primary text-white text-xs px-2 py-1 rounded-full">
                {friendsCount.count}
              </span>
            )}
          </Link>
          <Link 
            href="/groups" 
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary transition-colors"
            data-testid="link-groups"
          >
            <Users className="text-green-500 w-5 h-5" />
            <span className="text-foreground">Nhóm</span>
          </Link>
          <Link 
            href="/saved" 
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary transition-colors"
            data-testid="link-saved"
          >
            <Bookmark className="text-purple-500 w-5 h-5" />
            <span className="text-foreground">Đã lưu</span>
          </Link>
          <Link 
            href="/events" 
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary transition-colors"
            data-testid="link-events"
          >
            <Calendar className="text-red-500 w-5 h-5" />
            <span className="text-foreground">Sự kiện</span>
          </Link>
          <Link 
            href="/memories" 
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary transition-colors"
            data-testid="link-memories"
          >
            <Clock className="text-orange-500 w-5 h-5" />
            <span className="text-foreground">Kỷ niệm</span>
          </Link>
          <Link 
            href="/videos" 
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary transition-colors"
            data-testid="link-videos"
          >
            <Play className="text-red-600 w-5 h-5" />
            <span className="text-foreground">Video YouTube</span>
          </Link>
          <Link 
            href="/beauty-contest" 
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary transition-colors"
            data-testid="link-beauty-contest"
          >
            <Crown className="text-yellow-500 w-5 h-5" />
            <span className="text-foreground">Cuộc thi sắc đẹp</span>
            <span className="ml-auto text-xs bg-gradient-to-r from-pink-500 to-purple-500 text-white px-2 py-1 rounded-full">
              HOT
            </span>
          </Link>
        </nav>

        {/* Recent Groups */}
        <div className="mt-6 pt-4 border-t border-border">
          <h4 className="text-sm font-semibold text-muted-foreground mb-3">Lối tắt của bạn</h4>
          <div className="space-y-2">
            <a 
              href="#" 
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary transition-colors"
              data-testid="link-tech-developers"
            >
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&w=32&h=32&fit=crop" 
                alt="Tech Developers group" 
                className="w-8 h-8 rounded-lg"
              />
              <span className="text-foreground text-sm">Lập trình viên</span>
            </a>
            <a 
              href="#" 
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary transition-colors"
              data-testid="link-photography"
            >
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&w=32&h=32&fit=crop" 
                alt="Photography Enthusiasts group" 
                className="w-8 h-8 rounded-lg"
              />
              <span className="text-foreground text-sm">Yêu thích nhiếp ảnh</span>
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
