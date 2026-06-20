/*Laboratório 3: Controle de Acesso e Monitoramento de Atividades na Plataforma Educacional
    Neste laboratório, você irá analisar o comportamento do escopo das 
    variáveis em TypeScript e utilizar closures para implementar um contador de atividades
    de estudantes em uma plataforma educacional.

    Tarefa 1: Explorando Escopo de Bloco
    Crie um arquivo chamado lab-escopo.ts.
    Declare uma variável studentName utilizando let dentro de um bloco if.
    Exiba o valor da variável dentro do bloco.
    Tente acessar a mesma variável fora do bloco.
    Compile o código e observe o erro gerado pelo TypeScript.

    Código base:
*/

if (true) {
    let studentName: string = "Maria";
    console.log(studentName);
}


// Tente acessar studentName aqui
    

   /* Tarefa 2: Comparando var e let
    Crie uma função chamada checkEnrollment.
    Dentro da função, declare uma variável enrollmentStatus utilizando var dentro de um bloco if.
    Exiba seu valor fora do bloco.
    Execute o código e observe o resultado.
    Substitua var por let.
    Compare os comportamentos e registre suas observações em comentários.

Código base:
*/

function checkEnrollment(): void {
    if (true) {
        var enrollmentStatus:string = "Active";
    }
    console.log(enrollmentStatus);
}

checkEnrollment();

/*
Tarefa 3: Criando um Contador de Acessos com Closure
    Na plataforma educacional, cada vez que um estudante acessa um conteúdo, 
    o sistema deve registrar a quantidade de visualizações realizadas.
    Crie uma função chamada createLessonCounter.
    Declare uma variável lessonViews inicializada com zero.
    Retorne uma função responsável por incrementar o contador.
    Armazene a função retornada em uma constante chamada registerView.
    Execute a função três vezes.
    Verifique se o contador mantém o valor entre as chamadas.
    Estrutura sugerida:
*/

const createLessonCounter = () => {
    let lessonViews:number = 0;

    return function(): void {
        lessonViews++;
        console.log(lessonViews);
    };
}

const createLessonCounterPersonal = (nome:string) => {
    let lessonViews:number = 0;

    return function(): void {
        lessonViews++;
        console.log(`Acesso ${lessonViews} por ${nome}`);
    };
}


//procedure
let conta = createLessonCounter();
//procedure

//simulando e iterando logs de entrada
let entradas = [1,2,3,4];

    entradas.forEach(element => {
        conta();
    });

/*Tarefa 4: Simulando Diferentes Cursos
 
Uma plataforma pode possuir vários cursos independentes.

    Crie duas instâncias do contador utilizando a função createLessonCounter.
        Nomeie as constantes como webCourseViews e typescriptCourseViews.
        Realize chamadas alternadas em cada contador.
        Observe que cada closure mantém seu próprio estado.
        Exemplo esperado:
    */

    const webCourseViews = createLessonCounterPersonal('Joazinho');
    const typescriptCourseViews = createLessonCounterPersonal('Maria');
    

    //demonstra isolamento e encapsulamento dos atributos do closure
    //comportamneto conceitual de O.O , classe
    webCourseViews();
    webCourseViews();
    webCourseViews();

    typescriptCourseViews();
    typescriptCourseViews();

    /*
   
    Tarefa 5: Utilizando Inteligência Artificial para Análise
        Utilize uma ferramenta de IA generativa.

        Solicite uma explicação sobre a diferença entre escopo global, escopo de função e escopo de bloco.
        Solicite também uma explicação sobre por que cada contador criado na Tarefa 4 mantém seu próprio valor.
        Compare as respostas obtidas com os conceitos estudados na aula.
        Produza um breve texto (5 a 10 linhas) resumindo suas conclusões.

    Resultado Esperado:
    
        Ao final do laboratório, você deverá compreender como o escopo controla a visibilidade das variáveis, identificar as diferenças entre var e let e implementar closures capazes de preservar o estado de contadores independentes para diferentes cursos da plataforma educacional.

        Competências Desenvolvidas
        Ao concluir este laboratório, você será capaz de:
        Identificar os diferentes tipos de escopo de variáveis em TypeScript.
        Analisar o comportamento das palavras-chave var, let e const.
        Aplicar o conceito de escopo de bloco na construção de programas mais seguros e previsíveis.
        Compreender como funções acessam variáveis de escopos externos.
        Implementar closures para preservar estado entre diferentes execuções de funções.
        Avaliar explicações geradas por ferramentas de Inteligência Artificial, relacionando-as aos conceitos estudados em aula.

*/