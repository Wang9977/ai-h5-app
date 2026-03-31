import type { Toast as ToastType } from '../types'
import './Toast.css'

interface ToastProps {
  toast: ToastType | null
}

export function Toast({ toast }: ToastProps) {
  if (!toast) return null

  return (
    <div className={`toast toast--${toast.type}`}>
      {toast.message}
    </div>
  )
}
