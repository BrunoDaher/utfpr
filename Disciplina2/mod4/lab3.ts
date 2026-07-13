/*

Laboratório 3: Agregação de Leituras com reduce()
Contexto
Após monitorar as temperaturas da estufa, a equipe precisa gerar indicadores consolidados para análise dos dados.

Em vez de visualizar cada leitura individualmente, deseja-se obter métricas resumidas que auxiliem na tomada de decisão.

Neste laboratório, você utilizará o método .reduce() para transformar várias leituras em resultados únicos.
 
Tarefa 1: Estrutura Base dos Dados
Crie um array chamado temperatures contendo pelo menos 10 leituras.

Exemplo:



*/
const temperatures = [18, 22, 35, 28, 31, 19, 27, 38, 24, 20];

/*
Tarefa 2: Soma Total das Leituras
Utilizando .reduce(), calcule a soma de todas as temperaturas.
Armazene o resultado em uma variável chamada totalTemperature.

Exemplo:

262

*/
const totalTemperature = temperatures.reduce((acc, temp) => acc + temp, 0);
/*
Tarefa 3: Média das Leituras
    Utilizando o resultado da tarefa anterior, calcule a temperatura média.
    Armazene o resultado em uma variável chamada averageTemperature.
    Exemplo:
    26.2
*/
const averageTemperature = totalTemperature / temperatures.length;

/*
    Tarefa 4: Simulação de Dashboard
    Exiba os resultados no console.
    Exemplo:

    === GREENHOUSE DASHBOARD ===

    Total Temperature: 262

    Average Temperature: 26.2°C

*/
console.log("=== GREENHOUSE DASHBOARD ===");
console.log("Total Temperature:", totalTemperature);
console.log("Average Temperature:", averageTemperature, "°C");

/*
Tarefa 5: Desafio Extra
    Utilizando .reduce(), conte quantas leituras estão acima de 30°C.

Exemplo:
*/




/*

Dica:

O acumulador pode ser utilizado não apenas para somar temperaturas, mas também para contar ocorrências.

Tarefa 6: Uso de IA
Utilize uma ferramenta de IA para revisar sua solução.

Solicite:

Explicações sobre o acumulador;
Melhorias de legibilidade;
Alternativas para implementar a contagem;
Boas práticas para uso de reduce().
Compare sua solução com as sugestões recebidas.

Competências Desenvolvidas
Ao concluir este laboratório, você será capaz de:

Utilizar .reduce() para agregação de dados;
Compreender o papel do acumulador;
Produzir métricas consolidadas;
Escolher entre transformação, filtragem e agregação;
Utilizar IA para revisão de código.

*/