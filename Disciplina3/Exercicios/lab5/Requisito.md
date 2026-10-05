# 🛠️ Laboratório 5
## Suíte de Testes Automatizados (Unitários e E2E) no Supermercado com IA

> **Objetivo:** Implementar uma suíte completa de testes automatizados para a aplicação **Supermercado**, cobrindo testes unitários e de componentes com **Vitest** e **React Testing Library**, além de testes End-to-End (E2E) de fluxos críticos com **Playwright**, utilizando o apoio de IA para acelerar a escrita dos testes.

---

## ⚙️ Antes de Iniciar: Configuração do Ambiente

1. **Clonar o Repositório:**
   Clone a aplicação **Supermercado**, disponível no repositório da disciplina:
   - 🔗 [Repositório da Disciplina (dev-web-react)](https://github.com/pos-web-utfpr/dev-web-react)

2. **Instalar Dependências:**
   ```bash
   yarn install
   ```

3. **Scripts de Teste Disponíveis (`package.json`):**
   ```json
   {
     "test": "vitest",
     "test:run": "vitest run",
     "test:e2e": "playwright test",
     "test:e2e:ui": "playwright test --ui"
   }
   ```

---

## 🧪 Tarefa 1: Adição de Novos Casos de Teste Unitário em Helpers

> **Arquivo-alvo:** `src/helpers/product-utils.test.ts`

Adicione novos casos de teste com **Vitest** para cobrir cenários ainda não testados:

- [ ] **Ordenação Descendente por Quantidade:**
  - Testar a função `sortProducts(mockProducts, "quantidade", "desc")`.
- [ ] **Paginação com `pageSize` Maior que o Total:**
  - Testar `paginateProducts` verificando o comportamento quando o tamanho da página (`pageSize`) for superior ao total de itens disponíveis no array.

### 🔍 Validação:
Execute o comando no terminal e confirme a aprovação dos testes:
```bash
yarn test:run
```

---

## 🤖 Tarefa 2: Geração de Casos de Teste de Borda com IA

> **Arquivo-alvo:** `src/helpers/formatters.test.ts`

Utilize o assistente de IA para sugerir novos casos de teste de borda (*edge cases*) para o utilitário de formatação de moedas (`formatCurrency` em `src/helpers/formatters.ts`).

### 💬 Prompt Sugerido para a IA:
```text
Com base na função formatCurrency em src/helpers/formatters.ts, gere casos de teste unitários adicionais em Vitest para validar cenários com dízimas decimais (ex: 9.999), centavos isolados (ex: 0.05) e números grandes na casa dos milhões. Retorne o bloco it(...) pronto para ser adicionado ao arquivo src/helpers/formatters.test.ts.
```

### 📋 Ações:
- [ ] Adicionar os casos de teste sugeridos ao arquivo `src/helpers/formatters.test.ts`.
- [ ] Validar a execução dos testes:
  ```bash
  yarn test:run
  ```

---

## 🎭 Tarefa 3: Automação de Fluxo E2E Inédito com Playwright (Exclusão de Produto)

> **Arquivo-alvo:** `e2e/products.spec.ts` ou `e2e/product-delete.spec.ts`

Implemente um novo cenário de teste automatizado para o fluxo de **Exclusão de Produto**:

### 🗺️ Passo a passo do fluxo:
1. **Autenticação:**
   - Realizar login com as credenciais:
     - **E-mail:** `fulano@qa.com`
     - **Senha:** `teste`
2. **Navegação:**
   - Acessar a rota `/app/produtos`.
3. **Ação de Exclusão:**
   - Localizar um produto específico na tabela.
   - Clicar no botão de exclusão (ícone de lixeira 🗑️).
4. **Confirmação:**
   - No modal de confirmação do Mantine, clicar no botão de confirmação.
5. **Asserção:**
   - Validar que o produto removido não está mais presente na listagem da tabela.

### 🖥️ Execução Visual com Playwright:
```bash
yarn test:e2e:ui
```

---

## 🎯 Resultado Esperado

Suíte de testes da aplicação **Supermercado ERP** ampliada de forma simples e incremental:
- [x] Novos testes unitários em helpers com **Vitest**.
- [x] Cobertura de edge cases em formatação com apoio de **IA**.
- [x] Automação completa do fluxo E2E de exclusão de produto com **Playwright**.

---

## 📦 Checklist de Entrega

- [ ] Repositório configurado e dependências instaladas.
- [ ] Testes de `product-utils.test.ts` implementados e passando.
- [ ] Testes de borda em `formatters.test.ts` implementados e passando.
- [ ] Teste E2E de exclusão implementado no Playwright.
- [ ] Execução de `yarn test:run` e `yarn test:e2e` 100% aprovada.