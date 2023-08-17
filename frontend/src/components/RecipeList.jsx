import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';

const RecipeList = () => {
  const { recipes, setSelectedSectionRecipe } = useContext(RecipeContext);

  return (
    <div className="recipe-list">
      <>
        <h2>Rezeptliste</h2>
        {recipes.length === 0 ? (
          <div>Keine Rezepte verfügbar.</div>
        ) : (
          <ul>
            {recipes.map((recipe, index) => (
              <li key={index}>
                <Link to={`/recipe/${recipe._id}`} onClick={() => setSelectedSectionRecipe(recipe)}>
                  {recipe.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </>
    </div>
  );
};

export default RecipeList;
