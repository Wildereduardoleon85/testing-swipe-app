import { useEffect } from 'react'

// Distance in pixels from the screen edge to detect swipe gestures.
// 16 works well to block navigation without affecting normal edge
// interactions and it matches with the right and left padding of the
// app UI.
const EDGE_THRESHOLD = 16

/**
 * A custom React hook that prevents touch gestures near the edges of the screen.
 * This is useful for avoiding from navigating back and forward swiping on the edges
 * of the screen.
 *
 * @returns void
 */
export function usePreventEdgeGestures() {
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      // Ensure that only single-finger touches are processed
      if (e.touches.length === 1) {
        // Gets the first (and only) finger that touched the screen
        const touch = e.touches[0]

        // Check if the touch is near the edge of the screen
        if (
          touch.clientX <= EDGE_THRESHOLD ||
          touch.clientX >= window.innerWidth - EDGE_THRESHOLD
        ) {
          // This blocks any touch event that is near the edge of the screen
          e.preventDefault()
        }
      }
    }

    document.addEventListener('touchstart', handleTouchStart, {
      // This allows to call preventDefault()
      passive: false,
    })

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
    }
  }, [])
}
