// Exercise Data
const exercises = [
    { id: 'squats', name: 'Squats', image: 'squats' },
    { id: 'jump-squats', name: 'Jump Squats', image: 'jump-squats' },
    { id: 'lunges', name: 'Lunges', image: 'lunges' },
    { id: 'scale', name: 'Scale (Balance)', image: 'scale' },
    { id: 'hollow-hold', name: 'Hollow Hold', image: 'hollow-hold' },
    { id: 'superman', name: 'Superman', image: 'superman' },
    { id: 'push-ups', name: 'Push-ups', image: 'push-ups' }
];

// SVG Icons for exercises
const exerciseIcons = {
    'squats': `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="50" cy="15" r="10"/>
        <line x1="50" y1="25" x2="50" y2="50"/>
        <line x1="50" y1="35" x2="30" y2="45"/>
        <line x1="50" y1="35" x2="70" y2="45"/>
        <line x1="50" y1="50" x2="35" y2="75"/>
        <line x1="50" y1="50" x2="65" y2="75"/>
        <line x1="35" y1="75" x2="30" y2="90"/>
        <line x1="65" y1="75" x2="70" y2="90"/>
    </svg>`,
    'jump-squats': `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="50" cy="12" r="10"/>
        <line x1="50" y1="22" x2="50" y2="45"/>
        <line x1="50" y1="30" x2="25" y2="20"/>
        <line x1="50" y1="30" x2="75" y2="20"/>
        <line x1="50" y1="45" x2="35" y2="65"/>
        <line x1="50" y1="45" x2="65" y2="65"/>
        <line x1="35" y1="65" x2="30" y2="80"/>
        <line x1="65" y1="65" x2="70" y2="80"/>
        <path d="M40 88 L50 85 L60 88" stroke-dasharray="3 3"/>
    </svg>`,
    'lunges': `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="55" cy="15" r="10"/>
        <line x1="55" y1="25" x2="50" y2="50"/>
        <line x1="52" y1="35" x2="35" y2="45"/>
        <line x1="52" y1="35" x2="70" y2="40"/>
        <line x1="50" y1="50" x2="30" y2="70"/>
        <line x1="50" y1="50" x2="70" y2="75"/>
        <line x1="30" y1="70" x2="25" y2="90"/>
        <line x1="70" y1="75" x2="85" y2="90"/>
    </svg>`,
    'scale': `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="25" cy="45" r="10"/>
        <line x1="35" y1="45" x2="60" y2="45"/>
        <line x1="45" y1="45" x2="35" y2="35"/>
        <line x1="45" y1="45" x2="35" y2="55"/>
        <line x1="60" y1="45" x2="85" y2="40"/>
        <line x1="60" y1="45" x2="50" y2="70"/>
        <line x1="50" y1="70" x2="45" y2="90"/>
    </svg>`,
    'hollow-hold': `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="20" cy="55" r="8"/>
        <path d="M28 55 Q50 40 75 55"/>
        <line x1="75" y1="55" x2="90" y2="50"/>
        <line x1="28" y1="55" x2="10" y2="45"/>
        <line x1="10" y1="45" x2="5" y2="35"/>
    </svg>`,
    'superman': `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="20" cy="45" r="8"/>
        <path d="M28 45 Q50 55 75 45"/>
        <line x1="75" y1="45" x2="95" y2="35"/>
        <line x1="28" y1="45" x2="10" y2="35"/>
        <line x1="10" y1="35" x2="5" y2="25"/>
    </svg>`,
    'push-ups': `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="15" cy="40" r="8"/>
        <line x1="23" y1="40" x2="70" y2="45"/>
        <line x1="30" y1="42" x2="25" y2="60"/>
        <line x1="25" y1="60" x2="25" y2="75"/>
        <line x1="70" y1="45" x2="85" y2="45"/>
        <line x1="85" y1="45" x2="85" y2="75"/>
    </svg>`
};

// App State
const state = {
    settings: {
        exerciseDuration: 30,
        breakDuration: 10,
        sets: 1,
        voiceEnabled: true
    },
    workout: {
        isRunning: false,
        isPaused: false,
        currentExerciseIndex: 0,
        currentSet: 1,
        timeRemaining: 0,
        isBreak: false,
        startTime: null,
        totalPausedTime: 0,
        pauseStartTime: null
    },
    history: {
        // Array of dates in ISO format (YYYY-MM-DD) when workouts were completed
        completedDates: []
    },
    calendar: {
        // Currently displayed month/year
        displayedDate: new Date()
    }
};

