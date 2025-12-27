import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/Button'
import { Card, CardBody } from '../components/Card'

export function HomePage() {
  const { isAuthenticated } = useAuth()

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-50 to-earth-50 py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Share Food, Build Community
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                FoodShare connects donors and receivers in your community. Reduce food waste, fight hunger, and build meaningful connections—all on your local network.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <>
                    <Link to="/browse">
                      <Button variant="primary" size="lg">
                        Browse Available Food
                      </Button>
                    </Link>
                    <Link to="/post">
                      <Button variant="secondary" size="lg">
                        Post Food Donation
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/register">
                      <Button variant="primary" size="lg">
                        Get Started
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button variant="secondary" size="lg">
                        Sign In
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <div className="w-full aspect-square bg-primary-100 rounded-2xl flex items-center justify-center text-6xl">
                🍱
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardBody className="text-center">
                <div className="text-5xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Post Your Food</h3>
                <p className="text-gray-600">
                  Share surplus food from your home or business with just a few clicks.
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="text-center">
                <div className="text-5xl mb-4">🗺️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Find Nearby</h3>
                <p className="text-gray-600">
                  Browse available food in your area using our interactive map.
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="text-center">
                <div className="text-5xl mb-4">🤝</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Connect & Share</h3>
                <p className="text-gray-600">
                  Meet your community members and share food responsibly.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-primary-600 text-white py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            The Impact of Food Sharing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">1.3B</div>
              <p className="text-primary-100">Tonnes of food wasted yearly</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">828M</div>
              <p className="text-primary-100">People facing hunger</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">$408B</div>
              <p className="text-primary-100">Annual economic impact</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.4Gt</div>
              <p className="text-primary-100">CO2 from food waste</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link to="/awareness">
              <Button variant="secondary" size="lg">
                Learn More About Food Waste
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Why Join FoodShare?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardBody>
                <div className="flex items-start gap-4">
                  <div className="text-3xl">♻️</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Reduce Waste
                    </h3>
                    <p className="text-gray-600">
                      Every food item shared is waste prevented. Together, we can make a real environmental impact.
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="flex items-start gap-4">
                  <div className="text-3xl">❤️</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Fight Hunger
                    </h3>
                    <p className="text-gray-600">
                      Provide nutritious food to those in need in your local community.
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="flex items-start gap-4">
                  <div className="text-3xl">🤝</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Build Community
                    </h3>
                    <p className="text-gray-600">
                      Connect with your neighbors and create meaningful relationships through giving.
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="flex items-start gap-4">
                  <div className="text-3xl">🔒</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Safe & Secure
                    </h3>
                    <p className="text-gray-600">
                      Local network operation ensures your data stays within your community.
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
