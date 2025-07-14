// CalKick Workout Tracker JavaScript

class WorkoutTracker {
    constructor() {
        this.currentDay = this.getCurrentDay();
        this.exercises = this.loadProgress();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setActiveTab();
        this.updateProgress();
        this.updateStreakCounter();
    }

    getCurrentDay() {
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const today = new Date().getDay();
        return days[today];
    }

    loadProgress() {
        const saved = localStorage.getItem('calkick-progress');
        return saved ? JSON.parse(saved) : {};
    }

    saveProgress() {
        localStorage.setItem('calkick-progress', JSON.stringify(this.exercises));
        this.updateProgress();
        this.updateStreakCounter();
        this.updateTabCompletionStatus();
    }

    setupEventListeners() {
        // Tab buttons
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const day = e.currentTarget.dataset.day;
                this.setActiveTab(day);
            });
        });
        
        // YouTube buttons
        this.setupYouTubeModal();

        // Exercise checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            const exerciseId = checkbox.dataset.exercise;
            
            // Set initial state
            if (this.exercises[exerciseId]) {
                checkbox.checked = true;
                checkbox.closest('.exercise-item').classList.add('completed');
            }

            // Add event listener
            checkbox.addEventListener('change', (e) => {
                const isChecked = e.target.checked;
                const exerciseItem = e.target.closest('.exercise-item');
                
                if (isChecked) {
                    this.exercises[exerciseId] = {
                        completed: true,
                        date: new Date().toISOString()
                    };
                    exerciseItem.classList.add('completed');
                    this.showCompletionAnimation(exerciseItem);
                } else {
                    delete this.exercises[exerciseId];
                    exerciseItem.classList.remove('completed');
                }
                
                this.saveProgress();
            });
        });

        // Reset button
        document.getElementById('resetProgress').addEventListener('click', () => {
            this.resetProgress();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key >= '1' && e.key <= '7') {
                const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
                const dayIndex = parseInt(e.key) - 1;
                if (dayIndex < days.length) {
                    this.setActiveTab(days[dayIndex]);
                }
            }
        });
    }

    setActiveTab(day = null) {
        const targetDay = day || this.currentDay;
        
        // Remove active class from all tabs and content
        document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        // Add active class to target tab and content
        const targetButton = document.querySelector(`[data-day="${targetDay}"]`);
        const targetContent = document.getElementById(targetDay);
        
        if (targetButton && targetContent) {
            targetButton.classList.add('active');
            targetContent.classList.add('active');
        }

        // Scroll to top of content
        document.querySelector('.workout-content').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }

    updateProgress() {
        const totalDays = 7;
        const completedDays = this.getCompletedDays().length;
        const progressPercentage = (completedDays / totalDays) * 100;
        
        const progressFill = document.getElementById('weekProgress');
        const progressText = document.getElementById('progressText');
        
        if (progressFill && progressText) {
            progressFill.style.width = `${progressPercentage}%`;
            progressText.textContent = `${completedDays}/${totalDays} days completed`;
        }
    }

    updateStreakCounter() {
        const streak = this.calculateStreak();
        const streakElement = document.getElementById('streakCount');
        
        if (streakElement) {
            streakElement.textContent = streak;
        }
    }

    updateTabCompletionStatus() {
        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        
        days.forEach(day => {
            const button = document.querySelector(`[data-day="${day}"]`);
            const isCompleted = this.isDayCompleted(day);
            
            if (button) {
                if (isCompleted) {
                    button.classList.add('completed');
                } else {
                    button.classList.remove('completed');
                }
            }
        });
    }

    isDayCompleted(day) {
        const dayExercises = this.getDayExercises(day);
        if (dayExercises.length === 0) return false;
        
        return dayExercises.every(exerciseId => this.exercises[exerciseId]);
    }

    getDayExercises(day) {
        const exercises = [];
        const dayContent = document.getElementById(day);
        
        if (dayContent) {
            dayContent.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                exercises.push(checkbox.dataset.exercise);
            });
        }
        
        return exercises;
    }

    getCompletedDays() {
        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        return days.filter(day => this.isDayCompleted(day));
    }

    calculateStreak() {
        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        const today = new Date();
        let streak = 0;
        
        // Start from today and go backwards
        for (let i = 0; i < 7; i++) {
            const checkDate = new Date(today);
            checkDate.setDate(today.getDate() - i);
            const dayName = days[checkDate.getDay()];
            
            if (this.isDayCompleted(dayName)) {
                streak++;
            } else {
                break;
            }
        }
        
        return streak;
    }

    showCompletionAnimation(exerciseItem) {
        // Add a temporary celebration class
        exerciseItem.classList.add('celebration');
        
        // Create a small celebration effect
        const celebration = document.createElement('div');
        celebration.innerHTML = '🎉';
        celebration.style.cssText = `
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 1.2rem;
            animation: celebrationPop 0.6s ease-out forwards;
            pointer-events: none;
        `;
        
        // Add celebration animation CSS if not exists
        if (!document.getElementById('celebration-styles')) {
            const style = document.createElement('style');
            style.id = 'celebration-styles';
            style.textContent = `
                @keyframes celebrationPop {
                    0% { transform: translateY(-50%) scale(0); opacity: 0; }
                    50% { transform: translateY(-50%) scale(1.2); opacity: 1; }
                    100% { transform: translateY(-50%) scale(0); opacity: 0; }
                }
                .celebration {
                    position: relative;
                }
            `;
            document.head.appendChild(style);
        }
        
        exerciseItem.appendChild(celebration);
        
        // Remove celebration elements after animation
        setTimeout(() => {
            exerciseItem.classList.remove('celebration');
            if (celebration.parentNode) {
                celebration.parentNode.removeChild(celebration);
            }
        }, 600);
    }

    resetProgress() {
        if (confirm('Are you sure you want to reset all progress? This action cannot be undone.')) {
            // Clear localStorage
            localStorage.removeItem('calkick-progress');
            
            // Reset internal state
            this.exercises = {};
            
            // Uncheck all checkboxes
            document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false;
                checkbox.closest('.exercise-item').classList.remove('completed');
            });
            
            // Update UI
            this.updateProgress();
            this.updateStreakCounter();
            this.updateTabCompletionStatus();
            
            // Show confirmation
            this.showResetConfirmation();
        }
    }

    showResetConfirmation() {
        const confirmation = document.createElement('div');
        confirmation.innerHTML = '✅ Progress Reset Successfully!';
        confirmation.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
        `;
        
        // Add slide animation if not exists
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(confirmation);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            confirmation.style.animation = 'slideOutRight 0.3s ease-out forwards';
            setTimeout(() => {
                if (confirmation.parentNode) {
                    confirmation.parentNode.removeChild(confirmation);
                }
            }, 300);
        }, 3000);
    }

    // Export progress data
    exportProgress() {
        const data = {
            exercises: this.exercises,
            exportDate: new Date().toISOString(),
            completedDays: this.getCompletedDays(),
            streak: this.calculateStreak()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `calkick-progress-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    // Import progress data
    importProgress(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (data.exercises) {
                    this.exercises = data.exercises;
                    this.saveProgress();
                    
                    // Update checkboxes
                    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                        const exerciseId = checkbox.dataset.exercise;
                        if (this.exercises[exerciseId]) {
                            checkbox.checked = true;
                            checkbox.closest('.exercise-item').classList.add('completed');
                        }
                    });
                    
                    alert('Progress imported successfully!');
                }
            } catch (error) {
                alert('Error importing progress. Please check the file format.');
            }
        };
        reader.readAsText(file);
    }
    
    // YouTube Modal functionality
    setupYouTubeModal() {
        const modal = document.getElementById('youtubeModal');
        const closeBtn = document.getElementById('closeModal');
        const modalTitle = document.getElementById('modalTitle');
        const videoDescription = document.getElementById('videoDescription');
        const openYoutubeBtn = document.getElementById('openYoutube');
        const shareVideoBtn = document.getElementById('shareVideo');
        
        // These properties are now stored at the class level
        this.currentSearchQuery = '';
        this.currentExerciseName = '';
        
        // YouTube button click handlers
        document.addEventListener('click', (e) => {
            if (e.target.closest('.youtube-btn')) {
                e.preventDefault();
                e.stopPropagation();
                
                const button = e.target.closest('.youtube-btn');
                const exerciseName = button.dataset.exercise || 'Exercise';
                
                this.openYouTubeModal(exerciseName);
            }
        });
        
        // Close modal handlers
        closeBtn.addEventListener('click', () => {
            this.closeYouTubeModal();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeYouTubeModal();
            }
        });
        
        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                this.closeYouTubeModal();
            }
        });
        
        // Open in YouTube button
        openYoutubeBtn.addEventListener('click', () => {
            if (this.currentSearchQuery) {
                // Create a more specific search query for better results
                const enhancedQuery = `${this.currentSearchQuery}+workout+exercise+tutorial+how+to`;
                window.open(`https://www.youtube.com/results?search_query=${enhancedQuery}`, '_blank');
            }
        });
        
        // Share video button
        shareVideoBtn.addEventListener('click', () => {
            if (this.currentSearchQuery) {
                // Use the same enhanced query for sharing
                const enhancedQuery = `${this.currentSearchQuery}+workout+exercise+tutorial+how+to`;
                const shareUrl = `https://www.youtube.com/results?search_query=${enhancedQuery}`;
                
                if (navigator.share) {
                    navigator.share({
                        title: `${this.currentExerciseName} Tutorials`,
                        text: `Check out these ${this.currentExerciseName} workout tutorials from CalKick!`,
                        url: shareUrl
                    });
                } else {
                    // Fallback: copy to clipboard
                    navigator.clipboard.writeText(shareUrl).then(() => {
                        this.showNotification('Search link copied to clipboard!');
                    }).catch(() => {
                        // Fallback for older browsers
                        prompt('Copy this link:', shareUrl);
                    });
                }
            }
        });
    }
    
    openYouTubeModal(exerciseName) {
        const modal = document.getElementById('youtubeModal');
        const modalTitle = document.getElementById('modalTitle');
        const videoDescription = document.getElementById('videoDescription');
        const searchTitle = document.getElementById('search-title');
        const searchDescription = document.getElementById('search-description');
        
        // Format exercise name for display
        const formattedName = exerciseName.replace(/-/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
        
        // Set modal content
        modalTitle.textContent = `${formattedName} Tutorial`;
        
        // Create search query from exercise name
        const searchQuery = formattedName.toLowerCase().replace(/\s+/g, '+');
        
        // Update the placeholder text to include the exercise name
        searchTitle.textContent = `Find the best ${formattedName.toLowerCase()} tutorials`;
        searchDescription.textContent = `Click the button below to search for ${formattedName.toLowerCase()} tutorials on YouTube`;
        
        // Show a message in the modal that directs users to click the button
        videoDescription.textContent = `Find the perfect ${formattedName.toLowerCase()} tutorial that matches your skill level and preferences.`;
        
        // Store current exercise info
        this.currentExerciseName = formattedName;
        this.currentSearchQuery = searchQuery;
        
        // Show modal
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Focus management for accessibility
        setTimeout(() => {
            document.getElementById('closeModal').focus();
        }, 100);
    }
    
    closeYouTubeModal() {
        const modal = document.getElementById('youtubeModal');
        
        // Hide modal with animation
        modal.style.animation = 'fadeOut 0.3s ease';
        
        setTimeout(() => {
            modal.classList.remove('show');
            modal.style.animation = '';
            document.body.style.overflow = '';
        }, 300);
    }
    
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.innerHTML = `${type === 'success' ? '✅' : '❌'} ${message}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 1001;
            animation: slideInRight 0.3s ease-out;
            max-width: 300px;
            word-wrap: break-word;
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const tracker = new WorkoutTracker();
    
    // Make tracker globally available for debugging
    window.workoutTracker = tracker;
    
    // Add keyboard shortcuts info
    console.log('CalKick Workout Tracker loaded!');
    console.log('Keyboard shortcuts: Press 1-7 to switch between days');
    console.log('Available methods: workoutTracker.exportProgress(), workoutTracker.importProgress(file)');
});

// Service Worker registration for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Add touch gestures for mobile (optional enhancement)
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        const currentTab = document.querySelector('.tab-button.active');
        const currentDay = currentTab ? currentTab.dataset.day : 'monday';
        const currentIndex = days.indexOf(currentDay);
        
        let newIndex;
        if (diff > 0) {
            // Swipe left - next day
            newIndex = (currentIndex + 1) % days.length;
        } else {
            // Swipe right - previous day
            newIndex = (currentIndex - 1 + days.length) % days.length;
        }
        
        if (window.workoutTracker) {
            window.workoutTracker.setActiveTab(days[newIndex]);
        }
    }
}