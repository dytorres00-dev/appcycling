import { useState } from 'react'

type ToastProps = {
  message: string
  duration?: number
}

export const Toast = ({ message }: ToastProps) => {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[200] bg-bg-secondary border border-green-neon text-text-primary px-6 py-3 font-mono text-xs uppercase tracking-widest shadow-lg">
      {message}
    </div>
  )
}

export const useToast = () => {
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (message: string) => {
    setToast(message)
    setTimeout(() => setToast(null), 3000)
  }

  return { toast, showToast }
}
