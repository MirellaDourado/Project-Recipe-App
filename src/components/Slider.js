import React, { useContext, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import '../styles/Slider.css';
import { useHistory } from 'react-router-dom';
import RecipesAppContext from '../context/RecipesAppContext';

function Slider({ recipes, type }) {
  const [width, setWidth] = useState(0);
  const carousel = useRef();
  const history = useHistory();
  const { setLoading } = useContext(RecipesAppContext);

  const six = 6;
  const thumb = type === 'meals' ? 'strDrinkThumb' : 'strMealThumb';
  const title = type === 'meals' ? 'strDrink' : 'strMeal';
  const id = type === 'meals' ? 'idDrink' : 'idMeal';
  const path = type === 'meals' ? 'drinks' : 'meals';

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  });

  const handleClick = (recipe) => {
    history.push(`/${path}/${recipe[id]}`);
    setLoading(true);
  };

  return (
    <>
      <h3> You can also try: </h3>
      <motion.div
        className="carousel"
        ref={ carousel }
      >
        <motion.div
          className="inner"
          drag="x"
          dragConstraints={ { right: 0, left: -width } }
        >
          {recipes.filter((_r, index) => index < six).map((recipe, i) => (
            <motion.div
              key={ `${i}-${recipe}` }
              className="inner-item"
              data-testid={ `${i}-recommendation-card` }
            >
              <button
                type="button"
                className="slider-recipe-btn"
                onClick={ () => handleClick(recipe) }
              >
                <img
                  src={ recipe[thumb] }
                  className="slider-recipe-img"
                  alt={ recipe[title] }
                />
                <p data-testid={ `${i}-recommendation-title` }>
                  { recipe[title] }
                </p>
              </button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </>
  );
}

Slider.propTypes = {
  recipes: PropTypes.shape({
    filter: PropTypes.func,
    map: PropTypes.func,
  }).isRequired,
  type: PropTypes.string.isRequired,
};

export default Slider;
