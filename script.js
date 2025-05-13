// Helper function to get a cookie by name
function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let c of cookies) {
        const [key, value] = c.split('=');
        if (key === name) return decodeURIComponent(value);
    }
    return null;
}

// Helper function to set a cookie
function setCookie(name, value, days = 7) {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

// Function to safely send GA4 events
function trackGAEvent(eventName, eventCategory, eventLabel) {
    if (typeof gtag === "function") {
        gtag('event', eventName, {
            event_category: eventCategory,
            event_label: eventLabel
        });
        console.log(`Tracked GA4 Event: ${eventName} | Category: ${eventCategory} | Label: ${eventLabel}`);
    } else {
        console.warn("GA4 gtag function not found. Skipping event tracking.");
    }
}

// Retrieve user data from cookies
let userName = getCookie('name');
let userTheme = getCookie('theme');

// Prompt for user name and theme if not already set
if (!userName) {
    userName = prompt("What's your name?") || "Guest";
    setCookie('name', userName);
    trackGAEvent('first_visit', 'user', userName);
}

if (!userTheme) {
    const prefersDark = confirm("Do you prefer dark mode?");
    userTheme = prefersDark ? "dark" : "light";
    setCookie('theme', userTheme);
    trackGAEvent('theme_choice', 'user', userTheme);
}

// Apply personalized greeting
const welcomeMessage = document.getElementById("welcome-message");
if (welcomeMessage && userName) {
    welcomeMessage.textContent = `Welcome back, ${userName}! Let's crush those fitness goals! 💪`;
    trackGAEvent('return_visit', 'user', userName);
}

// Apply the selected theme
function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add("dark-mode");
        document.body.classList.remove("light-mode");
    } else {
        document.body.classList.add("light-mode");
        document.body.classList.remove("dark-mode");
    }
}

applyTheme(userTheme);

// Add a theme toggle button for quick switching
const themeToggleButton = document.createElement('button');
themeToggleButton.textContent = userTheme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode";
themeToggleButton.classList.add('theme-toggle-button');
document.body.appendChild(themeToggleButton);

// Handle theme switching
themeToggleButton.addEventListener('click', () => {
    const newTheme = userTheme === 'dark' ? 'light' : 'dark';
    setCookie('theme', newTheme);
    applyTheme(newTheme);
    themeToggleButton.textContent = newTheme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode";
    userTheme = newTheme;
    trackGAEvent('theme_switch', 'user', newTheme);
});
