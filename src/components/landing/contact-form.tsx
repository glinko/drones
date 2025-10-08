'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

const services = [
  'Real Estate Photography',
  'Construction Documentation',
  'Event Coverage',
  'Roof & Asset Inspections',
  'Agriculture & Surveying',
  'Marketing Content',
  'Custom Solution',
  'Other'
]

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      // TODO: Implement API call to submit form
      console.log('Form submitted:', data)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setIsSubmitted(true)
      reset()
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div id="contact" className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
              Thank You!
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              We've received your message and will get back to you within 24 hours.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="mt-6 btn-primary"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div id="contact" className="py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Get Your Free Quote
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Ready to elevate your project with professional aerial services?
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Get in Touch
            </h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <PhoneIcon className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-4">
                  <h4 className="text-base font-medium text-gray-900">Phone</h4>
                  <p className="text-gray-600">(123) 456-7890</p>
                  <p className="text-sm text-gray-500">Mon-Fri 8AM-6PM EST</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <EnvelopeIcon className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-4">
                  <h4 className="text-base font-medium text-gray-900">Email</h4>
                  <p className="text-gray-600">info@dronemediaservices.com</p>
                  <p className="text-sm text-gray-500">We respond within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <MapPinIcon className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-4">
                  <h4 className="text-base font-medium text-gray-900">Service Area</h4>
                  <p className="text-gray-600">Greater Metro Area</p>
                  <p className="text-sm text-gray-500">50+ mile radius coverage</p>
                </div>
              </div>
            </div>

            <div className="mt-8 card p-6 bg-primary-50 border-primary-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                Why Choose Us?
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 bg-primary-500 rounded-full mr-3"></div>
                  FAA Certified Pilots
                </li>
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 bg-primary-500 rounded-full mr-3"></div>
                  Professional Equipment
                </li>
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 bg-primary-500 rounded-full mr-3"></div>
                  Secure Client Portal
                </li>
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 bg-primary-500 rounded-full mr-3"></div>
                  Fast Turnaround
                </li>
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 bg-primary-500 rounded-full mr-3"></div>
                  Competitive Pricing
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name *
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    className="mt-1 input-field"
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    className="mt-1 input-field"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    className="mt-1 input-field"
                    placeholder="(123) 456-7890"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                    Company
                  </label>
                  <input
                    {...register('company')}
                    type="text"
                    className="mt-1 input-field"
                    placeholder="Your company name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700">
                  Service Needed *
                </label>
                <select
                  {...register('service')}
                  className="mt-1 input-field"
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p className="mt-1 text-sm text-red-600">{errors.service.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Project Details *
                </label>
                <textarea
                  {...register('message')}
                  rows={4}
                  className="mt-1 input-field"
                  placeholder="Tell us about your project, timeline, and any specific requirements..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Get Free Quote'}
                </button>
                <p className="mt-2 text-sm text-gray-500 text-center">
                  We'll respond within 24 hours with a custom quote
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
