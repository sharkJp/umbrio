// --- FUNCIONES DEL CARRUSEL DE LA SECCIÓN 3 ---

function initializeSlider3D() {

    const track = document.querySelector(".carrusel-track-secc3");
    const prevBtn = document.querySelector(".prev-secc3");
    const nextBtn = document.querySelector(".next-secc3");


    if (!track || !prevBtn || !nextBtn) {
        // Asegúrate de que los elementos existen.
        console.error("No se encontraron todos los elementos del carrusel.");
        return; 
    }

    // --- RESPONSIVIDAD ---
    function getItemsPerView() {
        if (window.innerWidth <= 600) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    let items = Array.from(track.children);
    // Nota: ORIGINAL_ITEMS_COUNT se refiere a los elementos ANTES de clonar.
    const ORIGINAL_ITEMS_COUNT = items.length; 
    let itemsPerView = getItemsPerView(); 
    
    // Este valor de GAP debe coincidir con el valor de 'gap' o 'margin' en tu CSS.
    // Asumo que el GAP solo se aplica entre elementos, no en el extremo.
    const CSS_GAP = 15; 
    
    // El índice inicial debe apuntar al primer grupo de elementos originales, 
    // que comienza después de los clones iniciales.
    let carruselIndex = ORIGINAL_ITEMS_COUNT; 
    let itemWidth = 0; 
    let isAnimating = false; 

    // --- FUNCIÓN DE CLONACIÓN ---
    function cloneItems() {
        // Solo trabajamos con los hijos originales para evitar clonar clones ya existentes
        const originalItems = Array.from(track.children).filter(item => !item.classList.contains('cloned'));
        
        // Limpiar el track si ya hay elementos
        track.innerHTML = '';

        const clonesBefore = originalItems.map(i => {
            const clone = i.cloneNode(true);
            clone.classList.add('cloned', 'cloned-before');
            return clone;
        });
        const clonesAfter = originalItems.map(i => {
            const clone = i.cloneNode(true);
            clone.classList.add('cloned', 'cloned-after');
            return clone;
        });

        clonesBefore.forEach(i => track.appendChild(i));
        originalItems.forEach(i => track.appendChild(i)); // Los originales
        clonesAfter.forEach(i => track.appendChild(i));
        
        items = Array.from(track.children);
    }
    
    // --- CÁLCULO DE ANCHO ---
    function updateWidth() {
        itemsPerView = getItemsPerView(); 
        
        if (items.length > 0) {
            // Utilizamos el primer elemento original (índice ORIGINAL_ITEMS_COUNT) para obtener su ancho.
            const firstOriginalItem = items[ORIGINAL_ITEMS_COUNT];
            
            if (!firstOriginalItem) return;

            const itemRect = firstOriginalItem.getBoundingClientRect();
            const singleItemWidth = itemRect.width; 

            // Para el carrusel infinito, el "paso" debe ser el ancho de un *solo* item, 
            // ya que el movimiento del `transform` se realiza por item. 
            // El `itemsPerView` solo afecta la visibilidad en CSS (no visible aquí),
            // pero el movimiento del carrusel es individual para permitir la transición fluida.

            // Si el modo de vista es > 1, asumimos que el ancho del item es el correcto según CSS.
            // Si el modo de vista es 1, necesitamos asegurarnos de que el item ocupe el 100% del track.
            if (itemsPerView === 1) {
                // En modo móvil (itemsPerView=1), el movimiento debe ser el ancho del contenedor.
                // Si el item ocupa el 100%, el ancho es el ancho del item.
                itemWidth = singleItemWidth; 
            } else {
                // En desktop/tablet, el ancho del item ya debe incluir el espacio (gap)
                // si el contenedor tiene un `gap` de CSS. Si el `gap` se aplica como margen 
                // o si la suma del `gap` no está incluida en el `width` de la tarjeta, 
                // debemos sumarlo para un movimiento correcto.
                // Asumo que tu CSS está configurado para que el ancho del item NO incluya el GAP:
                itemWidth = singleItemWidth + CSS_GAP; 
            }
        }
    }

    // --- POSICIONAMIENTO ---
    function updatePosition(animate = true) {
        // El movimiento es `carruselIndex` * `itemWidth`.
        track.style.transition = animate ? "transform 0.4s ease" : "none";
        track.style.transform = `translateX(${-carruselIndex * itemWidth}px)`;
    }

    // --- MOVIENTO INFINITO ---
    function handleTransitionEnd(event) {
        if (event.target !== track) return; 

        // Si se mueve al final de la primera serie de clones (índices >= ORIGINAL_ITEMS_COUNT * 2), 
        // saltamos instantáneamente al primer elemento original.
        if (carruselIndex >= ORIGINAL_ITEMS_COUNT * 2) { 
            carruselIndex = ORIGINAL_ITEMS_COUNT; // Vuelve al inicio de los originales
            updatePosition(false);
        } 
        // Si se mueve antes del primer elemento original (índice < ORIGINAL_ITEMS_COUNT), 
        // saltamos instantáneamente al último elemento original.
        else if (carruselIndex < ORIGINAL_ITEMS_COUNT) {
            carruselIndex = ORIGINAL_ITEMS_COUNT * 2 - 1; // Vuelve al último de los originales
            updatePosition(false);
        }

        isAnimating = false; 
        track.removeEventListener('transitionend', handleTransitionEnd);
    }

    // --- INICIALIZACIÓN ---
    cloneItems();
    updateWidth(); 

    carruselIndex = ORIGINAL_ITEMS_COUNT; 
    updatePosition(false); 

    // --- EVENTOS DE NAVEGACIÓN ---
    nextBtn.addEventListener("click", () => {
        if (isAnimating) return; 
        isAnimating = true;
        
        carruselIndex++; // Avanza 1 item a la vez
        
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

    // --- TÁCTIL ---
    let startX = 0, currentX = 0, isDragging = false, isScrolling = false;
    const SWIPE_THRESHOLD = 50; 
    const SCROLL_THRESHOLD = 5; 


    track.addEventListener("touchstart", e => {
        if (e.touches.length !== 1 || isAnimating) return; 
        startX = e.touches[0].clientX;
        isDragging = true;
        isScrolling = false;

    }, { passive: true }); 

    track.addEventListener("touchmove", e => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        
        const diffX = startX - currentX;
        const diffY = Math.abs(e.touches[0].clientY - e.touches[0].clientY); 
        
        if (!isScrolling) {
            if (Math.abs(diffY) > SCROLL_THRESHOLD && Math.abs(diffY) > Math.abs(diffX)) {
                isScrolling = true;
                isDragging = false; 
                return;
            }
        }
        
        if (!isScrolling && Math.abs(diffX) > 10) { 
        }

        // MOVER LA PISTA DURANTE EL ARRASTRE
        if (isDragging && !isScrolling) {
            const currentTranslate = -carruselIndex * itemWidth;
            const newTranslate = currentTranslate - diffX;
            track.style.transition = "none";
            track.style.transform = `translateX(${newTranslate}px)`;
        }
    }, { passive: false });


    track.addEventListener("touchend", () => {
        if (isScrolling || !isDragging || isAnimating) {
            isDragging = false;
            isScrolling = false;
            return;
        }

        isDragging = false;
        const diff = startX - currentX;
        
        // Si la distancia es suficiente para un swipe
        if (Math.abs(diff) > SWIPE_THRESHOLD && !isAnimating) {
            if (diff > 0) nextBtn.click(); 
            else prevBtn.click(); 
        } else {
            updatePosition();
        }
        
        isScrolling = false;
    });

    // --- RESPONSIVIDAD ---
    window.addEventListener("resize", () => {
        updateWidth(); 
        updatePosition(false); 
    });
}


document.addEventListener('DOMContentLoaded', function() {
    initializeSlider3D(); 

    const checkboxModal = document.getElementById('btn-modal');
    const body = document.body;

    if (checkboxModal) {
        checkboxModal.addEventListener('change', function() {
            if (this.checked) {
                body.classList.add('body-no-scroll');
            } else {
                body.classList.remove('body-no-scroll');
            }
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {
    // === 1. ELEMENTOS DEL SEGUNDO MODAL ===
    const modalDetalles = document.getElementById('modalDetalles');
    const cerrarDetallesBtn = document.getElementById('cerrarDetalles');
    const detalleTitulo = document.getElementById('detalleTitulo');
    const detalleImagen = document.getElementById('detalleImagen');
    const detalleDescripcion = document.getElementById('detalleDescripcion');

    // === 2. BOTONES DEL PRIMER MODAL ===
    const botonesVerMas = document.querySelectorAll('.btn-ver-mas');
    
    // Función para ABRIR el modal de detalles y cargar contenido
    const abrirModalDetalles = (e) => {
        e.preventDefault(); 
        
        const btn = e.currentTarget; 
        const titulo = btn.getAttribute('data-titulo');
        const imagen = btn.getAttribute('data-imagen');
        const descripcion = btn.getAttribute('data-descripcion');
        
        detalleTitulo.textContent = titulo;
        detalleImagen.src = imagen;
        detalleImagen.alt = `Imagen de ${titulo}`;
        detalleDescripcion.textContent = descripcion;

        modalDetalles.classList.add('activo');

        document.body.style.overflow = 'hidden'; 
        
    };

    // Función para CERRAR el modal de detalles
    const cerrarModalDetalles = () => {
        modalDetalles.classList.remove('activo');
        document.body.style.overflow = ''; // Habilita el scroll del body
    };

    // === 3. ASIGNACIÓN DE EVENTOS ===

    // Asignar el evento click a todos los botones "Ver más"
    botonesVerMas.forEach(btn => {
        btn.addEventListener('click', abrirModalDetalles);
    });

    cerrarDetallesBtn.addEventListener('click', cerrarModalDetalles);

    modalDetalles.addEventListener('click', (e) => {
        if (e.target.id === 'modalDetalles') {
            cerrarModalDetalles();
        }
    });

    // Cerrar el modal al presionar la tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalDetalles.classList.contains('activo')) {
            cerrarModalDetalles();
        }
    });
});