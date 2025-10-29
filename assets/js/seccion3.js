/**
 * carrusel 3D con efecto infinito (Tri-clonación) y responsividad integrada.
 * Se coordina con la configuración CSS de 3/2/1 ítems.
 */
function initializeSlider3D() {
    const track = document.querySelector(".carrusel-track-secc3");
    const prevBtn = document.querySelector(".prev-secc3");
    const nextBtn = document.querySelector(".next-secc3");

    if (!track || !prevBtn || !nextBtn) {
        console.error("No se encontraron los elementos necesarios para el slider (track, prevBtn, o nextBtn).");
        return;
    }

    // --- LÓGICA DE RESPONSIVIDAD (Importada del código padre) ---
    function getItemsPerView() {
        if (window.innerWidth <= 600) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    // Inicialización de variables
    let items = Array.from(track.children);
    const ORIGINAL_ITEMS_COUNT = items.length; 
    let itemsPerView = getItemsPerView(); // Obtener la vista inicial
    
    // Si tu CSS usa 15px de gap en la regla general, usa 15 aquí
    const CSS_GAP = 15; 
    
    let carruselIndex = ORIGINAL_ITEMS_COUNT; 
    let itemWidth = 0; 
    let isAnimating = false; 
    const TRACK_PADDING_HORIZONTAL = 50; // 20px + 30px del padding del .carrusel-track-secc3

    // --- FUNCIÓN DE CLONACIÓN ---
    function cloneItems() {
        // ... (Tu lógica de tri-clonación existente: A + B + C) ...
        const originalItems = Array.from(track.children).slice(0, ORIGINAL_ITEMS_COUNT);
        
        // Limpiar para reclonar en el resize si es necesario
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
        
        items = Array.from(track.children); // Total: 18 ítems
    }
    
    // --- CÁLCULO DE ANCHO CRÍTICO ---
    function updateWidth() {
        itemsPerView = getItemsPerView(); // Recalcular en cada redimensionamiento
        
        if (items.length > 0) {
            
            if (itemsPerView === 1) {
                // 🛠️ FUERZA VISTA ÚNICA (Ignoramos el ancho de la tarjeta, usamos el ancho del track)
                const trackRect = track.getBoundingClientRect();
                
                // El ancho del movimiento debe ser el 100% del área del carrusel.
                // Usamos el ancho del contenedor visible para asegurar el desplazamiento correcto.
                // Restamos el padding horizontal del track (20px + 30px = 50px de tu CSS)
                itemWidth = trackRect.width; 

                /* NOTA: Si el carrusel-track-secc3 tiene padding: 20px 30px;
                 * y quieres que el desplazamiento sea exacto sobre la tarjeta centrada, 
                 * la mejor solución es aplicar el CSS que te di en el código anterior.
                 * Aquí, nos moveremos un ancho de 100% que contiene una tarjeta centrada.
                 */
                
            } else {
                // Desktop/Tablet: Se usa el ancho de la tarjeta calculada por el CSS + el GAP
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

    // --- INICIALIZACIÓN DE LA PÁGINA ---
    cloneItems();
    updateWidth(); 
    updatePosition(false); 

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

    // --- LÓGICA DE SWIPE TÁCTIL (Mantenida de tu código hijo) ---
    let startX = 0, startY = 0, currentX = 0, isDragging = false, isScrolling = false;
    const SWIPE_THRESHOLD = 50; 
    const SCROLL_THRESHOLD = 5; 

    track.addEventListener("touchstart", e => {
        if (e.touches.length !== 1 || isAnimating) return; 
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY; 
        isDragging = true;
        isScrolling = false;
    }, { passive: false });

    track.addEventListener("touchmove", e => {
        if (!isDragging) return;

        currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        
        const diffX = startX - currentX;
        const diffY = startY - currentY;

        if (!isScrolling) {
            if (Math.abs(diffY) > SCROLL_THRESHOLD && Math.abs(diffY) > Math.abs(diffX)) {
                isScrolling = true;
                isDragging = false; 
                return;
            }
        }
        
        if (!isScrolling) {
            e.preventDefault(); 
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
            if (diff > 0) nextBtn.click(); 
            else prevBtn.click(); 
        }
        
        isScrolling = false;
    });

    // Redimensionar (Responsivo)
    window.addEventListener("resize", () => {
        updateWidth(); 
        updatePosition(false); 
    });
}
document.addEventListener('DOMContentLoaded', function() {
    // 1. Obtener el checkbox que controla el modal
    const checkboxModal = document.getElementById('btn-modal');
    // 2. Obtener el body
    const body = document.body;

    // Escuchar el evento 'change' del checkbox
    checkboxModal.addEventListener('change', function() {
        if (this.checked) {
            // Si el checkbox está marcado (el modal está abierto)
            body.classList.add('body-no-scroll');
        } else {
            // Si el checkbox no está marcado (el modal está cerrado)
            body.classList.remove('body-no-scroll');
        }
    });
});