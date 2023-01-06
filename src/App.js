import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';
import RecipesAppProvider from './context/RecipesAppProvider';

function App() {
  return (
    <RecipesAppProvider>
      <Switch>
        <Route
          exact
          path="/"
          render={ () => <Login /> }
        />
        <Route
          path="/profile"
          render={ () => <Profile /> }
        />
        <Route
          exact
          path="/meals"
          render={ () => <Recipes type="meals" /> }
        />
        <Route
          exact
          path="/drinks"
          render={ () => <Recipes type="drinks" /> }
        />
        <Route
          path="/done-recipes"
          render={ () => <DoneRecipes /> }
        />
        <Route
          path="/favorite-recipes"
          render={ () => <FavoriteRecipes /> }
        />
        <Route
          exact
          path="/meals/:id"
          render={ (props) => <RecipeDetails { ...props } type="meals" /> }
        />
        <Route
          exact
          path="/drinks/:id"
          render={ (props) => <RecipeDetails { ...props } type="drinks" /> }
        />
        <Route
          path="/meals/:id/in-progress"
          render={ () => <RecipeInProgress type="meals" /> }
        />
        <Route
          path="/drinks/:id/in-progress"
          render={ () => <RecipeInProgress type="drinks" /> }
        />
      </Switch>
    </RecipesAppProvider>
  );
}

export default App;
