import { useQuery, useMutation } from "@tanstack/react-query";
import { Plus, X } from "lucide-react";
import { useState, useRef } from "react";
import { useLocation } from "wouter";
import type { User, StoryWithUser } from "@shared/schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UploadProgress } from "@/components/ui/upload-progress";
import { useToast } from "@/hooks/use-toast";
import { UserNameWithBadge } from "@/components/ui/user-name-with-badge";
import { queryClient } from "@/lib/queryClient";

export default function Stories() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [storyContent, setStoryContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'uploading' | 'processing' | 'success' | 'error'>('uploading');
  const [uploadMessage, setUploadMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const { data: user } = useQuery<User>({
    queryKey: ["/api/users/me"],
  });

  const { data: stories = [] } = useQuery<StoryWithUser[]>({
    queryKey: ["/api/stories"],
  });

  const createStoryMutation = useMutation({
    mutationFn: async (data: { content: string; file: File }) => {
      setIsUploading(true);
      setUploadStatus('uploading');
      setUploadProgress(0);
      setUploadMessage("Đang tải lên story...");

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            setUploadStatus('processing');
            setUploadMessage("Đang xử lý story...");
            return 90;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      try {
        const formData = new FormData();
        formData.append("content", data.content);
        formData.append("media", data.file);

        const response = await fetch("/api/stories", {
          method: "POST",
          credentials: "include",
          body: formData,
        });

        clearInterval(progressInterval);

        if (!response.ok) {
          setUploadStatus('error');
          setUploadMessage("Lỗi tạo story");
          throw new Error("Failed to create story");
        }

        setUploadProgress(100);
        setUploadStatus('success');
        setUploadMessage("Story đã được tạo thành công!");

        return response.json();
      } catch (error) {
        clearInterval(progressInterval);
        setUploadStatus('error');
        setUploadMessage("Lỗi tạo story");
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/stories"] });
      setTimeout(() => {
        resetForm();
        toast({
          title: "Story created!",
          description: "Your story has been shared successfully.",
        });
      }, 1500);
    },
    onError: () => {
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
        setUploadStatus('uploading');
        setUploadMessage("");
        toast({
          title: "Error",
          description: "Failed to create story. Please try again.",
          variant: "destructive",
        });
      }, 1500);
    },
  });

  const resetForm = () => {
    setStoryContent("");
    setSelectedFile(null);
    setPreviewUrl(null);
    setIsCreateDialogOpen(false);
    setIsUploading(false);
    setUploadProgress(0);
    setUploadStatus('uploading');
    setUploadMessage("");
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (!isImage && !isVideo) {
      toast({
        title: "Invalid file type",
        description: "Only images and videos are allowed for stories.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "File must be smaller than 50MB.",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      toast({
        title: "No media selected",
        description: "Please select an image or video for your story.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    createStoryMutation.mutate({ content: storyContent, file: selectedFile });
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-3 lg:p-4 mb-4">
        <div className="flex space-x-3 lg:space-x-4 overflow-x-auto scrollbar-hide">
          {/* Add Story */}
          <div className="flex-shrink-0 w-24 lg:w-28">
            <div 
              className="relative bg-gray-800 dark:bg-gray-900 rounded-xl h-40 flex flex-col items-center justify-between p-3 cursor-pointer hover:bg-gray-700 dark:hover:bg-gray-800 transition-all duration-200 shadow-md hover:shadow-lg"
              data-testid="button-create-story"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              {/* User Avatar at Top */}
              <div className="flex justify-center">
                <div className="relative">
                  <img 
                    src={user?.profileImage || "/default-avatar.jpg"} 
                    alt="Create story" 
                    className="w-12 h-12 rounded-full border-3 border-white shadow-sm bg-gray-200"
                  />
                </div>
              </div>
              
              {/* Plus Button in Center */}
              <div className="flex justify-center">
                <div className="w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center shadow-lg transition-colors">
                  <Plus className="h-5 w-5 text-white" />
                </div>
              </div>
              
              {/* Create Story Text at Bottom */}
              <div className="text-center">
                <p className="text-xs text-white font-medium">Tạo tin</p>
              </div>
            </div>
          </div>

        {/* Existing Stories from API */}
        {stories.map((story) => (
          <div key={story.id} className="flex-shrink-0 w-24 lg:w-28">
            <div 
              className="relative rounded-lg h-36 lg:h-40 overflow-hidden cursor-pointer hover:scale-105 transition-transform"
              data-testid={`story-${story.id}`}
              onClick={() => setLocation(`/story/${story.id}`)}
            >
              <img 
                src={story.image} 
                alt={`${story.user.firstName}'s story`} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute top-3 left-3">
                <img 
                  src={story.user.profileImage || "/api/placeholder/32"} 
                  alt={story.user.firstName} 
                  className="w-8 h-8 rounded-full border-2 border-primary bg-gray-200"
                />
              </div>
              <p className="absolute bottom-3 left-3 text-white text-xs font-medium">
                <UserNameWithBadge 
                  firstName={story.user.firstName}
                  lastName=""
                  badgeImageUrl={story.user.badgeImageUrl}
                  showFullName={false}
                />
              </p>
            </div>
          </div>
        ))}

        {/* No stories message */}
        {stories.length === 0 && (
          <div className="flex items-center justify-center w-full h-40 text-muted-foreground text-sm">
            Không có tin nào để hiển thị
          </div>
        )}
      </div>
    </div>

    {/* Create Story Dialog */}
    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Tạo tin</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* File upload area */}
          {!selectedFile ? (
            <div 
              className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:bg-secondary transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <Plus className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">Thêm ảnh hoặc video</p>
              <p className="text-xs text-muted-foreground mt-1">Kích thước tối đa: 50MB</p>
            </div>
          ) : (
            <div className="relative">
              {selectedFile.type.startsWith('image/') ? (
                <img 
                  src={previewUrl!} 
                  alt="Story preview" 
                  className="w-full h-60 object-cover rounded-lg"
                />
              ) : (
                <video 
                  src={previewUrl!} 
                  className="w-full h-60 object-cover rounded-lg" 
                  controls
                />
              )}
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70"
                onClick={() => {
                  setSelectedFile(null);
                  setPreviewUrl(null);
                }}
              >
                <X className="h-4 w-4 text-white" />
              </Button>
            </div>
          )}

          {/* Story content */}
          <Textarea
            placeholder="Write something about your story..."
            value={storyContent}
            onChange={(e) => setStoryContent(e.target.value)}
            className="min-h-[100px]"
          />

          {/* Upload Progress */}
          {isUploading && (
            <div className="my-4">
              <UploadProgress
                progress={uploadProgress}
                status={uploadStatus}
                fileName={selectedFile?.name}
                message={uploadMessage}
              />
            </div>
          )}

          {/* Action buttons */}
          <div className="flex space-x-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setIsCreateDialogOpen(false)}
              disabled={isUploading || createStoryMutation.isPending}
            >
              Hủy
            </Button>
            <Button
              className="flex-1 bg-primary hover:bg-primary"
              onClick={handleSubmit}
              disabled={isUploading || createStoryMutation.isPending}
            >
              {isUploading || createStoryMutation.isPending ? "Đang tạo..." : "Chia sẻ Story"}
            </Button>
          </div>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
      </DialogContent>
    </Dialog>
  </>
  );
}
