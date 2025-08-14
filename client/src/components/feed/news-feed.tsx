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
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div>
                <div className="w-24 h-4 bg-gray-300 rounded mb-2"></div>
                <div className="w-16 h-3 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className="w-full h-32 bg-gray-300 rounded mb-4"></div>
            <div className="flex justify-around">
              <div className="w-16 h-8 bg-gray-300 rounded"></div>
              <div className="w-16 h-8 bg-gray-300 rounded"></div>
              <div className="w-16 h-8 bg-gray-300 rounded"></div>
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
      <div className="text-center py-6">
        <Button 
          variant="outline"
          className="bg-secondary hover:bg-border text-foreground px-6 py-2"
          data-testid="button-load-more"
        >
          Load more posts
        </Button>
      </div>
    </div>
  );
}
