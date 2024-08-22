document.addEventListener('DOMContentLoaded', () => {
    const images = document.getElementsByClassName("image");
    const totalPhotosElem = document.getElementById('total-photos');
    const currentPhoto = document.getElementById('current-photo');
    const totalPhotos = images.length;

    let globalIndex = -1,
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
            globalIndex++;  
            const leadIndex = globalIndex % images.length;
            const tailIndex = (globalIndex - 1 + images.length) % images.length;

            const lead = images[leadIndex];
            const tail = images[tailIndex];

            activate(lead, e.clientX, e.clientY);

            if (globalIndex > 0) {
                tail.dataset.status = "inactive"; 
            }

            updatePhotoCount();
        }
    }

    window.onmousemove = e => handleOnMove(e);

    window.ontouchmove = e => handleOnMove(e.touches[0]);

    const updatePhotoCount = () => {
        currentPhoto.textContent = globalIndex >= 0 ? (globalIndex % images.length) + 1 : 0;
        totalPhotosElem.textContent = totalPhotos;
    };

    updatePhotoCount();

    const photographerName = document.getElementById('photographer-name');
    let menuIsOpen = false;

    const toggleMenu = () => {
        if (menuIsOpen) {
            menuOptions.classList.add('hide');
            menuOptions.classList.remove('show');
            menuIsOpen = false;
        } else {
            menuOptions.classList.add('show');
            menuOptions.classList.remove('hide');
            menuIsOpen = true;
        }
    };

    const closeMenuOnClickOutside = (e) => {
        if (!menuOptions.contains(e.target) && !photographerName.contains(e.target)) {
            menuOptions.classList.add('hide');
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

    window.addEventListener('load', updatePhotoCount);
});

function openNav() {
    const overlay = document.getElementById("myNav");
    overlay.style.display = 'block';
    setTimeout(() => {
        overlay.classList.add("show");
        overlay.classList.remove("hide");
    }, 0);
}

function closeNav() {
    const overlay = document.getElementById("myNav");
    overlay.classList.add("hide");
    overlay.classList.remove("show");
    
    overlay.addEventListener('transitionend', () => {
        if (overlay.classList.contains('hide')) {
            overlay.style.display = 'none'; 
        }
    }, { once: true });
}
