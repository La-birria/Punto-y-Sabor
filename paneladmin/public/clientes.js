fetch("jsons/clientes.json")
  .then(response => response.json())
  .then(clientes => {
    const tbody = document.getElementById("clientes-tbody");
    tbody.innerHTML = "";

    clientes.forEach(cliente => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${cliente.nombre}</td>
        <td>${cliente.fecha}</td>
      `;
      tbody.appendChild(row);
    });
  })
  .catch(error => console.error("Error al cargar los clientes:", error));

//este codigo carga los datos de los clientes pero solo los nombres y la fecha en 
// que se registró, al apartado de clientes en el panel de administración o paneladmin
