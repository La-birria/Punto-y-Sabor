  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const iconOpen = document.getElementById('iconOpen');
  const iconClose = document.getElementById('iconClose');

  navToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('hidden');
    
    // Mostrar u ocultar menú
    mobileMenu.classList.toggle('hidden');
    
    // Alternar íconos
    iconOpen.classList.toggle('hidden');
    iconClose.classList.toggle('hidden');

    // Accesibilidad
    navToggle.setAttribute('aria-expanded', !isOpen);
  })
// este código se encarga de desplegar el menu hamburguesa y de que funcione