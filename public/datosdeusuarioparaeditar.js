document.addEventListener("DOMContentLoaded", () => {
  const botonesEditar = document.querySelectorAll(".btn-editar");
  const btnGuardar = document.getElementById("guardarCambios");

  botonesEditar.forEach(btn => {
    btn.addEventListener("click", () => {
      const campo = btn.dataset.campo;
      const span = document.getElementById(campo);
      const valorActual = span.textContent === "********" ? "" : span.textContent;

      // Convertir el span en input editable
      const input = document.createElement("input");
      input.type = campo === "claveUsuario" ? "password" : "text";
      input.value = valorActual;
      input.classList.add("bg-transparent", "border-b", "border-[color:var(--dorado)]", "text-[color:var(--beige)]", "outline-none");
      span.replaceWith(input);
      btn.disabled = true; // Evita múltiples ediciones
    });
  });

  btnGuardar.addEventListener("click", () => {
    const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));

    const nuevosDatos = {
      nombre: document.querySelector("input#nombreUsuario")?.value || usuarioActual.nombre,
      correo: document.querySelector("input#correoUsuario")?.value || usuarioActual.correo,
      clave: document.querySelector("input#claveUsuario")?.value || usuarioActual.clave,
    };

    localStorage.setItem("usuarioActual", JSON.stringify(nuevosDatos));
    alert("✅ Cambios guardados correctamente. Se aplicarán al volver a iniciar sesión.");
    location.reload();
  });
});

// este código permite que los clientes puedan editar sos datos de perfil
// desede el apartado de perfil.html, datos que se encuentran en la tabla de de clientes
// en donde se almacenan los datos que el cliente proporciona al registrarse