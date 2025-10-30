// === CARGA DE DATOS DEL DASHBOARD ===

// Esperar a que cargue todo el DOM
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Cargar usuarios
    const usersResponse = await fetch("../jsons/users.json");
    const users = await usersResponse.json();
    const usuariosNuevos = users.length; // cantidad de usuarios
    document.querySelector("#usuarios-nuevos").textContent = usuariosNuevos;

    // Cargar sesiones
    const sesionesResponse = await fetch("../jsons/sesiones.json");
    const sesiones = await sesionesResponse.json();
    const sesionesActivas = sesiones.filter(s => s.estado === "activa").length;
    document.querySelector("#sesiones-activas").textContent = sesionesActivas;

    // Cargar reservas
    const reservasResponse = await fetch("../jsons/reservas.json");
    const reservas = await reservasResponse.json();
    const reservasHoy = reservas.filter(r => {
      const hoy = new Date().toISOString().split("T")[0];
      return r.fecha === hoy;
    }).length;
    document.querySelector("#reservas-hoy").textContent = reservasHoy;
  } catch (error) {
    console.error("Error cargando datos del panel:", error);
  }
});

//este se encarga de cargar datos a las targetas superiores del dashboard del panel admin en tiempo real
// ojo cargan datos de la tabl clientes o usuario y de la de reservas, las seciones el código se encarga 
// de detectarlas directamente en el sitio web y mostrarlas en tiempo real