import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { usersAPI } from '../services/api'
import { Card, CardBody, CardHeader } from '../components/Card'
import { TextInput } from '../components/Input'
import { Button } from '../components/Button'
import { Alert } from '../components/Alert'
import { LoadingSpinner } from '../components/LoadingSpinner'

export function ProfilePage() {
  const { user } = useAuth()
  const [profile, setProfile] = useState(user)
  const [myListings, setMyListings] = useState([])
  const [claimedItems, setClaimedItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [activeTab, setActiveTab] = useState('profile')

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      setLoading(true)
      const [profileRes, listingsRes, claimedRes] = await Promise.all([
        usersAPI.getProfile(),
        usersAPI.getMyListings(),
        usersAPI.getMyClaimedItems(),
      ])
      setProfile(profileRes.data)
      setMyListings(listingsRes.data)
      setClaimedItems(claimedRes.data)
    } catch (err) {
      setError('Failed to load profile data')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    try {
      await usersAPI.updateProfile({
        name: profile.name,
        phone: profile.phone,
        location: profile.location,
      })
      setSuccess('Profile updated successfully!')
      setEditing(false)
      setError('')
    } catch (err) {
      setError('Failed to update profile')
    }
  }

  if (loading) {
    return (
      <div className="container py-16">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <aside className="lg:col-span-1">
          <Card>
            <CardBody className="text-center py-8">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">{user?.name}</h2>
              <p className="text-gray-600 text-sm mb-4">{user?.email}</p>
              <Button
                variant="primary"
                size="sm"
                className="w-full"
                onClick={() => setEditing(!editing)}
              >
                {editing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </CardBody>
          </Card>

          <Card className="mt-6">
            <CardBody className="py-6">
              <h3 className="font-semibold text-gray-900 mb-4">Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Food Posted</span>
                  <span className="font-bold text-primary-600">{myListings.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Items Claimed</span>
                  <span className="font-bold text-primary-600">{claimedItems.length}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-200">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-bold text-primary-600">
                    {new Date(user?.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </aside>

        <main className="lg:col-span-2">
          <div className="flex gap-4 border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-3 border-b-2 font-medium transition-colors ${
                activeTab === 'profile'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('listings')}
              className={`px-6 py-3 border-b-2 font-medium transition-colors ${
                activeTab === 'listings'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              My Listings
            </button>
            <button
              onClick={() => setActiveTab('claimed')}
              className={`px-6 py-3 border-b-2 font-medium transition-colors ${
                activeTab === 'claimed'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Claimed Items
            </button>
          </div>

          {error && <Alert type="error" message={error} onClose={() => setError('')} />}
          {success && <Alert type="success" message={success} />}

          {activeTab === 'profile' && (
            <Card>
              <CardBody className="p-8">
                {editing ? (
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <TextInput
                      label="Full Name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                    <TextInput
                      label="Email"
                      type="email"
                      value={profile.email}
                      disabled
                    />
                    <TextInput
                      label="Phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                    <TextInput
                      label="Location"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    />
                    <Button variant="primary" type="submit" className="w-full">
                      Save Changes
                    </Button>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Email Address</p>
                      <p className="text-lg font-medium text-gray-900">{profile.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Phone Number</p>
                      <p className="text-lg font-medium text-gray-900">{profile.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Location</p>
                      <p className="text-lg font-medium text-gray-900">{profile.location}</p>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600 mb-1">Member Since</p>
                      <p className="text-lg font-medium text-gray-900">
                        {new Date(profile.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
          )}

          {activeTab === 'listings' && (
            <div>
              {myListings.length === 0 ? (
                <Card>
                  <CardBody className="text-center py-12">
                    <p className="text-gray-600 text-lg mb-4">You haven't posted any food yet.</p>
                  </CardBody>
                </Card>
              ) : (
                <div className="space-y-4">
                  {myListings.map(listing => (
                    <Card key={listing.id}>
                      <CardBody className="p-6">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{listing.title}</h3>
                            <p className="text-sm text-gray-500">{listing.category}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            listing.claimed_by
                              ? 'bg-green-100 text-green-700'
                              : 'bg-primary-100 text-primary-700'
                          }`}>
                            {listing.claimed_by ? 'Claimed' : 'Available'}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">{listing.description}</p>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'claimed' && (
            <div>
              {claimedItems.length === 0 ? (
                <Card>
                  <CardBody className="text-center py-12">
                    <p className="text-gray-600 text-lg mb-4">You haven't claimed any food yet.</p>
                  </CardBody>
                </Card>
              ) : (
                <div className="space-y-4">
                  {claimedItems.map(item => (
                    <Card key={item.id}>
                      <CardBody className="p-6">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                          <p className="text-sm text-gray-500">From: {item.donor_name}</p>
                          <p className="text-gray-600 text-sm mt-2">{item.description}</p>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
