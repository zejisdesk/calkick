// YouTube Video ID Mapping for CalKick Exercises
// Real YouTube video IDs from popular fitness channels
const videoMapping = {
    // General exercises
    'jumping-jacks': 'c4DAnQ6DtF8',  // FitnessBlender jumping jacks
    'high-knees': 'OAJ_J3EZkdY',    // Athlean-X high knees
    'arm-circles': 'shqKhkNY5pE',   // Basic arm circles tutorial
    
    // Calisthenics exercises
    'explosive-push-ups': 'IODxDxX7oi4',     // Athlean-X explosive push ups
    'pike-push-up-burpees': 'auBLPXO8Fww',   // CrossFit burpee tutorial
    'jump-squats': 'CVaEhXotL7M',           // FitnessBlender jump squats
    'alternating-jump-lunges': 'mkCX1_2gXbE', // Jump lunge tutorial
    'single-leg-burpees': 'auBLPXO8Fww',    // Using burpee tutorial
    'lateral-bounds': 'Cvp_kVz3gCo',        // Lateral movement tutorial
    'burpee-broad-jumps': 'auBLPXO8Fww',    // CrossFit burpee (base movement)
    '180-degree-jump-squats': 'CVaEhXotL7M', // Jump squat variation
    'high-knee-runs': 'OAJ_J3EZkdY',        // High knees tutorial
    'kick-through': 'qDcniqddTeE',          // Animal flow movement
    'wall-sit': 'y-wV4Venusw',              // Wall sit tutorial
    'burpee-tuck-jumps': 'auBLPXO8Fww',     // Burpee variations
    'mountain-climber-cross-punch': 'nmwgirgXLYM', // Mountain climber tutorial
    'plank-jacks-punch': 'pSHjTRCQxIw',     // Plank jacks tutorial
    'burpee-180-jump': 'auBLPXO8Fww',       // Burpee variations
    'push-up-knee-to-elbow': 'IODxDxX7oi4',  // Push up variations
    'tabata-burpees': 'auBLPXO8Fww',        // Burpee tutorial
    'burpee-knee-tuck': 'auBLPXO8Fww',      // Burpee variations
    'plank-up-downs': 'pSHjTRCQxIw',        // Plank variations
    'v-ups': '7UVgs18Y1P4',                 // V-ups tutorial
    'standing-oblique-crunches': 'qDcniqddTeE', // Standing abs
    'standing-bicycle': 'nmwgirgXLYM',      // Standing cardio
    'plank-mountain-climbers': 'nmwgirgXLYM', // Mountain climbers
    'plank-kick-throughs': 'qDcniqddTeE',   // Animal flow
    'plank-burpees': 'auBLPXO8Fww',         // Burpee variations
    'burpee-ladder': 'auBLPXO8Fww',         // Burpee workout
    'russian-twist-punch': 'L_xrDAtykMI',   // Russian twists
    'bicycle-crunch-punch': '7UVgs18Y1P4',  // Bicycle crunches
    'woodchoppers': 'cfHs-5mC8UY',          // Woodchopper exercise
    
    // Kickboxing exercises
    'speed-bag-punches': 'cKO8SklQ_9s',     // Speed bag tutorial
    'non-stop-shadow-boxing': 'ljqra3BcqWM',  // Shadow boxing basics
    'squat-to-front-kick': 'CVaEhXotL7M',    // Squat kick combo
    'front-kick-squat-jump': 'CVaEhXotL7M',  // Kick squat combo
    'side-kick-lateral-lunge': 'Cvp_kVz3gCo', // Side kick tutorial
    'knee-strike-jump': 'auBLPXO8Fww',      // Knee strike basics
    'roundhouse-kick-simulation': 'rUC9EKVyMaq', // Roundhouse kick
    'cossack-squat-kick': 'CVaEhXotL7M',    // Cossack squat
    'squat-thrust-kick': 'auBLPXO8Fww',     // Squat thrust combo
    'tabata-kicks': 'ljqra3BcqWM',          // Kickboxing workout
    'jab-cross-hook-kick-combo': 'ljqra3BcqWM', // Boxing combos
    'sprawl-knee-strike': 'auBLPXO8Fww',    // MMA sprawl
    'duck-punch-kick-combo': 'ljqra3BcqWM',  // Boxing defense
    'non-stop-punches': 'ljqra3BcqWM',      // Punching technique
    'knee-strike-twist': 'auBLPXO8Fww',     // Knee strike variations
    'max-punches': 'ljqra3BcqWM',           // Speed punching
    'boxing-shuffle': 'ljqra3BcqWM',        // Boxing footwork
    'sprint-punches': 'ljqra3BcqWM',        // Fast punching
    
    // Hybrid exercises
    'burpee-with-jab-cross': 'auBLPXO8Fww',  // Burpee with boxing
    'push-up-to-t-punch': 'IODxDxX7oi4',    // Push up variations
    'plank-punch-outs': 'pSHjTRCQxIw',      // Plank with punches
    'boxing-mountain-climbers': 'nmwgirgXLYM', // Mountain climber combo
    'uppercut-squats': 'CVaEhXotL7M',       // Squat with uppercut
    'boxing-shuffle-hooks': 'ljqra3BcqWM',  // Boxing footwork
    'jump-squat-jab-cross': 'CVaEhXotL7M',  // Jump squat boxing
    'pike-push-up-knee-strike': 'IODxDxX7oi4', // Pike push up combo
    'lunge-jump-uppercut': 'CVaEhXotL7M',   // Lunge with boxing
    'squat-thrust-side-kick': 'auBLPXO8Fww', // Squat thrust kick
    'side-plank-punches': 'pSHjTRCQxIw',    // Side plank combo
    'uppercut-knee': 'ljqra3BcqWM'          // Uppercut knee combo
};

// Function to get video ID for an exercise
function getVideoId(exerciseName) {
    // Convert exercise name to key format
    const key = exerciseName.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, '-')
        .replace(/\+/g, '');
    
    return videoMapping[key] || 'auBLPXO8Fww'; // Default to CrossFit burpee tutorial if not found
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { videoMapping, getVideoId };
}