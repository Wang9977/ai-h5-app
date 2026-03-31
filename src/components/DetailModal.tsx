import { useState, useEffect, useCallback, type ReactNode } from 'react'
import './DetailModal.css'

interface DetailModalProps {
  visible: boolean
  onClose: () => void
  children: ReactNode
}

export function DetailModal({ visible, onClose, children }: DetailModalProps) {
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
    <div className={`detail-modal ${modalVisible ? 'detail-modal--visible' : ''}`}>
      <div className="detail-modal__mask" onClick={handleClose} />
      <div className={`detail-modal__body ${modalVisible ? 'detail-modal__body--visible' : ''}`}>
        {children}
      </div>
    </div>
  )
}
