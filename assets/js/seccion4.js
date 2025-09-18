// =====================
// 4. MODAL "UMBRÍO" (Video desde menú)
// =====================
const abrirModal2 = document.getElementById('abrirModalUmbrio');
const modal2 = document.getElementById('umbrioModal');
const cerrarModal2 = document.getElementById('cerrarModal2');
const video2 = document.getElementById('videoUmbrio');

abrirModal2.addEventListener('click', (e) => {
  e.preventDefault();
  modal2.style.display = 'flex';
  video2.play();
});

cerrarModal2.addEventListener('click', cerrarModalUmbrio);
window.addEventListener('click', (e) => {
  if (e.target === modal2) cerrarModalUmbrio();
});

function cerrarModalUmbrio() {
  modal2.style.display = 'none';
  video2.pause();
  video2.currentTime = 0;
}


// =====================
// 5. NUESTRO EQUIPO
// =====================
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector("#seccion4 .carousel-track");
  const slides = Array.from(track.children);
  const prevButton = document.querySelector("#seccion4 .prev");
  const nextButton = document.querySelector("#seccion4 .next");

  let index = 0;
  let autoplay;

  function slidesPerView() {
    if (window.innerWidth <= 480) return 1; // móvil
    if (window.innerWidth <= 768) return 2; // tablet
    return 4; // escritorio
  }

  function updateCarousel() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${index * slideWidth}px)`;
  }

  function nextSlide() {
    if (index < slides.length - slidesPerView()) {
      index++;
    } else {
      index = 0; // reinicia al inicio
    }
    updateCarousel();
  }

  function prevSlide() {
    if (index > 0) {
      index--;
    } else {
      index = slides.length - slidesPerView();
    }
    updateCarousel();
  }

  nextButton.addEventListener("click", () => {
    nextSlide();
    restartAutoplay();
  });

  prevButton.addEventListener("click", () => {
    prevSlide();
    restartAutoplay();
  });

  // autoplay cada 3s
  function startAutoplay() {
    autoplay = setInterval(nextSlide, 3000);
  }

  function stopAutoplay() {
    clearInterval(autoplay);
  }

  function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  startAutoplay();

  // reinicia cuando cambia el tamaño
  window.addEventListener("resize", () => {
    index = 0;
    updateCarousel();
  });
});
