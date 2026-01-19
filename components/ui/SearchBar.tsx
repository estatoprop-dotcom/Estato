'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, Mic, MicOff } from 'lucide-react'
import Button from './Button'

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
  className?: string
}

export default function SearchBar({ 
  onSearch, 
  placeholder = 'Search properties, locations...',
  className 
}: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isListening, setIsListening] = useState(false)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    // Check if browser supports Web Speech API
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = false
        recognitionRef.current.lang = 'en-US'

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          setQuery(transcript)
          setIsListening(false)
          onSearch(transcript)
        }

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error)
          setIsListening(false)
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
        }
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [onSearch])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Voice search is not supported in your browser. Please use Chrome or Edge.')
      return
    }

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  const isVoiceSupported = typeof window !== 'undefined' && 
    ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="input-field pl-12 pr-12 w-full text-gray-900 bg-white placeholder-gray-500"
          />
          {isVoiceSupported && (
            <button
              type="button"
              onClick={toggleListening}
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-colors z-10 ${
                isListening 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'text-gray-400 hover:text-primary-600 hover:bg-gray-100'
              }`}
              title={isListening ? 'Stop listening' : 'Start voice search'}
            >
              {isListening ? (
                <MicOff className="w-5 h-5" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
        <Button type="submit" className="px-8">
          Search
        </Button>
      </div>
    </form>
  )
}
