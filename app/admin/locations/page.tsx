'use client'

import { useState, useEffect } from 'react'
import { 
  MapPin, 
  Plus,
  Trash2,
  Edit,
  Search,
  X,
  Save,
  Building2,
  ChevronRight
} from 'lucide-react'
import { shouldUseMockData } from '@/lib/mock-api'
import Button from '@/components/ui/Button'
import toast from 'react-hot-toast'

interface City {
  id: string
  name: string
  state: string
  active: boolean
  areas: Area[]
  property_count: number
}

interface Area {
  id: string
  name: string
  city_id: string
  pincode?: string
  active: boolean
  property_count: number
}

export default function AdminLocationsPage() {
  const [cities, setCities] = useState<City[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState<City | null>(null)
  const [showCityModal, setShowCityModal] = useState(false)
  const [showAreaModal, setShowAreaModal] = useState(false)
  const [editingCity, setEditingCity] = useState<City | null>(null)
  const [editingArea, setEditingArea] = useState<Area | null>(null)
  
  const [cityForm, setCityForm] = useState({ name: '', state: '', active: true })
  const [areaForm, setAreaForm] = useState({ name: '', pincode: '', active: true })

  useEffect(() => {
    fetchLocations()
  }, [])

  const fetchLocations = async () => {
    setLoading(true)
    
    if (shouldUseMockData()) {
      const mockCities: City[] = [
        {
          id: '1',
          name: 'Lucknow',
          state: 'Uttar Pradesh',
          active: true,
          property_count: 156,
          areas: [
            { id: 'a1', name: 'Gomti Nagar', city_id: '1', pincode: '226010', active: true, property_count: 45 },
            { id: 'a2', name: 'Hazratganj', city_id: '1', pincode: '226001', active: true, property_count: 32 },
            { id: 'a3', name: 'Aliganj', city_id: '1', pincode: '226024', active: true, property_count: 28 },
            { id: 'a4', name: 'Indira Nagar', city_id: '1', pincode: '226016', active: true, property_count: 25 },
            { id: 'a5', name: 'Mahanagar', city_id: '1', pincode: '226006', active: true, property_count: 18 },
          ],
        },
        {
          id: '2',
          name: 'Kanpur',
          state: 'Uttar Pradesh',
          active: true,
          property_count: 89,
          areas: [
            { id: 'a6', name: 'Civil Lines', city_id: '2', pincode: '208001', active: true, property_count: 22 },
            { id: 'a7', name: 'Swaroop Nagar', city_id: '2', pincode: '208002', active: true, property_count: 18 },
            { id: 'a8', name: 'Kakadeo', city_id: '2', pincode: '208025', active: true, property_count: 15 },
          ],
        },
        {
          id: '3',
          name: 'Noida',
          state: 'Uttar Pradesh',
          active: true,
          property_count: 234,
          areas: [
            { id: 'a9', name: 'Sector 62', city_id: '3', pincode: '201301', active: true, property_count: 45 },
            { id: 'a10', name: 'Sector 18', city_id: '3', pincode: '201301', active: true, property_count: 38 },
            { id: 'a11', name: 'Sector 137', city_id: '3', pincode: '201305', active: true, property_count: 32 },
          ],
        },
      ]
      setCities(mockCities)
      setLoading(false)
      return
    }

    setLoading(false)
  }

  const handleSaveCity = () => {
    if (!cityForm.name || !cityForm.state) {
      toast.error('Name and state are required')
      return
    }

    if (editingCity) {
      setCities(prev => prev.map(c => 
        c.id === editingCity.id 
          ? { ...c, name: cityForm.name, state: cityForm.state, active: cityForm.active }
          : c
      ))
      toast.success('City updated')
    } else {
      const newCity: City = {
        id: `city-${Date.now()}`,
        name: cityForm.name,
        state: cityForm.state,
        active: cityForm.active,
        property_count: 0,
        areas: [],
      }
      setCities(prev => [...prev, newCity])
      toast.success('City added')
    }

    setShowCityModal(false)
    setEditingCity(null)
    setCityForm({ name: '', state: '', active: true })
  }

  const handleSaveArea = () => {
    if (!areaForm.name || !selectedCity) {
      toast.error('Area name is required')
      return
    }

    if (editingArea) {
      setCities(prev => prev.map(c => 
        c.id === selectedCity.id 
          ? {
              ...c,
              areas: c.areas.map(a => 
                a.id === editingArea.id 
                  ? { ...a, name: areaForm.name, pincode: areaForm.pincode, active: areaForm.active }
                  : a
              )
            }
          : c
      ))
      toast.success('Area updated')
    } else {
      const newArea: Area = {
        id: `area-${Date.now()}`,
        name: areaForm.name,
        city_id: selectedCity.id,
        pincode: areaForm.pincode,
        active: areaForm.active,
        property_count: 0,
      }
      setCities(prev => prev.map(c => 
        c.id === selectedCity.id 
          ? { ...c, areas: [...c.areas, newArea] }
          : c
      ))
      setSelectedCity(prev => prev ? { ...prev, areas: [...prev.areas, newArea] } : null)
      toast.success('Area added')
    }

    setShowAreaModal(false)
    setEditingArea(null)
    setAreaForm({ name: '', pincode: '', active: true })
  }

  const deleteCity = (id: string) => {
    if (!confirm('Delete this city and all its areas?')) return
    setCities(prev => prev.filter(c => c.id !== id))
    if (selectedCity?.id === id) setSelectedCity(null)
    toast.success('City deleted')
  }

  const deleteArea = (cityId: string, areaId: string) => {
    if (!confirm('Delete this area?')) return
    setCities(prev => prev.map(c => 
      c.id === cityId 
        ? { ...c, areas: c.areas.filter(a => a.id !== areaId) }
        : c
    ))
    if (selectedCity?.id === cityId) {
      setSelectedCity(prev => prev ? { ...prev, areas: prev.areas.filter(a => a.id !== areaId) } : null)
    }
    toast.success('Area deleted')
  }

  const filteredCities = cities.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.state.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
          <h1 className="text-2xl font-bold text-gray-900">Location Management</h1>
          <p className="text-gray-600 mt-1">Manage cities and areas for property listings</p>
        </div>
        <Button onClick={() => { setCityForm({ name: '', state: '', active: true }); setEditingCity(null); setShowCityModal(true); }}>
          <Plus className="w-4 h-4 mr-2" />
          Add City
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search cities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cities List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Cities ({filteredCities.length})</h2>
          </div>
          <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
            {filteredCities.map((city) => (
              <div 
                key={city.id} 
                className={`p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 ${selectedCity?.id === city.id ? 'bg-primary-50' : ''} ${!city.active ? 'opacity-50' : ''}`}
                onClick={() => setSelectedCity(city)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{city.name}</p>
                    <p className="text-sm text-gray-500">{city.state} • {city.areas.length} areas</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{city.property_count} properties</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); setEditingCity(city); setCityForm({ name: city.name, state: city.state, active: city.active }); setShowCityModal(true); }}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <Edit className="w-4 h-4 text-gray-500" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteCity(city.id); }}
                    className="p-1 hover:bg-red-100 rounded"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            ))}
            {filteredCities.length === 0 && (
              <div className="p-8 text-center">
                <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">No cities found</p>
              </div>
            )}
          </div>
        </div>

        {/* Areas List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-900">
                {selectedCity ? `Areas in ${selectedCity.name}` : 'Select a City'}
              </h2>
              {selectedCity && (
                <p className="text-sm text-gray-500">{selectedCity.areas.length} areas</p>
              )}
            </div>
            {selectedCity && (
              <Button size="sm" onClick={() => { setAreaForm({ name: '', pincode: '', active: true }); setEditingArea(null); setShowAreaModal(true); }}>
                <Plus className="w-4 h-4 mr-1" />
                Add Area
              </Button>
            )}
          </div>
          <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
            {selectedCity ? (
              selectedCity.areas.length > 0 ? (
                selectedCity.areas.map((area) => (
                  <div key={area.id} className={`p-4 flex items-center justify-between hover:bg-gray-50 ${!area.active ? 'opacity-50' : ''}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-gray-500" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{area.name}</p>
                        {area.pincode && <p className="text-sm text-gray-500">PIN: {area.pincode}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">{area.property_count} properties</span>
                      <button
                        onClick={() => { setEditingArea(area); setAreaForm({ name: area.name, pincode: area.pincode || '', active: area.active }); setShowAreaModal(true); }}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Edit className="w-4 h-4 text-gray-500" />
                      </button>
                      <button
                        onClick={() => deleteArea(selectedCity.id, area.id)}
                        className="p-1 hover:bg-red-100 rounded"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500">No areas yet</p>
                  <Button size="sm" className="mt-2" onClick={() => setShowAreaModal(true)}>
                    <Plus className="w-4 h-4 mr-1" />
                    Add First Area
                  </Button>
                </div>
              )
            ) : (
              <div className="p-8 text-center">
                <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">Select a city to view areas</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* City Modal */}
      {showCityModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-semibold">{editingCity ? 'Edit City' : 'Add City'}</h2>
              <button onClick={() => setShowCityModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City Name *</label>
                <input
                  type="text"
                  value={cityForm.name}
                  onChange={(e) => setCityForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                  placeholder="e.g., Lucknow"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                <input
                  type="text"
                  value={cityForm.state}
                  onChange={(e) => setCityForm(prev => ({ ...prev, state: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                  placeholder="e.g., Uttar Pradesh"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="cityActive"
                  checked={cityForm.active}
                  onChange={(e) => setCityForm(prev => ({ ...prev, active: e.target.checked }))}
                  className="w-4 h-4 text-primary-600 rounded"
                />
                <label htmlFor="cityActive" className="text-sm text-gray-700">Active</label>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowCityModal(false)}>Cancel</Button>
              <Button onClick={handleSaveCity}>
                <Save className="w-4 h-4 mr-2" />
                {editingCity ? 'Update' : 'Add'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Area Modal */}
      {showAreaModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-semibold">{editingArea ? 'Edit Area' : 'Add Area'}</h2>
              <button onClick={() => setShowAreaModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Area Name *</label>
                <input
                  type="text"
                  value={areaForm.name}
                  onChange={(e) => setAreaForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                  placeholder="e.g., Gomti Nagar"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
                <input
                  type="text"
                  value={areaForm.pincode}
                  onChange={(e) => setAreaForm(prev => ({ ...prev, pincode: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                  placeholder="e.g., 226010"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="areaActive"
                  checked={areaForm.active}
                  onChange={(e) => setAreaForm(prev => ({ ...prev, active: e.target.checked }))}
                  className="w-4 h-4 text-primary-600 rounded"
                />
                <label htmlFor="areaActive" className="text-sm text-gray-700">Active</label>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAreaModal(false)}>Cancel</Button>
              <Button onClick={handleSaveArea}>
                <Save className="w-4 h-4 mr-2" />
                {editingArea ? 'Update' : 'Add'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
