document.addEventListener("DOMContentLoaded", () => {
  const nombreUsuario = document.getElementById("nombreUsuario");
  const contraseñaUsuario = document.getElementById("contraseñaUsuario");

  // Cargar datos desde usuarios.json
  fetch("jsons/users.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Error al cargar jsons/users.json");
      }
      return response.json();
    })
    .then(usuarios => {
      // Supongamos que el primer usuario es el que inició sesión
      const usuarioActual = usuarios[0];

      // Mostrar datos en los campos
      nombreUsuario.value = usuarioActual.username || "Sin nombre";
      contraseñaUsuario.value = usuarioActual.password || "Sin contraseña";
    })
    .catch(error => {
      console.error("Error cargando los datos del usuario:", error);
    });
});

//este código se encarga cargar los datos del perfil de los clientes al 
// apartado de perfil.html para que el cliente pueda verlos y editarlos 
// ya sea cambiar su contraseña o su nombre de usario
