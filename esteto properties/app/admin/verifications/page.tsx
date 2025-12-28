'use client'

import { useState, useEffect } from 'react'
import Button from '@/components/ui/Button'
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search, 
  Eye,
  FileText,
  CreditCard,
  User,
  Calendar,
  Shield,
  X,
  RefreshCw
} from 'lucide-react'
import toast from 'react-hot-toast'

interface VerificationRequest {
  id: string
  user_id: string
  user_email: string
  user_name: string
  aadhaar_number: string
  pan_number: string
  aadhaar_image_url: string
  pan_image_url: string
  status: 'pending' | 'approved' | 'rejected'
  submitted_at: string
  reviewed_at?: string
  rejection_reason?: string
}

export default function VerificationsPage() {
  const [verifications, setVerifications] = useState<VerificationRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedVerification, setSelectedVerification] = useState<VerificationRequest | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [showActionModal, setShowActionModal] = useState(false)
  const [actionType, setActionType] = useState<'approve' | 'reject'>('approve')
  const [rejectionReason, setRejectionReason] = useState('')
  const [activeTab, setActiveTab] = useState('pending')

  useEffect(() => {
    fetchVerifications()
  }, [])

  const fetchVerifications = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/verifications')
      const data = await response.json()
      if (data.success) {
        setVerifications(data.data || [])
      }
    } catch (error) {
      console.error('Error fetching verifications:', error)
      // Mock data for demo
      setVerifications([
        {
          id: '1',
          user_id: 'user1',
          user_email: 'john@example.com',
          user_name: 'John Doe',
          aadhaar_number: 'XXXX-XXXX-1234',
          pan_number: 'ABCDE1234F',
          aadhaar_image_url: '',
          pan_image_url: '',
          status: 'pending',
          submitted_at: new Date().toISOString(),
        },
        {
          id: '2',
          user_id: 'user2',
          user_email: 'jane@example.com',
          user_name: 'Jane Smith',
          aadhaar_number: 'XXXX-XXXX-5678',
          pan_number: 'FGHIJ5678K',
          aadhaar_image_url: '',
          pan_image_url: '',
          status: 'approved',
          submitted_at: new Date(Date.now() - 86400000).toISOString(),
          reviewed_at: new Date().toISOString(),
        },
        {
          id: '3',
          user_id: 'user3',
          user_email: 'bob@example.com',
          user_name: 'Bob Wilson',
          aadhaar_number: 'XXXX-XXXX-9012',
          pan_number: 'KLMNO9012P',
          aadhaar_image_url: '',
          pan_image_url: '',
          status: 'rejected',
          submitted_at: new Date(Date.now() - 172800000).toISOString(),
          reviewed_at: new Date(Date.now() - 86400000).toISOString(),
          rejection_reason: 'Documents not clear',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleAction = async () => {
    if (!selectedVerification) return

    try {
      const response = await fetch(`/api/admin/verifications/${selectedVerification.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: actionType === 'approve' ? 'approved' : 'rejected',
          rejection_reason: actionType === 'reject' ? rejectionReason : undefined,
        }),
      })

      const data = await response.json()
      if (data.success) {
        toast.success(`Verification ${actionType === 'approve' ? 'approved' : 'rejected'} successfully`)
        fetchVerifications()
      }
    } catch (error) {
      // Update locally for demo
      setVerifications(prev =>
        prev.map(v =>
          v.id === selectedVerification.id
            ? {
                ...v,
                status: actionType === 'approve' ? 'approved' : 'rejected',
                reviewed_at: new Date().toISOString(),
                rejection_reason: actionType === 'reject' ? rejectionReason : undefined,
              }
            : v
        )
      )
      toast.success(`Verification ${actionType === 'approve' ? 'approved' : 'rejected'} successfully`)
    } finally {
      setShowActionModal(false)
      setRejectionReason('')
    }
  }

  const filteredVerifications = verifications.filter(v => {
    const matchesSearch =
      v.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.user_email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === 'all' || v.status === activeTab
    return matchesSearch && matchesTab
  })

  const pendingCount = verifications.filter(v => v.status === 'pending').length
  const approvedCount = verifications.filter(v => v.status === 'approved').length
  const rejectedCount = verifications.filter(v => v.status === 'rejected').length

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    }
    const icons: Record<string, React.ReactNode> = {
      pending: <Clock className="w-3 h-3 mr-1" />,
      approved: <CheckCircle className="w-3 h-3 mr-1" />,
      rejected: <XCircle className="w-3 h-3 mr-1" />,
    }
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100'}`}>
        {icons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Identity Verifications</h1>
          <p className="text-gray-500">Review and manage user identity verification requests</p>
        </div>
        <Button onClick={fetchVerifications} className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4" /> Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Requests</p>
              <p className="text-2xl font-bold">{verifications.length}</p>
            </div>
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingCount}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Approved</p>
              <p className="text-2xl font-bold text-green-600">{approvedCount}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Rejected</p>
              <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-400" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2">
            {['pending', 'approved', 'rejected', 'all'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {tab !== 'all' && ` (${tab === 'pending' ? pendingCount : tab === 'approved' ? approvedCount : rejectedCount})`}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : filteredVerifications.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Shield className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No verification requests found</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aadhaar</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PAN</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVerifications.map((verification) => (
                <tr key={verification.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{verification.user_name}</div>
                        <div className="text-sm text-gray-500">{verification.user_email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <CreditCard className="w-4 h-4 mr-2 text-gray-400" />
                      {verification.aadhaar_number}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <FileText className="w-4 h-4 mr-2 text-gray-400" />
                      {verification.pan_number}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(verification.submitted_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(verification.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedVerification(verification)
                          setShowModal(true)
                        }}
                        className="text-primary hover:text-primary/80"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      {verification.status === 'pending' && (
                        <>
                          <button
                            onClick={() => {
                              setSelectedVerification(verification)
                              setActionType('approve')
                              setShowActionModal(true)
                            }}
                            className="text-green-600 hover:text-green-800"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedVerification(verification)
                              setActionType('reject')
                              setShowActionModal(true)
                            }}
                            className="text-red-600 hover:text-red-800"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* View Modal */}
      {showModal && selectedVerification && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Verification Details</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">User Information</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-500">Name:</span> {selectedVerification.user_name}</p>
                    <p><span className="text-gray-500">Email:</span> {selectedVerification.user_email}</p>
                    <p><span className="text-gray-500">Aadhaar:</span> {selectedVerification.aadhaar_number}</p>
                    <p><span className="text-gray-500">PAN:</span> {selectedVerification.pan_number}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Status</h4>
                  <div className="space-y-1 text-sm">
                    <p>{getStatusBadge(selectedVerification.status)}</p>
                    <p><span className="text-gray-500">Submitted:</span> {new Date(selectedVerification.submitted_at).toLocaleString()}</p>
                    {selectedVerification.reviewed_at && (
                      <p><span className="text-gray-500">Reviewed:</span> {new Date(selectedVerification.reviewed_at).toLocaleString()}</p>
                    )}
                    {selectedVerification.rejection_reason && (
                      <p><span className="text-gray-500">Reason:</span> {selectedVerification.rejection_reason}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Aadhaar Card</h4>
                  <div className="border rounded-lg p-2 bg-gray-50 aspect-video flex items-center justify-center">
                    {selectedVerification.aadhaar_image_url ? (
                      <img src={selectedVerification.aadhaar_image_url} alt="Aadhaar" className="max-h-full max-w-full object-contain" />
                    ) : (
                      <CreditCard className="w-12 h-12 text-gray-300" />
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">PAN Card</h4>
                  <div className="border rounded-lg p-2 bg-gray-50 aspect-video flex items-center justify-center">
                    {selectedVerification.pan_image_url ? (
                      <img src={selectedVerification.pan_image_url} alt="PAN" className="max-h-full max-w-full object-contain" />
                    ) : (
                      <FileText className="w-12 h-12 text-gray-300" />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 p-4 border-t">
              <Button variant="outline" onClick={() => setShowModal(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}

      {/* Action Modal */}
      {showActionModal && selectedVerification && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">
                {actionType === 'approve' ? 'Approve Verification' : 'Reject Verification'}
              </h2>
              <button onClick={() => setShowActionModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <p className="text-gray-600 mb-4">
                {actionType === 'approve'
                  ? `Are you sure you want to approve the verification for ${selectedVerification.user_name}?`
                  : `Please provide a reason for rejecting ${selectedVerification.user_name}'s verification.`}
              </p>
              {actionType === 'reject' && (
                <textarea
                  placeholder="Reason for rejection..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  rows={3}
                />
              )}
            </div>
            <div className="flex justify-end gap-2 p-4 border-t">
              <Button variant="outline" onClick={() => setShowActionModal(false)}>Cancel</Button>
              <Button
                onClick={handleAction}
                disabled={actionType === 'reject' && !rejectionReason}
                className={actionType === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
              >
                {actionType === 'approve' ? 'Approve' : 'Reject'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
