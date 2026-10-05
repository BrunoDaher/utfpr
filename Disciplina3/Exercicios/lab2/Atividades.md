🛠️ Laboratório 2: Sistema de Preferências e Tema Escuro Global com IA
Neste laboratório integrador, você desenvolverá uma aplicação com gerenciamento de estado global para tema (Claro/Escuro) utilizando Context API, persistência em localStorage via useEffect e auxílio de IA para refatoração e criação do Custom Hook useTheme.

Tarefa 1: Criação do Contexto de Tema

Crie a pasta src/contexts e o arquivo ThemeContext.jsx.
Configure o ThemeContext para manter o estado theme (com valores 'light' ou 'dark') e a função toggleTheme.
Utilize um useEffect dentro do Provider para ler o tema salvo no localStorage ao carregar a página e salvar alterações de tema sempre que o estado mudar.
Tarefa 2: Refatoração com IA para Custom Hook

Forneça o código do seu ThemeContext.jsx ao agente de IA.
Solicite à IA: "Crie um Custom Hook chamado useTheme que consuma este contexto e lance um erro amigável se for utilizado fora do ThemeProvider."
Integre a sugestão da IA no seu código.
Tarefa 3: Consumo Global do Tema nos Componentes

Envolva o componente principal <App /> pelo <ThemeProvider>.
Crie um componente <Header /> com um botão que aciona o toggleTheme e exibe o ícone correspondente ao tema atual (☀️ / 🌙).
Crie um componente <ContentCard /> que altera suas cores de fundo e texto dinamicamente com base no tema ativo.
Resultado Esperado: Aplicação totalmente reativa onde a troca de tema altera instantaneamente a interface em todos os componentes conectados ao contexto, mantendo as preferências salvas no navegador mesmo após recarregar a página.