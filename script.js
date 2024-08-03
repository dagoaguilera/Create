document.addEventListener('DOMContentLoaded', () => {
  const images = document.getElementsByClassName("image");
  const totalPhotosElem = document.getElementById('total-photos');
  const currentPhoto = document.getElementById('current-photo');
  const totalPhotos = images.length; 

  let globalIndex = 0,
      last = { x: 0, y: 0 },
      threshold = window.innerWidth / 20;

  const activate = (image, x, y) => {
      image.style.left = `${x}px`;
      image.style.top = `${y}px`;
      image.style.zIndex = globalIndex;

      image.dataset.status = "active";

      last = { x, y };
  }

  const distanceFromLast = (x, y) => {
      return Math.hypot(x - last.x, y - last.y);
  }

  const handleOnMove = e => {
      if (distanceFromLast(e.clientX, e.clientY) > threshold) {
          const lead = images[globalIndex % images.length],
                tail = images[(globalIndex - 5) % images.length];

          activate(lead, e.clientX, e.clientY);

          if (tail) tail.dataset.status = "inactive";
          
          updatePhotoCount();

          globalIndex++;
      }
  }

  window.onmousemove = e => handleOnMove(e);

  window.ontouchmove = e => handleOnMove(e.touches[0]);

  const updatePhotoCount = () => {
      currentPhoto.textContent = (globalIndex % images.length) + 1;
      totalPhotosElem.textContent = totalPhotos;
  };

  updatePhotoCount();

  const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
  const currentTheme = localStorage.getItem('theme') || 'light'; // Default to light mode

  // Apply the current theme
  if (currentTheme === 'dark') {
      document.body.classList.add('dark-mode');
      toggleSwitch.checked = false;
  } else {
      document.body.classList.add('light-mode');
      toggleSwitch.checked = true;
  }

  toggleSwitch.addEventListener('change', e => {
      if (e.target.checked) {
          document.body.classList.add('light-mode');
          document.body.classList.remove('dark-mode');
          localStorage.setItem('theme', 'light');
      } else {
          document.body.classList.add('dark-mode');
          document.body.classList.remove('light-mode');
          localStorage.setItem('theme', 'dark');
      }
  });

  const photographerName = document.getElementById('photographer-name');
  const menuOptions = document.getElementById('menu-options');

  const toggleMenu = () => {
      const isVisible = menuOptions.classList.contains('show');
      
      if (isVisible) {
          menuOptions.classList.remove('show');
      } else {
          menuOptions.classList.add('show');
      }
  };

  photographerName.addEventListener('click', toggleMenu);

  document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
          menuOptions.classList.remove('show');
      }
  });

  window.addEventListener('load', updatePhotoCount);
});