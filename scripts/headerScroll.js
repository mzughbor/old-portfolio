
/* making the header showing and desapering when scroll up and down...*/
document.addEventListener("DOMContentLoaded", function () {

    const header = document.querySelector(".header");
    let lastScrollTop = 0;
    const headerHeight = header.offsetHeight;

    // Ensure the header is visible on first page load
    header.classList.add("sticky");

    window.addEventListener("scroll", function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Scrolling down
            header.classList.remove("small", "sticky");
        } else {
            // Scrolling up
            if (scrollTop < headerHeight) {
                header.classList.add("small");
                header.classList.remove("sticky");
            } else {
                header.classList.add("sticky");
                header.classList.remove("small");
            }
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Prevent negative values
    });    
});

/* slides the latest work section*/
document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".slider-track");
    const slides = document.querySelectorAll(".slide");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    const dotsContainer = document.querySelector(".dots");
    let index = 1;
    const totalSlides = slides.length;
    const visibleSlides = 2;
    let isDragging = false;
    let startX = 0;

    // Clone first and last slides for infinite effect
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[totalSlides - 1].cloneNode(true);
    track.insertBefore(lastClone, slides[0]);
    track.appendChild(firstClone);
    
    // Update slides after cloning
    const allSlides = document.querySelectorAll(".slide");
    const slideWidth = slides[0].offsetWidth + 40;
    track.style.transform = `translateX(-${index * slideWidth}px)`;

    // Create dots
    slides.forEach((_, i) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => {
            index = i + 1;
            updateSlidePosition();
        });
        dotsContainer.appendChild(dot);
    });

    function updateSlidePosition(smooth = true) {
        track.style.transition = smooth ? "transform 0.5s ease-in-out" : "none";
        track.style.transform = `translateX(-${index * slideWidth}px)`;
        updateDots();
    }

    function updateDots() {
        document.querySelectorAll(".dot").forEach((dot, i) => {
            dot.classList.toggle("active", i === index - 1);
        });
    }

    function nextSlide() {
        if (index >= totalSlides) {
            index++;
            updateSlidePosition();
            setTimeout(() => {
                track.style.transition = "none";
                index = 1;
                updateSlidePosition(false);
            }, 500);
        } else {
            index++;
            updateSlidePosition();
        }
    }

    function prevSlide() {
        if (index <= 0) {
            index--;
            updateSlidePosition();
            setTimeout(() => {
                track.style.transition = "none";
                index = totalSlides;
                updateSlidePosition(false);
            }, 500);
        } else {
            index--;
            updateSlidePosition();
        }
    }

    nextButton.addEventListener("click", nextSlide);
    prevButton.addEventListener("click", prevSlide);

    track.addEventListener("mousedown", (e) => {
        isDragging = true;
        startX = e.clientX;
    });

    track.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        let moveX = e.clientX - startX;
        if (moveX > 50) {
            prevSlide();
            isDragging = false;
        } else if (moveX < -50) {
            nextSlide();
            isDragging = false;
        }
    });

    track.addEventListener("mouseup", () => {
        isDragging = false;
    });

    track.addEventListener("mouseleave", () => {
        isDragging = false;
    });

    setInterval(nextSlide, 3000);
});
