import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  zutaten: {
    type: [String],
    required: true,
  },
  anleitung: {
    type: String,
    required: true,
  },
});

const RecipeModel = mongoose.model('Recipe', recipeSchema);

export default RecipeModel;
