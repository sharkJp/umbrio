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
