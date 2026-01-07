'use client'

import { useState, useEffect } from 'react'
import { X, Phone } from 'lucide-react'
import { Button } from './Button'
import { siteConfig } from '@/lib/config'
import { formatPhoneForTel } from '@/lib/utils'

interface ToastProps {
  message: string
  type?: 'info' | 'success' | 'warning' | 'error'
  duration?: number
  showCallButton?: boolean
  onClose?: () => void
}

export function Toast({ 
  message, 
  type = 'info', 
  duration = 0, 
  showCallButton = false,
  onClose 
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        onClose?.()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  if (!isVisible) return null

  const baseClasses = "fixed top-4 right-4 max-w-md w-full bg-white border shadow-lg rounded-lg p-4 z-50 animate-slide-in-right"
  
  const typeClasses = {
    info: "border-blue-200 bg-blue-50",
    success: "border-green-200 bg-green-50", 
    warning: "border-yellow-200 bg-yellow-50",
    error: "border-red-200 bg-red-50"
  }

  const iconColors = {
    info: "text-blue-600",
    success: "text-green-600",
    warning: "text-yellow-600", 
    error: "text-red-600"
  }

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <p className="text-sm text-neutral-700">{message}</p>
          {showCallButton && (
            <div className="mt-3">
              <Button
                href={`tel:${formatPhoneForTel(siteConfig.phone)}`}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                <Phone className="h-3 w-3" />
                Call {siteConfig.phone}
              </Button>
            </div>
          )}
        </div>
        <button
          onClick={handleClose}
          className={`${iconColors[type]} hover:opacity-70 transition-opacity`}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

interface NotificationBannerProps {
  message: string
  type?: 'info' | 'success' | 'warning' | 'error'
  showCallButton?: boolean
  onClose?: () => void
}

export function NotificationBanner({ 
  message, 
  type = 'info', 
  showCallButton = false,
  onClose 
}: NotificationBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const baseClasses = "bg-white border-l-4 p-4 mb-6 shadow-sm rounded-r-lg"
  
  const typeClasses = {
    info: "border-blue-500 bg-blue-50",
    success: "border-green-500 bg-green-50",
    warning: "border-yellow-500 bg-yellow-50", 
    error: "border-red-500 bg-red-50"
  }

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-neutral-700">{message}</p>
          {showCallButton && (
            <div className="mt-2">
              <Button
                href={`tel:${formatPhoneForTel(siteConfig.phone)}`}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                <Phone className="h-3 w-3" />
                Prefer to call? {siteConfig.phone}
              </Button>
            </div>
          )}
        </div>
        <button
          onClick={handleClose}
          className="text-neutral-400 hover:text-neutral-600 transition-colors ml-4"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}