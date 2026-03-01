document.addEventListener("DOMContentLoaded", () => {
    // 1. Efecto de máquina de escribir
    const typingText = document.querySelector(".typing-text");
    const words = ["emociones", "momentos", "historias", "la vida"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 100 : 200;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pausa al terminar la palabra
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pausa antes de la siguiente palabra
        }

        setTimeout(typeEffect, typeSpeed);
    }

    // Iniciar efecto
    if (typingText) setTimeout(typeEffect, 1000);

    // 2. Animación al hacer scroll (Reveal)
    const reveals = document.querySelectorAll(".reveal");

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // Solo animar una vez
            }
        });
    }, {
        root: null,
        threshold: 0.1, // Activar cuando el 10% del elemento sea visible
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });

    // 3. Navbar Sticky (Cambiar color al bajar)
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = "rgba(5, 5, 5, 0.95)";
            navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.5)";
        } else {
            navbar.style.backgroundColor = "rgba(5, 5, 5, 0.85)";
            navbar.style.boxShadow = "none";
        }
    });

    // 4. Bloquear el menú contextual y arrastre en todas las imágenes/móviles
    document.addEventListener('contextmenu', event => event.preventDefault());
    
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('dragstart', (e) => e.preventDefault());
    });
});
