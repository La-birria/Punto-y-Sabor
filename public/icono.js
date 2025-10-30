document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");

  // Verificar si hay usuario activo
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

  if (usuarioActivo && loginBtn) {
    // Crear contenedor del icono
    const iconContainer = document.createElement("div");
    iconContainer.classList.add("relative", "cursor-pointer", "flex", "items-center", "gap-2");

    // Imagen o icono del perfil
    const iconImg = document.createElement("img");
    iconImg.src = usuarioActivo.foto || "imgs/avatar.jpg"; // imagen por defecto si no hay foto
    iconImg.alt = "Perfil";
    iconImg.classList.add(
      "w-10", "h-10", "rounded-full", "border", "border-[color:var(--dorado)]", "object-cover"
    );

    // Texto al lado del icono
    const text = document.createElement("span");
    text.textContent = "Ver perfil";
    text.classList.add("text-sm", "text-gray-200", "hover:text-[color:var(--vino)]");

    // Reemplazar el botón por el icono + texto
    loginBtn.replaceWith(iconContainer);
    iconContainer.appendChild(iconImg);
    iconContainer.appendChild(text);

    // Redirigir al perfil al hacer clic en el icono o texto
    iconContainer.addEventListener("click", () => {
      window.location.href = "perfil.html";
    });
  }
});
