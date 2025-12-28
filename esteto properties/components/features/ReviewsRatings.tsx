'use client'

import { useState } from 'react'
import { Star, ThumbsUp, MessageSquare, User, Camera, Filter, ChevronDown } from 'lucide-react'
import Button from '@/components/ui/Button'

interface Review {
  id: string
  userName: string
  rating: number
  title: string
  review: string
  pros: string[]
  cons: string[]
  date: string
  helpful: number
  isVerified: boolean
  images?: string[]
}

const mockReviews: Review[] = [
  {
    id: '1',
    userName: 'Rahul Sharma',
    rating: 5,
    title: 'Excellent property, highly recommended!',
    review: 'This is one of the best properties I have seen in Gomti Nagar. The construction quality is top-notch, and the amenities are world-class. The location is perfect with easy access to malls, schools, and hospitals.',
    pros: ['Great location', 'Modern amenities', 'Good ventilation', 'Spacious rooms'],
    cons: ['Slightly expensive', 'Parking could be better'],
    date: '2024-01-15',
    helpful: 24,
    isVerified: true,
    images: []
  },
  {
    id: '2',
    userName: 'Priya Verma',
    rating: 4,
    title: 'Good value for money',
    review: 'The property offers good value for the price. The builder has maintained quality standards. The only issue is the distance from the main road, but auto-rickshaws are easily available.',
    pros: ['Affordable', 'Good construction', 'Peaceful area'],
    cons: ['Distance from main road'],
    date: '2024-01-10',
    helpful: 18,
    isVerified: true
  },
  {
    id: '3',
    userName: 'Amit Kumar',
    rating: 4,
    title: 'Nice apartment with good amenities',
    review: 'I recently purchased a 3BHK here. The apartment is well-designed with good natural light. The clubhouse and swimming pool are well-maintained. Security is 24/7.',
    pros: ['Good design', 'Well-maintained', '24/7 security'],
    cons: ['Maintenance charges are high'],
    date: '2024-01-05',
    helpful: 12,
    isVerified: false
  }
]

interface ReviewsRatingsProps {
  propertyId?: string
  type?: 'property' | 'locality' | 'agent'
}

