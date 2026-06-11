// ==========================================================
// 1. GLOBAL LAYOUT UI: HEADER, MOBILE MENU, BACK-TO-TOP
// ==========================================================
const navlist = document.querySelector(".header__nav-list");
const dropdown = document.querySelector(".header__dropdown-menu");
const dropdownList = document.querySelector(".header__dropdown-list");
const dropdownicon = document.querySelector(".dropdown-icon");

// Unified Event Delegation for Document Clicks
document.addEventListener("click", (e) => {
    // Hamburger Open
    if (e.target.closest(".header__hamberger-menu__icon") && navlist) {
        navlist.classList.add("close-menu");
        document.body.classList.add('no-scroll');
    }
    // Mobile Menu Close
    if (e.target.closest("#cross-sign") && navlist) {
        navlist.classList.remove("close-menu");
        document.body.classList.remove('no-scroll');
    }
    // Mobile Navigation Dropdown Toggle
    if (window.innerWidth < 1024 && e.target.closest(".header__dropdown-menu")) {
        if (dropdownList) dropdownList.classList.toggle("open");
        if (dropdown) dropdown.classList.toggle("active-color");
        if (dropdownicon) dropdownicon.classList.toggle("rotated");
    }
});

// Header Blur / Background Change on Scroll
window.addEventListener("scroll", () => {
    const header = document.querySelector("#header");
    if (header) {
        header.classList.toggle("add-background", window.scrollY > 20);
    }
});

// Scroll-To-Top Button Visiblity Toggle
window.addEventListener("scroll", () => {
    const scrollBtn = document.querySelector(".page-scrolled");
    if (scrollBtn) {
        if (window.scrollY > 300) {
            scrollBtn.style.display = "flex";
        } else {
            scrollBtn.style.display = "none";
        }
    }
});


// ==========================================================
// 2. TESTIMONIALS SLIDER (Guarded: Runs only when present)
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
}


// ==========================================================
// 3. TRAVEL STATS COUNTER (Guarded: Runs only when present)
// ==========================================================
const statsSection = document.querySelector('.travel-stats');
let hasAnimated = false;

if (statsSection) {
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
}


// ==========================================================
// 4. NAVIGATION ACTIVE HIGHLIGHT LOGIC (All Pages)
// ==========================================================
document.addEventListener("DOMContentLoaded", () => {
    let currentPath = window.location.pathname.split("/").pop();
    if (currentPath === "" || currentPath === "/") currentPath = "index.html";

    const navLinks = document.querySelectorAll("#navmenu ul li a");

    navLinks.forEach(link => {
        const linkPath = link.getAttribute("href").split("/").pop();

        if (currentPath === linkPath) {
            link.classList.add("active");

            // Handles highlighting parent dropdown container
            if (link.classList.contains("dropdown-child")) {
                const parentDropdown = link.closest(".dropdown");
                if (parentDropdown) {
                    const dropdownWrapper = parentDropdown.querySelector(".header__dropdown-menu");
                    if (dropdownWrapper) {
                        dropdownWrapper.classList.add("active");
                    }
                }
            }
        }
    });
});