import { StarIcon } from '@heroicons/react/24/solid'

const testimonials = [
  {
    id: 1,
    content: "The aerial footage they provided for our luxury real estate listing was absolutely stunning. It helped us sell the property 30% faster than expected. The client portal made it so easy to access and share the media.",
    author: {
      name: 'Sarah Johnson',
      role: 'Real Estate Agent',
      company: 'Premier Properties',
      image: '/api/placeholder/40/40'
    },
    rating: 5
  },
  {
    id: 2,
    content: "We've been using their construction documentation services for over a year. The regular aerial updates help us keep our clients informed and catch potential issues early. Professional service every time.",
    author: {
      name: 'Mike Chen',
      role: 'Project Manager',
      company: 'BuildCorp Construction',
      image: '/api/placeholder/40/40'
    },
    rating: 5
  },
  {
    id: 3,
    content: "The wedding footage they captured was incredible. They got angles we never could have imagined and the quality was outstanding. Our clients were thrilled with the results.",
    author: {
      name: 'Emily Rodriguez',
      role: 'Wedding Planner',
      company: 'Elegant Events',
      image: '/api/placeholder/40/40'
    },
    rating: 5
  },
  {
    id: 4,
    content: "Fast turnaround, professional quality, and the secure portal made it easy to access our media. They understood exactly what we needed for our corporate campus tour.",
    author: {
      name: 'David Thompson',
      role: 'Marketing Director',
      company: 'TechCorp',
      image: '/api/placeholder/40/40'
    },
    rating: 5
  },
  {
    id: 5,
    content: "The roof inspection they did for our solar installation saved us thousands. The detailed aerial photos helped us identify issues we couldn't see from the ground.",
    author: {
      name: 'Lisa Park',
      role: 'Operations Manager',
      company: 'Green Energy Solutions',
      image: '/api/placeholder/40/40'
    },
    rating: 5
  },
  {
    id: 6,
    content: "Professional, reliable, and the quality of their work speaks for itself. The client portal is intuitive and makes sharing media with our team seamless.",
    author: {
      name: 'Robert Martinez',
      role: 'Property Developer',
      company: 'Metro Development',
      image: '/api/placeholder/40/40'
    },
    rating: 5
  }
]

const stats = [
  { label: 'Projects Completed', value: '500+' },
  { label: 'Happy Clients', value: '200+' },
  { label: 'Years Experience', value: '5+' },
  { label: 'Average Rating', value: '5.0' }
]

export function Testimonials() {
  return (
    <div className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Trusted by professionals across multiple industries
          </p>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-primary-600">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="card p-8">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-gray-600 mb-6">
                <p>"{testimonial.content}"</p>
              </blockquote>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {testimonial.author.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">
                    {testimonial.author.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.author.role}, {testimonial.author.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-20">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-8">
              Trusted by leading companies
            </h3>
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-5 items-center justify-items-center opacity-60">
              {[
                'Premier Properties',
                'BuildCorp Construction',
                'Elegant Events',
                'TechCorp',
                'Green Energy Solutions'
              ].map((company) => (
                <div key={company} className="text-sm font-medium text-gray-500">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <div className="card p-8 bg-primary-50 border-primary-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Join Our Satisfied Clients
            </h3>
            <p className="text-gray-600 mb-6">
              Experience the same professional service and quality that our clients rave about.
            </p>
            <a
              href="#contact"
              className="btn-primary"
            >
              Start Your Project
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
