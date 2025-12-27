import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { authAPI } from '../services/api'
import { TextInput } from '../components/Input'
import { Button } from '../components/Button'
import { Alert } from '../components/Alert'
import { validateEmail, validatePhone } from '../utils/helpers'

export function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

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

    if (!formData.name || formData.name.length < 2) {
      setError('Please enter a valid name')
      return
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address')
      return
    }

    if (!validatePhone(formData.phone)) {
      setError('Please enter a valid phone number')
      return
    }

    if (!formData.location) {
      setError('Please enter your location')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      setLoading(true)
      const response = await authAPI.register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        password: formData.password,
      })
      const { user, token } = response.data
      login(user, token)
      navigate('/browse')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-earth-50 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
              F
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Join FoodShare</h1>
            <p className="text-gray-600 text-sm mt-2">Create an account to get started</p>
          </div>

          {error && <Alert type="error" message={error} onClose={() => setError('')} />}

          <form onSubmit={handleSubmit} className="space-y-4">
            <TextInput
              label="Full Name"
              placeholder="John Doe"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <TextInput
              label="Email Address"
              type="email"
              placeholder="your@email.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <TextInput
              label="Phone Number"
              placeholder="+91 9876543210"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <TextInput
              label="Location"
              placeholder="City, Area"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />

            <TextInput
              label="Password"
              type="password"
              placeholder="At least 6 characters"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <TextInput
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <Button
              variant="primary"
              size="md"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
