'use client'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function SanitizeURL() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check if there's a 'code' parameter in the URL
    if (searchParams.get('code')) {
      // Remove the code parameter by replacing the URL without it
      router.replace('/dashboard', { scroll: false })
    }
  }, [searchParams, router])

  // This component doesn't render anything visible
  return null
}
