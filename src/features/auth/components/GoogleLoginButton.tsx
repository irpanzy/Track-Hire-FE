import { useEffect, useRef, useState } from 'react'
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google'

interface GoogleLoginButtonProps {
  onSuccess: (credentialResponse: CredentialResponse) => void
  onError: () => void
}

export default function GoogleLoginButton({
  onSuccess,
  onError,
}: GoogleLoginButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(400)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new ResizeObserver(([entry]) => {
      setWidth(Math.floor(entry.contentRect.width))
    })
    observer.observe(el)
    setWidth(Math.floor(el.getBoundingClientRect().width))

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="w-full">
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
        theme="filled_black"
        width={width}
      />
    </div>
  )
}
