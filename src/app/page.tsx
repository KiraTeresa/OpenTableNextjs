import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <h1 className="text-blue-400 text-7xl">Getting started with Nextjs</h1>
    </main>
  )
}
