import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test/test-utils';
import { LoginPage } from './LoginPage';
import authService from '../../services/authService';

vi.mock('../../services/authService', () => ({
  default: {
    login: vi.fn(),
    getMe: vi.fn(),
  },
  authService: {
    login: vi.fn(),
    getMe: vi.fn(),
  },
}));

describe('LoginPage Component (Requisitos 5, 7 e 8)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('exibe erros de validação Zod ao tentar submeter o formulário vazio', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginPage />);

    const submitButton = screen.getByRole('button', { name: /entrar no sistema/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('O nome de usuário é obrigatório.')).toBeInTheDocument();
      expect(screen.getByText('A senha é obrigatória.')).toBeInTheDocument();
    });

    expect(authService.login).not.toHaveBeenCalled();
  });

  it('preenche campos de login ao clicar no botão de credenciais de demonstração', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginPage />);

    const fillButton = screen.getByText('Preencher');
    await user.click(fillButton);

    const userInput = screen.getByLabelText(/nome de usuário/i) as HTMLInputElement;
    const passInput = screen.getByLabelText(/senha/i) as HTMLInputElement;

    expect(userInput.value).toBe('emilys');
    expect(passInput.value).toBe('emilyspass');
  });

  it('chama a função de login com os dados corretos ao preencher credenciais válidas', async () => {
    const user = userEvent.setup();
    vi.mocked(authService.login).mockResolvedValueOnce({
      id: 1,
      username: 'emilys',
      email: 'emily.johnson@x.dummyjson.com',
      firstName: 'Emily',
      lastName: 'Johnson',
      token: 'valid-jwt-token-12345',
    });

    renderWithProviders(<LoginPage />);

    const userInput = screen.getByLabelText(/nome de usuário/i);
    const passInput = screen.getByLabelText(/senha/i);
    const submitButton = screen.getByRole('button', { name: /entrar no sistema/i });

    await user.type(userInput, 'emilys');
    await user.type(passInput, 'emilyspass');
    await user.click(submitButton);

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledTimes(1);
      expect(authService.login).toHaveBeenCalledWith({
        username: 'emilys',
        password: 'emilyspass',
      });
    });
  });
});
