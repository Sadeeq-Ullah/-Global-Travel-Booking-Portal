document.addEventListener("componentsLoaded", () => {
    const navlist = document.querySelector(".header__nav-list");
    const dropdown = document.querySelector(".header__dropdown-menu");
    const dropdownList = document.querySelector(".header__dropdown-list");
    const dropdownicon = document.querySelector(".dropdown-icon");

    document.addEventListener("click", (e) => {
        if (e.target.closest(".header__hamberger-menu__icon")) {
            navlist.classList.add("close-menu");
            document.body.classList.toggle('no-scroll');
        }
        if (e.target.closest("#cross-sign")) {
            navlist.classList.remove("close-menu");
            document.body.classList.remove('no-scroll');
        }
        if (e.target.closest(".header__dropdown-menu")) {
            dropdownList.classList.toggle("open");
            dropdown.classList.toggle("active-color");
            dropdownicon.classList.toggle("rotated");
        }
    });
});

window.addEventListener("scroll", () => {
    header.classList.toggle("add-background", window.scrollY > 20);
});

window.addEventListener("scroll", () => {
    const scrollBtn = document.querySelector(".page-scrolled");
    if (window.scrollY > 300) {
        scrollBtn.style.display = "flex";
    } else {
        scrollBtn.style.display = "none";
    }
});

const slider = document.querySelector(".testimonials__track");
const testiCard = document.querySelectorAll(".testimonial-card"); 
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
    if (currentIdx > 0 && currentIdx < cardsLength - 1) {
        radiobtns[currentIdx - 1].checked = true;
    }
}

setInterval(() => {
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
}, 5000);

const statsSection = document.querySelector('.travel-stats');
let hasAnimated = false;

function startCounters() {
    document.querySelectorAll('.travel-stats__number').forEach(counter => {
        const target = +counter.dataset.target;
        const duration = 2000;
        let current = 0;
        const step = target / (duration / 16);

        function update() {
            current += step;  
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(update);
            } else {
                counter.textContent = target;
            }
        }
        update();
    });
}

window.addEventListener('scroll', () => {
    if (statsSection.getBoundingClientRect().top < window.innerHeight && !hasAnimated) {
        startCounters();
        hasAnimated = true;
    }
});