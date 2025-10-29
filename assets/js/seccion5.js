const swiper = new Swiper(".mySwiper", {
  loop: true, // Loop infinito activado
  spaceBetween: 15,
  centeredSlides: true,
  watchOverflow: false, // Cambiado a false para que siempre funcione
  loopAdditionalSlides: 2, // Agregado para loop más suave
  
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  
  breakpoints: {
    // Celulares: 1 tarjeta
    0: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    // Tablets: 2 tarjetas
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    // Portátiles estándar: 3 tarjetas
    1024: {
      slidesPerView: 3,
      spaceBetween: 25,
    },
    // Monitores grandes: 3 tarjetas
    1440: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});