// Audio Context for beeps
let audioContext = null;

// Speech synthesis
const synth = window.speechSynthesis;

// Timer interval
let timerInterval = null;

// DOM Elements
const screens = {
    start: document.getElementById('start-screen'),
    workout: document.getElementById('workout-screen'),
    break: document.getElementById('break-screen'),
    complete: document.getElementById('complete-screen')
};

// Initialize the app
function init() {
    loadSettings();
    loadHistory();
    renderExerciseList();
    renderCalendar();
    updateTotalTime();
    setupEventListeners();
}

// Load settings from localStorage
function loadSettings() {
    const saved = localStorage.getItem('workoutSettings');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            Object.assign(state.settings, parsed);
        } catch (e) {
            console.error('Failed to load settings:', e);
        }
    }
    updateSettingsDisplay();
}

// Save settings to localStorage
function saveSettings() {
    localStorage.setItem('workoutSettings', JSON.stringify(state.settings));
}

// Load workout history from localStorage
function loadHistory() {
    const saved = localStorage.getItem('workoutHistory');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            state.history.completedDates = parsed.completedDates || [];
        } catch (e) {
            console.error('Failed to load history:', e);
        }
    }
}

// Save workout history to localStorage
function saveHistory() {
    localStorage.setItem('workoutHistory', JSON.stringify(state.history));
}

// Record a completed workout for today
function recordWorkoutCompletion() {
    const today = new Date().toISOString().split('T')[0];
    if (!state.history.completedDates.includes(today)) {
        state.history.completedDates.push(today);
        saveHistory();
    }
}

// Update settings display
function updateSettingsDisplay() {
    document.getElementById('exercise-duration-value').textContent = state.settings.exerciseDuration;
    document.getElementById('break-duration-value').textContent = state.settings.breakDuration;
    document.getElementById('sets-value').textContent = state.settings.sets;
    document.getElementById('voice-toggle').setAttribute('aria-pressed', state.settings.voiceEnabled);
}

// Render the calendar for the current month
function renderCalendar() {
    const calendarGrid = document.getElementById('calendar-grid');
    const monthYearLabel = document.getElementById('calendar-month-year');
    const streakCount = document.getElementById('streak-count');

    const year = state.calendar.displayedDate.getFullYear();
    const month = state.calendar.displayedDate.getMonth();

    // Update month/year label
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
    monthYearLabel.textContent = `${monthNames[month]} ${year}`;

    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    // Build calendar grid
    let html = '';

    // Day headers
    const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    dayNames.forEach(day => {
        html += `<div class="calendar-day-header">${day}</div>`;
    });

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
        html += '<div class="calendar-day empty"></div>';
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isCompleted = state.history.completedDates.includes(dateStr);
        const isToday = dateStr === todayStr;

        let classes = 'calendar-day';
        if (isCompleted) classes += ' completed';
        if (isToday) classes += ' today';

        html += `<div class="${classes}">${day}</div>`;
    }

    calendarGrid.innerHTML = html;

    // Update streak count
    streakCount.textContent = calculateStreak();
}

// Calculate current streak
function calculateStreak() {
    if (state.history.completedDates.length === 0) return 0;

    // Sort dates in descending order
    const sortedDates = [...state.history.completedDates].sort().reverse();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const todayStr = today.toISOString().split('T')[0];
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    // Check if streak is still active (completed today or yesterday)
    const mostRecent = sortedDates[0];
    if (mostRecent !== todayStr && mostRecent !== yesterdayStr) {
        return 0;
    }

    // Count consecutive days
    let streak = 0;
    let checkDate = mostRecent === todayStr ? today : yesterday;

    for (const dateStr of sortedDates) {
        const expectedStr = checkDate.toISOString().split('T')[0];
        if (dateStr === expectedStr) {
            streak++;
            checkDate.setDate(checkDate.getDate() - 1);
        } else if (dateStr < expectedStr) {
            break;
        }
    }

    return streak;
}

