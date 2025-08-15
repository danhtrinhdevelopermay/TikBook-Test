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
    <aside className="hidden xl:block w-80 sticky top-20 h-fit space-y-4">
      {/* Sponsored Content */}
      <div>
        <h3 className="text-lg font-semibold text-gray-600 mb-3">Được tài trợ</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 cursor-pointer hover:bg-gray-100 rounded-lg p-2 transition-colors" data-testid="card-sponsored">
            <img 
              src="/api/placeholder/80" 
              alt="Photography course advertisement" 
              className="w-16 h-16 rounded-lg object-cover bg-gray-200"
            />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 text-sm">Thành thạo nhiếp ảnh</h4>
              <p className="text-gray-600 text-xs">Học kỹ thuật nhiếp ảnh chuyên nghiệp từ các chuyên gia</p>
              <p className="text-gray-500 text-xs mt-1">photographymaster.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Friend Requests */}
      {friendRequests.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-600">Lời mời kết bạn</h3>
            <a href="#" className="text-blue-600 text-sm hover:underline" data-testid="link-see-all-requests">Xem tất cả</a>
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
                    <p className="font-medium text-gray-900 text-sm" data-testid={`text-requester-name-${request.id}`}>
                      {request.firstName} {request.lastName}
                    </p>
                    <p className="text-gray-600 text-xs" data-testid={`text-mutual-friends-${request.id}`}>
                      {request.mutualFriendsCount} bạn chung
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                    data-testid={`button-accept-${request.id}`}
                  >
                    Xác nhận
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-3 py-1 rounded-lg text-sm transition-colors"
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
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-600">Danh bạ</h3>
          <div className="flex space-x-2">
            <button 
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              data-testid="button-search-contacts"
            >
              <Search className="h-4 w-4 text-gray-600" />
            </button>
            <button 
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              data-testid="button-contacts-options"
            >
              <MoreHorizontal className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>
        <div className="space-y-2">
          {onlineFriends.map((friend) => (
            <div 
              key={friend.id}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
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
              <span className="text-gray-900 text-sm" data-testid={`text-friend-name-${friend.id}`}>
                {friend.firstName} {friend.lastName}
              </span>
            </div>
          ))}
          
          {/* No online friends message */}
          {onlineFriends.length === 0 && (
            <div className="text-center p-4 text-gray-500 text-sm">
              Hiện tại không có bạn bè nào trực tuyến
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
