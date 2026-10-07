import { test, expect } from '@playwright/test';

test.describe('Fluxo E2E 1: Autenticação e Rota Protegida (Requisito 9)', () => {
  test('deve bloquear acesso direto a /admin e redirecionar após login bem-sucedido', async ({ page }) => {
    // 1. Tentar acessar a área administrativa sem autenticação
    await page.goto('/admin');

    // 2. Validar redirecionamento automático para a tela de login
    await expect(page).toHaveURL(/.*\/login/);
    await expect(page.getByRole('heading', { name: /área de autenticação/i })).toBeVisible();

    // 3. Preencher credenciais válidas
    await page.getByLabel(/nome de usuário/i).fill('avat');
    await page.getByLabel(/senha/i).fill('avatpass');

    // 4. Submeter formulário
    await page.getByRole('button', { name: /entrar no sistema/i }).click();

    // 5. Validar que foi redirecionado para a rota protegida /admin
    await expect(page).toHaveURL(/.*\/admin/);
    await expect(page.getByText('Painel Administrativo')).toBeVisible();
    await expect(page.getByRole('heading', { name: /gestão de produtos/i })).toBeVisible();
  });
});
