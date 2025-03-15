document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.gallery');
    const photoCount = document.getElementById('photo-count');
    const currentPhotoElem = document.getElementById('current-photo');
    const totalPhotosElem = document.getElementById('total-photos');
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
        'images/DSCF1655.jpg',
        'images/DSCF1746.jpeg'

    ];

    let totalPhotos = imageSources.length;
    totalPhotosElem.textContent = totalPhotos;
    currentPhotoElem.textContent = totalPhotos;

    // Function to shuffle an array (Fisher-Yates Shuffle)
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
    };

    // Function to create dynamically resizing image grid
    const createImageGrid = () => {
        gallery.innerHTML = ''; // Clear existing content

        // Shuffle the imageSources array to randomize image order
        shuffleArray(imageSources);

        imageSources.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Photo ${index + 1}`;
            img.classList.add('gallery-image');

            // Initially, keep images invisible until they're ready to fade in
            img.style.opacity = 0;

            // Add event listener to add 'loaded' class once the image has loaded
            img.addEventListener('load', () => {
                setTimeout(() => {
                    img.style.transition = 'opacity 1s ease-in-out';
                    img.style.opacity = 1; // Fade in image one after the other
                }, index * 500); // Stagger the fade-in by index (500ms delay between images)
            });

            // Click to open fullscreen mode
            img.addEventListener('click', () => openFullscreen(img.src));

            gallery.appendChild(img);
        });
    };

    // Function to open an image in fullscreen mode
    const openFullscreen = (src) => {
        const fullscreen = document.createElement('div');
        fullscreen.classList.add('fullscreen');
        fullscreen.innerHTML = `<img src="${src}" class="fullscreen-img" />`;
        document.body.appendChild(fullscreen);

        fullscreen.addEventListener('click', () => {
            fullscreen.remove();
        });
    };

    // Open overlay
    const openNav = () => {
        menuOverlay.style.display = 'block';
        setTimeout(() => {
            menuOverlay.classList.add("show");
            menuOverlay.classList.remove("hide");
        }, 0);
    };

    // Close overlay
    const closeNav = () => {
        menuOverlay.classList.add("hide");
        menuOverlay.classList.remove("show");
        menuOverlay.addEventListener('transitionend', () => {
            if (menuOverlay.classList.contains('hide')) {
                menuOverlay.style.display = 'none';
            }
        }, { once: true });
    };

    // Open overlay on click
    photographerName.addEventListener('click', (e) => {
        e.stopPropagation();
        openNav();
    });

    // Close overlay on close button click
    document.querySelector('.closebtn').addEventListener('click', (e) => {
        closeNav();
        e.stopPropagation();
    });

    // Generate the gallery
    createImageGrid();
});
