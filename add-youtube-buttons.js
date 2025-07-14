// Script to add YouTube buttons to all exercises
const fs = require('fs');

// Read the current HTML file
let htmlContent = fs.readFileSync('index.html', 'utf8');

// Function to add YouTube button to exercise items
function addYouTubeButton(exerciseName) {
    const exerciseKey = exerciseName.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, '-')
        .replace(/\+/g, '');
    
    return `
                            <button class="youtube-btn" data-exercise="${exerciseKey}" title="Find ${exerciseName} tutorials on YouTube">
                                <i class="fab fa-youtube"></i>
                            </button>`;
}

// Exercise mappings with their video IDs
const exercises = [
    // Monday exercises
    { name: 'Jumping jacks', id: 'dQw4w9WgXcQ' },
    { name: 'Arm circles + light punches', id: 'YaXPRqUwItQ' },
    { name: 'High knees', id: '8opcQdC-V-U' },
    { name: 'Burpee with jab-cross', id: 'mkCX1_2gXbE' },
    { name: 'Push-up to T-punch', id: '8jPQjjsBbIc' },
    { name: 'Speed bag punches', id: 'Cvp_kVz3gCo' },
    { name: 'Plank punch-outs', id: 'auBLPXO8Fww' },
    { name: 'Explosive push-ups', id: 'cfHs-5mC8UY' },
    { name: 'Boxing mountain climbers', id: 'rUC9EKVyMaq' },
    { name: 'Pike push-up burpees', id: '8opcQdC-V-U' },
    { name: 'Uppercut squats', id: 'qDcniqddTeE' },
    { name: 'Non-stop shadow boxing', id: 'y-wV4Venusw' },
    { name: 'Burpee ladder', id: 'TU8QYVW0gDU' },
    { name: 'Arm stretches while walking in place', id: 'nmwgirgXLYM' },
    
    // Tuesday exercises
    { name: 'Leg swings', id: 'A2jGVbdyb6g' },
    { name: 'Jump squats', id: 'YaXPRqUwItQ' },
    { name: 'Light kicks', id: 'mkCX1_2gXbE' },
    { name: 'Alternating jump lunges', id: '8jPQjjsBbIc' },
    { name: 'Single-leg burpees', id: 'Cvp_kVz3gCo' },
    { name: 'Squat to front kick', id: 'auBLPXO8Fww' },
    { name: 'Lateral bounds', id: 'rUC9EKVyMaq' },
    { name: 'Front kick + squat jump', id: '8opcQdC-V-U' },
    { name: 'Side kick + lateral lunge', id: 'qDcniqddTeE' },
    { name: 'Knee strike + jump', id: 'y-wV4Venusw' },
    { name: 'Roundhouse kick simulation', id: 'TU8QYVW0gDU' },
    { name: 'Cossack squat + kick', id: 'nmwgirgXLYM' },
    { name: 'Burpee broad jumps', id: 'A2jGVbdyb6g' },
    { name: '180-degree jump squats', id: 'L_xrDAtykMI' },
    { name: 'High knee runs', id: '7UVgs18Y1P4' },
    { name: 'Kick-through', id: 'cfHs-5mC8UY' },
    { name: 'Squat thrust + kick', id: 'dQw4w9WgXcQ' },
    { name: 'Tabata kicks', id: 'YaXPRqUwItQ' },
    { name: 'Wall sit', id: 'mkCX1_2gXbE' },
    { name: 'Quad stretch while walking', id: '8jPQjjsBbIc' }
];

// Process each exercise and add YouTube button if not already present
exercises.forEach(exercise => {
    const exercisePattern = new RegExp(
        `(<div class="exercise-details">\\s*<span class="exercise-name">${exercise.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</span>[\\s\\S]*?</div>)(?!\\s*<button class="youtube-btn")`,
        'g'
    );
    
    htmlContent = htmlContent.replace(exercisePattern, (match) => {
        return match + addYouTubeButton(exercise.name, exercise.id);
    });
});

// Write the updated HTML back to file
fs.writeFileSync('index.html', htmlContent);

console.log('✅ YouTube buttons added to all exercises!');
console.log('📺 Total exercises processed:', exercises.length);