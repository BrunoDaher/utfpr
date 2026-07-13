//Declare um objeto tipado chamado user contendo id, name e email. 
// Realize a desestruturação desse objeto para obter o name 
// e o email em constantes isoladas sem acessar o objeto diretamente.

//Declare um array contendo uma tupla de coordenadas geográficas simplificadas (ex: ["London", 51.50, -0.12]). Utilize a desestruturação de arrays para associar a primeira posição à constante city e as duas seguintes às constantes de latitude e longitude correspondentes.

type User = {
    id: number;
    name: string;
    email: string;
};

const user: User = {
    id: 1,
    name: "John Doe",
    email: ""
};

const { name, email } = user;

const coordinates: [string, number, number] = ["London", 51.50, -0.12];
const [city, latitude, longitude] = coordinates;

//Tarefa 2: Atualização Segura com Operador Spread
//Imagine uma constante de configuração de sistema chamada originalConfig 
// contendo as propriedades: theme: "dark", notifications: true e language: "en".

//Crie uma função chamada changeLanguage que recebe essa configuração.
// A função deve retornar um novo objeto de configuração alterando o 
// language para "es" (ou qualquer outro idioma), 
// mas utilizando obrigatoriamente o operador spread (...) 
// o spread (...)  clona e mantem todas as outras propriedades intactas,
//  sem mutar o objeto original.

 type originalConfig = {
    theme: "dark";
    notifications: true;
    language: "en";
}

export type generalConfig = {
    theme: "dark" | "light";
    notifications: true|false;
    language: string;
}


export function changeLanguage(config: originalConfig): generalConfig {
    return {
        ...config,
        language: "es"
    };
}

