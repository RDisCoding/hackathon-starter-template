'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { HiMenu, HiX, HiSun, HiMoon } from 'react-icons/hi'
import { useTheme } from 'next-themes'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, isAdmin, signOut, loading } = useAuth()
  const { theme, setTheme } = useTheme()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  if (loading) {
    return (
      <nav className="bg-dark-900/95 backdrop-blur-sm border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="text-xl font-bold gradient-purple-blue bg-clip-text text-transparent">
                Loading...
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-dark-900/95 backdrop-blur-sm border-b border-dark-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo with Gradient */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold gradient-purple-blue bg-clip-text text-transparent">
              MyApp
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              Home
            </Link>
            
            {user ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="text-gray-300 hover:text-accent-blue px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <Link 
                  href="/profile" 
                  className="text-gray-300 hover:text-accent-purple px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  Profile
                </Link>
                {isAdmin && (
                  <Link 
                    href="/admin" 
                    className="text-accent-red hover:text-red-400 px-3 py-2 text-sm font-medium transition-colors duration-200"
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={signOut}
                  className="bg-accent-red hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link 
                href="/auth" 
                className="gradient-purple-blue text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105"
              >
                Login
              </Link>
            )}

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 text-gray-300 hover:text-white transition-colors duration-200"
            >
              {theme === 'dark' ? <HiSun className="h-5 w-5" /> : <HiMoon className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-300 hover:text-white focus:outline-none transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-dark-800/95 backdrop-blur-sm border-t border-dark-700">
            <Link
              href="/"
              className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-accent-blue transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-accent-purple transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="block px-3 py-2 text-base font-medium text-accent-red hover:text-red-400 transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => {
                    signOut()
                    setIsMobileMenuOpen(false)
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/auth"
                className="block px-3 py-2 text-base font-medium text-accent-blue hover:text-blue-400 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
