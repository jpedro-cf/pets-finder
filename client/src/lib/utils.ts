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

export function formatPhoneNumber(value: string) {
    const clean = value.replace(/\D/g, '')
    let number = value

    if (clean.length <= 2) {
        return '+55 '
    }
    if (clean.length < 11) {
        return number
    }

    const DDI = `+${clean.slice(0, 2)}` // +55
    const DDD = `(${clean.slice(2, 4)})` // (00)
    const NUMBER = `${clean.slice(4, 9)}-${clean.slice(9, 13)}` // 00000-0000

    if (clean.length >= 9) {
        number = `${DDI} ${DDD} ${NUMBER}`
    }

    return number
}
