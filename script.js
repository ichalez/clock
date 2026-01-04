// Clock configuration - will be initialized when DOM is ready
let clocks = [];

/**
 * Update a single clock with the current time for its timezone
 * @param {Object} clock - Clock configuration object
 */
function updateClock(clock) {
    const now = new Date();

    // Get time components for the specific timezone
    const timeString = now.toLocaleTimeString('en-US', {
        timeZone: clock.timezone,
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    const dateString = now.toLocaleDateString('es-ES', {
        timeZone: clock.timezone,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Parse time components
    const [hours, minutes, seconds] = timeString.split(':').map(Number);

    // Calculate rotation angles
    // Second hand: 360° / 60 seconds = 6° per second
    const secondAngle = seconds * 6;

    // Minute hand: 360° / 60 minutes = 6° per minute + 0.1° per second
    const minuteAngle = minutes * 6 + seconds * 0.1;

    // Hour hand: 360° / 12 hours = 30° per hour + 0.5° per minute
    const hourAngle = (hours % 12) * 30 + minutes * 0.5;

    // Apply rotations with smooth transitions
    clock.hourHand.style.transform = `translateX(-50%) rotate(${hourAngle}deg)`;
    clock.minuteHand.style.transform = `translateX(-50%) rotate(${minuteAngle}deg)`;
    clock.secondHand.style.transform = `translateX(-50%) rotate(${secondAngle}deg)`;

    // Update digital display
    clock.digitalDisplay.textContent = timeString;

    // Update date display (capitalize first letter)
    clock.dateDisplay.textContent = dateString.charAt(0).toUpperCase() + dateString.slice(1);
}

/**
 * Update all clocks
 */
function updateAllClocks() {
    clocks.forEach(clock => updateClock(clock));
}

/**
 * Initialize smooth transitions for clock hands
 */
function initializeClockHands() {
    clocks.forEach(clock => {
        // Add smooth transition to all hands except second hand on first load
        clock.hourHand.style.transition = 'transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)';
        clock.minuteHand.style.transition = 'transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)';
        // Second hand gets a faster, smoother transition
        clock.secondHand.style.transition = 'transform 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)';
    });
}

/**
 * Handle smooth second hand animation
 * Prevents the second hand from jumping backwards when crossing 0
 */
let previousSeconds = -1;

function updateWithSmoothTransition() {
    const now = new Date();
    const currentSeconds = now.getSeconds();

    // Detect if we've crossed from 59 to 0
    if (previousSeconds === 59 && currentSeconds === 0) {
        clocks.forEach(clock => {
            // Temporarily disable transition
            clock.secondHand.style.transition = 'none';
        });

        // Update clocks
        updateAllClocks();

        // Re-enable transition after a brief moment
        setTimeout(() => {
            clocks.forEach(clock => {
                clock.secondHand.style.transition = 'transform 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)';
            });
        }, 50);
    } else {
        updateAllClocks();
    }

    previousSeconds = currentSeconds;
}

/**
 * Add entrance animation to clock cards
 */
function addEntranceAnimations() {
    const cards = document.querySelectorAll('.clock-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

/**
 * Initialize the application
 */
function init() {
    // Initialize clock configuration after DOM is ready
    clocks = [
        {
            timezone: 'Europe/Madrid',
            hourHand: document.getElementById('madrid-hour'),
            minuteHand: document.getElementById('madrid-minute'),
            secondHand: document.getElementById('madrid-second'),
            digitalDisplay: document.getElementById('madrid-digital'),
            dateDisplay: document.getElementById('madrid-date')
        },
        {
            timezone: 'America/Los_Angeles',
            hourHand: document.getElementById('sf-hour'),
            minuteHand: document.getElementById('sf-minute'),
            secondHand: document.getElementById('sf-second'),
            digitalDisplay: document.getElementById('sf-digital'),
            dateDisplay: document.getElementById('sf-date')
        },
        {
            timezone: 'Australia/Sydney',
            hourHand: document.getElementById('sydney-hour'),
            minuteHand: document.getElementById('sydney-minute'),
            secondHand: document.getElementById('sydney-second'),
            digitalDisplay: document.getElementById('sydney-digital'),
            dateDisplay: document.getElementById('sydney-date')
        }
    ];

    // Add entrance animations
    addEntranceAnimations();

    // Initialize clock hand transitions
    initializeClockHands();

    // Update clocks immediately
    updateAllClocks();

    // Update clocks every second
    setInterval(updateWithSmoothTransition, 1000);
}

// Start the application when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

/**
 * Add subtle parallax effect to clock cards on mouse move
 */
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.clock-card');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    cards.forEach((card, index) => {
        const depth = (index + 1) * 5;
        const moveX = (mouseX - 0.5) * depth;
        const moveY = (mouseY - 0.5) * depth;

        card.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

/**
 * Reset card position on mouse leave
 */
document.addEventListener('mouseleave', () => {
    const cards = document.querySelectorAll('.clock-card');
    cards.forEach(card => {
        card.style.transform = 'translate(0, 0)';
    });
});
