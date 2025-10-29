// const modal = document.getElementById("miModalSecc6");
//     const btnAbrir = document.getElementById("abrirModalSecc6");
//     const spanCerrar = document.getElementsByClassName("cerrarSecc6")[0];

//     const body = document.body;
//     btnAbrir.onclick = function () {
//       modal.style.display = "flex";
//       body.style.overflow = "hidden";
//     }

//     spanCerrar.onclick = function () {
//       modal.style.display = "none";
//       body.style.overflow = "auto";
//     }

//     window.onclick = function (event) {
//       if (event.target == modal) {
//         modal.style.display = "none";
//         body.style.overflow = "auto";
//       }
//     }

//     function updateTime() {
//       const now = new Date();
//       const options = { hour: '2-digit', minute: '2-digit', hour12: true };
//       document.getElementById('current-time').textContent =
//         now.toLocaleTimeString('es-ES', options).replace('a. m.', 'AM').replace('p. m.', 'PM');
//     }
//     updateTime();
//     setInterval(updateTime, 1000);
const modal = document.getElementById("miModalSecc6");
const btnAbrir = document.getElementById("abrirModalSecc6");
// 1. Elemento 'X' de cierre (Span)
const spanCerrar = document.getElementsByClassName("cerrarSecc6")[0]; 
const videoPlayer = document.getElementById('video-game-player');
const body = document.body;

// Función para detener y reiniciar el video
function stopVideoOnModalClose() {
    if (videoPlayer) {
        // Detiene la reproducción del video
        videoPlayer.pause();
        
        // Opcional: Reinicia el video al inicio para la próxima vez que se abra
        videoPlayer.currentTime = 0; 
    }
}

// ----------------------------------------------------
// MANEJO DE APERTURA
// ----------------------------------------------------
btnAbrir.onclick = function () {
    modal.style.display = "flex";
    body.style.overflow = "hidden";
}

// ----------------------------------------------------
// MANEJO DE CIERRE (Añadiendo la detención del video)
// ----------------------------------------------------

// 1. Cierre al hacer clic en el SPAN (la 'X')
spanCerrar.onclick = function () {
    modal.style.display = "none";
    body.style.overflow = "auto";
    stopVideoOnModalClose(); // LLAMADA A LA FUNCIÓN
}

// 2. Cierre al hacer clic fuera del modal (window.onclick)
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        body.style.overflow = "auto";
        stopVideoOnModalClose(); // LLAMADA A LA FUNCIÓN
    }
}

// ----------------------------------------------------
// CÓDIGO DE RELOJ (Sin cambios)
// ----------------------------------------------------
function updateTime() {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    document.getElementById('current-time').textContent =
        now.toLocaleTimeString('es-ES', options).replace('a. m.', 'AM').replace('p. m.', 'PM');
}
updateTime();
setInterval(updateTime, 1000);