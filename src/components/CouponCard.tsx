import type { Coupon, CouponState } from '../types'
import './CouponCard.css'

interface CouponCardProps {
  coupon: Coupon
  state?: CouponState
  animating: boolean
  onClaim: (id: string) => void
  onUse: (id: string) => void
  onViewDetail: (coupon: Coupon) => void
}

export function CouponCard({ coupon, state, animating, onClaim, onUse, onViewDetail }: CouponCardProps) {
  const handleBtnClick = () => {
    if (state?.used) return
    if (state?.claimed) {
      onUse(coupon.id)
    } else {
      onClaim(coupon.id)
    }
  }

  const getButtonText = () => {
    if (state?.used) return '已使用'
    if (state?.claimed) return '立即使用'
    return '立即领取'
  }

  const getButtonClass = () => {
    if (state?.used) return 'coupon-card__btn used'
    if (state?.claimed) return 'coupon-card__btn claimed'
    return `coupon-card__btn ${animating ? 'animating' : ''}`
  }

  return (
    <div className={`coupon-card ${state?.used ? 'coupon-card--used' : ''} ${state?.claimed && !state?.used ? 'coupon-card--claimed' : ''} ${animating ? 'coupon-card--animating' : ''}`}>
      <div className="coupon-card__amount">
        <span className="currency">¥</span>
        <span className="number">{coupon.amount}</span>
        <span className="condition">满{coupon.threshold}可用</span>
      </div>
      <div className="coupon-card__info">
        <div className="title">
          {coupon.title}
          {coupon.tag && <span className="tag">{coupon.tag}</span>}
          {state?.claimed && !state?.used && <span className="claimed-tag">已领取</span>}
          {state?.used && <span className="used-tag">已使用</span>}
        </div>
        <div className="desc">{coupon.desc}</div>
        <div className="expiry">{coupon.expiry}</div>
      </div>
      <button className={getButtonClass()} onClick={handleBtnClick}>
        {getButtonText()}
      </button>
      <button className="coupon-card__detail" onClick={() => onViewDetail(coupon)} title="查看详情">
        ?
      </button>
    </div>
  )
}
