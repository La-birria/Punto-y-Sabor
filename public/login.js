document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  // Crear contenedor para notificaciones
  const notify = document.createElement("div");
  notify.id = "notify";
  notify.className =
    "fixed top-5 right-5 bg-[color:var(--vino)] text-white px-4 py-2 rounded-lg shadow-lg opacity-0 transition-opacity duration-500 z-50";
  document.body.appendChild(notify);

  function mostrarMensaje(msg, tipo = "info") {
    notify.textContent = msg;
    notify.style.backgroundColor =
      tipo === "error"
        ? "#b91c1c"
        : tipo === "exito"
        ? "var(--dorado)"
        : "var(--vino)";
    notify.style.color = tipo === "exito" ? "black" : "white";
    notify.classList.remove("opacity-0");
    notify.classList.add("opacity-100");

    setTimeout(() => {
      notify.classList.remove("opacity-100");
      notify.classList.add("opacity-0");
    }, 2500);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();

    try {
      const response = await fetch("jsons/users.json");
      const users = await response.json();

      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        // Guardar sesión
        localStorage.setItem("usuarioActivo", JSON.stringify(user));

        mostrarMensaje(`Bienvenido, ${user.nombre}`, "exito");

        setTimeout(() => {
          // Redirección según rol
          if (user.rol && user.rol.toLowerCase() === "admin") {
            window.location.href = "paneladmin/paneladmin.html";
          } else {
            const reservaPendiente = localStorage.getItem("reservaPendiente");
            if (reservaPendiente) {
              let reservas = JSON.parse(localStorage.getItem("reservas")) || [];
              reservas.push(JSON.parse(reservaPendiente));
              localStorage.setItem("reservas", JSON.stringify(reservas));
              localStorage.removeItem("reservaPendiente");
              mostrarMensaje("Tu reserva fue registrada con éxito ✅", "exito");
              setTimeout(() => {
                window.location.href = "index.html#reservas";
              }, 1200);
            } else {
              window.location.href = "index.html#reservas";
            }
          }
        }, 1200);
      } else {
        mostrarMensaje("Correo o contraseña incorrectos", "error");
      }
    } catch (error) {
      console.error("Error cargando usuarios:", error);
      mostrarMensaje("Hubo un problema al validar el usuario.", "error");
    }
  });
});
