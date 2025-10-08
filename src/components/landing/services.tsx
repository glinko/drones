import { 
  HomeIcon, 
  BuildingOfficeIcon, 
  CalendarDaysIcon,
  WrenchScrewdriverIcon,
  ChartBarIcon,
  CameraIcon
} from '@heroicons/react/24/outline'

const primaryServices = [
  {
    name: 'Real Estate Photography',
    description: 'Stunning aerial shots that showcase properties from unique perspectives, perfect for listings and marketing materials.',
    icon: HomeIcon,
    features: ['Property overview shots', 'Neighborhood context', 'High-resolution images', 'Quick turnaround']
  },
  {
    name: 'Construction Documentation',
    description: 'Regular aerial documentation of construction progress for project management and client updates.',
    icon: BuildingOfficeIcon,
    features: ['Progress tracking', 'Before/after comparisons', 'Site safety monitoring', 'Client reporting']
  },
  {
    name: 'Event Coverage',
    description: 'Capture memorable moments from above for weddings, corporate events, and special occasions.',
    icon: CalendarDaysIcon,
    features: ['Event highlights', 'Crowd shots', 'Venue overview', 'Social media content']
  }
]

const additionalServices = [
  {
    name: 'Roof & Asset Inspections',
    description: 'Detailed aerial inspections for solar panels, telecom towers, and building maintenance.',
    icon: WrenchScrewdriverIcon
  },
  {
    name: 'Agriculture & Surveying',
    description: 'Crop monitoring, land surveying, and agricultural documentation with NDVI capabilities.',
    icon: ChartBarIcon
  },
  {
    name: 'Marketing Content',
    description: 'Short-form aerial content perfect for social media and promotional materials.',
    icon: CameraIcon
  }
]

export function Services() {
  return (
    <div id="services" className="py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Professional drone services tailored to your industry needs
          </p>
        </div>

        {/* Primary Services */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Primary Services
          </h3>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {primaryServices.map((service) => (
              <div key={service.name} className="card p-8">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                      <service.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">
                      {service.name}
                    </h4>
                  </div>
                </div>
                <p className="mt-4 text-gray-600">
                  {service.description}
                </p>
                <ul className="mt-6 space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-gray-500">
                      <div className="h-1.5 w-1.5 bg-primary-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Services */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Additional Services
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {additionalServices.map((service) => (
              <div key={service.name} className="card p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-gray-100 text-gray-600">
                      <service.icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-medium text-gray-900">
                      {service.name}
                    </h4>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="card p-8 bg-primary-50 border-primary-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-gray-600 mb-6">
              We specialize in custom aerial solutions for unique requirements. 
              Contact us to discuss your specific needs.
            </p>
            <a
              href="#contact"
              className="btn-primary"
            >
              Get Custom Quote
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
