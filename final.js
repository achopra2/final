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

// Retrieve user data from cookies
let userName = getCookie('name');
let userTheme = getCookie('theme');

// Prompt for user name and theme if not already set
if (!userName) {
    userName = prompt("What's your name?") || "Guest";
    setCookie('name', userName);

    // Track first-time user event in GA4
    gtag('event', 'first_visit', {
        event_category: 'user',
        event_label: userName
    });
}

if (!userTheme) {
    const prefersDark = confirm("Do you prefer dark mode?");
    userTheme = prefersDark ? "dark" : "light";
    setCookie('theme', userTheme);

    // Track theme choice event in GA4
    gtag('event', 'theme_choice', {
        event_category: 'user',
        event_label: userTheme
    });
}

// Apply personalized greeting
const welcomeMessage = document.getElementById("welcome-message");
if (welcomeMessage && userName) {
    welcomeMessage.textContent = `Welcome back, ${userName}! Let's crush those fitness goals! 💪`;

    // Track return visit in GA4
    gtag('event', 'return_visit', {
        event_category: 'user',
        event_label: userName
    });
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

    // Track theme switch in GA4
    gtag('event', 'theme_switch', {
        event_category: 'user',
        event_label: newTheme
    });
});
