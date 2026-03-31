import type { Coupon, CouponState } from '../types'
import { CouponCard } from './CouponCard'
import './CouponCard.css'

interface CouponListProps {
  coupons: Coupon[]
  couponStates: Record<string, CouponState>
  animatingId: string | null
  onClaim: (id: string) => void
  onUse: (id: string) => void
  onViewDetail: (coupon: Coupon) => void
}

export function CouponList({ coupons, couponStates, animatingId, onClaim, onUse, onViewDetail }: CouponListProps) {
  return (
    <div className="coupon-list">
      {coupons.map((coupon) => (
        <CouponCard
          key={coupon.id}
          coupon={coupon}
          state={couponStates[coupon.id]}
          animating={animatingId === coupon.id}
          onClaim={onClaim}
          onUse={onUse}
          onViewDetail={onViewDetail}
        />
      ))}
    </div>
  )
}
