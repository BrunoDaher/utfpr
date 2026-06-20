
//task1 
let completedLessons = 18;
let totalLessons = 24;

let progress = (completedLessons / totalLessons) * 100;
console.log(`Progresso do aluno: ${progress}%`);

//task 2
let result1 = 10 + 5 * 2;
let result2 = (10 + 5) * 2;

console.log(`Resultado 1: ${result1}`); // Esperado: 20
console.log(`Resultado 2: ${result2}`); // Esperado: 30

//task 3

let average = 7.5;
let approved = average >= 7;

console.log(`Aluno aprovado? ${approved}`);

//task4

console.log(true && "Avançou");       // avançou
console.log(false && "Não avançou");   // false

//console.log("" || "Nome Padrão"); // error TS2873: This kind of expression is always falsy. //no meu caso estourou um baita erro

//task5

// Cenário: O professor definiu o bônus como ZERO
let bonusConfigurado: number = 0; 

// Estratégia Antiga com OR (||) 
let bonusComOr = bonusConfigurado || 1.5;

// Estratégia Moderna com Nullish Coalescing (??)
let bonusComNullish = bonusConfigurado ?? 1.5;
//irmão do SEERRO (excel)

console.log(`Bônus com operador OR: ${bonusComOr}`); // Bônus com operador OR: 1.5
console.log(`Bônus com operador Nullish: ${bonusComNullish}`); // Bônus com operador Nullish: 0

//task6


