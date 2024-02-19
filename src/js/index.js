// Global app controller

import Recipe from "./modules/recipe";
import Search from "./modules/search";
import { clearLoader, elements, renderLoader } from "./views/base";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView"

/* 
- Search object
- Current recipe object
- Shopping list object
- Liked recipies
*/

const state = {};

const controlSearch = async (e) =>{
    e.preventDefault();

    const query = searchView.getInput();

    
    if(query){
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResList);
        state.search = new Search(query);
        await state.search.getResults();
        /* console.log(state); */
        searchView.renderResult(state.search.result);
    }
    clearLoader();

    
}


elements.searchForm.addEventListener("submit",controlSearch);


elements.searchResPage.addEventListener("click", e =>{
    const btn = e.target.closest(".btn-inline");
    if (btn){
        const goto = btn.dataset.goto;
        searchView.clearResults();
        searchView.renderResult(state.search.result, +goto);
    }
})

const controlRecipe = async () =>{
    const id = window.location.hash.replace("#","");
    if (id){

        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        state.recipe = new Recipe(id);

        await state.recipe.getRecipe();
        state.recipe.calcTime();
        state.recipe.calcServings();
        
        clearLoader();

        recipeView.renderRecipe(state.recipe);
    }
}

window.addEventListener("hashchange", controlRecipe);
