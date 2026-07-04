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
        e.preventDefault();

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
const closeBtn = document.querySelector(".lightbox-effect__closebtn")

if (lightBoxSlider && galleryPics.length > 0) {
    galleryPics.forEach((galleryImage, Idx) => {
        galleryImage.addEventListener("click", () => {

            lightBox.style.display = "flex";
            document.documentElement.classList.add("html-flow");
            lightBoxSlider.innerHTML = galleryGrid.innerHTML;

            closeBtn.addEventListener("click", () => {
                console.log("Ok")
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

            document.addEventListener('dragstart', function (e) {
                if (e.target.closest('.lightbox-effect__slider')) {
                    lightBoxSlider.classList.add('dragging');
                }
            });

            document.addEventListener('dragend', function (e) {
                lightBoxSlider.classList.remove('dragging');
            });

            document.addEventListener('touchmove', function (e) {
                if (isDragging) {
                    e.preventDefault();
                }
            }, { passive: false });
        });
    });
}











































// =============================== //

// ==========================================================
// GALLERY SLIDER
// ==========================================================
// const gallerySlider = document.querySelector(".carousel__track");
// const galleryCards = document.querySelectorAll(".carousel__slide");

// if (gallerySlider && galleryCards.length > 0) {
//     const firstCard = galleryCards[0];
//     const lastCard = galleryCards[galleryCards.length - 1];

//     gallerySlider.prepend(lastCard.cloneNode(true));
//     gallerySlider.append(firstCard.cloneNode(true));

//     const cardsLength = document.querySelectorAll(".carousel__slide").length;
//     let currentIdx = 1;

//     function updateSlider() {
//         gallerySlider.style.transition = 'transform 500ms ease';
//         gallerySlider.style.transform = `translateX(-${currentIdx * 100}%)`;
//     }

//     const radiobtns = document.querySelectorAll('.carousel__indicators input[type="radio"]');

//     radiobtns.forEach((btn, index) => {
//         btn.addEventListener("click", () => {
//             currentIdx = index + 1;
//             updateSlider();
//             radioindexing();
//         });
//     });

//     function radioindexing() {
//         if (currentIdx > 0 && currentIdx < cardsLength - 1 && radiobtns[currentIdx - 1]) {
//             radiobtns[currentIdx - 1].checked = true;
//         }
//     }

//     // ==========================================================
//     // DRAG FUNCTIONALITY
//     // ==========================================================
//     let startX = 0;
//     let isDragging = false;
//     let sliderWidth = 0;
//     let autoSlideTimer = null;

//     function dragStart(e) {
//         e.preventDefault();

//         if (e.type === 'touchstart') {
//             startX = e.touches[0].clientX;
//         } else {
//             startX = e.clientX;
//         }

//         sliderWidth = gallerySlider.offsetWidth;
//         gallerySlider.style.transition = 'none';
//         isDragging = true;

//         clearInterval(autoSlideTimer);
//     }

//     function dragMove(e) {
//         if (!isDragging) return;
//         e.preventDefault();

//         let currentX;
//         if (e.type === 'touchmove') {
//             currentX = e.touches[0].clientX;
//         } else {
//             currentX = e.clientX;
//         }

//         let distance = currentX - startX;
//         let percentageMoved = (distance / sliderWidth) * 100;
//         let newPosition = (currentIdx * 100) - percentageMoved;
//         gallerySlider.style.transform = `translateX(-${newPosition}%)`;
//     }


//     function dragEnd(e) {
//         if (!isDragging) return;
//         isDragging = false;
//         let finalX;
//         if (e.type === 'touchend') {
//             finalX = e.changedTouches[0].clientX;
//         } else {
//             finalX = e.clientX;
//         }

//         let totalDistance = finalX - startX;
//         let threshold = sliderWidth * 0.2;

//         if (totalDistance > threshold) {
//             currentIdx = currentIdx - 1;
//         } else if (totalDistance < -threshold) {
//             currentIdx = currentIdx + 1;
//         }

//         function updateCards() {
//             cards.forEach((card, index) => {
//                 let offset = index - currentIdx;
//                 let rotation = offset * 30;  // 30deg per step
//                 let scale = 1 - Math.abs(offset) * 0.1;  // Shrink as it moves away
//                 let translateZ = -Math.abs(offset) * 100;  // Push back

//                 card.style.transform = `
//             perspective(1200px)
//             rotateY(${rotation}deg)
//             scale(${scale})
//             translateZ(${translateZ}px)`;
//                 card.style.opacity = 1 - Math.abs(offset) * 0.2;  // Fade edges
//                 card.style.zIndex = 10 - Math.abs(offset);  // Stack order
//             });
//         }

//         if (currentIdx === 0) {
//             gallerySlider.style.transition = 'none';
//             gallerySlider.style.transform = `translateX(-${(cardsLength - 2) * 100}%)`;
//             currentIdx = cardsLength - 2;
//             radioindexing();

//             setTimeout(() => {
//                 gallerySlider.style.transition = 'transform 500ms ease';
//             }, 50);

//             clearInterval(autoSlideTimer);
//             autoSlideTimer = setInterval(autoSlideFunction, 5000);
//             return;
//         }

//         if (currentIdx === cardsLength - 1) {
//             gallerySlider.style.transition = 'none';
//             gallerySlider.style.transform = `translateX(-100%)`;
//             currentIdx = 1;
//             radioindexing();

//             setTimeout(() => {
//                 gallerySlider.style.transition = 'transform 500ms ease';
//             }, 50);

//             clearInterval(autoSlideTimer);
//             autoSlideTimer = setInterval(autoSlideFunction, 5000);
//             return;
//         }

//         gallerySlider.style.transform = `translateX(-${currentIdx * 100}%)`;
//         radioindexing();

//         clearInterval(autoSlideTimer);
//         autoSlideTimer = setInterval(autoSlideFunction, 5000);
//     }

//     function autoSlideFunction() {
//         currentIdx++;

//         if (currentIdx === cardsLength - 1) {
//             updateSlider();
//             setTimeout(() => {
//                 gallerySlider.style.transition = 'none';
//                 gallerySlider.style.transform = `translateX(-100%)`;
//                 currentIdx = 1;
//                 radioindexing();
//             }, 500);
//         } else {
//             updateSlider();
//             radioindexing();
//         }
//     }

//     // ==========================================================
//     // EVENT LISTENERS
//     // ==========================================================
//     gallerySlider.addEventListener('mousedown', dragStart);
//     gallerySlider.addEventListener('mousemove', dragMove);
//     gallerySlider.addEventListener('mouseup', dragEnd);
//     gallerySlider.addEventListener('mouseleave', dragEnd);

//     gallerySlider.addEventListener('touchstart', dragStart);
//     gallerySlider.addEventListener('touchmove', dragMove);
//     gallerySlider.addEventListener('touchend', dragEnd);

//     document.addEventListener('touchmove', function (e) {
//         if (isDragging) {
//             e.preventDefault();
//         }
//     }, { passive: false });

//     // ==========================================================
//     // START AUTO-SLIDE
//     // ==========================================================
//     autoSlideTimer = setInterval(autoSlideFunction, 5000);
// }

