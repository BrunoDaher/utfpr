/*
Laboratório 02: Monitoramento e Busca de Leituras com filter(), find() e some()
Condições de conclusão
Laboratório 2: Monitoramento e Busca de Leituras com filter(), find() e some()
Contexto
Uma estufa automatizada monitora continuamente a temperatura ambiente por meio de sensores.

A equipe responsável deseja identificar leituras críticas, localizar ocorrências específicas e verificar rapidamente se existem situações que exigem atenção.

Neste laboratório, você utilizará os métodos .filter(), .find() e .some() para analisar os dados coletados.

 
Tarefa 1: Estrutura Base dos Dados
Crie um array chamado temperatures contendo pelo menos 10 leituras.

Exemplo:
*/
const temperatures = [18, 22, 35, 28, 31, 19, 27, 38, 24, 20];

/*
Tarefa 2: Filtrando Temperaturas Elevadas
Utilizando .filter(), crie um novo array chamado highTemperatures.

Selecione apenas temperaturas superiores a 30°C.

Exemplo de saída:

[35, 31, 38]

*/
const highTemperatures = temperatures.filter((temp) => temp > 30);
console.log(highTemperatures);
/*


Tarefa 3: Encontrando a Primeira Temperatura Crítica
Utilizando .find(), encontre a primeira temperatura superior a 30°C.

Armazene o resultado em uma variável chamada firstCriticalTemperature.

Exemplo:

35
Tarefa 4: Verificando Situação de Alerta
Utilizando .some(), verifique se existe alguma temperatura superior a 40°C.

Armazene o resultado em uma variável chamada hasEmergencyTemperature.

Exemplo:

false
ou

true
dependendo dos dados utilizados.


*/
const firstCriticalTemperature = temperatures.find((temp) => temp > 30);
const hasEmergencyTemperature = temperatures.some((temp) => temp > 40);


/*
Tarefa 5: Simulação de Monitoramento
Exiba no console:

Lista de temperaturas críticas;



Primeira ocorrência crítica;

Resultado da verificação de emergência.

Exemplo:

=== GREENHOUSE ALERT SYSTEM ===

Critical Temperatures:
35
31
38

First Critical Temperature: 35

Emergency Detected: false

*/
console.log('=== GREENHOUSE ALERT SYSTEM ===');
console.log('Emergency Detected: ' + hasEmergencyTemperature);
console.log('First Critical Temperature: ' + firstCriticalTemperature);


/*

Tarefa 6: Uso de IA 
Utilize uma ferramenta de IA para revisar sua solução.




/*

Solicite:

Melhorias de legibilidade;

Sugestões para uso de filter(), find() e some();

Possíveis simplificações;

Boas práticas para análise de listas.

Compare sua solução com as sugestões recebidas.

Competências Desenvolvidas
Ao concluir este laboratório, você será capaz de:

Filtrar dados utilizando .filter();

Localizar elementos específicos utilizando .find();

Verificar condições utilizando .some();

Escolher o método adequado para cada problema;

Utilizar IA para revisão e melhoria de código.

Última atualização: sexta-feira, 26 jun. 2026, 21:33

*/