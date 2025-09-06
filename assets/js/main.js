// Variable y función declaradas globalmente
const imagenFlotante = document.getElementById('imagen-flotante');

function cerrarImagen() {
    if (imagenFlotante) {
        imagenFlotante.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Código del Modal de Video (modalFullscreen)
    const modalElement = document.getElementById('modalFullscreen');
    if (modalElement) {
        const miModal = new bootstrap.Modal(modalElement);
        miModal.show();
        let tiempoRestante = 6;
        const intervalo = setInterval(() => {
            tiempoRestante--;
            console.log(`Cerrando en ${tiempoRestante} segundos...`);
            if (tiempoRestante <= 0) {
                miModal.hide();
                clearInterval(intervalo);
            }
        }, 1000);
    }

    // Código del Menú 
    const velaImage = document.querySelector('.vela');
    const menuList = document.querySelector('.menu');
    velaImage.addEventListener('click', function () {
        menuList.classList.toggle('hidden');
    });
    document.addEventListener('click', function (event) {
        if (!velaImage.contains(event.target) && !menuList.contains(event.target)) {
            if (!menuList.classList.contains('hidden')) {
                menuList.classList.add('hidden');
            }
        }
    });

    // Código del Botón flotante Calavera 
    const btnCalavera = document.getElementById("btnCalavera");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            btnCalavera.style.display = "block";
        } else {
            btnCalavera.style.display = "none";
        }
    });
    btnCalavera.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Código del Slider de la Sección 2
    const slides = document.querySelectorAll(".slide");
    const prevBtnSlider = document.querySelector(".contenedor-slider .prev");
    const nextBtnSlider = document.querySelector(".contenedor-slider .next");
    const textBox = document.getElementById("textBox").querySelector("p");
    
    const textos = [
        `<h1>Catedral</h1> <p>La Catedral Basílica Metropolitana Santiago de Tunja, ubicada en la Plaza de Bolívar, es una de las catedrales más antiguas de Latinoamérica y una de las más antiguas de Colombia, construida a finales del siglo XVI. Su construcción se inició en 1562 y se completó en 1607</p>`,
        `<h1>Simón Bolívar</h1> <p>La plaza, que es la segunda más grande de Colombia después de la de Villa de Leyva, está rodeada por importantes edificios coloniales, incluyendo la Catedral Basílica Metropolitana Santiago de Tunja, la Casa del Fundador Gonzalo Suárez Rendón, la Alcaldía Municipal y la Gobernación</p>`,
        `<h1>El Pozo de Donato</h1> <p>El Pozo de Donato, también conocido como Pozo de Hunzahúa, es un lugar de gran importancia histórica y cultural en la ciudad de Tunja, Colombia. Según la leyenda, este pozo se formó cuando la madre de Hunzahúa, el primer Zaque de Tunja, y su hermana Noncetá, rompió una vasija llena de chicha, derramando el líquido y creando así el pozo.</p>`,
        `<h1>San Agustín</h1> <p>Este edificio de gran envergadura, con arquitectura renacentista, barroca y mudéjar, ha cumplido múltiples funciones a lo largo de la historia: fue convento e iglesia, colegio, universidad, hospital y, desde 1862 hasta 1966, la prisión conocida como Panóptico de Tunja. Actualmente, el claustro alberga el Centro Cultural del Banco de la República, la Biblioteca Alfonso Patiño Rosselli, el Archivo Regional de Boyacá y la sede de San Agustín del Colegio de Boyacá.</p>`
    ];

    let currentIndex = 0;

    // Función para mostrar slide y texto
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = (i === index) ? "block" : "none";
        });
        textBox.innerHTML = textos[index]; 
    }

    // Botones
        prevBtnSlider.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    });

    nextBtnSlider.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    });

    // Mostrar el primero al cargar
    showSlide(currentIndex);

    // Código del Carrusel de la Sección 3 
    const track = document.querySelector(".carrusel-track");
    const prevBtnCarrusel = document.querySelector(".contenedor-carrusel .prev");
    const nextBtnCarrusel = document.querySelector(".contenedor-carrusel .next");
    let items = Array.from(track.children);
    let itemsPerView = getItemsPerView();
    let itemWidth = items[0].getBoundingClientRect().width + 15;
    items.slice(-itemsPerView).forEach(item => track.insertBefore(item.cloneNode(true), track.firstChild));
    items.slice(0, itemsPerView).forEach(item => track.appendChild(item.cloneNode(true)));
    items = Array.from(track.children);
    let index = itemsPerView;
    updatePosition(false);
    function getItemsPerView() {
        if (window.innerWidth <= 600) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }
    function updateWidth() {
        itemsPerView = getItemsPerView();
        itemWidth = items[0].getBoundingClientRect().width + 15;
    }
    function updatePosition(animate = true) {
        track.style.transition = animate ? "transform 0.4s ease" : "none";
        track.style.transform = `translateX(${-index * itemWidth}px)`;
    }
    nextBtnCarrusel.addEventListener("click", () => {
        index++;
        updatePosition();
        if (index >= items.length - itemsPerView) {
            setTimeout(() => {
                index = itemsPerView;
                updatePosition(false);
            }, 400);
        }
    });
    prevBtnCarrusel.addEventListener("click", () => {
        index--;
        updatePosition();
        if (index < itemsPerView) {
            setTimeout(() => {
                index = items.length - itemsPerView * 2;
                updatePosition(false);
            }, 400);
        }
    });
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    track.addEventListener("touchstart", e => { startX = e.touches[0].clientX; isDragging = true; });
    track.addEventListener("touchmove", e => { if (!isDragging) return; currentX = e.touches[0].clientX; });
    track.addEventListener("touchend", () => {
        isDragging = false;
        let diff = startX - currentX;
        if (diff > 50) nextBtnCarrusel.click();
        else if (diff < -50) prevBtnCarrusel.click();
    });
    window.addEventListener("resize", () => { updateWidth(); updatePosition(false); });
    document.querySelectorAll("article").forEach(article => {
        article.addEventListener("click", function () {
            document.querySelectorAll("article").forEach(a => a.classList.remove("active"));
            this.classList.add("active");
            setTimeout(() => this.classList.remove("active"), 2000);
        });
    });
    updateWidth();
    
    // Código del Modal de la Brújula
    const btnBrujula = document.getElementById("btnBrujula");
    const modalBrujula = document.getElementById("modalBrujula");
    const spanClose = document.querySelector("#modalBrujula .btn-Close");

    btnBrujula.addEventListener("click", function () {
        modalBrujula.style.display = "block";
    });

    spanClose.addEventListener("click", function () {
        modalBrujula.style.display = "none";
    });

    window.addEventListener("click", function (e) {
        if (e.target === modalBrujula) {
            modalBrujula.style.display = "none";
        }
    });
});

// Código del Cursor (debe estar fuera de DOMContentLoaded)
const cursor = document.getElementById("cursor-img");
if (cursor) {
    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    });
    document.addEventListener("touchmove", (e) => {
        const touch = e.touches[0];
        cursor.style.left = touch.clientX + "px";
        cursor.style.top = touch.clientY + "px";
    });
}