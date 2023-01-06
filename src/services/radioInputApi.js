export const radioIngredientsApi = async (ingrediente) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
  const results = await response.json();
  return results.meals;
};

export const radioNamesApi = async (nome) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`);
  const results = await response.json();
  return results.meals;
};

export const radioFirstLetterApi = async (primeiraLetra) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraLetra}`);
  const results = await response.json();
  console.log(primeiraLetra);
  return results.meals;
};

export const radioDrinksIngredientsApi = async (ingrediente) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
  const results = await response.json();
  return results.drinks;
};

export const radioDrinksNamesApi = async (nome) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`);
  const results = await response.json();
  return results.drinks;
};

export const radioDrinksFirstLetterApi = async (primeiraLetra) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${primeiraLetra}`);
  const results = await response.json();
  return results.drinks;
};
