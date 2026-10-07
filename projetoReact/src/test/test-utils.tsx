import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { CartProvider } from '../contexts/CartContext';
import { theme } from '../styles/theme';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  routerInitialEntries?: MemoryRouterProps['initialEntries'];
}

export function renderWithProviders(
  ui: ReactElement,
  options: CustomRenderOptions = {},
) {
  const { routerInitialEntries = ['/'], ...renderOptions } = options;

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <MemoryRouter initialEntries={routerInitialEntries}>
        <MantineProvider theme={theme}>
          <AuthProvider>
            <CartProvider>{children}</CartProvider>
          </AuthProvider>
        </MantineProvider>
      </MemoryRouter>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';
