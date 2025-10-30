document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");

  if (!logoutBtn) return;

  // Crear modal si no existe
  let logoutModal = document.getElementById("logoutModal");
  if (!logoutModal) {
    logoutModal = document.createElement("div");
    logoutModal.id = "logoutModal";
    logoutModal.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden";
    logoutModal.innerHTML = `
      <div class="bg-[color:var(--carbon)] text-white p-6 rounded-lg shadow-lg w-80 text-center border border-[color:var(--dorado)]">
        <p class="mb-4 text-lg">¿Estás seguro de que quieres cerrar sesión?</p>
        <div class="flex justify-around">
          <button id="confirmLogout" class="bg-[color:var(--dorado)] text-black px-4 py-2 rounded hover:bg-[#c19d2b] transition">Sí</button>
          <button id="cancelLogout" class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition">No</button>
        </div>
      </div>
    `;
    document.body.appendChild(logoutModal);
  }

  const confirmLogout = logoutModal.querySelector("#confirmLogout");
  const cancelLogout = logoutModal.querySelector("#cancelLogout");

  // Mostrar modal
  logoutBtn.addEventListener("click", () => {
    logoutModal.classList.remove("hidden");
  });

  // Confirmar cierre de sesión
  confirmLogout.addEventListener("click", () => {
    // Aquí puedes limpiar datos del usuario si se guardan en localStorage
    localStorage.removeItem("usuarioLogueado");

    // Redirigir al inicio
    window.location.href = "index.html";
  });

  // Cancelar cierre
  cancelLogout.addEventListener("click", () => {
    logoutModal.classList.add("hidden");
  });
});