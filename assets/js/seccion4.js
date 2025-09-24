document.addEventListener('DOMContentLoaded', function() {
    // Selecciona los elementos del DOM
    const abrirModalBtn = document.getElementById('abrirModal');
    const cerrarModalBtn = document.getElementById('cerrarModal');
    const miModal = document.getElementById('miModal');
    const body = document.body; // <-- OBTENER EL ELEMENTO BODY

    // **IMPORTANTE**: Verifica que los elementos se encontraron
    if (!miModal || !abrirModalBtn || !cerrarModalBtn) {
        console.error("Error: No se pudieron encontrar todos los elementos del modal.");
        return; 
    }

    // Event listener para el botón de abrir
    abrirModalBtn.addEventListener('click', () => {
        miModal.showModal(); // Muestra el modal como modal
        body.classList.add('modal-open'); // <-- AÑADE CLASE PARA BLOQUEAR SCROLL
    });

    // Event listener para el botón de cerrar
    cerrarModalBtn.addEventListener('click', () => {
        miModal.close(); // Cierra el modal
        body.classList.remove('modal-open'); // <-- REMUEVE CLASE PARA RESTAURAR SCROLL
    });
    
    // OPCIONAL: Escuchar el evento nativo 'close' (ej. si cierras con ESC)
    miModal.addEventListener('close', () => {
        body.classList.remove('modal-open'); 
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const section = document.getElementById('secc7');
    const iframe = document.getElementById('youtube-player');
    
    if (!section || !iframe) {
        console.error("No se encontró la sección #secc7 o el iframe.");
        return;
    }

    // 1. CARGA LA API DE YOUTUBE JAVASCRIPT
    let player;
    let observer;
    let isVideoReady = false;

    // Esta función la llama la API de YouTube automáticamente.
    window.onYouTubeIframeAPIReady = function() {
        // Creamos el reproductor de YouTube
        player = new YT.Player('youtube-player', {
            events: {
                'onReady': onPlayerReady
            }
        });
    }

    function onPlayerReady(event) {
        isVideoReady = true;
        // El observador se inicializa una vez que el reproductor está listo.
        setupIntersectionObserver();
    }

    // 2. CONFIGURA EL INTERSECTION OBSERVER CON LÓGICA DE ENTRADA Y SALIDA
    function setupIntersectionObserver() {
        const options = {
            root: null, 
            rootMargin: '0px',
            threshold: 0.5 // Se dispara cuando al menos el 50% de la sección es visible
        };

        observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // Verificamos si la entrada está lista para ser controlada
                if (!isVideoReady) return; 

                if (entry.isIntersecting) {
                    // ESTADO: ENTRANDO (Más del 50% visible)
                    console.log("Sección 7 visible. Reproduciendo video.");
                    player.playVideo();
                } else {
                    // ESTADO: SALIENDO (Menos del 50% visible)
                    console.log("Saliendo de Sección 7. Pausando video.");
                    player.pauseVideo();
                }
            });
        }, options);

        // Empezamos a observar la sección. Ya no usamos .unobserve().
        observer.observe(section);
    }
    
    // 3. AGREGA EL SCRIPT DE LA API DE YOUTUBE (El mismo código que tenías)
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

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



});


 