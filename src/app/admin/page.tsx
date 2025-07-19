'use client'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

type Profile = {
  id: string
  email: string
  full_name: string
  is_admin: boolean
  created_at: string
}

export default function AdminPanel() {
  const { user, isAdmin } = useAuth()
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    if (isAdmin) {
      fetchProfiles()
    } else {
      setLoading(false)
    }
  }, [isAdmin])

  async function fetchProfiles() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, full_name, is_admin, created_at')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching profiles:', error)
        throw error
      }
      
      setProfiles(data || [])
    } catch (error) {
      console.error('Error fetching profiles:', error)
    } finally {
      setLoading(false)
    }
  }

  async function toggleAdminStatus(profileId: string, currentStatus: boolean) {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_admin: !currentStatus })
        .eq('id', profileId)

      if (error) throw error
      
      setProfiles(profiles.map(profile => 
        profile.id === profileId 
          ? { ...profile, is_admin: !currentStatus }
          : profile
      ))
    } catch (error) {
      console.error('Error updating admin status:', error)
    }
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-dark-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center bg-dark-800 p-12 rounded-xl border border-dark-700">
            <div className="w-16 h-16 bg-accent-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-accent-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-accent-red mb-2">Access Denied</h1>
            <p className="text-gray-400">You don&apos;t have admin privileges to access this panel.</p>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="gradient-purple-blue bg-clip-text text-transparent text-lg">
              Loading admin panel...
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            <span className="gradient-red-purple bg-clip-text text-transparent">
              Admin Panel
            </span>
          </h1>
          <p className="mt-2 text-gray-400">Manage users and system settings</p>
        </div>

        <div className="bg-dark-800 shadow-xl rounded-xl overflow-hidden border border-dark-700">
          <div className="px-6 py-4 border-b border-dark-700">
            <h3 className="text-lg font-medium text-white">User Management</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-dark-700">
              <thead className="bg-dark-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Admin Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-dark-800 divide-y divide-dark-700">
                {profiles.map((profile) => (
                  <tr key={profile.id} className="hover:bg-dark-700 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">
                        {profile.full_name || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">{profile.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        profile.is_admin 
                          ? 'bg-accent-red/20 text-accent-red border border-accent-red/30' 
                          : 'bg-gray-600/20 text-gray-400 border border-gray-600/30'
                      }`}>
                        {profile.is_admin ? 'Admin' : 'User'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {new Date(profile.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {profile.id !== user?.id && (
                        <button
                          onClick={() => toggleAdminStatus(profile.id, profile.is_admin)}
                          className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105 ${
                            profile.is_admin
                              ? 'bg-accent-red/20 text-accent-red hover:bg-accent-red hover:text-white border border-accent-red/30'
                              : 'bg-accent-blue/20 text-accent-blue hover:bg-accent-blue hover:text-white border border-accent-blue/30'
                          }`}
                        >
                          {profile.is_admin ? 'Remove Admin' : 'Make Admin'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
