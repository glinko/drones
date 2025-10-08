import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendEmailVerification(email: string, token: string) {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/auth/verify?token=${token}`
  
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Verify your email - Drone Media Services',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #3b82f6; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Drone Media Services</h1>
        </div>
        <div style="padding: 30px; background-color: #f9fafb;">
          <h2 style="color: #1f2937; margin-bottom: 20px;">Welcome!</h2>
          <p style="color: #4b5563; line-height: 1.6;">
            Thank you for registering with Drone Media Services. To complete your registration, 
            please verify your email address by clicking the button below:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background-color: #3b82f6; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 6px; display: inline-block;">
              Verify Email Address
            </a>
          </div>
          <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
            If the button doesn't work, you can copy and paste this link into your browser:
            <br>
            <a href="${verificationUrl}" style="color: #3b82f6;">${verificationUrl}</a>
          </p>
          <p style="color: #6b7280; font-size: 14px;">
            This link will expire in 24 hours. If you didn't create an account with us, 
            please ignore this email.
          </p>
        </div>
        <div style="background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280;">
          © ${new Date().getFullYear()} Drone Media Services. All rights reserved.
        </div>
      </div>
    `,
  }

  return transporter.sendMail(mailOptions)
}

export async function sendPasswordReset(email: string, token: string) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`
  
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Reset your password - Drone Media Services',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #3b82f6; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Drone Media Services</h1>
        </div>
        <div style="padding: 30px; background-color: #f9fafb;">
          <h2 style="color: #1f2937; margin-bottom: 20px;">Password Reset Request</h2>
          <p style="color: #4b5563; line-height: 1.6;">
            We received a request to reset your password. Click the button below to create a new password:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background-color: #3b82f6; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 6px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
            If the button doesn't work, you can copy and paste this link into your browser:
            <br>
            <a href="${resetUrl}" style="color: #3b82f6;">${resetUrl}</a>
          </p>
          <p style="color: #6b7280; font-size: 14px;">
            This link will expire in 1 hour. If you didn't request a password reset, 
            please ignore this email.
          </p>
        </div>
        <div style="background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280;">
          © ${new Date().getFullYear()} Drone Media Services. All rights reserved.
        </div>
      </div>
    `,
  }

  return transporter.sendMail(mailOptions)
}

export async function sendProjectInvitation(
  email: string, 
  projectName: string, 
  inviterName: string, 
  token: string
) {
  const invitationUrl = `${process.env.NEXTAUTH_URL}/auth/register?invite=${token}`
  
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: `You've been invited to view "${projectName}" - Drone Media Services`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #3b82f6; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Drone Media Services</h1>
        </div>
        <div style="padding: 30px; background-color: #f9fafb;">
          <h2 style="color: #1f2937; margin-bottom: 20px;">Project Invitation</h2>
          <p style="color: #4b5563; line-height: 1.6;">
            ${inviterName} has invited you to view the project "${projectName}" on our secure client portal.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${invitationUrl}" 
               style="background-color: #3b82f6; color: white; padding: 12px 24px; 
                      text-decoration: none; border-radius: 6px; display: inline-block;">
              View Project
            </a>
          </div>
          <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
            If the button doesn't work, you can copy and paste this link into your browser:
            <br>
            <a href="${invitationUrl}" style="color: #3b82f6;">${invitationUrl}</a>
          </p>
          <p style="color: #6b7280; font-size: 14px;">
            This invitation will expire in 7 days. If you don't have an account, 
            you'll be able to create one when you click the link.
          </p>
        </div>
        <div style="background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280;">
          © ${new Date().getFullYear()} Drone Media Services. All rights reserved.
        </div>
      </div>
    `,
  }

  return transporter.sendMail(mailOptions)
}
