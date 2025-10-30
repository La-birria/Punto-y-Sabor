    const menuBtn = document.getElementById("menuBtn");
    const sidebar = document.getElementById("sidebar");

    menuBtn?.addEventListener("click", () => {
      sidebar.classList.toggle("hidden");
    });

//este codigo se encaarga de que el boton de menu de hamburguesa se despliegue, pero el del paneladmin

  document.getElementById("cerrar-sesion").addEventListener("click", (e) => {
    e.preventDefault(); // evita que el botón recargue o haga algo raro
    localStorage.removeItem("usuarioActivo"); // elimina la sesión activa
    alert("Has cerrado sesión correctamente 👋");
    window.location.href = "layaut.html"; // redirige al layout principal
  });