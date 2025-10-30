// Simulación de sesión (luego será con backend real)
let usuarioLogueado = false;

// Guardamos reservas confirmadas aquí (temporalmente)
let reservas = [];

document.addEventListener("DOMContentLoaded", () => {
  const formReserva = document.getElementById("formReserva");
  const btnSubmit = document.querySelector(".btn-submit");

  if (!formReserva) return;

  // Crear contenedor de notificaciones (si no existe)
  if (!document.getElementById("notificacion-container")) {
    const container = document.createElement("div");
    container.id = "notificacion-container";
    container.style.position = "fixed";
    container.style.top = "20px";
    container.style.right = "20px";
    container.style.zIndex = "9999";
    document.body.appendChild(container);
  }

  // Recuperar posible reserva activa desde localStorage
  const reservaActiva = JSON.parse(localStorage.getItem("reservaActiva"));

  if (reservaActiva) {
    // Rellenar automáticamente los campos con los datos guardados
    document.getElementById("nombre").value = reservaActiva.nombre || "";
    document.getElementById("telefono").value = reservaActiva.telefono || "";
    document.getElementById("fecha").value = reservaActiva.fecha || "";
    document.getElementById("hora").value = reservaActiva.hora || "";
    document.getElementById("personas").value = reservaActiva.personas || "";
    document.getElementById("comentarios").value = reservaActiva.comentarios || "";

    // Cambiar el botón a "Cancelar reserva"
    btnSubmit.textContent = "Cancelar reserva";
    btnSubmit.classList.add("btn-cancelar");
  }

  formReserva.addEventListener("submit", (e) => {
    e.preventDefault();

    // Si el botón está en modo "cancelar"
    if (btnSubmit.classList.contains("btn-cancelar")) {
      cancelarReserva();
      return;
    }

    // Crear objeto reserva
    const reserva = {
      id: Date.now(),
      nombre: document.getElementById("nombre").value,
      telefono: document.getElementById("telefono").value,
      fecha: document.getElementById("fecha").value,
      hora: document.getElementById("hora").value,
      personas: document.getElementById("personas").value,
      comentarios: document.getElementById("comentarios").value,
      estado: "Activa",
    };

    // Guardar la reserva en localStorage (en espera)
    localStorage.setItem("reservaActiva", JSON.stringify(reserva));

    if (!usuarioLogueado) {
      mostrarNotificacion("⚠️ Debes iniciar sesión para confirmar tu reserva.", "advertencia");
      setTimeout(() => {
        window.location.href = "login.html"; // redirigir al login
      }, 2000);
    } else {
      // Si ya está logueado, confirmar directamente
      reservas.push(reserva);
      mostrarNotificacion("✅ Reserva confirmada con éxito.", "exito");
    }

    // Cambiar el botón
    btnSubmit.textContent = "Cancelar reserva";
    btnSubmit.classList.add("btn-cancelar");
  });

  // Función para cancelar la reserva
  function cancelarReserva() {
    const reservaCancelada = JSON.parse(localStorage.getItem("reservaActiva"));
    if (reservaCancelada) {
      reservaCancelada.estado = "Cancelada";

      // Guardar en historial para panel admin
      let historial = JSON.parse(localStorage.getItem("historialReservas")) || [];
      historial.push(reservaCancelada);
      localStorage.setItem("historialReservas", JSON.stringify(historial));

      // Eliminar reserva activa
      localStorage.removeItem("reservaActiva");

      mostrarNotificacion("❌ Has cancelado tu reserva.", "cancelada");

      // Restaurar el botón
      btnSubmit.textContent = "Enviar reserva";
      btnSubmit.classList.remove("btn-cancelar");

      // Limpiar los campos
      formReserva.reset();
    }
  }

  // 🟢 Función para mostrar notificaciones visuales
  function mostrarNotificacion(mensaje, tipo = "info") {
    const container = document.getElementById("notificacion-container");
    const notificacion = document.createElement("div");

    // Estilos base
    notificacion.textContent = mensaje;
    notificacion.style.padding = "12px 20px";
    notificacion.style.marginTop = "10px";
    notificacion.style.borderRadius = "8px";
    notificacion.style.color = "#fff";
    notificacion.style.fontWeight = "600";
    notificacion.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
    notificacion.style.opacity = "0";
    notificacion.style.transition = "opacity 0.4s ease, transform 0.4s ease";
    notificacion.style.transform = "translateX(100px)";

    // Colores según tipo
    switch (tipo) {
      case "exito":
        notificacion.style.background = "#22c55e"; // verde
        break;
      case "advertencia":
        notificacion.style.background = "#eab308"; // amarillo
        break;
      case "cancelada":
        notificacion.style.background = "#ef4444"; // rojo
        break;
      default:
        notificacion.style.background = "#3b82f6"; // azul
    }

    container.appendChild(notificacion);

    // Animación de aparición
    setTimeout(() => {
      notificacion.style.opacity = "1";
      notificacion.style.transform = "translateX(0)";
    }, 100);

    // Desaparece después de 3 segundos
    setTimeout(() => {
      notificacion.style.opacity = "0";
      notificacion.style.transform = "translateX(100px)";
      setTimeout(() => notificacion.remove(), 400);
    }, 3000);
  }
});



// este código se encarga de que cuando el cliente trate de hacer una reserva sin haber iniciado seción,
//al llenar el formulario y dar clic en reservar  este lo llevara al login para que la inicien y 
// convertira el boton de enviar reserva a cancelar reserva
//tambien envia notificaciones al usuario, por ejemplo le envia la de "para hacer una reservación primero 
// debe iniciar seción", "tu reserva se a enviado" o la de "has cancelado tu reserva"
//por ultimo pero no menos importante tambien matiene los datos de la reserva es decir no se borran del 
// formulario por mucho que el usuario cambie de apartado