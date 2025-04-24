import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function AboutPage() {
  const [counter, setCounter] = useState(0)

  const router = useRouter()

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0]
        // Check if the touch is near the edge of the screen (adjust threshold as needed)
        if (touch.clientX <= 30 || touch.clientX >= window.innerWidth - 30) {
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
    <>
      <h1>About Page from google IA</h1>
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