// Navigate calendar to previous month
function prevMonth() {
    state.calendar.displayedDate.setMonth(state.calendar.displayedDate.getMonth() - 1);
    renderCalendar();
}

// Navigate calendar to next month
function nextMonth() {
    state.calendar.displayedDate.setMonth(state.calendar.displayedDate.getMonth() + 1);
    renderCalendar();
}

// Render exercise list on start screen
function renderExerciseList() {
    const list = document.getElementById('exercise-list');
    document.getElementById('exercise-count').textContent = exercises.length;

    list.innerHTML = exercises.map((exercise, index) => `
        <li>
            <div class="exercise-thumb">
                ${exerciseIcons[exercise.image]}
            </div>
            <div class="exercise-info">
                <span>${index + 1}. ${exercise.name}</span>
            </div>
        </li>
    `).join('');
}

// Calculate and update total workout time
function updateTotalTime() {
    const exerciseTime = state.settings.exerciseDuration * exercises.length;
    const breakTime = state.settings.breakDuration * (exercises.length - 1);
    const totalPerSet = exerciseTime + breakTime;
    const totalSeconds = totalPerSet * state.settings.sets + (state.settings.sets > 1 ? state.settings.breakDuration * (state.settings.sets - 1) : 0);

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    let timeString;
    if (minutes >= 60) {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        timeString = `~${hours}h ${remainingMinutes}min`;
    } else {
        timeString = seconds > 0 ? `~${minutes}min ${seconds}s` : `~${minutes}min`;
    }

    document.getElementById('total-time').textContent = timeString;
}

// Setup event listeners
function setupEventListeners() {
    // Setting adjustments
    document.querySelectorAll('.btn-adjust').forEach(btn => {
        btn.addEventListener('click', handleSettingAdjust);
    });

    // Voice toggle
    document.getElementById('voice-toggle').addEventListener('click', toggleVoice);

    // Calendar navigation
    document.getElementById('prev-month-btn').addEventListener('click', prevMonth);
    document.getElementById('next-month-btn').addEventListener('click', nextMonth);

    // Start button
    document.getElementById('start-btn').addEventListener('click', startWorkout);

    // Workout controls
    document.getElementById('pause-btn').addEventListener('click', togglePause);
    document.getElementById('cancel-btn').addEventListener('click', cancelWorkout);
    document.getElementById('break-cancel-btn').addEventListener('click', cancelWorkout);
    document.getElementById('skip-break-btn').addEventListener('click', skipBreak);

    // Restart button
    document.getElementById('restart-btn').addEventListener('click', restartApp);
}

// Handle setting adjustment
function handleSettingAdjust(e) {
    const setting = e.currentTarget.dataset.setting;
    const action = e.currentTarget.dataset.action;

    const limits = {
        'exercise-duration': { min: 10, max: 120, step: 5 },
        'break-duration': { min: 5, max: 60, step: 5 },
        'sets': { min: 1, max: 10, step: 1 }
    };

    const settingMap = {
        'exercise-duration': 'exerciseDuration',
        'break-duration': 'breakDuration',
        'sets': 'sets'
    };

    const key = settingMap[setting];
    const limit = limits[setting];

    if (action === 'increase') {
        state.settings[key] = Math.min(state.settings[key] + limit.step, limit.max);
    } else {
        state.settings[key] = Math.max(state.settings[key] - limit.step, limit.min);
    }

    updateSettingsDisplay();
    updateTotalTime();
    saveSettings();
}

// Toggle voice announcements
function toggleVoice() {
    state.settings.voiceEnabled = !state.settings.voiceEnabled;
    document.getElementById('voice-toggle').setAttribute('aria-pressed', state.settings.voiceEnabled);
    saveSettings();
}

// Show specific screen
function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
}

// Initialize Audio Context (must be called from user interaction)
function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
}

// Play beep sound
function playBeep(frequency = 800, duration = 200, type = 'sine') {
    if (!audioContext) return;

    try {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = type;

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration / 1000);
    } catch (e) {
        console.error('Audio playback failed:', e);
    }
}

// Play exercise complete sound (triple beep)
function playExerciseCompleteSound() {
    playBeep(600, 150);
    setTimeout(() => playBeep(700, 150), 180);
    setTimeout(() => playBeep(800, 200), 360);
}

