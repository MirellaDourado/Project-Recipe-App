import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import copy from 'clipboard-copy';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

jest.mock('clipboard-copy');

// rota para a pag DoneRecipes //
const doneRecipes = '/done-recipes';

const mealAndDrinks = [{
  id: '17256',
  type: 'drink',
  nationality: '',
  category: 'Cocktail',
  alcoholicOrNot: 'Alcoholic',
  name: 'Martinez 2',
  image: 'https://www.thecocktaildb.com/images/media/drink/fs6kiq1513708455.jpg',
  doneDate: '27/02/2022',
  tags: [],
},
{ id: '52977',
  type: 'meal',
  nationality: 'Turkish',
  category: 'Side',
  alcoholicOrNot: '',
  name: 'Corba',
  image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  doneDate: '15/05/2022',
  tags: ['Soup'],
},
];
describe('', () => {
  test('', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mealAndDrinks));
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(doneRecipes);
    });
    const filterAll = screen.getByTestId('filter-by-all-btn');
    expect(filterAll).toBeInTheDocument();
    const filterMeal = screen.getByTestId('filter-by-meal-btn');
    expect(filterMeal).toBeInTheDocument();
    const filterDrinks = screen.getByTestId('filter-by-drink-btn');
    expect(filterDrinks).toBeInTheDocument();
  });

  test('', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mealAndDrinks));
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push(doneRecipes);
    });

    const corba = screen.getByText(/Corba/i);
    expect(corba).toBeInTheDocument();
    const martinez2 = screen.getByText(/Martinez 2/i);
    expect(martinez2).toBeInTheDocument();
  });
  test('testando LinkCopied', async () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push(doneRecipes);
    });
    copy.mockImplementation(() => {});

    const copyLink = screen.getByTestId(/0-horizontal-share-btn/i);

    userEvent.click(copyLink);

    expect(copy).toHaveBeenCalled();
    waitFor(() => {
      const link = screen.getByText('Link copied!');
      expect(link).toBeInTheDocument();
    });
  });
  test('', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mealAndDrinks));
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(doneRecipes);
    });
    expect(screen.getByAltText('Corba')).toBeInTheDocument();
    expect(screen.getByAltText('Martinez 2')).toBeInTheDocument();
  });
  test('', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mealAndDrinks));
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(doneRecipes);
    });
    const btnAll = screen.getByTestId('filter-by-all-btn');
    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnAll);
    const corba = await screen.findByText('Corba');
    expect(corba).toBeInTheDocument();
  });
  test('', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mealAndDrinks));
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(doneRecipes);
    });
    const btnMeals = screen.getByTestId('filter-by-meal-btn');
    expect(btnMeals).toBeInTheDocument();
    userEvent.click(btnMeals);
    const corba = await screen.findByText('Corba');
    expect(corba).toBeInTheDocument();
  });
  test('', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mealAndDrinks));
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(doneRecipes);
    });
    const btnDrink = screen.getByTestId('filter-by-drink-btn');
    expect(btnDrink).toBeInTheDocument();
    userEvent.click(btnDrink);
    const martinez = await screen.findByText(/Martinez/i);
    expect(martinez).toBeInTheDocument();
  });
});
