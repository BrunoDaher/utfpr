1 - Estrutura Semântica Rigorosa: Construir o layout completo utilizando apenas tags semânticas (Módulo 01), garantindo que a estrutura seja compreensível para motores de busca e leitores de tela.

        ✅ style.css agora tem um sistema de design centralizado com variáveis CSS.

        O que foi implementado
        :root define:
        cores do tema (--color-primary, --color-secondary, --color-surface, --color-text, etc.)
        tipografia global (--font-family-base, --font-family-heading, --font-size-base, etc.)
        espaçamentos e bordas (--space-*, --radius)
        elevação visual (--shadow)
        estilos globais usam essas variáveis para:
        body
        a
        button / .button
        .header
        .section
        .card
        footer
        Benefício
        Agora é possível trocar a identidade visual de forma global e organizada apenas alterando as variáveis em :root.


2 - Sistema de Design com Variáveis: Implementar um esquema de cores e tipografia centralizado em variáveis CSS, permitindo a troca de identidade visual do seu tema de forma global e organizada (Módulo 02).

    Inclui:

        header
        nav
        main
        article
        section
        aside
        footer


Layout Híbrido (Flex & Grid): Criar seções que combinem o alinhamento do Flexbox (menus/botões) com a robustez do CSS Grid para o posicionamento da grade principal de conteúdo (Módulo 03).

        Solicitei ao promp para não apenas alterar o layout html e css, mas criar um css desacoplado, de maneira a montar ele como se fosse um lego, incluindo as classes quando necessário. Desacoplando o código e permitindo reaproveitamento, de padrão, ele começou alterar a estrutura, o que não é a proposta.
                        

Interface Responsiva: Garantir que o projeto seja adequado para telas pequenas (mobile) e escale com fluidez até resoluções desktop, sem quebras visuais (Módulo 04).

Microinterações de Feedback: Desenvolver animações de entrada e estados de hover que deem vida à interface e melhorem a experiência do usuário (Módulo 05).

Curadoria de Código com IA: Utilizar IA para gerar e refatorar um componente específico da sua página, documentando como você validou e ajustou o código gerado para o seu projeto (Módulo 06).

Implementação de Dark Mode Nativo (Pesquisa): Pesquisar e aplicar a media query prefers-color-scheme para que o seu site se adapte automaticamente às preferências de tema do sistema do usuário.

Sticky Headers e Scroll Snap (Pesquisa): Pesquisar propriedades de scroll do CSS para criar um cabeçalho fixo e seções que se ajustam suavemente à tela durante a navegação.

Otimização de Performance e Assets (Pesquisa): Pesquisar sobre formatos de imagem modernos (como WebP) e carregamento de fontes para garantir que sua landing page abra instantaneamente. Tente atingir uma pontuação de performance próxima de 100 no Google PageSpeed.

Acessibilidade Avançada com Teclado (Pesquisa): Pesquisar e implementar o gerenciamento de foco visual (:focus-visible) e atributos ARIA básicos para garantir que qualquer pessoa consiga navegar no seu projeto sem usar o mouse.