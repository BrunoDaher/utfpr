/*
    Laboratório 3: Integração Segura com APIs Externas
    Neste laboratório, você desenvolverá um módulo consumidor de serviços que consulta uma API rest real utilizando a Fetch API. O objetivo é mapear o formato JSON de resposta para contratos do TypeScript, impedindo erros de digitação ao manipular dados externos.
    Tarefa 1: Modelando o Contrato da API Externa
    Crie um arquivo chamado apiService.ts.
    Analise a estrutura de dados da rota de posts do JSONPlaceholder (https://jsonplaceholder.typicode.com/posts/1) e defina um type chamado Post contendo exatamente as propriedades retornadas (userId, id, title, body).
    Tarefa 2: Consumindo e Tipando o Fetch
    Desenvolva uma função assíncrona chamada obterPostsPorUsuario(usuarioId: number): Promise<Post[]> utilizando a sintaxe async/await.
    Use a função global fetch para disparar uma requisição para a rota https://jsonplaceholder.typicode.com/posts?userId=${usuarioId}.
    Converta a resposta usando .json() e faça o mapeamento explícito do resultado para o tipo Post[], garantindo que o retorno da função obedeça ao contrato definido.
    Tarefa 3: Automação de Types Baseados em JSON via IA
    Abra o chat de um assistente de IA (como Gemini ou Claude).
    Copie uma estrutura de JSON complexa (por exemplo, a rota de usuários https://jsonplaceholder.typicode.com/users/1) e envie para a IA com o seguinte prompt: "Aja como uma ferramenta geradora de tipos. Com base neste objeto JSON bruto que estou anexando, gere a estrutura de types TypeScript correspondente. Certifique-se de aninhar corretamente os sub-types (como 'Address' e 'Company') e utilize os modificadores opcionais caso note propriedades que possam vir nulas."
    Analise como a IA estruturou os objetos aninhados e utilize esses types para criar uma nova função de busca no seu arquivo.
Resultado Esperado: Ao executar o arquivo, o sistema deve exibir no terminal o título e o corpo dos posts filtrados. O aluno comprovará o sucesso da tipagem ao tentar acessar uma propriedade inexistente no objeto retornado (como post.autor) e observar o editor de código disparando um alerta vermelho em tempo real antes mesmo da execução.
*/ 