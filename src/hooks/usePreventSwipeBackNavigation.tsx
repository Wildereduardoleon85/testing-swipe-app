import { useEffect } from 'react'

export function usePreventSwipeBackNavigation() {
  useEffect(() => {
    const EDGE_THRESHOLD = 30
    let startX = 0
    let startY = 0
    let shouldPrevent = false

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0]
        startX = touch.clientX
        startY = touch.clientY

        // Only consider horizontal swipes near the screen edges
        if (
          startX <= EDGE_THRESHOLD ||
          startX >= window.innerWidth - EDGE_THRESHOLD
        ) {
          shouldPrevent = true
        } else {
          shouldPrevent = false
        }
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!shouldPrevent) return

      const touch = e.touches[0]
      const deltaX = Math.abs(touch.clientX - startX)
      const deltaY = Math.abs(touch.clientY - startY)

      // Only prevent if the gesture is mostly horizontal
      if (deltaX > deltaY) {
        e.preventDefault()
      }
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])
}
