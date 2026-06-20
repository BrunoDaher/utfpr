const disciplina: string = "Programacao em TypeScript";
const anoLetivo: number = 2026;
// Funcao simples que calcula a media de duas notas ( tipos primitivos )
function calcularMedia ( nota1 : number , nota2 : number ) : number {
return ( nota1 + nota2 ) / 2;
}
// Execucao e exibicao no console
const mediaFinal = calcularMedia (8.5 , 7.0) ;
console.log (`Disciplina : ${ disciplina } (${ anoLetivo })`) ;
console.log (`Resultado da media calculada : ${ mediaFinal }`) ;