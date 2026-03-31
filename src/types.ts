export interface Coupon {
  id: string
  title: string
  desc: string
  amount: number
  threshold: number
  expiry: string
  tag?: string
  rules?: string[]
  scope?: string[]
}

export interface CouponState {
  claimed: boolean
  claimedAt?: Date
  used: boolean
  usedAt?: Date
}

export interface Toast {
  message: string
  type: 'success' | 'error'
}
