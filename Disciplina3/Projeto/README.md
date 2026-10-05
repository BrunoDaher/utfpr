# 🛒 UTFPR Store — Catálogo & Gestão de Produtos

[![CI - Integracao Continua](https://github.com/BrunoDaher/utfpr/actions/workflows/ci.yml/badge.svg)](https://github.com/BrunoDaher/utfpr/actions)
[![CD - Deploy Continuo GitHub Pages](https://github.com/BrunoDaher/utfpr/actions/workflows/cd.yml/badge.svg)](https://github.com/BrunoDaher/utfpr/actions)

> **Deploy em Produção (GitHub Pages):** [https://brunodaher.github.io/utfpr/Disciplina3/Projeto/dist/](https://brunodaher.github.io/utfpr/Disciplina3/Projeto/dist/)  
> **Repositório GitHub:** [https://github.com/BrunoDaher/utfpr](https://github.com/BrunoDaher/utfpr)

---

## 🎯 Sobre o Projeto

Aplicação web moderna para e-commerce e gestão de inventário, desenvolvida como Projeto Final da disciplina de desenvolvimento front-end com **React, TypeScript, Mantine UI, Zod, Vitest e Playwright**, consumindo os recursos da API pública [DummyJSON](https://dummyjson.com).

A aplicação conta com uma **área pública** de exploração de catálogo, busca com debounce, filtros de categoria, rotas dinâmicas de detalhes e simulação completa de carrinho com cálculos imutáveis. Além disso, dispõe de uma **área administrativa blindada** por autenticação JWT, permitindo o gerenciamento e cadastro de produtos com formulários validados por esquemas rígidos do Zod.

---

## 🔑 Credenciais para Acesso à Área Administrativa

Para testar a área administrativa protegida (`/admin`), utilize as seguintes credenciais da API DummyJSON (também disponíveis com um clique no botão "Preencher" na tela de login):

* **Usuário:** `emilys`
* **Senha:** `emilyspass`

---

## 💻 Instruções para Execução Local

### Pré-requisitos
* Node.js LTS (v20+)
* Yarn (1.22+)

### Passo a passo
1. Clone o repositório:
   ```bash
   git clone https://github.com/BrunoDaher/utfpr.git
   cd utfpr/Disciplina3/Projeto
   ```

2. Instale as dependências:
   ```bash
   yarn install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   yarn dev
   ```
   Acesse a aplicação no navegador em `http://localhost:5173`.

4. Executar checagem de tipos e build de produção:
   ```bash
   yarn build
   ```

---

## 🧪 Bateria de Testes Automatizados

### Testes Unitários e de Componentes (Vitest + React Testing Library)
Executa a suíte de testes com validação Zod, hooks de contexto isolados e testes de componentes com renderização de acessibilidade:
```bash
yarn test:run
```

### Testes Ponta a Ponta (Playwright E2E)
Executa testes completos em navegador real Chromium em modo headless (cobre autenticação com proteção de rota e fluxo de busca/carrinho):
```bash
yarn test:e2e
```

---

## ✅ Atendimento aos 10 Requisitos Técnicos

| Requisito Técnico | Como foi atendido na arquitetura | Arquivos de Referência |
| :--- | :--- | :--- |
| **1. Componentes e tipagem TypeScript** | Projeto gerado com Vite + React + TypeScript estrito (`strict: true`, sem uso de `any`). Componentes desacoplados e tipificados via interfaces e schemas Zod inferidos. | [`ProductCard.tsx`](src/components/product/ProductCard.tsx), [`product.schema.ts`](src/schemas/product.schema.ts) |
| **2. Estado reativo, imutabilidade e ciclo de vida** | Estados gerenciados com `useState`, imutabilidade garantida com spread operators (`...items`), ciclo de vida gerenciado com dependências estritas de `useEffect` e cleanups para evitar memory leaks. | [`CartContext.tsx`](src/contexts/CartContext.tsx), [`ProductsPage.tsx`](src/pages/public/ProductsPage.tsx) |
| **3. Estado global com Context API e Custom Hooks** | Sessão (`AuthContext`) e carrinho (`CartContext`) centralizados via Context API. Abstração em hooks dedicados (`useAuth`, `useCart`) que lançam erro explícito quando usados fora do respectivo Provider. | [`AuthContext.tsx`](src/contexts/AuthContext.tsx), [`useAuth.ts`](src/hooks/useAuth.ts), [`useCart.ts`](src/hooks/useCart.ts) |
| **4. Roteamento e layouts com React Router** | Estrutura declarativa com layouts persistentes (`AppLayout`, `AdminLayout`), `<Outlet />`, indicação de rota ativa via `<NavLink>`, rotas dinâmicas (`/produtos/:id` com `useParams`) e navegação programática (`useNavigate`). | [`App.tsx`](src/App.tsx), [`AppLayout.tsx`](src/layouts/AppLayout.tsx), [`ProductDetailPage.tsx`](src/pages/public/ProductDetailPage.tsx) |
| **5. Interface e formulários com Mantine UI** | Tema global configurado em `theme.ts`, `@mantine/core` com design responsivo (`SimpleGrid`, `AppShell`, `Table`, `Card`), formulários com `@mantine/form`, skeletons e overlays de feedback. | [`theme.ts`](src/styles/theme.ts), [`ManageProductsPage.tsx`](src/pages/admin/ManageProductsPage.tsx) |
| **6. Autenticação JWT e rotas protegidas** | Login consumindo `POST /auth/login` da DummyJSON. Armazenamento de token e usuário no `localStorage`. Rota `/admin` protegida por guarda `ProtectedRoute` com preservação da rota de origem. | [`ProtectedRoute.tsx`](src/routes/ProtectedRoute.tsx), [`LoginPage.tsx`](src/pages/public/LoginPage.tsx), [`AuthContext.tsx`](src/contexts/AuthContext.tsx) |
| **7. API REST, interceptors e Zod** | Cliente Axios centralizado (`src/services/api.ts`) apontando para `https://dummyjson.com`. Request interceptor injeta `Authorization: Bearer <token>`. Response interceptor trata erros com Mantine Notifications. Validação contratual via Zod com `.safeParse()` e integração no Mantine com `zodResolver`. | [`api.ts`](src/services/api.ts), [`auth.schema.ts`](src/schemas/auth.schema.ts), [`product.schema.ts`](src/schemas/product.schema.ts) |
| **8. Testes automatizados (Vitest + RTL)** | 100% de cobertura nos requisitos centrais utilizando Vitest, React Testing Library e `@testing-library/user-event`. Consultas semânticas por acessibilidade (`getByRole`, `getByLabelText`). Wrapper em memória com `test-utils.tsx`. | [`product.schema.test.ts`](src/schemas/product.schema.test.ts), [`useCart.test.tsx`](src/hooks/useCart.test.tsx), [`ProductCard.test.tsx`](src/components/product/ProductCard.test.tsx), [`LoginPage.test.tsx`](src/pages/public/LoginPage.test.tsx) |
| **9. Testes ponta a ponta (Playwright)** | Dois fluxos E2E automatizados em modo headless com Chromium: (1) bloqueio de rota protegida e autenticação com redirecionamento; (2) busca de produto no catálogo, abertura de detalhes dinâmicos e adição ao carrinho com badge atualizado. | [`playwright.config.ts`](playwright.config.ts), [`auth.spec.ts`](tests/e2e/auth.spec.ts), [`catalog.spec.ts`](tests/e2e/catalog.spec.ts) |
| **10. Pipeline de CI/CD e Deploy** | Workflows GitHub Actions configurados: `ci.yml` (validação de tipos, testes Vitest e testes E2E Playwright a cada push/PR) e `cd.yml` (build de produção, geração de fallback `404.html` para SPAs e deploy automatizado no GitHub Pages). | [`.github/workflows/ci.yml`](.github/workflows/ci.yml), [`.github/workflows/cd.yml`](.github/workflows/cd.yml) |

---

## 🤖 Uso Consciente de Inteligência Artificial

Em consonância com as diretrizes da disciplina, assistentes de Inteligência Artificial foram utilizados como ferramenta de apoio técnico para:
* Auxiliar na estruturação inicial dos schemas rígidos do Zod e inferência de tipos TypeScript;
* Propor casos de teste de borda para validação de contratos da API DummyJSON;
* Acelerar a prototipagem de componentes Mantine e testes ponta a ponta com Playwright.

Todo o código gerado foi minuciosamente revisado, refinado, corrigido e validado localmente com 100% de testes aprovados, assegurando total conformidade com os requisitos acadêmicos da UTFPR.
