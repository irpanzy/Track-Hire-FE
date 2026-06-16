import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RedirectAlertProps {
  to: string
  variant: 'error' | 'info'
  title: string
  description: string
  /** Delay in ms before redirect fires. Default: 2000 */
  delay?: number
  /** Pass location state for redirect (e.g. { from: location }) */
  state?: unknown
}

export default function RedirectAlert({
  to,
  variant,
  title,
  description,
  delay = 2000,
  state,
}: RedirectAlertProps) {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    const step = 50 // update every 50ms
    const decrement = (step / delay) * 100

    const interval = setInterval(() => {
      setProgress((p) => Math.max(0, p - decrement))
    }, step)

    const timer = setTimeout(() => {
      navigate(to, { replace: true, state })
    }, delay)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [navigate, to, delay, state])

  const isError = variant === 'error'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80 p-4 backdrop-blur-sm">
      <div
        className={cn(
          'w-full max-w-sm rounded-2xl border bg-zinc-900 p-6 shadow-2xl',
          isError ? 'border-red-500/30' : 'border-indigo-500/30'
        )}
      >
        {/* Icon */}
        <div className="mb-4 flex justify-center">
          <div
            className={cn(
              'flex h-14 w-14 items-center justify-center rounded-full',
              isError ? 'bg-red-500/15' : 'bg-indigo-500/15'
            )}
          >
            {isError ? (
              <AlertTriangle
                className={cn(
                  'h-7 w-7',
                  isError ? 'text-red-400' : 'text-indigo-400'
                )}
              />
            ) : (
              <Info className="h-7 w-7 text-indigo-400" />
            )}
          </div>
        </div>

        {/* Text */}
        <div className="mb-5 text-center">
          <h3
            className={cn(
              'mb-1 text-base font-semibold',
              isError ? 'text-red-300' : 'text-white'
            )}
          >
            {title}
          </h3>
          <p className="text-sm text-zinc-400">{description}</p>
        </div>

        {/* Progress bar */}
        <div className="h-1 w-full overflow-hidden rounded-full bg-zinc-800">
          <div
            className={cn(
              'h-full rounded-full transition-all ease-linear',
              isError ? 'bg-red-500' : 'bg-indigo-500'
            )}
            style={{
              width: `${progress}%`,
              transitionDuration: '50ms',
            }}
          />
        </div>
        <p className="mt-2 text-center text-xs text-zinc-600">Redirecting…</p>
      </div>
    </div>
  )
}
