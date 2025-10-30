// scripts/registro-local.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("name").value.trim();
    const email  = document.getElementById("email").value.trim().toLowerCase();
    const pass   = document.getElementById("password").value;
    const conf   = document.getElementById("confirm").value;

    if (!nombre || !email || !pass || !conf) {
      return alert("Por favor completa todos los campos.");
    }
    if (pass !== conf) {
      return alert("Las contraseñas no coinciden.");
    }

    // Cargar usuarios desde localStorage (si existen)
    const raw = localStorage.getItem("users");
    const users = raw ? JSON.parse(raw) : [];

    // Verificar email duplicado
    const existe = users.some(u => u.email === email);
    if (existe) {
      return alert("Ya existe una cuenta con ese correo.");
    }

    // Crear nuevo usuario (id auto incremental)
    const nuevo = {
      id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
      nombre,
      email,
      password: pass // SOLO PARA DESARROLLO: no almacenar en texto plano en producción
    };

    users.push(nuevo);
    localStorage.setItem("users", JSON.stringify(users));

    // Opcional: iniciar sesión automáticamente
    localStorage.setItem("usuarioActivo", JSON.stringify({ id: nuevo.id, nombre: nuevo.nombre, email: nuevo.email }));
    alert("Cuenta creada correctamente. Bienvenido " + nuevo.nombre);

    // Si había una reserva pendiente, procesarla (flujo que ya discutimos)
    const reservaPendiente = localStorage.getItem("reservaPendiente");
    if (reservaPendiente) {
      const reservas = JSON.parse(localStorage.getItem("reservas") || "[]");
      reservas.push(JSON.parse(reservaPendiente));
      localStorage.setItem("reservas", JSON.stringify(reservas));
      localStorage.removeItem("reservaPendiente");
      alert("Tu reserva pendiente fue confirmada automáticamente.");
    }

    // Volver al index o a la sección de reservas
    window.location.href = "index.html#reservas";
  });
});
//este código se encarga de recopilar y almacenar los datos que proporciona el cliente 
// cuando crea su cuenta y se almacenan en la tabla clientes o usuarios