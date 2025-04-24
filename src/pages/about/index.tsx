import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

export default function AboutPage() {
  const [counter, setCounter] = useState(0)

  const router = useRouter()

  // Wrap handlePopState in useCallback
  const handlePopState = useCallback(() => {
    // Re-push one entry to keep user on the same page
    history.pushState(null, '', router.pathname)
  }, [router.pathname])

  useEffect(() => {
    // Push initial fake entries
    for (let i = 0; i < 2; i++) {
      history.pushState(null, '', router.pathname)
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [router.pathname, handlePopState])

  const handleBack = () => {
    // Remove the event listener before going back
    window.removeEventListener('popstate', handlePopState)
    router.back()
  }

  return (
    <>
      <h1>About Page</h1>
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
