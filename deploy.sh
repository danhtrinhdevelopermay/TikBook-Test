#!/bin/bash
set -e

echo "🏗️ Building Social Media App for Production..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist/
rm -rf server/public/

# Build client with Vite
echo "📦 Building client..."
vite build

# Verify client build exists
if [ ! -d "dist/public" ]; then
  echo "❌ Client build failed - dist/public not found"
  exit 1
fi

# Build server with esbuild  
echo "🔧 Building server..."
esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

# Verify server build exists
if [ ! -f "dist/index.js" ]; then
  echo "❌ Server build failed - dist/index.js not found"
  exit 1
fi

# Copy client build files to server/public directory
echo "📁 Copying client files to server/public..."
mkdir -p server/public
cp -r dist/public/* server/public/

# Verify files were copied
echo "📋 Verifying copied files..."
ls -la server/public/
if [ ! -f "server/public/index.html" ]; then
  echo "❌ Copy failed - server/public/index.html not found"
  exit 1
fi

echo "✅ Build completed successfully!"
echo ""
echo "🚀 Files ready for deployment:"
echo "   - Server: dist/index.js"
echo "   - Client: server/public/"
echo ""
echo "📂 Contents of server/public/:"
ls -la server/public/
echo ""
echo "🔴 For Render deployment:"
echo "   - Build command: chmod +x deploy.sh && ./deploy.sh"  
echo "   - Start command: NODE_ENV=production node dist/index.js"
echo "   - Make sure to set all environment variables (DATABASE_URL, etc.)"