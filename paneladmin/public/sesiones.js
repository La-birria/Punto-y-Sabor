document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("clientes-tbody");

  // Cargar datos del archivo JSON
  fetch("jsons/sesiones.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Error al cargar los datos de clientes.json");
      }
      return response.json();
    })
    .then(clientes => {
      // Vacía el tbody antes de llenarlo
      tbody.innerHTML = "";

      // Recorre los datos y crea las filas
      clientes.forEach(cliente => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
          <td>${cliente.correo}</td>
          <td>${cliente.fecha}</td>
          <td>${cliente.estado}</td>
        `;

        tbody.appendChild(fila);
      });
    })
    .catch(error => {
      console.error("Error:", error);
      tbody.innerHTML = `<tr><td colspan="3">No se pudieron cargar los datos.</td></tr>`;
    });
});

// este código se encarga de cargar  los correos, fecha de registro y estado si activa o no activa 
// de todos los clientes desde la tabla de clientes a el apartado de sesiones en el paneladmin