'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Users, Home, Eye, Edit, Trash2, TrendingUp } from 'lucide-react'
import { Property, User } from '@/lib/supabase/types'
import { createSupabaseClient } from '@/lib/supabase/client'
import { useMockData, mockApi, mockProperties, mockUsers } from '@/lib/mock-api'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function AdminDashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProperties: 0,
    activeListings: 0,
    pendingListings: 0,
  })
  const [recentProperties, setRecentProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createSupabaseClient()

  useEffect(() => {
    checkAdmin()

    // Realtime subscription
    if (supabase && !useMockData()) {
      const channel = supabase
        .channel('admin_dashboard')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'properties' }, () => {
          console.log('Realtime update: properties')
          fetchDashboardData()
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, () => {
          console.log('Realtime update: users')
          fetchDashboardData()
        })
        .subscribe()

      return () => {
        supabase.removeChannel(channel)
      }
    }
  }, [])

  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) throw new Error('No session')

    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://champ-y6eg.onrender.com'
    const fullUrl = url.startsWith('http') ? url : `${backendUrl}${url}`

    const res = await fetch(fullUrl, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.error || 'API request failed')
    }

    return res.json()
  }

  const checkAdmin = async () => {
    if (useMockData()) {
      setUser({ id: 'demo-admin', email: 'admin@demo.com' })
      fetchDashboardData()
      return
    }

    if (!supabase) {
      toast('Please configure Supabase to access admin panel', { icon: 'ℹ️' })
      router.push('/')
      return
    }

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/login')
        return
      }

      // Check role using backend API to bypass RLS if needed, or stick to direct check if "users" is readable
      // Direct check is faster for initial load if RLS allows "read own"
      const { data: userData, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()

      // If RLS blocks reading own role, we might need a specific endpoint or assume admin if they reached here?
      // Better to fail safe.
      if (userData?.role !== 'admin') {
        // Fallback: Try fetching profile from backend if direct access fails (e.g. if RLS is strict)
        // For now, assume RLS allows reading own profile.
        console.warn('User not admin or role fetch failed:', userData)
        router.push('/')
        return
      }

      setUser(user)
      fetchDashboardData()
    } catch (error) {
      console.warn('Admin check failed:', error)
      router.push('/')
    }
  }

  const fetchDashboardData = async () => {
    if (useMockData()) {
      const activeListings = mockProperties.filter(p => p.status === 'active').length
      const pendingListings = mockProperties.filter(p => p.status === 'pending').length

      setStats({
        totalUsers: mockUsers.length,
        totalProperties: mockProperties.length,
        activeListings,
        pendingListings,
      })

      setRecentProperties(mockProperties.slice(0, 10))
      setLoading(false)
      return
    }

    try {
      // Use Backend API
      const response = await fetchWithAuth('/api/admin/dashboard')
      if (response.success && response.data) {
        setStats({
          totalUsers: response.data.totalUsers,
          totalProperties: response.data.totalProperties,
          activeListings: response.data.totalRevenue ? 0 : 0, // Dashboard API returns different shape?
          // Wait, let's match the API shape I saw earlier
          // API returns: { totalUsers, totalProperties, pendingProperties, totalRevenue }
          // My state needs: { totalUsers, totalProperties, activeListings, pendingListings }
          // API doesn't return activeListings?
          // Let's check API code from Step 223/235
          // API returns: { totalUsers, totalProperties, pendingProperties, totalRevenue }
          pendingListings: response.data.pendingProperties
        })

        // We need active listings count. API V1 didn't return it? 
        // I should have checked. Step 235: it returns pendingProperties.
        // It does NOT return activeListings explicitly.
        // I can calculate it or fetch properties separately.

        // Also need recent properties. API: /api/admin/properties
        const propsResponse = await fetchWithAuth('/api/admin/properties')
        if (propsResponse.success && propsResponse.data) {
          const allProps = propsResponse.data
          const activeCount = allProps.filter((p: any) => p.status === 'active').length

          // Update stats with calculated active count
          setStats(prev => ({ ...prev, activeListings: activeCount }))
          setRecentProperties(allProps.slice(0, 10))
        }
      }
    } catch (error) {
      console.warn('Failed to fetch dashboard data:', error)
      toast.error('Failed to load dashboard data')
    }
    setLoading(false)
  }

  const handleStatusChange = async (propertyId: string, newStatus: string) => {
    if (useMockData()) {
      toast('Mock: Status updated', { icon: 'ℹ️' })
      return
    }

    try {
      await fetchWithAuth(`/api/admin/properties/${propertyId}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus }),
      })

      toast.success('Status updated successfully')
      fetchDashboardData()
    } catch (error) {
      console.error('Update status error:', error)
      toast.error('Failed to update status')
    }
  }

  const handleDeleteProperty = async (propertyId: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return

    if (useMockData()) {
      toast('Mock: Property deleted', { icon: 'ℹ️' })
      return
    }

    try {
      await fetchWithAuth(`/api/admin/properties/${propertyId}`, {
        method: 'DELETE',
      })

      toast.success('Property deleted successfully')
      fetchDashboardData()
    } catch (error) {
      console.error('Delete property error:', error)
      toast.error('Failed to delete property')
    }
  }

  if (loading) {
    return (
      <div className="container-custom py-16">
        <div className="text-center">Loading admin dashboard...</div>
      </div>
    )
  }

  return (
    <div className="container-custom py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
          ● Realtime Active
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
            <Users className="w-12 h-12 text-primary-600" />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Total Properties</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalProperties}</p>
            </div>
            <Home className="w-12 h-12 text-primary-600" />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Active Listings</p>
              <p className="text-3xl font-bold text-green-600">{stats.activeListings}</p>
            </div>
            <TrendingUp className="w-12 h-12 text-green-600" />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Pending Listings</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.pendingListings}</p>
            </div>
            <Eye className="w-12 h-12 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Recent Properties */}
      <div className="card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recent Properties</h2>
          <Link href="/admin/properties">
            <Button variant="outline">View All</Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Title</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentProperties.map((property) => (
                <tr key={property.id} className="border-b border-gray-100">
                  <td className="py-3 px-4">
                    <Link
                      href={`/properties/${property.id}`}
                      className="text-primary-600 hover:underline"
                    >
                      {property.title}
                    </Link>
                  </td>
                  <td className="py-3 px-4 capitalize">{property.type}</td>
                  <td className="py-3 px-4">
                    <select
                      value={property.status}
                      onChange={(e) => handleStatusChange(property.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${property.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : property.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                    >
                      <option value="active">Active</option>
                      <option value="pending">Pending</option>
                      <option value="sold">Sold</option>
                      <option value="rented">Rented</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {new Date(property.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Link href={`/properties/${property.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteProperty(property.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/admin/properties">
            <div className="card p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <h3 className="font-semibold text-gray-900 mb-2">Manage Properties</h3>
              <p className="text-sm text-gray-600">View and manage all properties</p>
            </div>
          </Link>
          <Link href="/admin/users">
            <div className="card p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <h3 className="font-semibold text-gray-900 mb-2">Manage Users</h3>
              <p className="text-sm text-gray-600">View and manage all users</p>
            </div>
          </Link>
          <Link href="/admin/analytics">
            <div className="card p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <h3 className="font-semibold text-gray-900 mb-2">Analytics</h3>
              <p className="text-sm text-gray-600">View detailed analytics</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
