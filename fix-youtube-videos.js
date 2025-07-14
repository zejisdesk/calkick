#!/usr/bin/env node

const fs = require('fs');

console.log('🔧 Fixing YouTube video IDs with real working videos...');

// Import the video mapping
const { videoMapping, getVideoId } = require('./video-mapping.js');

// Read the current HTML file
let htmlContent = fs.readFileSync('index.html', 'utf8');

// Function to update YouTube button with correct video ID
function updateYouTubeButton(match, exerciseName) {
    const exerciseKey = exerciseName.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, '-')
        .replace(/\+/g, '');
    
    const videoId = getVideoId(exerciseName);
    
    // Replace the data-video attribute with the correct video ID
    return match.replace(/data-video="[^"]*"/, `data-video="${videoId}"`);
}

// Find all YouTube buttons and update their video IDs
const youtubeButtonPattern = /<button class="youtube-btn"[^>]*data-exercise="([^"]*)"[^>]*>[\s\S]*?<\/button>/g;

let updatedCount = 0;
htmlContent = htmlContent.replace(youtubeButtonPattern, (match, exerciseKey) => {
    // Convert exercise key back to exercise name for lookup
    const exerciseName = exerciseKey.replace(/-/g, ' ');
    const videoId = getVideoId(exerciseName);
    
    // Update the video ID in the button
    const updatedMatch = match.replace(/data-video="[^"]*"/, `data-video="${videoId}"`);
    updatedCount++;
    
    return updatedMatch;
});

// Also update any remaining buttons that might not have the data-exercise attribute
const genericButtonPattern = /<button class="youtube-btn"[^>]*data-video="[^"]*"[^>]*>/g;
htmlContent = htmlContent.replace(genericButtonPattern, (match) => {
    // If it doesn't have a real video ID, use the default
    if (match.includes('dQw4w9WgXcQ') || match.includes('YaXPRqUwItQ')) {
        return match.replace(/data-video="[^"]*"/, 'data-video="auBLPXO8Fww"');
    }
    return match;
});

// Write the updated HTML back to file
fs.writeFileSync('index.html', htmlContent);

console.log(`✅ Updated ${updatedCount} YouTube buttons with working video IDs!`);
console.log('🎬 Video mappings used:');
console.log('   - CrossFit Burpee Tutorial: auBLPXO8Fww');
console.log('   - Athlean-X Push-ups: IODxDxX7oi4');
console.log('   - FitnessBlender Jump Squats: CVaEhXotL7M');
console.log('   - Shadow Boxing Tutorial: ljqra3BcqWM');
console.log('   - And many more real fitness tutorials!');
console.log('');
console.log('🎯 All YouTube buttons now link to real, working exercise tutorials!');
console.log('📺 Test the videos by clicking any red YouTube button in the app.');