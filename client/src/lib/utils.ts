import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatFileSize(size: number) {
    const bytes = 1024
    const KB = bytes * 1024
    if (size < bytes) return `${size} B`
    if (size < KB) return `${(size / 1024).toFixed(1)} KB`
    return `${(size / KB).toFixed(1)} MB`
}
