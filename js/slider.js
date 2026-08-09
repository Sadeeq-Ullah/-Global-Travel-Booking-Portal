// ==========================================================
// 2. TESTIMONIALS SLIDER
// ==========================================================
const slider = document.querySelector(".testimonials__track");
const testiCard = document.querySelectorAll(".testimonial-card");

if (slider && testiCard.length > 0) {
    const firstCard = testiCard[0];
    const lastCard = testiCard[testiCard.length - 1];

    slider.prepend(lastCard.cloneNode(true));
    slider.append(firstCard.cloneNode(true));

    const cardsLength = document.querySelectorAll(".testimonial-card").length;
    let currentIdx = 1;
    slider.style.transform = `translateX(-100%)`;

    function updateSlider() {
        slider.style.transition = 'transform 500ms ease';
        slider.style.transform = `translateX(-${currentIdx * 100}%)`;
    }

    const radiobtns = document.querySelectorAll('input[type="radio"]');

    radiobtns.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            currentIdx = index + 1;
            updateSlider();
        });
    });

    function radioindexing() {
        if (currentIdx > 0 && currentIdx < cardsLength - 1 && radiobtns[currentIdx - 1]) {
            radiobtns[currentIdx - 1].checked = true;
        }
    }

    // DRAG FUNCTIONALITY
    let startX = 0;
    let isDragging = false;
    let sliderWidth = 0;
    let autoSlideTimer = null;

    function dragStart(e) {
        if (e.type === 'touchstart') {
            startX = e.touches[0].clientX;
        } else {
            startX = e.clientX;
        }

        sliderWidth = slider.offsetWidth;
        slider.style.transition = 'none';
        isDragging = true;

        clearInterval(autoSlideTimer);
    }

    function dragMove(e) {
        if (!isDragging) return;

        let currentX;
        if (e.type === 'touchmove') {
            currentX = e.touches[0].clientX;
        } else {
            currentX = e.clientX;
        }

        let distance = currentX - startX;
        let percentageMoved = (distance / sliderWidth) * 100;
        let newPosition = (currentIdx * 100) - percentageMoved;

        slider.style.transform = `translateX(-${newPosition}%)`;
    }

    function dragEnd(e) {
        if (!isDragging) return;
        isDragging = false;

        slider.style.transition = 'transform 500ms ease';

        let finalX;
        if (e.type === 'touchend') {
            finalX = e.changedTouches[0].clientX;
        } else {
            finalX = e.clientX;
        }

        let totalDistance = finalX - startX;
        let threshold = sliderWidth * 0.2;

        if (totalDistance > threshold) {
            currentIdx -= 1;
        } else if (totalDistance < -threshold) {
            currentIdx += 1;
        }

        if (currentIdx === 0) {
            slider.style.transition = 'none';
            slider.style.transform = `translateX(-${(cardsLength - 2) * 100}%)`;
            currentIdx = cardsLength - 2;
            radioindexing();

            setTimeout(() => {
                slider.style.transition = 'transform 500ms ease';
            }, 50);

            clearInterval(autoSlideTimer);
            autoSlideTimer = setInterval(autoSlideFunction, 5000);
            return;
        }

        if (currentIdx === cardsLength - 1) {
            slider.style.transition = 'none';
            slider.style.transform = `translateX(-100%)`;
            currentIdx = 1;
            radioindexing();

            setTimeout(() => {
                slider.style.transition = 'transform 500ms ease';
            }, 50);

            clearInterval(autoSlideTimer);
            autoSlideTimer = setInterval(autoSlideFunction, 5000);
            return;
        }

        slider.style.transform = `translateX(-${currentIdx * 100}%)`;
        radioindexing();

        clearInterval(autoSlideTimer);
        autoSlideTimer = setInterval(autoSlideFunction, 5000);
    }

    function autoSlideFunction() {
        currentIdx++;

        if (currentIdx === cardsLength - 1) {
            updateSlider();
            setTimeout(() => {
                slider.style.transition = 'none';
                slider.style.transform = `translateX(-100%)`;
                currentIdx = 1;
                radioindexing();
            }, 500);
        } else {
            updateSlider();
            radioindexing();
        }
    }

    slider.addEventListener('mousedown', dragStart);
    slider.addEventListener('mousemove', dragMove);
    slider.addEventListener('mouseup', dragEnd);
    slider.addEventListener('mouseleave', dragEnd);

    slider.addEventListener('touchstart', dragStart);
    slider.addEventListener('touchmove', dragMove);
    slider.addEventListener('touchend', dragEnd);

    document.addEventListener('dragStart', function (e) {
        if (e.target.closest('.testimonials__track')) {
            slider.classList.add('dragging');
        }
    });

    document.addEventListener('dragEnd', function (e) {
        slider.classList.remove('dragging');
    });

    document.addEventListener('touchmove', function (e) {
        if (isDragging) {
            e.preventDefault();
        }
    }, { passive: false });

    autoSlideTimer = setInterval(autoSlideFunction, 5000);
}

