'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

export default function VerifyPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setMessage('No verification token provided')
      return
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        })

        const data = await response.json()

        if (response.ok) {
          setStatus('success')
          setMessage('Email verified successfully! You can now sign in to your account.')
        } else {
          setStatus('error')
          setMessage(data.error || 'Verification failed')
        }
      } catch (error) {
        setStatus('error')
        setMessage('An error occurred during verification')
      }
    }

    verifyEmail()
  }, [token])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <div className="h-12 w-12 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">D</span>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Email Verification
          </h2>
        </div>

        <div className="text-center">
          {status === 'loading' && (
            <div className="space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              <p className="text-gray-600">Verifying your email address...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-4">
              <CheckCircleIcon className="h-12 w-12 text-green-600 mx-auto" />
              <p className="text-green-600 font-medium">{message}</p>
              <div className="space-y-2">
                <Link
                  href="/auth/login"
                  className="btn-primary block"
                >
                  Sign In to Your Account
                </Link>
                <Link
                  href="/"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  ← Back to home
                </Link>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4">
              <XCircleIcon className="h-12 w-12 text-red-600 mx-auto" />
              <p className="text-red-600 font-medium">{message}</p>
              <div className="space-y-2">
                <Link
                  href="/auth/register"
                  className="btn-primary block"
                >
                  Create New Account
                </Link>
                <Link
                  href="/"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  ← Back to home
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
