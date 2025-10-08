import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createUser } from '@/lib/auth'
import { sendEmailVerification } from '@/lib/email'
import { db } from '@/lib/db'

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, firstName, lastName, phone } = registerSchema.parse(body)

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Create user
    const user = await createUser({
      email,
      password,
      firstName,
      lastName,
      phone,
    })

    // Send verification email
    await sendEmailVerification(email, user.emailVerifyToken!)

    return NextResponse.json(
      { 
        message: 'User created successfully. Please check your email to verify your account.',
        userId: user.id 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
