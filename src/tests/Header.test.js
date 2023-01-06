import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
// import Header from '../components/Header';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const searchIconId = 'search-top-btn';

describe('testando o componente Header', () => {
  test('testando profile e search do comp Header', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });

    const profileIcon = screen.getByTestId('profile-top-btn');
    const searchIcon = screen.getByTestId(searchIconId);
    const title = screen.getByTestId('page-title');
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    expect(title).toHaveTextContent('Meals');
  });
  test('testando o evento click nos inputs', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });

    const searchIcon = screen.getByTestId(searchIconId);
    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });
});

describe('Testando funções', () => {
  test('Testando link do profile', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });

    const profileIcon = screen.getByTestId('profile-top-btn');
    userEvent.click(profileIcon);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/profile');
    });
  });

  test('Testando buscas', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });

    const searchIcon = screen.getByTestId(searchIconId);
    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'Co');
  });
});
