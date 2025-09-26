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
const normalSrc = "assets/multimedia/img/calavera.webp";
const fuegoSrc = "assets/multimedia/img/calavera2.webp";

// Crear img dinámicamente
const calavera = document.createElement("img");
calavera.id = "imgCalavera";
calavera.src = normalSrc;
btnCalavera.appendChild(calavera);

// Detectar secciones
const seccion2 = document.querySelector(".seccion2");
const seccion3 = document.querySelector(".seccion3");
const footer = document.querySelector("footer");

// Al hacer click
btnCalavera.addEventListener("click", () => {
  calavera.classList.add("shake-horizontal");
  calavera.src = fuegoSrc;

  setTimeout(() => {
    calavera.classList.remove("shake-horizontal");
  }, 800);

  // Subir al inicio
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Hover: cambiar a fuego + vibrar
calavera.addEventListener("mouseenter", () => {
  calavera.src = fuegoSrc;
  calavera.classList.add("shake-horizontal");
});

calavera.addEventListener("mouseleave", () => {
  calavera.src = normalSrc;
  calavera.classList.remove("shake-horizontal");
});

// Mostrar / ocultar según scroll (secc2, secc3 y footer)
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const seccion2Top = seccion2.offsetTop;
  const seccion3Top = seccion3.offsetTop;
  const footerTop = footer.offsetTop;

  if (
    (scrollY >= seccion2Top && scrollY < footerTop) || // secc2 y secc3
    scrollY >= footerTop // footer
  ) {
    btnCalavera.style.display = "block";
  } else {
    btnCalavera.style.display = "none"; // oculta en secc1
    calavera.src = normalSrc;
  }
});

  //.........................................................................................seccion 2
  // Código del Slider de la Sección 2 (con pergamino)
  const slides = document.querySelectorAll(".slide");
  const prevBtnSlider = document.querySelector(".contenedor-slider .prev-secc2");
  const nextBtnSlider = document.querySelector(".contenedor-slider .next-secc2");

  const papiroContainer = document.querySelector(".papiro-container");
  const textoPapiro = document.getElementById("texto-papiro");

  const textos = [
    `<h1>Catedral</h1> <p>La Catedral Basílica Metropolitana Santiago de Tunja, ubicada en la Plaza de Bolívar, es una de las catedrales más antiguas de Latinoamérica y de Colombia. Su construcción inició en 1562 y finalizó en 1607.</p>`,
    `<h1>Plaza de Bolívar</h1> <p>La Plaza de Bolívar de Tunja es el centro histórico de la ciudad, rodeada de arquitectura colonial y de gran valor cultural...</p>`,
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
