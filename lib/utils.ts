import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date, options?: { includeYear?: boolean }) {
  return new Date(date).toLocaleDateString('en-US', {
    ...(options?.includeYear ? { year: 'numeric' } : {}),
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
