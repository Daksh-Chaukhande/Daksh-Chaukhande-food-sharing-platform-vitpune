import { Card, CardBody } from '../components/Card'
import { FOOD_WASTE_STATS } from '../utils/constants'

export function AwarenessPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-primary-50 to-earth-50 py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Food Waste: A Global Crisis
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Learn about the impact of food waste and how you can be part of the solution through FoodShare.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Global Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FOOD_WASTE_STATS.map((stat, idx) => (
              <Card key={idx}>
                <CardBody className="text-center py-8">
                  <div className="text-4xl font-bold text-primary-600 mb-2">{stat.value}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{stat.label}</h3>
                  <p className="text-sm text-gray-600">{stat.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary-50 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Why Food Waste Matters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardBody className="p-8">
                <div className="text-5xl mb-4">🌍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Environmental Impact</h3>
                <p className="text-gray-600 leading-relaxed">
                  Food waste contributes 4.4 gigatonnes of CO2 equivalent to the atmosphere annually. When food ends up in landfills, it decomposes and produces methane, a greenhouse gas 25 times more potent than CO2. Reducing food waste is crucial for combating climate change.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-8">
                <div className="text-5xl mb-4">💰</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Economic Loss</h3>
                <p className="text-gray-600 leading-relaxed">
                  The global economic loss from food waste amounts to approximately $408 billion annually. This includes the cost of wasted resources, transportation, and lost agricultural productivity. Food waste represents a massive drain on our economies.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-8">
                <div className="text-5xl mb-4">🥗</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Food Security</h3>
                <p className="text-gray-600 leading-relaxed">
                  While 828 million people face hunger globally, one-third of food produced worldwide is wasted. If we could redistribute just a fraction of this waste to those in need, we could eliminate world hunger.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-8">
                <div className="text-5xl mb-4">💧</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Resource Waste</h3>
                <p className="text-gray-600 leading-relaxed">
                  Growing food requires enormous amounts of water, land, and energy. When that food is wasted, all these resources are wasted too. Food waste accounts for about 8% of global greenhouse gas emissions.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">How You Can Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardBody className="p-8">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-2xl mb-4">
                  📝
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Share Your Surplus</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Post any extra food from your home or business on FoodShare. No amount is too small—every bit helps fight waste and hunger.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-8">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-2xl mb-4">
                  🔍
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Find & Claim Food</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Browse nearby listings and claim food items you need. Connect with donors in your community and build lasting relationships.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-8">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-2xl mb-4">
                  🤝
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Spread the Word</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Tell your friends and family about FoodShare. Growing our community means more food shared and less waste created.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-earth-800 text-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Did You Know?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div>
              <div className="text-3xl font-bold text-primary-400 mb-2">1/3</div>
              <p className="text-earth-200">Of food produced globally is wasted</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-400 mb-2">70%</div>
              <p className="text-earth-200">Of fresh water goes to agriculture</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-400 mb-2">$100</div>
              <p className="text-earth-200">Average per capita food waste yearly</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Resources & References</h2>
          <Card>
            <CardBody className="p-8">
              <ul className="space-y-3 text-gray-600">
                <li>
                  <strong className="text-gray-900">UN Food Waste Index Report 2023:</strong> Comprehensive data on global food waste
                </li>
                <li>
                  <strong className="text-gray-900">FAO - Food Wastage Footprint:</strong> Environmental impact analysis of food waste
                </li>
                <li>
                  <strong className="text-gray-900">World Economic Forum:</strong> The economics of food waste
                </li>
                <li>
                  <strong className="text-gray-900">EPA Food Recovery Hierarchy:</strong> Best practices for food donation and recovery
                </li>
              </ul>
            </CardBody>
          </Card>
        </div>
      </section>
    </div>
  )
}
