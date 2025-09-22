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
  // =======================
  // Modal de Video
  // =======================
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

  // =======================
  // Menú con la vela
  // =======================
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

  // =======================
  // Botón flotante Calavera
  // =======================
  const btnCalavera = document.getElementById("btnCalavera");
  if (btnCalavera) {
    const normalSrc = "assets/multimedia/img/calavera.png";
    const fuegoSrc = "assets/multimedia/img/calavera2.png";

    const calavera = document.createElement("img");
    calavera.id = "imgCalavera";
    calavera.src = normalSrc;
    btnCalavera.appendChild(calavera);

    btnCalavera.addEventListener("click", () => {
      calavera.classList.add("shake-horizontal");
      calavera.src = fuegoSrc;

      setTimeout(() => {
        calavera.classList.remove("shake-horizontal");
        calavera.src = normalSrc; // volver al icono normal
      }, 800);

      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // =======================
  // Función reutilizable para modales personalizados
  // =======================
  function configurarModal(btnAbrirId, modalId, btnCerrarId) {
    const btnAbrir = document.getElementById(btnAbrirId);
    const modal = document.getElementById(modalId);
    const btnCerrar = document.getElementById(btnCerrarId);

    if (btnAbrir && modal && btnCerrar) {
      btnAbrir.addEventListener("click", () => {
        modal.style.display = "flex";
        const video = modal.querySelector("video");
        if (video) video.play();
      });

      btnCerrar.addEventListener("click", () => {
        modal.style.display = "none";
        const video = modal.querySelector("video");
        if (video) video.pause();
      });

      window.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.style.display = "none";
          const video = modal.querySelector("video");
          if (video) video.pause();
        }
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.style.display === "flex") {
          modal.style.display = "none";
          const video = modal.querySelector("video");
          if (video) video.pause();
        }
      });
    }
  }

  // Configurar modales
  configurarModal("abrirModalUmbrio", "umbrioModal", "cerrarModal2");
  configurarModal("btnModal", "modal", "cerrarModal");
});
