const API_URL = "https://api.gustar.io/v1/recipes/search";

async function fetchRecipes(query = "") {
  try {
    const response = await fetch(`${API_URL}?query=${query}&lang=es`);
    const data = await response.json();
    displayRecipes(data.recipes);
  } catch (error) {
    console.error("Error al obtener las recetas:", error);
  }
}

function displayRecipes(recipes) {
  const recipeList = document.getElementById("recipe-list");
  recipeList.innerHTML = "";

  if (!recipes || recipes.length === 0) {
    recipeList.innerHTML = `<div class="col-12 text-center"><p class="text-muted">No se encontraron recetas.</p></div>`;
    return;
  }

  recipes.forEach(recipe => {
    const card = document.createElement("div");
    card.className = "col-sm-6 col-md-4 col-lg-3 mb-4";
    card.innerHTML = `
      <div class="card shadow-sm">
        <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
        <div class="card-body">
          <h5 class="card-title">${recipe.title}</h5>
          <p class="card-text"><strong>Categoría:</strong> ${recipe.category}</p>
          <p class="card-text"><strong>Área:</strong> ${recipe.area}</p>
          <a href="${recipe.source}" target="_blank" class="btn btn-primary">Ver receta</a>
        </div>
      </div>
    `;
    recipeList.appendChild(card);
  });
}

fetchRecipes();