// Gallery Section 
const galleryPics = document.querySelectorAll(".gallery-photo-wrapper");
const lightBoxSlider = document.querySelector(".lightbox-effect__slider");
const lightBox = document.getElementById("lightbox-effect");
const galleryGrid = document.querySelector(".gallery-grid");
const closeBtn = document.querySelector(".lightbox-effect__closebtn");
const lightBox_leftBtn = document.querySelector(".lightbox-effect__left-arrow");
const lightBox_rightBtn = document.querySelector(".lightbox-effect__right-arrow");


if (lightBoxSlider && galleryPics.length > 0) {
    galleryPics.forEach((galleryImage, Idx) => {
        galleryImage.addEventListener("click", () => {

            lightBox.style.display = "flex";
            document.documentElement.classList.add("html-flow");
            lightBoxSlider.innerHTML = galleryGrid.innerHTML;

            closeBtn.addEventListener("click", () => {
                lightBox.classList.add("closing");
                document.documentElement.classList.remove("html-flow");

                // 2. Wait 500ms for the image animation to finish, then hide everything
                setTimeout(() => {
                    lightBox.style.display = "none";
                    lightBox.classList.remove("closing"); // Reset class for next open
                }, 300);
            });

            // Using your gallery elements for the slider logic
            let currentIdx = Idx;
            lightBoxSlider.style.transform = `translateX(-${currentIdx * 100}%)`;
            lightBoxSlider.style.transition = "none";
            const cardsLength = document.querySelectorAll(".gallery-photo-wrapper").length;

            lightBox_leftBtn.addEventListener("click", () => {
                currentIdx--;
                lightBoxSlider.style.transform = `translateX(-${currentIdx * 100}%)`;
                lightBoxSlider.style.transition = "all 500ms ease";
            })
            lightBox_rightBtn.addEventListener("click", () => {
                if (currentIdx < 4) {
                    currentIdx++;
                    lightBoxSlider.style.transform = `translateX(-${currentIdx * 100}%)`;
                    lightBoxSlider.style.transition = "all 500ms ease";
                };
                return;
            })
            // DRAG FUNCTIONALITY
            let startX = 0;
            let isDragging = false;
            let sliderWidth = 0;
            let autoSlideTimer = null;

            function dragStart(e) {
                e.preventDefault();

                if (e.type === 'touchstart') {
                    startX = e.touches[0].clientX;
                } else {
                    startX = e.clientX;
                }

                sliderWidth = lightBoxSlider.offsetWidth;
                lightBoxSlider.style.transition = 'none';
                isDragging = true;
                lightBoxSlider.classList.add('lightbox-image-grabbing');
            }

            function dragMove(e) {
                if (!isDragging) return;
                e.preventDefault();

                let currentX;
                if (e.type === 'touchmove') {
                    currentX = e.touches[0].clientX;
                } else {
                    currentX = e.clientX;
                }

                let distance = currentX - startX;
                let percentageMoved = (distance / sliderWidth) * 100;
                let newPosition = (currentIdx * 100) - percentageMoved;

                lightBoxSlider.style.transform = `translateX(-${newPosition}%)`;
            }

            function dragEnd(e) {
                if (!isDragging) return;
                isDragging = false;
                lightBoxSlider.classList.remove('lightbox-image-grabbing');

                lightBoxSlider.style.transition = 'transform 500ms ease';

                let finalX;
                if (e.type === 'touchend') {
                    finalX = e.changedTouches[0].clientX;
                } else {
                    finalX = e.clientX;
                }

                let totalDistance = finalX - startX;
                let threshold = sliderWidth * 0.2;

                if (totalDistance > threshold) {
                    currentIdx -= 1;
                } else if (totalDistance < -threshold && currentIdx < 4) {
                    currentIdx += 1;
                }
                lightBoxSlider.style.transform = `translateX(-${currentIdx * 100}%)`;
            }

            lightBoxSlider.addEventListener('mousedown', dragStart);
            lightBoxSlider.addEventListener('mousemove', dragMove);
            lightBoxSlider.addEventListener('mouseup', dragEnd);
            lightBoxSlider.addEventListener('mouseleave', dragEnd);

            lightBoxSlider.addEventListener('touchstart', dragStart);
            lightBoxSlider.addEventListener('touchmove', dragMove);
            lightBoxSlider.addEventListener('touchend', dragEnd);

            document.addEventListener('touchmove', function (e) {
                if (isDragging) {
                    e.preventDefault();
                }
            }, { passive: false });
        });
    });
}