// Play workout complete sound
function playWorkoutCompleteSound() {
    playBeep(523, 200); // C
    setTimeout(() => playBeep(659, 200), 220); // E
    setTimeout(() => playBeep(784, 200), 440); // G
    setTimeout(() => playBeep(1047, 400), 660); // High C
}

// Speak text using speech synthesis
function speak(text) {
    if (!state.settings.voiceEnabled || !synth) return;

    // Cancel any ongoing speech
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    synth.speak(utterance);
}

// Start workout
function startWorkout() {
    initAudio();

    // Reset workout state
    state.workout = {
        isRunning: true,
        isPaused: false,
        currentExerciseIndex: 0,
        currentSet: 1,
        timeRemaining: state.settings.exerciseDuration,
        isBreak: false,
        startTime: Date.now(),
        totalPausedTime: 0,
        pauseStartTime: null
    };

    showScreen('workout');
    updateWorkoutDisplay();
    announceExercise();
    startTimer();
}

// Update workout display
function updateWorkoutDisplay() {
    const exercise = exercises[state.workout.currentExerciseIndex];

    // Update exercise info
    document.getElementById('current-exercise-num').textContent = state.workout.currentExerciseIndex + 1;
    document.getElementById('total-exercises').textContent = exercises.length;
    document.getElementById('current-set').textContent = state.workout.currentSet;
    document.getElementById('total-sets').textContent = state.settings.sets;

    // Update exercise display
    document.getElementById('exercise-name').textContent = exercise.name;
    document.getElementById('exercise-image').innerHTML = exerciseIcons[exercise.image];

    // Update countdown
    document.getElementById('countdown-time').textContent = state.workout.timeRemaining;
    updateProgressRing('progress-ring-circle', state.workout.timeRemaining, state.settings.exerciseDuration);

    // Update next exercise
    const nextIndex = state.workout.currentExerciseIndex + 1;
    if (nextIndex < exercises.length) {
        document.getElementById('next-up').style.display = 'flex';
        document.getElementById('next-exercise-name').textContent = exercises[nextIndex].name;
    } else if (state.workout.currentSet < state.settings.sets) {
        document.getElementById('next-up').style.display = 'flex';
        document.getElementById('next-exercise-name').textContent = `Set ${state.workout.currentSet + 1}: ${exercises[0].name}`;
    } else {
        document.getElementById('next-up').style.display = 'none';
    }
}

// Update break display
function updateBreakDisplay() {
    const nextExercise = exercises[state.workout.currentExerciseIndex];

    // Update progress info
    document.getElementById('break-current-exercise').textContent = state.workout.currentExerciseIndex;
    document.getElementById('break-total-exercises').textContent = exercises.length;
    document.getElementById('break-current-set').textContent = state.workout.currentSet;
    document.getElementById('break-total-sets').textContent = state.settings.sets;

    // Update countdown
    document.getElementById('break-countdown-time').textContent = state.workout.timeRemaining;
    updateProgressRing('break-progress-ring-circle', state.workout.timeRemaining, state.settings.breakDuration);

    // Update upcoming exercise
    document.getElementById('upcoming-exercise-name').textContent = nextExercise.name;
    document.getElementById('upcoming-exercise-image').innerHTML = exerciseIcons[nextExercise.image];
}

// Update progress ring
function updateProgressRing(elementId, current, total) {
    const circle = document.getElementById(elementId);
    const circumference = 2 * Math.PI * 90; // radius = 90
    const progress = current / total;
    const offset = circumference * (1 - progress);
    circle.style.strokeDashoffset = offset;
}

// Announce current exercise
function announceExercise() {
    const exercise = exercises[state.workout.currentExerciseIndex];
    speak(exercise.name);
}

// Announce break
function announceBreak() {
    const nextExercise = exercises[state.workout.currentExerciseIndex];
    speak(`Rest. Next: ${nextExercise.name}`);
}

// Start timer
function startTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    timerInterval = setInterval(() => {
        if (state.workout.isPaused) return;

        state.workout.timeRemaining--;

        // Warning beeps at 3, 2, 1 seconds
        if (state.workout.timeRemaining <= 3 && state.workout.timeRemaining > 0) {
            playBeep(500, 100);
        }

        if (state.workout.isBreak) {
            updateBreakDisplay();
        } else {
            updateWorkoutDisplay();
        }

        if (state.workout.timeRemaining <= 0) {
            handleTimerComplete();
        }
    }, 1000);
}

