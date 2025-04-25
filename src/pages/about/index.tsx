import { usePreventEdgeGestures } from '@/hooks/usePreventEdgeGestures'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function AboutPage() {
  const [counter, setCounter] = useState(0)
  usePreventEdgeGestures()

  const router = useRouter()

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
      <h1>About Page from custom hook</h1>
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
