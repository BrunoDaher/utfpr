/**
 
Tarefa 1: Catálogo de produtos da loja
    Crie um array representando os produtos disponíveis na loja virtual.
    */
    const products = [
        "Notebook",
        "Smartphone",
        "Teclado",
        "Mouse"
    ];
    /*
    ✔ Objetivo:
    Simular dados retornados por um sistema de catálogo (API).

Tarefa 2: Exibição do catálogo com FOR
    Utilize um laço for para exibir todos os produtos da loja.

    Exiba cada item individualmente.

    ✔ Objetivo:
    Simular a renderização de produtos em uma vitrine virtual.

    Tarefa 3: Carrinho de compras com índice
    Utilize o array products e exiba cada produto com seu índice.

    Formato esperado:

    0 - Notebook
    1 - Smartphone
    2 - Teclado
    3 - Mouse
    ✔ Objetivo:
    Compreender estrutura indexada de dados no carrinho.


    */

    products.forEach((produto,index) => {
        console.log(`${index} - ${produto}`);
    });

    /*
Tarefa 4: Controle de login com WHILE
    Crie a variável:

    */
    let isAuthenticated:boolean = true;
    /*

    Utilize um while para simular tentativa de login na loja virtual.

    Dentro do loop:
    Exiba “Tentando autenticar usuário...”
    */
    while(!isAuthenticated){
        console.log("Tentando autenticar usuário")
    }
    /*
    Atualize o estado para true
    ✔ Objetivo:
        Trabalhar repetição baseada em estado do sistema.


Tarefa 5: Identificação de erro — sistema travado
    Analise o código:

    let loading = true;

    while (loading) {
        console.log("Processando pedido...");
    }
    ✔ Responda:

    Por que o sistema fica travado?

    O que está faltando?

    Corrija o código
/* 

*/

/*
 Tarefa 6: Relatório de pedidos com loops aninhados
    Simule pedidos contendo itens dentro de cada compra:
    */

    const orders = [
        ["Notebook", "Mouse"], //1
        ["Smartphone"], //2
        ["Teclado", "Headset", "Mousepad"] //3
    ];
    /*
        Use loops aninhados para exibir:
        Pedido 1 - Item: Notebook
        Pedido 1 - Item: Mouse
    ✔ Objetivo: Entender estruturas hierárquicas em sistemas de vendas.

    */

    function notaCompra(lista:Array<any>):Array<any>{
        
        let nota:Array<any> = [];

        lista.forEach((pedido:Array<string>,indice) => {

         /*   for (let i = 0; i < pedido.length; i++) {
                const item = pedido[i];
                //console.log(`Pedido - ${index + 1} Item: ${item}`)
            }*/

            pedido.forEach((item: string) => {
                console.log(`Pedido - ${indice + 1} Item : ${item}`)
            });
            
            //nota.push(`Pedido ${index} - Item:${item}`)
        });
        
        return nota;
    }

    notaCompra(orders)