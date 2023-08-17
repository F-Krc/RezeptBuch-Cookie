import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import Register from './components/Register';
import Login from './components/Login';
import Recipe from './components/Recipe';
import { UserContext } from './context/UserContext';
import './App.css';
import { useContext } from 'react';
import SearchBar from './components/SearchBar';

const App = () => {
  const { isLoggedIn, loggedInUser } = useContext(UserContext);
  return (
    <Router>
      <div className="container">
        <nav className="navbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Rezeptliste
              </Link>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <Link to="/form" className="nav-link">
                  Rezept Hinzufügen
                </Link>
              </li>
            )}
            {isLoggedIn ? (
              <li className="nav-item">{loggedInUser}</li>
            ) : (
              <li className="nav-item">
                <Link to="/users/register" className="nav-link">
                  Registrieren
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link to="/users/login" className="nav-link">
                {isLoggedIn ? 'Ausloggen' : 'Anmeldung'}
              </Link>
            </li>
          </ul>
        </nav>
        <SearchBar />
        <Routes>
          <Route path="/" element={<RecipeList />} />
          {isLoggedIn && <Route path="/form" element={<RecipeForm />} />}
          <Route path="/recipe/:recipeId" element={<Recipe />} />
          <Route path="/users/register" element={<Register />} />
          <Route path="/users/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
