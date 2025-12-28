'use client'

import { useState } from 'react'
import { Heart, Share2, Trash2, TrendingUp, TrendingDown, Bell, MapPin, Bed, Bath, Maximize, ExternalLink } from 'lucide-react'
import Button from '@/components/ui/Button'

interface WishlistItem {
  id: string
  propertyId: string
  title: string
  location: string
  price: number
  priceAtAdd: number
  area: number
  bedrooms: number
  bathrooms: number
  image: string
  addedAt: string
  notes?: string
}

const mockWishlist: WishlistItem[] = [
  {
    id: '1',
    propertyId: 'prop_1',
    title: 'Luxury 3BHK in Gomti Nagar',
    location: 'Gomti Nagar, Lucknow',
    price: 8500000,
    priceAtAdd: 8200000,
    area: 1650,
    bedrooms: 3,
    bathrooms: 3,
    image: '/property1.jpg',
    addedAt: '2024-01-15',
    notes: 'Great location, need to visit'
  },
  {
    id: '2',
    propertyId: 'prop_2',
    title: 'Modern 2BHK Apartment',
    location: 'Aliganj, Lucknow',
    price: 4500000,
    priceAtAdd: 4700000,
    area: 1100,
    bedrooms: 2,
    bathrooms: 2,
    image: '/property2.jpg',
    addedAt: '2024-01-10'
  },
  {
    id: '3',
    propertyId: 'prop_3',
    title: 'Spacious 4BHK Villa',
    location: 'Sushant Golf City, Lucknow',
    price: 12500000,
    priceAtAdd: 12500000,
    area: 2200,
    bedrooms: 4,
    bathrooms: 4,
    image: '/property3.jpg',
    addedAt: '2024-01-05'
  }
]

export default function Wishlist() {
  const [items, setItems] = useState<WishlistItem[]>(mockWishlist)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [showShareModal, setShowShareModal] = useState(false)

  const formatPrice = (price: number) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`
    return `₹${(price / 100000).toFixed(2)} L`
  }

  const getPriceChange = (current: number, original: number) => {
    const change = current - original
    const percent = ((change / original) * 100).toFixed(1)
    return { change, percent, isUp: change > 0, isDown: change < 0 }
  }

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
    setSelectedItems(prev => prev.filter(itemId => itemId !== id))
  }

  const toggleSelect = (id: string) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const selectAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(items.map(i => i.id))
    }
  }

  const priceDrops = items.filter(i => i.price < i.priceAtAdd).length
  const priceIncreases = items.filter(i => i.price > i.priceAtAdd).length

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Heart className="w-8 h-8" />
            <div>
              <h2 className="text-2xl font-bold">My Wishlist</h2>
              <p className="text-pink-100">{items.length} properties saved</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="!text-white !border-white hover:!bg-white/20"
              onClick={() => setShowShareModal(true)}
              disabled={selectedItems.length === 0}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share ({selectedItems.length})
            </Button>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {(priceDrops > 0 || priceIncreases > 0) && (
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 border-b flex items-center gap-4">
          <Bell className="w-5 h-5 text-orange-500" />
          <div className="flex gap-4 text-sm">
            {priceDrops > 0 && (
              <span className="flex items-center gap-1 text-green-600">
                <TrendingDown className="w-4 h-4" />
                {priceDrops} price drop{priceDrops > 1 ? 's' : ''}
              </span>
            )}
            {priceIncreases > 0 && (
              <span className="flex items-center gap-1 text-red-600">
                <TrendingUp className="w-4 h-4" />
                {priceIncreases} price increase{priceIncreases > 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Select All */}
        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedItems.length === items.length && items.length > 0}
              onChange={selectAll}
              className="w-4 h-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
            />
            <span className="text-sm text-gray-600">Select All</span>
          </label>
          {selectedItems.length > 0 && (
            <button
              onClick={() => selectedItems.forEach(id => removeItem(id))}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Remove Selected
            </button>
          )}
        </div>

        {/* Wishlist Items */}
        <div className="space-y-4">
          {items.map(item => {
            const priceInfo = getPriceChange(item.price, item.priceAtAdd)
            
            return (
              <div
                key={item.id}
                className={`border rounded-xl overflow-hidden transition-all ${
                  selectedItems.includes(item.id) ? 'border-pink-500 bg-pink-50' : 'border-gray-200 hover:border-pink-300'
                }`}
              >
                <div className="flex">
                  {/* Checkbox */}
                  <div className="p-4 flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleSelect(item.id)}
                      className="w-4 h-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                    />
                  </div>

                  {/* Image */}
                  <div className="w-32 h-32 bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center text-white text-4xl flex-shrink-0">
                    🏠
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800">{item.title}</h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {item.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-pink-600">{formatPrice(item.price)}</p>
                        {priceInfo.change !== 0 && (
                          <p className={`text-sm flex items-center justify-end gap-1 ${
                            priceInfo.isDown ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {priceInfo.isDown ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                            {priceInfo.isDown ? '-' : '+'}{formatPrice(Math.abs(priceInfo.change))} ({priceInfo.percent}%)
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Bed className="w-4 h-4" />
                        {item.bedrooms} BHK
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath className="w-4 h-4" />
                        {item.bathrooms} Bath
                      </span>
                      <span className="flex items-center gap-1">
                        <Maximize className="w-4 h-4" />
                        {item.area} sq.ft
                      </span>
                    </div>

                    {item.notes && (
                      <p className="mt-2 text-sm text-gray-500 italic">"{item.notes}"</p>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-gray-400">
                        Added {new Date(item.addedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                      <div className="flex gap-2">
                        <button className="p-2 text-gray-400 hover:text-pink-600 transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {items.length === 0 && (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-400 mb-4">Save properties you like to compare them later</p>
            <Button variant="gradient">Browse Properties</Button>
          </div>
        )}

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <h3 className="text-lg font-semibold mb-4">Share Wishlist</h3>
              <p className="text-gray-600 mb-4">
                Share {selectedItems.length} selected properties with friends or family.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <p className="text-sm text-gray-500 mb-1">Shareable Link</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={`https://estatoprop.com/wishlist/share/${Date.now()}`}
                    className="flex-1 p-2 bg-white border rounded text-sm"
                  />
                  <Button variant="primary" size="sm">Copy</Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setShowShareModal(false)}>
                  Cancel
                </Button>
                <Button variant="gradient" className="flex-1">
                  Share via WhatsApp
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
