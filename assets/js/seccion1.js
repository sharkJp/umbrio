// =====================
// 1. MODAL "UMBRÍO" (Video desde menú)
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