document.addEventListener("DOMContentLoaded", () => {
  const flotantes = document.querySelectorAll(".flotante");

  // Ocultar todos al inicio
  flotantes.forEach(f => f.style.display = "none");

  // Detectar sección más visible
  const observer = new IntersectionObserver(entries => {
    // Buscar la sección con mayor visibilidad
    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible) {
      const flotante = visible.target.querySelector(".flotante");
      const video = flotante?.querySelector("video");

      if (flotante) {
        // Ocultar todos y pausar
        flotantes.forEach(f => {
          f.style.display = "none";
          const v = f.querySelector("video");
          if (v) v.pause();
        });

        // Mostrar solo el más visible
        flotante.style.display = "block";
        if (video) {
          video.currentTime = 0; // reinicia al entrar
          video.play();
        }
      }
    }
  }, { threshold: [0.25, 0.5, 0.75, 1] });

  // Observar todas las secciones
  document.querySelectorAll("section").forEach(sec => observer.observe(sec));

  // Botones de cerrar
  const botonesCerrar = document.querySelectorAll(".cerrar-boton");
  botonesCerrar.forEach(boton => {
    boton.addEventListener("click", () => {
      const targetId = boton.getAttribute("data-target");
      const contenedor = document.getElementById(targetId);
      const video = contenedor?.querySelector("video");

      if (contenedor) {
        contenedor.style.display = "none";
        if (video) {
          video.pause();
          video.currentTime = 0; // reinicia al cerrarlo
        }
      }
    });
  });
});


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
  const normalSrc = "assets/multimedia/img/calavera.png";
  const fuegoSrc = "assets/multimedia/img/calavera2.png";

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
    `<h1>Simón Bolívar</h1> <p>La plaza, que es la segunda más grande de Colombia después de la de Villa de Leyva, está rodeada por importantes edificios coloniales, incluyendo la Catedral Basílica Metropolitana Santiago de Tunja, la Casa del Fundador Gonzalo Suárez Rendón, la Alcaldía Municipal y la Gobernación</p>`,
    `<h1>El Pozo de Donato</h1> <p>El Pozo de Donato, también conocido como Pozo de Hunzahúa, es un lugar histórico cargado de leyendas...</p>`,
    `<h1>San Agustín</h1> <p>Este edificio, ha cumplido múltiples funciones a lo largo de la historia: fue convento e iglesia, colegio, universidad, hospital prisión conocida como Panóptico de Tunja. Actualmente, el Centro Cultural del Banco de la República, la Biblioteca Alfonso Patiño Rosselli, el Archivo Regional de Boyacá y la sede de San Agustín del Colegio de Boyacá.</p>`
  
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
   showSlide(currentIndex -1);
  });

  nextBtnSlider.addEventListener("click", () => {
    showSlide(currentIndex +1);
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
