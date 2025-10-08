#!/bin/bash

# Drone Media Services - Setup Script
# This script helps set up the development environment

set -e

echo "🚁 Setting up Drone Media Services..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm $(npm -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from template..."
    cp env.example .env.local
    echo "⚠️  Please edit .env.local with your configuration before continuing."
    echo "   Required: DATABASE_URL, NEXTAUTH_SECRET, AWS credentials, SMTP settings"
    echo ""
    echo "Press Enter when you've configured .env.local..."
    read
fi

# Check if PostgreSQL is available
echo "🗄️  Checking database connection..."
if command -v psql &> /dev/null; then
    echo "✅ PostgreSQL client detected"
else
    echo "⚠️  PostgreSQL client not found. Please install PostgreSQL."
    echo "   Visit: https://www.postgresql.org/download/"
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npm run db:generate

# Push database schema
echo "🗄️  Setting up database schema..."
echo "⚠️  Make sure your PostgreSQL database is running and accessible."
echo "   The script will attempt to push the schema to your database."
echo ""
echo "Press Enter to continue with database setup..."
read

npm run db:push

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Make sure your .env.local is properly configured"
echo "2. Start the development server: npm run dev"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "For production deployment, see the README.md file."
echo ""
echo "Happy coding! 🚁"
