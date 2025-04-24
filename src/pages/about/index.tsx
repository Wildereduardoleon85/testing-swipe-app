import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function AboutPage() {
  const [counter, setCounter] = useState(0)

  const router = useRouter()

  useEffect(() => {
    const EDGE_THRESHOLD = 30

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0]
        // Check if the touch is near the edge of the screen (adjust threshold as needed)
        if (
          touch.clientX <= EDGE_THRESHOLD ||
          touch.clientX >= window.innerWidth - EDGE_THRESHOLD
        ) {
          e.preventDefault() // Prevent swipe-to-navigate
        }
      }
    }

    document.addEventListener('touchstart', handleTouchStart, {
      passive: false,
    })

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
    }
  }, [])

  const handleBack = () => {
    router.back()
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1>About Page</h1>
      <p style={{ marginTop: '30px' }}>{counter}</p>
      <button
        style={{
          display: 'block',
          marginTop: '16px',
          width: 'fit-content',
          padding: '8px',
        }}
        onClick={() => setCounter(counter + 1)}
      >
        Add
      </button>
      <button
        style={{
          display: 'block',
          marginTop: '16px',
          width: 'fit-content',
          padding: '8px',
        }}
        onClick={handleBack}
      >
        Go Back
      </button>
    </div>
  )
}
