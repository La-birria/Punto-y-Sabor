// ✅ Script combinado: reservas + historial canceladas
document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("reservas-tbody");

  // 1️⃣ Cargar las reservas base desde el JSON
  fetch("jsons/reservas.json")
    .then(response => response.json())
    .then(reservas => {
      // 2️⃣ Agregar también las reservas del historial (canceladas)
      const historial = JSON.parse(localStorage.getItem("historialReservas")) || [];
      const todasLasReservas = [...reservas, ...historial]; // combinar ambas

      // 3️⃣ Ordenar por fecha descendente (últimas primero)
      todasLasReservas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

      tbody.innerHTML = "";

      // 4️⃣ Mostrar todas las reservas (activas + canceladas)
      todasLasReservas.forEach(reserva => {
        const tr = document.createElement("tr");

        // Si está cancelada, aplicamos color rojo y deshabilitamos botones
        const esCancelada = reserva.estado === "Cancelada";

        tr.innerHTML = `
          <td class="nombre ${esCancelada ? 'text-red-500' : ''}">${reserva.nombre}</td>
          <td class="${esCancelada ? 'text-red-500' : ''}">${reserva.fecha}</td>
          <td>
            ${
              esCancelada
                ? `<span class="text-red-500 font-bold">Cancelada</span>`
                : `
                  <button class="btn btn-cancelar">Cancelar</button>
                  <button class="btn btn-finalizada">Finalizada</button>
                `
            }
          </td>
        `;

        // Si la reserva no está cancelada, permitimos acciones
        if (!esCancelada) {
          // Ir a detalle al hacer clic en la fila
          tr.addEventListener("click", (e) => {
            if (!e.target.classList.contains("btn")) {
              window.location.href = `datsdresrvs.html?id=${reserva.id}`;
            }
          });

          // Botón cancelar
          tr.querySelector(".btn-cancelar").addEventListener("click", (e) => {
            e.stopPropagation();
            cancelarReserva(reserva, tr);
          });

          // Botón finalizada
          tr.querySelector(".btn-finalizada").addEventListener("click", (e) => {
            e.stopPropagation();
            tr.remove();
            console.log(`✅ Reserva ${reserva.id} marcada como finalizada (solo visualmente)`);
          });
        }

        tbody.appendChild(tr);
      });
    })
    .catch(error => console.error("Error al cargar reservas:", error));

  // 🔻 Función que cancela la reserva y la guarda en historial
  function cancelarReserva(reserva, fila) {
    reserva.estado = "Cancelada";

    // Guardar en historial del localStorage
    let historial = JSON.parse(localStorage.getItem("historialReservas")) || [];
    historial.push(reserva);
    localStorage.setItem("historialReservas", JSON.stringify(historial));

    // Visualmente mostrarla como cancelada
    fila.innerHTML = `
      <td class="text-red-500">${reserva.nombre}</td>
      <td class="text-red-500">${reserva.fecha}</td>
      <td><span class="text-red-500 font-bold">Cancelada</span></td>
    `;

    console.log(`❌ Reserva ${reserva.id} cancelada y registrada en historial`);
  }
});
//este código se encarga de cargar solo el nombre del cliente, fecha  de la 
// reserva junto a un boton de cancelar y uno de finalizarla que cualquiera  la borra,
// y tambien hace que al presionar esa reserva te lleve al apartado de 
// los  datos de resrvas  datsdresrvs.html