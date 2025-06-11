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
      // Clear local test user if exists
      localStorage.removeItem('testUser');
      
      const response = await apiRequest("POST", "/api/auth/logout");
      return await response.json();
    },
    onSuccess: () => {
      queryClient.clear();
      setLocation("/login");
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