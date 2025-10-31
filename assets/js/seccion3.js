// --- FUNCIONES DEL CARRUSEL DE LA SECCIÓN 3 ---

function initializeSlider3D() {

    const track = document.querySelector(".carrusel-track-secc3");
    const prevBtn = document.querySelector(".prev-secc3");
    const nextBtn = document.querySelector(".next-secc3");


    if (!track || !prevBtn || !nextBtn) {

        return; 
    }

    // --- RESPONSIVIDAD ---
    function getItemsPerView() {
        if (window.innerWidth <= 600) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    let items = Array.from(track.children);
    const ORIGINAL_ITEMS_COUNT = items.length; 
    let itemsPerView = getItemsPerView(); 
    
    const CSS_GAP = 15; 
    
    let carruselIndex = ORIGINAL_ITEMS_COUNT; 
    let itemWidth = 0; 
    let isAnimating = false; 

    // --- FUNCIÓN DE CLONACIÓN ---
    function cloneItems() {
        const originalItems = Array.from(track.children).slice(0, ORIGINAL_ITEMS_COUNT);
        
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
    
    function updateWidth() {
        itemsPerView = getItemsPerView(); 
        
        if (items.length > 0) {
            
            if (itemsPerView === 1) {

                const carruselContainer = document.querySelector(".carrusel-secc3");
                if (carruselContainer) {

                } else {
                    itemWidth = track.clientWidth; 
                }
            } else {
                // Desktop/Tablet: Ancho de la tarjeta calculada por el CSS + el GAP
                const itemRect = items[ORIGINAL_ITEMS_COUNT].getBoundingClientRect();
                itemWidth = itemRect.width + CSS_GAP; 
            }
        }
    }

    // --- POSICIONAMIENTO ---
    function updatePosition(animate = true) {
        track.style.transition = animate ? "transform 0.4s ease" : "none";
        track.style.transform = `translateX(${-carruselIndex * itemWidth}px)`;
    }

    // --- MOVIENTO INFINITO ---
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

    cloneItems();
    updateWidth(); 
    updatePosition(false); 

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

    // --- TÁCTIL ---
    let startX = 0, currentX = 0, isDragging = false, isScrolling = false;
    const SWIPE_THRESHOLD = 50; 
    const SCROLL_THRESHOLD = 5; 

    track.addEventListener("touchstart", e => {
        if (e.touches.length !== 1 || isAnimating) return; 
        startX = e.touches[0].clientX;
        isDragging = true;
        isScrolling = false;
    }, { passive: false });

    track.addEventListener("touchmove", e => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        
        const diffX = startX - currentX;
        const diffY = e.touches[0].clientY - e.touches[0].clientY; 
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

    // --- RESPONSIV ---
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


