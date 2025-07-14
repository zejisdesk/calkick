#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🥊 CalKick Workout Tracker Setup');
console.log('================================\n');

// Check if Node.js version is compatible
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion < 14) {
    console.error('❌ Node.js version 14 or higher is required.');
    console.error(`   Current version: ${nodeVersion}`);
    console.error('   Please upgrade Node.js and try again.');
    process.exit(1);
}

console.log(`✅ Node.js version: ${nodeVersion}`);

// Check if npm is available
try {
    const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
    console.log(`✅ npm version: ${npmVersion}`);
} catch (error) {
    console.error('❌ npm is not available. Please install npm and try again.');
    process.exit(1);
}

// Check if package.json exists
if (!fs.existsSync('package.json')) {
    console.error('❌ package.json not found. Please run this script from the project root.');
    process.exit(1);
}

console.log('\n📦 Installing dependencies...');
try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed successfully!');
} catch (error) {
    console.error('❌ Failed to install dependencies.');
    process.exit(1);
}

console.log('\n🏗️  Building project...');
try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Project built successfully!');
} catch (error) {
    console.error('❌ Failed to build project.');
    process.exit(1);
}

console.log('\n🎉 Setup completed successfully!');
console.log('\n📋 Available commands:');
console.log('   npm start     - Start development server');
console.log('   npm run dev   - Start development server with file watching');
console.log('   npm run build - Build production files');
console.log('   npm run serve - Serve built files');
console.log('   npm run lint  - Check code quality');
console.log('   npm test      - Run tests (when available)');

console.log('\n🚀 To start the application:');
console.log('   npm start');

console.log('\n💡 The app will open automatically in your browser at http://localhost:3000');
console.log('\n📱 Features:');
console.log('   • 7-day workout tracking');
console.log('   • Automatic progress saving');
console.log('   • Mobile-responsive design');
console.log('   • Offline functionality');
console.log('   • Streak tracking');

console.log('\n🏋️  Ready to start your CalKick journey! 💪');