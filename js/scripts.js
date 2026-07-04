// ==========================================================
// 1. GLOBAL LAYOUT UI: HEADER, MOBILE MENU, BACK-TO-TOP
// ==========================================================
const navlist = document.querySelector(".header__nav-list");
const dropdown = document.querySelector(".header__dropdown-menu");
const dropdownList = document.querySelector(".header__dropdown-list");
const dropdownicon = document.querySelector(".dropdown-icon");

document.addEventListener("click", (e) => {
    if (e.target.closest(".header__hamberger-menu__icon") && navlist) {
        navlist.classList.add("close-menu");
        document.body.classList.add('no-scroll');
    }
    if (e.target.closest("#cross-sign") && navlist) {
        navlist.classList.remove("close-menu");
        document.body.classList.remove('no-scroll');
    }
    if (window.innerWidth < 1024 && e.target.closest(".header__dropdown-menu")) {
        if (dropdownList) dropdownList.classList.toggle("open");
        if (dropdown) dropdown.classList.toggle("active-color");
        if (dropdownicon) dropdownicon.classList.toggle("rotated");
    }
});

window.addEventListener("scroll", () => {
    const header = document.querySelector("#header");
    if (header) {
        header.classList.toggle("add-background", window.scrollY > 20);
    }
});

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

const filter = document.querySelectorAll(".filter-nav button")
const cardsgrid = document.querySelectorAll("article")
if (filter && filter[0] && cardsgrid) {
    filter.forEach(region => {
        region.addEventListener("click", (event) => {
            let region_name = region.innerText.toLowerCase().trim();

            filter.forEach(btn => btn.classList.remove("navbar-btn"));

            region.classList.add("navbar-btn");

            cardsgrid.forEach(card => {
                let raw_region = card.getAttribute("data-region");
                if (!raw_region) return;

                let card_region = raw_region.toLowerCase().trim();

                if (region_name === "all" || region_name === card_region) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
    filter[0].click();
}

const blogFilterBtns = document.querySelectorAll(".news-tabs button")
const blogArticles = document.querySelectorAll(".news-layout__sidebar-list article")

if (blogArticles && blogFilterBtns && blogFilterBtns[0]) {
    blogFilterBtns.forEach(filterButton => {
        filterButton.addEventListener("click", () => {
            blogFilterBtns.forEach(removeBtn => {
                removeBtn.classList.remove("news-tabs__button--active")
            })

            filterButton.classList.add("news-tabs__button--active")
            const buttonName = filterButton.getAttribute("data-filter")

            blogArticles.forEach(article => {
                const articleName = article.getAttribute("data-category")

                if (buttonName === articleName) {
                    article.style.display = "flex"
                    article.style.animation = "fadeIn 0.8s ease"
                } else {
                    article.style.display = "none"
                }
            })
        })
    })

    blogFilterBtns[0].click();
}