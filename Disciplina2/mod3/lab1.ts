/*
Tarefa 1: Área Restrita para Clientes
Crie uma função chamada canAccessOrders.
Receba um parâmetro booleano indicando se o usuário está autenticado.
Utilize uma estrutura if.
Retorne:
"Access granted"
"Access denied"
*/

function canAccessOrders(logged:boolean):string{
    return `Access${logged ? ' granted':' denied'}`;
}

const pode:string = canAccessOrders(true)
const nPode:string = canAccessOrders(false)

console.log(pode,nPode);

/*
    Tarefa 2: Checkout com If Aninhado
    Crie uma função chamada checkoutAccess.
    Receba os parâmetros:
    isLogged
    hasPaymentMethod
    Utilize estruturas if aninhadas.
    Considere as seguintes regras:
    O usuário precisa estar autenticado.
    Após a autenticação, o sistema deve verificar se existe uma forma de pagamento cadastrada.
    Retorne:
    "Proceed to checkout"
    "Register a payment method"
    "Please log in"
*/

function checkoutAccess(isLogged:boolean, hasPaymentMethod:boolean):string{

    /*          cenarios
           logged hasPaymentMethod. saida
        A     0       0             -> please login
        B     1       0             -> register a pay method
        C     1       1             -> procede checkout
    */



    return isLogged ? (hasPaymentMethod ? 'Procede checkout':'Register a pay method') : 'Please log in'
}


let A:string = checkoutAccess(false,false);
let B:string = checkoutAccess(true,false);
let C:string = checkoutAccess(true,true);

console.log(A)
console.log(B)
console.log(C)

/*

Tarefa 3: Desconto Progressivo com Else If
Crie uma função chamada calculateDiscount.
Receba o valor da compra.
Utilize if / else if / else.
Implemente as regras:
Compras acima de R$ 500 recebem 15% de desconto.
Compras entre R$ 200 e R$ 500 recebem 10% de desconto.
Compras abaixo de R$ 200 não recebem desconto.
Retorne o percentual de desconto aplicado.
Teste diferentes valores.

*/

function calculateDiscouunt(valorCompra:number):number{
    
    let desconto = 0;
    
    if(valorCompra > 500){
        desconto = 15;
    }
    else if(valorCompra >= 200 && valorCompra <= 500){
        desconto = 10;
    }
    else if(valorCompra < 200){
        desconto = 0
    }
    return desconto
}

const maior = calculateDiscouunt(600);
const medio = calculateDiscouunt(300);
const nenhum = calculateDiscouunt(100);

console.log(maior,medio,nenhum);


/* 
Tarefa 4: Perfis de Usuário com Switch
Crie uma função chamada getDashboard.
Receba uma variável chamada role.
Utilize a estrutura switch.
Considere os perfis:
"admin"
"manager"
"customer"
Retorne a área correspondente ao perfil.
Inclua um bloco default.

*/

function getDashboard(role:string):string{

    //auto inferencia
    let area:string;
    
    switch (role) {
        case 'manager':
         area = 'Gerente'   
            break;
        case 'costumer':
        area =  'Cliente'
        break;
        case 'manager':
         area = 'Gerente'   
            break;
        case 'admin':
        area =  'Adm'
        break;
        default:area = 'Estag'
            break;
    }


    return area

}

const estag = getDashboard(''); //nao inseriu parametro
const admin = getDashboard('admin'); 
const gerente = getDashboard('manager'); 
const cliente = getDashboard('costumer'); 

console.log(estag,admin,gerente,cliente);


/* 

Tarefa 5: Banner Promocional com Operador Ternário
Crie uma função chamada getPromotionBanner.
Receba um parâmetro booleano chamado isPremiumCustomer.
Utilize exclusivamente o operador ternário.
Retorne:
"Premium Offer Available"
"Standard Offer Available"
*/

function getPromotionBanner(isPremiumCostumer:boolean):string{
    return (isPremiumCostumer ? 'Premium':'Standard') + ' Offer Avalilable' 
}

const testePremium = getPromotionBanner(true);
const testeStandard = getPromotionBanner(false);

console.log(testePremium,testeStandard)

/*
Tarefa 6: Revisão com Inteligência Artificial
Escolha uma das funções implementadas.
Solicite a uma ferramenta de IA generativa que proponha uma refatoração da solução.
Analise:
Legibilidade;
Clareza das condições;
Facilidade de manutenção.
Registre sua avaliação em comentários no código.
Indique se adotaria ou não a sugestão apresentada pela IA.

Competências Desenvolvidas
Ao concluir este laboratório, você será capaz de:

Implementar regras de decisão utilizando estruturas condicionais.
Selecionar a estrutura mais adequada para cada cenário.
Modelar regras de negócio comuns em aplicações web.
Utilizar estruturas aninhadas para representar decisões hierárquicas.
Aplicar o operador ternário em situações apropriadas.
Avaliar criticamente sugestões produzidas por ferramentas de Inteligência Artificial.
*/