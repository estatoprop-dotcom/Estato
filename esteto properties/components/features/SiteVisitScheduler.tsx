'use client'

import { useState } from 'react'
import { Calendar, Clock, MapPin, Phone, User, CheckCircle, Video, Home, RotateCcw } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

interface TimeSlot {
  time: string
  available: boolean
}

interface DaySlots {
  date: string
  dayName: string
  slots: TimeSlot[]
}

const visitTypes = [
  { id: 'in_person', label: 'In-Person Visit', icon: Home, description: 'Visit the property physically' },
  { id: 'video_call', label: 'Video Call', icon: Video, description: 'Virtual tour via video call' },
  { id: 'virtual_tour', label: '360° Virtual Tour', icon: RotateCcw, description: 'Self-guided virtual tour' }
]

// Generate available slots for next 14 days
const generateSlots = (): DaySlots[] => {
  const slots: DaySlots[] = []
  const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM']
  
  for (let i = 1; i <= 14; i++) {
    const date = new Date()
    date.setDate(date.getDate() + i)
    
    const dayOfWeek = date.getDay()
    const availableTimeSlots = dayOfWeek === 0 ? timeSlots.slice(2, 6) : timeSlots
    
    slots.push({
      date: date.toISOString().split('T')[0],
      dayName: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      slots: availableTimeSlots.map(time => ({
        time,
        available: Math.random() > 0.3
      }))
    })
  }
  
  return slots
}

interface SiteVisitSchedulerProps {
  propertyId?: string
  propertyTitle?: string
  propertyLocation?: string
}

export default function SiteVisitScheduler({ 
  propertyId = 'demo',
  propertyTitle = 'Luxury 3BHK in Gomti Nagar',
  propertyLocation = 'Gomti Nagar, Lucknow'
}: SiteVisitSchedulerProps) {
  const [step, setStep] = useState(1)
  const [visitType, setVisitType] = useState('in_person')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    notes: ''
  })
  const [loading, setLoading] = useState(false)
  const [booked, setBooked] = useState(false)
  
  const [availableSlots] = useState<DaySlots[]>(generateSlots())

  const updateForm = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setLoading(false)
    setBooked(true)
  }

  const selectedDaySlots = availableSlots.find(d => d.date === selectedDate)

  if (booked) {
    return (
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-white text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Visit Scheduled!</h2>
          <p className="text-green-100">Your site visit has been confirmed</p>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-semibold mb-3">Visit Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Home className="w-4 h-4 text-gray-400" />
                <span>{propertyTitle}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>{propertyLocation}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>{availableSlots.find(d => d.date === selectedDate)?.dayName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>{selectedTime}</span>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 rounded-xl p-4">
            <p className="text-sm text-purple-800">
              <strong>What's next?</strong><br />
              Our agent will call you at <strong>{formData.phone}</strong> to confirm the visit within 30 minutes.
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setBooked(false)}>
              Schedule Another
            </Button>
            <Button variant="gradient" className="flex-1">
              View My Visits
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
        <div className="flex items-center gap-3">
          <Calendar className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Schedule Site Visit</h2>
            <p className="text-orange-100">Book a visit for {propertyTitle}</p>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="px-6 pt-6">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                s <= step ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {s}
              </div>
              {s < 3 && (
                <div className={`w-20 h-1 mx-2 ${s < step ? 'bg-orange-500' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Visit Type</span>
          <span>Date & Time</span>
          <span>Your Details</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">How would you like to visit?</h3>
            
            <div className="space-y-3">
              {visitTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => setVisitType(type.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                    visitType === type.id
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    visitType === type.id ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <type.icon className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">{type.label}</p>
                    <p className="text-sm text-gray-500">{type.description}</p>
                  </div>
                  {visitType === type.id && (
                    <CheckCircle className="w-6 h-6 text-orange-500 ml-auto" />
                  )}
                </button>
              ))}
            </div>

            <Button variant="gradient" className="w-full !bg-gradient-to-r !from-orange-500 !to-red-500" onClick={() => setStep(2)}>
              Continue
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Select Date & Time</h3>
            
            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {availableSlots.slice(0, 7).map(day => (
                  <button
                    key={day.date}
                    onClick={() => { setSelectedDate(day.date); setSelectedTime(''); }}
                    className={`flex-shrink-0 w-20 p-3 rounded-xl border-2 text-center transition-all ${
                      selectedDate === day.date
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-orange-300'
                    }`}
                  >
                    <p className="text-xs text-gray-500">{day.dayName.split(' ')[0]}</p>
                    <p className="text-lg font-bold">{day.dayName.split(' ')[2]}</p>
                    <p className="text-xs text-gray-500">{day.dayName.split(' ')[1]}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            {selectedDate && selectedDaySlots && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
                <div className="grid grid-cols-3 gap-2">
                  {selectedDaySlots.slots.map((slot, i) => (
                    <button
                      key={i}
                      onClick={() => slot.available && setSelectedTime(slot.time)}
                      disabled={!slot.available}
                      className={`p-3 rounded-xl border-2 text-sm transition-all ${
                        selectedTime === slot.time
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : slot.available
                            ? 'border-gray-200 hover:border-orange-300'
                            : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <Clock className="w-4 h-4 mx-auto mb-1" />
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button 
                variant="gradient" 
                className="flex-1 !bg-gradient-to-r !from-orange-500 !to-red-500" 
                onClick={() => setStep(3)}
                disabled={!selectedDate || !selectedTime}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Your Contact Details</h3>
            
            <div className="bg-orange-50 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-5 h-5 text-orange-600" />
                <span>{availableSlots.find(d => d.date === selectedDate)?.dayName} at {selectedTime}</span>
              </div>
            </div>

            <Input
              label="Full Name *"
              value={formData.name}
              onChange={(e) => updateForm('name', e.target.value)}
              placeholder="Enter your name"
              icon={<User className="w-4 h-4" />}
            />

            <Input
              label="Phone Number *"
              type="tel"
              value={formData.phone}
              onChange={(e) => updateForm('phone', e.target.value)}
              placeholder="Enter 10-digit number"
              icon={<Phone className="w-4 h-4" />}
            />

            <Input
              label="Email (Optional)"
              type="email"
              value={formData.email}
              onChange={(e) => updateForm('email', e.target.value)}
              placeholder="Enter your email"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
              <textarea
                value={formData.notes}
                onChange={(e) => updateForm('notes', e.target.value)}
                placeholder="Any specific requirements or questions?"
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 resize-none"
                rows={3}
              />
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button 
                variant="gradient" 
                className="flex-1 !bg-gradient-to-r !from-orange-500 !to-red-500" 
                onClick={handleSubmit}
                loading={loading}
                disabled={!formData.name || !formData.phone}
              >
                Confirm Visit
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
