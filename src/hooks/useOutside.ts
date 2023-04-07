import { useEffect, RefObject } from 'react'

type handler = (event: MouseEvent | TouchEvent) => void

export const useOutside = (ref: RefObject<HTMLElement>, handler: handler) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement

      if (!ref.current || ref.current.contains(target)) {
        return
      }
      handler(event)
    }
    document.addEventListener('mousedown', listener)
    // document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      // document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}
