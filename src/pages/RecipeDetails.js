import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import { TbArrowNarrowLeft } from 'react-icons/tb';
import { fetchDrinksById, drinksAPI } from '../services/drinksAPI';
import { fetchFoodById, foodsAPI } from '../services/foodsAPI';
import { getFavs, saveFav, getInProgress } from '../services/localStorage';
import '../styles/RecipeDefinitions.css';
// import DifferentHeader from '../components/DifferentHeader';
import RecipeContent from '../components/RecipeContent';
import RecipesAppContext from '../context/RecipesAppContext';
import Loading from '../components/Loading';

function RecipeDetails({ type, match }) {
  const { setLoading, loading } = useContext(RecipesAppContext);
  const { id } = match.params;
  const [recipe, setRecipe] = useState([]);
  const [video, setvideo] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [copied, setCopied] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [statusProgress, setStatusProgress] = useState('Start');
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    const test = async () => {
      const thisRecipe = await type === 'meals'
        ? await fetchFoodById(id) : await fetchDrinksById(id);
      const allRecipes = await type === 'meals'
        ? await drinksAPI().then((items) => items.drinks)
        : await foodsAPI().then((items) => items.meals);
      setRecipe(thisRecipe[0]);
      setRecipes(allRecipes);
      if (type === 'meals') {
        const ytVideo = thisRecipe[0].strYoutube;
        const a = ytVideo.replace('watch?v=', 'embed/');
        setvideo(a);
      }
    };
    test();
    if (getFavs()) {
      const favorites = JSON.parse(getFavs());
      const isFovorite = favorites.some((item) => item.id === id);
      if (isFovorite) {
        setFavorited(true);
      }
    }
    if (getInProgress()) {
      const recipesInProgress = JSON.parse(getInProgress());
      const recipeKeys = Object.keys(JSON.parse(getInProgress()));
      const inProgressRecipesKeys = Object.keys(recipesInProgress[recipeKeys[0]]);
      if (inProgressRecipesKeys.includes(id)) {
        setStatusProgress('Continue');
      }
    }
  }, [id]);

  useEffect(() => {
    const arrIng = []; const arrMeasure = []; const fifth = 15;
    const getIngredients = async () => {
      for (let i = 1; i <= fifth; i += 1) {
        arrIng.push(recipe[`strIngredient${i}`]);
        arrMeasure.push(recipe[`strMeasure${i}`]);
      }
      setIngredients(arrIng);
      setMeasure(arrMeasure);
    };
    getIngredients();
    const timer = 3000;
    setTimeout(setLoading, timer);
  }, [recipe]);

  const title = type === 'meals' ? recipe.strMeal : recipe.strDrink;
  const thumb = type === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb;
  const cat = type === 'meals' ? recipe.strCategory : recipe.strAlcoholic;

  const handleClick = () => {
    history.goBack();
    setLoading(true);
  };

  const startRecipeClick = () => {
    history.push(`${history.location.pathname}/in-progress`);
  };

  const shareClick = () => {
    const url = window.location.href;
    copy(url);
    const time = 10000;
    setCopied(true);
    setTimeout(setCopied, time);
  };

  const favoriteClick = () => {
    const favorite = {
      id,
      type: type.substring(0, type.length - 1),
      nationality: recipe.strArea,
      category: recipe.strCategory,
      name: title,
      image: thumb,
      alcoholicOrNot: '',
    };
    if (type === 'drinks') {
      favorite.alcoholicOrNot = recipe.strAlcoholic;
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

  return (
    <main className="recipe">
      { loading ? <Loading /> : (
        <>
          <TbArrowNarrowLeft
            className="arrow-left"
            onClick={ handleClick }
          />
          {/* <DifferentHeader
            title={ title }
            favoriteClick={ favoriteClick }
            shareClick={ shareClick }
            favorited={ favorited }
          /> */}
          <div className="div-recipe-img">
            <img
              data-testid="recipe-photo"
              src={ thumb }
              alt={ title }
            />
          </div>
          <RecipeContent
            favoriteClick={ favoriteClick }
            favorited={ favorited }
            shareClick={ shareClick }
            copied={ copied }
            ingredients={ ingredients }
            measure={ measure }
            type={ type }
            title={ title }
            video={ video }
            instructions={ recipe.strInstructions }
            recipes={ recipes }
            cat={ cat }
          />
          <footer
            className="position-fixed fixed-bottom footer-recipe"
            data-testid="footer"
          >
            <button
              className="start-recipe-btn"
              data-testid="start-recipe-btn"
              type="button"
              onClick={ startRecipeClick }
            >
              {`${statusProgress} Recipe`}
            </button>
          </footer>
        </>)}
    </main>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  type: PropTypes.string.isRequired,
};

export default RecipeDetails;
