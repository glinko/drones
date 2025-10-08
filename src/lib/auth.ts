import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { db } from './db'
import { UserRole } from '@prisma/client'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export interface JWTPayload {
  userId: string
  email: string
  role: UserRole
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch {
    return null
  }
}

export function generateEmailVerificationToken(): string {
  return Math.random().toString(36).substr(2, 15) + Date.now().toString(36)
}

export function generatePasswordResetToken(): string {
  return Math.random().toString(36).substr(2, 15) + Date.now().toString(36)
}

export async function createUser(data: {
  email: string
  password: string
  firstName?: string
  lastName?: string
  phone?: string
  role?: UserRole
}) {
  const hashedPassword = await hashPassword(data.password)
  const emailVerifyToken = generateEmailVerificationToken()
  
  return db.user.create({
    data: {
      email: data.email,
      passwordHash: hashedPassword,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      role: data.role || UserRole.USER,
      emailVerifyToken,
      emailVerifyExpires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    },
  })
}

export async function verifyEmail(token: string) {
  const user = await db.user.findFirst({
    where: {
      emailVerifyToken: token,
      emailVerifyExpires: {
        gt: new Date(),
      },
    },
  })

  if (!user) {
    throw new Error('Invalid or expired verification token')
  }

  return db.user.update({
    where: { id: user.id },
    data: {
      emailVerified: true,
      emailVerifyToken: null,
      emailVerifyExpires: null,
    },
  })
}

export async function requestPasswordReset(email: string) {
  const user = await db.user.findUnique({
    where: { email },
  })

  if (!user) {
    // Don't reveal if user exists or not
    return
  }

  const resetToken = generatePasswordResetToken()
  
  await db.user.update({
    where: { id: user.id },
    data: {
      resetToken,
      resetExpires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
    },
  })

  return resetToken
}

export async function resetPassword(token: string, newPassword: string) {
  const user = await db.user.findFirst({
    where: {
      resetToken: token,
      resetExpires: {
        gt: new Date(),
      },
    },
  })

  if (!user) {
    throw new Error('Invalid or expired reset token')
  }

  const hashedPassword = await hashPassword(newPassword)

  return db.user.update({
    where: { id: user.id },
    data: {
      passwordHash: hashedPassword,
      resetToken: null,
      resetExpires: null,
    },
  })
}

export async function authenticateUser(email: string, password: string) {
  const user = await db.user.findUnique({
    where: { email },
  })

  if (!user || !user.emailVerified) {
    return null
  }

  const isValid = await verifyPassword(password, user.passwordHash)
  if (!isValid) {
    return null
  }

  return user
}
