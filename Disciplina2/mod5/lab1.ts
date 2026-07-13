
/* 
    Laboratório 1: Modelagem de Contratos de Interface e Composição de Tipos
    Neste laboratório, você vai praticar a modelagem de dados estruturais de
     uma cafeteria digital, aplicando na prática as 
     *diferenças de herança com Interfaces e de composição 
     com Type Aliases para entender quando utilizar cada recurso.

    Tarefa 1: Criando Contratos Expansíveis com Interfaces
    Crie um arquivo chamado products.ts

    (V) Defina uma interface chamada MenuItem com as propriedades: id (apenas leitura usando readonly), name (string) e price (number).
    (V) Crie uma nova interface chamada Beverage que herda de MenuItem (utilizando extends) e adiciona a propriedade sizeMl (number) e a propriedade opcional hasCaffeine (boolean).`

    Tarefa 2: Criando Composições Fechadas com Type Aliases
    No mesmo arquivo, defina um Type Alias chamado NutritionalData contendo as propriedades calories (number) e vegan (boolean).

    (V) Crie um novo Type Alias chamado Dessert que faz a interseção (utilizando o operador &) entre a interface MenuItem e o type NutritionalData.

    Tarefa 3: Validação de Estruturas Assistida por IA
    Abra o chat de um assistente de IA (como Gemini ou Claude).

    Envie o código que você desenvolveu nas tarefas 1 e 2 e utilize o seguinte prompt em inglês:

    "Act as a TypeScript code validator. Based on my provided code,
     create a test object for the 'Beverage' interface 
     and another one for the 'Dessert' type. 
     Also, add a line of code that explicitly attempts to change the 'id' 
     property of one of them to prove that the readonly modifier is blocking the mutation."

    Cole o código de teste gerado pela IA no seu arquivo e analise os alertas do compilador.

    Resultado Esperado
    O aluno deverá visualizar no editor que tanto o objeto criado via herança de Interface (Beverage)
     quanto o objeto criado via interseção de Types (Dessert) 
     possuem autocompletes perfeitos de suas propriedades combinadas, 
     e que o VS Code exibe uma linha vermelha de erro ao tentar modificar o id definido como readonly.

    Última atualização: sexta-feira, 10 jul. 2026, 16:01
*/