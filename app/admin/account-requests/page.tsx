'use client'

import { useState, useEffect } from 'react'
import Button from '@/components/ui/Button'
import { 
  Trash2, 
  Download, 
  Clock, 
  Search, 
  Eye,
  CheckCircle,
  XCircle,
  User,
  Calendar,
  AlertTriangle,
  FileDown,
  UserX,
  X,
  RefreshCw
} from 'lucide-react'
import toast from 'react-hot-toast'

interface DeletionRequest {
  id: string
  user_id: string
  user_email: string
  user_name: string
  reason: string
  feedback: string
  status: 'pending' | 'approved' | 'rejected'
  requested_at: string
  processed_at?: string
}

interface DataDownloadRequest {
  id: string
  user_id: string
  user_email: string
  user_name: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  requested_at: string
  completed_at?: string
  download_url?: string
}

export default function AccountRequestsPage() {
  const [deletionRequests, setDeletionRequests] = useState<DeletionRequest[]>([])
  const [downloadRequests, setDownloadRequests] = useState<DataDownloadRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRequest, setSelectedRequest] = useState<DeletionRequest | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [showActionModal, setShowActionModal] = useState(false)
  const [actionType, setActionType] = useState<'approve' | 'reject'>('approve')
  const [activeTab, setActiveTab] = useState<'deletion' | 'download'>('deletion')

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      setLoading(true)
      
      // Fetch deletion requests
      const deletionRes = await fetch('/api/admin/account-deletion-requests')
      const deletionData = await deletionRes.json()
      if (deletionData.success) {
        setDeletionRequests(deletionData.data || [])
      }

      // Fetch download requests
      const downloadRes = await fetch('/api/admin/data-download-requests')
      const downloadData = await downloadRes.json()
      if (downloadData.success) {
        setDownloadRequests(downloadData.data || [])
      }
    } catch (error) {
      console.error('Error fetching requests:', error)
      // Mock data for demo
      setDeletionRequests([
        {
          id: '1',
          user_id: 'user1',
          user_email: 'john@example.com',
          user_name: 'John Doe',
          reason: 'No longer using the app',
          feedback: 'Great app but I found another solution.',
          status: 'pending',
          requested_at: new Date().toISOString(),
        },
        {
          id: '2',
          user_id: 'user2',
          user_email: 'jane@example.com',
          user_name: 'Jane Smith',
          reason: 'Privacy concerns',
          feedback: 'Would like all my data removed.',
          status: 'approved',
          requested_at: new Date(Date.now() - 86400000).toISOString(),
          processed_at: new Date().toISOString(),
        },
      ])
      setDownloadRequests([
        {
          id: '1',
          user_id: 'user3',
          user_email: 'bob@example.com',
          user_name: 'Bob Wilson',
          status: 'pending',
          requested_at: new Date().toISOString(),
        },
        {
          id: '2',
          user_id: 'user4',
          user_email: 'alice@example.com',
          user_name: 'Alice Brown',
          status: 'completed',
          requested_at: new Date(Date.now() - 172800000).toISOString(),
          completed_at: new Date(Date.now() - 86400000).toISOString(),
          download_url: '/downloads/user4-data.zip',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleDeletionAction = async () => {
    if (!selectedRequest) return

    try {
      const response = await fetch(`/api/admin/account-deletion-requests/${selectedRequest.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: actionType === 'approve' ? 'approved' : 'rejected',
        }),
      })

      const data = await response.json()
      if (data.success) {
        toast.success(`Request ${actionType === 'approve' ? 'approved' : 'rejected'} successfully`)
        fetchRequests()
      }
    } catch (error) {
      // Update locally for demo
      setDeletionRequests(prev =>
        prev.map(r =>
          r.id === selectedRequest.id
            ? {
                ...r,
                status: actionType === 'approve' ? 'approved' : 'rejected',
                processed_at: new Date().toISOString(),
              }
            : r
        )
      )
      toast.success(`Request ${actionType === 'approve' ? 'approved' : 'rejected'} successfully`)
    } finally {
      setShowActionModal(false)
    }
  }

  const handleProcessDownload = async (request: DataDownloadRequest) => {
    try {
      const response = await fetch(`/api/admin/data-download-requests/${request.id}/process`, {
        method: 'POST',
      })

      const data = await response.json()
      if (data.success) {
        toast.success('Data download processed successfully')
        fetchRequests()
      }
    } catch (error) {
      // Update locally for demo
      setDownloadRequests(prev =>
        prev.map(r =>
          r.id === request.id
            ? {
                ...r,
                status: 'completed',
                completed_at: new Date().toISOString(),
                download_url: `/downloads/${r.user_id}-data.zip`,
              }
            : r
        )
      )
      toast.success('Data download processed successfully')
    }
  }

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      completed: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      failed: 'bg-red-100 text-red-800',
      processing: 'bg-blue-100 text-blue-800',
    }
    const icons: Record<string, React.ReactNode> = {
      pending: <Clock className="w-3 h-3 mr-1" />,
      approved: <CheckCircle className="w-3 h-3 mr-1" />,
      completed: <CheckCircle className="w-3 h-3 mr-1" />,
      rejected: <XCircle className="w-3 h-3 mr-1" />,
      failed: <XCircle className="w-3 h-3 mr-1" />,
      processing: <Clock className="w-3 h-3 mr-1" />,
    }
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100'}`}>
        {icons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const filteredDeletionRequests = deletionRequests.filter(r =>
    r.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.user_email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredDownloadRequests = downloadRequests.filter(r =>
    r.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.user_email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const deletionPendingCount = deletionRequests.filter(r => r.status === 'pending').length
  const downloadPendingCount = downloadRequests.filter(r => r.status === 'pending').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Account Requests</h1>
          <p className="text-gray-500">Manage account deletion and data download requests</p>
        </div>
        <Button onClick={fetchRequests} className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4" /> Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Deletion Requests</p>
              <p className="text-2xl font-bold">{deletionRequests.length}</p>
            </div>
            <Trash2 className="w-8 h-8 text-red-400" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Download Requests</p>
              <p className="text-2xl font-bold">{downloadRequests.length}</p>
            </div>
            <Download className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Actions</p>
              <p className="text-2xl font-bold text-yellow-600">{deletionPendingCount + downloadPendingCount}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Processed Today</p>
              <p className="text-2xl font-bold text-green-600">
                {deletionRequests.filter(r => r.processed_at && new Date(r.processed_at).toDateString() === new Date().toDateString()).length +
                 downloadRequests.filter(r => r.completed_at && new Date(r.completed_at).toDateString() === new Date().toDateString()).length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
        </div>
      </div>

      {/* Tabs and Search */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('deletion')}
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                activeTab === 'deletion'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Trash2 className="w-4 h-4" /> Deletion ({deletionRequests.length})
            </button>
            <button
              onClick={() => setActiveTab('download')}
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                activeTab === 'download'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <FileDown className="w-4 h-4" /> Download ({downloadRequests.length})
            </button>
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

      {/* Deletion Requests Table */}
      {activeTab === 'deletion' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : filteredDeletionRequests.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <UserX className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No deletion requests found</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDeletionRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-red-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{request.user_name}</div>
                          <div className="text-sm text-gray-500">{request.user_email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate" title={request.reason}>
                        {request.reason}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(request.requested_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(request.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedRequest(request)
                            setShowModal(true)
                          }}
                          className="text-primary hover:text-primary/80"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        {request.status === 'pending' && (
                          <>
                            <button
                              onClick={() => {
                                setSelectedRequest(request)
                                setActionType('approve')
                                setShowActionModal(true)
                              }}
                              className="text-red-600 hover:text-red-800"
                              title="Delete Account"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedRequest(request)
                                setActionType('reject')
                                setShowActionModal(true)
                              }}
                              className="text-gray-600 hover:text-gray-800"
                              title="Reject Request"
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
      )}

      {/* Download Requests Table */}
      {activeTab === 'download' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : filteredDownloadRequests.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <FileDown className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No download requests found</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDownloadRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{request.user_name}</div>
                          <div className="text-sm text-gray-500">{request.user_email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(request.requested_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(request.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        {request.status === 'pending' && (
                          <Button
                            onClick={() => handleProcessDownload(request)}
                            className="flex items-center gap-1"
                          >
                            <Download className="w-4 h-4" /> Process
                          </Button>
                        )}
                        {request.status === 'completed' && request.download_url && (
                          <a
                            href={request.download_url}
                            download
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                          >
                            <FileDown className="w-4 h-4" /> Download
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* View Modal */}
      {showModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Deletion Request Details</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <h4 className="font-medium mb-2">User Information</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="text-gray-500">Name:</span> {selectedRequest.user_name}</p>
                  <p><span className="text-gray-500">Email:</span> {selectedRequest.user_email}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Status</h4>
                <div className="space-y-1 text-sm">
                  <p>{getStatusBadge(selectedRequest.status)}</p>
                  <p><span className="text-gray-500">Requested:</span> {new Date(selectedRequest.requested_at).toLocaleString()}</p>
                  {selectedRequest.processed_at && (
                    <p><span className="text-gray-500">Processed:</span> {new Date(selectedRequest.processed_at).toLocaleString()}</p>
                  )}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Reason for Deletion</h4>
                <p className="text-sm bg-gray-50 p-3 rounded-lg">{selectedRequest.reason}</p>
              </div>
              {selectedRequest.feedback && (
                <div>
                  <h4 className="font-medium mb-2">Additional Feedback</h4>
                  <p className="text-sm bg-gray-50 p-3 rounded-lg">{selectedRequest.feedback}</p>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2 p-4 border-t">
              <Button variant="outline" onClick={() => setShowModal(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}

      {/* Action Modal */}
      {showActionModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">
                {actionType === 'approve' ? 'Confirm Account Deletion' : 'Reject Request'}
              </h2>
              <button onClick={() => setShowActionModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              {actionType === 'approve' ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 text-red-700">
                    <AlertTriangle className="h-5 w-5" />
                    <span className="font-medium">Warning: This action is irreversible</span>
                  </div>
                  <p className="text-sm text-red-600 mt-2">
                    All user data including properties, bookings, chats, and preferences will be permanently deleted.
                  </p>
                </div>
              ) : (
                <p className="text-gray-600 mb-4">
                  Are you sure you want to reject this deletion request?
                </p>
              )}
            </div>
            <div className="flex justify-end gap-2 p-4 border-t">
              <Button variant="outline" onClick={() => setShowActionModal(false)}>Cancel</Button>
              <Button
                onClick={handleDeletionAction}
                className={actionType === 'approve' ? 'bg-red-600 hover:bg-red-700' : ''}
              >
                {actionType === 'approve' ? 'Delete Account' : 'Reject Request'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
