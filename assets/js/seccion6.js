
document.addEventListener('DOMContentLoaded', function() {
    const section = document.getElementById('secc6');
    const iframe = document.getElementById('youtube-player');
    
    if (!section || !iframe) {
        console.error("No se encontró la sección #secc6 o el iframe.");
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
});
