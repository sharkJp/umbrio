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

document.addEventListener("DOMContentLoaded", () => {
  const row = document.querySelector("#seccion4 .row"); // contenedor de tarjetas
  const prevBtn = document.querySelector("#seccion4 .prev");
  const nextBtn = document.querySelector("#seccion4 .next");

  // Definir cuánto se mueve el scroll (una tarjeta aprox.)
  const cardWidth = row.querySelector(".col-xl-3").offsetWidth + 16; // tarjeta + margen

  // Botón anterior
  prevBtn.addEventListener("click", () => {
    row.scrollBy({
      left: -cardWidth,
      behavior: "smooth"
    });
  });

  // Botón siguiente
  nextBtn.addEventListener("click", () => {
    row.scrollBy({
      left: cardWidth,
      behavior: "smooth"
    });
  });
});

