'use client'
import { useAuth } from '@/contexts/AuthContext'
import SanitizeURL from '@/components/SanitizeURL'

export default function Dashboard() {
  const { user, isAdmin, refreshProfile } = useAuth()

  return (
    <>
      <SanitizeURL />
      
      <div className="min-h-screen bg-dark-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-dark-800 shadow-xl rounded-xl p-8 border border-dark-700">
            <h1 className="text-3xl font-bold mb-8">
              <span className="gradient-purple-blue bg-clip-text text-transparent">
                Dashboard
              </span>
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-dark-900 p-6 rounded-lg border border-dark-600">
                <h3 className="text-lg font-semibold text-white mb-4">User Information</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-400">Email:</span>
                    <span className="ml-2 text-white">{user?.email}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">User ID:</span>
                    <span className="ml-2 text-gray-300 font-mono text-sm">{user?.id}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Admin Status:</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${
                      isAdmin 
                        ? 'bg-accent-red/20 text-accent-red border border-accent-red/30' 
                        : 'bg-gray-600/20 text-gray-400 border border-gray-600/30'
                    }`}>
                      {isAdmin ? 'Admin' : 'User'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Last Sign In:</span>
                    <span className="ml-2 text-white">
                      {user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-dark-900 p-6 rounded-lg border border-dark-600">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={refreshProfile}
                    className="w-full gradient-purple-blue text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105"
                  >
                    Refresh Profile
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => window.location.href = '/admin'}
                      className="w-full bg-accent-red hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105"
                    >
                      Admin Panel
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
