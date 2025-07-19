'use client'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'

export default function HomePage() {
  const { user, isAdmin, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-dark-950">
        <div className="text-lg text-gray-300">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Hero Section with Gradient Background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-950"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/10 via-transparent to-accent-blue/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-purple-blue bg-clip-text text-transparent">
                Welcome to MyApp
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl leading-8 text-gray-300 max-w-3xl mx-auto">
              A modern web application built with Next.js and Supabase, featuring 
              beautiful dark themes and powerful authentication.
            </p>
            
            {!user ? (
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/auth"
                  className="gradient-purple-blue px-6 py-3 text-sm font-semibold text-white shadow-sm hover:scale-105 rounded-lg transition-all duration-200"
                >
                  Get Started
                </Link>
                <Link
                  href="#features"
                  className="text-sm font-semibold text-gray-300 hover:text-white border border-dark-600 px-6 py-3 rounded-lg transition-all duration-200 hover:border-accent-blue"
                >
                  Learn More →
                </Link>
              </div>
            ) : (
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/dashboard"
                  className="gradient-purple-blue px-6 py-3 text-sm font-semibold text-white shadow-sm hover:scale-105 rounded-lg transition-all duration-200"
                >
                  Go to Dashboard
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="bg-accent-red hover:bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:scale-105 rounded-lg transition-all duration-200"
                  >
                    Admin Panel
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to build modern web applications
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-dark-800 p-8 rounded-xl shadow-xl border border-dark-700 hover:border-accent-blue/50 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-accent-blue/20 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Secure Authentication</h3>
              <p className="text-gray-400">
                OAuth integration with Google and GitHub, plus traditional email authentication
              </p>
            </div>
            
            <div className="bg-dark-800 p-8 rounded-xl shadow-xl border border-dark-700 hover:border-accent-purple/50 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-accent-purple/20 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-accent-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Admin Dashboard</h3>
              <p className="text-gray-400">
                Comprehensive admin panel with user management and role-based access control
              </p>
            </div>
            
            <div className="bg-dark-800 p-8 rounded-xl shadow-xl border border-dark-700 hover:border-accent-red/50 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-accent-red/20 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-accent-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Responsive Design</h3>
              <p className="text-gray-400">
                Mobile-first design that works perfectly on all devices and screen sizes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