export default function ReviewsRatings({ propertyId, type = 'property' }: ReviewsRatingsProps) {
  const [reviews, setReviews] = useState<Review[]>(mockReviews)
  const [showWriteReview, setShowWriteReview] = useState(false)
  const [sortBy, setSortBy] = useState('recent')
  const [filterRating, setFilterRating] = useState<number | null>(null)
  
  // New review form
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: '',
    review: '',
    pros: [''],
    cons: ['']
  })

  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  const ratingCounts = [5, 4, 3, 2, 1].map(r => reviews.filter(rev => rev.rating === r).length)

  const handleHelpful = (reviewId: string) => {
    setReviews(prev => prev.map(r => 
      r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r
    ))
  }

  const submitReview = () => {
    const review: Review = {
      id: Date.now().toString(),
      userName: 'You',
      rating: newReview.rating,
      title: newReview.title,
      review: newReview.review,
      pros: newReview.pros.filter(p => p),
      cons: newReview.cons.filter(c => c),
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
      isVerified: false
    }
    setReviews(prev => [review, ...prev])
    setShowWriteReview(false)
    setNewReview({ rating: 0, title: '', review: '', pros: [''], cons: [''] })
  }

  const filteredReviews = reviews
    .filter(r => !filterRating || r.rating === filterRating)
    .sort((a, b) => {
      if (sortBy === 'helpful') return b.helpful - a.helpful
      if (sortBy === 'rating_high') return b.rating - a.rating
      if (sortBy === 'rating_low') return a.rating - b.rating
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6 text-white">
        <div className="flex items-center gap-3">
          <Star className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Reviews & Ratings</h2>
            <p className="text-yellow-100">What people are saying</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Summary */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* Overall Rating */}
          <div className="flex-shrink-0 text-center p-6 bg-yellow-50 rounded-2xl">
            <p className="text-5xl font-bold text-yellow-600">{avgRating.toFixed(1)}</p>
            <div className="flex justify-center gap-1 my-2">
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${star <= Math.round(avgRating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-600">{reviews.length} reviews</p>
          </div>

          {/* Rating Distribution */}
          <div className="flex-1 space-y-2">
            {[5, 4, 3, 2, 1].map((rating, i) => (
              <button
                key={rating}
                onClick={() => setFilterRating(filterRating === rating ? null : rating)}
                className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                  filterRating === rating ? 'bg-yellow-100' : 'hover:bg-gray-50'
                }`}
              >
                <span className="text-sm w-12">{rating} star</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-500 rounded-full"
                    style={{ width: `${(ratingCounts[5 - rating] / reviews.length) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500 w-8">{ratingCounts[5 - rating]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Button variant="gradient" onClick={() => setShowWriteReview(true)}>
            <MessageSquare className="w-4 h-4 mr-2" />
            Write a Review
          </Button>
          
          <div className="flex gap-2 ml-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
            >
              <option value="recent">Most Recent</option>
              <option value="helpful">Most Helpful</option>
              <option value="rating_high">Highest Rating</option>
              <option value="rating_low">Lowest Rating</option>
            </select>
          </div>
        </div>

        {/* Write Review Form */}
        {showWriteReview && (
          <div className="mb-6 p-6 bg-gray-50 rounded-2xl">
            <h3 className="text-lg font-semibold mb-4">Write Your Review</h3>
            
            {/* Rating */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                    className="p-1"
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        star <= newReview.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 hover:text-yellow-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Review Title</label>
              <input
                type="text"
                value={newReview.title}
                onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Summarize your experience"
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Review */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
              <textarea
                value={newReview.review}
                onChange={(e) => setNewReview(prev => ({ ...prev, review: e.target.value }))}
                placeholder="Share your experience with this property..."
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 resize-none"
                rows={4}
              />
            </div>

            {/* Pros & Cons */}
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-green-700 mb-2">Pros</label>
                {newReview.pros.map((pro, i) => (
                  <input
                    key={i}
                    type="text"
                    value={pro}
                    onChange={(e) => {
                      const newPros = [...newReview.pros]
                      newPros[i] = e.target.value
                      if (i === newPros.length - 1 && e.target.value) newPros.push('')
                      setNewReview(prev => ({ ...prev, pros: newPros }))
                    }}
                    placeholder="Add a pro..."
                    className="w-full p-2 mb-2 border border-green-200 rounded-lg focus:outline-none focus:border-green-500 text-sm"
                  />
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium text-red-700 mb-2">Cons</label>
                {newReview.cons.map((con, i) => (
                  <input
                    key={i}
                    type="text"
                    value={con}
                    onChange={(e) => {
                      const newCons = [...newReview.cons]
                      newCons[i] = e.target.value
                      if (i === newCons.length - 1 && e.target.value) newCons.push('')
                      setNewReview(prev => ({ ...prev, cons: newCons }))
                    }}
                    placeholder="Add a con..."
                    className="w-full p-2 mb-2 border border-red-200 rounded-lg focus:outline-none focus:border-red-500 text-sm"
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowWriteReview(false)}>
                Cancel
              </Button>
              <Button 
                variant="gradient" 
                onClick={submitReview}
                disabled={!newReview.rating || !newReview.review}
              >
                Submit Review
              </Button>
            </div>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.map(review => (
            <div key={review.id} className="border-b pb-6 last:border-b-0">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{review.userName}</span>
                    {review.isVerified && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                        Verified
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                  </div>

                  <h4 className="font-medium mb-2">{review.title}</h4>
                  <p className="text-gray-600 text-sm mb-3">{review.review}</p>

                  {/* Pros & Cons */}
                  <div className="flex flex-wrap gap-4 mb-3">
                    {review.pros.length > 0 && (
                      <div>
                        <span className="text-xs font-medium text-green-700">Pros: </span>
                        {review.pros.map((pro, i) => (
                          <span key={i} className="text-xs text-green-600">
                            {pro}{i < review.pros.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </div>
                    )}
                    {review.cons.length > 0 && (
                      <div>
                        <span className="text-xs font-medium text-red-700">Cons: </span>
                        {review.cons.map((con, i) => (
                          <span key={i} className="text-xs text-red-600">
                            {con}{i < review.cons.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleHelpful(review.id)}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-purple-600 transition-colors"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    Helpful ({review.helpful})
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No reviews found</p>
          </div>
        )}
      </div>
    </div>
  )
}
