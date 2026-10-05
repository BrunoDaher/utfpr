# 🚀 Projeto Final
## Aplicação React com TypeScript, API e CI/CD

### Cenário

O objetivo deste projeto é construir e publicar uma aplicação web completa em **React com TypeScript**, consumindo dados da API pública [DummyJSON](https://dummyjson.com).

O projeto deve reunir os conceitos trabalhados em aula e demonstrar autonomia para:

- consultar documentação;
- tomar decisões de arquitetura;
- validar dados e formulários;
- testar a aplicação;
- publicar uma versão funcional em produção.

## 💡 Escolha um tema

O tema é livre. Escolha um recurso da DummyJSON que permita criar uma experiência completa.

| Tema | Possíveis funcionalidades |
| --- | --- |
| **Catálogo e compras** (`/products`) | Busca, paginação, filtros por categoria, detalhes e simulação de carrinho. |
| **Receitas culinárias** (`/recipes`) | Fotos, rendimento, tempo de preparo, ingredientes e filtro por tipo de cozinha. |
| **Rede social ou blog** (`/posts` + `/comments`) | Feed, paginação, busca por tags, reações, visualizações, comentários e criação de posts. |
| **Gerenciador de tarefas** (`/todos`) | Filtros por status, paginação e cadastro de novas tarefas. |

### Regra obrigatória de acesso

Independentemente do tema, todos os projetos devem ter autenticação e duas áreas:

1. **Área pública:** navegação e busca nos dados.
2. **Área administrativa protegida:** inclusão, gestão dos itens e ações restritas.

A autenticação deve utilizar o endpoint `POST /auth/login` da DummyJSON.


## 🤖 Uso de Inteligência Artificial

Você pode e deve utilizar assistentes de IA, como Google Antigravity IDE, Copilot, Gemini, ChatGPT ou similares.

As ferramentas podem ajudar a:

- estruturar dados iniciais;
- sugerir schemas do Zod;
- propor cenários de teste de borda;
- apoiar a refatoração do código.

> **Responsabilidade:** o código entregue é de sua autoria e responsabilidade. Revise, teste e compreenda tudo o que a IA gerar antes de integrar ao repositório. O resultado deve refletir suas decisões técnicas e atender aos critérios avaliados.


## ✅ Os 10 requisitos técnicos

Implemente a aplicação de forma incremental. Na raiz do repositório Git, mantenha um `README.md` com esta checklist e descreva brevemente como cada requisito foi atendido.

### 1. Componentes e tipagem com TypeScript

- Inicialize o projeto com Vite usando o template React + TypeScript.
- Organize a interface em componentes funcionais desacoplados.
- Tipifique claramente as props, sem utilizar `any`.
- Utilize composição com `children` quando fizer sentido.
- Organize os estilos de forma modular, usando Mantine UI ou CSS Modules.

### 2. Estado reativo, imutabilidade e ciclo de vida

- Gerencie estados locais com `useState`.
- Preserve a imutabilidade ao atualizar objetos e arrays, utilizando, por exemplo, o spread `...`.
- Configure o array de dependências do `useEffect` com precisão.
- Implemente funções de limpeza (`cleanup`) para timers, subscrições e listeners de eventos quando necessário.

### 3. Estado global com Context API e Custom Hooks

- Crie e disponibilize contextos globais com Context API para dados compartilhados, como sessão, carrinho, tema ou favoritos.
- Abstraia o consumo do contexto em um Custom Hook dedicado, como `useAuth` ou `useCart`.
- Faça o Hook avisar ou lançar um erro quando for utilizado fora do Provider correspondente.

### 4. Roteamento e layouts com React Router

- Configure rotas declarativas com React Router.
- Crie um layout com cabeçalho e navegação persistentes.
- Renderize páginas filhas por meio de `<Outlet />`.
- Utilize `<NavLink>` com indicação da rota ativa.
- Utilize `useNavigate()` para navegação programática.
- Utilize `useParams()` para rotas dinâmicas, como `/produtos/:id`.

### 5. Interface e formulários com Mantine UI

- Configure o `<MantineProvider>` e, opcionalmente, o tema da aplicação.
- Monte layouts responsivos com componentes do Mantine.
- Construa formulários com `@mantine/form`.
- Implemente listagens ou tabelas com paginação.
- Exiba feedback de carregamento com indicador de loading ou overlay.

### 6. Autenticação JWT e rotas protegidas

- Implemente a tela de login consumindo `POST /auth/login` da DummyJSON.
- Persista o token JWT no navegador usando `localStorage` ou `sessionStorage`.
- Sincronize o status de autenticação no contexto global.
- Bloqueie o acesso à área administrativa para usuários não autenticados.

### 7. API REST, interceptors e validação com Zod

- Centralize o Axios em `src/services/api.ts` com:

	```ts
	baseURL: 'https://dummyjson.com'
	```

- Trate explicitamente os estados de carregamento, sucesso e erro.
- Configure um interceptor de requisição para adicionar o token JWT:

	```text
	Authorization: Bearer <token>
	```

- Configure um interceptor de resposta para capturar falhas de rede e exibi-las de forma amigável.
- Defina schemas com `z.object`.
- Infira tipos com `z.infer`.
- Valide respostas com `.safeParse()`.
- Integre os schemas aos formulários Mantine usando `zodResolver`.

### 8. Testes automatizados com Vitest e RTL

- Escreva testes unitários e de componentes com Vitest e React Testing Library (RTL).
- Priorize a perspectiva do usuário com consultas acessíveis, como `getByRole` e `getByText`.
- Simule interações com `@testing-library/user-event`.
- Isole dependências utilizando wrappers de contexto em memória.

### 9. Testes ponta a ponta com Playwright

- Configure o Playwright.
- Automatize pelo menos dois fluxos completos em um navegador real.
- Exemplos de fluxo: autenticação com redirecionamento, busca, visualização de detalhes ou cadastro de item.
- Utilize localizadores semânticos.
- Garanta que os testes sejam executados com sucesso em modo headless.

### 10. Pipeline de CI/CD e deploy

Configure workflows no GitHub Actions dentro de `.github/workflows/`.

**CI — Integração contínua**

- Fazer checkout do repositório.
- Configurar o Node.js.
- Instalar dependências com lockfile congelado:

	```bash
	yarn install --frozen-lockfile
	```

- Executar os testes do Vitest e do Playwright a cada push e pull request.

**CD — Entrega contínua**

- Gerar o build de produção.
- Fazer deploy automatizado no GitHub Pages.
- Garantir que o repositório seja público.
- Ajustar a propriedade `base` no `vite.config.ts`.
- Configurar o fallback de rotas SPA com `404.html` para que links diretos e recarregamentos funcionem corretamente.
- Proteger a branch `main`, exigindo Pull Request e aprovação dos testes de CI antes da integração.

## 📦 Regras de entrega

- **Repositório Git:** entregue o link do repositório público no GitHub.
- **README do repositório:** inclua instruções de execução local, tema escolhido, checklist explicada dos dez requisitos e uma breve nota sobre o uso de IA.
- **Aplicação publicada:** informe o link público da aplicação no GitHub Pages no início do `README.md` e no campo de envio do Moodle.

## 🏁 Checklist final

- [x] Tema escolhido e documentado.
- [x] Área pública implementada.
- [x] Login e área administrativa protegida implementados.
- [x] Requisitos técnicos 1 a 10 atendidos.
- [x] Testes unitários, de componentes e E2E executados com sucesso.
- [x] Pipeline de CI/CD configurado.
- [x] Aplicação publicada no GitHub Pages.
- [x] Links do repositório e da aplicação incluídos no `README.md` e no Moodle.
