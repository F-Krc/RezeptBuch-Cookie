import { Router } from 'express';

import * as recipe from '../controller/recipesController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';


const recipeRouter = Router();

recipeRouter
  .get('/recipes', recipe.getRecipes) // Get All Recipes
  .get('/recipe/:id', recipe.getRecipeById) // Find Recipe By Id
  .get('/recipes/:name', recipe.getRecipeByName) // Find Recipe By Name
  .post('/recipes', authMiddleware, recipe.addRecipe) // Add Recipes
  .put('/recipes/:id', authMiddleware, recipe.updateRecipe) // Update Recipe
  .delete('/recipes/:id', authMiddleware, recipe.deleteRecipe); // Delete Recipe

export default recipeRouter;
