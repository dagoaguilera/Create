document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.gallery');
    const photographerName = document.getElementById('photographer-name');
    const menuOverlay = document.getElementById('myNav');
    const imageSources = [
        'images/IMG_0976.jpg',
        'images/DSCF1056.jpg',
        'images/IMG_0553.jpg',
        'images/DSCF1058.jpg',
        'images/IMG_0979.jpg',
        'images/N0000452.jpeg',
        'images/6-IMG_0913.jpg',
        'images/DSCF1746.jpeg',
        'images/DSCF1655.JPG'

    ];

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; 
        }
    };

    const createImageGrid = () => {
        gallery.innerHTML = '';

        shuffleArray(imageSources);

        imageSources.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Photo ${index + 1}`;
            img.classList.add('gallery-image');

            img.style.opacity = 0;

            img.addEventListener('load', () => {
                setTimeout(() => {
                    img.style.transition = 'opacity 1s ease-in-out';
                    img.style.opacity = 1; 
                }, index * 500);
            });

            img.addEventListener('click', () => openFullscreen(img.src));

            gallery.appendChild(img);
        });
    };

    const openFullscreen = (src) => {
        const fullscreen = document.createElement('div');
        fullscreen.classList.add('fullscreen');
        fullscreen.innerHTML = `<img src="${src}" class="fullscreen-img" />`;
        document.body.appendChild(fullscreen);

        fullscreen.addEventListener('click', () => {
            fullscreen.remove();
        });
    };

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

    createImageGrid();
});
