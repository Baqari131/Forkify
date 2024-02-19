

export default class Recipe{

    constructor (id){
        this.id = id;
    }

    async getRecipe(){
        const response = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
        const data = await response.json();
        this.title = data.recipe.title;
        this.author = data.recipe.publisher;
        this.img = data.recipe.image_url;
        this.url = data.recipe.source_url;
        this.ingredients = data.recipe.ingredients;
    }

    calcTime(){
        const numIng = this.ingredients.length;
        const period  = Math.ceil(numIng / 3);
        this.time = period * 15;
    }

    calcServings(){
        this.servings = 4;
    }
}