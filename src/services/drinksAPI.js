export const drinksAPI = async () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(endpoint).then((res) => res.json());
  return response;
};

export const drinksCategoryAPI = async () => {
  const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(endpoint).then((res) => res.json());
  return response;
};

export const fetchDrinksById = async (id) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const fetching = await fetch(url).then((res) => res.json());
  return fetching.drinks;
};

export const fetchDrinksByCategory = async (cat) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${cat}`;
  const fetching = await fetch(url).then((res) => res.json());
  return fetching.drinks;
};
