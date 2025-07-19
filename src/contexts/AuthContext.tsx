'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { User, Session } from '@supabase/supabase-js'

type AuthContextType = {
  user: User | null
  session: Session | null
  isAdmin: boolean
  loading: boolean
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  // Function to check admin status using the security definer function
  const checkAdminStatus = async (userId: string) => {
    try {
      console.log('Checking admin status for user:', userId)
      
      // Use the security definer function instead of direct table query
      const { data, error } = await supabase.rpc('is_admin_user', {
        user_id: userId
      })
      
      console.log('Admin check result:', { data, error })
      
      if (error) {
        console.error('Error checking admin status:', error)
        setIsAdmin(false)
        return false
      }
      
      const adminStatus = data || false
      console.log('Setting admin status to:', adminStatus)
      setIsAdmin(adminStatus)
      return adminStatus
    } catch (error) {
      console.error('Exception in checkAdminStatus:', error)
      setIsAdmin(false)
      return false
    }
  }

  // Refresh profile function
  const refreshProfile = async () => {
    if (user?.id) {
      await checkAdminStatus(user.id)
    }
  }

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      try {
        console.log('Getting initial session...')
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Session error:', error)
          setLoading(false)
          return
        }

        console.log('Initial session loaded:', !!session)
        setSession(session)
        setUser(session?.user ?? null)
        
        if (session?.user) {
          await checkAdminStatus(session.user.id)
        }
        
        setLoading(false)
      } catch (error) {
        console.error('Error getting session:', error)
        setLoading(false)
      }
    }

    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event)
        
        setSession(session)
        setUser(session?.user ?? null)
        
        if (session?.user) {
          await checkAdminStatus(session.user.id)

          // Clean URL after successful auth
        if (typeof window !== 'undefined' && window.location.search.includes('code=')) {
          window.history.replaceState({}, document.title, window.location.pathname)
        }
        
        } else {
          setIsAdmin(false)
        }
        
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const value = {
    user,
    session,
    isAdmin,
    loading,
    signOut,
    refreshProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
