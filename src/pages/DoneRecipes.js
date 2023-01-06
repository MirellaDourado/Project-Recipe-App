import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoFastFoodOutline } from 'react-icons/io5';
import { BiDrink, BiDish } from 'react-icons/bi';
import Header from '../components/Header';
import ShareIcon from '../images/shareIcon.svg';
import '../styles/DoneRecipes.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [showRecipesInfo, setShowRecipesInfo] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(local);
    setShowRecipesInfo(local);
  }, []);

  const shareLink = (element) => {
    copy(`http://localhost:3000/${element.type}s/${element.id}`);
    setCopied(true);
    const limite = 5000;
    setTimeout(setCopied, limite);
  };

  const all = () => {
    setDoneRecipes(showRecipesInfo);
  };

  const meals = () => {
    const filterMeal = doneRecipes.filter((recipe) => recipe.type === 'meal');
    setDoneRecipes(filterMeal);
  };

  const drinks = () => {
    const filterDrinks = doneRecipes.filter((recipe) => recipe.type === 'drink');
    setDoneRecipes(filterDrinks);
  };
  return (
    <main className="done-recipes">
      <div className="btns-done-recipe">
        <Header profileUser goBack>Done Recipes</Header>
        <div>
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ all }
            className="filter-by-all-btn"
          >
            <IoFastFoodOutline fontSize="45px" />
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-meal-btn"
            className="filter-by-meal-btn"
            onClick={ meals }
          >
            <BiDish fontSize="45px" />
            Meals
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            className="filter-by-drink-btn"
            onClick={ drinks }
          >
            <BiDrink fontSize="45px" />
            Drinks
          </button>
        </div>
      </div>
      <div className="all-dones">
        {doneRecipes
        && doneRecipes.map((e, index) => (
          <div key={ `${e.id}-a` } className="done-card">
            <Link to={ `/${e.type}s/${e.id}` }>
              <img
                src={ e.image }
                alt={ e.name }
                data-testid={ `${index}-horizontal-image` }
                className="done-img"
                // className="w-25"
              />
              <div className="done-informations">
                <p data-testid={ `${index}-horizontal-name` } className="done-name">
                  {e.name}
                </p>
                {e.type === 'meal' ? (
                  <>
                    <span
                      data-testid={ `${index}-horizontal-top-text` }
                      className="done-info-food"
                    >
                      {`${e.nationality} - ${e.category}`}
                    </span>
                    <div>
                      <p
                        data-testid={ `${index}-${e.tags[0]}-horizontal-tag` }
                        className="done-info"
                      >
                        {`${e.tags[0]}`}
                      </p>
                      <p
                        data-testid={ `${index}-${e.tags[1]}-horizontal-tag` }
                        className="done-info"
                      >
                        {`${e.tags[1]}`}
                      </p>
                    </div>
                  </>
                ) : (
                  <span
                    data-testid={ `${index}-horizontal-top-text` }
                    className="done-info"
                  >
                    {e.alcoholicOrNot}
                  </span>
                )}
                <p data-testid={ `${index}-horizontal-done-date` } className="done-date">
                  {e.doneDate}
                </p>
              </div>
            </Link>
            <button
              type="button"
              onClick={ () => shareLink(e) }
              className="done-share-btn"
            >
              <img
                src={ ShareIcon }
                alt="favorite Icon"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
          </div>
        ))}
      </div>
      {copied && (
        <p className="copied-warning">Link copied!</p>
      )}
    </main>
  );
}

export default DoneRecipes;
