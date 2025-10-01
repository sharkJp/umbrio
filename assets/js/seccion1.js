 
const linterna = document.getElementById('linterna');
  const niebla = document.getElementById('niebla');
  // 🚫 Bloquear scroll al cargar
  document.body.style.overflow = "hidden";
  // Efecto de linterna siguiendo el mouse
  document.addEventListener('mousemove', (e) => {
    linterna.style.setProperty('--x', e.clientX + 'px');
    linterna.style.setProperty('--y', e.clientY + 'px');
  });

  // Después de 7 segundos: linterna y niebla se desvanecen
  setTimeout(() => {
    niebla.classList.add('oculto');
    linterna.classList.add('oculto');

    // Después de 5 segundos más: ocultar completamente el video de niebla
    setTimeout(() => {
      niebla.style.display = 'none';
      cursor.src = "./assets/multimedia/img/mano.png";      // 👈 cambiar cursor
      cursor.style.width = "80px";
        // ✅ Habilitar scroll cuando la animación termina
      document.body.style.overflow = "auto";
    }, 5000);

  }, 7000); 


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
 
