import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private recipes: Recipe[] = [

    {
      id: 'r1',
      title: 'Schnitzel',
      imageURL: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      ingredients: ['French Fries', 'Pork Meat', 'Salad']
    },
    {
      id: 'r2',
      title: 'Spaghetti',
      imageURL: 'https://www.olivetomato.com/wp-content/uploads/2022/06/Greek-Spaghetti-with-Ground-Beef-Sauce-recipe-%E2%80%93-Makaronia-me-Kima-2-480x270.jpeg',
      ingredients: ['French Fries', 'spaghetti', 'tomatoes']
    }
  ];

  constructor() { }


  getAllRecipes(){
    return [...this.recipes];
  }


  getRecipe(recipeId: string){
    return {
      ...this.recipes.find(recipe => {
      return recipe.id === recipeId;
      })
    }
  }

  deleteRecipe(recipeId: string) {


    console.log('delete button clicked')

    //keeps all elements except the recipeId deleted
    this.recipes = this.recipes.filter(recipe => {
      return recipe.id !== recipeId;
    })

  }

}
