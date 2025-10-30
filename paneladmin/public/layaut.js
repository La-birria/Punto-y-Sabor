document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");

  if (!logoutBtn) return; // Si no hay botón de logout, no hace nada

  // Verificar si el modal ya existe
  let logoutModal = document.getElementById("logoutModal");
  if (!logoutModal) {
    // Crear e inyectar el modal en el body
    logoutModal = document.createElement("div");
    logoutModal.id = "logoutModal";
    logoutModal.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden";
    logoutModal.innerHTML = `
      <div class="bg-[color:var(--azul)] text-[color:var(--beige)] p-6 rounded-lg shadow-lg w-80 text-center">
        <p class="mb-4 text-lg">¿Estás seguro de que quieres cerrar sesión?</p>
        <div class="flex justify-around">
          <button id="confirmLogout" class="bg-[color:var(--dorado)] text-[color:var(--azul)] px-4 py-2 rounded hover:brightness-110">Sí</button>
          <button id="cancelLogout" class="bg-[color:var(--beige)] text-[color:var(--azul)] px-4 py-2 rounded hover:brightness-90">No</button>
        </div>
      </div>
    `;
    document.body.appendChild(logoutModal);
  }

  const confirmLogout = document.getElementById("confirmLogout");
  const cancelLogout = document.getElementById("cancelLogout");

  // Mostrar modal
  logoutBtn.addEventListener("click", () => {
    logoutModal.classList.remove("hidden");
  });

  // Confirmar cierre de sesión
  confirmLogout.addEventListener("click", () => {
    window.location.href = "../index.html";
  });

  // Cancelar cierre de sesión
  cancelLogout.addEventListener("click", () => {
    logoutModal.classList.add("hidden");
  });
});

// este código se encarga de cerrar la seción del administrador, cuando estas en el panel 
// admin y presionas el boton de cerrar seción se mostrara un div que te preguntara si estas 
// seguro y dos botones uno de uno de "si" para cerrar la seción y otro de "no" por xi te arrepentis