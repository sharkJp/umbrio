// Variable y función declaradas globalmente
document.addEventListener('DOMContentLoaded', () => {
  const bloques = document.querySelectorAll('.bloque-interprete');

  // Ocultar todos los bloques al inicio
  bloques.forEach(b => b.style.display = 'none');

  const mostrarBloques = () => {
    bloques.forEach(b => b.style.display = 'block');
  };

  // Mostrar bloques si se dispara el evento
  document.addEventListener('modalBienvenidaCerrado', mostrarBloques);

  // Si el modal ya se cerró antes de que este JS cargara
  if (window.modalBienvenidaYaCerrado) {
    mostrarBloques();
  }

  // Si no existe el modal, mostrar los bloques directamente
  if (!document.getElementById('modalFullscreen')) {
    mostrarBloques();
  }

  // Eventos de mostrar/ocultar intérprete en cada bloque
  bloques.forEach(bloque => {
    const interprete = bloque.querySelector('.interprete');
    const btnCerrar = bloque.querySelector('.cerrar-boton');
    const btnMostrar = bloque.querySelector('.mostrar-boton');

    const esMovil = window.matchMedia('(max-width: 768px)').matches;

    if (esMovil) {
      // En móviles: el video empieza oculto
      interprete.style.display = 'none';
      btnMostrar.style.display = 'flex';
    } else {
      // En PC: el video visible, botón oculto
      interprete.style.display = 'flex';
      btnMostrar.style.display = 'none';
    }

    btnCerrar.addEventListener('click', () => {
      interprete.style.display = 'none';
      btnMostrar.style.display = 'flex';
    });

    btnMostrar.addEventListener('click', () => {
      interprete.style.display = 'flex';
      btnMostrar.style.display = 'none';
    });
  });
});
 
  const btnCalavera = document.getElementById("btnCalavera");

  let basePath;

if (window.location.pathname.includes("page2.html")) {
  basePath = "../multimedia/img/";
} else {
  basePath = "assets/multimedia/img/";
}

const normalSrc = basePath + "cráneo1.png";
const fuegoSrc = basePath + "cráneo2.png";


  // Crear imagen dinámicamente
  const calavera = document.createElement("img");
  calavera.id = "imgCalavera";
  calavera.src = normalSrc;
  btnCalavera.appendChild(calavera);

  // Detectar secciones según la página
  let seccionA, seccionB;
  if (document.querySelector(".seccion2") && document.querySelector(".seccion3")) {
    // Página 1
    seccionA = document.querySelector(".seccion2");
    seccionB = document.querySelector(".seccion3");
  } else if (document.querySelector(".seccion5") && document.querySelector(".seccion6")) {
    // Página 2
    seccionA = document.querySelector(".seccion5");
    seccionB = document.querySelector(".seccion6");
  }

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

  // Mostrar / ocultar según scroll (como en la primera página)
  window.addEventListener("scroll", () => {
    if (!seccionA || !seccionB || !footer) return;

    const scrollY = window.scrollY;
    const seccionATop = seccionA.offsetTop;
    const seccionBTop = seccionB.offsetTop;
    const footerTop = footer.offsetTop;

    if (
      (scrollY >= seccionATop && scrollY < footerTop) ||
      scrollY >= footerTop
    ) {
      btnCalavera.style.display = "block";
    } else {
      btnCalavera.style.display = "none";
      calavera.src = normalSrc;
    }
  });


   const cursor = document.getElementById("cursor-img");
    function showSlide(index) {
      slides.forEach((slide) => (slide.style.display = "none"));
      slides[index].style.display = "block";
      textBox.innerHTML = `<p>${textos[index]}</p>`;
    }
    // Movimiento en PC
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    });

    // Movimiento en móviles (seguirá el dedo al tocar/pulsar)
    document.addEventListener("touchmove", (e) => {
      const touch = e.touches[0];
      cursor.style.left = touch.clientX + "px";
      cursor.style.top = touch.clientY + "px";
    });
 
  if (cursor && window.innerWidth > 768) { 
cursor.src = "./assets/multimedia/img/mano.webp";
cursor.style.width = "80px";
}
else{
  cursor.style.display = "none";
}
