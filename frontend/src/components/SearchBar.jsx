import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { RecipeContext } from '../context/RecipeContext';

const SearchBar = () => {
  const { searchRecipes, filteredRecipes, setSelectedSectionRecipe, setFilteredRecipes } = useContext(RecipeContext);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchRecipes(searchTerm);
    setSearchTerm('');
  };

  const handleClick = (recipe) => {
    setSelectedSectionRecipe(recipe);
    setFilteredRecipes([]);
  };

  return (
    <>
      <form className="search-bar" onSubmit={handleSubmit}>
        <input type="text" placeholder="Rezept suchen" value={searchTerm} onChange={handleChange} />
        <button type="submit">Suchen</button>
      </form>
      {filteredRecipes.length > 0 && (
        <div className="recipe-list">
          <h3>SuchErgebnis</h3>
          {filteredRecipes.map((recipe, index) => (
            <Link to={`/recipe/${recipe._id}`} onClick={() => handleClick(recipe)} key={index}>
              {recipe.name}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default SearchBar;