// Handle timer completion
function handleTimerComplete() {
    clearInterval(timerInterval);

    if (state.workout.isBreak) {
        // Break is over, start next exercise
        playExerciseCompleteSound();
        state.workout.isBreak = false;
        state.workout.timeRemaining = state.settings.exerciseDuration;
        showScreen('workout');
        updateWorkoutDisplay();
        announceExercise();
        startTimer();
    } else {
        // Exercise is over
        playExerciseCompleteSound();
        state.workout.currentExerciseIndex++;

        // Check if set is complete
        if (state.workout.currentExerciseIndex >= exercises.length) {
            // Check if all sets are complete
            if (state.workout.currentSet >= state.settings.sets) {
                completeWorkout();
                return;
            }

            // Start next set
            state.workout.currentSet++;
            state.workout.currentExerciseIndex = 0;
        }

        // Start break
        state.workout.isBreak = true;
        state.workout.timeRemaining = state.settings.breakDuration;
        showScreen('break');
        updateBreakDisplay();
        announceBreak();
        startTimer();
    }
}

// Toggle pause
function togglePause() {
    state.workout.isPaused = !state.workout.isPaused;

    const pauseIcon = document.getElementById('pause-icon');
    const playIcon = document.getElementById('play-icon');
    const pauseText = document.getElementById('pause-text');
    const workoutScreen = document.getElementById('workout-screen');

    if (state.workout.isPaused) {
        pauseIcon.style.display = 'none';
        playIcon.style.display = 'block';
        pauseText.textContent = 'Resume';
        workoutScreen.classList.add('paused');
        state.workout.pauseStartTime = Date.now();
        speak('Paused');
    } else {
        pauseIcon.style.display = 'block';
        playIcon.style.display = 'none';
        pauseText.textContent = 'Pause';
        workoutScreen.classList.remove('paused');
        if (state.workout.pauseStartTime) {
            state.workout.totalPausedTime += Date.now() - state.workout.pauseStartTime;
            state.workout.pauseStartTime = null;
        }
        speak('Resume');
    }
}

// Skip break
function skipBreak() {
    if (!state.workout.isBreak) return;

    clearInterval(timerInterval);
    playBeep(600, 100);

    state.workout.isBreak = false;
    state.workout.timeRemaining = state.settings.exerciseDuration;
    showScreen('workout');
    updateWorkoutDisplay();
    announceExercise();
    startTimer();
}

// Cancel workout
function cancelWorkout() {
    clearInterval(timerInterval);
    synth.cancel();

    state.workout.isRunning = false;
    state.workout.isPaused = false;

    // Reset pause button state
    document.getElementById('pause-icon').style.display = 'block';
    document.getElementById('play-icon').style.display = 'none';
    document.getElementById('pause-text').textContent = 'Pause';
    document.getElementById('workout-screen').classList.remove('paused');

    showScreen('start');
}

// Complete workout
function completeWorkout() {
    clearInterval(timerInterval);
    playWorkoutCompleteSound();

    // Record workout completion for today
    recordWorkoutCompletion();

    // Calculate actual workout duration
    const endTime = Date.now();
    let totalDuration = (endTime - state.workout.startTime - state.workout.totalPausedTime) / 1000;

    // Format duration
    const minutes = Math.floor(totalDuration / 60);
    const seconds = Math.floor(totalDuration % 60);
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    // Update stats
    document.getElementById('stat-exercises').textContent = exercises.length;
    document.getElementById('stat-sets').textContent = state.settings.sets;
    document.getElementById('stat-time').textContent = formattedTime;

    state.workout.isRunning = false;

    speak('Workout complete! Great job!');
    showScreen('complete');
}

// Restart app
function restartApp() {
    // Reset pause button state
    document.getElementById('pause-icon').style.display = 'block';
    document.getElementById('play-icon').style.display = 'none';
    document.getElementById('pause-text').textContent = 'Pause';
    document.getElementById('workout-screen').classList.remove('paused');

    // Re-render calendar to show updated completion status
    renderCalendar();

    showScreen('start');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);