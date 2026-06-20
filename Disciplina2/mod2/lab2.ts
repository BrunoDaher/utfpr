
/*function calculateDiscount(
  price: number
): number {
  return price * 0.9;
}

function isApproved(
  score: number
): boolean {
  return score >= 7;
}

*/

//transformando em arrow function
const calculateDiscont = (price: number):number =>  price * 0.9;
const isApproved = (score: number): boolean =>  score >= 7;


  //Crie a seguinte função:

  const formatUserName = (name: string): string => {
    const upperName = name.toUpperCase();
    const message =`Olá ${upperName}`;
    
    return message;
  };
  
  
/*Execute a função utilizando diferentes nomes.

  Observe:

  a utilização do bloco com chaves;
  a existência de múltiplas instruções;
  a necessidade da palavra return.

  Analise:
  por que o retorno explícito é necessário;
  quais etapas são executadas antes do retorno.
*/ 

  console.log(formatUserName('joao carlos'))


//Versão com retorno implícito
const calculateFinalPrice = (price: number): number => price * 0.9;

//Versão com retorno explícito
const calculateFinalPriceB = (price: number): number => {
  const discount = price * 0.1;
  const finalPrice = price - discount;
  return finalPrice;
};

/*
  Reflita:
  qual versão é mais simples;
  qual versão seria mais fácil de expandir futuramente;
  em qual situação cada abordagem seria mais apropriada.


Tarefa 5: Revisão com Inteligência Artificial

Copie todas as funções desenvolvidas durante o laboratório e envie para uma IA utilizando o seguinte prompt:

Atue como um especialista em TypeScript.
Analise as Arrow Functions abaixo e responda:
Existem oportunidades de utilizar retorno implícito?
Alguma função ficou excessivamente compacta?
Há melhorias de legibilidade?
A tipagem foi utilizada adequadamente?
O código segue boas práticas modernas?

Reflexão
  Após analisar as sugestões fornecidas pela IA, reflita:
  quando utilizar retorno explícito;
  quando utilizar retorno implícito;
  como equilibrar concisão e legibilidade;
  quais decisões melhoram a manutenção do código;
  como ferramentas de IA podem auxiliar revisões técnicas.

Resultado Esperado
Ao final do laboratório, você deverá ser capaz de converter funções tradicionais para Arrow Functions, compreender as diferenças entre retorno explícito e implícito e identificar situações em que cada abordagem produz código mais claro e sustentável.
Além disso, deverá compreender que a modernização da sintaxe não elimina a necessidade de escrever código legível e bem estruturado.

Competências Desenvolvidas
Ao final deste laboratório, espera-se que o estudante seja capaz de:
utilizar Arrow Functions em TypeScript;
aplicar tipagem em parâmetros e retornos;
diferenciar retorno explícito e retorno implícito;
avaliar a legibilidade de diferentes implementações;
modernizar código utilizando recursos atuais da linguagem;
utilizar IA como ferramenta de revisão e melhoria de código;
produzir funções mais claras, consistentes e fáceis de manter.

*/