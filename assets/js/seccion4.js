document.addEventListener('DOMContentLoaded', function() {
    // Selecciona los elementos del DOM
    const abrirModalBtn = document.getElementById('abrirModal');
    const cerrarModalBtn = document.getElementById('cerrarModal');
    const miModal = document.getElementById('miModal');
    const body = document.body; // <-- OBTENER EL ELEMENTO BODY

    // **Importante**: Verifica que los elementos se encontraron
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
    
    // Opcional: Escuchar el evento nativo 'close' (ej. si cierras con ESC)
    miModal.addEventListener('close', () => {
        body.classList.remove('modal-open'); 
    });
});


 