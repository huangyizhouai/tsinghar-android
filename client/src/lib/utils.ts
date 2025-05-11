import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimeRemaining(date: Date): string {
  const now = new Date();
  const days = differenceInDays(now, date);
  const hours = differenceInHours(now, date) % 24;
  const minutes = differenceInMinutes(now, date) % 60;
  const seconds = differenceInSeconds(now, date) % 60;
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export function calculateRecoveryPercentage(days: number): number {
  // Based on a 90-day recovery goal
  return Math.min(Math.round((days / 90) * 100), 100);
}

export function getDaysLeft(currentDays: number, targetDays: number): number {
  return Math.max(0, targetDays - currentDays);
}

export function formatDistanceToNow(date: Date): string {
  const now = new Date();
  const diffInMinutes = differenceInMinutes(now, date);
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  }
  
  const diffInHours = differenceInHours(now, date);
  if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  }
  
  const diffInDays = differenceInDays(now, date);
  return `${diffInDays} days ago`;
}
