document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#form-reserva");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Capturar valores del formulario
    const nombre = document.querySelector("#nombre").value.trim();
    const fecha = document.querySelector("#fecha").value.trim();
    const hora = document.querySelector("#hora").value.trim();
    const personas = parseInt(document.querySelector("#personas").value);
    const notas = document.querySelector("#notas").value.trim();

    // Crear objeto de la nueva reserva
    const nuevaReserva = {
      id_cliente: Date.now(), // ID temporal (puedes usar el del login)
      nombre_cliente: nombre,
      fecha_reserva: fecha,
      hora_reserva: hora,
      numero_personas: personas,
      estado: "pendiente",
      notas: notas
    };

    try {
      // Enviar la reserva al JSON Server
      const response = await fetch("paneladmin/jsons/reservas.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaReserva)
      });

      if (response.ok) {
        alert("✅ Reserva guardada con éxito");
        form.reset();
      } else {
        alert("❌ Error al guardar la reserva");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("⚠️ No se pudo conectar al servidor de reservas");
    }
  });
});


// este codigo toma los datos que proporciona el cliente al llenar el 
//formulario de la reserva y lo almacena en la tabla de reservas