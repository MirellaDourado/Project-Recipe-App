import React from 'react';
import PropTypes from 'prop-types';

function IngredientList({ ingredients, measure, type }) {
  return (
    <ul>
      {ingredients.map((ing, index) => {
        if (type === 'meals') {
          return ing !== '' ? (
            <li
              key={ `${index}-ingredient-name-and-measure` }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { `${ing} ${measure[index]}` }
            </li>) : null;
        }
        return ing !== null ? (
          <li
            key={ `${index}-ingredient-name-and-measure` }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            { `${ing} ${measure[index]}` }
          </li>) : null;
      })}
    </ul>
  );
}

IngredientList.propTypes = {
  ingredients: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
  measure: PropTypes.shape([]).isRequired,
  type: PropTypes.string.isRequired,
};

export default IngredientList;
