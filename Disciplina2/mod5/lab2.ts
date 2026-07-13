/*
    Tarefa 1: Tipagem de Propriedades Obrigatórias vs. Opcionais
    Crie um arquivo chamado deliveryManagement.ts.

    (V) Defina um Type Alias chamado Courier com as propriedades: id (number), name (string) e vehicle (um tipo literal composto por: "Motorcycle" | "Car" | "Bicycle").

    Adicione uma propriedade chamada currentStatus com a união exata: "Available" | "InTransit" | undefined.

    Experimente a diferença prática de comportamento no editor ao transformar essa propriedade em opcional vs. mantê-la como obrigatória exigindo o tipo undefined:
    
    // currentStatus?: "Available" | "InTransit" 
    // -> A propriedade é opcional — você pode omiti-la ao criar o objeto.
    
    // currentStatus: "Available" | "InTransit" | undefined 
    // -> A propriedade é obrigatória — você deve declará-la, mesmo que o valor seja undefined.

    
    Tarefa 2: Manipulação de Arrays de Objetos
    Crie um array tipado chamado courierList que deve aceitar apenas objetos que sigam estritamente o formato Courier.

    Desenvolva uma função chamada assignDelivery que recebe um entregador desta lista e altera seu currentStatus para "InTransit". Certifique-se de que o TypeScript valide se o valor passado está em conformidade com os tipos literais permitidos.

    Tarefa 3: Simulação de Casos de Borda com IA
    Abra o chat de um assistente de IA (como Gemini ou Claude).

    Envie o código que você estruturou e utilize o seguinte prompt em inglês:

    "Act as a TypeScript test engine. Based on my literal type definitions for 'vehicle' and 'currentStatus', generate three data insertion attempts into my 'courierList' array: one completely valid, one attempting to pass an invalid vehicle (e.g., 'Truck'), and one omitting the property that accepts undefined. Textually explain the error that the TypeScript compiler will point out in each invalid attempt."

    3. Analise as respostas da IA para consolidar o entendimento de como o compilador protege o array contra dados corrompidos.

    Resultado Esperado
    O aluno deverá validar no terminal ou no próprio editor de código que o TypeScript impede a compilação do arquivo caso qualquer string diferente de "Motorcycle", "Car" ou "Bicycle" seja atribuída ao veículo do entregador, e entenderá claramente quando o compilador exige a passagem explícita do valor undefined.

    Última atualização: sexta-feira, 10 jul. 2026, 16:29
*/

/*
    Tarefa 1: Tipagem de Propriedades Obrigatórias vs. Opcionais
    Crie um arquivo chamado deliveryManagement.ts.

    (V) Defina um Type Alias chamado Courier com as propriedades: id (number), name (string) e vehicle (um tipo literal composto por: "Motorcycle" | "Car" | "Bicycle").

    Adicione uma propriedade chamada currentStatus com a união exata: "Available" | "InTransit" | undefined.

    Experimente a diferença prática de comportamento no editor ao transformar essa propriedade em opcional vs. mantê-la como obrigatória exigindo o tipo undefined:
    
    // currentStatus?: "Available" | "InTransit"
    // -> A propriedade é opcional — você pode omiti-la ao criar o objeto.
    
    // currentStatus: "Available" | "InTransit" | undefined
    // -> A propriedade é obrigatória — você deve declará-la, mesmo que o valor seja undefined.

    
    Tarefa 2: Manipulação de Arrays de Objetos
    Crie um array tipado chamado courierList que deve aceitar apenas objetos que sigam estritamente o formato Courier.

    Desenvolva uma função chamada assignDelivery que recebe um entregador desta lista e altera seu currentStatus para "InTransit". Certifique-se de que o TypeScript valide se o valor passado está em conformidade com os tipos literais permitidos.

    Tarefa 3: Simulação de Casos de Borda com IA
    Abra o chat de um assistente de IA (como Gemini ou Claude).

    Envie o código que você estruturou e utilize o seguinte prompt em inglês:

    "Act as a TypeScript test engine. Based on my literal type definitions for 'vehicle' and 'currentStatus', generate three data insertion attempts into my 'courierList' array: one completely valid, one attempting to pass an invalid vehicle (e.g., 'Truck'), and one omitting the property that accepts undefined. Textually explain the error that the TypeScript compiler will point out in each invalid attempt."

    3. Analise as respostas da IA para consolidar o entendimento de como o compilador protege o array contra dados corrompidos.

    Resultado Esperado
    O aluno deverá validar no terminal ou no próprio editor de código que o TypeScript impede a compilação do arquivo caso qualquer string diferente de "Motorcycle", "Car" ou "Bicycle" seja atribuída ao veículo do entregador, e entenderá claramente quando o compilador exige a passagem explícita do valor undefined.

    Última atualização: sexta-feira, 10 jul. 2026, 16:29
*/
import  { Courier, assignDelivery } from "./objetos/deliveryManagements";

const listaTeste: Courier[] = [
    { id: 1, name: "pilotoA", vehicle: "Motorcycle", currentStatus: "Available" }
];

const entregaA = listaTeste[0] && assignDelivery(listaTeste[0]);

console.log(entregaA);
