# Sistema de Triagem para UPA

Este projeto implementa um Sistema de Triagem e Gerenciamento de Atendimento para uma Unidade de Pronto Atendimento (UPA), utilizando [TypeScript](https://www.typescriptlang.org/) e [Node.js](https://nodejs.org/), conforme especificado no desafio.

## Instruções de Execução

1. Requiisito: [Node.js](https://nodejs.org/) instalado em sua máquina.
2. Via terminal, navegue até a pasta do projeto: `cd triagemUPA`
3. Instale as dependências: `npm install`
4. Para executar a simulação principal: `npm start`
5. Para executar a bateria de testes: `npm test`
6. Para executar a interface em html, ainda q nao obrigatório: 
  `npm run dev` e em seguida (via brownser): http://localhost:5173/ 

## Requisitos Contemplados

Cumprimento dos requisitos obrigatórios e desafios (R01 a R07 e RA01 a RA03) do projeto proposto.

### R01 — Cadastro e gerenciamento de pacientes
- Implementado em: `src/services/PatientService.ts`
- A classe `PatientService` centraliza o CRUD dos pacientes mantendo-os em um array encapsulado `private patients`. O método`registerPatient` cria um paciente novo usando as regras de inferência de tipos e UUID, enquanto `updatePatient` edita, com verificações de retorno e tipagens garantidas. Foi inserida uma validação pra que não seja possível criar pacientes cujo cpf já registrado, desconsiderando persistencia de dados, isto é, apenas durante a simulação, porém escalabilidade total pra o projeto.

### R02 — Organização das funcionalidades do sistema
- Implementado em: (`src/models`, `src/services`, `src/utils`, `src/data`).
Definido em (`"type": "module"`) no `package.json`. Utilizadas Arrow Functions na definição dos métodos das classes, como `registerPatient = (data: CreatePatientDTO, validate: boolean = true) => {...}`, e uso de parâmetros opcionais com valor padrão. 

## R03 — Classificação e gerenciamento da fila de atendimento
- Implementado em: `src/services/QueueService.ts`
A `QueueService` gerencia o array `queue`, onde `Record<Priority, number>`  atribui um peso a cada prioridade (EMERGENCIA = 5, NAO_URGENTE = 1). A ordenação utiliza a estrutura de controle condicional `if/else` no `Array.prototype.sort()` para priorizar o maior peso e, em caso de empate, a data de chegada do paciente (comportamento FIFO dentro do mesmo nível de prioridade). Existe uma questão que é a idade, que neste caso é fator decisório do plantonista, exemplo: 'sintoma + idade'.

## R04 — Consulta, busca e geração de estatísticas
- Implementado em: `src/services/StatisticsService.ts`
Utilizados  métodos avançados de Array para gerar estatísticas:
  - `filter()`: Para buscar pacientes por prioridade em `getPatientsByPriority()`.
  - `map()`: Para extrair apenas nomes e idades em `getPatientsNamesAndAges()`.
  - `find()`: Para localizar o paciente pelo CPF em `findPatientByCpf()`.
  - `some()`: Para retornar `true` ou `false` se houver alguma emergência ativa em `hasEmergency()`.
  - `reduce()` e `join()`: Utilizados em `getAverageAge()` para somar as idades e `getSymptomsReport()` para achatar os sintomas em uma string única.

### R05 — Modelagem das entidades do sistema
- Implementado em: `src/models/types.ts` e classes de serviços.
 A entidade `Patient` é uma `Interface` fortemente tipada. Foi empregado um **Union Type** (`Priority`) para delimitar valores exatos que a prioridade pode ter. Ao longo das classes, vemos o uso de **Arrays de Objetos** (`Patient[]`), e de **Spread Operator** em diversas ocasiões, como em `...data` no cadastro e clonando o histórico com `[...allPatients]` para estatística. 

### R06 — Simulação de comunicação com uma API
- Implementado em: `src/data/ApiSimulation.ts`
 Utilizando `Promise` e `setTimeout`, o método `fetchInitialPatients()` simula a latência de uma chamada de rede aguardando 1.5s antes de resolver os dados. Durante o processo, os dados vêm como uma string JSON crua (`jsonPayload`), que sofre um parse e manipulação para transformar de forma assíncrona strings ISO em instâncias nativas da classe `Date` do JavaScript.

### R07 — Validação automatizada das funcionalidades
- **Implementado em**: Pasta `tests/` (`queue.test.ts` e `validators.test.ts`).
- **Detalhes**: Empregado o built-in `node:test` e `node:assert` em modo Typescript (via `tsx`). Os testes atestam as validações de Expressões Regulares de telefone e CPF bem como verificam se a classificação da fila na `QueueService` de fato empurra `EMERGENCIA` para o topo acima de `POUCO_URGENTE`.

### RA01 — Validação de dados com Expressões Regulares
- **Implementado em**: `src/utils/validators.ts`
 Implementadas duas funções puras contendo lógicas avançadas de Regex.
  - `isValidCPF`: Garante que a string inserida corresponda à máscara `XXX.XXX.XXX-XX` ou somente números com tamanho de 11.
  - `isValidPhone`: Valida telefones celulares ou fixos no padrão do Brasil, contemplando os DDDs como `(XX)` e o caractere hífen e sem letras.

### RA02 — Aperfeiçoamento da tipagem utilizando Utility Types
- Implementado em: `src/models/types.ts` e nos retornos de funções.
Utility Types usados:
  - `Omit<Patient, 'id'>`: Utilizado para `CreatePatientData`, obrigando a fornecer todos os dados ao registrar, mas o ID é omitido pois será gerado na service.
  - `Partial<Patient>`: Em `UpdatePatientData`, permite fornecer somente 1 campo ou mais durante o update.
  - `Readonly<Patient>` e `ReadonlyArray<Patient>`: Utilizado nos métodos de busca (`getAllPatients()`, `getQueue()`) para prever bugs impedindo que classes clientes possam transmutar os dados do paciente acidentalmente sem usar os métodos próprios da classe service para tal.

### RA03 — Aplicação de recurso avançado do ecossistema TypeScript
- Implementado em: `src/services/QueueService.ts`
Utilizado o recurso de *Pattern Matching* da lib [`ts-pattern`](https://github.com/gvergnaud/ts-pattern), substituindo blocos complexos de *switch-case*, trazendo uma verificação de exaustividade (`.exhaustive()`) em tempo de compilação.
