import { 
  ChatBubbleLeftRightIcon, 
  CursorArrowRaysIcon, 
  CloudArrowDownIcon 
} from '@heroicons/react/24/outline'

const steps = [
  {
    id: 1,
    name: 'Plan',
    description: 'We discuss your project requirements, timeline, and specific shots needed.',
    icon: ChatBubbleLeftRightIcon,
    details: [
      'Free consultation call',
      'Custom flight plan creation',
      'Weather and safety assessment',
      'Permit coordination if needed'
    ]
  },
  {
    id: 2,
    name: 'Fly',
    description: 'Our certified pilots capture high-quality aerial footage using professional equipment.',
    icon: CursorArrowRaysIcon,
    details: [
      'Professional drone equipment',
      'Certified FAA pilots',
      'Multiple angle coverage',
      'Real-time monitoring'
    ]
  },
  {
    id: 3,
    name: 'Deliver',
    description: 'Access your media through our secure client portal with fast delivery options.',
    icon: CloudArrowDownIcon,
    details: [
      'Secure client portal access',
      'High-resolution downloads',
      'Multiple format options',
      'Same-day delivery available'
    ]
  }
]

export function HowItWorks() {
  return (
    <div id="how-it-works" className="py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Simple, professional process from consultation to delivery
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {steps.map((step, stepIdx) => (
              <div key={step.name} className="relative">
                {/* Connector line for desktop */}
                {stepIdx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-primary-200 transform translate-x-1/2" />
                )}
                
                <div className="text-center">
                  <div className="flex items-center justify-center h-24 w-24 rounded-full bg-primary-600 text-white mx-auto">
                    <step.icon className="h-12 w-12" aria-hidden="true" />
                  </div>
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Step {step.id}: {step.name}
                    </h3>
                    <p className="mt-2 text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Details list */}
                <div className="mt-8">
                  <ul className="space-y-3">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="h-2 w-2 bg-primary-500 rounded-full mt-2"></div>
                        </div>
                        <p className="ml-3 text-sm text-gray-600">
                          {detail}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline for mobile */}
        <div className="mt-16 lg:hidden">
          <div className="space-y-8">
            {steps.map((step, stepIdx) => (
              <div key={step.name} className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-600 text-white">
                    <step.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Step {step.id}: {step.name}
                  </h3>
                  <p className="mt-1 text-gray-600">
                    {step.description}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="h-1.5 w-1.5 bg-primary-500 rounded-full mt-2"></div>
                        </div>
                        <p className="ml-3 text-sm text-gray-600">
                          {detail}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <div className="card p-8 bg-white">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              Contact us today for a free consultation and custom quote for your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="btn-primary"
              >
                Get Free Quote
              </a>
              <a
                href="tel:+1234567890"
                className="btn-secondary"
              >
                Call (123) 456-7890
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