// Tour Section

const galleryItems = document.querySelectorAll(".moments-images-wrapper");
const lightboxSlider = document.querySelector(".lightbox-effect__slider");
const lightboxOverlay = document.getElementById("lightbox-effect");
const galleryContainer = document.querySelector(".moments-remember__images");
const closeButton = document.querySelector(".lightbox-effect__closebtn");
const prevButton = document.querySelector(".lightbox-effect__left-arrow");
const nextButton = document.querySelector(".lightbox-effect__right-arrow");

if (lightboxSlider && galleryItems.length > 0) {
    galleryItems.forEach((galleryItem, itemIndex) => {
        galleryItem.addEventListener("click", () => {

            lightboxOverlay.style.display = "flex";
            document.documentElement.classList.add("html-flow");
            lightboxSlider.innerHTML = galleryContainer.innerHTML;

            closeButton.addEventListener("click", () => {
                lightboxOverlay.classList.add("closing");
                document.documentElement.classList.remove("html-flow");

                setTimeout(() => {
                    lightboxOverlay.style.display = "none";
                    lightboxOverlay.classList.remove("closing");
                }, 300);
            });

            // Using your gallery elements for the slider logic
            let currentIndex = itemIndex;
            lightboxSlider.style.transform = `translateX(-${currentIndex * 100}%)`;
            lightboxSlider.style.transition = "none";
            const totalItems = galleryItems.length;
            prevButton.addEventListener("click", () => {
                currentIndex--;
                lightboxSlider.style.transform = `translateX(-${currentIndex * 100}%)`;
                lightboxSlider.style.transition = "all 500ms ease";
            })
            nextButton.addEventListener("click", () => {
                if (currentIndex < totalItems - 1) {
                    currentIndex++;
                    lightboxSlider.style.transform = `translateX(-${currentIndex * 100}%)`;
                    lightboxSlider.style.transition = "all 500ms ease";
                };
                return;
            })

            let startX = 0;
            let isDragging = false;
            let sliderWidth = 0;

            function dragStart(e) {
                e.preventDefault();

                if (e.type === 'touchstart') {
                    startX = e.touches[0].clientX;
                } else {
                    startX = e.clientX;
                }

                sliderWidth = lightboxSlider.offsetWidth;
                lightboxSlider.style.transition = 'none';
                isDragging = true;
                lightboxSlider.classList.add('lightbox-image-grabbing');
            }

            function dragMove(e) {
                if (!isDragging) return;
                e.preventDefault();

                let currentX;
                if (e.type === 'touchmove') {
                    currentX = e.touches[0].clientX;
                } else {
                    currentX = e.clientX;
                }

                let distance = currentX - startX;
                let percentageMoved = (distance / sliderWidth) * 100;
                let newPosition = (currentIndex * 100) - percentageMoved;

                lightboxSlider.style.transform = `translateX(-${newPosition}%)`;
            }

            function dragEnd(e) {
                if (!isDragging && currentIndex < totalItems - 1) return;
                isDragging = false;
                lightboxSlider.classList.remove('lightbox-image-grabbing');

                lightboxSlider.style.transition = 'transform 500ms ease';

                let finalX;
                if (e.type === 'touchend') {
                    finalX = e.changedTouches[0].clientX;
                } else {
                    finalX = e.clientX;
                }

                let totalDistance = finalX - startX;
                let threshold = sliderWidth * 0.2;

                if (totalDistance > threshold) {
                    currentIndex -= 1;
                } else if (totalDistance < -threshold && currentIndex < totalItems - 1) {
                    currentIndex += 1;
                }
                lightboxSlider.style.transform = `translateX(-${currentIndex * 100}%)`;
            }

            lightboxSlider.addEventListener('mousedown', dragStart);
            lightboxSlider.addEventListener('mousemove', dragMove);
            lightboxSlider.addEventListener('mouseup', dragEnd);
            lightboxSlider.addEventListener('mouseleave', dragEnd);

            lightboxSlider.addEventListener('touchstart', dragStart);
            lightboxSlider.addEventListener('touchmove', dragMove);
            lightboxSlider.addEventListener('touchend', dragEnd);

            document.addEventListener('touchmove', function (e) {
                if (isDragging) {
                    e.preventDefault();
                }
            }, { passive: false });
        });
    });
}

