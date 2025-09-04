// Mobile menu toggle
const menuIcon = document.getElementById('menu-icon');
const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('close-btn');

if (menuIcon && sidebar && closeBtn) {
  menuIcon.addEventListener('click', () => {
    sidebar.classList.add('active');
  });
  closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
  });
}

// Parallax + animation (only on Home page)
const parallax = document.getElementById('parallax');
const heroText = document.getElementById('hero-text');

if (parallax && heroText) {
  const images = [
    'https://source.unsplash.com/1600x900/?nature,technology',
    'https://source.unsplash.com/1600x900/?science',
    'https://source.unsplash.com/1600x900/?research',
    'https://source.unsplash.com/1600x900/?innovation'
  ];
  let currentImage = 0;

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    parallax.style.backgroundPositionY = -(scrollPos * 0.5) + 'px';

    if (scrollPos > window.innerHeight * (currentImage + 1)) {
      currentImage = (currentImage + 1) % images.length;
      parallax.style.backgroundImage = `url(${images[currentImage]})`;
      heroText.style.animation = 'fadeIn 1.5s ease-in-out';
    }
  });
}
