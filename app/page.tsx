import { Metadata } from 'next'
import { PulseInterface } from '@/components/pulse-interface'

export const metadata: Metadata = {
  title: 'AXIOM Pro - Pulse',
  description: 'Real-time token discovery and trading analytics',
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0e27]">
      <PulseInterface />
    </main>
  )
}
