import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'XPLR - Explore Your World',
  description: 'Your gateway to endless exploration',
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full space-y-12 text-center">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          XPLR
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Your journey begins here. Discover new horizons.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Get Started
          </button>
          <button className="px-8 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            Learn More
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16">
          {['Explore', 'Create', 'Share'].map((feature) => (
            <div key={feature} className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg">
              <h2 className="text-xl font-semibold mb-3">{feature}</h2>
              <p className="text-gray-600 dark:text-gray-300">
                {`Start your journey to ${feature.toLowerCase()} amazing experiences.`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
