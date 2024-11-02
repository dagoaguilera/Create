document.addEventListener('DOMContentLoaded', () => {
    const images = Array.from(document.getElementsByClassName("image"));
    const totalPhotosElem = document.getElementById('total-photos');
    const currentPhotoElem = document.getElementById('current-photo');
    const photographerName = document.getElementById('photographer-name');
    const menuOverlay = document.getElementById("myNav");
    const totalPhotos = images.length;
    let currentIndex = 0;

    const updatePhotoCount = () => {
        currentPhotoElem.textContent = currentIndex + 1;
        totalPhotosElem.textContent = totalPhotos;
    };

    const showImage = (index) => {
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
        updatePhotoCount();
    };

    showImage(currentIndex);

    const navigate = (direction) => {
        currentIndex = (currentIndex + direction + images.length) % images.length;
        showImage(currentIndex);
    };

    window.addEventListener('click', (e) => {
        const middleX = window.innerWidth / 2;
        if (e.clientX > middleX) {
            navigate(1); 
        } else {
            navigate(-1); 
        }
    });

    const openNav = () => {
        menuOverlay.style.display = 'block';
        setTimeout(() => {
            menuOverlay.classList.add("show");
            menuOverlay.classList.remove("hide");
        }, 0);
    };

    const closeNav = () => {
        menuOverlay.classList.add("hide");
        menuOverlay.classList.remove("show");
        menuOverlay.addEventListener('transitionend', () => {
            if (menuOverlay.classList.contains('hide')) {
                menuOverlay.style.display = 'none';
            }
        }, { once: true });
    };

    photographerName.addEventListener('click', (e) => {
        e.stopPropagation();
        openNav();
    });

    document.querySelector('.closebtn').addEventListener('click', (e) => {
        closeNav();
        e.stopPropagation();
    });
});
