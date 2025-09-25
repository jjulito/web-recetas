const API_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
let comidasFiltradas = [];
let paginaActual = 1;
const recetasPorPagina = 8;

async function searchRecipe() {
  const query = document.getElementById("searchInput").value.trim();
  const res = await fetch(API_URL + query);
  const data = await res.json();

  if (!data.meals) {
    document.getElementById("recipe-list").innerHTML = `<div class="col-12 text-center"><p class="text-muted">No se encontraron recetas.</p></div>`;
    document.getElementById("paginacion").innerHTML = "";
    return;
  }

  comidasFiltradas = data.meals.filter(meal => meal.strArea !== "Russian");
  paginaActual = 1;
  mostrarPagina();
}

function mostrarPagina() {
  const list = document.getElementById("recipe-list");
  list.innerHTML = "";

  const inicio = (paginaActual - 1) * recetasPorPagina;
  const fin = inicio + recetasPorPagina;
  const recetasPagina = comidasFiltradas.slice(inicio, fin);

  if (recetasPagina.length === 0) {
    list.innerHTML = `<div class="col-12 text-center"><p class="text-muted">No hay recetas en esta página.</p></div>`;
    return;
  }

  recetasPagina.forEach(meal => {
    const card = document.createElement("div");
    card.className = "col-sm-6 col-md-4 col-lg-3 mb-4";
    card.innerHTML = `
      <div class="card shadow-sm h-100">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text"><strong>Categoría:</strong> ${meal.strCategory}</p>
          <p class="card-text"><strong>Área:</strong> ${meal.strArea}</p>
          <a href="${meal.strSource || '#'}" target="_blank" class="btn btn-primary mt-auto">Ver receta</a>
        </div>
      </div>
    `;
    list.appendChild(card);
  });

  mostrarPaginacion();
}

function mostrarPaginacion() {
  const pagDiv = document.getElementById("paginacion");
  pagDiv.innerHTML = "";

  const totalPaginas = Math.ceil(comidasFiltradas.length / recetasPorPagina);

  if (paginaActual > 1) {
    const btnPrev = document.createElement("button");
    btnPrev.className = "btn btn-secondary m-1";
    btnPrev.textContent = "Anterior";
    btnPrev.onclick = () => { paginaActual--; mostrarPagina(); };
    pagDiv.appendChild(btnPrev);
  }

  if (paginaActual < totalPaginas) {
    const btnNext = document.createElement("button");
    btnNext.className = "btn btn-secondary m-1";
    btnNext.textContent = "Siguiente";
    btnNext.onclick = () => { paginaActual++; mostrarPagina(); };
    pagDiv.appendChild(btnNext);
  }

  const info = document.createElement("span");
  info.className = "mx-2";
  info.textContent = `Página ${paginaActual} de ${totalPaginas}`;
  pagDiv.appendChild(info);
}
