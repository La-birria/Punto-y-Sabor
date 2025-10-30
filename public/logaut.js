document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");

  if (!logoutBtn) return; // Si no hay botón, salimos

  // Crear modal de confirmación
  let logoutModal = document.createElement("div");
  logoutModal.id = "logoutModal";
  logoutModal.className =
    "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-50";
  logoutModal.innerHTML = `
    <div class="bg-[color:var(--carbon)] text-white p-6 rounded-lg shadow-lg w-80 text-center border border-[color:var(--dorado)]">
      <p class="mb-4 text-lg font-semibold">¿Estás seguro de que quieres cerrar sesión?</p>
      <div class="flex justify-around">
        <button id="confirmLogout" class="bg-[color:var(--dorado)] text-black px-4 py-2 rounded hover:bg-[#c19d2b] transition">Sí</button>
        <button id="cancelLogout" class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition">No</button>
      </div>
    </div>
  `;
  document.body.appendChild(logoutModal);

  // Crear notificación de éxito
  let successToast = document.createElement("div");
  successToast.id = "logoutToast";
  successToast.className =
    "fixed bottom-6 right-6 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg hidden z-50";
  successToast.textContent = "Sesión cerrada correctamente ✅";
  document.body.appendChild(successToast);

  const confirmLogout = logoutModal.querySelector("#confirmLogout");
  const cancelLogout = logoutModal.querySelector("#cancelLogout");

  // Mostrar modal
  logoutBtn.addEventListener("click", () => {
    logoutModal.classList.remove("hidden");
  });

  // Confirmar cierre
  confirmLogout.addEventListener("click", () => {
    localStorage.removeItem("usuarioActivo");

    // Mostrar notificación sin alert
    logoutModal.classList.add("hidden");
    successToast.classList.remove("hidden");

    // Ocultar notificación y redirigir
    setTimeout(() => {
      successToast.classList.add("hidden");
      window.location.href = "index.html";
    }, 1500);
  });

  // Cancelar cierre
  cancelLogout.addEventListener("click", () => {
    logoutModal.classList.add("hidden");
  });
});
