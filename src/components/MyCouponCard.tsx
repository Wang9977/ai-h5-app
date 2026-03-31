import type { Coupon, CouponState } from '../types'

interface MyCouponCardProps {
  coupon: Coupon
  state?: CouponState
  onUse?: (id: string) => void
  onClick?: (coupon: Coupon) => void
}

export function MyCouponCard({ coupon, state, onUse, onClick }: MyCouponCardProps) {
  const handleUse = (e: React.MouseEvent) => {
    e.stopPropagation()
    onUse?.(coupon.id)
  }

  return (
    <div 
      className={`my-coupon-card ${state?.used ? 'my-coupon-card--used' : 'my-coupon-card--available'}`}
      onClick={() => onClick?.(coupon)}
    >
      <div className="my-coupon-card__left">
        <span className="my-coupon-card__symbol">¥</span>
        <span className="my-coupon-card__amount">{coupon.amount}</span>
      </div>
      <div className="my-coupon-card__right">
        <div className="my-coupon-card__name">{coupon.title}</div>
        <div className="my-coupon-card__condition">满{coupon.threshold}可用</div>
        <div className="my-coupon-card__expiry">
          {state?.used 
            ? `已使用于 ${state.usedAt?.toLocaleDateString() || '未知时间'}`
            : coupon.expiry
          }
        </div>
      </div>
      {!state?.used && onUse && (
        <button className="my-coupon-card__use" onClick={handleUse}>
          立即使用
        </button>
      )}
    </div>
  )
}
