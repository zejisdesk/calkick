#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Simple build script for CalKick
console.log('🏗️  Building CalKick Workout Tracker...');

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Copy HTML file to dist
const htmlContent = fs.readFileSync('index.html', 'utf8');
const optimizedHtml = htmlContent
    .replace('styles.css', 'styles.min.css')
    .replace('script.js', 'script.min.js');

fs.writeFileSync(path.join(distDir, 'index.html'), optimizedHtml);

// Copy service worker
fs.copyFileSync('sw.js', path.join(distDir, 'sw.js'));

console.log('✅ Build completed successfully!');
console.log('📁 Files created in dist/ directory:');
console.log('   - index.html (optimized)');
console.log('   - styles.min.css (will be created by npm run minify-css)');
console.log('   - script.min.js (will be created by npm run minify-js)');
console.log('   - sw.js (service worker)');
console.log('');
console.log('🚀 To complete the build, run:');
console.log('   npm run minify-css');
console.log('   npm run minify-js');
console.log('');
console.log('📦 Or run the full build with:');
console.log('   npm run build');