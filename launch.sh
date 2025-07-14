#!/bin/bash

# CalKick Workout Tracker Launcher
echo "🥊 CalKick Workout Tracker"
echo "=========================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies."
        exit 1
    fi
fi

# Start the development server
echo "🚀 Starting CalKick Workout Tracker..."
echo "   Opening http://localhost:3000 in your browser..."
echo ""
echo "💡 Press Ctrl+C to stop the server"
echo ""

npm start