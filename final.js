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
}

if (!userTheme) {
    const prefersDark = confirm("Do you prefer dark mode?");
    userTheme = prefersDark ? "dark" : "light";
    setCookie('theme', userTheme);
}

// Apply personalized greeting
const welcomeMessage = document.getElementById("welcome-message");
if (welcomeMessage && userName) {
    welcomeMessage.textContent = `Welcome back, ${userName}! Let's crush those fitness goals! 💪`;
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
themeToggleButton.style.position = 'fixed';
themeToggleButton.style.bottom = '20px';
themeToggleButton.style.right = '20px';
themeToggleButton.style.backgroundColor = '#28A745';
themeToggleButton.style.color = '#fff';
themeToggleButton.style.border = 'none';
themeToggleButton.style.padding = '10px 20px';
themeToggleButton.style.borderRadius = '5px';
themeToggleButton.style.cursor = 'pointer';
themeToggleButton.style.zIndex = '9999';
document.body.appendChild(themeToggleButton);

// Handle theme switching
themeToggleButton.addEventListener('click', () => {
    const newTheme = userTheme === 'dark' ? 'light' : 'dark';
    setCookie('theme', newTheme);
    applyTheme(newTheme);
    themeToggleButton.textContent = newTheme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode";
    userTheme = newTheme;
});
