import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardBody, CardHeader } from '../components/Card'
import { TextInput, TextArea, Select } from '../components/Input'
import { Button } from '../components/Button'
import { Alert } from '../components/Alert'
import { listingsAPI } from '../services/api'
import { FOOD_CATEGORIES } from '../utils/constants'

export function PostFoodPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    quantity: '',
    expiry: '',
  })
  const [location, setLocation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (err) => {
          setError('Please enable location access to post food')
        }
      )
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!formData.title || formData.title.length < 3) {
      setError('Please enter a valid food title')
      return
    }

    if (!formData.description || formData.description.length < 10) {
      setError('Please provide a detailed description')
      return
    }

    if (!formData.category) {
      setError('Please select a food category')
      return
    }

    if (!location) {
      setError('Location access is required to post food')
      return
    }

    try {
      setLoading(true)
      await listingsAPI.create({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        quantity: formData.quantity,
        expiry_time: formData.expiry,
        latitude: location.lat,
        longitude: location.lng,
      })
      setSuccess('Food listing posted successfully!')
      setTimeout(() => {
        navigate('/browse')
      }, 1500)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post listing. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="bg-primary-50 border-b border-primary-200">
            <h1 className="text-2xl font-bold text-gray-900">Post Food Donation</h1>
            <p className="text-gray-600 mt-2">Share your surplus food with the community</p>
          </CardHeader>
          <CardBody className="p-8">
            {error && <Alert type="error" message={error} onClose={() => setError('')} />}
            {success && <Alert type="success" message={success} />}

            <form onSubmit={handleSubmit} className="space-y-6">
              <TextInput
                label="Food Title"
                placeholder="e.g., Fresh Vegetables, Homemade Biryani"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />

              <TextArea
                label="Description"
                placeholder="Describe the food, its condition, and any dietary information..."
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                required
              />

              <Select
                label="Food Category"
                value={formData.category}
                onChange={handleChange}
                options={FOOD_CATEGORIES}
                name="category"
                required
              />

              <TextInput
                label="Quantity"
                placeholder="e.g., 2kg, 5 servings, 1 box"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Available Until"
                  type="datetime-local"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleChange}
                />
              </div>

              {location && (
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-700">
                    ✓ Location: Latitude {location.lat.toFixed(4)}, Longitude {location.lng.toFixed(4)}
                  </p>
                </div>
              )}

              <div className="pt-4">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={loading || !location}
                >
                  {loading ? 'Posting...' : 'Post Food Donation'}
                </Button>
              </div>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Guidelines for Posting</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Post food that is fresh and safe to consume</li>
                <li>✓ Clearly describe the food and any dietary information</li>
                <li>✓ Provide an expiry time so recipients can plan accordingly</li>
                <li>✓ Be honest about the food's condition and storage</li>
                <li>✓ Update your listing once the food is claimed</li>
              </ul>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
