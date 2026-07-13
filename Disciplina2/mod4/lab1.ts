/*Laboratório 1: Processamento de Leituras de Sensores com .map()
Contexto
Uma aplicação de monitoramento recebe leituras de temperatura de sensores instalados em uma estufa automatizada.

Antes de exibir os dados em um painel de controle, é necessário transformar os valores para um formato mais amigável para o usuário.

Neste laboratório, você utilizará o método .map() para criar novas versões dos dados sem modificar o array original.

Tarefa 1: Estrutura Base dos Dados
Crie um array chamado temperatures contendo pelo menos 8 leituras de temperatura.

Exemplo:
*/
const temperatures = [18, 22, 25, 19, 31, 28, 24, 20];

console.log('criado array' + temperatures);

/*



Tarefa 2: Conversão de Temperaturas
Utilizando .map(), crie um novo array chamado fahrenheitTemperatures.

Converta cada valor de Celsius para Fahrenheit.

Fórmula:

(Fahrenheit = Celsius × 9/5 + 32)
Exemplo:

18°C → 64.4°F
*/

const fahrenheitTemperatures = temperatures.map((celsius) => (celsius * 9/5) + 32);

console.log(fahrenheitTemperatures);

/*
Tarefa 3: Formatação para Dashboard
Utilizando .map(), crie um array chamado formattedTemperatures.

Cada elemento deve possuir o seguinte formato:

Sensor Reading: 18°C
Sensor Reading: 22°C
Sensor Reading: 25°C
O array original deve permanecer inalterado.

*/

const formattedTemperatures = temperatures.map((celsius) => `Sensor Reading: ${celsius}°C`);
console.log(formattedTemperatures);


/*

Tarefa 4: Simulação de Exibição
Exiba os valores formatados no console.

Exemplo:

=== GREENHOUSE MONITORING ===

Sensor Reading: 18°C
Sensor Reading: 22°C
Sensor Reading: 25°C
...
Imagine que essas informações serão exibidas em um painel de monitoramento em tempo real.

*/
console.log('=== GREENHOUSE MONITORING ===');
formattedTemperatures.forEach((reading) => console.log(reading));
/*

Tarefa 5: Uso de IA
Utilize uma ferramenta de IA para revisar sua implementação.

Solicite:

Sugestões de melhoria para o uso do .map();
Formas alternativas de escrever a transformação;
Melhorias de legibilidade;
Possíveis simplificações do código.
Compare a sua solução com as sugestões fornecidas.

Competências Desenvolvidas
Ao concluir este laboratório, você será capaz de:

Aplicar o método .map() para transformação de dados.
Criar novos arrays a partir de arrays existentes.
Preservar os dados originais.
Preparar informações para exibição em dashboards.
Utilizar IA para revisão e melhoria de código.
*/