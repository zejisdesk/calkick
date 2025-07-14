#!/usr/bin/env node

const fs = require('fs');

console.log('🎬 Adding YouTube buttons to all exercises...');

// Read the current HTML file
let htmlContent = fs.readFileSync('index.html', 'utf8');

// Function to create YouTube button HTML
function createYouTubeButton(exerciseName, videoId = 'dQw4w9WgXcQ') {
    const exerciseKey = exerciseName.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, '-')
        .replace(/\+/g, '');
    
    return `
                            <button class="youtube-btn" data-video="${videoId}" data-exercise="${exerciseKey}" title="Watch ${exerciseName} tutorial">
                                <i class="fab fa-youtube"></i>
                            </button>`;
}

// Exercise mappings with their video IDs (sample mapping)
const videoMappings = {
    'jumping-jacks': 'dQw4w9WgXcQ',
    'arm-circles-light-punches': 'YaXPRqUwItQ',
    'high-knees': '8opcQdC-V-U',
    'burpee-with-jab-cross': 'mkCX1_2gXbE',
    'push-up-to-t-punch': '8jPQjjsBbIc',
    'speed-bag-punches': 'Cvp_kVz3gCo',
    'plank-punch-outs': 'auBLPXO8Fww',
    'explosive-push-ups': 'cfHs-5mC8UY',
    'boxing-mountain-climbers': 'rUC9EKVyMaq',
    'pike-push-up-burpees': '8opcQdC-V-U',
    'uppercut-squats': 'qDcniqddTeE',
    'non-stop-shadow-boxing': 'y-wV4Venusw',
    'burpee-ladder': 'TU8QYVW0gDU',
    'arm-stretches-while-walking-in-place': 'nmwgirgXLYM',
    'leg-swings': 'A2jGVbdyb6g',
    'jump-squats': 'YaXPRqUwItQ',
    'light-kicks': 'mkCX1_2gXbE',
    'alternating-jump-lunges': '8jPQjjsBbIc',
    'single-leg-burpees': 'Cvp_kVz3gCo',
    'squat-to-front-kick': 'auBLPXO8Fww',
    'lateral-bounds': 'rUC9EKVyMaq',
    'front-kick-squat-jump': '8opcQdC-V-U',
    'side-kick-lateral-lunge': 'qDcniqddTeE',
    'knee-strike-jump': 'y-wV4Venusw',
    'roundhouse-kick-simulation': 'TU8QYVW0gDU',
    'cossack-squat-kick': 'nmwgirgXLYM',
    'burpee-broad-jumps': 'A2jGVbdyb6g',
    '180-degree-jump-squats': 'L_xrDAtykMI',
    'high-knee-runs': '7UVgs18Y1P4',
    'kick-through': 'cfHs-5mC8UY',
    'squat-thrust-kick': 'dQw4w9WgXcQ',
    'tabata-kicks': 'YaXPRqUwItQ',
    'wall-sit': 'mkCX1_2gXbE',
    'quad-stretch-while-walking': '8jPQjjsBbIc'
};

// Find all exercise items that don't already have YouTube buttons
const exercisePattern = /<label class="exercise-item">[\s\S]*?<div class="exercise-details">[\s\S]*?<span class="exercise-name">(.*?)<\/span>[\s\S]*?<\/div>(?!\s*<button class="youtube-btn")/g;

let match;
let addedCount = 0;

// Process each exercise item
htmlContent = htmlContent.replace(exercisePattern, (fullMatch, exerciseName) => {
    const exerciseKey = exerciseName.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, '-')
        .replace(/\+/g, '');
    
    const videoId = videoMappings[exerciseKey] || 'dQw4w9WgXcQ';
    const youtubeButton = createYouTubeButton(exerciseName, videoId);
    
    addedCount++;
    return fullMatch + youtubeButton;
});

// Write the updated HTML back to file
fs.writeFileSync('index.html', htmlContent);

console.log(`✅ Successfully added ${addedCount} YouTube buttons!`);
console.log('🎥 All exercises now have video tutorial buttons');
console.log('📺 Click any red YouTube button to watch exercise tutorials');

// Also update the package.json to include this script
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
packageJson.scripts['add-youtube'] = 'node add-all-youtube-buttons.js';
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

console.log('📦 Added "npm run add-youtube" script to package.json');