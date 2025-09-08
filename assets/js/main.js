// Variable y función declaradas globalmente
const imagenFlotante = document.getElementById("imagen-flotante");

function cerrarImagen() {
  if (imagenFlotante) {
    imagenFlotante.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Código del Modal de Video (modalFullscreen)
  const modalElement = document.getElementById("modalFullscreen");
  if (modalElement) {
    const miModal = new bootstrap.Modal(modalElement);
    miModal.show();
    let tiempoRestante = 6;
    const intervalo = setInterval(() => {
      tiempoRestante--;
      console.log(`Cerrando en ${tiempoRestante} segundos...`);
      if (tiempoRestante <= 0) {
        miModal.hide();
        clearInterval(intervalo);
      }
    }, 1000);
  }

  // Código del Menú
  const velaImage = document.querySelector(".vela");
  const menuList = document.querySelector(".menu");
  velaImage.addEventListener("click", function () {
    menuList.classList.toggle("hidden");
  });
  document.addEventListener("click", function (event) {
    if (!velaImage.contains(event.target) && !menuList.contains(event.target)) {
      if (!menuList.classList.contains("hidden")) {
        menuList.classList.add("hidden");
      }
    }
  });

  // Código del Botón flotante Calavera
  const btnCalavera = document.getElementById("btnCalavera");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      btnCalavera.style.display = "block";
    } else {
      btnCalavera.style.display = "none";
    }
  });
  btnCalavera.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
  //.........................................................................................seccion 2
  // Código del Slider de la Sección 2 (con pergamino)
  const slides = document.querySelectorAll(".slide");
  const prevBtnSlider = document.querySelector(".contenedor-slider .prev");
  const nextBtnSlider = document.querySelector(".contenedor-slider .next");

  const papiroContainer = document.querySelector(".papiro-container");
  const textoPapiro = document.getElementById("texto-papiro");

  const textos = [
    `<h1>Catedral</h1> <p>La Catedral Basílica Metropolitana Santiago de Tunja, ubicada en la Plaza de Bolívar, es una de las catedrales más antiguas de Latinoamérica y de Colombia. Su construcción inició en 1562 y finalizó en 1607.</p>`,
    `<h1>Estatua de Simón Bolívar</h1> <p>La historia de la estatua de Simón Bolívar en la Plaza de Bolívar de Tunja es rica y variada. La primera estatua pedestre del libertador fue instalada el 20 de julio de 1884...</p>`,
    `<h1>El Pozo de Donato</h1> <p>El Pozo de Donato, también conocido como Pozo de Hunzahúa, es un lugar histórico cargado de leyendas...</p>`,
  ];

  let currentIndex = 0;

  // Función para mostrar slide y texto
  const papiroCentro = document.querySelector(".papiro-centro");
  const extremoIzq = document.querySelector(".papiro-izquierdo");
  const extremoDer = document.querySelector(".papiro-derecho");

  function abrirCerrarPapiro(abierto) {
    if (abierto) {
      papiroCentro.style.transform = "scaleX(1)";
      extremoIzq.style.transform = "translateX(0)";
      extremoDer.style.transform = "translateX(0)";
    } else {
      papiroCentro.style.transform = "scaleX(0)";
      const anchoCentro = papiroCentro.offsetWidth / 2;
      extremoIzq.style.transform = `translateX(${anchoCentro}px)`;
      extremoDer.style.transform = `translateX(-${anchoCentro}px)`;
    }
  }

  function showSlide(index) {
    slides.forEach(
      (slide, i) => (slide.style.display = i === index ? "block" : "none")
    );

    // Cerrar pergamino
    abrirCerrarPapiro(false);

    setTimeout(() => {
      textoPapiro.innerHTML = textos[index]; // cambia contenido
      abrirCerrarPapiro(true); // abrir pergamino y volver extremos a borde
    }, 600);
  }

  // Animación de la mano (frames)
  const manoFrames = document.querySelectorAll(".mano-animada .frame");
  let frameIndex = 0;

  setInterval(() => {
    manoFrames.forEach((frame) => frame.classList.remove("active"));
    frameIndex = (frameIndex + 1) % manoFrames.length;
    manoFrames[frameIndex].classList.add("active");
  }, 200); // cambia cada 300ms, ajusta la velocidad

  // Botones
  prevBtnSlider.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });

  nextBtnSlider.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  });

  // Mostrar el primero al cargar
  showSlide(currentIndex);

  //.........................................................................................seccion 3

  // Código del Carrusel de la Sección 3
  const track = document.querySelector(".carrusel-track");
  const prevBtnCarrusel = document.querySelector(".contenedor-carrusel .prev");
  const nextBtnCarrusel = document.querySelector(".contenedor-carrusel .next");
  let items = Array.from(track.children);
  let itemsPerView = getItemsPerView();
  let itemWidth = items[0].getBoundingClientRect().width + 15;
  items
    .slice(-itemsPerView)
    .forEach((item) =>
      track.insertBefore(item.cloneNode(true), track.firstChild)
    );
  items
    .slice(0, itemsPerView)
    .forEach((item) => track.appendChild(item.cloneNode(true)));
  items = Array.from(track.children);
  let index = itemsPerView;
  updatePosition(false);
  function getItemsPerView() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }
  function updateWidth() {
    itemsPerView = getItemsPerView();
    itemWidth = items[0].getBoundingClientRect().width + 15;
  }
  function updatePosition(animate = true) {
    track.style.transition = animate ? "transform 0.4s ease" : "none";
    track.style.transform = `translateX(${-index * itemWidth}px)`;
  }
  nextBtnCarrusel.addEventListener("click", () => {
    index++;
    updatePosition();
    if (index >= items.length - itemsPerView) {
      setTimeout(() => {
        index = itemsPerView;
        updatePosition(false);
      }, 400);
    }
  });
  prevBtnCarrusel.addEventListener("click", () => {
    index--;
    updatePosition();
    if (index < itemsPerView) {
      setTimeout(() => {
        index = items.length - itemsPerView * 2;
        updatePosition(false);
      }, 400);
    }
  });
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });
  track.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
  });
  track.addEventListener("touchend", () => {
    isDragging = false;
    let diff = startX - currentX;
    if (diff > 50) nextBtnCarrusel.click();
    else if (diff < -50) prevBtnCarrusel.click();
  });
  window.addEventListener("resize", () => {
    updateWidth();
    updatePosition(false);
  });
  document.querySelectorAll("article").forEach((article) => {
    article.addEventListener("click", function () {
      document
        .querySelectorAll("article")
        .forEach((a) => a.classList.remove("active"));
      this.classList.add("active");
      setTimeout(() => this.classList.remove("active"), 2000);
    });
  });
  updateWidth();

  // Código del Modal de la Brújula
  const btnBrujula = document.getElementById("btnBrujula");
  const modalBrujula = document.getElementById("modalBrujula");
  const spanClose = document.querySelector("#modalBrujula .btn-Close");

  btnBrujula.addEventListener("click", function () {
    modalBrujula.style.display = "block";
  });

  spanClose.addEventListener("click", function () {
    modalBrujula.style.display = "none";
  });

  window.addEventListener("click", function (e) {
    if (e.target === modalBrujula) {
      modalBrujula.style.display = "none";
    }
  });
});

// Código del Cursor (debe estar fuera de DOMContentLoaded)
const cursor = document.getElementById("cursor-img");
if (cursor) {
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });
  document.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    cursor.style.left = touch.clientX + "px";
    cursor.style.top = touch.clientY + "px";
  });
}
