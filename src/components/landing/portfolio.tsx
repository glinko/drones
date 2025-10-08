'use client'

import { useState } from 'react'
import { PlayIcon } from '@heroicons/react/24/outline'

const portfolioItems = [
  {
    id: 1,
    title: 'Luxury Estate Aerial Tour',
    category: 'Real Estate',
    type: 'video',
    thumbnail: '/api/placeholder/400/300',
    description: 'Stunning aerial footage of a 5-acre luxury property'
  },
  {
    id: 2,
    title: 'Construction Progress Documentation',
    category: 'Construction',
    type: 'image',
    thumbnail: '/api/placeholder/400/300',
    description: 'Monthly progress shots of commercial building construction'
  },
  {
    id: 3,
    title: 'Wedding Venue Overview',
    category: 'Events',
    type: 'image',
    thumbnail: '/api/placeholder/400/300',
    description: 'Beautiful aerial shots of outdoor wedding venue'
  },
  {
    id: 4,
    title: 'Corporate Campus Tour',
    category: 'Commercial',
    type: 'video',
    thumbnail: '/api/placeholder/400/300',
    description: 'Professional aerial tour of corporate headquarters'
  },
  {
    id: 5,
    title: 'Residential Development',
    category: 'Real Estate',
    type: 'image',
    thumbnail: '/api/placeholder/400/300',
    description: 'Aerial view of new residential community'
  },
  {
    id: 6,
    title: 'Festival Coverage',
    category: 'Events',
    type: 'video',
    thumbnail: '/api/placeholder/400/300',
    description: 'Dynamic aerial footage of music festival'
  }
]

export function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[0] | null>(null)

  const categories = ['All', 'Real Estate', 'Construction', 'Events', 'Commercial']
  
  const filteredItems = selectedCategory === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory)

  return (
    <div id="portfolio" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Portfolio Highlights
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            See the quality and creativity of our aerial work
          </p>
        </div>

        {/* Category Filter */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              <div className="card overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    {item.type === 'video' ? (
                      <div className="text-center">
                        <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-200">
                          <PlayIcon className="h-8 w-8 text-white" />
                        </div>
                        <p className="text-primary-600 font-medium">Video</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-200">
                          <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-gray-600 font-medium">Photo</p>
                      </div>
                    )}
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-white bg-opacity-90 text-gray-700 text-xs font-medium px-2 py-1 rounded">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 mb-6">
            Want to see more of our work?
          </p>
          <a
            href="#contact"
            className="btn-primary"
          >
            Request Full Portfolio
          </a>
        </div>
      </div>

      {/* Modal for viewing portfolio items */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {selectedItem.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {selectedItem.category} • {selectedItem.type}
                </p>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg flex items-center justify-center">
                {selectedItem.type === 'video' ? (
                  <div className="text-center">
                    <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <PlayIcon className="h-10 w-10 text-white" />
                    </div>
                    <p className="text-primary-600 font-medium">Video Player</p>
                    <p className="text-sm text-gray-500 mt-2">Click to play video</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="h-10 w-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-600 font-medium">Image Viewer</p>
                    <p className="text-sm text-gray-500 mt-2">Click to view full size</p>
                  </div>
                )}
              </div>
              <p className="mt-4 text-gray-600">
                {selectedItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
