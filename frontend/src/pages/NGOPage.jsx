import { useState } from 'react'
import { Card, CardBody } from '../components/Card'
import { Button } from '../components/Button'
import { TextInput } from '../components/Input'
import { NGO_LIST } from '../utils/constants'

export function NGOPage() {
  const [selectedNGO, setSelectedNGO] = useState(null)
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [searchTerm, setSearchTerm] = useState('')

  const filteredNGOs = NGO_LIST.filter(ngo =>
    ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ngo.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleContact = (ngo) => {
    window.location.href = `mailto:${ngo.email}?subject=Food Donation Inquiry&body=Hello ${ngo.name},\n\nI have surplus food available and would like to connect with your organization.\n\nPlease contact me at your earliest convenience.`
  }

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-50 to-earth-50 py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Partner NGOs & Organizations
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Connect with trusted organizations in your area to ensure your food donations reach those who need it most.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="mb-8">
            <TextInput
              placeholder="Search NGOs by name or focus area..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Focus</h3>
              <div className="space-y-2">
                {['Community feeding programs', 'Food distribution & nutrition programs', 'Waste reduction & sustainability', 'Direct food assistance & community support', 'Digital food sharing platform'].map(focus => (
                  <label key={focus} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-primary-600"
                    />
                    <span className="text-sm text-gray-600">{focus}</span>
                  </label>
                ))}
              </div>
            </aside>

            <main className="lg:col-span-3">
              {filteredNGOs.length === 0 ? (
                <Card>
                  <CardBody className="text-center py-12">
                    <p className="text-gray-600">No organizations found. Try a different search.</p>
                  </CardBody>
                </Card>
              ) : (
                <div className="space-y-6">
                  {filteredNGOs.map(ngo => (
                    <Card key={ngo.id}>
                      <CardBody className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{ngo.name}</h3>
                            <p className="text-gray-600 mb-4">{ngo.description}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <p className="text-sm font-semibold text-gray-700 mb-1">Phone</p>
                                <a href={`tel:${ngo.phone}`} className="text-primary-600 hover:text-primary-700 font-medium">
                                  {ngo.phone}
                                </a>
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-700 mb-1">Email</p>
                                <a href={`mailto:${ngo.email}`} className="text-primary-600 hover:text-primary-700 font-medium">
                                  {ngo.email}
                                </a>
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-700 mb-1">Location</p>
                                <p className="text-gray-600">{ngo.address}</p>
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-700 mb-1">Focus Area</p>
                                <p className="text-gray-600">{ngo.focus}</p>
                              </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                              <Button
                                variant="primary"
                                size="md"
                                onClick={() => handleContact(ngo)}
                              >
                                Contact Organization
                              </Button>
                              <a href={`tel:${ngo.phone}`}>
                                <Button variant="secondary" size="md">
                                  Call Now
                                </Button>
                              </a>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      <section className="bg-primary-50 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            How to Connect with NGOs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card>
              <CardBody className="text-center py-8">
                <div className="text-4xl mb-4">1️⃣</div>
                <h3 className="font-semibold text-gray-900 mb-2">Browse Organizations</h3>
                <p className="text-sm text-gray-600">Find NGOs that match your location and food donation needs</p>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="text-center py-8">
                <div className="text-4xl mb-4">2️⃣</div>
                <h3 className="font-semibold text-gray-900 mb-2">Get in Touch</h3>
                <p className="text-sm text-gray-600">Call or email the organization to discuss your surplus food</p>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="text-center py-8">
                <div className="text-4xl mb-4">3️⃣</div>
                <h3 className="font-semibold text-gray-900 mb-2">Arrange Pickup</h3>
                <p className="text-sm text-gray-600">Coordinate timing and logistics for food collection</p>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="text-center py-8">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="font-semibold text-gray-900 mb-2">Make an Impact</h3>
                <p className="text-sm text-gray-600">Your donation reaches those in need in the community</p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Partner Organization Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardBody className="p-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">📊</span> Transparent Impact
                </h3>
                <p className="text-gray-600">
                  Track how much food has been recovered and distributed through FoodShare in your community.
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="p-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">🌐</span> Network Growth
                </h3>
                <p className="text-gray-600">
                  Expand your network of donors and expand the reach of your food distribution programs.
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="p-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">🔒</span> Local Privacy
                </h3>
                <p className="text-gray-600">
                  Operate on a local network for complete data privacy and security of your beneficiaries.
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="p-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">💡</span> Community Engagement
                </h3>
                <p className="text-gray-600">
                  Foster a culture of giving and community participation in your local food system.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
