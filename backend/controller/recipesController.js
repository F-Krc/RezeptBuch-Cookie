import RecipeModel from '../models/recipeModel.js';

export const getRecipes = async (req, res) => {
  try {
    const recipes = await RecipeModel.find();
    res.send(recipes);
  } catch (error) {
    res.send(`Recipes können nicht geladen werden: ${error.messsage}`);
  }
};

export const getRecipeById = async (req, res) => {
  const recipeId = req.params.id;

  const recipe = await RecipeModel.findById(recipeId);

  if (recipe.length > 0) {
    res.json(recipe);
  } else {
    res.status(404).send('Es gibt keinen Recipe mit diesem Id');
  }
};

export const getRecipeByName = async (req, res) => {
  const recipeName = req.params.name;

  const recipe = await RecipeModel.find({ name: { $regex: new RegExp(recipeName, 'i') } });

  if (recipe.length > 0) {
    res.json(recipe);
  } else {
    res.status(404).send('Es gibt keinen Recipe mit diesem Namen');
  }
};
export const addRecipe = async (req, res) => {
  const recipe = req.body;

  try {
    const zutatenArray = recipe.zutaten.split(',').map((item) => item.trim());
    const newRecipe = await RecipeModel.create({ ...recipe, zutaten: zutatenArray });
    res.status(200).send(`Recipe erfolgreich hinzugefügt ${newRecipe}`);
  } catch (error) {
    res.send(`Fehler beim Hinzufügen des Recipes: ${error.message}`);
  }
};

export const updateRecipe = async (req, res) => {
  const id = req.params.id;
  const updatedRecipe = req.body;

  try {
    const recipe = await RecipeModel.findByIdAndUpdate(id, updatedRecipe, { new: true });

    if (!recipe) {
      return res.status(404).send('Recipe nicht gefunden');
    }

    res.send('Recipe erfolgreich aktualisiert');
  } catch (error) {
    res.send(`Fehler beim Aktualisieren des Recipes: ${error.message}`);
  }
};

export const deleteRecipe = async (req, res) => {
  const id = req.params.id;

  try {
    const recipe = await RecipeModel.findByIdAndDelete(id);

    if (!recipe) {
      return res.status(404).send('Recipe nicht gefunden');
    }

    res.send('Recipe erfolgreich gelöscht');
  } catch (error) {
    res.send(`Fehler beim Löschen des Recipes: ${error.message}`);
  }
};
