export const foodsAPI = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(endpoint).then((res) => res.json());
  return response;
};

export const foodsCategoryAPI = async () => {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(endpoint).then((res) => res.json());
  return response;
};

export const fetchFoodById = async (id) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const fetching = await fetch(url).then((res) => res.json());
  return fetching.meals;
};

export const fetchFoodByCategory = async (cat) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`;
  const fetching = await fetch(url).then((res) => res.json());
  return fetching.meals;
};
