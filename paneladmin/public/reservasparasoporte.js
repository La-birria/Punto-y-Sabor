// Cargar datos desde reservas.json
fetch("jsons/reservas.json")
  .then(response => response.json())
  .then(reservas => {
    const tbody = document.getElementById("reservas-tbody");
    tbody.innerHTML = "";

    reservas.forEach(reserva => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td class="nombre">${reserva.nombre}</td>
        <td>${reserva.fecha}</td>
        <td>
          <button class="btn btn-restaurar">Restaurar</button>
        </td>
      `;

      tr.querySelector(".btn-restaurar").addEventListener("click", (e) => {
        e.stopPropagation();
        console.log(`Reserva ${reserva.id} restaurada (solo visualmente)`);
        // Aquí llamarás la función de restauración real más adelante
      });

      tbody.appendChild(tr);
    });
  })
  .catch(error => console.error("Error al cargar reservas:", error));

  //este codigo hace lo mismo que el de reservas solo que para el panel de soporte.html
  //osea cargar nombre y fecha nada mas de las reservas