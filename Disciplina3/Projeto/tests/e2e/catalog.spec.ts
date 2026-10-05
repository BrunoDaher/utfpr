import { test, expect } from '@playwright/test';

test.describe('Fluxo E2E 2: Busca, Detalhes e Carrinho de Compras (Requisito 9)', () => {
  test('deve buscar produto, navegar para detalhes e adicionar ao carrinho', async ({ page }) => {
    // 1. Acessar a página inicial do catálogo
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /catálogo de produtos/i })).toBeVisible();

    // 2. Realizar busca por termo no catálogo
    const searchInput = page.getByLabel('Buscar produtos');
    await searchInput.fill('essence');

    // Aguardar resultado da busca filtrada
    const detailsButton = page.getByRole('button', { name: /detalhes/i }).first();
    await expect(detailsButton).toBeVisible({ timeout: 10000 });

    // 3. Clicar no botão de detalhes do produto
    await detailsButton.click();

    // 4. Validar transição para a rota dinâmica de detalhes
    await expect(page).toHaveURL(/.*\/produtos\/\d+/);
    await expect(page.getByRole('button', { name: /adicionar ao carrinho/i })).toBeVisible();

    // 5. Clicar para adicionar ao carrinho
    await page.getByRole('button', { name: /adicionar ao carrinho/i }).click();

    // 6. Validar atualização do badge ou contador de itens no cabeçalho
    const cartLink = page.getByRole('link', { name: /carrinho/i });
    await expect(cartLink).toContainText('1');

    // 7. Navegar até a página do carrinho e validar presença do item
    await cartLink.click();
    await expect(page).toHaveURL(/.*\/carrinho/);
    await expect(page.getByRole('heading', { name: /carrinho de compras/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /finalizar compra/i })).toBeVisible();
  });
});
