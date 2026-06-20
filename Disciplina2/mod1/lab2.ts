let userName:string = "Mariana";
let promptTokens:number = 1200;
let responseTime:number = 1.8;

let estimatedCost = promptTokens * 0.002;
let explicitScore:number = 10;
let inferredScore = 10;

let modelName:string = "GPT-4";
let maxTokens:number = 2048;

/*
    testes de tipagem e auto inferencia

    Cenario 1, auto inferencia
    let aiResponse;
    aiResponse = "Resposta gerada pela IA";
    aiResponse = 404;

    Cenario 2, percebe a diferença no tipo atribuido, nao compila
    let aiResponse:string;
    aiResponse = "Resposta gerada pela IA";
    aiResponse = 404;
*/


/* exercicio
Atue como um especialista em TypeScript.

Analise este código e responda:

1. Quais anotações de tipo são redundantes? 
   R: userName, promptTokens, responseTime, explicitScore, modelName e maxTokens. 
   O tipo já está óbvio pelo valor atribuído.

2. Quais são importantes para documentação e manutenção?
   R: userName, promptTokens, responseTime, explicitScore, modelName e maxTokens.

3. Existe algum risco de uso implícito de any? Não

4. O código segue boas práticas modernas? Sim 
Situação Recomendação
Variável simples Inferir (V)
Parâmetros de função Anotar (V) (nao houve função, não com retorno)
Retorno de função Anotar (V)
Variável sem valor inicial Anotar (V) 
Contrato de API Anotar (não se aplica)
Cálculos locais simples Inferir (V)

Reflexão
Após analisar as sugestões da IA, reflita:
* Quais tipos poderiam ser removidos
* Quais tipos deveriam permanecer
* Como a inferência melhora a produtividade
* Como a tipagem explícita melhora a manutenção
* Como IA e TypeScript trabalham juntos: 
    
*/
