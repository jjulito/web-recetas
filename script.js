const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

async function fetchRecipes(query = "") {
    try {
        const response = await fetch(API_URL + query);
        const data = await response.json();
        displayRecipes(data.meals);
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
}

function displayRecipes(recipes) {
    const recipeList = document.getElementById("recipe-list");
    recipeList.innerHTML = "";

    if (!recipes) {
        recipeList.innerHTML = `<div class="col-12 text-center"><p class="text-muted">No se encontraron recetas.</p></div>`;
        return;
    }

    recipes.forEach(recipe => {
        const card = document.createElement("div");
        card.className = "col-sm-6 col-md-4 col-lg-3 mb-4";
        card.innerHTML = `
            <div class="card shadow-sm">
                <img src="${recipe.strMealThumb}" class="card-img-top" alt="${recipe.strMeal}">
                <div class="card-body">
                    <h5 class="card-title">${recipe.strMeal}</h5>
                    <p class="card-text"><strong>Categoría:</strong> ${recipe.strCategory}</p>
                    <p class="card-text"><strong>Área:</strong> ${recipe.strArea}</p>
                    <a href="${recipe.strSource}" target="_blank" class="btn btn-primary">Ver receta</a>
                </div>
            </div>
        `;
        recipeList.appendChild(card);
    });
}

fetchRecipes();
