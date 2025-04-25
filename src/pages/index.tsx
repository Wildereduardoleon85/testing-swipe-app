import { usePreventEdgeGestures } from '@/hooks/usePreventEdgeGestures'
import { useRouter } from 'next/router'

export default function Home() {
  usePreventEdgeGestures()

  const router = useRouter()

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1>Home Page</h1>
      <button
        style={{
          display: 'block',
          marginTop: '16px',
          width: 'fit-content',
          padding: '8px',
        }}
        onClick={() => router.push('/about')}
      >
        About
      </button>
    </div>
  )
}
