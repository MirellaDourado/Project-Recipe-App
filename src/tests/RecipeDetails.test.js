import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import meals from './mocks/meals';
import drinks from './mocks/drinks';

const timbitsPath = '/meals/52929';
const atntPath = '/drinks/13938';
const blackHeartSrc = 'blackHeartIcon.svg';
const startBtnId = 'start-recipe-btn';

const favorites = [{
  id: '52929',
  type: 'meal',
  alcoholicOrNot: '',
}];

const atntfav = [{
  alcoholicOrNot: 'Alcoholic',
  category: 'Ordinary Drink',
  id: '13938',
  nationality: '',
  type: 'drink',
}];

const inProgressRecipes = [{
  drinks: {
    178319: [],
  },
}];

jest
  .fn()
  .mockReturnValue(meals)
  .mockReturnValueOnce(drinks);

afterEach(() => {
  jest.clearAllMocks();
});

const recipePhotoId = 'recipe-photo';
const favoriteId = 'favorite-btn';

describe('Testando os elementos do componente RecipeDetails', () => {
  it('Testa a requisição de meals:id', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(timbitsPath);
    });
    expect(screen.getByTestId('video')).toBeInTheDocument();
    expect(screen.getByTestId(startBtnId)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId(recipePhotoId)).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/txsupu1511815755.jpg');
    });
  });

  it('Testando a requisição de drinks:id', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(atntPath);
    });
    await waitFor(() => {
      expect(screen.getByTestId(recipePhotoId)).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/media/drink/rhhwmp1493067619.jpg');
    });

    expect(screen.getByTestId(recipePhotoId)).toBeInTheDocument();
    expect(screen.getByTestId('recipe-title')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
    for (let i = 0; i < 3; i += 1) {
      const testId = `${i}-ingredient-name-and-measure`;
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    }
  });

  it('Testa o carousel', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(timbitsPath);
    });
    await waitFor(() => {
      expect(screen.getByTestId(recipePhotoId)).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/txsupu1511815755.jpg');
    });

    for (let i = 0; i < 6; i += 1) {
      const testId = `${i}-recommendation-card`;
      expect(screen.getByTestId(testId)).toBeInTheDocument();
    }
    expect(screen.getByTestId('0-recommendation-card')).toHaveTextContent('GG');
  });
});

describe('Testanto features do componente', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
  });

  it('Testando botão Start Recipe', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(timbitsPath);
    });
    userEvent.click(screen.getByTestId(startBtnId));

    await waitFor(() => {
      expect(history.location.pathname).toBe(`${timbitsPath}/in-progress`);
    });
  });

  //   document.execCommand = jest.fn();

  it('Testando botão share', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(timbitsPath);
    });
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    // userEvent.click(screen.getByTestId('share-btn'));

    // await waitFor(() => {
    //   expect(screen.getByText('Link copied!')).toBeInTheDocument();
    // });
  });

  it('Testando botão favorite', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(timbitsPath);
    });
    expect(screen.getByTestId(favoriteId)).toHaveAttribute('src', 'whiteHeartIcon.svg');
    userEvent.click(screen.getByTestId(favoriteId));

    await waitFor(() => {
      expect(screen.getByTestId(favoriteId)).toHaveAttribute('src', blackHeartSrc);
      expect(window.localStorage.getItem).toHaveBeenCalled();
      expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        'favoriteRecipes',
        JSON.stringify(favorites),
      );
    });

    act(() => {
      history.push(timbitsPath);
    });
    await waitFor(() => {
      expect(screen.getByTestId(favoriteId)).toHaveAttribute('src', blackHeartSrc);
      expect(window.localStorage.getItem).toHaveBeenCalled();
    });
  });
});

describe('Testando botão de favoritar', () => {
  // beforeEach(() => {
  //   Object.defineProperty(window, 'localStorage', {
  //     value: {
  //       getItem: jest.fn(() => JSON.stringify(favorites)),
  //       setItem: jest.fn(() => null),
  //     },
  //     writable: true,
  //   });
  // });

  it('Testando drink favorito', async () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => JSON.stringify(atntfav)),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(atntPath);
    });

    userEvent.click(screen.getByTestId(favoriteId));

    act(() => {
      history.push(timbitsPath);
    });

    userEvent.click(screen.getByTestId(favoriteId));
  });

  it('Testando desfavoritar', async () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => JSON.stringify(favorites)),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(timbitsPath);
    });

    userEvent.click(screen.getByTestId(favoriteId));

    await waitFor(() => {
      expect(screen.getByTestId(favoriteId)).not.toHaveAttribute('src', blackHeartSrc);
      expect(window.localStorage.getItem).toHaveBeenCalled();
    });
  });
});

describe('Testando botão de continue', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => JSON.stringify(inProgressRecipes)),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
  });

  it('Testando progresso', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(atntPath);
    });

    await waitFor(() => {
      expect(screen.getByTestId(startBtnId)).toHaveTextContent('Continue Recipe');
    });
  });
});
