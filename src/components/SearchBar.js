import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesAppContext from '../context/RecipesAppContext';
import { radioIngredientsApi, radioNamesApi,
  radioFirstLetterApi, radioDrinksIngredientsApi,
  radioDrinksNamesApi, radioDrinksFirstLetterApi } from '../services/radioInputApi';
import iconSearch from '../images/searchIcon.svg';

function SearchBar() {
  const { searchInput,
    radioInput,
    setRadioinput, setFoods, setDrinks, setSearchInput } = useContext(RecipesAppContext);
  const [searching, setSearching] = useState(false);
  const history = useHistory();

  const verificaArray = (arr) => {
    const id = history.location.pathname === '/meals' ? 'idMeal' : 'idDrink';
    const set = history.location.pathname === '/meals' ? setFoods : setDrinks;
    if (arr === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
      console.log(arr);
    } else if (arr.length > 1) {
      const limite = 12;
      const arrLimite = arr.filter((_a, index) => index < limite);
      set(arrLimite);
    } else if (arr.length === 1) {
      history.push(`${history.location.pathname}/${arr[0][id]}`);
    }
  };

  const searchClickMeals = async () => {
    let result = [];
    if (radioInput === 'ingredient') result = await radioIngredientsApi(searchInput);
    if (radioInput === 'name') result = await radioNamesApi(searchInput);
    if (radioInput === 'first-letter') {
      if (searchInput.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        result = await radioFirstLetterApi(searchInput);
      }
    }
    verificaArray(result);
  };

  const searchClickDrinks = async () => {
    let result = [];
    if (radioInput === 'ingredient') {
      result = await radioDrinksIngredientsApi(searchInput);
    }
    if (radioInput === 'name') result = await radioDrinksNamesApi(searchInput);
    if (radioInput === 'first-letter') {
      if (searchInput.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        result = await radioDrinksFirstLetterApi(searchInput);
      }
    }
    verificaArray(result);
  };

  const searchClick = async () => {
    if (history.location.pathname === '/meals') {
      await searchClickMeals();
    } else {
      await searchClickDrinks();
    }
  };

  return (
    <div className="search-bar">
      <button
        onClick={ () => setSearching((previoStat) => !previoStat) }
        type="button"
        className="search-icon"
      >
        <img alt="iconSearch" src={ iconSearch } data-testid="search-top-btn" />
      </button>
      { searching && (
        <>
          <input
            type="text"
            data-testid="search-input"
            onChange={ ({ target: { value } }) => setSearchInput(value) }
          />
          <button
            type="button"
            data-testid="exec-search-btn"
            onClick={ searchClick }
            className="search-btn"
          >
            Search
          </button>
          <label htmlFor="ingredient">
            Ingredients
            <input
              type="radio"
              data-testid="ingredient-search-radio"
              name="searchBar"
              value="ingredient"
              onChange={ ({ target: { value } }) => setRadioinput(value) }
            />
          </label>
          <label htmlFor="name">
            Name
            <input
              type="radio"
              data-testid="name-search-radio"
              name="searchBar"
              value="name"
              onChange={ ({ target: { value } }) => setRadioinput(value) }
            />
          </label>
          <label htmlFor="first-letter">
            First letter
            <input
              type="radio"
              data-testid="first-letter-search-radio"
              name="searchBar"
              value="first-letter"
              onChange={ ({ target: { value } }) => setRadioinput(value) }
            />
          </label>
        </>
      )}
    </div>
  );
}

export default SearchBar;
