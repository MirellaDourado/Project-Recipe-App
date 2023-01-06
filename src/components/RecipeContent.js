import React from 'react';
import PropTypes from 'prop-types';
import Slider from './Slider';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import IngredientList from './IngredientList';
import ListCheckBox from './ListCheckBox';

function RecipeContent({
  favoriteClick, favorited, shareClick,
  copied, ingredients, measure,
  type, title, video, recipes, instructions, cat,
  setIngredientsProgress, ingredientsProgress,
}) {
  return (
    <div className="recipe-content">
      <div className="div-flat-bar">
        <button
          className="share-btn"
          type="button"
          data-testid="share-btn"
          onClick={ shareClick }
        >
          <img
            src={ shareIcon }
            alt="Share Icon"
          />
        </button>
        <div className="flat-bar" />
        <button
          className="fav-btn"
          type="button"
          onClick={ favoriteClick }
        >
          <img
            data-testid="favorite-btn"
            src={ favorited ? blackHeartIcon : whiteHeartIcon }
            alt="Favorite Icon"
          />
        </button>
      </div>
      <div className="a">
        <h2
          data-testid="recipe-title"
        >
          { title }
        </h2>
      </div>
      <p
        className="recipe-category"
        data-testid="recipe-category"
      >
        { cat }
      </p>
      { copied && <span className="copied-warning">Link copied!</span> }
      <h3> Ingredients </h3>
      { recipes.length === 0 ? (
        <ListCheckBox
          title={ title }
          ingredients={ ingredients }
          type={ type }
          measure={ measure }
          ingredientsProgress={ ingredientsProgress }
          setIngredientsProgress={ setIngredientsProgress }
        />)
        : (
          <IngredientList
            ingredients={ ingredients }
            measure={ measure }
            type={ type }
          />)}
      <h3>
        Instructions
      </h3>
      <p data-testid="instructions" className="instructions">
        { instructions }
      </p>
      {
        type === 'meals' && video !== '' ? <iframe
          title={ title }
          src={ video }
          data-testid="video"
          allow="autoplay; encrypted-media"
          allowFullScreen
        /> : null
      }
      { recipes.length !== 0
      && <Slider recipes={ recipes } type={ type } /> }
    </div>
  );
}

RecipeContent.defaultProps = {
  video: '',
  recipes: [],
  ingredientsProgress: [],
  setIngredientsProgress: '',
};

RecipeContent.propTypes = {
  favoriteClick: PropTypes.func.isRequired,
  favorited: PropTypes.bool.isRequired,
  shareClick: PropTypes.func.isRequired,
  copied: PropTypes.bool.isRequired,
  ingredients: PropTypes.shape({
    map: PropTypes.func.isRequired,
  }).isRequired,
  measure: PropTypes.shape([]).isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  video: PropTypes.string,
  recipes: PropTypes.shape([]),
  instructions: PropTypes.string.isRequired,
  cat: PropTypes.string.isRequired,
  ingredientsProgress: PropTypes.shape([]),
  setIngredientsProgress: PropTypes.func,
};

export default RecipeContent;