// Logic Slider Testimonials

const track__card = document.querySelectorAll(".track-card");
const originalCount = track__card.length;
const testiTrack = document.querySelector("#testimonials-carousel__track");
const radioBtns = document.querySelectorAll('.carousel-radiobtns input[type="radio"]');

if (testiTrack && originalCount > 0) {

    // LOGIC FIX 1: Set Clone Count to 3 globally (Covers desktop visibility cleanly)
    const CLONE_COUNT = 3;

    // Inject 3 Clones at the end (First 3 cards)
    for (let i = 0; i < CLONE_COUNT; i++) {
        testiTrack.append(track__card[i].cloneNode(true));
    }
    // Inject 3 Clones at the start (Last 3 cards) in reverse order to maintain sequence
    for (let i = 1; i <= CLONE_COUNT; i++) {
        testiTrack.prepend(track__card[originalCount - i].cloneNode(true));
    }

    // LOGIC FIX 2: Baseline starting position skips the 3 clones on the left
    let currIndex = CLONE_COUNT;
    let isDragging = false;
    let startX = 0;
    let autoTimer = null;
    const AUTO_DELAY = 5000;

    const card = track__card[0];
    const gap = parseFloat(getComputedStyle(testiTrack).gap) || 0;
    const step = card.offsetWidth + gap;

    testiTrack.style.transform = `translateX(-${currIndex * step}px)`;
    testiTrack.style.transition = 'none';

    function startAutoTimer() {
        clearTimeout(autoTimer);
        autoTimer = setTimeout(autoSlider, AUTO_DELAY);
    }

    radioBtns.forEach((btn, index) => {
        btn.addEventListener("click", () => {

            currIndex = index + CLONE_COUNT;
            clearTimeout(autoTimer);
            testiTrack.style.transition = 'transform 0.5s ease';
            testiTrack.style.transform = `translateX(-${currIndex * step}px)`;
            startAutoTimer();
            radioSliding(); // Fix: Force radio activation immediately on click
        });
    });

    const radioSliding = () => {
        if (radioBtns.length > 0) {
            let radioIndex;
            // LOGIC FIX 4: Recalculated lower/upper edge conditions for radios
            if (currIndex < CLONE_COUNT) radioIndex = originalCount - (CLONE_COUNT - currIndex);
            else if (currIndex >= originalCount + CLONE_COUNT) radioIndex = (currIndex - originalCount - CLONE_COUNT);
            else radioIndex = currIndex - CLONE_COUNT;

            // Safety boundaries for array access
            radioIndex = (radioIndex + originalCount) % originalCount;
            if (radioBtns[radioIndex]) radioBtns[radioIndex].checked = true;
        }
    }

    function autoSlider() {
        currIndex++;
        testiTrack.style.transition = 'transform 0.5s ease';
        testiTrack.style.transform = `translateX(-${currIndex * step}px)`;

        // LOGIC FIX 5: Snapping boundary adjusted
        if (currIndex === originalCount + CLONE_COUNT) {
            setTimeout(() => {
                testiTrack.style.transition = 'none';
                currIndex = CLONE_COUNT;
                testiTrack.style.transform = `translateX(-${currIndex * step}px)`;
                startAutoTimer();
                radioSliding();
            }, 500);
        } else {
            startAutoTimer();
            radioSliding();
        }
    }

    startAutoTimer();

    function dragStart(event) {
        startX = event.type === "touchstart" ? event.touches[0].clientX : event.clientX;
        testiTrack.style.transition = "none";
        isDragging = true;
        track__card.forEach(iterator => { iterator.classList.add("track-card-dragging") });
        clearTimeout(autoTimer);
    }

    function dragMove(event) {
        if (!isDragging) return;
        let currentX = event.type === "touchmove" ? event.touches[0].clientX : event.clientX;
        const deltaX = currentX - startX;
        const offsetPx = currIndex * step - deltaX;
        testiTrack.style.transform = `translateX(-${offsetPx}px)`;
    }

    function dragEnd(event) {
        if (!isDragging) return;
        isDragging = false;
        track__card.forEach(iterator => { iterator.classList.remove("track-card-dragging") });

        let finalX = event.type === "touchend" ? event.changedTouches[0].clientX : event.clientX;
        const totalDistance = finalX - startX;
        const threshold = step * 0.2;

        if (totalDistance > threshold) currIndex--;
        else if (totalDistance < -threshold) currIndex++;

        // LOGIC FIX 6: Enforce upper boundary constraints relative to CLONE_COUNT
        currIndex = Math.max(0, Math.min(currIndex, originalCount + CLONE_COUNT));

        testiTrack.style.transition = 'transform 0.5s ease';
        testiTrack.style.transform = `translateX(-${currIndex * step}px)`;

        // LOGIC FIX 7: Snap checks for Drag reset
        if (currIndex <= CLONE_COUNT - 1) {
            setTimeout(() => {
                testiTrack.style.transition = 'none';
                currIndex = originalCount + currIndex;
                testiTrack.style.transform = `translateX(-${currIndex * step}px)`;
                startAutoTimer();
            }, 500);
        } else if (currIndex >= originalCount + CLONE_COUNT) {
            setTimeout(() => {
                testiTrack.style.transition = 'none';
                currIndex = currIndex - originalCount;
                testiTrack.style.transform = `translateX(-${currIndex * step}px)`;
                startAutoTimer();
            }, 500);
        } else {
            startAutoTimer();
        }
        radioSliding();
    }

    testiTrack.addEventListener("touchstart", dragStart);
    testiTrack.addEventListener("touchmove", dragMove);
    testiTrack.addEventListener("touchend", dragEnd);

    testiTrack.addEventListener("mousedown", dragStart);
    testiTrack.addEventListener("mousemove", dragMove);
    testiTrack.addEventListener("mouseup", dragEnd);
    testiTrack.addEventListener("mouseleave", dragEnd);
}