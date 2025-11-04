// Variable y función declaradas globalmente 
document.addEventListener('DOMContentLoaded', () => {
    const bloques = document.querySelectorAll('.bloque-interprete');
    // Ocultar todos los bloques al inicio
    bloques.forEach(b => b.style.display = 'none');
    const mostrarBloques = () => {
        bloques.forEach(b => b.style.display = 'block');
    };
    // Mostrar bloques 
    document.addEventListener('modalBienvenidaCerrado', mostrarBloques);
    // Si el modal ya se 
    if (window.modalBienvenidaYaCerrado) {
        mostrarBloques();
    }
    // Si no existe el modal, mostrar los bloques directamente
    if (!document.getElementById('modalFullscreen')) {
        mostrarBloques();
    }
    // Eventos de mostrar/ocultar intérprete en cada bloque
    bloques.forEach(bloque => {

        const interprete = bloque.querySelector('.interprete');
        const btnCerrar = bloque.querySelector('.cerrar-boton');
        const btnMostrar = bloque.querySelector('.mostrar-boton');
        const esMovil = window.matchMedia('(max-width: 768px)').matches;

        if (esMovil) {
            // En móviles: el video empieza oculto
            interprete.style.display = 'none';
            btnMostrar.style.display = 'flex';
        } else {
            // En PC: el video visible, botón oculto
            interprete.style.display = 'flex';
            btnMostrar.style.display = 'none';
        }

        btnCerrar.addEventListener('click', () => {
            interprete.style.display = 'none';
            btnMostrar.style.display = 'flex';
        });

        btnMostrar.addEventListener('click', () => {
            interprete.style.display = 'flex';
            btnMostrar.style.display = 'none';
        });
    });
});

// --- Lógica de la Calavera ---

const btnCalavera = document.getElementById("btnCalavera");
const footer = document.querySelector("footer");

// Determinar las rutas de la imagen según la página
let basePath;
if (window.location.pathname.includes("page2.html")) {
    basePath = "../multimedia/img/";
} else {
    basePath = "assets/multimedia/img/";
}

const normalSrc = basePath + "cráneo1.png";
const fuegoSrc = basePath + "cráneo2.png";

// Crear imagen dinámicamente
const calavera = document.createElement("img");
calavera.id = "imgCalavera";
calavera.src = normalSrc;

// Asegúrate de que el botón existe antes de añadir la imagen
if (btnCalavera) {
    btnCalavera.appendChild(calavera);
}

// 1. Identificar la sección que debe ser ignorada (S1 para página 1, S4 para página 2)
let seccionIgnore;
if (document.querySelector(".seccion1")) {
    // Estamos en la página principal: ignoramos la S1
    seccionIgnore = document.querySelector(".seccion1"); 
} else if (document.querySelector(".seccion4")) {
    // Estamos en la página 2: ignoramos la S4
    seccionIgnore = document.querySelector(".seccion4"); 
}

// 2. Eventos de la Calavera (Click y Hover - NO MODIFICADO)
if (btnCalavera) {
    // Al hacer click
    btnCalavera.addEventListener("click", () => {
        calavera.classList.add("shake-horizontal");
        calavera.src = fuegoSrc;

        setTimeout(() => {
            calavera.classList.remove("shake-horizontal");
        }, 800);

        // Subir al inicio
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

    // Hover: cambiar a fuego + vibrar
    calavera.addEventListener("mouseenter", () => {
        calavera.src = fuegoSrc;
        calavera.classList.add("shake-horizontal");
    });

    calavera.addEventListener("mouseleave", () => {
        calavera.src = normalSrc;
        calavera.classList.remove("shake-horizontal");
    });
}

// 3. Lógica de Scroll MODIFICADA para aparición temprana (SOLUCIÓN AL PROBLEMA DE POSICIÓN)
window.addEventListener("scroll", () => {
    // Si la calavera, el footer o la sección de ignorar no se encuentran, salimos.
    if (!btnCalavera || !footer || !seccionIgnore) return; 

    const scrollY = window.scrollY;
    
    // Altura de la ventana de visualización
    const windowHeight = window.innerHeight;
    
    // Cálculo de retraso: 40% de la altura de la ventana
    const delayOffset = windowHeight * 0.40; 
    
    const limiteInferiorSalida = (seccionIgnore.offsetTop + seccionIgnore.offsetHeight - windowHeight) + delayOffset;
    
    // Obtiene la posición Y donde TERMINA el footer.
    const footerBottom = footer.offsetTop + footer.offsetHeight;

    // Condición de APARICIÓN: scrollY ha pasado el nuevo punto de activación retrasado.
    if (scrollY >= limiteInferiorSalida && scrollY < footerBottom) {
        btnCalavera.style.display = "block";
    } else {
        btnCalavera.style.display = "none";
        calavera.src = normalSrc; // Restablecer la imagen al ocultarse
    }
});

// --- Lógica del Cursor Personalizado (NO MODIFICADO) ---

const cursor = document.getElementById("cursor-img");

if (cursor) {
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
}