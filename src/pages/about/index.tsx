import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function AboutPage() {
  const [counter, setCounter] = useState(0)

  const router = useRouter()

  useEffect(() => {
    // Variables to store touch positions
    let touchStartX: number | null = null
    let touchEndX: number | null = null

    // Function to detect swipe gesture
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX
    }

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].clientX

      if (touchStartX !== null && touchEndX !== null) {
        // If the swipe is from left to right (back gesture)
        if (touchEndX < touchStartX) {
          e.preventDefault() // Prevent the back action from happening
        }
      }
    }

    // Adding event listeners for swipe detection
    document.addEventListener('touchstart', handleTouchStart)
    document.addEventListener('touchend', handleTouchEnd)

    // Cleanup event listeners when the component unmounts
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
      <h1>About Page with swipes</h1>
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
