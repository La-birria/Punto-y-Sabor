// Cargar menú desde JSON
fetch("jsons/menu.json")
  .then(response => response.json())
  .then(data => {
    const menuContainer = document.getElementById("menu-cards");
    
    data.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${item.imagen}" alt="${item.nombre}" class="card-img">
        <h3>${item.nombre}</h3>
        <p>${item.descripcion}</p>
        <span class="precio">$${item.precio.toFixed(2)}</span>
      `;

      menuContainer.appendChild(card);
    });
  })
  .catch(error => console.error("Error cargando menú:", error));
//este código se encarga de cargar lod datos del menu al menu.html