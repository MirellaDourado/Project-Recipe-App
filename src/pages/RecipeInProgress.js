import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { TbArrowNarrowLeft } from 'react-icons/tb';
import copy from 'clipboard-copy';
import { fetchDrinksById } from '../services/drinksAPI';
import { fetchFoodById } from '../services/foodsAPI';
import '../styles/RecipeInProgress.css';
import RecipesAppContext from '../context/RecipesAppContext';
// import DifferentHeader from '../components/DifferentHeader';
import RecipeContent from '../components/RecipeContent';
import { getFavs, saveFav } from '../services/localStorage';
import '../styles/RecipeDefinitions.css';
import Loading from '../components/Loading';

function RecipeInProgress({ type }) {
  const history = useHistory();
  const { isDisabled, setDisabled } = useContext(RecipesAppContext);
  const [thisRecipe, setThisRecipe] = useState({});
  const [measure, setMeasure] = useState([]);
  const [ingredient, setIngredient] = useState([]);
  const [ingredientsProgress, setIngredientsProgress] = useState([]);
  const { loading, setLoading } = useContext(RecipesAppContext);
  const title = type === 'meals' ? thisRecipe.strMeal : thisRecipe.strDrink;
  const thumb = type === 'meals' ? thisRecipe.strMealThumb : thisRecipe.strDrinkThumb;
  const cat = type === 'meals' ? thisRecipe.strCategory : thisRecipe.strAlcoholic;
  const [favorited, setFavorited] = useState(false);
  const id = history.location.pathname.match(/\d+/)[0];

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const getIbyPath = async () => {
      const recipe = await type === 'meals'
        ? await fetchFoodById(id) : await fetchDrinksById(id);
      setThisRecipe(recipe[0]);
    };
    getIbyPath();
    if (getFavs()) {
      const favorites = JSON.parse(getFavs());
      const isFovorite = favorites.some((item) => item.id === id);
      if (isFovorite) {
        setFavorited(true);
      }
    }
  }, []);

  useEffect(() => {
    const fifth = 15;
    const getIngredients = async () => {
      const arrIng = [];
      const arrMeasure = [];
      for (let i = 1; i <= fifth; i += 1) {
        arrIng.push(thisRecipe[`strIngredient${i}`]);
        arrMeasure.push(thisRecipe[`strMeasure${i}`]);
      }
      setIngredient(arrIng);
      setMeasure(arrMeasure);
    };
    getIngredients();
    setLoading(false);
    const recipesInProg = async () => {
      if (JSON.parse(localStorage.getItem('inProgressRecipes'))) {
        const a = JSON.parse(localStorage.getItem('inProgressRecipes'))[title];
        if (a) {
          setIngredientsProgress(a);
          const ings = [];
          for (let i = 1; i <= fifth; i += 1) {
            ings.push(thisRecipe[`strIngredient${i}`]);
          }
          setDisabled((ings
            .filter((az) => az !== '' && az !== null).length !== a
            .filter((az) => az === true).length));
        }
      }
    };
    recipesInProg();
  }, [thisRecipe]);

  const handleClick = () => {
    history.goBack();
    setLoading(true);
  };

  const favoriteClick = () => {
    const favorite = {
      id,
      type: type.substring(0, type.length - 1),
      nationality: thisRecipe.strArea,
      category: thisRecipe.strCategory,
      name: title,
      image: thumb,
      alcoholicOrNot: '',
    };
    if (type === 'drinks') {
      favorite.alcoholicOrNot = thisRecipe.strAlcoholic;
      favorite.nationality = '';
    }
    if (!favorited) {
      if (getFavs()) {
        const favs = JSON.parse(getFavs());
        favs.push(favorite);
        saveFav(JSON.stringify(favs));
      } else {
        const favs = [favorite];
        saveFav(JSON.stringify(favs));
      }
    } else {
      const favs = JSON.parse(getFavs());
      const newFavs = favs.filter((item) => item.id !== id);
      saveFav(JSON.stringify(newFavs));
    }
    setFavorited(!favorited);
  };

  const shareClick = () => {
    const url = window.location.href;
    copy(url.replace('/in-progress', ''));
    const time = 10000;
    setCopied(true);
    setTimeout(setCopied, time);
  };

  const handleFinish = () => {
    const drinkOrMeal = type === 'meals' ? 'meal' : 'drink';
    const alcoholicOrNot = type === 'meals' ? '' : thisRecipe.strAlcoholic;
    const nationality = type === 'meals' ? thisRecipe.strArea : '';
    const local = JSON.parse(localStorage.getItem('doneRecipes'));
    const findId = type === 'meals' ? 'idMeal' : 'idDrink';
    const tags = type !== 'meals' || thisRecipe.strTags === null ? []
      : thisRecipe.strTags.split(',');
    const date = new Date();
    const obj = {
      id: thisRecipe[findId],
      type: drinkOrMeal,
      nationality,
      category: thisRecipe.strCategory,
      alcoholicOrNot,
      name: title,
      image: thumb,
      doneDate: date,
      tags,
    };
    if (local) {
      if (!local.some((el) => el[findId] === thisRecipe[findId])) {
        local.push(obj);
        localStorage.setItem('doneRecipes', JSON.stringify(local));
      }
    } else {
      const arr = [];
      arr.push(obj);
      localStorage.setItem('doneRecipes', JSON.stringify(arr));
    }
    history.push('/done-recipes');
  };

  return (
    <main className="recipe-in-progress">
      {loading || title === undefined ? <Loading /> : (
        <>
          <div className="div-recipe-img">
            <TbArrowNarrowLeft
              className="arrow-left"
              onClick={ handleClick }
            />
            <img
              src={ thumb }
              alt={ title }
              data-testid="recipe-photo"
            />
          </div>
          {/* <DifferentHeader
            title={ title }
            favoriteClick={ favoriteClick }
            shareClick={ shareClick }
            favorited={ favorited }
          /> */}
          <RecipeContent
            favoriteClick={ favoriteClick }
            favorited={ favorited }
            shareClick={ shareClick }
            copied={ copied }
            ingredients={ ingredient }
            measure={ measure }
            type={ type }
            title={ title }
            setIngredientsProgress={ setIngredientsProgress }
            instructions={ thisRecipe.strInstructions }
            ingredientsProgress={ ingredientsProgress }
            cat={ cat }
          />
          <button
            data-testid="finish-recipe-btn"
            className="finish-recipe-btn"
            type="button"
            onClick={ () => handleFinish() }
            disabled={ isDisabled }
          >
            FINISH
          </button>
        </>)}
    </main>
  );
}

RecipeInProgress.propTypes = {
  type: PropTypes.string.isRequired,
};

export default RecipeInProgress;
