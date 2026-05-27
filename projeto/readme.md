## Resumo por tópico implementado no projeto

Link para o projeto: <a href='https://brunodaher.github.io/utfpr/projeto'>Projeto</a>

1. **Estrutura Semântica Rigorosa**
   - O HTML usa `header`, `main`, `article`, `section`, `aside` e `footer`.
   - A hierarquia de conteúdo está clara e facilita leitura por navegadores e leitores de tela.

2. **Sistema de Design com Variáveis**
   - `projeto/css/components.css` define `:root` com cores, tipografia, espaçamento e bordas.
   - O `projeto/css/style.css` importa o layout, componentes, botões, flexbox e animações.
   - O sistema permite alterar estilo global apenas mudando variáveis.

3. **Layout Híbrido (Flex & Grid)**
   - Navegação e botões usam utilitários `flex` (`.nav-container`, `.hero-actions`, `.flex-row`, `.flex-column`).
   - A seção hero usa CSS Grid com `grid-template-columns: 1.2fr 0.8fr`.
   - Cards e seções se adaptam com `repeat(auto-fit, minmax(240px, 1fr))` e flex wrap.

4. **Interface Responsiva**
   - Media queries implementadas para `968px`, `768px`, `640px` e `480px`.
   - No mobile, o menu some, o hero vira coluna, e texto/fonte escalam com `clamp()`.
   - O layout mantém integridade visual em diferentes larguras.

5. **Microinterações de Feedback**
   - Animações em `projeto/css/animations.css` incluem `fadeInUp`, `float`, `destaque` e `slide`.
   - `.ai-card` e `.main-article` recebem animações de entrada; `.gallery > img` tem movimento contínuo.
   - Há transições suaves e foco visual para elementos interativos.

6. **Curadoria de Código com IA**
   - A seção `#ia` demonstra o uso de IA no processo, com referências visuais a `component.refactor()` e `Github Copilot`.
   - O componente foi ajustado no CSS e HTML com atenção às opções de refatoração e usabilidade.

7. **Dark Mode Nativo**
   - Implementado `@media (prefers-color-scheme: light)` em `projeto/css/components.css`.
   - Existe também toggle manual via `#toggle-tema` e `body:has(#toggle-tema:checked)`. O que achei muito interessante, não sabia dessa possibilidade de uma "chave" via css. 

8. **Sticky Headers e Scroll Snap**
   - O cabeçalho usa `position: sticky; top: 0;` para permanecer visível.
   - `scroll-behavior: smooth` e `overscroll-behavior: none` estão definidos para navegação fluida.
   - A base para `scroll-snap` está presente, mesmo que comentada atualmente.

9. **Otimização de Performance e Assets**
   - O CSS está modularizado para reduzir acoplamento e facilitar manutenção.
   - Há uso de variáveis e importação organizada de módulos.
   - foi implementado lazy loading pras imagens

10. **Acessibilidade Avançada com Teclado**
   - `a:focus-visible` provê indicação clara de foco.
   - O HTML semântico suporta navegação por teclado.
   - Falta um pouco de ARIA explicita, mas a base semântica e o foco já melhoram acessibilidade.
