
//Defina um Type Alias chamado Courier com as propriedades: 
// id (number), name (string) e vehicle (um tipo literal composto por: "Motorcycle" | "Car" | "Bicycle").
//Adicione uma propriedade chamada currentStatus com a união exata: "Available" | "InTransit" | undefined.
export type Courier = {
    id: number;
    name: string;
    vehicle: "Motorcycle" | "Car" | "Bicycle";
    currentStatus: "Available" | "InTransit" | undefined; // Propriedade obrigatória
};

/*
    Experimente a diferença prática de comportamento no editor ao transformar essa propriedade em opcional vs. mantê-la como obrigatória exigindo o tipo undefined:
     currentStatus?: "Available" | "InTransit" 
     -> A propriedade é opcional — você pode omiti-la ao criar o objeto.
     currentStatus: "Available" | "InTransit" | undefined 
     -> A propriedade é obrigatória — você deve declará-la, mesmo que o valor seja undefined.

Tarefa 2: Manipulação de Arrays de Objetos
    Crie um array tipado chamado courierList que deve aceitar
    apenas objetos que sigam estritamente o formato Courier.
*/

    const courierList: Courier[] = [
        { id: 1, name: "John Doe", vehicle: "Motorcycle", currentStatus: "Available" },
        { id: 2, name: "Jane Smith", vehicle: "Car", currentStatus: "Available" },
        { id: 3, name: "Mike Johnson", vehicle: "Bicycle", currentStatus: undefined }
    ];

    
    /*
    
    Desenvolva uma função chamada assignDelivery que recebe um entregador 
    desta lista e altera seu currentStatus para "InTransit". 
    Certifique-se de que o TypeScript valide se o valor passado está em conformidade com os tipos literais permitidos.
    
    */

    export function assignDelivery(courier: Courier): Courier {
        courier.currentStatus = "InTransit";

        return courier;
    }   
    