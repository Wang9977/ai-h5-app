import type { Coupon, CouponState } from '../types'
import './DetailModal.css'

interface CouponDetailProps {
  coupon: Coupon
  state?: CouponState
  onClaim: (id: string) => void
  onUse: (id: string) => void
  onClose: () => void
}

export function CouponDetail({ coupon, state, onClaim, onUse, onClose }: CouponDetailProps) {
  const handleBtnClick = () => {
    if (state?.used) return
    if (state?.claimed) {
      onUse(coupon.id)
      onClose()
    } else {
      onClaim(coupon.id)
      onClose()
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
    return 'coupon-card__btn'
  }

  return (
    <>
      <button className="detail-modal__close" onClick={onClose}>×</button>
      
      <div className="detail-modal__header">
        <div className="detail-modal__amount">
          <div className="price-line">
            <span className="currency">¥</span>
            <span className="number">{coupon.amount}</span>
          </div>
          <span className="condition">满{coupon.threshold}可用</span>
        </div>
        <div className="detail-modal__title">
          <h3>{coupon.title}</h3>
          {coupon.tag && <span className="tag">{coupon.tag}</span>}
        </div>
      </div>

      <div className="detail-modal__section">
        <h4>使用说明</h4>
        <p className="detail-modal__desc">{coupon.desc}</p>
      </div>

      <div className="detail-modal__section">
        <h4>使用规则</h4>
        <ul className="detail-modal__rules">
          {coupon.rules?.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
      </div>

      <div className="detail-modal__section">
        <h4>可用范围</h4>
        <div className="detail-modal__scope">
          {coupon.scope?.map((item, index) => (
            <span key={index} className="scope-tag">{item}</span>
          ))}
        </div>
      </div>

      <div className="detail-modal__footer">
        <div className="detail-modal__expiry">{coupon.expiry}</div>
        <button className={getButtonClass()} onClick={handleBtnClick}>
          {getButtonText()}
        </button>
      </div>
    </>
  )
}
