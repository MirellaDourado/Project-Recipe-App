import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IoFastFoodOutline } from 'react-icons/io5';
import { BiDrink, BiDish } from 'react-icons/bi';
import Header from '../components/Header';
import Footer from '../components/Footer';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/FavoriteRecipes.css';

export default function FavoriteRecipes() {
  const favoriteRecipe = () => JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [copied, setCopied] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState(favoriteRecipe());
  const history = useHistory();

  const copyLink = (type, id) => {
    const time = 3000;
    const allUrl = window.location.origin;
    const recipeUrl = `${allUrl}/${type}s/${id}`;
    navigator.clipboard.writeText(recipeUrl);
    setCopied('Link copied!');
    setTimeout(() => setCopied(false), time);
  };

  const redirectPage = (type, id) => {
    console.log(type);
    console.log(id);
    history.push(`/${type}s/${id}`);
  };

  const disfavor = (id) => {
    const recipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const recipeDisfavor = recipe.filter((rec) => rec.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(recipeDisfavor));
    setFavoriteRecipes(recipeDisfavor);
  };

  const filtredFood = () => {
    const recipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const recipeFood = recipe.filter((rec) => rec.type === 'meal');
    setFavoriteRecipes(recipeFood);
  };

  const filtredDrink = () => {
    const recipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const recipeDrink = recipe.filter((rec) => rec.type === 'drink');
    setFavoriteRecipes(recipeDrink);
  };

  const filtredAll = () => {
    setFavoriteRecipes(favoriteRecipe());
  };

  return (
    <div className="fav-recipes">
      <div className="btns-done-recipe">
        <Header profileUser goBack>Favorite Recipes</Header>
        <div>
          <button
            type="button"
            data-testid="filter-by-all-btn"
            className="filter-by-all-btn"
            onClick={ () => filtredAll() }
          >
            <IoFastFoodOutline fontSize="45px" />
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-meal-btn"
            className="filter-by-meal-btn"
            onClick={ () => filtredFood() }
          >
            <BiDish fontSize="45px" />
            Meals
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => filtredDrink() }
            className="filter-by-drink-btn"
          >
            <BiDrink fontSize="45px" />
            DRINKS
          </button>
        </div>
      </div>
      <div className="all-dones">
        {(favoriteRecipes !== null)
        && favoriteRecipes.map((recipe, index) => {
          const { image, name, nationality, id, category, type, alcoholicOrNot } = recipe;
          if (type === 'drink') {
            return (
              <div key={ id } className="favorite-card">
                <button
                  key={ `${id}-drink` }
                  type="button"
                  onClick={ () => redirectPage(type, id) }
                  name="drink"
                  data-testid="button-drink"
                  className="button-fav-card"
                >
                  <img
                    src={ image }
                    alt={ name }
                    className="favorite-img"
                    data-testid={ `${index}-horizontal-image` }
                  />
                  <button
                    type="button"
                    onClick={ () => redirectPage(type, id) }
                    data-testid="button-name-drink"
                    className="button-name-drink"
                  >
                    <h3
                      data-testid={ `${index}-horizontal-name` }
                    >
                      { name }

                    </h3>
                    <p data-testid={ `${index}-horizontal-top-text` }>
                      { nationality }
                      { category }
                    </p>
                    <p data-testid={ `${index}-horizontal-top-text` }>
                      { alcoholicOrNot }
                    </p>
                  </button>
                </button>
                <button
                  type="button"
                  onClick={ () => copyLink(type, id) }
                  className="share-fav-card"
                >
                  <img
                    src={ shareIcon }
                    alt="share icon"
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                </button>
                <button
                  type="button"
                  onClick={ () => disfavor(id) }
                  className="fav-fav-card"
                >
                  <img
                    src={ blackHeartIcon }
                    alt="black heart icon"
                    data-testid={ `${index}-horizontal-favorite-btn` }
                  />
                </button>
              </div>
            );
          }
          return (
            <div key={ id } className="favorite-card">
              <button
                onClick={ () => redirectPage(type, id) }
                type="button"
                data-testid="button-food"
                className="button-fav-card"
              >
                <img
                  src={ image }
                  alt={ name }
                  className="favorite-img"
                  data-testid={ `${index}-horizontal-image` }
                />
                <button
                  onClick={ () => redirectPage(type, id) }
                  type="button"
                  data-testid="button-name-food"
                  className="button-name-food"
                >
                  <h3
                    data-testid={ `${index}-horizontal-name` }
                  >
                    { name }

                  </h3>
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    { nationality }
                    {' '}
                    -
                    {' '}
                    { category }
                  </p>
                </button>
              </button>
              <button
                type="button"
                onClick={ () => copyLink(type, id) }
                className="share-fav-card"
              >
                <img
                  src={ shareIcon }
                  alt="share icon"
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </button>
              <button
                type="button"
                onClick={ () => disfavor(id) }
                className="fav-fav-card"
              >
                <img
                  src={ blackHeartIcon }
                  alt="black heart icon"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                />
              </button>
            </div>
          );
        })}
        { copied && <p className="copied-warning">Link copied!</p> }
      </div>
      <footer
        className="position-fixed fixed-bottom"
        data-testid="footer"
      >
        <Footer />
      </footer>
    </div>
  );
}
