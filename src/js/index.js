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
window.state = state;

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

        if (state.search) searchView.highlitedSelected(id);

        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        state.recipe = new Recipe(id);

        await state.recipe.getRecipe();
        state.recipe.calcTime();
        state.recipe.calcServings();
        state.recipe.parseIngredients();
        
        clearLoader()

        recipeView.renderRecipe(state.recipe);
    }
}

window.addEventListener("hashchange", controlRecipe);

window.addEventListener("load", controlRecipe);


elements.recipe.addEventListener("click", e =>{
    if(e.target.matches(".btn-dec, .btn-dec *")){
        //decrease
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    }
    if(e.target.matches(".btn-inc, .btn-inc *")){
        //increase
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);


    }

})



