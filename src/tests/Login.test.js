import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testa o App de Receitas', () => {
  test('Se o botão desabilita ao preencher os inputs corretamente', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: 'Enter' });
    expect(button).toBeDisabled();
    userEvent.type(inputEmail, 'test@trybe.com');
    userEvent.type(inputPassword, '1234567');
    expect(button).toBeEnabled();
  });
  test('Se ao clicar no botão a página é redirecionada e o email é salvo no local storange', () => {
    const { history } = renderWithRouter(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: 'Enter' });
    expect(button).toBeDisabled();
    userEvent.type(inputEmail, 'test@trybe.com');
    userEvent.type(inputPassword, '1234567');
    expect(button).toBeEnabled();
    userEvent.click(button);
    expect(history.location.pathname).toBe('/meals');
  });
});
