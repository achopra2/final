// Check and retrieve cookie values
function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let c of cookies) {
        const [key, value] = c.split('=');
        if (key === name) return decodeURIComponent(value);
    }
    return null;
}

// Set cookies with a 7-day expiry
function setCookie(name, value, days = 7) {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

// Retrieve user data
let userName = getCookie('name');
let userTheme = getCookie('theme');

// Prompt for user info if not already stored
if (!userName || !userTheme) {
    userName = prompt("What's your name?");
    userTheme = prompt("Do you prefer dark or light theme?").toLowerCase();

    setCookie('name', userName);
    setCookie('theme', userTheme);
}

// Apply personalized greeting
const welcomeMessage = document.getElementById("welcome-message");
if (welcomeMessage && userName) {
    welcomeMessage.textContent = `Welcome back, ${userName}! Let's crush those fitness goals! 💪`;
}

// Apply theme
function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.style.backgroundColor = "#121212";
        document.body.style.color = "#f1f1f1";
    } else {
        document.body.style.backgroundColor = "#ffffff";
        document.body.style.color = "#333333";
    }
}

applyTheme(userTheme);

// Optional: Theme toggle button
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

themeToggleButton.addEventListener('click', () => {
    const newTheme = userTheme === 'dark' ? 'light' : 'dark';
    setCookie('theme', newTheme);
    applyTheme(newTheme);
    themeToggleButton.textContent = newTheme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode";
});
