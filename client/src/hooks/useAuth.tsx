import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";

export interface User {
  id: number;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  age?: number;
  gender?: string;
  location?: string;
  recoveryGoal?: string;
  joinDate?: string;
  streakRecord?: number;
}

export function useAuth() {
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();

  const { data: user, isLoading, error } = useQuery({
    queryKey: ["/api/auth/user"],
    queryFn: async () => {
      // Check for local test user first
      const testUser = localStorage.getItem('testUser');
      if (testUser) {
        return JSON.parse(testUser);
      }
      
      try {
        const response = await apiRequest("GET", "/api/auth/user");
        if (!response.ok) {
          return null;
        }
        return await response.json();
      } catch (error: any) {
        return null;
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      try {
        // Clear local test user if exists
        localStorage.removeItem('testUser');
        
        // Try to call logout endpoint
        const response = await apiRequest("POST", "/api/auth/logout");
        if (response.ok) {
          return await response.json();
        } else {
          // If server logout fails, still proceed with local cleanup
          console.warn("Server logout failed, proceeding with local cleanup");
          return { success: true };
        }
      } catch (error) {
        // If network request fails, still proceed with local cleanup
        console.warn("Network error during logout, proceeding with local cleanup:", error);
        return { success: true };
      }
    },
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();
      
      // Clear any other local storage items
      localStorage.removeItem('testUser');
      
      // Force navigation to login page
      setTimeout(() => {
        window.location.href = "/login";
      }, 100);
    },
    onError: () => {
      // Even if logout fails, clear local data and redirect
      queryClient.clear();
      localStorage.removeItem('testUser');
      setTimeout(() => {
        window.location.href = "/login";
      }, 100);
    },
  });

  return {
    user: user as User | null,
    isLoading,
    isAuthenticated: !!user,
    logout: () => logoutMutation.mutate(),
    isLoggingOut: logoutMutation.isPending,
  };
}