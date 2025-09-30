const mano = document.querySelector(".mano");
const frames = mano.querySelectorAll(".frame");
let index = 0;

// alternar frames para simular pasos
setInterval(() => {
  frames.forEach(f => f.classList.remove("active"));
  frames[index].classList.add("active");
  index = (index + 1) % frames.length;
}, 200);

function iniciarRecorrido() {
  mano.style.opacity = "1"; // mostrar
  mano.style.animation = "caminar 12s linear forwards"; // una sola vez
}

// cuando termine la animación, ocultar y esperar antes de reiniciar
mano.addEventListener("animationend", () => {
  mano.style.opacity = "0";       // se oculta
  mano.style.animation = "none";  // reset animación
  setTimeout(() => {
    iniciarRecorrido();           // vuelve a empezar después de cierto tiempo
  }, 5000); // <-- tiempo de espera (5s)
});

// arrancar la primera vez
iniciarRecorrido();

  // Animación de la mano (frames)
  const manoFrames = document.querySelectorAll(".mano-animada .frame");
  let frameIndex = 0;

  setInterval(() => {
    manoFrames.forEach((frame) => frame.classList.remove("active"));
    frameIndex = (frameIndex + 1) % manoFrames.length;
    manoFrames[frameIndex].classList.add("active");
  }, 200); // cambia cada 300ms, ajusta la velocidad


 //.........................................................................................seccion 2
  // Código del Slider de la Sección 2 (con pergamino)
  const slides = document.querySelectorAll(".slide");
  const prevBtnSlider = document.querySelector(".contenedor-slider .prev-secc2");
  const nextBtnSlider = document.querySelector(".contenedor-slider .next-secc2");

  const papiroContainer = document.querySelector(".papiro-container");
  const textoPapiro = document.getElementById("texto-papiro");

  const textos = [
    `<h1>Catedral</h1> <p>La Catedral Basílica Metropolitana Santiago de Tunja, ubicada en la Plaza de Bolívar, es una de las catedrales más antiguas de Latinoamérica y de Colombia. Su construcción inició en 1562 y finalizó en 1607.</p>`,
    `<h1>Plaza Simón Bolívar</h1> <p> Es la segunda más grande de Colombia después de la de Villa de Leyva, está rodeada por importantes edificios coloniales.</p>`,
    `<h1>El Pozo de Donato</h1> <p>El Pozo de Donato, también conocido como Pozo de Hunzahúa, es un lugar histórico cargado de leyendas...</p>`,
    `<h1>San Agustín</h1> <p>Ha cumplido múltiples funciones a lo largo de la historia: fue convento e iglesia, colegio, universidad, hospital, prisión.</p>`
  
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

  /*function showSlide(index) {
    slides.forEach(
      (slide, i) => (slide.style.display = i === index ? "block" : "none")
    );

    // Cerrar pergamino
    abrirCerrarPapiro(false);

    setTimeout(() => {
      textoPapiro.innerHTML = textos[index]; // cambia contenido
      abrirCerrarPapiro(true); // abrir pergamino y volver extremos a borde
    }, 600);
  }*/

    function showSlide(index) {
  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;

  const currentSlide = slides[currentIndex];
  const nextSlide = slides[index];

  if (currentSlide === nextSlide) return;

  // Obtener las imágenes
  const currentImg = currentSlide.querySelector("img");
  const nextImg = nextSlide.querySelector("img");

  // Cerrar pergamino
  abrirCerrarPapiro(false);

  // Animación de salida solo en la imagen actual
  currentImg.classList.remove("fade-in");
  currentImg.classList.add("out");

  setTimeout(() => {
    // Ocultar slide completo
    currentSlide.style.display = "none";
    currentImg.classList.remove("out");

    // Mostrar siguiente slide
    nextSlide.style.display = "block";
    nextImg.classList.add("fade-in");

    // Actualizar pergamino
    textoPapiro.innerHTML = textos[index];
    abrirCerrarPapiro(true);

    // Actualizar índice
    currentIndex = index;
  },
  1000);
}

// Mostrar el primer slide con texto y animación
slides[currentIndex].style.display = "block";
slides[currentIndex].classList.add("fade-in");
textoPapiro.innerHTML = textos[currentIndex];
abrirCerrarPapiro(true);

// Botones
prevBtnSlider.addEventListener("click", () => {
  showSlide(currentIndex -1);
});

nextBtnSlider.addEventListener("click", () => {
  showSlide(currentIndex +1);
});

 /*prevBtnSlider.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });

  nextBtnSlider.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  });

  // Mostrar el primero al cargar
  showSlide(currentIndex); */
