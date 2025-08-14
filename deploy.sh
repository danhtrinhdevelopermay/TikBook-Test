#!/bin/bash

echo "🏗️ Building Social Media App for Production..."

# Build client with Vite
echo "📦 Building client..."
vite build

# Build server with esbuild  
echo "🔧 Building server..."
esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

# Copy client build files to server/public directory
echo "📁 Copying client files to server/public..."
mkdir -p server/public
cp -r dist/public/* server/public/

echo "✅ Build completed!"
echo "🚀 Files ready for deployment:"
echo "   - Server: dist/index.js"
echo "   - Client: server/public/"

echo ""
echo "🔴 For Render deployment:"
echo "   - Build command: ./deploy.sh"  
echo "   - Start command: NODE_ENV=production node dist/index.js"
echo "   - Make sure to set all environment variables (DATABASE_URL, etc.)"