import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
// import Profile from '../pages/Profile';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testa o App de Receitas, pagina do Profile', () => {
  test('Se esta renderizando corretamente a pagina do profile ', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/profile');
    });

    const buttonDone = screen.getByRole('button', { name: /Done Recipes/i });
    const buttonFavorite = screen.getByRole('button', { name: /Favorite Recipes/i });
    const buttonLogout = screen.getByRole('button', { name: /Logout/i });

    expect(buttonDone).toBeInTheDocument();
    expect(buttonFavorite).toBeInTheDocument();
    expect(buttonLogout).toBeInTheDocument();
  });
});

describe('Testando redirecionamento', () => {
  it('Testando botão Done recipes', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/profile');
    });

    const buttonDone = screen.getByRole('button', { name: /Done Recipes/i });
    userEvent.click(buttonDone);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/done-recipes');
    });
  });

  it('Testando botão Favorite recipes', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/profile');
    });

    const buttonFavorite = screen.getByRole('button', { name: /Favorite Recipes/i });
    userEvent.click(buttonFavorite);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/favorite-recipes');
    });
  });

  it('Testando botão de logout', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/profile');
    });

    const buttonLogout = screen.getByRole('button', { name: /Logout/i });
    userEvent.click(buttonLogout);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/');
    });
  });
});

describe('Testando user', () => {
  it('Testando se o email aparece na tela', async () => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => JSON.stringify({
          email: 'test@test.com',
        })),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/profile');
    });

    await waitFor(() => {
      expect(screen.getByTestId('profile-email')).toHaveTextContent('test@test.com');
      expect(window.localStorage.getItem).toHaveBeenCalled();
    });
  });
});
