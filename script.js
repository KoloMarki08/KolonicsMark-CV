const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const htmlElement = document.documentElement;

// Ellenőrizzük, volt-e már korábban elmentett beállítás (localStorage)
const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
htmlElement.setAttribute('data-bs-theme', savedTheme);
updateIcon(savedTheme);

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    updateIcon(newTheme);
});

function updateIcon(theme) {
    if(theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun'); // Sötét módban nap ikon látszik
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon'); // Világos módban hold ikon látszik
    }
}