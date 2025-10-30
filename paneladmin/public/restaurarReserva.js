// public/restaurarReserva.js

document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("reservas-tbody");

  if (!tbody) {
    console.error("No se encontró el tbody de reservas en soporte.html");
    return;
  }

  // Delegación de eventos para botones de restaurar
  tbody.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-restaurar")) {
      const fila = e.target.closest("tr");
      const nombre = fila.querySelector("td:nth-child(1)").textContent;
      const fecha = fila.querySelector("td:nth-child(2)").textContent;

      // Obtener reservas actuales desde soporte
      const reservasGuardadas = JSON.parse(localStorage.getItem("reservasSoporte")) || [];
      const reserva = reservasGuardadas.find(
        (r) => r.nombre === nombre && r.fecha === fecha
      );

      if (!reserva) {
        alert("⚠️ No se encontró la información de esta reserva.");
        return;
      }

      // Obtener reservas actuales del panel principal
      let reservasPrincipales = JSON.parse(localStorage.getItem("reservas")) || [];

      // Verificar si ya existe
      const yaExiste = reservasPrincipales.some(
        (r) => r.nombre === nombre && r.fecha === fecha
      );

      if (yaExiste) {
        alert("⚠️ Esta reserva ya está activa en el sistema principal.");
        return;
      }

      // Restaurar reserva al panel principal
      reservasPrincipales.push(reserva);
      localStorage.setItem("reservas", JSON.stringify(reservasPrincipales));

      alert(`✅ La reserva de ${nombre} fue restaurada con éxito.`);

      // Opcional: marcar visualmente que se restauró
      fila.style.opacity = "0.5";
      e.target.disabled = true;
      e.target.textContent = "Restaurada";
    }
  });
});

//Este se encarga de restaurar las reservas desde el panel de soporte haciendo 
// que si se borran en el panel de reservas por accidentes se buelvan 
// a mostrar en dicho panel 