
/*

Ao final do laboratório, o arquivo deverá conter:

(1)uma função sem retorno;
(2)uma função com retorno;
(3)uma função com parâmetro opcional;
(4)uma função com valor default.

*/

//(1)
function showSystemHeader() :void{
    console.log('Plataforma Educacional com IA');
}

//teste1
showSystemHeader();

//(2)
function calculateBirthYear(nomeDoEstudante:string, idade:number):string{
    const anoNascimento:number = 2025 - idade;
    return `${nomeDoEstudante} nasceu em aproximadamente ${anoNascimento}`
}

//teste2
const idadeA:string = calculateBirthYear('Maria',24);
console.log(idadeA);

//3
function createStudentProfile(nome:string, email ?:string):string{
    let msg:string = email ? `Email fornecido : ${email}` : 'Email não fornecido';
    return `${nome}\n${msg}`
}

//teste3
const comEmail:string = createStudentProfile('Maria','maria@mail.com');
const semEmail:string = createStudentProfile('Maria');

//testes
console.log(comEmail);
console.log(semEmail);

function generateUserProfile(nome:string, perfil:string = 'Aluno'):string{
    const msg:string = `Usuário: ${nome} - Perfil: ${perfil}`
    return msg;
}

//teste3
const comPerfil:string = generateUserProfile('Pedro');
const semPerfil:string = generateUserProfile('Maria','Professora');

//testes
console.log(comPerfil);
console.log(semPerfil);