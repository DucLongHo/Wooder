let htmlPage = document.querySelector("html");
/* -------------------------------------------------------------------------- */
/*                                Navbar mobile                               */
/* -------------------------------------------------------------------------- */
let navMobileIcon = document.querySelector(".nav-mobile");
let navMobile = document.querySelector(".navbar-mobile");

function removeClassMobile() {
    navMobileIcon.classList.remove("open-nav");
    navMobile.classList.remove("active");
}
navMobileIcon.addEventListener("click", function (e) {
    if (navMobileIcon.classList.contains("open-nav")) {
        removeClassMobile();
    } else {
        e.stopPropagation();
        this.classList.add("open-nav");
        navMobile.classList.add("active");
    }
});
htmlPage.addEventListener("click", function () {
    removeClassMobile();
});
document.addEventListener("keydown", function (e) {
    if (e.keyCode === 27) {
        removeClassMobile();
    }
});

/* -------------------------------------------------------------------------- */
/*                       Change Header Background Scroll                      */
/* -------------------------------------------------------------------------- */
let header = document.querySelector(".header");
let slider = document.querySelector(".slider");
let btnBackToTop = document.querySelector(".btn-to-top");
let navLinks = document.querySelectorAll(".navbar__item-link");
let sections = [];

let sliderHeight = slider.offsetHeight;
let headerHeight = header.offsetHeight;

function changeBackgroundHeader() {
    let pageYScroll = window.pageYOffset;

    if (pageYScroll > sliderHeight - headerHeight) {
        header.classList.add("active");
    } else {
        header.classList.remove("active");
    }
}

function showBackToTop() {
    let pageYScroll = window.pageYOffset;

    if (pageYScroll > sliderHeight) {
        btnBackToTop.classList.add("active");
    } else {
        btnBackToTop.classList.remove("active");
    }
}

btnBackToTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
    });
});

document.addEventListener("scroll", function () {
    changeBackgroundHeader();
    showBackToTop();
});

function removeClassActiveNavLink() {
    navLinks.forEach(function (item) {
        item.classList.remove("active");
    });
}

// Click active nav link
navLinks.forEach(function (link, index) {
    let href = link.getAttribute("href").substring(1);
    let section = document.querySelector("." + href);
    sections.push(section);

    link.addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({
            top: section.offsetTop,
            behavior: "smooth",
        });
        removeClassActiveNavLink();

        link.classList.add("active");
    });
});

window.addEventListener("scroll", function () {
    let position = window.pageYOffset;

    sections.forEach(function (section, index) {
        if (
            position > section.offsetTop - headerHeight &&
            position < section.offsetTop + section.offsetHeight
        ) {
            removeClassActiveNavLink();
            navLinks[index].classList.add("active");
        } else {
            navLinks[index].classList.remove("active");
        }
    });
});

/* -------------------------------------------------------------------------- */
/*                                   Slider                                   */
/* -------------------------------------------------------------------------- */
let listSliderItem = document.querySelectorAll(".slider__list-item");
let currentSlider = 0;
let btnNext = document.querySelector(".next");
let btnPrev = document.querySelector(".prev");
let listDot = document.querySelectorAll(".paging__list li");
let currentPage = document.querySelector(".paging__current");

listDot[currentSlider].classList.add("active");
currentPage.innerHTML = (currentSlider + 1).toString().padStart(2, "0");

listSliderItem.forEach(function (item, index) {
    if (item.classList.contains("active")) {
        currentSlider = index;
    }
});

function goToSlider(index) {
    listSliderItem[currentSlider].classList.remove("active");
    listSliderItem[index].classList.add("active");
    listDot[currentSlider].classList.remove("active");
    listDot[index].classList.add("active");
    currentSlider = index;
    showPagingCurrent(currentSlider);
}

function showPagingCurrent(index) {
    currentPage.innerHTML = (index + 1).toString().padStart(2, "0");
}

btnNext.addEventListener("click", function () {
    if (currentSlider >= listSliderItem.length - 1) {
        goToSlider(0);
    } else {
        goToSlider(currentSlider + 1);
    }
});

btnPrev.addEventListener("click", function () {
    if (currentSlider <= 0) {
        goToSlider(listSliderItem.length - 1);
    } else {
        goToSlider(currentSlider - 1);
    }
});

// List paging
listDot.forEach(function (dot, index) {
    dot.addEventListener("click", function () {
        goToSlider(index);
    });
});

// setInterval(() => {
//     if (currentSlider >= listSliderItem.length - 1) {
//         goToSlider(0);
//     } else {
//         goToSlider(currentSlider + 1);
//     }
// }, 8000);

/* -------------------------------------------------------------------------- */
/*                                 Popup Video                                */
/* -------------------------------------------------------------------------- */
let btnVideo = document.querySelectorAll(".video-thumbnail");
let popupVideo = document.querySelector(".popup-video");
let btnCloseVideo = document.querySelector(".popup-video__btn-close");
let wrapperIframe = document.querySelector(".popup-video__wrapper");
let iframeVideo = document.querySelector(".popup-video__iframe");

btnVideo.forEach(function (video) {
    video.addEventListener("click", function () {
        let videoId = video.getAttribute("data-video-id");
        popupVideo.style.display = "flex";
        iframeVideo.setAttribute(
            "src",
            `https://www.youtube.com/embed/${videoId}?rel=0&amp;autoplay=1`
        );
    });
});

btnCloseVideo.addEventListener("click", function () {
    popupVideo.style.display = "none";
    iframeVideo.setAttribute("src", "");
});

popupVideo.addEventListener("click", function () {
    this.style.display = "none";
    iframeVideo.setAttribute("src", "");
});
// y17Q6oIRE6E
// lhG-o5gG17I
// e4exsx44qfs
