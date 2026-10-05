# ⏱️ Plano de Ação e Controle de Testes — 3 Dias
## Projeto Final: React + TypeScript + Mantine UI + CI/CD

> **Objetivo:** Concluir e publicar uma aplicação completa com todos os 10 requisitos técnicos do [Requisitos.md](file:///Users/brunouk/Desktop/Dev/UTFPR/Disciplina3/Projeto/Requisitos.md) no prazo de 3 dias, garantindo cobertura de testes (Vitest + Playwright) e deploy automatizado no GitHub Pages.

---

## 📊 Painel de Progresso Geral

- [x] **Dia 1: Fundação, Camada de Dados, Autenticação e Contextos Globais**
- [x] **Dia 2: Área Pública (Catálogo/Carrinho) e Área Administrativa (CRUD/Formulários)**
- [x] **Dia 3: Bateria de Testes (Vitest/Playwright), CI/CD, Deploy e Documentação Final**

---

## 📅 DIA 1 — Fundação, Arquitetura, Autenticação e Estado Global

### Bloco 1.1: Setup do Repositório e Ferramentas (Manhã)
*Meta: Ter o projeto inicializado com TypeScript estrito, Mantine UI e scripts configurados.*

- [x] **Inicialização do Projeto Vite**
  ```bash
  yarn create vite projeto-final --template react-ts
  cd projeto-final
  yarn install
  ```
- [x] **Instalação das Dependências do Sistema**
  ```bash
  # Mantine UI & Ícones
  yarn add @mantine/core @mantine/hooks @mantine/form @mantine/notifications @tabler/icons-react
  
  # Roteamento, HTTP e Validação
  yarn add react-router axios zod mantine-form-zod-resolver
  ```
- [x] **Instalação das Dependências de Testes & Tipos**
  ```bash
  # Vitest & Testing Library
  yarn add -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
  
  # Playwright
  yarn add -D @playwright/test
  ```
- [x] **Configuração do MantineProvider e Tema Global**
  - [x] Criar `src/styles/theme.ts`.
  - [x] Configurar `MantineProvider` e `<Notifications />` no `src/main.tsx` ou `src/App.tsx`.
- [x] **Validação do Bloco 1.1:**
  - [x] Executar `yarn dev` e verificar se a página abre sem erros no console.

---

### Bloco 1.2: Camada de Serviços, Schemas Zod e Axios (Tarde)
*Meta: Centralizar a comunicação HTTP e garantir validação de contratos com Zod (Requisito 7).*

- [x] **Criação dos Schemas Zod (`src/schemas/`)**
  - [x] `auth.schema.ts`: Schema de payload de login (`username`, `password`) e resposta com token JWT.
  - [x] `product.schema.ts`: Schema de produto (`id`, `title`, `price`, `stock`, `category`, `thumbnail`) com inferência de tipos (`z.infer`).
- [x] **Configuração do Cliente HTTP (`src/services/api.ts`)**
  - [x] `baseURL: 'https://dummyjson.com'`.
  - [x] **Request Interceptor:** Injetar cabeçalho `Authorization: Bearer <token>` extraído do `localStorage`.
  - [x] **Response Interceptor:** Tratar falhas de rede de forma amigável com notificações do Mantine.
- [x] **Implementação das Funções de Serviço**
  - [x] `src/services/authService.ts`: `login(credentials)` com validação `.safeParse()`.
  - [x] `src/services/productService.ts`: `getProducts({ limit, skip, search, category })` e `getProductById(id)`.
- [x] **Validação do Bloco 1.2:**
  - [x] Testar chamada de login contra a API real usando `emilys` / `emilyspass` e validar retorno do token.

---

### Bloco 1.3: Estado Global com Context API e Custom Hooks (Noite)
*Meta: Gerenciar sessão e carrinho de compras de forma desacoplada e tipada (Requisitos 2, 3 e 6).*

- [x] **Implementação do `AuthContext.tsx` e `useAuth.ts`**
  - [x] Estado para `user`, `token` e `isAuthenticated`.
  - [x] Persistência de token no `localStorage`.
  - [x] Métodos `login(username, password)` e `logout()`.
  - [x] Validação no Hook: lançar erro se usado fora do `AuthProvider`.
- [x] **Implementação do `CartContext.tsx` e `useCart.ts`**
  - [x] Estado local de itens imutável (`...items`).
  - [x] Métodos `addToCart(product)`, `removeFromCart(id)`, `updateQuantity(id, quantity)`, `clearCart()`.
  - [x] Totais calculados reativamente com `useMemo` (valor total e contagem total de itens).
  - [x] Validação no Hook: lançar erro se usado fora do `CartProvider`.
- [x] **Validação do Bloco 1.3:**
  - [x] Fazer login temporário e conferir se o token persiste ao recarregar a página (F5).

---

## 📅 DIA 2 — Área Pública, Navegação e Área Administrativa Protegida

### Bloco 2.1: Layout Base e Área Pública de Produtos (Manhã)
*Meta: Criar a experiência de catálogo aberta ao público geral (Requisitos 1, 4 e 5).*

- [x] **Layout Principal (`src/layouts/AppLayout.tsx`)**
  - [x] Header com logo e navegação via `<NavLink>` com indicação da rota ativa.
  - [x] Ícone do carrinho com badge reativo mostrando contagem de itens (`useCart`).
  - [x] Botão dinâmico de Login / Perfil do Usuário com Logout (`useAuth`).
  - [x] Renderização das rotas filhas com `<Outlet />` e Footer persistente.
- [x] **Página de Catálogo (`src/pages/public/ProductsPage.tsx`)**
  - [x] Barra de busca textual com input Mantine e debounce.
  - [x] Filtro por categoria (Select do Mantine consumindo `/products/categories`).
  - [x] Grid responsivo de produtos (`<SimpleGrid>` e componente desacoplado `ProductCard`).
  - [x] Paginação funcional (`<Pagination />` do Mantine calculando `skip` e `limit`).
  - [x] Feedback visual de carregamento (`<LoadingOverlay />` ou `<Skeleton />`).
- [x] **Validação do Bloco 2.1:**
  - [x] Navegar, buscar um termo (ex: "phone"), trocar de página e confirmar que a listagem atualiza sem quebrar.

---

### Bloco 2.2: Rota Dinâmica de Detalhes e Carrinho de Compras (Tarde)
*Meta: Implementar rotas dinâmicas e o fluxo de compra do usuário (Requisito 4).*

- [x] **Página de Detalhes do Produto (`src/pages/public/ProductDetailPage.tsx`)**
  - [x] Captura do ID dinâmico da rota via `useParams()`.
  - [x] Consulta ao endpoint `GET /products/:id` com tratamento de loading e erro.
  - [x] Galeria de imagens, preço, desconto, avaliação e especificações.
  - [x] Botão interativo "Adicionar ao Carrinho" com notificação de confirmação.
- [x] **Página do Carrinho (`src/pages/public/CartPage.tsx`)**
  - [x] Tabela ou lista de itens com botões de incremento/decremento e exclusão.
  - [x] Card de resumo de valores (Subtotal, Descontos, Total final).
  - [x] Botão de "Finalizar Pedido" simulando confirmação de compra e limpeza do carrinho.
- [x] **Página de Login (`src/pages/public/LoginPage.tsx`)**
  - [x] Formulário Mantine com validação Zod para usuário e senha.
  - [x] Card com credenciais de demonstração clicáveis (`emilys` / `emilyspass`).
  - [x] Redirecionamento inteligente após login via `useNavigate()` para a rota de origem.
- [x] **Validação do Bloco 2.2:**
  - [x] Adicionar produtos de diferentes categorias, abrir a rota `/carrinho` e alterar quantidades.

---

### Bloco 2.3: Proteção de Rotas e Área Administrativa (Noite)
*Meta: Blindar a área administrativa e criar formulários validados com Zod (Requisitos 5, 6 e 7).*

- [x] **Guarda de Rotas Protegidas (`src/routes/ProtectedRoute.tsx`)**
  - [x] Verificar `isAuthenticated` do `useAuth`.
  - [x] Redirecionar para `/login` mantendo o estado de origem (`state: { from: location }`) caso não esteja autenticado.
- [x] **Layout Administrativo (`src/layouts/AdminLayout.tsx`)**
  - [x] Barra lateral ou navegação dedicada para administração.
- [x] **Página de Gestão de Produtos (`src/pages/admin/ManageProductsPage.tsx`)**
  - [x] Tabela administrativa com listagem, ações de editar/excluir e badges de estoque.
  - [x] Modal de cadastro de produto com formulário `@mantine/form`.
  - [x] Validação do formulário integrada com Zod via `zodResolver` (título obrigatório, preço numérico > 0, estoque >= 0).
  - [x] Feedback visual de sucesso após submissão com Mantine Notifications.
- [x] **Validação do Bloco 2.3:**
  - [x] Tentar acessar `/admin` deslogado e confirmar o bloqueio imediato.
  - [x] Logar, entrar em `/admin`, submeter o formulário vazio (conferir mensagens de validação do Zod) e depois com dados válidos.

---

## 📅 DIA 3 — Testes Automatizados, CI/CD, Deploy e Entrega

### Bloco 3.1: Testes Unitários e de Componentes com Vitest e RTL (Manhã)
*Meta: Garantir testes consistentes da perspectiva do usuário (Requisito 8).*

- [x] **Configuração do Ambiente de Teste**
  - [x] Configurar `vitest.config.ts` ou seção no `vite.config.ts` com `environment: 'jsdom'`.
  - [x] Criar `src/test/setup.ts` importando `@testing-library/jest-dom`.
  - [x] Criar `src/test/test-utils.tsx` (helper para renderizar componentes com `MantineProvider` e Roteador em memória).
- [x] **Suíte de Testes Unitários e Componentes**
  - [x] `ProductCard.test.tsx`:
    - [x] Renderiza título, preço formatado e categoria.
    - [x] Dispara evento de adicionar ao carrinho ao clicar no botão.
  - [x] `LoginForm.test.tsx`:
    - [x] Exibe erros de validação Zod ao submeter campos vazios.
    - [x] Chama a função de autenticação com os dados corretos ao preencher credenciais válidas.
  - [x] `useCart.test.tsx`:
    - [x] Adiciona item e recalcula o valor total corretamente.
    - [x] Lança erro explícito se usado fora do `CartProvider`.
- [x] **Validação do Bloco 3.1:**
  - [x] Executar `yarn test:run` e garantir **100% de testes passando**.

---

### Bloco 3.2: Testes Ponta a Ponta (E2E) com Playwright (Tarde)
*Meta: Cobrir dois fluxos completos em navegador real headless (Requisito 9).*

- [x] **Configuração do Playwright (`playwright.config.ts`)**
  - [x] Configurar `webServer` para subir `yarn dev` automaticamente durante os testes.
  - [x] Configurar modo headless e viewport padrão.
- [x] **Fluxo E2E 1: Autenticação e Rota Protegida (`tests/e2e/auth.spec.ts`)**
  - [x] Tentar acessar a URL direta `/admin`.
  - [x] Validar redirecionamento automático para a tela de login.
  - [x] Preencher formulário com usuário `emilys` e senha `emilyspass`.
  - [x] Clicar no botão de envio e validar acesso liberado à área administrativa.
- [x] **Fluxo E2E 2: Busca, Detalhes e Carrinho (`tests/e2e/catalog.spec.ts`)**
  - [x] Acessar a página inicial pública.
  - [x] Digitar na busca de produtos.
  - [x] Clicar no card do produto e verificar transição para a tela de detalhes.
  - [x] Clicar em "Adicionar ao Carrinho" e validar atualização do contador no cabeçalho.
- [x] **Validação do Bloco 3.2:**
  - [x] Executar `yarn playwright install --with-deps`.
  - [x] Executar `yarn test:e2e` e garantir aprovação de todos os cenários em modo headless.

---

### Bloco 3.3: Pipeline de CI/CD, Deploy no GitHub Pages e Documentação (Noite)
*Meta: Publicação automatizada, solução de SPA no Pages e documentação completa (Requisito 10).*

- [x] **Configuração do Repositório Git**
  - [x] Inicializar repositório público no GitHub: `git init`, `git add .`, `git commit -m "feat: initial commit"`.
  - [x] Vincular ao repositório remoto público.
- [x] **Workflow de CI (`.github/workflows/ci.yml`)**
  - [x] Disparar em push e pull request para `main`.
  - [x] Instalar com `yarn install --frozen-lockfile`.
  - [x] Executar checagem de tipos (`tsc -b`).
  - [x] Executar testes unitários (`yarn test:run`).
  - [x] Instalar navegadores do Playwright e rodar testes E2E (`yarn test:e2e`).
- [x] **Workflow de CD (`.github/workflows/cd.yml`)**
  - [x] Configurar permissões OIDC (`pages: write`, `id-token: write`).
  - [x] Ajustar `base` no `vite.config.ts` (ex: `base: '/nome-do-repositorio/'`).
  - [x] **Fallback SPA obrigatório:**
    ```bash
    yarn build
    cp dist/index.html dist/404.html
    ```
  - [x] Configurar upload e deploy via `actions/deploy-pages@v4`.
- [x] **Elaboração do `README.md` Completo**
  - [x] Link da aplicação pública no GitHub Pages no topo.
  - [x] Link do repositório no GitHub.
  - [x] Descrição do tema escolhido (Catálogo DummyJSON).
  - [x] Instruções de execução local (`yarn`, `yarn dev`, `yarn test:run`, `yarn test:e2e`).
  - [x] Credenciais de acesso para testes (`emilys` / `emilyspass`).
  - [x] Checklist dos 10 requisitos técnicos detalhando como cada um foi cumprido.
  - [x] Nota sobre o uso consciente de Inteligência Artificial.
- [x] **Validação do Bloco 3.3:**
  - [x] Abrir o link do GitHub Pages em uma janela anônima.
  - [x] Navegar diretamente para uma rota interna (ex: `/carrinho` ou `/login`), recarregar com F5 e verificar se a página não retorna erro 404.
  - [x] Submeter os links no Moodle da disciplina.

---

## 🧪 Matriz de Verificação de Testes

| Tipo de Teste | Arquivo de Teste | Alvo do Teste | Critério de Sucesso |
| :--- | :--- | :--- | :--- |
| **Unitário** | `src/schemas/product.schema.test.ts` | Validação Zod | Rejeita produto sem preço ou título. |
| **Hook** | `src/hooks/useCart.test.tsx` | `CartContext` | Adiciona, altera quantidade e calcula valor total. |
| **Componente** | `src/components/product/ProductCard.test.tsx` | `ProductCard` | Renderiza dados e dispara callback do botão. |
| **Componente** | `src/pages/public/LoginPage.test.tsx` | Formulário Mantine | Exibe feedback de validação Zod em tempo real. |
| **E2E** | `tests/e2e/auth.spec.ts` | Fluxo de Autenticação | Bloqueia não autenticado e libera admin com JWT. |
| **E2E** | `tests/e2e/catalog.spec.ts` | Fluxo de Catálogo/Compra | Realiza busca, abre detalhes e adiciona ao carrinho. |

---

## ⚠️ Armadilhas Comuns e Como Evitá-las

1. **Erro 404 ao atualizar rota no GitHub Pages:**
   * *Causa:* O GitHub Pages não é um servidor Node.js com roteamento rewrite dinâmico.
   * *Solução:* Copiar `dist/index.html` para `dist/404.html` durante o step de build do CD.
2. **Caminho quebrado para scripts/CSS no GitHub Pages:**
   * *Causa:* O Vite assume `/` como raiz por padrão.
   * *Solução:* Configurar a propriedade `base: '/<NOME-DO-REPOSITORIO>/'` no `vite.config.ts`.
3. **Playwright falhando no GitHub Actions por falta de navegadores:**
   * *Solução:* Incluir explicitamente o step `yarn playwright install --with-deps` antes do teste no workflow.
4. **Erros de Tipagem no Build de Produção (`tsc -b`):**
   * *Solução:* Proibir o uso de `any` desde o primeiro dia e rodar `yarn build` localmente ao final de cada bloco de trabalho.
