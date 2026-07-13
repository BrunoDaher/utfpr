/*
Laboratório 3: Manipulação Imutável e Extração Prática de Dados

Neste laboratório, você praticará a extração limpa de dados sequenciais e estruturados, 
além de criar rotinas de atualização que preservem 
a imutabilidade das referências de memória originais usando os operadores modernos do ecossistema TypeScript.

Tarefa 1: Desestruturação Limpa de Estruturas
Crie um arquivo chamado immutability.ts.

Declare um objeto tipado chamado user contendo id, name e email. Realize a desestruturação desse objeto para obter o name e o email em constantes isoladas sem acessar o objeto diretamente.

Declare um array contendo uma tupla de coordenadas geográficas simplificadas (ex: ["London", 51.50, -0.12]). Utilize a desestruturação de arrays para associar a primeira posição à constante city e as duas seguintes às constantes de latitude e longitude correspondentes.

Tarefa 2: Atualização Segura com Operador Spread
Imagine uma constante de configuração de sistema chamada originalConfig contendo as propriedades: theme: "dark", notifications: true e language: "en".

Crie uma função chamada changeLanguage que recebe essa configuração. A função deve retornar um novo objeto de configuração alterando o language para "es" (ou qualquer outro idioma), mas utilizando obrigatoriamente o operador spread (...) para clonar e manter todas as outras propriedades intactas, sem mutar o objeto original.

Tarefa 3: Análise de Cópia de Referência Assistida por IA
Abra o chat de um assistente de IA (como Gemini ou Claude).

Submeta o código da sua função de atualização desenvolvida na Tarefa 2 e envie o seguinte prompt em inglês:

"Act as a code performance analyst. Analyze my attached TypeScript code and explain in a didactic way the concept of reference in memory (Shallow Copy). Include a simple logical test that proves why 'originalConfig === newConfig' evaluates to false, even though almost all internal properties are identical."

Estude a explicação da IA sobre como o operador spread cria uma nova alocação de memória.

Resultado Esperado
O aluno deverá verificar por meio de execuções ou logs de teste que o objeto de configuração original (originalConfig) permaneceu estritamente inalterado e constante na memória, enquanto as funções retornaram novas referências com os dados atualizados com sucesso e tipagem validada.

Última atualização: sexta-feira, 10 jul. 2026, 16:27*/

import {generalConfig, changeLanguage} from "./objetos/immutability";

const newConfig: generalConfig = changeLanguage({ theme: "dark", notifications: true, language: "en" });

console.log(newConfig)