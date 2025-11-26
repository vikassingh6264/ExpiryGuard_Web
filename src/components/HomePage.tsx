interface HomePageProps {
  onGetStarted: () => void
}

export default function HomePage({ onGetStarted }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
          Never Waste Food or Medicine Again
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Track expiry dates and get smart reminders before products expire.
        </p>
        <button
          onClick={onGetStarted}
          className="bg-blue-500 hover:bg-blue-600 text-white text-lg py-3 px-8 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl min-h-[44px]"
        >
          Add Your First Product
        </button>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📝</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Add Product</h3>
            <p className="text-gray-600">Enter product name, category, and expiry date</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📅</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Set Expiry Date</h3>
            <p className="text-gray-600">System automatically tracks days remaining</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔔</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Get Reminder</h3>
            <p className="text-gray-600">Receive timely notifications before expiry</p>
          </div>
        </div>
      </section>

      {/* Who Is It For */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Who Is It For</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-3">🏠</div>
              <h3 className="font-semibold text-gray-900">Homes</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-3">🏪</div>
              <h3 className="font-semibold text-gray-900">Stores</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-3">🍽️</div>
              <h3 className="font-semibold text-gray-900">Restaurants</h3>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-3">💊</div>
              <h3 className="font-semibold text-gray-900">Medical Shops</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-3">♻️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Reduce Waste</h3>
            <p className="text-gray-600 text-sm">Use products before they expire</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-3">💰</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Save Money</h3>
            <p className="text-gray-600 text-sm">Avoid throwing away expired items</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-3">🛡️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Stay Safe</h3>
            <p className="text-gray-600 text-sm">Never consume expired products</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Organize Inventory</h3>
            <p className="text-gray-600 text-sm">Keep track of all your products</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">ExpiryGuard</h3>
              <p className="text-gray-400 text-sm">Smart Expiry Date Reminder</p>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
              <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
              <a href="#privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            </div>
          </div>
          <div className="mt-6 text-center text-gray-400 text-sm">
            <p>Made with ❤️ for reducing waste</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
