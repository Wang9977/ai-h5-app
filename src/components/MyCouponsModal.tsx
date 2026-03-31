import { useEffect, useState, useCallback, type ReactNode } from 'react'
import './MyCouponsModal.css'

interface MyCouponsModalProps {
  visible: boolean
  onClose: () => void
  children: ReactNode
}

export function MyCouponsModal({ visible, onClose, children }: MyCouponsModalProps) {
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    if (visible) {
      requestAnimationFrame(() => {
        setModalVisible(true)
      })
    } else {
      setModalVisible(false)
    }
  }, [visible])

  const handleClose = useCallback(() => {
    setModalVisible(false)
    setTimeout(() => onClose(), 300)
  }, [onClose])

  if (!visible && !modalVisible) return null

  return (
    <div className={`my-coupons-modal ${modalVisible ? 'my-coupons-modal--visible' : ''}`}>
      <div className="my-coupons-modal__mask" onClick={handleClose} />
      <div className={`my-coupons-modal__body ${modalVisible ? 'my-coupons-modal__body--visible' : ''}`}>
        {children}
      </div>
    </div>
  )
}
