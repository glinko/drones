'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { EyeIcon, EyeSlashIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

const resetPasswordSchema = z.object({
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [token, setToken] = useState<string | null>(null)
  const [tokenError, setTokenError] = useState<string | null>(null)
  
  const searchParams = useSearchParams()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema)
  })

  useEffect(() => {
    const tokenParam = searchParams.get('token')
    if (!tokenParam) {
      setTokenError('No reset token provided')
    } else {
      setToken(tokenParam)
    }
  }, [searchParams])

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password: data.password,
        }),
      })

      if (response.ok) {
        setIsSuccess(true)
      } else {
        const errorData = await response.json()
        setError('root', {
          type: 'manual',
          message: errorData.error || 'Password reset failed'
        })
      }
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: 'An error occurred. Please try again.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (tokenError) {
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
              Invalid Reset Link
            </h2>
          </div>

          <div className="text-center space-y-4">
            <XCircleIcon className="h-12 w-12 text-red-600 mx-auto" />
            <p className="text-red-600 font-medium">{tokenError}</p>
            <div className="space-y-2">
              <Link
                href="/auth/forgot-password"
                className="btn-primary block"
              >
                Request New Reset Link
              </Link>
              <Link
                href="/auth/login"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isSuccess) {
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
              Password Reset Successful
            </h2>
          </div>

          <div className="text-center space-y-4">
            <CheckCircleIcon className="h-12 w-12 text-green-600 mx-auto" />
            <p className="text-green-600 font-medium">
              Your password has been reset successfully.
            </p>
            <p className="text-sm text-gray-500">
              You can now sign in with your new password.
            </p>
            <div className="space-y-2">
              <Link
                href="/auth/login"
                className="btn-primary block"
              >
                Sign In
              </Link>
              <Link
                href="/"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                ← Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

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
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your new password below.
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="mt-1 relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  className="input-field pr-10"
                  placeholder="Enter your new password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Must be at least 8 characters with uppercase, lowercase, and number
              </p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <div className="mt-1 relative">
                <input
                  {...register('confirmPassword')}
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  className="input-field pr-10"
                  placeholder="Confirm your new password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          {errors.root && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">
                {errors.root.message}
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </button>
          </div>

          <div className="text-center">
            <Link
              href="/auth/login"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              ← Back to sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
