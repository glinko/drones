import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { verifyEmail } from '@/lib/auth'

const verifySchema = z.object({
  token: z.string().min(1),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token } = verifySchema.parse(body)

    const user = await verifyEmail(token)

    return NextResponse.json(
      { 
        message: 'Email verified successfully',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        }
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Email verification error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      )
    }

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
