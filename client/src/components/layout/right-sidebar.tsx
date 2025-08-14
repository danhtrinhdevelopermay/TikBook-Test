import { useQuery } from "@tanstack/react-query";
import { Search, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { UserWithFriendshipStatus, User } from "@shared/schema";

export default function RightSidebar() {
  const { data: friendRequests = [] } = useQuery<UserWithFriendshipStatus[]>({
    queryKey: ["/api/friends/requests"],
  });

  const { data: onlineFriends = [] } = useQuery<User[]>({
    queryKey: ["/api/friends/online"],
  });

  return (
    <aside className="hidden xl:block w-80 sticky top-20 h-fit">
      {/* Sponsored Content */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-3">Được tài trợ</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 cursor-pointer hover:bg-secondary rounded-lg p-2 transition-colors" data-testid="card-sponsored">
            <img 
              src="/api/placeholder/80" 
              alt="Photography course advertisement" 
              className="w-16 h-16 rounded-lg object-cover bg-gray-200"
            />
            <div className="flex-1">
              <h4 className="font-medium text-foreground text-sm">Thành thạo nhiếp ảnh</h4>
              <p className="text-muted-foreground text-xs">Học kỹ thuật nhiếp ảnh chuyên nghiệp từ các chuyên gia</p>
              <p className="text-muted-foreground text-xs mt-1">photographymaster.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Friend Requests */}
      {friendRequests.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-foreground">Lời mời kết bạn</h3>
            <a href="#" className="text-primary text-sm hover:underline" data-testid="link-see-all-requests">Xem tất cả</a>
          </div>
          <div className="space-y-3">
            {friendRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between" data-testid={`card-friend-request-${request.id}`}>
                <div className="flex items-center space-x-3">
                  <img 
                    src={request.profileImage || '/default-avatar.jpg'} 
                    alt={`${request.firstName} ${request.lastName}`} 
                    className="w-10 h-10 rounded-full bg-gray-200"
                  />
                  <div>
                    <p className="font-medium text-foreground text-sm" data-testid={`text-requester-name-${request.id}`}>
                      {request.firstName} {request.lastName}
                    </p>
                    <p className="text-muted-foreground text-xs" data-testid={`text-mutual-friends-${request.id}`}>
                      {request.mutualFriendsCount} bạn chung
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    className="bg-primary hover:bg-primary text-white px-3 py-1 rounded-lg text-sm transition-colors"
                    data-testid={`button-accept-${request.id}`}
                  >
                    Xác nhận
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-secondary hover:bg-border text-foreground px-3 py-1 rounded-lg text-sm transition-colors"
                    data-testid={`button-delete-${request.id}`}
                  >
                    Xóa
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Online Friends */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-foreground">Danh bạ</h3>
          <div className="flex space-x-2">
            <button 
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-secondary transition-colors"
              data-testid="button-search-contacts"
            >
              <Search className="h-4 w-4 text-muted-foreground" />
            </button>
            <button 
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-secondary transition-colors"
              data-testid="button-contacts-options"
            >
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>
        <div className="space-y-2">
          {onlineFriends.map((friend) => (
            <div 
              key={friend.id}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-secondary cursor-pointer transition-colors"
              data-testid={`card-online-friend-${friend.id}`}
            >
              <div className="relative">
                <img 
                  src={friend.profileImage || '/api/placeholder/32'} 
                  alt={`${friend.firstName} ${friend.lastName}`} 
                  className="w-8 h-8 rounded-full bg-gray-200"
                />
                {friend.isOnline && (
                  <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                )}
              </div>
              <span className="text-foreground text-sm" data-testid={`text-friend-name-${friend.id}`}>
                {friend.firstName} {friend.lastName}
              </span>
            </div>
          ))}
          
          {/* No online friends message */}
          {onlineFriends.length === 0 && (
            <div className="text-center p-4 text-muted-foreground text-sm">
              Hiện tại không có bạn bè nào trực tuyến
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
