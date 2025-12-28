'use client'

import { useState, useEffect } from 'react'
import { 
  Image as ImageIcon, 
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  Calendar,
  Link as LinkIcon,
  X,
  Save,
  Upload
} from 'lucide-react'
import { shouldUseMockData } from '@/lib/mock-api'
import Button from '@/components/ui/Button'
import toast from 'react-hot-toast'

interface Banner {
  id: string
  title: string
  subtitle?: string
  image: string
  link?: string
  position: 'hero' | 'sidebar' | 'footer' | 'popup'
  active: boolean
  start_date?: string
  end_date?: string
  created_at: string
}

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    image: '',
    link: '',
    position: 'hero' as Banner['position'],
    active: true,
    start_date: '',
    end_date: '',
  })

  useEffect(() => {
    fetchBanners()
  }, [])

  const fetchBanners = async () => {
    setLoading(true)
    
    if (shouldUseMockData()) {
      const mockBanners: Banner[] = [
        {
          id: '1',
          title: 'Find Your Dream Home',
          subtitle: 'Explore premium properties in Lucknow',
          image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200',
          link: '/properties',
          position: 'hero',
          active: true,
          created_at: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Special Diwali Offer',
          subtitle: 'Get 10% off on booking fees',
          image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800',
          link: '/offers',
          position: 'popup',
          active: true,
          start_date: '2024-10-15',
          end_date: '2024-11-15',
          created_at: new Date().toISOString(),
        },
        {
          id: '3',
          title: 'List Your Property',
          subtitle: 'Reach thousands of buyers',
          image: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=400',
          link: '/list-property',
          position: 'sidebar',
          active: true,
          created_at: new Date().toISOString(),
        },
      ]
      setBanners(mockBanners)
      setLoading(false)
      return
    }

    // Fetch from API
    setLoading(false)
  }

  const handleSubmit = async () => {
    if (!formData.title || !formData.image) {
      toast.error('Title and image are required')
      return
    }

    if (editingBanner) {
      setBanners(prev => prev.map(b => 
        b.id === editingBanner.id 
          ? { ...b, ...formData }
          : b
      ))
      toast.success('Banner updated')
    } else {
      const newBanner: Banner = {
        id: `banner-${Date.now()}`,
        ...formData,
        created_at: new Date().toISOString(),
      }
      setBanners(prev => [...prev, newBanner])
      toast.success('Banner created')
    }

    setShowModal(false)
    setEditingBanner(null)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      image: '',
      link: '',
      position: 'hero',
      active: true,
      start_date: '',
      end_date: '',
    })
  }

  const openEditModal = (banner: Banner) => {
    setEditingBanner(banner)
    setFormData({
      title: banner.title,
      subtitle: banner.subtitle || '',
      image: banner.image,
      link: banner.link || '',
      position: banner.position,
      active: banner.active,
      start_date: banner.start_date || '',
      end_date: banner.end_date || '',
    })
    setShowModal(true)
  }

  const deleteBanner = (id: string) => {
    if (!confirm('Are you sure you want to delete this banner?')) return
    setBanners(prev => prev.filter(b => b.id !== id))
    toast.success('Banner deleted')
  }

  const toggleActive = (id: string) => {
    setBanners(prev => prev.map(b => 
      b.id === id ? { ...b, active: !b.active } : b
    ))
    toast.success('Banner status updated')
  }

  const getPositionBadge = (position: string) => {
    const styles: Record<string, string> = {
      hero: 'bg-blue-100 text-blue-800',
      sidebar: 'bg-green-100 text-green-800',
      footer: 'bg-purple-100 text-purple-800',
      popup: 'bg-orange-100 text-orange-800',
    }
    return styles[position] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Banner Management</h1>
          <p className="text-gray-600 mt-1">Manage promotional banners and content</p>
        </div>
        <Button onClick={() => { resetForm(); setEditingBanner(null); setShowModal(true); }}>
          <Plus className="w-4 h-4 mr-2" />
          Add Banner
        </Button>
      </div>

      {/* Banners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map((banner) => (
          <div key={banner.id} className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${!banner.active ? 'opacity-60' : ''}`}>
            <div className="aspect-video bg-gray-100 relative">
              <img 
                src={banner.image} 
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-1">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPositionBadge(banner.position)}`}>
                  {banner.position}
                </span>
              </div>
              {!banner.active && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-medium">Inactive</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900">{banner.title}</h3>
              {banner.subtitle && (
                <p className="text-sm text-gray-500 mt-1">{banner.subtitle}</p>
              )}
              {banner.link && (
                <p className="text-xs text-primary-600 mt-2 flex items-center gap-1">
                  <LinkIcon className="w-3 h-3" />
                  {banner.link}
                </p>
              )}
              {(banner.start_date || banner.end_date) && (
                <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {banner.start_date} - {banner.end_date || 'No end'}
                </p>
              )}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                <button
                  onClick={() => toggleActive(banner.id)}
                  className={`p-2 rounded-lg ${banner.active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}
                  title={banner.active ? 'Active' : 'Inactive'}
                >
                  {banner.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => openEditModal(banner)}
                  className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteBanner(banner.id)}
                  className="p-2 hover:bg-red-100 rounded-lg text-red-600"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {banners.length === 0 && (
          <div className="col-span-full bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No banners yet</p>
            <Button className="mt-4" onClick={() => setShowModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create First Banner
            </Button>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingBanner ? 'Edit Banner' : 'Add New Banner'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                  placeholder="Banner title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                  placeholder="Optional subtitle"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL *</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                  placeholder="https://..."
                />
                {formData.image && (
                  <img src={formData.image} alt="Preview" className="mt-2 w-full h-32 object-cover rounded-lg" />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link URL</label>
                <input
                  type="url"
                  value={formData.link}
                  onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                  placeholder="/properties or https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <select
                  value={formData.position}
                  onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value as Banner['position'] }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                >
                  <option value="hero">Hero (Homepage)</option>
                  <option value="sidebar">Sidebar</option>
                  <option value="footer">Footer</option>
                  <option value="popup">Popup</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                  className="w-4 h-4 text-primary-600 rounded"
                />
                <label htmlFor="active" className="text-sm text-gray-700">Active</label>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button onClick={handleSubmit}>
                <Save className="w-4 h-4 mr-2" />
                {editingBanner ? 'Update' : 'Create'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
