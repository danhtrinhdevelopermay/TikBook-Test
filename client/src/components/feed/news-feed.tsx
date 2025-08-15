import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import Post from "./post";
import type { PostWithUser, CommentWithUser } from "@shared/schema";

// Separate component to handle individual post with comments
function PostWithComments({ post }: { post: PostWithUser }) {
  const { data: comments = [] } = useQuery<CommentWithUser[]>({
    queryKey: ["/api/posts", post.id, "comments"],
  });

  return <Post post={post} comments={comments} />;
}

export default function NewsFeed() {
  const { data: posts = [], isLoading } = useQuery<PostWithUser[]>({
    queryKey: ["/api/posts/feed"],
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 animate-pulse">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full"></div>
              <div>
                <div className="w-24 h-5 bg-gray-300 rounded-lg mb-2"></div>
                <div className="w-16 h-4 bg-gray-300 rounded-lg"></div>
              </div>
            </div>
            <div className="w-full h-36 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl mb-4"></div>
            <div className="flex justify-around">
              <div className="w-20 h-10 bg-gray-300 rounded-xl"></div>
              <div className="w-20 h-10 bg-gray-300 rounded-xl"></div>
              <div className="w-20 h-10 bg-gray-300 rounded-xl"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div data-testid="news-feed">
      {posts.map((post) => (
        <PostWithComments 
          key={post.id} 
          post={post} 
        />
      ))}
      
      {/* Load More */}
      <div className="text-center py-8">
        <Button 
          variant="outline"
          className="bg-white/90 backdrop-blur-sm hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-600 hover:text-white text-gray-700 border-gray-300 px-8 py-3 rounded-xl shadow-lg transition-all duration-300 font-semibold"
          data-testid="button-load-more"
        >
          Tải thêm bài viết
        </Button>
      </div>
    </div>
  );
}
