import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
  const history = useHistory();

  const redirectPageDrink = () => {
    history.push('/drinks');
  };
  const redirectPageMeal = () => {
    history.push('/meals');
  };

  return (
    <div
      className="footer-recipe"
    >
      <button
        type="button"
        onClick={ redirectPageDrink }
        aria-label="button-drinks"
      >
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="iconDink"
        />

      </button>
      <button
        type="button"
        onClick={ redirectPageMeal }
        aria-label="button-meals"
      >
        <img
          data-testid="meals-bottom-btn"
          src={ mealIcon }
          alt="iconDink"
        />

      </button>
    </div>
  );
}

export default Footer;
