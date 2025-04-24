import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function AboutPage() {
  const [counter, setCounter] = useState(0)

  const router = useRouter()

  useEffect(() => {
    let touchStartX: number | null = null
    let touchEndX: number | null = null

    const EDGE_THRESHOLD = 20 // Only capture swipes that start near the left edge

    const handleTouchStart = (e: TouchEvent) => {
      const x = e.touches[0].clientX
      if (x < EDGE_THRESHOLD) {
        touchStartX = x
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].clientX

      if (
        touchStartX !== null &&
        touchEndX - touchStartX > 50 // minimum swipe distance
      ) {
        // You can show a modal, alert, or cancel navigation here
        console.log('Edge swipe detected')
        // Prevent navigation with a push or similar if needed
        history.pushState(null, '', window.location.pathname)
      }

      // Reset values
      touchStartX = null
      touchEndX = null
    }

    document.addEventListener('touchstart', handleTouchStart)
    document.addEventListener('touchend', handleTouchEnd)

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  const handleBack = () => {
    router.back()
  }

  return (
    <>
      <h1>About Page with edge threshold</h1>
      <p>{counter}</p>
      <button
        style={{ display: 'block', marginTop: '16px' }}
        onClick={() => setCounter(counter + 1)}
      >
        Add
      </button>
      <button
        style={{ display: 'block', marginTop: '16px' }}
        onClick={handleBack}
      >
        Go Back
      </button>
    </>
  )
}
