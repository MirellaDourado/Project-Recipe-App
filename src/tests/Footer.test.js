import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '../components/Footer';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa o App de Receitas', () => {
  test('Se o ícone de drinks redireciona para a página "/drinks"', () => {
    const { history } = renderWithRouter(<Footer />);
    const buttonDrink = screen.getByRole('button', { name: /button-drinks/i });
    userEvent.click(buttonDrink);
    expect(history.location.pathname).toBe('/drinks');
  });
  test('Se o ícone de meals redireciona para a página "/meals"', () => {
    const { history } = renderWithRouter(<Footer />);
    const buttonMeals = screen.getByRole('button', { name: /button-meals/i });
    userEvent.click(buttonMeals);
    expect(history.location.pathname).toBe('/meals');
  });
});
