document.addEventListener("DOMContentLoaded", () => {
  const row = document.querySelector("#seccion6 .row"); // contenedor de tarjetas
  const prevBtn = document.querySelector("#seccion6 .prev");
  const nextBtn = document.querySelector("#seccion6 .next");

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