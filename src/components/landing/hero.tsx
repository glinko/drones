import Link from 'next/link'
import { PlayIcon } from '@heroicons/react/24/outline'

export function Hero() {
  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left">
            <h1>
              <span className="block text-base font-semibold tracking-wide text-primary-600 uppercase">
                Professional Drone Services
              </span>
              <span className="mt-1 block text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl xl:text-6xl">
                <span className="block">Aerial Photography</span>
                <span className="block text-primary-600">& Videography</span>
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Transform your projects with stunning aerial perspectives. From real estate marketing 
              to construction documentation, we deliver professional drone services with secure 
              client portal access to your media.
            </p>
            <div className="mt-8 sm:mx-auto sm:max-w-lg sm:text-center lg:text-left lg:mx-0">
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#contact"
                  className="btn-primary text-center"
                >
                  Get a Quote
                </Link>
                <Link
                  href="#portfolio"
                  className="btn-secondary text-center inline-flex items-center justify-center"
                >
                  <PlayIcon className="h-5 w-5 mr-2" />
                  See Portfolio
                </Link>
              </div>
              <p className="mt-3 text-sm text-gray-500">
                Free consultation • Same-day delivery available • Secure client portal
              </p>
            </div>
          </div>
          <div className="mt-12 relative sm:mx-auto sm:max-w-lg lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
              <div className="relative block w-full bg-white rounded-lg overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <PlayIcon className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-primary-600 font-medium">Watch Our Demo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
