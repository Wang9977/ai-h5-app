import { useState, useEffect, useCallback } from 'react'
import './App.css'

type Coupon = {
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

type CouponState = {
  claimed: boolean
  claimedAt?: Date
  used: boolean
  usedAt?: Date
}

const COUPONS: Coupon[] = [
  {
    id: 'c1',
    title: '新人专享券',
    desc: '全场通用，可与会员折扣叠加',
    amount: 30,
    threshold: 199,
    expiry: '有效期：领取后 7 天内有效',
    tag: 'HOT',
    rules: ['限新用户首次领取', '可与会员折扣叠加使用', '单笔订单限用一张', '不与其他满减活动同用'],
    scope: ['服装鞋包', '美妆护肤', '家居日用', '数码配件'],
  },
  {
    id: 'c2',
    title: '限时满减券',
    desc: '服饰/居家/数码专享',
    amount: 60,
    threshold: 399,
    expiry: '有效期：2 月 15 日 23:59 截止',
    rules: ['限指定品类使用', '不可与其他优惠券叠加', '单笔订单限用一张', '退款将回收优惠券'],
    scope: ['服饰', '居家用品', '数码产品'],
  },
  {
    id: 'c3',
    title: '周末加码券',
    desc: '周五至周日可用，部分商品除外',
    amount: 15,
    threshold: 99,
    expiry: '有效期：本周末内使用',
    tag: 'NEW',
    rules: ['仅限周五至周日使用', '部分商品不参与', '可与限时活动叠加', '最终解释权归商家所有'],
    scope: ['部分指定商品'],
  },
]

function App() {
  const [visible, setVisible] = useState(false)
  const [couponStates, setCouponStates] = useState<Record<string, CouponState>>({})
  const [animatingId, setAnimatingId] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [detailCoupon, setDetailCoupon] = useState<Coupon | null>(null)
  const [detailVisible, setDetailVisible] = useState(false)
  const [myCouponsVisible, setMyCouponsVisible] = useState(false)
  const [myCouponsModalVisible, setMyCouponsModalVisible] = useState(false)
  const [myCouponsTab, setMyCouponsTab] = useState<'available' | 'used'>('available')

  useEffect(() => {
    if (visible) {
      requestAnimationFrame(() => {
        setModalVisible(true)
      })
    } else {
      setModalVisible(false)
    }
  }, [visible])

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 2000)
  }, [])

  const handleClaimCoupon = useCallback((couponId: string) => {
    const currentState = couponStates[couponId]
    
    if (currentState?.claimed) {
      showToast('您已领取过该优惠券', 'error')
      return
    }

    setAnimatingId(couponId)
    
    setTimeout(() => {
      setCouponStates(prev => ({
        ...prev,
        [couponId]: {
          claimed: true,
          claimedAt: new Date(),
          used: false,
        },
      }))
      setAnimatingId(null)
      showToast('领取成功！')
    }, 600)
  }, [couponStates, showToast])

  const handleUseCoupon = useCallback((couponId: string) => {
    const currentState = couponStates[couponId]
    
    if (!currentState?.claimed) {
      showToast('请先领取优惠券', 'error')
      return
    }
    
    if (currentState.used) {
      showToast('该优惠券已使用', 'error')
      return
    }

    setCouponStates(prev => ({
      ...prev,
      [couponId]: {
        ...prev[couponId],
        used: true,
        usedAt: new Date(),
      },
    }))
    showToast('优惠券已使用')
  }, [couponStates, showToast])

  const handleCloseModal = useCallback(() => {
    setModalVisible(false)
    setTimeout(() => setVisible(false), 300)
  }, [])

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
    requestAnimationFrame(() => {
      setMyCouponsModalVisible(true)
    })
  }, [])

  const handleCloseMyCoupons = useCallback(() => {
    setMyCouponsModalVisible(false)
    setTimeout(() => setMyCouponsVisible(false), 300)
  }, [])

  const claimedCount = Object.values(couponStates).filter(s => s.claimed).length
  const usedCount = Object.values(couponStates).filter(s => s.used).length

  const getCouponButton = (coupon: Coupon) => {
    const state = couponStates[coupon.id]
    
    if (state?.used) {
      return (
        <button className="coupon-card__btn used" disabled>
          已使用
        </button>
      )
    }
    
    if (state?.claimed) {
      return (
        <button 
          className="coupon-card__btn claimed"
          onClick={() => handleUseCoupon(coupon.id)}
        >
          立即使用
        </button>
      )
    }
    
    return (
      <button 
        className={`coupon-card__btn ${animatingId === coupon.id ? 'animating' : ''}`}
        onClick={() => handleClaimCoupon(coupon.id)}
      >
        立即领取
      </button>
    )
  }

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

      {visible && (
        <div 
          className={`modal ${modalVisible ? 'modal--visible' : ''}`} 
          role="dialog" 
          aria-modal="true"
        >
          <div className="modal__mask" onClick={handleCloseModal} />
          <div
            className={`modal__body ${modalVisible ? 'modal__body--visible' : ''}`}
            onClick={(e) => e.stopPropagation()}
            role="document"
          >
            <button className="modal__close" onClick={handleCloseModal}>
              ×
            </button>
            <div className="modal__title">优惠券中心</div>
            <div className="modal__subtitle">限时发放，先到先得</div>

            <div className="coupon-list">
              {COUPONS.map((coupon) => {
                const state = couponStates[coupon.id]
                return (
                  <div 
                    key={coupon.id} 
                    className={`coupon-card ${state?.used ? 'coupon-card--used' : ''} ${state?.claimed && !state?.used ? 'coupon-card--claimed' : ''} ${animatingId === coupon.id ? 'coupon-card--animating' : ''}`}
                  >
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
                    {getCouponButton(coupon)}
                    <button 
                      className="coupon-card__detail"
                      onClick={() => handleViewDetail(coupon)}
                      title="查看详情"
                    >
                      ?
                    </button>
                  </div>
                )
              })}
            </div>

            <div className="tips">
              使用提示：
              <span>领取后请在有效期内使用；</span>
              <span>部分特殊商品不支持；</span>
              <span>与其他活动叠加时以结算页为准。</span>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className={`toast toast--${toast.type}`}>
          {toast.message}
        </div>
      )}

      {myCouponsVisible && (
        <div className={`my-coupons-modal ${myCouponsModalVisible ? 'my-coupons-modal--visible' : ''}`}>
          <div className="my-coupons-modal__mask" onClick={handleCloseMyCoupons} />
          <div className={`my-coupons-modal__body ${myCouponsModalVisible ? 'my-coupons-modal__body--visible' : ''}`}>
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
                claimedCount - usedCount === 0 ? (
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
                  COUPONS
                    .filter(coupon => {
                      const state = couponStates[coupon.id]
                      return state?.claimed && !state?.used
                    })
                    .map(coupon => (
                      <div 
                        key={coupon.id}
                        className="my-coupon-card my-coupon-card--available"
                        onClick={() => handleViewDetail(coupon)}
                      >
                        <div className="my-coupon-card__left">
                          <span className="my-coupon-card__symbol">¥</span>
                          <span className="my-coupon-card__amount">{coupon.amount}</span>
                        </div>
                        <div className="my-coupon-card__right">
                          <div className="my-coupon-card__name">{coupon.title}</div>
                          <div className="my-coupon-card__condition">满{coupon.threshold}可用</div>
                          <div className="my-coupon-card__expiry">{coupon.expiry}</div>
                        </div>
                        <button 
                          className="my-coupon-card__use"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleUseCoupon(coupon.id)
                          }}
                        >
                          立即使用
                        </button>
                      </div>
                    ))
                )
              ) : (
                usedCount === 0 ? (
                  <div className="my-coupons-modal__empty">
                    <div className="empty-icon">📋</div>
                    <p>暂无已使用优惠券</p>
                  </div>
                ) : (
                  COUPONS
                    .filter(coupon => {
                      const state = couponStates[coupon.id]
                      return state?.used
                    })
                    .map(coupon => (
                      <div 
                        key={coupon.id}
                        className="my-coupon-card my-coupon-card--used"
                      >
                        <div className="my-coupon-card__left">
                          <span className="my-coupon-card__symbol">¥</span>
                          <span className="my-coupon-card__amount">{coupon.amount}</span>
                        </div>
                        <div className="my-coupon-card__right">
                          <div className="my-coupon-card__name">{coupon.title}</div>
                          <div className="my-coupon-card__condition">满{coupon.threshold}可用</div>
                          <div className="my-coupon-card__expiry">
                            已使用于 {couponStates[coupon.id]?.usedAt?.toLocaleDateString() || '未知时间'}
                          </div>
                        </div>
                      </div>
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
          </div>
        </div>
      )}

      {detailCoupon && (
        <div className={`detail-modal ${detailVisible ? 'detail-modal--visible' : ''}`}>
          <div className="detail-modal__mask" onClick={handleCloseDetail} />
          <div className={`detail-modal__body ${detailVisible ? 'detail-modal__body--visible' : ''}`}>
            <button className="detail-modal__close" onClick={handleCloseDetail}>×</button>
            
            <div className="detail-modal__header">
              <div className="detail-modal__amount">
                <div className="price-line">
                  <span className="currency">¥</span>
                  <span className="number">{detailCoupon.amount}</span>
                </div>
                <span className="condition">满{detailCoupon.threshold}可用</span>
              </div>
              <div className="detail-modal__title">
                <h3>{detailCoupon.title}</h3>
                {detailCoupon.tag && <span className="tag">{detailCoupon.tag}</span>}
              </div>
            </div>

            <div className="detail-modal__section">
              <h4>使用说明</h4>
              <p className="detail-modal__desc">{detailCoupon.desc}</p>
            </div>

            <div className="detail-modal__section">
              <h4>使用规则</h4>
              <ul className="detail-modal__rules">
                {detailCoupon.rules?.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </div>

            <div className="detail-modal__section">
              <h4>可用范围</h4>
              <div className="detail-modal__scope">
                {detailCoupon.scope?.map((item, index) => (
                  <span key={index} className="scope-tag">{item}</span>
                ))}
              </div>
            </div>

            <div className="detail-modal__footer">
              <div className="detail-modal__expiry">{detailCoupon.expiry}</div>
              {(() => {
                const state = couponStates[detailCoupon.id]
                if (state?.used) {
                  return <button className="coupon-card__btn used" disabled>已使用</button>
                }
                if (state?.claimed) {
                  return (
                    <button 
                      className="coupon-card__btn claimed"
                      onClick={() => {
                        handleUseCoupon(detailCoupon.id)
                        handleCloseDetail()
                      }}
                    >
                      立即使用
                    </button>
                  )
                }
                return (
                  <button 
                    className="coupon-card__btn"
                    onClick={() => {
                      handleClaimCoupon(detailCoupon.id)
                      handleCloseDetail()
                    }}
                  >
                    立即领取
                  </button>
                )
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
