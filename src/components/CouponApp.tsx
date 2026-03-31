import { useState, useCallback } from 'react'
import type { Coupon } from '../types'
import { COUPONS } from '../constants/coupons'
import { useCouponStates } from '../hooks/useCouponStates'
import { useToast } from '../hooks/useToast'
import { Modal } from './Modal'
import { CouponList } from './CouponList'
import { DetailModal } from './DetailModal'
import { CouponDetail } from './CouponDetail'
import { MyCouponsModal } from './MyCouponsModal'
import { MyCouponCard } from './MyCouponCard'
import { Toast } from './Toast'
import './CouponApp.css'

export function CouponApp() {
  const [visible, setVisible] = useState(false)
  const [detailVisible, setDetailVisible] = useState(false)
  const [myCouponsVisible, setMyCouponsVisible] = useState(false)
  const [myCouponsTab, setMyCouponsTab] = useState<'available' | 'used'>('available')
  const [detailCoupon, setDetailCoupon] = useState<Coupon | null>(null)
  const [animatingId, setAnimatingId] = useState<string | null>(null)

  const { couponStates, claimedCount, usedCount, claimCoupon, useCoupon } = useCouponStates()
  const { toast, showToast } = useToast()

  const handleClaimCoupon = useCallback((couponId: string) => {
    if (couponStates[couponId]?.claimed) {
      showToast('您已领取过该优惠券', 'error')
      return
    }

    setAnimatingId(couponId)
    setTimeout(() => {
      claimCoupon(couponId)
      setAnimatingId(null)
      showToast('领取成功！')
    }, 600)
  }, [couponStates, claimCoupon, showToast])

  const handleUseCoupon = useCallback((couponId: string) => {
    const state = couponStates[couponId]
    if (!state?.claimed) {
      showToast('请先领取优惠券', 'error')
      return
    }
    if (state.used) {
      showToast('该优惠券已使用', 'error')
      return
    }
    useCoupon(couponId)
    showToast('优惠券已使用')
  }, [couponStates, useCoupon, showToast])

  const handleViewDetail = useCallback((coupon: Coupon) => {
    setDetailCoupon(coupon)
    setTimeout(() => setDetailVisible(true), 10)
  }, [])

  const handleCloseDetail = useCallback(() => {
    setDetailVisible(false)
    setTimeout(() => setDetailCoupon(null), 300)
  }, [])

  const handleOpenMyCoupons = useCallback(() => {
    setMyCouponsTab('available')
    setMyCouponsVisible(true)
  }, [])

  const handleCloseMyCoupons = useCallback(() => {
    setMyCouponsVisible(false)
    setTimeout(() => setMyCouponsVisible(false), 300)
  }, [])

  const availableCoupons = COUPONS.filter(c => couponStates[c.id]?.claimed && !couponStates[c.id]?.used)
  const usedCoupons = COUPONS.filter(c => couponStates[c.id]?.used)

  return (
    <div className="page">
      <header className="hero">
        <div className="hero__badge">福利上新</div>
        <h1>专属优惠券 · 限时领取</h1>
        <p>精选好物立减，叠加会员折扣更实惠</p>
        <div className="hero__actions">
          <button className="primary-btn" onClick={() => setVisible(true)}>
            立即领取
          </button>
          <button className="ghost-btn" onClick={handleOpenMyCoupons}>
            {claimedCount > 0 ? `我的优惠券(${claimedCount})` : '查看详情'}
          </button>
        </div>
      </header>

      <section className="content">
        <div className="card-panel">
          <div className="card-panel__title">今日专享优惠</div>
          <ul className="highlight-list">
            <li>满减直降，最高立减 60 元</li>
            <li>叠加会员 95 折，下单更省</li>
            <li>全场可用，部分爆款除外</li>
          </ul>
          <button className="primary-btn" onClick={() => setVisible(true)}>
            去领券
          </button>
          {claimedCount > 0 && (
            <div className="coupon-status">
              已领取 {claimedCount} 张，已使用 {usedCount} 张
            </div>
          )}
        </div>
      </section>

      <Modal visible={visible} onClose={() => setVisible(false)}>
        <button className="modal__close" onClick={() => setVisible(false)}>×</button>
        <div className="modal__title">优惠券中心</div>
        <div className="modal__subtitle">限时发放，先到先得</div>
        <CouponList
          coupons={COUPONS}
          couponStates={couponStates}
          animatingId={animatingId}
          onClaim={handleClaimCoupon}
          onUse={handleUseCoupon}
          onViewDetail={handleViewDetail}
        />
        <div className="tips">
          使用提示：
          <span>领取后请在有效期内使用；</span>
          <span>部分特殊商品不支持；</span>
          <span>与其他活动叠加时以结算页为准。</span>
        </div>
      </Modal>

      <DetailModal visible={detailVisible} onClose={handleCloseDetail}>
        {detailCoupon && (
          <CouponDetail
            coupon={detailCoupon}
            state={couponStates[detailCoupon.id]}
            onClaim={handleClaimCoupon}
            onUse={handleUseCoupon}
            onClose={handleCloseDetail}
          />
        )}
      </DetailModal>

      <MyCouponsModal visible={myCouponsVisible} onClose={handleCloseMyCoupons}>
        <button className="my-coupons-modal__close" onClick={handleCloseMyCoupons}>×</button>
        <div className="my-coupons-modal__title">我的优惠券</div>
        <div className="my-coupons-modal__tabs">
          <button 
            className={`my-coupons-modal__tab ${myCouponsTab === 'available' ? 'active' : ''}`}
            onClick={() => setMyCouponsTab('available')}
          >
            可用 ({claimedCount - usedCount})
          </button>
          <button 
            className={`my-coupons-modal__tab ${myCouponsTab === 'used' ? 'active' : ''}`}
            onClick={() => setMyCouponsTab('used')}
          >
            已使用 ({usedCount})
          </button>
        </div>

        <div className="my-coupons-modal__list">
          {myCouponsTab === 'available' ? (
            availableCoupons.length === 0 ? (
              <div className="my-coupons-modal__empty">
                <div className="empty-icon">🎫</div>
                <p>暂无可用优惠券</p>
                <button className="primary-btn" onClick={() => {
                  handleCloseMyCoupons()
                  setVisible(true)
                }}>
                  去领取
                </button>
              </div>
            ) : (
              availableCoupons.map(coupon => (
                <MyCouponCard
                  key={coupon.id}
                  coupon={coupon}
                  state={couponStates[coupon.id]}
                  onUse={handleUseCoupon}
                  onClick={handleViewDetail}
                />
              ))
            )
          ) : (
            usedCoupons.length === 0 ? (
              <div className="my-coupons-modal__empty">
                <div className="empty-icon">📋</div>
                <p>暂无已使用优惠券</p>
              </div>
            ) : (
              usedCoupons.map(coupon => (
                <MyCouponCard
                  key={coupon.id}
                  coupon={coupon}
                  state={couponStates[coupon.id]}
                />
              ))
            )
          )}
        </div>

        {claimedCount > 0 && (
          <div className="my-coupons-modal__footer">
            <div className="my-coupons-modal__summary">
              已领取 {claimedCount} 张 · 已使用 {usedCount} 张
            </div>
            <button className="ghost-btn" onClick={() => {
              handleCloseMyCoupons()
              setVisible(true)
            }}>
              领取更多
            </button>
          </div>
        )}
      </MyCouponsModal>

      <Toast toast={toast} />
    </div>
  )
}
