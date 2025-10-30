document.addEventListener("DOMContentLoaded", function() {
  const navToggle = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const iconOpen = document.getElementById("iconOpen");
  const iconClose = document.getElementById("iconClose");

  if (!navToggle || !mobileMenu) {
    console.error("No se encontraron los elementos del menú móvil");
    return;
  }

  navToggle.addEventListener("click", () => {
    const isHidden = mobileMenu.classList.contains("hidden");

    if (isHidden) {
      mobileMenu.classList.remove("hidden");
      iconOpen.classList.add("hidden");
      iconClose.classList.remove("hidden");
    } else {
      mobileMenu.classList.add("hidden");
      iconOpen.classList.remove("hidden");
      iconClose.classList.add("hidden");
    }
  });
});
//este código se encarga de des´plegar el menu hamburguesa y de que funcione