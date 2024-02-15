// Global app controller

import Search from "./modules/search";
import { clearLoader, elements, renderLoader } from "./views/base";
import * as searchView from "./views/searchView";

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