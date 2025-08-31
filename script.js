document.addEventListener("DOMContentLoaded", function() {
    
    // --- CUSTOM CURSOR ---
    const cursorDot = document.querySelector("#cursor-dot");
    const cursorOutline = document.querySelector("#cursor-outline");
    const interactiveElements = document.querySelectorAll(".interactive, .interactive-link");

    if (window.matchMedia("(min-width: 769px)").matches) {
        window.addEventListener("mousemove", function (e) {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", () => cursorOutline.classList.add("hovered"));
            el.addEventListener("mouseleave", () => cursorOutline.classList.remove("hovered"));
        });
    }

    // --- MAGNETIC BUTTON ---
    const magneticButton = document.querySelector('.magnetic-button');
    if(magneticButton && window.gsap) {
        magneticButton.addEventListener('mousemove', function(e) {
            const { offsetX, offsetY, target } = e;
            const { clientWidth, clientHeight } = target;
            const x = (offsetX / clientWidth - 0.5) * 40;
            const y = (offsetY / clientHeight - 0.5) * 40;
            
            gsap.to(target, {
                x: x,
                y: y,
                duration: 0.5,
                ease: 'power3.out'
            });
        });

        magneticButton.addEventListener('mouseleave', function(e) {
            gsap.to(e.target, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    }

    // --- INFINITE SCROLLING MARQUEE ---
    const scroller = document.querySelector(".scrolling-content");
    if(scroller) {
        const items = Array.from(scroller.children);
        items.forEach(item => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute("aria-hidden", true);
            scroller.appendChild(duplicatedItem);
        });
    }
    
    // --- REVEAL ON SCROLL ---
    const revealElements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach((el) => observer.observe(el));

    // --- LIGHTBOX FOR PORTFOLIO ---
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeBtn = document.querySelector('.close-btn');

    portfolioItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            lightbox.style.display = 'block';
            lightboxImg.src = this.href;
            lightboxCaption.innerHTML = this.dataset.title;
        });
    });

    function closeLightbox() {
        lightbox.style.display = 'none';
    }

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target !== lightboxImg && e.target !== lightboxCaption) {
            closeLightbox();
        }
    });
});