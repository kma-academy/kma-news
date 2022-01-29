import { useRef, useEffect, useState } from 'react'

export const useClickOutside = <T extends Node>(initState = false) => {
  const ref = useRef<T>(null)
  const [activeModal, toggleModal] = useState(initState)
  useEffect(() => {
    let maybeHandler = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      toggleModal(false)
    }

    document.addEventListener('mousedown', maybeHandler, {
      passive: true,
    })
    document.addEventListener('touchstart', maybeHandler, {
      passive: true,
    })

    return () => {
      document.removeEventListener('mousedown', maybeHandler)
      document.addEventListener('touchstart', maybeHandler)
    }
  }, [ref])

  return [ref, activeModal, toggleModal] as const
}
