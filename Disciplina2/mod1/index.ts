// Declaracao de variaveis com tipos primitivos explicitos
const disciplina: string = "Programação em TypeScript";
const anoLetivo: number = 2026;
// Funcao simples que calcula a media de duas notas ( tipos primitivos )
const calcularMedia = (nota1: number, nota2: number): number =>
  (nota1 + nota2) / 2;

// Execucao e exibicao no console
const mediaFinal = calcularMedia(8.5, 7.0);
console.log(`disciplina: ${disciplina} (${anoLetivo})`);
console.log(`Resultado da media calculada: ${mediaFinal}`);
