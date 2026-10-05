Neste laboratório integrador, você criará uma aplicação SPA para uma concessionária de veículos utilizando React Router para navegação com parâmetros de rota (Path Params) e Mantine UI para estilização e componentes visuais.

Tarefa 1: Configuração das Rotas e Layout Principal

Em um projeto Vite vazio, configure o react-router-dom definindo as seguintes rotas da aplicação:
/ (Home/Catálogo): exibe a vitrine com a lista de veículos disponíveis.
/carros/:id (Página de Detalhes): rota dinâmica com Path Param obrigatório :id para exibir as informações detalhadas do veículo selecionado.
Crie um componente de layout <AppLayout /> utilizando componentes do Mantine (como AppShell, Group, Title, Button) contendo um cabeçalho fixo com o logotipo da loja e link para a Home, renderizando as telas filhas via <Outlet />.
Tarefa 2: Geração de Dados Simulados (Mocks) com IA

Utilize a IA da IDE para gerar o arquivo de dados simulados em src/mocks/cars.ts.
Prompt sugerido: "Gere um array TypeScript exportando 100 objetos de carros para uma concessionária. Cada carro deve possuir: id (string), name (modelo), brand (marca), price (número), year (número), km (número), imageUrl (link válido do Unsplash), category (SUV, Sedan, Hatch, Elétrico) e specs (array de strings com 4 itens de ficha técnica)."
Certifique-se de que o arquivo exporta o tipo e o array de dados corretamente para consumo na Home e na página de detalhes.
Tarefa 3: Vitrine Paginada na Home e Navegação para Detalhes

Na página Home (/), importe a lista de 100 veículos (src/mocks/cars.ts).
Implemente a paginação da vitrine exibindo os carros em fatias de 10 em 10 por página.
Utilize o componente <Pagination> do Mantine UI para os controles visuais de página.
Aplique o método .slice() do JavaScript no array de carros para calcular a fatia da página ativa (ex: página 1 exibe os itens de index 0 a 9, página 2 de 10 a 19).
Renderize os 10 cards da página atual utilizando o componente <Card> do Mantine dentro de uma grade responsiva (<SimpleGrid> ou <Grid>).
Em cada cartão, inclua a imagem do veículo, nome, marca, preço formatado e um botão ou link ("Ver Detalhes") que navegue declarativamente ou programaticamente para a rota /carros/${car.id}.
Tarefa 4: Página de Detalhes com Path Params (useParams)

Na tela de Detalhes (/carros/:id), capture o parâmetro id da URL utilizando o Hook useParams().
Localize o veículo correspondente no array de mocks utilizando o método .find() do JavaScript (cars.find(c => c.id === id)).
Se o veículo for encontrado, exiba a ficha técnica completa com Mantine (imagem em destaque, preço, ano, quilometragem, categoria e a lista de especificações mapeada via .map()).
Inclua um botão "Voltar ao Catálogo" que navegue de volta para a Home utilizando useNavigate(-1), pesquise sobre como essa chamada impacta no histórico de navegação.
💡 Dica Bônus (Desafio Extra - Query Params):

Como evoluir a aplicação sincronizando a paginação ou os filtros via Query Params (useSearchParams)? Você pode salvar a página ativa ou termos de busca diretamente na URL em forma de query string (ex: /carros?page=2 ou /carros?categoria=SUV&page=1). Para ler e atualizar esses parâmetros da URL de forma declarativa, utilize o Hook useSearchParams() do React Router.

Resultado Esperado: Uma aplicação SPA de catálogo automotivo navegável com React Router, contendo vitrine paginada (10 em 10 itens) com Mantine UI, transição fluida entre a Home e a tela de Detalhes via parâmetros de rota (:id) e busca dinâmica no mock de dados.

![alt text](image.png)