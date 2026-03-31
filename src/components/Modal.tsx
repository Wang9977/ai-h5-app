import { useEffect, useState, useCallback, type ReactNode } from 'react'
import './Modal.css'

interface ModalProps {
  visible: boolean
  onClose: () => void
  children: ReactNode
}

export function Modal({ visible, onClose, children }: ModalProps) {
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

  const handleMaskClick = useCallback(() => {
    setModalVisible(false)
    setTimeout(() => onClose(), 300)
  }, [onClose])

  if (!visible && !modalVisible) return null

  return (
    <div className={`modal ${modalVisible ? 'modal--visible' : ''}`}>
      <div className="modal__mask" onClick={handleMaskClick} />
      <div
        className={`modal__body ${modalVisible ? 'modal__body--visible' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
