/* 
Neste laboratório, você refatorará um arquivo único e desorganizado, separando-o em: 
um sistema de módulos limpo, encapsulado e tipado, 
utilizando exportações nomeadas e 
padrões conforme as boas práticas do ecossistema moderno.

//— arquivo.ts
// ============================================================================
// ARQUIVO ÚNICO DESORGANIZADO (PONTO DE PARTIDA PARA O LABORATÓRIO 1)
// ============================================================================
 
// --- TUDO MISTURADO NO MESMO ESCOPO: VALIDADORES, INTERFACES E CLASSES ---

interface ResultadoValidacao {
    valido: boolean;
    mensagem: string;
}
 
function validarEmail(email: string): boolean {
    console.log(`[Validando Email]: ${email}`);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
 
function validarCpf(cpf: string): boolean {
    console.log(`[Validando CPF]: ${cpf}`);
    // Validação simplificada apenas para fins didáticos de fluxo
    const cleanCpf = cpf.replace(/\D/g, '');
    return cleanCpf.length === 11;
}
 
class GerenciadorAutenticacao {
    private usuarioLogado: string | null = null;
 
    public login(email: string, cpf: string): ResultadoValidacao {
        const emailValido = validarEmail(email);
        const cpfValido = validarCpf(cpf);
 
        if (!emailValido) {
            return { valido: false, mensagem: "Formato de e-mail inválido." };
        }
 
        if (!cpfValido) {
            return { valido: false, mensagem: "CPF deve conter exatamente 11 dígitos." };
        }
 
        this.usuarioLogado = email;
        return { valido: true, mensagem: `Usuário ${email} autenticado com sucesso!` };
    }
 
    public logout(): void {
        console.log(`Usuário ${this.usuarioLogado} efetuou logout.`);
        this.usuarioLogado = null;
    }
}
 
// --- FLUXO DE EXECUÇÃO DE TESTE (ORQUESTRADOR MISTURADO COM A LOGICA) ---
 
const auth = new GerenciadorAutenticacao();
 
// Teste 1: Falha na validação
const tentativa1 = auth.login("usuario_errado.com", "123");
console.log(`Resultado 1: ${tentativa1.mensagem}`);
 
// Teste 2: Sucesso na validação
const tentativa2 = auth.login("professor@utfpr.edu.br", "12345678901");
console.log(`Resultado 2: ${tentativa2.mensagem}`);
 
auth.logout();
//—
 
Tarefa 1: Isolando Regras de Negócio com Named Exports
Crie uma pasta chamada sistema/ e, dentro dela, um arquivo chamado validadores.ts.
Declare e exporte de forma nomeada as funções 
 validarEmail(email: string): boolean e
 validarCpf(cpf: string): boolean. 
 
 -- No mesmo arquivo, exporte uma interface chamada ResultadoValidacao.
Crie o arquivo principal index.ts na raiz e:
1 importe essas funções usando a sintaxe de chaves para testar sua aplicação.

Tarefa 2: Encapsulamento com Default Exports
Dentro da pasta sistema/, crie um arquivo chamado GerenciadorAutenticacao.ts.
Desenvolva uma classe chamada GerenciadorAutenticacao que contenha métodos para login e logout de usuários. Coloque um método público de validação que faça uso interno dos validadores do arquivo anterior.
Exporte esta classe inteira utilizando export default e realize a importação no seu index.ts sem o uso de chaves, atribuindo a ela o nome que desejar.

Tarefa 3: Resolução de Conflitos e Aliasing Assistido por IA
Abra o chat de um assistente de IA (como Gemini ou Claude).

Envie o seguinte cenário para a IA: "Aja como um arquiteto de software front-end. Tenho dois módulos diferentes exportando uma interface chamada 'Configuracao'. O primeiro exporta de forma nomeada de 'moduloA.ts' e o segundo exporta como default de 'moduloB.ts'. Me mostre o código exato de como importar ambos dentro de um mesmo arquivo utilitário sem causar conflito de nomes no compilador do TypeScript."

Analise o código gerado pela IA com o operador as e aplique o conceito no seu script de testes para consolidar o entendimento de apelidos de importação.

Resultado Esperado: O aluno deverá obter uma estrutura de projeto modularizada e em perfeito funcionamento, onde o compilador TypeScript valida os tipos importados entre arquivos diferentes e o arquivo index.ts atua apenas como orquestrador, mantendo o escopo global do projeto limpo.

Última atualização: quinta-feira, 16 jul. 2026, 16:31

*/