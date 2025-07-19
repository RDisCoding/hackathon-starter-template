import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error('OAuth error:', error)
      return NextResponse.redirect(`${origin}/auth?error=OAuth failed`)
    }

    // Clean redirect without the code parameter
    return NextResponse.redirect(`${origin}${next}`)
  }

  // No code means something went wrong
  return NextResponse.redirect(`${origin}/auth?error=No authorization code`)
}
