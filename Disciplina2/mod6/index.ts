import GerenciadorAutenticacao  from './sistema/GerenciadorAutenticacao';


const auth = new GerenciadorAutenticacao();

// Teste 1: Falha na validação
const tentativa1 = auth.login("usuario_errado.com", "123");
console.log(`Resultado 1: ${tentativa1.mensagem}`);

// Teste 2: Sucesso na validação
const tentativa2 = auth.login("professor@utfpr.edu.br", "12345678901");
console.log(`Resultado 2: ${tentativa2.mensagem}`);
