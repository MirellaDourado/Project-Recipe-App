import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import meals from './mocks/meals';
import drinks from './mocks/drinks';
import mealsCategories from './mocks/mealsCategories';
import drinksCategories from './mocks/drinksCategories';

const bigMacPath = '/meals/53013/in-progress';
const acePath = '/drinks/17225/in-progress';

jest
  .fn()
  .mockReturnValue(meals)
  .mockReturnValueOnce(drinks)
  .mockReturnValueOnce(mealsCategories)
  .mockReturnValueOnce(drinksCategories);

afterEach(() => {
  jest.clearAllMocks();
});

describe('Testa o componente RecipeInProgress com meals se', () => {
  it('o botão fica abilitado somente quando todos os checkbox forem clicados', async () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push(bigMacPath);
    });

    const h2 = await screen.findByText('Big Mac');
    expect(h2).toBeInTheDocument();
    const finishBtn = await screen.findByTestId('finish-recipe-btn');
    expect(finishBtn).toBeDisabled();
    const allCheckbox = await screen.findAllByRole('checkbox');
    expect(allCheckbox).toHaveLength(14);
    allCheckbox.forEach((element) => (
      userEvent.click(element)));
    expect(finishBtn).toBeEnabled();
    userEvent.click(finishBtn);
  });

  it('se é possivel favoritar e desfavoritar a receita', async () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push(bigMacPath);
    });

    const h2 = await screen.findByText('Big Mac');
    expect(h2).toBeInTheDocument();
    const favBtn = await screen.findByTestId('favorite-btn');
    expect(favBtn).toBeInTheDocument();
    userEvent.click(favBtn);
    expect(favBtn).toHaveAttribute('src', 'blackHeartIcon.svg');
    userEvent.click(favBtn);
    expect(favBtn).toHaveAttribute('src', 'whiteHeartIcon.svg');
  });

  it('é possível copiar o endereço da receita', async () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push(bigMacPath);
    });

    const h2 = await screen.findByText('Big Mac');
    expect(h2).toBeInTheDocument();
    const copyBtn = await screen.findByTestId('share-btn');
    expect(copyBtn).toBeInTheDocument();
    userEvent.click(copyBtn);
  });
});

describe('Testa o componente RecipeInProgress com drinks se', () => {
  it('o botão fica abilitado somente quando todos os checkbox forem clicados', async () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push(acePath);
    });

    const h2 = await screen.findByText('Ace');
    expect(h2).toBeInTheDocument();
    const finishBtn = await screen.findByTestId('finish-recipe-btn');
    expect(finishBtn).toBeDisabled();
    const allCheckbox = await screen.findAllByRole('checkbox');
    expect(allCheckbox).toHaveLength(5);
    allCheckbox.forEach((element) => (
      userEvent.click(element)));
    expect(finishBtn).toBeEnabled();
    userEvent.click(finishBtn);
  });

  it('se é possivel favoritar e desfavoritar a receita', async () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push(acePath);
    });

    const h2 = await screen.findByText('Ace');
    expect(h2).toBeInTheDocument();
    const favBtn = await screen.findByTestId('favorite-btn');
    expect(favBtn).toBeInTheDocument();
    userEvent.click(favBtn);
    expect(favBtn).toHaveAttribute('src', 'blackHeartIcon.svg');
    userEvent.click(favBtn);
    expect(favBtn).toHaveAttribute('src', 'whiteHeartIcon.svg');
  });

  it('é possível copiar o link da receita', async () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push(acePath);
    });

    const h2 = await screen.findByText('Ace');
    expect(h2).toBeInTheDocument();
    const copyBtn = await screen.findByTestId('share-btn');
    expect(copyBtn).toBeInTheDocument();
    userEvent.click(copyBtn);
  });
});
