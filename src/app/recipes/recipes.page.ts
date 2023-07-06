import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit, OnDestroy {

   recipes: Recipe[] = [];


  constructor(private recipesService: RecipesService ) { }

  ngOnInit() {
    this.recipes = this.recipesService.getAllRecipes();
    console.log(this.recipes)
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter')
    //load updated recipes
    this.recipes = this.recipesService.getAllRecipes();
  }

  ionViewDidEnter(){
    console.log('ionViewDidEnter')
  }


  ngOnDestroy() {
    console.log('ngOnDestroy')
  }

}
