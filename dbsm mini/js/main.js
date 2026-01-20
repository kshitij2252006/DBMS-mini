/* Main JavaScript - Common Functions */

// Background images for hero section
const heroImages = [
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&h=1080&fit=crop',
  'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1920&h=1080&fit=crop'
];

let heroImageIndex = 0;

// Set up hero section background image slider
function setupHeroImageSlider() {
  const heroSection = document.getElementById('heroSection');
  if (heroSection) {
    heroSection.style.backgroundImage = `url(${heroImages[0]})`;
    
    setInterval(() => {
      heroImageIndex = (heroImageIndex + 1) % heroImages.length;
      heroSection.style.backgroundImage = `url(${heroImages[heroImageIndex]})`;
    }, 4000);
  }
}

// Check if user is logged in
window.addEventListener('load', function() {
  const user = localStorage.getItem('user');
  const currentPage = window.location.pathname.split('/').pop();
  
  // Protected pages - redirect to index if not logged in
  const protectedPages = ['home.html', 'events.html', 'bookings.html', 'create-event.html', 'profile.html'];
  
  if (protectedPages.includes(currentPage) && !user) {
    window.location.href = 'index.html';
  }
  
  // If logged in and on index, redirect to home
  if (currentPage === 'index.html' && user) {
    window.location.href = 'home.html';
  }
  
  // Display welcome message
  if (user && document.getElementById('welcomeMsg')) {
    const userData = JSON.parse(user);
    const userName = userData.fullname || userData.email.split('@')[0];
    document.getElementById('welcomeMsg').textContent = `Welcome back, ${userName}!`;
  }
  
  // Setup hero image slider
  setupHeroImageSlider();
});

// Logout functionality (only where logout button exists, e.g., profile page)
const logoutBtn = document.getElementById('logout');
if (logoutBtn) {
  logoutBtn.addEventListener('click', function(e) {
    e.preventDefault();
    if (confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('user');
      window.location.href = 'index.html';
    }
  });
}

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
  });
  
  // Close menu when clicking on a link
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function() {
      navMenu.classList.remove('active');
    });
  });
}

// Hide navbar on scroll down, show on scroll up
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

if (navbar) {
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scroll DOWN - hide navbar
      navbar.classList.add('hidden');
    } else {
      // Scroll UP - show navbar
      navbar.classList.remove('hidden');
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
}
