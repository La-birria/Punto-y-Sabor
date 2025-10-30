document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("detalle-reserva");
  const btnCancelar = document.getElementById("btnCancelar");
  const btnFinalizar = document.getElementById("btnFinalizar");

  // Cargar datos falsos desde el JSON
  fetch("jsons/datsdresrvs.json")
    .then(res => res.json())
    .then(data => mostrarDatos(data))
    .catch(err => console.error("Error cargando datos:", err));

  function mostrarDatos(reserva) {
    contenedor.innerHTML = `
      <p><strong>Nombre:</strong> ${reserva.nombre}</p>
      <p><strong>Correo:</strong> ${reserva.correo}</p>
      <p><strong>Teléfono:</strong> ${reserva.telefono}</p>
      <p><strong>Fecha:</strong> ${reserva.fecha}</p>
      <p><strong>Hora:</strong> ${reserva.hora}</p>
      <p><strong>Personas:</strong> ${reserva.personas}</p>
      <p><strong>Estado:</strong> ${reserva.estado}</p>
      <p><strong>Comentarios:</strong> ${reserva.comentarios}</p>
    `;
  }

  // Botones
  btnCancelar.addEventListener("click", () => {
    contenedor.innerHTML = `<p class="text-red-600 font-bold">La reserva ha sido cancelada.</p>`;
  });

  btnFinalizar.addEventListener("click", () => {
    contenedor.innerHTML = `<p class="text-green-600 font-bold">La reserva se ha finalizado correctamente.</p>`;
  });
});

//este código carga los datos de las resevas que se encuentran en la tabla de reservvas 
//al apartado de datos de reserva que solo se muestra al presionar una reserva en el 
// panel de reservas cosa de la que tambien se encarga este código