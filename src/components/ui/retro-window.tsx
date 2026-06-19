import type { ReactNode } from 'react'
import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface RetroWindowProps {
  title: string
  icon?: string | ReactNode
  count?: number
  actions?: ReactNode
  children?: ReactNode
  className?: string
}

export function RetroWindow({
  title,
  icon = '📁',
  count,
  actions,
  children,
  className,
}: RetroWindowProps) {
  const renderIcon = () => {
    if (typeof icon === 'string') {
      // If it's a string, check if it's an image path or emoji
      if (
        icon.includes('.png') ||
        icon.includes('.svg') ||
        icon.includes('.jpg')
      ) {
        return (
          <img
            src={icon}
            alt={title}
            className="mt-1 h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7"
          />
        )
      }
      return <span className="text-xl sm:text-2xl">{icon}</span>
    }
    // If it's a ReactNode (like an img tag), render it directly
    return icon
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn('space-y-6', className)}
    >
      {/* Retro Window Header */}
      <div className="border-retro-orange/30 relative rounded-lg border-2 bg-gradient-to-b from-zinc-900 to-zinc-950 p-3 shadow-lg sm:p-4">
        {/* Title Bar */}
        <div className="border-retro-orange/20 mb-2 flex items-start justify-between gap-2 border-b-2 pb-2 sm:mb-3 sm:gap-3 sm:pb-3">
          <div className="flex min-w-0 flex-1 items-start gap-2 sm:gap-3">
            <div className="flex-shrink-0">{renderIcon()}</div>
            <div className="min-w-0 flex-1">
              <h1 className="truncate font-mono text-base font-bold tracking-wide text-white sm:text-lg md:text-xl">
                {title}
              </h1>
              {count !== undefined && (
                <motion.p
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-retro-cyan mt-0.5 font-mono text-xs sm:text-sm"
                >
                  {count} total
                </motion.p>
              )}
            </div>
          </div>
          {/* Window Controls */}
          <div className="flex flex-shrink-0 items-center gap-1.5 sm:gap-2">
            {actions}
            <div className="flex gap-1 sm:gap-1.5">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="h-2.5 w-2.5 rounded-full border border-zinc-600 bg-zinc-700 sm:h-3 sm:w-3"
              />
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="h-2.5 w-2.5 rounded-full border border-zinc-600 bg-zinc-700 sm:h-3 sm:w-3"
              />
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="h-2.5 w-2.5 rounded-full border border-red-500/50 bg-red-600/30 sm:h-3 sm:w-3"
              />
            </div>
          </div>
        </div>
        {/* Subtitle Area */}
        {children}
      </div>
    </motion.div>
  )
}

interface RetroButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'danger'
  icon?: ReactNode
  className?: string
  disabled?: boolean
}

export function RetroButton({
  children,
  onClick,
  variant = 'primary',
  icon,
  className,
  disabled,
}: RetroButtonProps) {
  const variants = {
    primary:
      'bg-retro-orange/20 border-retro-orange/40 text-retro-orange hover:bg-retro-orange/30',
    secondary:
      'bg-retro-cyan/20 border-retro-cyan/40 text-retro-cyan hover:bg-retro-cyan/30',
    danger: 'bg-red-500/20 border-red-500/40 text-red-400 hover:bg-red-500/30',
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex items-center gap-1.5 rounded border-2 px-3 py-1.5 font-mono text-xs font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm',
        variants[variant],
        className
      )}
    >
      {icon}
      <span className="truncate">{children}</span>
    </motion.button>
  )
}

interface RetroLoadingProps {
  text?: string
  showProgress?: boolean
  isComplete?: boolean
}

export function RetroLoading({
  text = 'Loading TrackHire.exe',
  showProgress = true,
  isComplete = false,
}: RetroLoadingProps) {
  const [currentProgress, setCurrentProgress] = React.useState(0)

  React.useEffect(() => {
    // Reset to 0 when component mounts
    setCurrentProgress(0)

    // Animate from 0% to 90%
    // Quick ramp up to 70%
    const interval1 = setInterval(() => {
      setCurrentProgress((prev) => {
        if (prev >= 70) {
          clearInterval(interval1)
          return 70
        }
        return prev + 10
      })
    }, 80)

    // Slower progression to 90%
    const timeout = setTimeout(() => {
      const interval2 = setInterval(() => {
        setCurrentProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval2)
            return 90
          }
          return prev + 5
        })
      }, 150)

      return () => clearInterval(interval2)
    }, 700)

    return () => {
      clearInterval(interval1)
      clearTimeout(timeout)
    }
  }, [])

  // Jump to 100% when operation completes
  React.useEffect(() => {
    if (isComplete) {
      setCurrentProgress(100)
    }
  }, [isComplete])

  const bars = Math.floor((currentProgress / 100) * 20)
  const filled = '█'.repeat(bars)
  const empty = '░'.repeat(20 - bars)

  return (
    <div className="flex h-48 items-center justify-center px-4 sm:h-64">
      <div className="w-full max-w-md space-y-3 text-center font-mono sm:space-y-4">
        <div className="border-retro-orange mx-auto h-10 w-10 animate-spin rounded-lg border-4 border-t-transparent sm:h-12 sm:w-12" />
        <p className="text-retro-cyan text-xs sm:text-sm">{text}...</p>
        {showProgress && (
          <div className="overflow-x-auto text-[10px] text-zinc-500 sm:text-xs">
            <span className="whitespace-nowrap">
              [{filled}
              {empty}] {currentProgress}%
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

interface RetroEmptyStateProps {
  icon?: string
  title: string
  description: string
  action?: ReactNode
}

export function RetroEmptyState({
  icon = '📂',
  title,
  description,
  action,
}: RetroEmptyStateProps) {
  return (
    <div className="space-y-3 rounded-xl border-2 border-dashed border-zinc-800 bg-zinc-900/50 p-8 text-center sm:space-y-4 sm:p-12">
      <div className="mx-auto flex h-12 w-12 items-center justify-center text-3xl sm:h-16 sm:w-16 sm:text-4xl">
        {icon}
      </div>
      <h3 className="font-mono text-base font-bold text-white sm:text-lg">
        {title}
      </h3>
      <p className="mx-auto max-w-sm font-mono text-xs text-zinc-500 sm:text-sm">
        {description}
      </p>
      {action && <div className="mt-3 sm:mt-4">{action}</div>}
    </div>
  )
}
