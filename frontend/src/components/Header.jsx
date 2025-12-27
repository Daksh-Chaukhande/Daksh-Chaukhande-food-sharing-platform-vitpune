import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useNotifications } from '../hooks/useNotifications'
import { useState } from 'react'

export function Header() {
  const { user, logout, isAuthenticated } = useAuth()
  const { unreadCount } = useNotifications()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">
            F
          </div>
          <span className="font-bold text-lg text-gray-900">FoodShare</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-600 hover:text-primary-600 transition-colors">
            Home
          </Link>
          {isAuthenticated && (
            <>
              <Link to="/browse" className="text-gray-600 hover:text-primary-600 transition-colors">
                Browse
              </Link>
              <Link to="/post" className="text-gray-600 hover:text-primary-600 transition-colors">
                Post Food
              </Link>
            </>
          )}
          <Link to="/awareness" className="text-gray-600 hover:text-primary-600 transition-colors">
            Learn
          </Link>
          <Link to="/ngo" className="text-gray-600 hover:text-primary-600 transition-colors">
            NGOs
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </div>

              <Link to="/profile" className="text-gray-600 hover:text-primary-600 transition-colors">
                {user?.name || 'Profile'}
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-primary-600 transition-colors">
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-gray-200 bg-gray-50 p-4">
          <div className="flex flex-col gap-4">
            <Link to="/" className="text-gray-600 hover:text-primary-600 transition-colors">
              Home
            </Link>
            {isAuthenticated && (
              <>
                <Link to="/browse" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Browse
                </Link>
                <Link to="/post" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Post Food
                </Link>
              </>
            )}
            <Link to="/awareness" className="text-gray-600 hover:text-primary-600 transition-colors">
              Learn
            </Link>
            <Link to="/ngo" className="text-gray-600 hover:text-primary-600 transition-colors">
              NGOs
            </Link>
            {isAuthenticated ? (
              <>
                <hr className="my-2" />
                <Link to="/profile" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  )
}
