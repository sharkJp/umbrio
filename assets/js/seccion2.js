
//.........................................................................................seccion 2
// Código del Slider de la Sección 2 (con pergamino)
const slides = document.querySelectorAll(".slide");
const prevBtnSlider = document.querySelector(".contenedor-slider .prev-secc2");
const nextBtnSlider = document.querySelector(".contenedor-slider .next-secc2");

const papiroContainer = document.querySelector(".papiro-container");
const textoPapiro = document.getElementById("texto-papiro");

const textos = [
  `<h1>Catedral</h1> <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
 Deserunt minus debitis molestiae consequatur earum aliquid, 
 odit totam in natus.</p>`,
  `<h1>Catedral</h1> <p>La Catedral Basílica Metropolitana Santiago de Tunja, ubicada en la Plaza de Bolívar, es una de las catedrales más antiguas de Latinoamérica y de Colombia. Su construcción inició en 1562 y finalizó en 1607.</p>`,

  `<h1>Plaza San Francisco</h1> <p> Lorem ipsum dolor sit amet consectetur adipisicing elit.
 Deserunt minus debitis molestiae consequatur earum aliquid, 
 odit totam in natus. Ea enim dolor a nemo alias obcaecati 
 provident ipsa excepturi autem.</p>`,
  `<h1>Plaza San Francisco</h1> <p> Lorem ipsum dolor sit amet consectetur adipisicing elit.
 Deserunt minus debitis molestiae consequatur earum aliquid, 
 odit totam in natus. Ea enim dolor a nemo alias obcaecati 
 provident ipsa excepturi autem.</p>`,

  `<h1>El Pozo de Donato</h1> <p>El Pozo de Donato, también conocido como Pozo de Hunzahúa, es un lugar histórico cargado de leyendas...</p>`,

  `<h1>Biblioteca</h1> 
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
 Deserunt minus debitis molestiae consequatur earum aliquid, 
 odit totam in natus. Ea enim dolor a nemo alias obcaecati 
 provident ipsa excepturi autem.</p>`,
  `<h1>Claustro San Agustín</h1> <p>Ha cumplido múltiples funciones a lo largo de la historia: fue convento e iglesia, colegio, universidad, hospital, prisión.</p>`,

  `<h1>Claustro San Agustín</h1> 

    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
 Deserunt minus debitis molestiae consequatur earum aliquid, 
 odit totam in natus. Ea enim dolor a nemo alias obcaecati 
 provident ipsa excepturi autem.</p>`,
  `<h1>Cojines del Zaque</h1> 

    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
 Deserunt minus debitis molestiae consequatur earum aliquid, 
 odit totam in natus. Ea enim dolor a nemo alias obcaecati 
 provident ipsa excepturi autem.</p>`,
  `<h1>Cojines del zaque</h1> 
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
 Deserunt minus debitis molestiae consequatur earum aliquid, 
 odit totam in natus. Ea enim dolor a nemo alias obcaecati 
 provident ipsa excepturi autem.</p>`

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
  showSlide(currentIndex - 1);
});

nextBtnSlider.addEventListener("click", () => {
  showSlide(currentIndex + 1);
});
