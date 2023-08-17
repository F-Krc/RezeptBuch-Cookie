import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { RecipeContext } from '../context/RecipeContext';
import { useNavigate, Link } from 'react-router-dom';

const Recipe = () => {
  const { deleteRecipe, setSelectedRecipe, selectedSectionRecipe } = useContext(RecipeContext);
  const { isLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteRecipe(selectedSectionRecipe._id);
    navigate('/');
  };

  const handleEdit = () => {
    setSelectedRecipe(selectedSectionRecipe);
    navigate('/form');
  };

  return (
    <div className="recipe">
      {selectedSectionRecipe && (
        <>
          <h3>{selectedSectionRecipe.name}</h3>
          <>
            <p>Zutaten: {selectedSectionRecipe.zutaten.join(', ')}</p>
            <p>Anleitung: {selectedSectionRecipe.anleitung}</p>
            {isLoggedIn && (
              <>
                <button onClick={handleDelete}>Löschen</button>
                <button onClick={handleEdit}>Bearbeiten</button>
              </>
            )}
            <Link to="/">Zurück zur Rezeptliste</Link>
          </>
        </>
      )}
    </div>
  );
};

export default Recipe;
