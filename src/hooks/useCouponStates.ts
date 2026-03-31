import { useState, useCallback } from 'react'
import type { CouponState } from '../types'

interface UseCouponStatesReturn {
  couponStates: Record<string, CouponState>
  claimedCount: number
  usedCount: number
  claimCoupon: (couponId: string) => void
  useCoupon: (couponId: string) => void
}

export function useCouponStates(): UseCouponStatesReturn {
  const [couponStates, setCouponStates] = useState<Record<string, CouponState>>({})

  const claimCoupon = useCallback((couponId: string) => {
    setCouponStates((prev) => ({
      ...prev,
      [couponId]: {
        claimed: true,
        claimedAt: new Date(),
        used: false,
      },
    }))
  }, [])

  const useCoupon = useCallback((couponId: string) => {
    setCouponStates((prev) => ({
      ...prev,
      [couponId]: {
        ...prev[couponId],
        used: true,
        usedAt: new Date(),
      },
    }))
  }, [])

  const claimedCount = Object.values(couponStates).filter((s) => s.claimed).length
  const usedCount = Object.values(couponStates).filter((s) => s.used).length

  return {
    couponStates,
    claimedCount,
    usedCount,
    claimCoupon,
    useCoupon,
  }
}
