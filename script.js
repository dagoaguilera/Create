document.addEventListener('DOMContentLoaded', () => {
    const images = document.getElementsByClassName("image");
    const totalPhotosElem = document.getElementById('total-photos');
    const currentPhoto = document.getElementById('current-photo');
    const totalPhotos = images.length;

    let globalIndex = 0,
        last = { x: 0, y: 0 },
        threshold = window.innerWidth / 40;

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
            const leadIndex = globalIndex % images.length;
            const tailIndex = (globalIndex - 1 + images.length) % images.length;
            
            const lead = images[leadIndex];
            const tail = images[tailIndex];

            activate(lead, e.clientX, e.clientY);

            if (globalIndex > 0) {
                tail.dataset.status = "inactive";
            }

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
    const currentTheme = localStorage.getItem('theme') || 'light';

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
    let menuIsOpen = false;

    const toggleMenu = () => {
        if (menuIsOpen) {
            menuOptions.classList.remove('show');
            menuIsOpen = false;
        } else {
            menuOptions.classList.add('show');
            menuIsOpen = true;
        }
    };

    const closeMenuOnClickOutside = (e) => {
        if (!menuOptions.contains(e.target) && !photographerName.contains(e.target)) {
            menuOptions.classList.remove('show');
            menuIsOpen = false;
            document.removeEventListener('click', closeMenuOnClickOutside);
        }
    };

    photographerName.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
        if (menuIsOpen) {
            setTimeout(() => {
                document.addEventListener('click', closeMenuOnClickOutside);
            }, 0);
        }
    });

    menuOptions.addEventListener('mouseleave', () => {
        if (menuIsOpen) {
            menuOptions.classList.remove('show');
            menuIsOpen = false;
        }
    });

    menuOptions.addEventListener('touchend', () => {
        // Prevent menu from closing when touching within the menu
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            menuOptions.classList.remove('show');
            menuIsOpen = false;
            document.removeEventListener('click', closeMenuOnClickOutside);
        }
    });

    window.addEventListener('load', updatePhotoCount);
});
