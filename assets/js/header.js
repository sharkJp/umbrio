document.addEventListener('DOMContentLoaded', () => {

 const llamaMenu = document.querySelector('.llama-menu');
 const mainMenu = document.getElementById('mainMenu');
 const fuegoImg = document.querySelector('.fuego');
 const menuContainer = document.querySelector('.menu'); 
 const closeBtn = document.querySelector('.close-btn');
 const velaMenu = document.querySelector('.vela-menu'); 

 if (!llamaMenu || !mainMenu || !menuContainer) {
 console.warn('Header: faltan elementos del DOM clave.');
 return;
 }

 if (mainMenu && window.innerWidth > 768) {
 mainMenu.classList.add('hidden');
 }

 let menuAbierto = false;

 function esMobile() {
 return window.innerWidth <= 768;
 }

function abrirMenuMovil() {
menuContainer.classList.add('menu-open-mobile');
mainMenu.classList.remove('hidden'); 
if (closeBtn) closeBtn.style.opacity = '1';
if (fuegoImg) fuegoImg.style.display = 'none'; 
document.body.style.overflow = 'hidden';
menuAbierto = true;
}

function cerrarMenuMovil() {
menuContainer.classList.remove('menu-open-mobile');
mainMenu.classList.add('hidden'); 
if (closeBtn) closeBtn.style.opacity = '0';
if (fuegoImg) fuegoImg.style.display = '';
document.body.style.overflow = 'auto';
menuAbierto = false;
}

 function toggleMenu() {
 if (esMobile()) {
if (!menuAbierto) {
abrirMenuMovil();
}else{
cerrarMenuMovil();
}
return;
 }

 if (menuContainer.classList.contains('hidden')) {

menuContainer.classList.remove('hidden');

setTimeout(() => {

mainMenu.classList.remove('hidden');

if (velaMenu) {
 velaMenu.style.opacity = '1';
 velaMenu.style.transform = 'translateY(0)';
}
}, 50); 
 } else {

mainMenu.classList.add('hidden');

if (velaMenu) {

velaMenu.style.opacity = '0';
velaMenu.style.transform = 'translateY(-20px)';
}

setTimeout(() => {

menuContainer.classList.add('hidden');
                

                if (velaMenu) {
                    velaMenu.style.opacity = ''; 
                    velaMenu.style.transform = '';
                }

}, 300); 
 }
 }

 llamaMenu.addEventListener('click', (e) => {
 e.stopPropagation();
 toggleMenu();
 });


 if (closeBtn) {
 closeBtn.addEventListener('click', (e) => {
e.stopPropagation();
if (esMobile() && menuAbierto) {
cerrarMenuMovil();
}
 });
 }

 window.addEventListener('resize', () => {
 if (!esMobile() && menuAbierto) {
cerrarMenuMovil();

mainMenu.classList.add('hidden');

if (velaMenu) {
velaMenu.style.opacity = '0';
velaMenu.style.transform = 'translateY(-20px)';
}
menuContainer.classList.add('hidden'); 

 } else if (esMobile() && !menuAbierto) {

mainMenu.classList.add('hidden');

if (velaMenu) {
velaMenu.style.opacity = '0';
velaMenu.style.transform = 'translateY(-20px)';
}
 }
 });
 

 mainMenu.querySelectorAll('li a').forEach(link => {
 link.addEventListener('click', () => {
if (esMobile() && menuAbierto) {
setTimeout(cerrarMenuMovil, 100);
}
 });
 });
});