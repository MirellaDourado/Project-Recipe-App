import React from 'react';
import CheckBox from './CheckBox';

function ListCheckBox({
  ingredients, type, title, measure, setIngredientsProgress, ingredientsProgress,
}) {
  return (
    ingredients.map((ing, index) => {
      if (type === 'meals') {
        return ing !== '' ? (
          <CheckBox
            ing={ ing }
            measure={ measure[index] }
            key={ `${index}-ingredient-step` }
            index={ index }
            setIngredientsProgress={ setIngredientsProgress }
            title={ title }
            ingredientsProgress={ ingredientsProgress[index] === true }
            allIngs={ ingredientsProgress }
            ings={ ingredients }
          />) : null;
      }
      return ing !== '' && ing !== null ? (
        <CheckBox
          ing={ ing }
          measure={ measure[index] }
          key={ `${index}-ingredient-step` }
          index={ index }
          setIngredientsProgress={ setIngredientsProgress }
          title={ title }
          ingredientsProgress={ ingredientsProgress[index] === true }
          allIngs={ ingredientsProgress }
          ings={ ingredients }
        />) : null;
    })
  );
}

export default ListCheckBox;
