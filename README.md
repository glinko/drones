# Drone Media Services Website

A comprehensive web application for drone photography and videography services with a secure client portal for media management and sharing.

## Features

### Landing Page
- Professional marketing website with hero section, services overview, portfolio highlights
- Contact form with lead capture
- Responsive design optimized for all devices

### Authentication System
- User registration with email verification
- Secure login with JWT tokens
- Password reset functionality
- Role-based access control (User, Admin, Super Admin)

### Client Portal
- 3-frame layout for project and media management
- Project selector with sharing capabilities
- Photo and video galleries with thumbnails
- Drag-and-drop media reordering
- Secure file downloads

### Admin Console
- User management and role assignment
- Project oversight and media management
- Bulk operations for media handling
- Audit logging for security

### Sharing System
- Email-based project invitations
- Secure token-based access
- Automatic user creation for invited guests
- Access control and revocation

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: JWT with httpOnly cookies
- **File Storage**: AWS S3 (configurable)
- **Email**: Nodemailer with SMTP
- **Video Streaming**: HLS.js for adaptive streaming
- **Image Processing**: Sharp for thumbnails and optimization

## Prerequisites

Before running this application, make sure you have:

1. **Node.js** (v18 or higher)
2. **PostgreSQL** database
3. **AWS S3** bucket (for file storage)
4. **SMTP** email service (Gmail, SendGrid, etc.)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd drones
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/drone_media_services"
   
   # NextAuth
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   
   # AWS S3 Configuration
   AWS_ACCESS_KEY_ID="your-aws-access-key"
   AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
   AWS_REGION="us-east-1"
   AWS_S3_BUCKET="your-s3-bucket-name"
   
   # Email Configuration (SMTP)
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT="587"
   SMTP_USER="your-email@gmail.com"
   SMTP_PASS="your-app-password"
   
   # JWT Secret
   JWT_SECRET="your-jwt-secret-key"
   
   # App Configuration
   NODE_ENV="development"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # (Optional) Open Prisma Studio to view data
   npm run db:studio
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Schema

The application uses the following main entities:

- **Users**: Authentication and user management
- **Projects**: Client projects with media collections
- **Media**: Photos and videos with metadata
- **ProjectMembers**: Access control for projects
- **Invitations**: Email-based project sharing
- **AuditLogs**: Security and activity tracking

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify` - Email verification
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset

### Projects
- `GET /api/projects` - List user's projects
- `POST /api/projects` - Create new project
- `GET /api/projects/[id]` - Get project details
- `PATCH /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

### Media
- `GET /api/projects/[id]/media` - List project media
- `POST /api/projects/[id]/media/upload-url` - Get upload URL
- `POST /api/projects/[id]/media` - Create media record
- `PATCH /api/media/[id]` - Update media
- `DELETE /api/media/[id]` - Delete media

### Sharing
- `POST /api/projects/[id]/invitations` - Send invitations
- `GET /api/projects/[id]/invitations` - List invitations
- `POST /api/invitations/[id]/resend` - Resend invitation
- `POST /api/invitations/[id]/revoke` - Revoke invitation

## User Roles

### Guest
- Browse marketing website
- Register and login

### User
- Access assigned projects
- View and download media
- Share projects via email
- Edit project names (if owner/editor)

### Admin
- All User capabilities
- View/edit all users and projects
- Add/delete/reorder media
- Assign/revoke project access
- Create users
- Promote/demote other admins

### Super Admin
- Full system access
- Create admins and users
- Global settings management
- Audit log access

## File Storage

The application supports multiple storage backends:

- **AWS S3** (recommended for production)
- **Local storage** (for development)

Media files are automatically processed:
- **Images**: Thumbnail generation, multiple sizes
- **Videos**: HLS transcoding, poster generation

## Security Features

- JWT authentication with httpOnly cookies
- Password hashing with bcrypt
- Email verification for new accounts
- Rate limiting on auth endpoints
- CSRF protection
- Secure file access with signed URLs
- Audit logging for sensitive operations

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio

### Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   └── dashboard/         # Client portal pages
├── components/            # React components
│   ├── landing/           # Landing page components
│   ├── layout/            # Layout components
│   └── ui/                # Reusable UI components
├── lib/                   # Utility libraries
│   ├── auth.ts            # Authentication utilities
│   ├── db.ts              # Database connection
│   └── email.ts           # Email service
└── types/                 # TypeScript type definitions
```

## Deployment

### Production Checklist

1. Set up production database
2. Configure AWS S3 bucket
3. Set up SMTP email service
4. Update environment variables
5. Run database migrations
6. Build and deploy application

### Environment Variables for Production

Ensure all environment variables are properly configured:
- Use strong, unique secrets
- Enable HTTPS
- Configure proper CORS settings
- Set up monitoring and logging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.
# drones
