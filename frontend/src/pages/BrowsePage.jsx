import { useState, useEffect, useCallback } from 'react'
import { Card, CardBody } from '../components/Card'
import { TextInput, Select } from '../components/Input'
import { Button } from '../components/Button'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { Alert } from '../components/Alert'
import { listingsAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { formatDistance, getTimeAgo } from '../utils/helpers'
import { FOOD_CATEGORIES } from '../utils/constants'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

export function BrowsePage() {
  const [listings, setListings] = useState([])
  const [filteredListings, setFilteredListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({
    category: '',
    maxDistance: 10,
    search: '',
  })
  const [userLocation, setUserLocation] = useState(null)
  const [viewMode, setViewMode] = useState('list')
  const { user } = useAuth()

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (err) => {
          console.log('Location access denied:', err)
        }
      )
    }
  }, [])

  const fetchListings = useCallback(async () => {
    try {
      setLoading(true)
      const response = await listingsAPI.getAll()
      setListings(response.data)
      setError('')
    } catch (err) {
      setError('Failed to load listings. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchListings()
  }, [fetchListings])

  useEffect(() => {
    let filtered = listings

    if (filters.category) {
      filtered = filtered.filter(l => l.category === filters.category)
    }

    if (filters.search) {
      filtered = filtered.filter(l =>
        l.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        l.description.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    if (userLocation) {
      filtered = filtered.filter(l => {
        const distance = getDistance(
          userLocation.lat,
          userLocation.lng,
          l.latitude,
          l.longitude
        )
        return distance <= filters.maxDistance
      })
    }

    setFilteredListings(filtered)
  }, [listings, filters, userLocation])

  const handleClaim = async (id) => {
    try {
      await listingsAPI.claim(id)
      setListings(prev =>
        prev.map(l => (l.id === id ? { ...l, claimed_by: user.id } : l))
      )
    } catch (err) {
      setError('Failed to claim item. Please try again.')
    }
  }

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return (R * c).toFixed(1)
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Browse Food Listings</h1>

      {error && <Alert type="error" message={error} onClose={() => setError('')} />}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>

            <TextInput
              label="Search"
              placeholder="Search listings..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />

            <Select
              label="Food Category"
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              options={FOOD_CATEGORIES}
            />

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Distance: {filters.maxDistance} km
              </label>
              <input
                type="range"
                min="1"
                max="50"
                value={filters.maxDistance}
                onChange={(e) => setFilters({ ...filters, maxDistance: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

            <Button
              variant="outline"
              size="md"
              className="w-full"
              onClick={() => setFilters({ category: '', maxDistance: 10, search: '' })}
            >
              Clear Filters
            </Button>
          </Card>
        </aside>

        <main className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              Found {filteredListings.length} listing{filteredListings.length !== 1 ? 's' : ''}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'map'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" />
                </svg>
              </button>
            </div>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : filteredListings.length === 0 ? (
            <Card>
              <CardBody className="text-center py-12">
                <p className="text-gray-600 text-lg">No listings found. Try adjusting your filters.</p>
              </CardBody>
            </Card>
          ) : viewMode === 'list' ? (
            <div className="space-y-4">
              {filteredListings.map(listing => (
                <Card key={listing.id}>
                  <CardBody>
                    <div className="flex gap-4">
                      {listing.image_url && (
                        <img
                          src={listing.image_url}
                          alt={listing.title}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{listing.title}</h3>
                            <p className="text-sm text-gray-500">{getTimeAgo(listing.created_at)}</p>
                          </div>
                          <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold">
                            {listing.category}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{listing.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            📍 {userLocation ? formatDistance(getDistance(userLocation.lat, userLocation.lng, listing.latitude, listing.longitude)) : 'Location unavailable'}
                          </div>
                          {!listing.claimed_by ? (
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => handleClaim(listing.id)}
                            >
                              Claim Item
                            </Button>
                          ) : (
                            <span className="text-sm text-gray-500">Claimed</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          ) : userLocation ? (
            <div className="h-96 rounded-lg overflow-hidden border border-gray-200">
              <MapContainer center={[userLocation.lat, userLocation.lng]} zoom={13} style={{ height: '100%' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; OpenStreetMap contributors'
                />
                {filteredListings.map(listing => (
                  <Marker key={listing.id} position={[listing.latitude, listing.longitude]}>
                    <Popup>
                      <div>
                        <h4 className="font-semibold">{listing.title}</h4>
                        <p className="text-sm text-gray-600">{listing.description}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          ) : (
            <Card>
              <CardBody className="text-center py-12">
                <p className="text-gray-600">Please enable location access to view map.</p>
              </CardBody>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}
