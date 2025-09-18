document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carrusel-track-secc3");
  const prevBtn = document.querySelector(".carrusel-secc3 .prev-secc3");
  const nextBtn = document.querySelector(".carrusel-secc3 .next-secc3");

  if (!track || !prevBtn || !nextBtn) return; // seguridad

  let items = Array.from(track.children); // items originales
  let itemsPerView = getItemsPerView();
  let gap = 15; // igual que en CSS
  let itemWidth = items[0].getBoundingClientRect().width + gap;

  // Clonar al inicio y final
  items.slice(-itemsPerView).forEach(item =>
    track.insertBefore(item.cloneNode(true), track.firstChild)
  );
  items.slice(0, itemsPerView).forEach(item =>
    track.appendChild(item.cloneNode(true))
  );

  // Actualizar items con clones incluidos
  items = Array.from(track.children);

  let carruselIndex = itemsPerView;
  updatePosition(false);

  function getItemsPerView() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function updateWidth() {
    itemsPerView = getItemsPerView();
    itemWidth = items[0].getBoundingClientRect().width + gap;
  }

  function updatePosition(animate = true) {
    track.style.transition = animate ? "transform 0.4s ease" : "none";
    track.style.transform = `translateX(${-carruselIndex * itemWidth}px)`;
  }

  nextBtn.addEventListener("click", () => {
    carruselIndex++;
    updatePosition();
    if (carruselIndex >= items.length - itemsPerView) {
      setTimeout(() => {
        carruselIndex = itemsPerView;
        updatePosition(false);
      }, 400);
    }
  });

  prevBtn.addEventListener("click", () => {
    carruselIndex--;
    updatePosition();
    if (carruselIndex < itemsPerView) {
      setTimeout(() => {
        carruselIndex = items.length - itemsPerView * 2;
        updatePosition(false);
      }, 400);
    }
  });

  // Swipe táctil
  let startX = 0, currentX = 0, isDragging = false;
  track.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });
  track.addEventListener("touchmove", e => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
  });
  track.addEventListener("touchend", () => {
    isDragging = false;
    let diff = startX - currentX;
    if (diff > 50) nextBtn.click();
    else if (diff < -50) prevBtn.click();
  });

  // Redimensionar (responsivo)
  window.addEventListener("resize", () => {
    updateWidth();
    updatePosition(false);
  });
});
