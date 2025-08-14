import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { User, SignUpUser, SignInUser } from "@shared/schema";

interface AuthResponse {
  user: User;
  message: string;
}

export function useAuth() {
  const queryClient = useQueryClient();

  // Get current user with proper error handling
  const { data: user, isLoading, error, isError } = useQuery({
    queryKey: ["/api/users/me"],
    queryFn: async (): Promise<User | null> => {
      const response = await fetch("/api/users/me", {
        credentials: 'include'
      });
      
      if (response.status === 401) {
        return null; // Not authenticated, return null instead of throwing
      }
      
      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }
      
      return response.json();
    },
    retry: 1,
    retryDelay: 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  // Sign up mutation
  const signUp = useMutation({
    mutationFn: async (userData: SignUpUser): Promise<AuthResponse> => {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to sign up");
      }
      
      return response.json();
    },
    onSuccess: async (data) => {
      // Set user data immediately in cache
      queryClient.setQueryData(["/api/users/me"], data.user);
      // Force refetch to ensure fresh data
      await queryClient.refetchQueries({ queryKey: ["/api/users/me"] });
    },
  });

  // Sign in mutation
  const signIn = useMutation({
    mutationFn: async (credentials: SignInUser): Promise<AuthResponse> => {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to sign in");
      }
      
      return response.json();
    },
    onSuccess: async (data) => {
      // Set user data immediately in cache
      queryClient.setQueryData(["/api/users/me"], data.user);
      // Force refetch to ensure fresh data
      await queryClient.refetchQueries({ queryKey: ["/api/users/me"] });
    },
  });

  // Sign out mutation
  const signOut = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/auth/signout", {
        method: "POST",
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error("Failed to sign out");
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/users/me"], null);
    },
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user && !isError,
    isError: isError && error?.message !== "Failed to fetch user",
    signUp,
    signIn,
    signOut,
  };
}