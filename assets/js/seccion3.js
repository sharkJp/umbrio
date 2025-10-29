// --- FUNCIONES DEL CARRUSEL DE LA SECCIÓN 3 ---

/**
 * Inicializa el slider de carrusel específico de la sección 3.
 * Utiliza solo clases con el sufijo '-secc3' para evitar conflictos.
 */
function initializeSlider3D() {
    // 1. SELECTORES: Usando CLASES ESPECÍFICAS
    const track = document.querySelector(".carrusel-track-secc3");
    const prevBtn = document.querySelector(".prev-secc3");
    const nextBtn = document.querySelector(".next-secc3");

    // Verificar si los elementos existen para evitar errores si el HTML no está cargado
    if (!track || !prevBtn || !nextBtn) {
        // No se lanza error en consola, simplemente no se inicializa si el carrusel no está presente.
        return; 
    }

    // --- LÓGICA DE RESPONSIVIDAD ---
    function getItemsPerView() {
        if (window.innerWidth <= 600) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    // Inicialización de variables
    let items = Array.from(track.children);
    const ORIGINAL_ITEMS_COUNT = items.length; 
    let itemsPerView = getItemsPerView(); 
    
    // Si tu CSS usa 15px de gap en la regla general, usa 15 aquí
    const CSS_GAP = 15; 
    
    let carruselIndex = ORIGINAL_ITEMS_COUNT; 
    let itemWidth = 0; 
    let isAnimating = false; 

    // --- FUNCIÓN DE CLONACIÓN ---
    function cloneItems() {
        const originalItems = Array.from(track.children).slice(0, ORIGINAL_ITEMS_COUNT);
        
        // Limpiar para reclonar si es necesario (ej: en el resize)
        if (track.children.length !== ORIGINAL_ITEMS_COUNT) {
            track.innerHTML = originalItems.map(item => item.outerHTML).join('');
            items = Array.from(track.children);
        }

        const clonesBefore = originalItems.map(i => i.cloneNode(true));
        const clonesAfter = originalItems.map(i => i.cloneNode(true));

        track.innerHTML = "";
        clonesBefore.forEach(i => track.appendChild(i));
        originalItems.forEach(i => track.appendChild(i));
        clonesAfter.forEach(i => track.appendChild(i));
        
        items = Array.from(track.children);
    }
    
    // --- CÁLCULO DE ANCHO CRÍTICO ---
    function updateWidth() {
        itemsPerView = getItemsPerView(); 
        
        if (items.length > 0) {
            
            if (itemsPerView === 1) {
                // Vista única: El ancho de movimiento es el ancho del contenedor visible
                const carruselContainer = document.querySelector(".carrusel-secc3");
                if (carruselContainer) {
                    // Usar el ancho del contenedor visible para asegurar el desplazamiento correcto
                    itemWidth = carruselContainer.clientWidth; 
                } else {
                    itemWidth = track.clientWidth; // Fallback
                }
            } else {
                // Desktop/Tablet: Ancho de la tarjeta calculada por el CSS + el GAP
                // Usamos el item original (en el medio) para la medición
                const itemRect = items[ORIGINAL_ITEMS_COUNT].getBoundingClientRect();
                itemWidth = itemRect.width + CSS_GAP; 
            }
        }
    }

    // --- FUNCIÓN DE POSICIONAMIENTO ---
    function updatePosition(animate = true) {
        track.style.transition = animate ? "transform 0.4s ease" : "none";
        track.style.transform = `translateX(${-carruselIndex * itemWidth}px)`;
    }

    // --- LÓGICA DE MOVIENTO INFINITO ---
    function handleTransitionEnd(event) {
        if (event.target !== track) return; 

        if (carruselIndex >= ORIGINAL_ITEMS_COUNT * 2) { 
            carruselIndex = ORIGINAL_ITEMS_COUNT; 
            updatePosition(false);
        } else if (carruselIndex < ORIGINAL_ITEMS_COUNT) {
            carruselIndex = ORIGINAL_ITEMS_COUNT * 2 - 1; 
            updatePosition(false);
        }

        isAnimating = false; 
        track.removeEventListener('transitionend', handleTransitionEnd);
    }

    // --- INICIALIZACIÓN ---
    cloneItems();
    updateWidth(); 
    updatePosition(false); 

    // --- EVENT LISTENERS (Botones) ---
    nextBtn.addEventListener("click", () => {
        if (isAnimating) return; 
        isAnimating = true;
        carruselIndex++;
        updatePosition();
        track.addEventListener('transitionend', handleTransitionEnd);
    });

    prevBtn.addEventListener("click", () => {
        if (isAnimating) return; 
        isAnimating = true;
        carruselIndex--;
        updatePosition();
        track.addEventListener('transitionend', handleTransitionEnd);
    });

    // --- LÓGICA DE SWIPE TÁCTIL ---
    let startX = 0, currentX = 0, isDragging = false, isScrolling = false;
    const SWIPE_THRESHOLD = 50; 
    const SCROLL_THRESHOLD = 5; 

    // Solo necesitamos 'touchstart' y 'touchend' para el movimiento principal
    track.addEventListener("touchstart", e => {
        if (e.touches.length !== 1 || isAnimating) return; 
        startX = e.touches[0].clientX;
        isDragging = true;
        isScrolling = false;
    }, { passive: false });

    track.addEventListener("touchmove", e => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        
        // Permite el desplazamiento vertical mientras no haya arrastre significativo horizontal
        const diffX = startX - currentX;
        const diffY = e.touches[0].clientY - e.touches[0].clientY; // Esta línea estaba incompleta en el original, la reemplazamos

        if (!isScrolling) {
            if (Math.abs(diffY) > SCROLL_THRESHOLD && Math.abs(diffY) > Math.abs(diffX)) {
                isScrolling = true;
                isDragging = false; 
                return;
            }
        }
        
        if (!isScrolling) {
            e.preventDefault(); // Evitar scroll vertical si estamos haciendo swipe horizontal
        }
    }, { passive: false });


    track.addEventListener("touchend", () => {
        if (isScrolling || !isDragging) {
            isDragging = false;
            isScrolling = false;
            return;
        }

        isDragging = false;
        const diff = startX - currentX;
        
        if (Math.abs(diff) > SWIPE_THRESHOLD && !isAnimating) {
            if (diff > 0) nextBtn.click(); // Swipe hacia la izquierda (siguiente)
            else prevBtn.click(); // Swipe hacia la derecha (anterior)
        }
        
        isScrolling = false;
    });

    // --- RESPONSIVIDAD ---
    window.addEventListener("resize", () => {
        updateWidth(); 
        updatePosition(false); 
    });
}


// --- LÓGICA DE INICIALIZACIÓN GLOBAL ---

document.addEventListener('DOMContentLoaded', function() {
    // 1. EJECUCIÓN DEL CARRUSEL AISLADO
    initializeSlider3D(); 

    // 2. LÓGICA DEL MODAL (Manteniéndola separada)
    // 1. Obtener el checkbox que controla el modal
    const checkboxModal = document.getElementById('btn-modal');
    // 2. Obtener el body
    const body = document.body;

    // Escuchar el evento 'change' del checkbox, solo si existe
    if (checkboxModal) {
        checkboxModal.addEventListener('change', function() {
            if (this.checked) {
                // Si el checkbox está marcado (el modal está abierto)
                body.classList.add('body-no-scroll');
            } else {
                // Si el checkbox no está marcado (el modal está cerrado)
                body.classList.remove('body-no-scroll');
            }
        });
    }
});